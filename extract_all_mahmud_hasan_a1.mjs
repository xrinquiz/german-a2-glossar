import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({});

const CACHE_FILE = 'a1_extracted_pages.json';
const OUTPUT_FILE = 'src/data/a1_vocabulary.json';

const CHAPTER_PAGES = [
  { kapitel: 'Kapitel 1', number: 1, title: 'Guten Tag!', banglaTitle: 'শুভ দিন! / হ্যালো!', startPage: 1, endPage: 11 },
  { kapitel: 'Kapitel 2', number: 2, title: 'Freunde, Kollegen und ich', banglaTitle: 'বন্ধু, সহকর্মী ও আমি', startPage: 12, endPage: 25 },
  { kapitel: 'Kapitel 3', number: 3, title: 'In der Stadt', banglaTitle: 'শহরে / নগরীতে', startPage: 26, endPage: 35 },
  { kapitel: 'Kapitel 4', number: 4, title: 'Guten Appetit!', banglaTitle: 'খাবার উপভোগ করুন!', startPage: 36, endPage: 45 },
  { kapitel: 'Kapitel 5', number: 5, title: 'Tag für Tag', banglaTitle: 'প্রতিদিনের জীবন', startPage: 46, endPage: 53 },
  { kapitel: 'Kapitel 6', number: 6, title: 'Zeit mit Freunden', banglaTitle: 'বন্ধুদের সাথে সময়', startPage: 54, endPage: 61 },
  { kapitel: 'Kapitel 7', number: 7, title: 'Arbeitsalltag', banglaTitle: 'কর্মব্যস্ত দিন / কর্মজীবন', startPage: 62, endPage: 69 },
  { kapitel: 'Kapitel 8', number: 8, title: 'Fit und gesund', banglaTitle: 'সুস্থ ও কর্মঠ', startPage: 70, endPage: 80 },
  { kapitel: 'Kapitel 9', number: 9, title: 'Meine Wohnung', banglaTitle: 'আমার বাসা / বাসস্থান', startPage: 81, endPage: 87 },
  { kapitel: 'Kapitel 10', number: 10, title: 'Studium und Beruf', banglaTitle: 'পড়াশোনা ও পেশা', startPage: 88, endPage: 93 },
  { kapitel: 'Kapitel 11', number: 11, title: 'Die Jacke gefällt mir!', banglaTitle: 'জ্যাকেটটি আমার পছন্দ হয়েছে!', startPage: 94, endPage: 102 },
  { kapitel: 'Kapitel 12', number: 12, title: 'Ab in den Urlaub!', banglaTitle: 'ছুটিতে যাত্রা / অবকাশ যাপন', startPage: 103, endPage: 109 }
];

let extractedPages = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    extractedPages = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    console.log(`Loaded ${Object.keys(extractedPages).length} cached pages.`);
  } catch (e) {
    console.error('Failed to parse cache, starting fresh:', e.message);
  }
}

async function extractPageWithRetry(pageNumber, retries = 5) {
  const pad = String(pageNumber).padStart(3, '0');
  const imgPath = `all_a1_pages/page_${pad}.png`;

  if (!fs.existsSync(imgPath)) {
    console.log(`Image ${imgPath} does not exist, skipping.`);
    return [];
  }

  const base64Data = fs.readFileSync(imgPath).toString('base64');

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: [
          {
            role: 'user',
            parts: [
              { inlineData: { mimeType: 'image/png', data: base64Data } },
              {
                text: `Extract all vocabulary table rows from this page (Mahmud Hasan Netzwerk neu A1 Glossar).
Return ONLY a valid JSON array of objects without markdown formatting:
[
  {
    "row": number,
    "german": string (German headword, with article and plural if shown),
    "bangla": string (clean Bengali meaning, correct spelling without English),
    "english": string (clean English meaning),
    "exampleGerman": string (German example sentence),
    "exampleBangla": string (Bengali translation of sentence)
  }
]
Important:
- NEVER leave bangla or english empty. If English is in the Bangla column, separate them cleanly.
- Keep the exact order of rows as printed on the page.`
              }
            ]
          }
        ]
      });

      let raw = response.text || '';
      raw = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
      const firstBracket = raw.indexOf('[');
      const lastBracket = raw.lastIndexOf(']');
      if (firstBracket !== -1 && lastBracket !== -1) {
        raw = raw.slice(firstBracket, lastBracket + 1);
      }

      const rows = JSON.parse(raw);
      if (Array.isArray(rows)) {
        return rows;
      }
      throw new Error('Parsed output is not an array');
    } catch (err) {
      console.warn(`[Page ${pageNumber}] Attempt ${attempt} failed: ${err.message}`);
      if (attempt < retries) {
        let delay = attempt * 4000;
        if (/quota|429|RESOURCE_EXHAUSTED/i.test(err.message)) {
          console.log(`[Page ${pageNumber}] Rate limit hit. Backing off 16s...`);
          delay = 16000;
        }
        await new Promise((r) => setTimeout(r, delay));
      } else {
        console.error(`[Page ${pageNumber}] All ${retries} attempts failed.`);
        return [];
      }
    }
  }
  return [];
}

