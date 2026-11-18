import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({});
const rawEntries = JSON.parse(fs.readFileSync('a1_raw_entries.json', 'utf8'));

const PROGRESS_FILE = 'a1_enrich_progress.json';
const OUTPUT_FILE = 'src/data/a1_vocabulary.json';

const A1_CHAPTERS = [
  { id: 'Kapitel 1', number: 1, title: 'Guten Tag!', banglaTitle: 'শুভ দিন! / হ্যালো!', total: 117 },
  { id: 'Kapitel 2', number: 2, title: 'Freunde, Kollegen und ich', banglaTitle: 'বন্ধু, সহকর্মী ও আমি', total: 213 },
  { id: 'Kapitel 3', number: 3, title: 'In der Stadt', banglaTitle: 'শহরে / নগরীতে', total: 123 },
  { id: 'Kapitel 4', number: 4, title: 'Guten Appetit!', banglaTitle: 'খাবার উপভোগ করুন!', total: 185 },
  { id: 'Kapitel 5', number: 5, title: 'Tag für Tag', banglaTitle: 'প্রতিদিনের জীবন', total: 141 },
  { id: 'Kapitel 6', number: 6, title: 'Zeit mit Freunden', banglaTitle: 'বন্ধুদের সাথে সময়', total: 130 },
  { id: 'Kapitel 7', number: 7, title: 'Arbeitsalltag', banglaTitle: 'কর্মব্যস্ত দিন / কর্মজীবন', total: 125 },
  { id: 'Kapitel 8', number: 8, title: 'Fit und gesund', banglaTitle: 'সুস্থ ও কর্মঠ', total: 168 },
  { id: 'Kapitel 9', number: 9, title: 'Meine Wohnung', banglaTitle: 'আমার বাসা / বাসস্থান', total: 139 },
  { id: 'Kapitel 10', number: 10, title: 'Studium und Beruf', banglaTitle: 'পড়াশোনা ও পেশা', total: 109 },
  { id: 'Kapitel 11', number: 11, title: 'Die Jacke gefällt mir!', banglaTitle: 'জ্যাকেটটি আমার পছন্দ হয়েছে!', total: 160 },
  { id: 'Kapitel 12', number: 12, title: 'Ab in den Urlaub!', banglaTitle: 'ছুটিতে যাত্রা / অবকাশ যাপন', total: 151 }
];

const chapterMap = {};
A1_CHAPTERS.forEach(ch => {
  chapterMap[ch.id] = ch;
});

let enrichedMap = {};
if (fs.existsSync(PROGRESS_FILE)) {
  enrichedMap = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
}

