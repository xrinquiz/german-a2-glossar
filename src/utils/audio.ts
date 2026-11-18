/**
 * German Speech Synthesis Utility for A2 German Language Learners
 */

let activeUtterance: SpeechSynthesisUtterance | null = null;

export const speakGerman = (
  text: string,
  rate: number = 0.9,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser environment.');
    onError?.('Speech synthesis not supported');
    return false;
  }

  try {
    // Cancel any previous speech
    window.speechSynthesis.cancel();

    // Clean text: remove slashes or parenthetical notes if needed, e.g. "die Ausbildung, -en" -> "die Ausbildung"
    const cleanedText = text
      .replace(/,\s*-[a-zäöüß]+/gi, '')
      .replace(/,\s*"-?[a-zäöüß]+/gi, '')
      .replace(/\(H,.*?\)/gi, '')
      .replace(/\(S,.*?\)/gi, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'de-DE';
    utterance.rate = rate; // 0.85 - 1.0 is ideal for language learners
    utterance.pitch = 1.0;

    // Pick a high-quality German voice if available
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(
      (v) => v.lang.startsWith('de') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Hedda') || v.name.includes('Katja'))
    ) || voices.find((v) => v.lang.startsWith('de'));

    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      activeUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      activeUtterance = null;
      onError?.(e);
      onEnd?.();
    };

    activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Audio playback error:', err);
    onError?.(err);
    onEnd?.();
    return false;
  }
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
};
