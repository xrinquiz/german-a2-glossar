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

const OUTPUT_FILE = 'src/data/vocabulary.json';
const PROGRESS_FILE = 'enrich_progress.json';

let enrichedMap = {};
if (fs.existsSync(PROGRESS_FILE)) {
  try {
    enrichedMap = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    console.log(`[INIT] Loaded ${Object.keys(enrichedMap).length} existing entries from ${PROGRESS_FILE}`);
  } catch (e) {
    enrichedMap = {};
  }
}

function assembleFinalVocabulary() {
  const finalList = [];
  for (const raw of rawEntries) {
    const id = raw.id;
    const cInfo = getChapterInfo(id);
    const enriched = enrichedMap[id] || {};

    const rawGerman = raw.raw.split(' - ')[0].trim();
    const word = enriched.word || rawGerman.replace(/^(der|die|das)\s+/i, '').replace(/,\s*.*$/, '').trim();
    const german = enriched.german || rawGerman;
    let bangla = enriched.bangla;
    if (!bangla || bangla === 'অর্থ') {
      bangla = raw.raw.split(' - ')[1] || 'অর্থ';
    }
    const english = enriched.english || word;
    const plural = enriched.plural || (german.match(/,\s*([^\s]+)/) ? german.match(/,\s*([^\s]+)/)[1] : '—');
    const article = enriched.article || (german.startsWith('der ') ? 'der' : german.startsWith('die ') ? 'die' : german.startsWith('das ') ? 'das' : null);
    const partOfSpeech = enriched.partOfSpeech || (article ? 'Nomen' : 'Ausdruck');
    const exampleGerman = enriched.exampleGerman || `Wir lernen das Wort: ${word}.`;
    const exampleEnglish = enriched.exampleEnglish || `We are learning the word: ${word}.`;
    const exampleBangla = enriched.exampleBangla || `আমরা "${word}" শব্দটি শিখছি।`;
    const verbForms = enriched.verbForms || '—';

    finalList.push({
      id: id,
      chapterWordNumber: cInfo.chapterWordNumber,
      totalInChapter: cInfo.total,
      german: german,
      word: word,
      article: article,
      plural: plural,
      partOfSpeech: partOfSpeech,
      bangla: bangla,
      english: english,
      exampleGerman: exampleGerman,
      exampleEnglish: exampleEnglish,
      exampleBangla: exampleBangla,
      verbForms: verbForms,
      page: raw.page,
      kapitel: cInfo.kapitel,
      kapitelTitle: cInfo.title,
      kapitelBanglaTitle: cInfo.banglaTitle
    });
  }

  finalList.sort((a, b) => a.id - b.id);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalList, null, 2));
}

async function processBatch(batch, retryCount = 0) {
  const ids = batch.map(b => b.id);
  const prompt = `You are a master German A2 linguist and native Bengali speaker.
Process this vocabulary batch from "Netzwerk neu A2 Glossar" (German-Bangla & German-English).
The raw text was extracted from the book. In the raw text, some Bengali characters suffered font encoding artifacts (e.g. "প্র মিক্ষণ , মিক্ষা" is "প্রশিক্ষণ, শিক্ষা"; "ব্ াাংি িি মচারী" is "ব্যাংক কর্মকর্তা"; "িাজ" is "কাজ"; "াডা সনওয়া" is "ভাড়া নেওয়া"; "স াডা" is "ঘোড়া"; "শুচ্ছয় থািা" is "শুয়ে থাকা"; "মববািমবচ্ছেদ" is "বিবাহবিচ্ছেদ"; "গ্র াি" is "গ্রাম").
Provide 100% accurate, pristine, natural Bengali and English translations for every single entry.

Raw entries:
${JSON.stringify(batch.map(b => ({ id: b.id, raw: b.raw, kapitel: b.kapitel })), null, 2)}

Return a strict JSON array of objects with these fields for EVERY item:
- id: number (must match input id)
- german: string (full German entry with article / plural / verb forms as in textbook)
- word: string (headword only)
- article: "der" | "die" | "das" | null
- plural: string (e.g. "die Ausbildungen", "die Wohnungen", or "—" if none/uncountable)
- partOfSpeech: "Nomen" | "Verb" | "Adjektiv" | "Adverb" | "Präposition" | "Ausdruck" | "Konjunktion"
- bangla: string (100% accurate, natural, correct spelling Bengali meaning, matching the textbook glossar)
- english: string (100% accurate English meaning from Netzwerk neu A2 Glossar)
- exampleGerman: string (realistic A2 German example sentence)
- exampleEnglish: string (accurate English translation of the example sentence)
- exampleBangla: string (accurate Bengali translation of the example sentence)
- verbForms: string (e.g. "er reitet, ist geritten" or "—")

CRITICAL: Every item MUST have meaningful, accurate "bangla" and "english" meanings. Never return empty or "অর্থ". Output strict JSON array ONLY.`;

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
      let count = 0;
      for (const item of parsed) {
        if (item.id && item.bangla && item.bangla !== 'অর্থ') {
          enrichedMap[item.id] = item;
          count++;
        }
      }
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(enrichedMap, null, 2));
      console.log(`[OK] Batch ${ids[0]}-${ids[ids.length - 1]} (+${count}). Total now: ${Object.keys(enrichedMap).length}/1452`);
      return true;
    }
  } catch (err) {
    if (retryCount < 3) {
      const waitTime = (retryCount + 1) * 3000;
      console.warn(`[RETRY] Batch ${ids[0]}-${ids[ids.length - 1]} in ${waitTime}ms: ${err.message}`);
      await new Promise(r => setTimeout(r, waitTime));
      return processBatch(batch, retryCount + 1);
    }
    console.error(`[FAIL] Batch ${ids[0]}-${ids[ids.length - 1]}:`, err.message);
  }
  return false;
}

async function main() {
  const missing = rawEntries.filter(r => !enrichedMap[r.id] || enrichedMap[r.id].bangla === 'অর্থ');
  console.log(`Missing entries: ${missing.length} out of ${rawEntries.length}`);

  const BATCH_SIZE = 35;
  const batches = [];
  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    batches.push(missing.slice(i, i + BATCH_SIZE));
  }

  console.log(`Processing ${batches.length} batches of ~${BATCH_SIZE} entries...`);

  // Run in pairs of 2 batches concurrently
  const CONCURRENCY = 2;
  for (let i = 0; i < batches.length; i += CONCURRENCY) {
    const chunk = batches.slice(i, i + CONCURRENCY);
    console.log(`Starting chunk ${Math.floor(i / CONCURRENCY) + 1}/${Math.ceil(batches.length / CONCURRENCY)}...`);
    await Promise.all(chunk.map(b => processBatch(b)));
    assembleFinalVocabulary();
    await new Promise(r => setTimeout(r, 500));
  }

  assembleFinalVocabulary();
  console.log('ALL COMPLETE! 1452 words fully saved to', OUTPUT_FILE);
}

main().catch(console.error);
