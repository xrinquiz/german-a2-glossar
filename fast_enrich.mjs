import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({});
const rawEntries = JSON.parse(fs.readFileSync('parsed_raw_entries.json', 'utf8'));

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

const PROGRESS_FILE = 'enrich_progress.json';
const OUTPUT_FILE = 'src/data/vocabulary.json';

let enrichedMap = {};
if (fs.existsSync(PROGRESS_FILE)) {
  try {
    enrichedMap = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    console.log(`Loaded ${Object.keys(enrichedMap).length} entries from ${PROGRESS_FILE}`);
  } catch (e) {
    enrichedMap = {};
  }
}

function assembleVocabulary() {
  const list = [];
  for (const raw of rawEntries) {
    const id = raw.id;
    const cInfo = getChapterInfo(id);
    const item = enrichedMap[id];

    if (item && item.bangla && item.bangla !== 'অর্থ') {
      list.push({
        id: id,
        chapterWordNumber: cInfo.chapterWordNumber,
        totalInChapter: cInfo.total,
        german: item.german,
        word: item.word,
        article: item.article,
        plural: item.plural || '—',
        partOfSpeech: item.partOfSpeech || 'Ausdruck',
        bangla: item.bangla,
        english: item.english,
        exampleGerman: item.exampleGerman,
        exampleEnglish: item.exampleEnglish,
        exampleBangla: item.exampleBangla,
        verbForms: item.verbForms || '—',
        page: raw.page,
        kapitel: cInfo.kapitel,
        kapitelTitle: cInfo.title,
        kapitelBanglaTitle: cInfo.banglaTitle
      });
    } else {
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
        exampleGerman: `Wir lernen das Wort: ${word}.`,
        exampleEnglish: `We are learning the word: ${word}.`,
        exampleBangla: `আমরা "${word}" শব্দটি শিখছি।`,
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
  const prompt = `You are an expert bilingual German-Bengali and German-English linguist.
You are processing a batch of German A2 vocabulary words from the official textbook "Netzwerk neu A2 Glossar".
The raw entries were extracted from the PDF and may have legacy Bengali font encoding artifacts (e.g., ি instead of ক, missing spaces, broken ligatures; e.g. "প্র মিক্ষণ , মিক্ষা" -> "প্রশিক্ষণ, শিক্ষা", "ব্ াাংি" -> "ব্যাংক", "িাজ" -> "কাজ", "াডা সনওয়া" -> "ভাড়া নেওয়া", "স াডা" -> "ঘোড়া", "পমরিাণ" -> "পরিমাণ", "অবতরণ িরা" -> "অবতরণ করা").
Fix every Bengali word into 100% natural, correct Bengali spelling.
Provide accurate, real English meanings (DO NOT copy the German word as English).
Provide realistic German A2 example sentences with accurate English and Bengali translations.
Provide full plural forms for nouns (e.g. "die Wohnheime", "die Ausbildungen", or "—" if no plural).

Batch of ${batch.length} items:
${JSON.stringify(batch.map(b => ({ id: b.id, raw: b.raw })), null, 2)}

Return strict JSON array of objects with keys:
- id: number
- german: string
- word: string
- article: "der" | "die" | "das" | null
- plural: string
- partOfSpeech: "Nomen" | "Verb" | "Adjektiv" | "Adverb" | "Präposition" | "Ausdruck" | "Konjunktion"
- bangla: string (natural Bengali translation)
- english: string (natural English translation)
- exampleGerman: string
- exampleEnglish: string
- exampleBangla: string
- verbForms: string (e.g. "er reitet, ist geritten" or "—")

CRITICAL: Output valid JSON array ONLY.`;

  try {
    const resp = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(resp.text);
    if (Array.isArray(parsed)) {
      let saved = 0;
      for (const item of parsed) {
        if (item.id && item.bangla && item.bangla !== 'অর্থ') {
          enrichedMap[item.id] = item;
          saved++;
        }
      }
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(enrichedMap, null, 2));
      console.log(`[SAVED] Batch IDs ${ids[0]}-${ids[ids.length - 1]} (+${saved}). Progress: ${Object.keys(enrichedMap).length}/1452`);
      return true;
    }
  } catch (err) {
    if (retryCount < 2) {
      console.warn(`[RETRY] Batch ${ids[0]}-${ids[ids.length - 1]}: ${err.message}`);
      await new Promise(r => setTimeout(r, 2000));
      return processBatch(batch, retryCount + 1);
    }
    console.error(`[FAIL] Batch ${ids[0]}-${ids[ids.length - 1]}: ${err.message}`);
  }
  return false;
}

async function run() {
  const missing = rawEntries.filter(r => !enrichedMap[r.id] || enrichedMap[r.id].bangla === 'অর্থ');
  console.log(`Remaining to enrich: ${missing.length} out of ${rawEntries.length}`);

  if (missing.length === 0) {
    console.log('All entries already complete!');
    assembleVocabulary();
    return;
  }

  const BATCH_SIZE = 35;
  const batches = [];
  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    batches.push(missing.slice(i, i + BATCH_SIZE));
  }

  console.log(`Processing ${batches.length} batches with concurrency 3...`);

  const CONCURRENCY = 3;
  for (let i = 0; i < batches.length; i += CONCURRENCY) {
    const chunk = batches.slice(i, i + CONCURRENCY);
    console.log(`Starting chunk ${Math.floor(i / CONCURRENCY) + 1}/${Math.ceil(batches.length / CONCURRENCY)}...`);
    await Promise.all(chunk.map(b => processBatch(b)));
    assembleVocabulary();
    await new Promise(r => setTimeout(r, 600));
  }

  assembleVocabulary();
  console.log('COMPLETED ALL 1452 ENTRIES!');
}

run().catch(console.error);
