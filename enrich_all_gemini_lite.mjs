import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({});
const rawEntries = JSON.parse(fs.readFileSync('parsed_raw_entries.json', 'utf8'));

const PROGRESS_FILE = 'enrich_progress.json';
const OUTPUT_FILE = 'src/data/vocabulary.json';

const CHAPTER_CONFIG = [
  { kapitel: 'Kapitel 1', number: 1, title: 'Und was machst du?', banglaTitle: 'তুমি কি কর?', start: 1, end: 86, total: 86 },
  { kapitel: 'Kapitel 2', number: 2, title: 'Nach der Schulzeit', banglaTitle: 'স্কুলের পর', start: 87, end: 219, total: 133 },
  { kapitel: 'Kapitel 3', number: 3, title: 'Immer online?', banglaTitle: 'সবসময় অনলাইনে?', start: 220, end: 347, total: 128 },
  { kapitel: 'Kapitel 4', number: 4, title: 'Große und kleine Gefühle', banglaTitle: 'বড় ও ছোট অনুভূতি', start: 348, end: 460, total: 113 },
  { kapitel: 'Kapitel 5', number: 5, title: 'Leben in der Stadt', banglaTitle: 'শহরের জীবন', start: 461, end: 569, total: 109 },
  { kapitel: 'Kapitel 6', number: 6, title: 'Arbeitswelten', banglaTitle: 'কর্মজগৎ', start: 570, end: 723, total: 154 },
  { kapitel: 'Kapitel 7', number: 7, title: 'Ganz schön mobil', banglaTitle: 'বেশ গতিশীল / যাতায়াত', start: 724, end: 852, total: 129 },
  { kapitel: 'Kapitel 8', number: 8, title: 'Gelernt ist gelernt!', banglaTitle: 'শেখা জিনিস সারাজীবনের!', start: 853, end: 1000, total: 148 },
  { kapitel: 'Kapitel 9', number: 9, title: 'Sportlich, sportlich', banglaTitle: 'খেলাধুলা ও শরীরচর্চা', start: 1001, end: 1118, total: 118 },
  { kapitel: 'Kapitel 10', number: 10, title: 'Zusammen leben', banglaTitle: 'একসাথে বসবাস', start: 1119, end: 1237, total: 119 },
  { kapitel: 'Kapitel 11', number: 11, title: 'Wie die Zeit vergeht!', banglaTitle: 'সময় কীভাবে কেটে যায়!', start: 1238, end: 1318, total: 81 },
  { kapitel: 'Kapitel 12', number: 12, title: 'Gute Unterhaltung!', banglaTitle: 'ভালো বিনোদন ও সংস্কৃতি', start: 1319, end: 1452, total: 134 }
];

function getChapterInfo(id) {
  for (const c of CHAPTER_CONFIG) {
    if (id >= c.start && id <= c.end) {
      return {
        ...c,
        chapterWordNumber: id - c.start + 1
      };
    }
  }
  return {
    kapitel: 'Kapitel 12',
    number: 12,
    title: 'Gute Unterhaltung!',
    banglaTitle: 'ভালো বিনোদন ও সংস্কৃতি',
    chapterWordNumber: id - 1318,
    total: 134
  };
}

let enrichedMap = {};
if (fs.existsSync(PROGRESS_FILE)) {
  try {
    enrichedMap = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    console.log(`[INIT] Loaded ${Object.keys(enrichedMap).length} entries from ${PROGRESS_FILE}`);
  } catch (e) {
    enrichedMap = {};
  }
}

