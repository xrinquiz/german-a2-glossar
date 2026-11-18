import fs from 'fs';

const VOCAB_FILE = 'src/data/a1_vocabulary.json';
const CHAPTERS_FILE = 'src/data/chapters.ts';

let vocab = JSON.parse(fs.readFileSync(VOCAB_FILE, 'utf8'));
console.log(`Starting with ${vocab.length} vocabulary entries.`);

// 1. Specific fixes for known OCR / heading artifacts
vocab = vocab.map(item => {
  let w = { ...item };

  // Fix typo in 'Kann ich einen Terman haben?' -> 'Termin'
  if (w.german && w.german.includes('Terman')) {
    w.german = w.german.replace('Terman', 'Termin');
    w.word = w.word.replace('Terman', 'Termin');
    if (w.exampleGerman && w.exampleGerman.includes('Terman')) {
      w.exampleGerman = w.exampleGerman.replace('Terman', 'Termin');
    }
  }

  // Fix separated prefix verbs
  if (w.german === 'zurück fahren' || w.word === 'zurück fahren') {
    w.german = 'zurückfahren';
    w.word = 'zurückfahren';
    w.partOfSpeech = 'Verb';
    w.exampleGerman = 'Wann fährst du nach Hause zurück?';
    w.exampleBangla = 'তুমি কখন বাড়ি ফিরে যাচ্ছ?';
    w.exampleEnglish = 'When are you driving back home?';
  }
  if (w.german === 'zurück finden' || w.word === 'zurück finden') {
    w.german = 'zurückfinden';
    w.word = 'zurückfinden';
    w.partOfSpeech = 'Verb';
    w.exampleGerman = 'Wir finden den Weg zurück.';
    w.exampleBangla = 'আমরা ফিরে যাওয়ার পথ খুঁজে পেয়েছি।';
    w.exampleEnglish = 'We will find the way back.';
  }
  if (w.german === 'wieder geben' || w.word === 'wieder geben') {
    w.german = 'wiedergeben';
    w.word = 'wiedergeben';
    w.partOfSpeech = 'Verb';
  }

  // Fix missing example for der Architekt
  if (w.german && w.german.startsWith('der Architekt') && (!w.exampleGerman || w.exampleGerman === '')) {
    w.exampleGerman = 'Er arbeitet als Architekt in Berlin.';
    w.exampleBangla = 'তিনি বার্লিনে একজন স্থপতি হিসেবে কাজ করেন।';
    w.exampleEnglish = 'He works as an architect in Berlin.';
  }

  // Fix chapter 6 reading heading 'Eine Überraschung für Sofia' -> 'die Überraschung, -en'
  if (w.german && w.german.includes('Eine Überraschung für Sofia')) {
    w.german = 'die Überraschung, -en';
    w.word = 'Überraschung';
    w.article = 'die';
    w.plural = 'die Überraschungen';
    w.partOfSpeech = 'Nomen';
    w.bangla = 'চমক / বিস্ময়';
    w.english = 'surprise';
    w.exampleGerman = 'Das ist eine tolle Überraschung!';
    w.exampleBangla = 'এটা একটা দারুণ চমক!';
    w.exampleEnglish = 'That is a great surprise!';
  }

  // Parse verb forms e.g. "singen, er singt, hat gesungen" or "gehen, er geht, ist gegangen"
  const verbMatch = w.german.match(/^([a-zäöüß\s]+(?:en|n|sein)),\s*((?:er|sie|es)\s+.*)$/i);
  if (verbMatch) {
    const baseVerb = verbMatch[1].trim();
    const forms = verbMatch[2].trim();
    w.word = baseVerb;
    w.verbForms = forms;
    w.partOfSpeech = 'Verb';
  }

  // Clean headwords that had example sentences in parentheses
  const parenExMatch = w.german.match(/^([a-zäöüß]+)\s*\(([^)]+)\)$/i);
  if (parenExMatch) {
    const head = parenExMatch[1].trim();
    const inner = parenExMatch[2].trim();
    // If inner contains a complete sentence with punctuation
    if (/[?!.]/.test(inner) || inner.split(/\s+/).length >= 3) {
      w.word = head;
      if (!w.exampleGerman || w.exampleGerman.length === 0) {
        w.exampleGerman = inner;
      }
    }
  }

  return w;
});

// 2. Remove duplicates per chapter
function getBaseKey(item) {
  let s = item.word || item.german;
  return s
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/^(der|die|das)\s+/i, '')
    .replace(/,\s*.*$/, '')
    .replace(/[!?,.]/g, '')
    .trim()
    .toLowerCase();
}

const cleanedVocab = [];
const chapterGroups = {};

for (const item of vocab) {
  if (!chapterGroups[item.kapitel]) {
    chapterGroups[item.kapitel] = {
      seen: new Set(),
      items: []
    };
  }

  const baseKey = getBaseKey(item);
  if (!baseKey) continue;

  if (chapterGroups[item.kapitel].seen.has(baseKey)) {
    console.log(`[Deduplicated in ${item.kapitel}] Dropping duplicate: "${item.german}" (base: "${baseKey}")`);
    continue;
  }

  chapterGroups[item.kapitel].seen.add(baseKey);
  chapterGroups[item.kapitel].items.push(item);
}

// 3. Renumber sequentially in each chapter
const newCounts = {};
let globalId = 10001;

for (const [kapitel, group] of Object.entries(chapterGroups)) {
  const total = group.items.length;
  newCounts[kapitel] = total;

  group.items.forEach((item, index) => {
    item.id = globalId++;
    item.chapterWordNumber = index + 1;
    item.totalInChapter = total;
    cleanedVocab.push(item);
  });
}

console.log(`Final vocabulary count: ${cleanedVocab.length} words across 12 chapters.`);
console.log('Chapter counts:', newCounts);

// Write final cleaned vocabulary
fs.writeFileSync(VOCAB_FILE, JSON.stringify(cleanedVocab, null, 2));
console.log(`Saved clean vocabulary to ${VOCAB_FILE}`);

// Update src/data/chapters.ts with new counts
if (fs.existsSync(CHAPTERS_FILE)) {
  let content = fs.readFileSync(CHAPTERS_FILE, 'utf8');
  for (const [kap, cnt] of Object.entries(newCounts)) {
    const reg = new RegExp(`(id:\\s*'${kap}'[\\s\\S]*?wordCount:\\s*)\\d+`, 'm');
    content = content.replace(reg, `$1${cnt}`);
  }
  fs.writeFileSync(CHAPTERS_FILE, content);
  console.log(`Updated ${CHAPTERS_FILE} with accurate counts.`);
}