async function run() {
  console.log('Starting safe rate-limited extraction (under 15 RPM)...');
  const pagesToProcess = [];
  for (let p = 1; p <= 109; p++) {
    const key = `page_${p}`;
    if (!extractedPages[key] || !Array.isArray(extractedPages[key]) || extractedPages[key].length === 0) {
      pagesToProcess.push(p);
    }
  }

  console.log(`${pagesToProcess.length} pages remaining to extract.`);

  for (let i = 0; i < pagesToProcess.length; i++) {
    const p = pagesToProcess[i];
    console.log(`[${i + 1}/${pagesToProcess.length}] Extracting page ${p} / 109...`);
    const rows = await extractPageWithRetry(p);
    console.log(`Page ${p} extracted: ${rows.length} rows.`);
    extractedPages[`page_${p}`] = rows;
    fs.writeFileSync(CACHE_FILE, JSON.stringify(extractedPages, null, 2));
    
    // 4.2s sleep ensures we stay safely under 15 RPM
    await new Promise((r) => setTimeout(r, 4200));
  }

  console.log('All 109 pages extracted! Now processing into final vocabulary JSON...');
  compileFinalVocabulary();
}

function normalizeWord(str) {
  if (!str) return '';
  return str
    .replace(/^(der|die|das)\s+/i, '')
    .replace(/,\s*.*$/, '')
    .replace(/[!?,.]/g, '')
    .trim()
    .toLowerCase();
}