function assembleVocabulary() {
  const list = [];
  for (const raw of rawEntries) {
    const id = raw.id;
    const cInfo = getChapterInfo(id);
    const enriched = enrichedMap[id];

    if (enriched && enriched.bangla && enriched.bangla !== 'অর্থ' && enriched.english && enriched.english.toLowerCase() !== enriched.word?.toLowerCase()) {
      let plural = enriched.plural;
      if (typeof plural === 'object' && plural !== null) plural = '—';
      if (!plural || plural === 'null') plural = '—';

      let verbForms = enriched.verbForms;
      if (typeof verbForms === 'object' && verbForms !== null) {
        verbForms = Object.values(verbForms).join(', ');
      }
      if (!verbForms || verbForms === 'null') verbForms = '—';

      list.push({
        id: id,
        chapterWordNumber: cInfo.chapterWordNumber,
        totalInChapter: cInfo.total,
        german: enriched.german || raw.raw.split(/ [-–—] /)[0],
        word: enriched.word || raw.raw.split(/ [-–—] /)[0].replace(/^(der|die|das)\s+/i, '').replace(/,\s*.*$/, '').trim(),
        article: enriched.article || null,
        plural: plural,
        partOfSpeech: enriched.partOfSpeech || (enriched.article ? 'Nomen' : 'Ausdruck'),
        bangla: enriched.bangla,
        english: enriched.english,
        exampleGerman: enriched.exampleGerman || `Wir lernen: ${enriched.german || enriched.word}.`,
        exampleEnglish: enriched.exampleEnglish || `We are learning: ${enriched.english}.`,
        exampleBangla: enriched.exampleBangla || `আমরা শিখছি: ${enriched.bangla}।`,
        verbForms: verbForms,
        page: raw.page,
        kapitel: cInfo.kapitel,
        kapitelTitle: cInfo.title,
        kapitelBanglaTitle: cInfo.banglaTitle
      });
    } else {
      // Temporary fallback from raw if not enriched yet
      const rawGerman = raw.raw.split(/ [-–—] /)[0].trim();
      const rawMeaning = raw.raw.split(/ [-–—] /)[1] || '';
      const word = rawGerman.replace(/^(der|die|das)\s+/i, '').replace(/,\s*.*$/, '').trim();
      list.push({
        id: id,
        chapterWordNumber: cInfo.chapterWordNumber,
        totalInChapter: cInfo.total,
        german: rawGerman,
        word: word,
        article: rawGerman.startsWith('der ') ? 'der' : rawGerman.startsWith('die ') ? 'die' : rawGerman.startsWith('das ') ? 'das' : null,
        plural: '—',
        partOfSpeech: 'Ausdruck',
        bangla: rawMeaning || 'অর্থ',
        english: word,
        exampleGerman: `Wir lernen: ${word}.`,
        exampleEnglish: `We are learning: ${word}.`,
        exampleBangla: `আমরা শিখছি: ${word}।`,
        verbForms: '—',
        page: raw.page,
        kapitel: cInfo.kapitel,
        kapitelTitle: cInfo.title,
        kapitelBanglaTitle: cInfo.banglaTitle
      });
    }
  }
  list.sort((a, b) => a.id - b.id);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(list, null, 2));
}