function assembleA1Vocabulary() {
  const list = [];
  for (const raw of rawEntries) {
    const id = raw.id;
    const cInfo = chapterMap[raw.kapitel] || { title: raw.kapitel, banglaTitle: '', total: 100 };
    const enriched = enrichedMap[id];

    if (enriched && enriched.bangla && enriched.bangla !== 'অর্থ' && enriched.english) {
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
        level: 'A1',
        chapterWordNumber: raw.chapterWordNumber,
        totalInChapter: cInfo.total,
        german: enriched.german || raw.germanRaw,
        word: enriched.word || raw.germanRaw.replace(/^(der|die|das)\s+/i, '').replace(/,\s*.*$/, '').trim(),
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
        kapitel: raw.kapitel,
        kapitelTitle: cInfo.title,
        kapitelBanglaTitle: cInfo.banglaTitle
      });
    } else {
      const rawGerman = raw.germanRaw.trim();
      const word = rawGerman.replace(/^(der|die|das)\s+/i, '').replace(/,\s*.*$/, '').trim();
      list.push({
        id: id,
        level: 'A1',
        chapterWordNumber: raw.chapterWordNumber,
        totalInChapter: cInfo.total,
        german: rawGerman,
        word: word,
        article: rawGerman.startsWith('der ') ? 'der' : rawGerman.startsWith('die ') ? 'die' : rawGerman.startsWith('das ') ? 'das' : null,
        plural: '—',
        partOfSpeech: 'Ausdruck',
        bangla: raw.banglaRaw.replace(/[\x00\s]+/g, ' ').trim() || 'অর্থ',
        english: word,
        exampleGerman: `Wir lernen das Wort: ${word}.`,
        exampleEnglish: `We are learning the word: ${word}.`,
        exampleBangla: `আমরা "${word}" শব্দটি শিখছি।`,
        verbForms: '—',
        page: raw.page,
        kapitel: raw.kapitel,
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
  const prompt = `You are an expert bilingual German-English and German-Bengali lexicographer.
Translate this batch of German A1 vocabulary entries from the textbook "Netzwerk neu A1".
The raw Bengali text has encoding noise and broken spaces (e.g. "জা ম ান" -> "জার্মান", "ভা েল া" -> "ভালো", "ভ িদ ন" -> "শুভ দিন", "বরা করা" -> "মিলানো, বরাদ্দ করা").

CRITICAL RULES:
1. Return strict JSON array of objects.
2. NEVER use double quotes (") inside any string value! Always use single quotes ('example') or write without quotes.
3. bangla: Pure Bengali script only. No Latin letters inside Bengali words. Correct vowel signs.
4. english: Real English definition. Never copy the German word.
5. plural: Full plural form for nouns (e.g. "die Personen", "die Flaschen") or "—".

Fields:
id, german, word, article, plural, partOfSpeech, bangla, english, exampleGerman, exampleEnglish, exampleBangla, verbForms.

Input Batch:
${JSON.stringify(batch.map(b => ({ id: b.id, germanRaw: b.germanRaw, banglaRaw: b.banglaRaw })))}`;

  try {
    const resp = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const parsed = JSON.parse(resp.text.trim());
    if (Array.isArray(parsed)) {
      let saved = 0;
      for (const item of parsed) {
        if (item.id && item.bangla && item.bangla !== 'অর্থ' && item.english) {
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
      console.log(`[OK] Batch IDs ${ids[0]}-${ids[ids.length - 1]} (+${saved}). Total A1: ${Object.keys(enrichedMap).length}/1761`);
      return true;
    }
  } catch (err) {
    if (retryCount < 3) {
      const waitTime = err.message.includes('429') ? 22000 : 3000;
      console.warn(`[RETRY] Batch ${ids[0]}-${ids[ids.length - 1]} in ${waitTime}ms: ${err.message.slice(0, 80)}`);
      await new Promise(r => setTimeout(r, waitTime));
      return processBatch(batch, retryCount + 1);
    }
    console.error(`[FAIL] Batch ${ids[0]}-${ids[ids.length - 1]}:`, err.message.slice(0, 80));
  }
  return false;
}

async function main() {
  const missing = rawEntries.filter(r => !enrichedMap[r.id] || !enrichedMap[r.id].bangla || enrichedMap[r.id].bangla === 'অর্থ' || !enrichedMap[r.id].english);
  console.log(`Remaining missing A1 entries: ${missing.length} out of ${rawEntries.length}`);

  if (missing.length === 0) {
    console.log('ALL A1 ENTRIES ARE 100% COMPLETE!');
    assembleA1Vocabulary();
    return;
  }

  const BATCH_SIZE = 20;
  const batches = [];
  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    batches.push(missing.slice(i, i + BATCH_SIZE));
  }

  console.log(`Processing remaining ${batches.length} batches sequentially...`);

  for (let i = 0; i < batches.length; i++) {
    console.log(`Batch ${i + 1}/${batches.length}...`);
    await processBatch(batches[i]);
    assembleA1Vocabulary();
    await new Promise(r => setTimeout(r, 1200));
  }

  assembleA1Vocabulary();
  console.log('ALL 1,761 A1 ENTRIES FULLY ASSEMBLED TO', OUTPUT_FILE);
}

main().catch(console.error);
