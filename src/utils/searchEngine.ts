import { VocabularyItem } from '../types/index';

/**
 * Normalizes German strings by expanding or collapsing umlauts and removing articles.
 */
export function normalizeGerman(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/^(der|die|das|ein|eine|den|dem|des)\s+/i, '')
    .replace(/[!?,.:;'"—\-()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeGermanSimple(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 's')
    .replace(/^(der|die|das|ein|eine|den|dem|des)\s+/i, '')
    .replace(/[!?,.:;'"—\-()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalizes English strings by stripping leading infinitive markers and articles.
 */
export function normalizeEnglish(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/^(to\s+|a\s+|an\s+|the\s+)/i, '')
    .replace(/[!?,.:;'"—\-()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalizes Bengali strings for robust matching.
 */
export function normalizeBangla(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFC')
    .toLowerCase()
    .replace(/[।!?,.:;'"—\-()/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Common Bengali synonyms and cross-references to ensure everyday terms
 * instantly find their official textbook entries.
 */
export const BANGLA_SYNONYMS: Record<string, string[]> = {
  'বাসা': ['অ্যাপার্টমেন্ট', 'ফ্ল্যাট', 'বাসস্থান', 'ঘর', 'বাড়ি', 'বাড়ি', 'wohnung', 'haus'],
  'বাড়ি': ['বাসা', 'ঘর', 'বাসস্থান', 'ভবন', 'অ্যাপার্টমেন্ট', 'haus', 'wohnung'],
  'বাড়ি': ['বাসা', 'ঘর', 'বাসস্থান', 'ভবন', 'অ্যাপার্টমেন্ট', 'haus', 'wohnung'],
  'ফ্ল্যাট': ['অ্যাপার্টমেন্ট', 'বাসা', 'বাসস্থান', 'wohnung', 'apartment'],
  'গাড়ি': ['কার', 'যানবাহন', 'মহাসড়ক', 'auto', 'wagen', 'fahrrad'],
  'গাড়ি': ['কার', 'যানবাহন', 'মহাসড়ক', 'auto', 'wagen', 'fahrrad'],
  'পানি': ['জল', 'পানীয়', 'wasser', 'getränk', 'trinken'],
  'জল': ['পানি', 'পানীয়', 'wasser', 'trinken'],
  'খাবার': ['খাদ্য', 'খাওয়া', 'আহার', 'essen', 'lebensmittel', 'speise'],
  'খাওয়া': ['খাবার', 'আহার', 'essen', 'frühstück', 'mittagessen'],
  'ঘুম': ['ঘুমানো', 'নিদ্রা', 'বিছানা', 'schlafen', 'bett'],
  'ঘুমানো': ['ঘুম', 'নিদ্রা', 'schlafen', 'einschlafen'],
  'টাকা': ['পয়সা', 'অর্থ', 'মুদ্রা', 'ইউরো', 'geld', 'euro', 'cent'],
  'পয়সা': ['টাকা', 'অর্থ', 'geld', 'cent'],
  'কাজ': ['চাকরি', 'পেশা', 'কর্ম', 'অফিস', 'arbeiten', 'arbeit', 'beruf', 'job'],
  'চাকরি': ['কাজ', 'পেশা', 'কর্ম', 'arbeiten', 'arbeit', 'beruf', 'job'],
  'পেশা': ['কাজ', 'চাকরি', 'beruf', 'arbeit'],
  'সময়': ['ঘড়ি', 'বেলা', 'zeit', 'uhr', 'termin', 'stunde'],
  'ঘড়ি': ['সময়', 'uhr', 'armbanduhr'],
  'বন্ধু': ['বান্ধবী', 'বন্ধুত্ব', 'সহকর্মী', 'freund', 'freundin', 'kollege'],
  'বান্ধবী': ['বন্ধু', 'freundin', 'freund'],
  'ধন্যবাদ': ['কৃতজ্ঞতা', 'danke', 'dank', 'vielen dank'],
  'বিদায়': ['খোদা হাফেজ', 'দেখা হবে', 'tschüss', 'auf wiedersehen', 'ciao'],
  'হ্যালো': ['নমস্কার', 'সালাম', 'শুভ দিন', 'hallo', 'guten tag', 'grüß gott'],
  'শুভ দিন': ['হ্যালো', 'guten tag', 'hallo'],
  'শুভ সকাল': ['সকাল', 'guten morgen'],
  'শুভ রাত্রি': ['রাত', 'gute nacht'],
  'নাম': ['পরিচয়', 'name', 'heißen'],
  'দেশ': ['রাষ্ট্র', 'land', 'deutschland', 'bangladesch'],
  'ভাষা': ['মাতৃভাষা', 'sprache', 'deutsch', 'englisch', 'bengalisch'],
  'প্রশ্ন': ['জিজ্ঞাসা', 'frage', 'fragen'],
  'উত্তর': ['জবাব', 'antwort', 'antworten'],
  'বই': ['পুস্তক', 'খাতা', 'buch', 'heft'],
  'শহর': ['নগর', 'নগরী', 'stadt', 'dorf'],
  'দোকান': ['মার্কেট', 'বাজার', 'laden', 'geschäft', 'supermarkt', 'markt'],
  'রাস্তা': ['সড়ক', 'মহাসড়ক', 'পথ', 'straße', 'weg', 'autobahn'],
  'সড়ক': ['রাস্তা', 'মহাসড়ক', 'straße', 'autobahn'],
  'সকাল': ['প্রভাত', 'morgen', 'vormittag'],
  'দুপুর': ['মধ্যাহ্ন', 'mittag', 'nachmittag'],
  'রাত': ['সন্ধ্যা', 'nacht', 'abend'],
  'সপ্তাহ': ['woche', 'wochenende'],
  'মাস': ['monat'],
  'বছর': ['বৎসর', 'jahr'],
  'রং': ['রঙ', 'বর্ণ', 'farbe', 'bunt'],
  'রঙ': ['রং', 'বর্ণ', 'farbe'],
  'পরিবার': ['সংসার', 'familie', 'eltern'],
  'মা': ['আম্মা', 'মাতা', 'mutter', 'mama'],
  'বাবা': ['আব্বা', 'পিতা', 'vater', 'papa'],
  'ভাই': ['bruder', 'geschwister'],
  'বোন': ['schwester', 'geschwister'],
  'সন্তান': ['বাচ্চা', 'ছেলে', 'মেয়ে', 'kind', 'sohn', 'tochter'],
  'ডাক্তার': ['চিকিৎসক', 'কবিরাজ', 'arzt', 'ärztin', 'doktor'],
  'হাসপাতাল': ['চিকিৎসালয়', 'krankenhaus', 'klinik'],
  'ওষুধ': ['ঔষধ', 'দাওয়াই', 'medikament', 'tablette', 'medizin'],
  'জ্বর': ['অসুখ', 'অসুস্থ', 'fieber', 'krank'],
  'অসুস্থ': ['রোগী', 'জ্বর', 'krank', 'kranke'],
  'ছুটি': ['অবকাশ', 'ভ্রমণ', 'urlaub', 'ferien'],
  'ভ্রমণ': ['যাত্রা', 'ছুটি', 'reise', 'reisen', 'urlaub'],
  'টিকিট': ['fahrkarte', 'ticket'],
  'ট্রেন': ['রেল', 'zug', 'bahn', 's-bahn', 'u-bahn'],
  'বাস': ['bus'],
  'বিমান': ['উড়োজাহাজ', 'flugzeug'],
  'বিমানবন্দর': ['aeropuerto', 'flughafen'],
  'হোটেল': ['hotel', 'pension'],
  'সৈকত': ['সমুদ্র', 'বীচ', 'strand', 'meer', 'see'],
  'সমুদ্র': ['সৈকত', 'সাগর', 'meer', 'see', 'strand'],
  'পাহাড়': ['পর্বত', 'berg', 'berge'],
  'আবহাওয়া': ['আবহাওয়া', 'জলবায়ু', 'wetter'],
  'বৃষ্টি': ['বর্ষণ', 'regen', 'regnen'],
  'সূর্য': ['রোদ', 'sonne', 'sonnig'],
  'গরম': ['উষ্ণ', 'warm', 'heiß'],
  'ঠান্ডা': ['শীত', 'kalt', 'kälte', 'kühl'],
  'পোশাক': ['জামা', 'কাপড়', 'পোশাক-আশাক', 'kleidung', 'kleider'],
  'জামা': ['পোশাক', 'শার্ট', 'hemd', 'jacke', 't-shirt'],
  'জুতা': ['জুতো', 'schuh', 'schuhe', 'stiefel'],
  'দাঁড়ানো': ['দাঁড়িয়ে', 'দাড়িয়ে', 'stehen', 'aufstehen'],
  'বসা': ['আসন', 'sitzen', 'platz nehmen'],
  'পড়া': ['পড়াশোনা', 'অধ্যয়ন', 'lesen', 'lernen', 'studieren'],
  'লেখা': ['লিপিবদ্ধ', 'schreiben'],
  'বলা': ['কথা', 'উচ্চারণ', 'sprechen', 'sagen', 'reden'],
  'শোনা': ['শ্রবণ', 'hören', 'zuhören'],
  'দেখা': ['তাকানো', 'দর্শন', 'sehen', 'schauen', 'ansehen'],
  'বোঝা': ['উপলব্ধি', 'verstehen'],
  'কেনা': ['ক্রয়', 'বাজার', 'kaufen', 'einkaufen'],
  'রান্না': ['পাক', 'kochen'],
  'চা': ['tee'],
  'কফি': ['kaffee'],
  'দুধ': ['milch'],
  'মাংস': ['গোশত', 'fleisch'],
  'মাছ': ['fisch'],
  'রুটি': ['পাউরুটি', 'brot', 'brötchen'],
  'ফল': ['ফলমূল', 'obst', 'frucht', 'apfel'],
  'সবজি': ['তরকারি', 'gemüse', 'salat', 'tomate', 'kartoffel'],
  'পনির': ['চীজ', 'käse'],
  'ডিম': ['আন্ডা', 'ei', 'eier'],
  'চিনি': ['zucker'],
  'লবণ': ['নুন', 'salz'],
  'রস': ['জুস', 'শরবত', 'saft', 'orangensaft', 'apfelsaft'],
  'সসেজ': ['কাবাব', 'würstchen', 'würstel', 'wurst'],
  'স্যান্ডউইচ': ['বার্গার', 'butterbrot', 'sandwich'],
  'কি': ['কী', 'was', 'wie'],
  'কী': ['কি', 'was', 'wie'],
  'কেমন': ['কিভাবে', 'wie'],
  'কোথায়': ['কোথা', 'wo', 'woher', 'wohin'],
  'কখন': ['wann']
};

export interface SearchMatchResult {
  item: VocabularyItem;
  score: number;
  matchField: 'german' | 'english' | 'bangla' | 'plural' | 'verbForms' | 'example' | 'synonym';
  matchSnippet?: string;
}

/**
 * Calculates a match score for a vocabulary item against a given user query.
 * Returns score > 0 if matched, 0 if no match.
 */
export function calculateMatchScore(item: VocabularyItem, query: string): { score: number; matchField: SearchMatchResult['matchField']; snippet?: string } {
  const rawQ = query.trim();
  if (!rawQ) return { score: 0, matchField: 'german' };

  const qLower = rawQ.toLowerCase();
  const qDe = normalizeGerman(rawQ);
  const qDeSimple = normalizeGermanSimple(rawQ);
  const qEn = normalizeEnglish(rawQ);
  const qBn = normalizeBangla(rawQ);

  const german = (item.german || '').toLowerCase();
  const word = (item.word || '').toLowerCase();
  const wordDe = normalizeGerman(item.word || item.german);
  const wordDeSimple = normalizeGermanSimple(item.word || item.german);

  const english = (item.english || '').toLowerCase();
  const englishNorm = normalizeEnglish(item.english || '');

  const bangla = (item.bangla || '').toLowerCase();
  const banglaNorm = normalizeBangla(item.bangla || '');

  const plural = (item.plural || '').toLowerCase();
  const pluralDe = normalizeGerman(item.plural || '');

  const verbForms = (item.verbForms || '').toLowerCase();
  const verbFormsDe = normalizeGerman(item.verbForms || '');

  const exDe = (item.exampleGerman || '').toLowerCase();
  const exDeNorm = normalizeGerman(item.exampleGerman || '');

  const exBn = (item.exampleBangla || '').toLowerCase();
  const exBnNorm = normalizeBangla(item.exampleBangla || '');

  const exEn = (item.exampleEnglish || '').toLowerCase();
  const exEnNorm = normalizeEnglish(item.exampleEnglish || '');

  // 1. EXACT HEADWORD MATCHES (Highest Priority: 1000)
  if (word === qLower || wordDe === qDe || wordDeSimple === qDeSimple) {
    return { score: 1000, matchField: 'german', snippet: item.german };
  }
  if (bangla === qLower || banglaNorm === qBn) {
    return { score: 1000, matchField: 'bangla', snippet: item.bangla };
  }
  if (english === qLower || englishNorm === qEn) {
    return { score: 1000, matchField: 'english', snippet: item.english };
  }

  // 2. STARTS WITH HEADWORD (Priority: 800 - 850)
  if (word.startsWith(qLower) || wordDe.startsWith(qDe) || wordDeSimple.startsWith(qDeSimple)) {
    return { score: 850, matchField: 'german', snippet: item.german };
  }
  if (bangla.startsWith(qLower) || banglaNorm.startsWith(qBn)) {
    return { score: 850, matchField: 'bangla', snippet: item.bangla };
  }
  if (english.startsWith(qLower) || englishNorm.startsWith(qEn)) {
    return { score: 800, matchField: 'english', snippet: item.english };
  }

function matchesBanglaWord(text: string, q: string): boolean {
  if (!text || !q) return false;
  const words = text.split(/[\s,./—()\-+]+/);
  if (words.some(w => w === q || (w.startsWith(q) && w.length <= q.length + 3))) return true;
  if (q.length > 5 && text.includes(q)) return true;
  return false;
}

  // 3. WORD CONTAINS QUERY (Priority: 600 - 700)
  if (word.includes(qLower) || wordDe.includes(qDe) || wordDeSimple.includes(qDeSimple) || german.includes(qLower)) {
    return { score: 700, matchField: 'german', snippet: item.german };
  }
  if (matchesBanglaWord(bangla, qLower) || matchesBanglaWord(banglaNorm, qBn)) {
    return { score: 680, matchField: 'bangla', snippet: item.bangla };
  }
  if (english.includes(qLower) || englishNorm.includes(qEn)) {
    return { score: 650, matchField: 'english', snippet: item.english };
  }

  // 4. PLURAL OR VERB FORMS (Priority: 500 - 550)
  if (plural && (plural.includes(qLower) || pluralDe.includes(qDe))) {
    return { score: 550, matchField: 'plural', snippet: item.plural };
  }
  if (verbForms && (verbForms.includes(qLower) || verbFormsDe.includes(qDe))) {
    return { score: 550, matchField: 'verbForms', snippet: item.verbForms || undefined };
  }

  // 4b. TOPIC MATCHING (Priority: 520)
  const topic = (item.topic || '').toLowerCase();
  const topicBn = (item.topicBangla || '').toLowerCase();
  if (topic && (topic.includes(qLower) || normalizeGerman(item.topic || '').includes(qDe))) {
    return { score: 520, matchField: 'german', snippet: `Thema: ${item.topic}` };
  }
  if (topicBn && (topicBn.includes(qLower) || normalizeBangla(item.topicBangla || '').includes(qBn))) {
    return { score: 520, matchField: 'bangla', snippet: `টপিক: ${item.topicBangla}` };
  }

  // 5. BENGALI SYNONYM MATCHING (Priority: 500)
  const synList = BANGLA_SYNONYMS[qBn] || BANGLA_SYNONYMS[qLower];
  if (synList) {
    for (const syn of synList) {
      if (bangla.includes(syn) || banglaNorm.includes(syn) || wordDe.includes(syn) || word.includes(syn)) {
        return { score: 500, matchField: 'synonym', snippet: `সম্পর্কিত শব্দ: ${item.bangla}` };
      }
      if (exBn.includes(syn) || exBnNorm.includes(syn)) {
        return { score: 450, matchField: 'synonym', snippet: item.exampleBangla };
      }
    }
  }

  // Reverse synonym check: if any synonym key matches query
  for (const [key, list] of Object.entries(BANGLA_SYNONYMS)) {
    if (key.includes(qBn) || qBn.includes(key)) {
      if (bangla.includes(key) || banglaNorm.includes(key)) {
        return { score: 480, matchField: 'synonym', snippet: item.bangla };
      }
      for (const s of list) {
        if (bangla.includes(s) || word.includes(s)) {
          return { score: 460, matchField: 'synonym', snippet: item.bangla };
        }
      }
    }
  }

  // 6. EXAMPLE SENTENCES (Priority: 300 - 350)
  if (exDe.includes(qLower) || exDeNorm.includes(qDe) || exDeNorm.includes(qDeSimple)) {
    return { score: 350, matchField: 'example', snippet: item.exampleGerman };
  }
  if (exBn.includes(qLower) || exBnNorm.includes(qBn)) {
    return { score: 320, matchField: 'example', snippet: item.exampleBangla };
  }
  if (exEn.includes(qLower) || exEnNorm.includes(qEn)) {
    return { score: 300, matchField: 'example', snippet: item.exampleEnglish };
  }

  // 7. MULTI-TOKEN (AND) MATCHING (Priority: 250)
  const tokens = qLower.split(/\s+/).filter(t => t.length > 1);
  if (tokens.length > 1) {
    const combined = `${german} ${english} ${bangla} ${exDe} ${exBn} ${exEn}`.toLowerCase();
    const allMatch = tokens.every(tok => combined.includes(tok));
    if (allMatch) {
      return { score: 250, matchField: 'example', snippet: item.exampleGerman };
    }
  }

  return { score: 0, matchField: 'german' };
}

/**
 * Searches an array of vocabulary items and returns sorted results by relevance.
 */
export function searchVocabulary(items: VocabularyItem[], query: string): SearchMatchResult[] {
  if (!query || !query.trim()) return [];

  const results: SearchMatchResult[] = [];
  for (const item of items) {
    const { score, matchField, snippet } = calculateMatchScore(item, query);
    if (score > 0) {
      results.push({ item, score, matchField, matchSnippet: snippet });
    }
  }

  return results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Tie breaker: sort by chapter then word ID
    return a.item.id - b.item.id;
  });
}
