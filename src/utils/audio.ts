/**
 * Professional Native German Audio Engine for Language Learners
 * Delivers studio-quality, authentic Hochdeutsch (Standard German) pronunciation.
 */

// In-memory cache for audio instances to enable instant re-play without delay
const audioCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Clean & normalize German text for perfect phonetics and speech synthesis
 */
export function cleanGermanForSpeech(text: string): string {
  if (!text) return '';

  let cleaned = text.trim();

  // 1. Expand common German abbreviations to full natural spoken words
  cleaned = cleaned
    .replace(/\bz\.\s*B\./gi, 'zum Beispiel')
    .replace(/\bbzw\./gi, 'beziehungsweise')
    .replace(/\bd\.\s*h\./gi, 'das heißt')
    .replace(/\bca\./gi, 'zirka')
    .replace(/\busw\./gi, 'und so weiter')
    .replace(/\bu\.\s*a\./gi, 'unter anderem')
    .replace(/\bevtl\./gi, 'eventuell')
    .replace(/\binkl\./gi, 'inklusive')
    .replace(/\betw\./gi, 'etwas')
    .replace(/\bjmdn\./gi, 'jemanden')
    .replace(/\bjmdm\./gi, 'jemandem');

  // 2. Remove vocabulary glossary artifacts (e.g. ", -en", ", \"-e", "(H)", "(S)", "(Pl.)")
  cleaned = cleaned
    .replace(/,\s*-[a-zäöüß]+/gi, '')
    .replace(/,\s*"-?[a-zäöüß]+/gi, '')
    .replace(/\([HhSsAaDd],\s*.*?\)/g, '')
    .replace(/\([HhSsAaDd]\)/g, '')
    .replace(/\(Pl\.\)/gi, '')
    .replace(/\(sing\.\)/gi, '')
    .replace(/\/\s*-[a-zäöüß]+/gi, '')
    .trim();

  // 3. Remove standalone special punctuation while preserving German characters (ä, ö, ü, ß)
  cleaned = cleaned
    .replace(/["“”«»]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned;
}

/**
 * Play native German speech
 */
export const speakGerman = (
  text: string,
  rate: number = 0.9,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean => {
  stopSpeech();

  const cleaned = cleanGermanForSpeech(text);
  if (!cleaned) {
    onEnd?.();
    return false;
  }

  onStart?.();

  let isFinished = false;
  const finish = () => {
    if (!isFinished) {
      isFinished = true;
      if (currentAudio) {
        currentAudio = null;
      }
      activeUtterance = null;
      onEnd?.();
    }
  };

  // -------------------------------------------------------------
  // TIER 1: Native High-Definition Neural German Audio via Proxy
  // -------------------------------------------------------------
  try {
    const proxyUrl = `/api/tts?text=${encodeURIComponent(cleaned)}`;
    const audio = new Audio(proxyUrl);
    // Allow speeds below 0.5 (down to 0.25) up to 1.2 maximum
    const effectiveRate = Math.min(Math.max(rate, 0.25), 1.2);
    audio.playbackRate = effectiveRate;
    (audio as any).preservesPitch = true;
    (audio as any).mozPreservesPitch = true;
    (audio as any).webkitPreservesPitch = true;
    currentAudio = audio;

    audio.onended = finish;

    audio.onerror = () => {
      // -------------------------------------------------------------
      // TIER 2: Direct Google Neural German TTS Fallback
      // -------------------------------------------------------------
      const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=de&client=tw-ob&q=${encodeURIComponent(cleaned)}`;
      const fallbackAudio = new Audio(directUrl);
      fallbackAudio.playbackRate = effectiveRate;
      (fallbackAudio as any).preservesPitch = true;
      (fallbackAudio as any).mozPreservesPitch = true;
      (fallbackAudio as any).webkitPreservesPitch = true;
      currentAudio = fallbackAudio;

      fallbackAudio.onended = finish;

      fallbackAudio.onerror = () => {
        // -------------------------------------------------------------
        // TIER 3: Local Web Speech API with strict native German voice
        // -------------------------------------------------------------
        playViaWebSpeech(cleaned, rate, finish, (err) => {
          onError?.(err);
          finish();
        });
      };

      fallbackAudio.play().catch(() => {
        playViaWebSpeech(cleaned, rate, finish, (err) => {
          onError?.(err);
          finish();
        });
      });
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy or fetch error -> fallback
        audio.onerror?.(new Event('error'));
      });
    }

    return true;
  } catch (err) {
    console.warn('Audio element error, falling back to Web Speech:', err);
    playViaWebSpeech(cleaned, rate, finish, (e) => {
      onError?.(e);
      finish();
    });
    return true;
  }
};

/**
 * Fallback Web Speech API with native German voice selection
 */
function playViaWebSpeech(
  text: string,
  rate: number,
  onEnd: () => void,
  onError: (err: any) => void
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError('Speech synthesis not supported');
    onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = Math.min(Math.max(rate, 0.25), 1.2);
    utterance.pitch = 1.0;

    const pickGermanVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Look for natural / premium German voices first
      const bestVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('de') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Katja') ||
              v.name.includes('Conrad') ||
              v.name.includes('Hedda') ||
              v.name.includes('Marlene'))
        ) || voices.find((v) => v.lang.startsWith('de'));

      if (bestVoice) {
        utterance.voice = bestVoice;
      }
    };

    pickGermanVoice();
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        pickGermanVoice();
      };
    }

    utterance.onend = () => {
      activeUtterance = null;
      onEnd();
    };

    utterance.onerror = (e) => {
      activeUtterance = null;
      onError(e);
    };

    activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    onError(e);
    onEnd();
  }
}

/**
 * Immediately stop any playing audio or speech synthesis
 */
export const stopSpeech = () => {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch (e) {
      // ignore
    }
    currentAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
    activeUtterance = null;
  }
};