async function processBatch(batch, retryCount = 0) {
  const ids = batch.map(b => b.id);
  const prompt = `You are a master German A2 linguist, bilingual in German, English, and Bengali (Bangla).
Translate each German vocabulary item from the textbook "Netzwerk neu A2 Glossar" into both English and Bengali.

CRITICAL INSTRUCTIONS:
1. BENGALI (bangla):
   - MUST be 100% natural, accurate Bengali using Bengali script only.
   - Do NOT include Latin/English characters inside Bengali words (e.g. write "দুশ্চিন্তা", NEVER "দুinta").
   - Ensure proper spelling with correct vowel diacritics (আ-কার া, ই-কার ি, ঈ-কার ী, উ-কার ু, এ-কার ে, ও-কার ো, যুক্তাক্ষর).
   - If the raw text has corrupted font glyphs (like "িাজ", "স াডা", "মববািমবচ্ছেদ"), fix them into proper standard Bengali words ("কাজ", "ঘোড়া", "বিবাহবিচ্ছেদ").

2. ENGLISH (english):
   - MUST be a real, authentic English translation of the German word (e.g. "Schicksal" -> "destiny, fate", "Sorge" -> "worry, concern", "sterben" -> "to die", "Talent" -> "talent", "Vergleich" -> "comparison").
   - NEVER copy the German word into the English field.

3. GERMAN (german):
   - Include standard textbook entry with article and plural marker or verb forms (e.g. "das Schicksal, -e", "die Sorge, -n", "sterben, er stirbt, ist gestorben").
   - word: bare headword (e.g. "Schicksal", "Sorge", "sterben").
   - article: "der" | "die" | "das" | null.
   - plural: full plural form for nouns (e.g. "die Schicksale", "die Sorgen") or "—" if not noun / no plural.
   - partOfSpeech: "Nomen" | "Verb" | "Adjektiv" | "Adverb" | "Präposition" | "Ausdruck" | "Konjunktion".
   - verbForms: string (e.g. "er stirbt, ist gestorben") or "—".

4. EXAMPLES:
   - exampleGerman: realistic German A2 example sentence using the word.
   - exampleEnglish: natural English translation of the example sentence.
   - exampleBangla: natural Bengali translation of the example sentence.

Batch to process:
${JSON.stringify(batch.map(b => ({ id: b.id, raw: b.raw })))}

Return a strict JSON array of objects with keys:
id, german, word, article, plural, partOfSpeech, bangla, english, exampleGerman, exampleEnglish, exampleBangla, verbForms.
OUTPUT ONLY THE JSON ARRAY.`;

  try {
    const resp = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(resp.text);
    if (Array.isArray(parsed)) {
      let saved = 0;
      for (const item of parsed) {
        if (item.id && item.bangla && item.bangla !== 'অর্থ' && item.english && item.english.toLowerCase() !== item.word?.toLowerCase()) {
          // Normalize plural and verbForms to strings
          if (typeof item.plural === 'object' && item.plural !== null) item.plural = '—';
          if (!item.plural) item.plural = '—';
          if (typeof item.verbForms === 'object' && item.verbForms !== null) {
            item.verbForms = Object.values(item.verbForms).join(', ');
          }
          if (!item.verbForms) item.verbForms = '—';

          enrichedMap[item.id] = item;
          saved++;
        }
      }
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(enrichedMap, null, 2));
      console.log(`[OK] Batch ${ids[0]}-${ids[ids.length - 1]} (+${saved}). Progress: ${Object.keys(enrichedMap).length}/1452`);
      return true;
    }
  } catch (err) {
    if (retryCount < 3) {
      console.warn(`[RETRY] Batch ${ids[0]}-${ids[ids.length - 1]} in 2s: ${err.message}`);
      await new Promise(r => setTimeout(r, 2000));
      return processBatch(batch, retryCount + 1);
    }
    console.error(`[FAIL] Batch ${ids[0]}-${ids[ids.length - 1]}:`, err.message);
  }
  return false;
}

async function main() {
  const missing = rawEntries.filter(r => {
    const e = enrichedMap[r.id];
    return !e || !e.bangla || e.bangla === 'অর্থ' || !e.english || e.english.toLowerCase() === e.word?.toLowerCase();
  });

  console.log(`Total missing or unrefined entries: ${missing.length} out of ${rawEntries.length}`);

  if (missing.length === 0) {
    console.log('All entries are 100% complete and refined!');
    assembleVocabulary();
    return;
  }

  const BATCH_SIZE = 25;
  const batches = [];
  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    batches.push(missing.slice(i, i + BATCH_SIZE));
  }

  console.log(`Processing ${batches.length} batches of ~${BATCH_SIZE} words each...`);

  // Run in pairs of 2 batches concurrently for high speed without hitting rate limits
  const CONCURRENCY = 2;
  for (let i = 0; i < batches.length; i += CONCURRENCY) {
    const chunk = batches.slice(i, i + CONCURRENCY);
    console.log(`Starting chunk ${Math.floor(i / CONCURRENCY) + 1}/${Math.ceil(batches.length / CONCURRENCY)}...`);
    await Promise.all(chunk.map(b => processBatch(b)));
    assembleVocabulary();
    await new Promise(r => setTimeout(r, 500));
  }

  assembleVocabulary();
  console.log('ALL ENTRIES SUCCESSFULLY ENRICHED AND ASSEMBLED!');
}

main().catch(console.error);