function parseGermanHeadword(germanRaw) {
  let clean = (germanRaw || '').trim();
  let article = null;
  let plural = '—';
  let word = clean;

  const artMatch = clean.match(/^(der|die|das)\s+(.*)$/i);
  if (artMatch) {
    article = artMatch[1].toLowerCase();
    word = artMatch[2];
  }

  // Check plural e.g. "Autobahn, -en" or "Butterbrot, -e" or "Handtuch, "-er"
  const plMatch = word.match(/^(.*?),\s*(["'-]+.*)$/);
  if (plMatch) {
    word = plMatch[1].trim();
    const plSuffix = plMatch[2].trim();
    if (article === 'der') plural = `die ${word}${plSuffix.replace(/["'-]/g, '')}`;
    else if (article === 'das') plural = `die ${word}${plSuffix.replace(/["'-]/g, '')}`;
    else if (article === 'die') plural = `die ${word}${plSuffix.replace(/["'-]/g, '')}`;
    else plural = plSuffix;
  }

  // Infer Part of Speech
  let partOfSpeech = 'Ausdruck';
  if (article) {
    partOfSpeech = 'Nomen';
  } else if (/^[a-zäöüß]+en$/i.test(word) || /\|/.test(word) || /^(haben|sein|werden|können|müssen|wollen|sollen|dürfen|mögen)$/i.test(word)) {
    partOfSpeech = 'Verb';
  } else if (/^(gut|schlecht|groß|klein|neu|alt|schön|schnell|langsam|viel|wenig|richtig|falsch|wichtig|interessant|bekannt|international|billig|teuer|müde|gesund|krank|frei|fertig|klar|nett|freundlich)$/i.test(word)) {
    partOfSpeech = 'Adjektiv';
  } else if (/^(auch|hier|dort|heute|morgen|gestern|jetzt|sehr|gern|oft|immer|nie|wieder|schon|noch|vielleicht|leider|zusammen)$/i.test(word)) {
    partOfSpeech = 'Adverb';
  } else if (/^(in|an|auf|aus|bei|mit|nach|von|zu|vor|hinter|über|unter|neben|zwischen|für|ohne|durch|um|gegen)$/i.test(word)) {
    partOfSpeech = 'Präposition';
  } else if (/^(ich|du|er|sie|es|wir|ihr|sie|Sie|mein|dein|sein|ihr|unser|euer|wer|was|wo|wie|woher|wohin|welcher|welche|welches)$/i.test(word)) {
    partOfSpeech = 'Pronomen';
  } else if (/^(und|oder|aber|denn|weil|dass|wenn|als|also)$/i.test(word)) {
    partOfSpeech = 'Konjunktion';
  }

  return { article, word: word.replace(/\|/g, ''), plural, partOfSpeech };
}

function compileFinalVocabulary() {
  const finalItems = [];
  const chapterCounts = {};
  let globalId = 10001;

  for (const ch of CHAPTER_PAGES) {
    const seenInChapter = new Set();
    const chapterItems = [];

    for (let p = ch.startPage; p <= ch.endPage; p++) {
      const pageKey = `page_${p}`;
      const rows = extractedPages[pageKey] || [];

      for (const row of rows) {
        if (!row || !row.german) continue;
        let german = row.german.trim();
        if (german === 'n (+ D.)') {
          if (/nach Hause/i.test(row.exampleGerman || '')) german = 'nach (+ D.)';
          else if (/Woher|aus/i.test(row.exampleGerman || '') || (row.bangla || '').includes('থেকে')) german = 'aus (+ D.)';
          else german = 'in (+ D.)';
        }

        const norm = normalizeWord(german);
        if (!norm) continue;

        // Skip duplicates within chapter
        if (seenInChapter.has(norm)) {
          continue;
        }
        seenInChapter.add(norm);

        const parsed = parseGermanHeadword(german);

        // Clean example bangla
        let exBn = (row.exampleBangla || '').replace(/^[\(（]/, '').replace(/[\)）]$/, '').trim();
        let exDe = (row.exampleGerman || '').trim();
        let exEn = (row.exampleEnglish || '').trim();

        if (!exEn && exDe) {
          exEn = `Example: ${exDe}`;
        }

        let bn = (row.bangla || '').replace(/^[\(（]/, '').replace(/[\)）]$/, '').trim();
        let en = (row.english || '').replace(/^[\(（]/, '').replace(/[\)）]$/, '').trim();

        chapterItems.push({
          id: globalId++,
          level: 'A1',
          chapterWordNumber: 0, // filled below
          totalInChapter: 0,    // filled below
          german: german,
          word: parsed.word,
          article: parsed.article,
          plural: parsed.plural,
          partOfSpeech: parsed.partOfSpeech,
          bangla: bn,
          english: en,
          exampleGerman: exDe,
          exampleEnglish: exEn,
          exampleBangla: exBn,
          verbForms: parsed.partOfSpeech === 'Verb' ? german : '—',
          page: p + 1, // PDF printed book page
          kapitel: ch.kapitel,
          kapitelTitle: ch.title,
          kapitelBanglaTitle: ch.banglaTitle
        });
      }
    }

    // Number sequentially within chapter
    const total = chapterItems.length;
    chapterCounts[ch.kapitel] = total;

    chapterItems.forEach((item, idx) => {
      item.chapterWordNumber = idx + 1;
      item.totalInChapter = total;
      finalItems.push(item);
    });
  }

  console.log(`Compiled total of ${finalItems.length} unique words across 12 chapters!`);
  console.log('Chapter counts:', chapterCounts);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalItems, null, 2));
  console.log(`Saved to ${OUTPUT_FILE}`);

  // Update src/data/chapters.ts with new counts
  updateChaptersTs(chapterCounts);
}

function updateChaptersTs(counts) {
  const chaptersPath = 'src/data/chapters.ts';
  if (!fs.existsSync(chaptersPath)) return;

  let content = fs.readFileSync(chaptersPath, 'utf8');

  CHAPTER_PAGES.forEach((ch) => {
    const cnt = counts[ch.kapitel];
    if (cnt) {
      const reg = new RegExp(`(id:\\s*'${ch.kapitel}'[\\s\\S]*?wordCount:\\s*)\\d+`, 'm');
      content = content.replace(reg, `$1${cnt}`);
    }
  });

  fs.writeFileSync(chaptersPath, content);
  console.log('Updated src/data/chapters.ts with accurate counts.');
}

run().catch(console.error);
