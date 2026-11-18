import fs from 'fs';

const rawEntries = JSON.parse(fs.readFileSync('parsed_raw_entries.json', 'utf8'));

// Load previously enriched entries from Gemini (325 items)
let enrichedMap = {};
if (fs.existsSync('enrich_progress.json')) {
  try {
    enrichedMap = JSON.parse(fs.readFileSync('enrich_progress.json', 'utf8'));
  } catch (e) {
    enrichedMap = {};
  }
}

// Chapter metadata
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

// Comprehensive dictionary for Netzwerk neu A2 German-to-English translations
const GERMAN_TO_ENGLISH = {
  'schicksal': 'fate, destiny',
  'sorge': 'worry, concern, care',
  'sterben': 'to die',
  'talent': 'talent',
  'tschechien': 'Czech Republic',
  'witz': 'joke',
  'freundschaft': 'friendship',
  'hauptperson': 'main character, protagonist',
  'kurzbeschreibung': 'short description, synopsis',
  'spielen': 'to play, to be set in (film)',
  'tot': 'dead',
  'kinobesuch': 'cinema visit, trip to movies',
  'filmmusik': 'film score, soundtrack',
  'formulierung': 'wording, phrasing',
  'handlung': 'plot, storyline, action',
  'logisch': 'logical',
  'uberhaupt': 'at all, generally',
  'überhaupt': 'at all, generally',
  'einfach': 'simple, easy, just',
  'kommentieren': 'to comment on',
  'zuletzt': 'last, at last, finally',
  'trailer': 'movie trailer',
  'vergleich': 'comparison',
  'aufgeregt': 'excited, nervous',
  'babykleidung': 'baby clothes',
  'bestehen': 'to pass (exam), to consist of',
  'brautkleid': 'wedding dress',
  'fuhrerschein': 'driver\'s license',
  'führerschein': 'driver\'s license',
  'fuhrerscheinprufung': 'driving test',
  'führerscheinprüfung': 'driving test',
  'geback': 'pastries, baked goods',
  'gebäck': 'pastries, baked goods',
  'geburt': 'birth',
  'gefuhl': 'feeling, emotion',
  'gefühl': 'feeling, emotion',
  'gratulieren': 'to congratulate',
  'medaille': 'medal',
  'nervos': 'nervous',
  'nervös': 'nervous',
  'platz': 'place, seat, square',
  'prufung': 'examination, test',
  'prüfung': 'examination, test',
  'schenken': 'to give as a gift',
  'stolz': 'proud',
  'traurig': 'sad',
  'weinen': 'to cry, to weep',
  'wunschen': 'to wish',
  'wünschen': 'to wish',
  'angst': 'fear, anxiety',
  'enttauscht': 'disappointed',
  'enttäuscht': 'disappointed',
  'froh': 'glad, happy',
  'gluck': 'luck, happiness',
  'glück': 'luck, happiness',
  'hoffen': 'to hope',
  'mutig': 'brave, courageous',
  'peinlich': 'embarrassing',
  'sauer': 'sour, angry, annoyed',
  'schade': 'a pity, too bad',
  'schrecklich': 'terrible, awful',
  'uberrascht': 'surprised',
  'überrascht': 'surprised',
  'wutend': 'furious, angry',
  'wütend': 'furious, angry',
  'angenehm': 'pleasant, agreeable',
  'unangenehm': 'unpleasant',
  'sympathisch': 'likable, pleasant',
  'unsympathisch': 'unlikable, unpleasant',
  'amt': 'office, government agency',
  'ausfullen': 'to fill out (form)',
  'ausfüllen': 'to fill out (form)',
  'bestatigung': 'confirmation',
  'bestätigung': 'confirmation',
  'formular': 'form, application',
  'offnungszeiten': 'opening hours',
  'öffnungszeiten': 'opening hours',
  'termin': 'appointment',
  'unterschrift': 'signature',
  'unterschreiben': 'to sign',
  'warten': 'to wait',
  'wartezeit': 'waiting time',
  'wohnheim': 'student dormitory, hall of residence',
  'bezahlung': 'payment, salary',
  'verwaltung': 'administration, management',
  'arger': 'annoyance, anger',
  'ärger': 'annoyance, anger',
  'ermaßigung': 'discount, reduction',
  'ermäßigung': 'discount, reduction',
  'dazukommen': 'to be added, to join',
  'beschreibung': 'description',
  'portion': 'portion, serving',
  'fanseite': 'fan page',
  'ratte': 'rat',
  'konzertsaal': 'concert hall',
  'lucke': 'gap, blank',
  'lücke': 'gap, blank',
  'bestatigen': 'to confirm',
  'bestätigen': 'to confirm',
  'anschließend': 'subsequently, afterwards',
  'vorwahl': 'area code, dialing code',
  'stichwort': 'keyword, cue',
  'bauernhof': 'farm, farmhouse',
  'gespannt': 'curious, in suspense',
  'vergangenheit': 'past',
  'verbringen': 'to spend (time)',
  'außern': 'to express, to state',
  'äußern': 'to express, to state',
  'konig': 'king',
  'könig': 'king',
  'fußballschuh': 'football boot, soccer shoe',
  'verkehr': 'traffic',
  'ampel': 'traffic light',
  'umsteigen': 'to change (trains/buses)',
  'abfahren': 'to depart',
  'abfahrt': 'departure',
  'ankommen': 'to arrive',
  'ankunft': 'arrival',
  'verspatung': 'delay',
  'verspätung': 'delay',
  'haltestelle': 'stop, station',
  'fahrkarte': 'ticket',
  'gleis': 'platform, track',
  'gepack': 'luggage, baggage',
  'gepäck': 'luggage, baggage',
  'koffer': 'suitcase',
  'tasche': 'bag, pocket',
  'reise': 'trip, journey',
  'reisen': 'to travel',
  'flugzeug': 'airplane',
  'flughafen': 'airport',
  'fliegen': 'to fly',
  'flug': 'flight',
  'zug': 'train',
  'bahn': 'railway, train',
  'ubahn': 'subway, metro',
  'u-bahn': 'subway, metro',
  'sbahn': 'suburban train',
  's-bahn': 'suburban train',
  'straßenbahn': 'tram, streetcar',
  'bus': 'bus',
  'auto': 'car',
  'fahrrad': 'bicycle, bike',
  'rad': 'wheel, bike',
  'fußganger': 'pedestrian',
  'fußgänger': 'pedestrian',
  'straße': 'street, road',
  'kreuzung': 'intersection, crossroads',
  'brucke': 'bridge',
  'brücke': 'bridge',
  'tunnel': 'tunnel',
  'ecke': 'corner',
  'parkplatz': 'parking lot, parking space',
  'tankstelle': 'petrol station, gas station',
  'werkstatt': 'workshop, garage',
  'panne': 'breakdown (car)',
  'reparatur': 'repair',
  'reparieren': 'to repair, to fix'
};

// Comprehensive Bengali text cleaner
function cleanBengaliText(str) {
  if (!str) return '';
  let s = str;

  // Exercise headers & tags
  s = s.replace(/\b\d+[a-z]?\s*(?:ÜB|UB)?\.?/gi, '');
  s = s.replace(/Unterwegs\s*\d+[a-z]?\.?/gi, '');
  s = s.replace(/Kino!\s*Kino!\s*-\s*মসচ্ছনিা!\s*মসচ্ছনিা!/gi, '');
  s = s.replace(/Und\s+was\s+hast\s+du\s+gemacht\?\s*\([^)]*\)\s*\d+[a-z]?/gi, '');
  s = s.replace(/\([HS],\s*[^)]+\)/g, '');

  const rules = [
    [/প্র\s*মিক্ষণ\s*,\s*মিক্ষা/g, 'প্রশিক্ষণ, শিক্ষা'],
    [/ব্\s*াাংি\s*িি\s*মচারী\s*\(িমিলা\)/g, 'ব্যাংক কর্মকর্তা (মহিলা)'],
    [/ব্\s*াাংি\s*িি\s*মচারী\s*\(পুরু\s*ষ\s*\)/g, 'ব্যাংক কর্মকর্তা (পুরুষ)'],
    [/ব্\s*াাংি\s*িাড\s*ম/g, 'ব্যাংক কার্ড'],
    [/ব্\s*াাংি/g, 'ব্যাংক'],
    [/িি\s*মচারী/g, 'কর্মচারী'],
    [/িিচারী\s*ম?/g, 'কর্মচারী'],
    [/জন্মগ্রিণ\s*িরা/g, 'গ্রহণ করা'],
    [/গ্রিণ\s*িরা/g, 'গ্রহণ করা'],
    [/মববািমবচ্ছেদ/g, 'বিবাহবিচ্ছেদ'],
    [/মববাি/g, 'বিবাহ'],
    [/মবচ্ছেদ/g, 'বিচ্ছেদ'],
    [/গ্র\s*াি/g, 'গ্রাম'],
    [/শুচ্ছয়\s*থািা/g, 'শুয়ে থাকা'],
    [/শুচ্ছয়/g, 'শুয়ে'],
    [/থািা/g, 'থাকা'],
    [/থািচ্ছত/g, 'থাকতে'],
    [/থাচ্ছিন/g, 'থাকেন'],
    [/স\s*াডায়\s*চডা/g, 'ঘোড়ায় চড়া'],
    [/স\s*াডা/g, 'ঘোড়া'],
    [/সাংস্কার\s*িরা/g, 'সংস্কার করা'],
    [/সাংস্কার/g, 'সংস্কার'],
    [/সপনিনচ্ছ\s*াগী\s*\(পুরু\s*ষ\s*\)/g, 'পেনশনভোগী (পুরুষ)'],
    [/সপনিনচ্ছ\s*াগী\s*\(িমিলা\)/g, 'পেনশনভোগী (মহিলা)'],
    [/সপনিনচ্ছ\s*াগী/g, 'পেনশনভোগী'],
    [/িির\s*সিন্দ্র/g, 'শহরের কেন্দ্র'],
    [/সিন্দ্র/g, 'কেন্দ্র'],
    [/নাি\s*নমথভুক্ত\s*িরা/g, 'নাম নথিভুক্ত করা'],
    [/চক্ষু\s*মবচ্ছিষজ্ঞ\s*\(পুরু\s*ষ\s*\)/g, 'চক্ষু বিশেষজ্ঞ (পুরুষ)'],
    [/চক্ষু\s*মবচ্ছিষজ্ঞ\s*\(িমিলা\)/g, 'চক্ষু বিশেষজ্ঞ (মহিলা)'],
    [/মবচ্ছিষজ্ঞ/g, 'বিশেষজ্ঞ'],
    [/মবচ্ছিষত/g, 'বিশেষত'],
    [/সিষ\s*িরা/g, 'শেষ করা'],
    [/সিষ/g, 'শেষ'],
    [/জীবমবজ্ঞান/g, 'জীববিজ্ঞান'],
    [/মবচ্ছয়\s*িরা/g, 'বিয়ে করা'],
    [/মবচ্ছয়/g, 'বিয়ে'],
    [/াডা\s*সনওয়া/g, 'ভাড়া নেওয়া'],
    [/াডা/g, 'ভাড়া'],
    [/সনওয়া/g, 'নেওয়া'],
    [/সনওয়া/g, 'নেওয়া'],
    [/সদওয়া/g, 'দেওয়া'],
    [/সদওয়া/g, 'দেওয়া'],
    [/সগ্রড/g, 'গ্রেড'],
    [/সাংগঠিত\s*িরা/g, 'সংগঠিত করা'],
    [/সাংগঠিত/g, 'সংগঠিত'],
    [/সরািামিি/g, 'রোমান্টিক'],
    [/সরািাঞ্চির/g, 'রোমাঞ্চকর'],
    [/অাংিগ্রিণ\s*িরা/g, 'অংশগ্রহণ করা'],
    [/অাংিগ্রিণ/g, 'অংশগ্রহণ'],
    [/অাংি/g, 'অংক / গণিত'],
    [/ক্ল\s*াব/g, 'ক্লাব'],
    [/সখাোঁজা/g, 'খোঁজা'],
    [/এিসাচ্ছথ/g, 'একসাথে'],
    [/সজচ্ছনটি/g, 'জেনেটিভ'],
    [/িারি/g, 'কারক'],
    [/িাজ/g, 'কাজ'],
    [/িাচ্ছজ/g, 'কাজে'],
    [/িরা/g, 'করা'],
    [/িচ্ছর/g, 'করে'],
    [/িচ্ছরছ/g, 'করেছ'],
    [/িমিলা/g, 'মহিলা'],
    [/পুরু\s*ষ/g, 'পুরুষ'],
    [/মিক্ষা/g, 'শিক্ষা'],
    [/মচমিৎসি/g, 'চিকিৎসক'],
    [/মচমিৎসচ্ছির/g, 'চিকিৎসকের'],
    [/মবরক্ত/g, 'বিরক্ত'],
    [/িাসা/g, 'হাসা'],
    [/িষ্ট/g, 'স্পষ্ট'],
    [/অমস্থর/g, 'অস্থির'],
    [/পমরবতনম/g, 'পরিবর্তন'],
    [/িাযিমরী/g, 'কার্যকরী'],
    [/িাযিমর/g, 'কার্যকর'],
    [/মবজ্ঞাপনী/g, 'বিজ্ঞাপনী'],
    [/ঠিি/g, 'ঠিক'],
    [/আচ্ছছ/g, 'আছে'],
    [/সথচ্ছি/g, 'থেকে'],
    [/পযেম/g, 'পর্যন্ত'],
    [/ভ্রিণ/g, 'ভ্রমণ'],
    [/মবদ্যালয়/g, 'বিদ্যালয়'],
    [/সনাটিমফচ্ছিিন/g, 'নোটিফিকেশন'],
    [/ডকুচ্ছিি/g, 'ডকুমেন্ট'],
    [/মদচ্ছয়/g, 'দিয়ে'],
    [/মদচ্ছি/g, 'দিকে'],
    [/লাগাচ্ছনা/g, 'লাগানো'],
    [/মবষয়/g, 'বিষয়'],
    [/অম জ্ঞতা/g, 'অভিজ্ঞতা'],
    [/সমতয/g, 'সত্যি'],
    [/মবিাল/g, 'বিশাল'],
    [/প্রমতচ্ছযামগতা/g, 'প্রতিযোগিতা'],
    [/মবমনিয়/g, 'বিনিময়'],
    [/িাউিার/g, 'কাউন্টার'],
    [/সুরিার/g, 'সুরকার'],
    [/গায়ি/g, 'গায়ক'],
    [/গাময়িা/g, 'গায়িকা'],
    [/প্রমিক্ষি/g, 'প্রশিক্ষক'],
    [/মচত্রিলা/g, 'চিত্রকলা'],
    [/মচত্রমিল্পী/g, 'চিত্রশিল্পী'],
    [/পমথি/g, 'পথিক'],
    [/সশ্রাতা/g, 'শ্রোতা'],
    [/সাংবাদ\s*পা\s*ি/g, 'সংবাদ পাঠক'],
    [/সরমডও\s*স\s*াষি/g, 'রেডিও ঘোষক'],
    [/সাংগ্রািি/g, 'সংগ্রাহক'],
    [/ব্াট/g, 'ব্যাট'],
    [/সখলা/g, 'খেলা'],
    [/সখলার/g, 'খেলার'],
    [/িযাটালগ/g, 'ক্যাটালগ'],
    [/মবচ্ছদমি/g, 'বিদেশি'],
    [/মফতা/g, 'ফিতা'],
    [/গুিা/g, 'গুহা'],
    [/সরাবট/g, 'রোবট'],
    [/প্রমতষ্ঠান/g, 'প্রতিষ্ঠান'],
    [/পমরচ্ছবি/g, 'পরিবেশ'],
    [/িনসাট/g, 'কনসার্ট'],
    [/োমফি/g, 'ট্রাফিক'],
    [/পামিাংম/g, 'পার্কিং'],
    [/মডচ্ছজল/g, 'ডিজেল'],
    [/মিমডউল/g, 'শিডিউল'],
    [/বাচ্ছিযর/g, 'বাক্যের'],
    [/বািয/g, 'বাক্য'],
    [/মচিামন/g, 'চিহ্ন'],
    [/মফচ্ছর/g, 'ফিরে'],
    [/মবপদ/g, 'বিপদ'],
    [/সািচ্ছনর/g, 'সামনের'],
    [/সপছচ্ছনর/g, 'পেছনের'],
    [/িাোঁটা/g, 'হাঁটা'],
    [/সরাসমর/g, 'সরাসরি'],
    [/মবপরীত/g, 'বিপরীত'],
    [/মবপযয়ম/g, 'বিপর্যয়'],
    [/মবশ্বত/g, 'বিশ্বস্ত'],
    [/মবচ্ছরামধতা/g, 'বিরোধিতা'],
    [/সিনিীলতা/g, 'সহনশীলতা'],
    [/িযাচ্ছফ/g, 'ক্যাফে'],
    [/িযাচ্ছফচ্ছটমরয়া/g, 'ক্যাফেটেরিয়া'],
    [/িযামম্পাং/g, 'ক্যাম্পিং'],
    [/ব্ািপ্যাি/g, 'ব্যাকপ্যাক'],
    [/মপ্রি/g, 'প্রিন্ট'],
    [/ব্লি/g, 'ব্লক'],
    [/িযািন/g, 'ক্যান্টন'],
    [/মফল্ম/g, 'ফিল্ম'],
    [/মিলার/g, 'থ্রিলার'],
    [/মবলামসতা/g, 'বিলাসিতা'],
    [/বগমমিটার/g, 'বর্গমিটার'],
    [/মবজ্ঞমপ্ত/g, 'বিজ্ঞপ্তি'],
    [/সিি/g, 'কেক'],
    [/ফুচ্ছলর\s*পাত্র/g, 'ফুলের টব'],
    [/সিচ্ছঝ/g, 'মেঝে'],
    [/সখলনা/g, 'খেলনা'],
    [/সঝালাচ্ছনা/g, 'ঝোলানো'],
    [/ঝলাচ্ছনা/g, 'ঝোলানো'],
    [/াড়াটিয়া/g, 'ভাড়াটিয়া'],
    [/আসবাবপত্রসি/g, 'আসবাবপত্রসহ'],
    [/অমতমরক্ত/g, 'অতিরিক্ত'],
    [/ডািবাক্স/g, 'ডাকবাক্স'],
    [/সিৌতূিলী/g, 'কৌতূহলী'],
    [/পদতযাগ/g, 'পদত্যাগ'],
    [/অনুচ্ছিাদন/g, 'অনুমোদন'],
    [/প্রচ্ছযাজয/g, 'প্রযোজ্য'],
    [/সিয়িাল/g, 'সময়কাল'],
    [/সিয়/g, 'সময়'],
    [/ালুি/g, 'ভালুক'],
    [/খরচ্ছগাি/g, 'খরগোশ'],
    [/মবড়াল/g, 'বিড়াল'],
    [/আদচ্ছরর\s*নাি/g, 'আদরের নাম'],
    [/প্রাণীর\s*নাি/g, 'প্রাণীর নাম'],
    [/সপাষা\s*প্রাণী/g, 'পোষা প্রাণী'],
    [/শূির/g, 'শূকর'],
    [/পশুমচমিত্সি/g, 'পশুচিকিৎসক'],
    [/পামখ/g, 'পাখি'],
    [/কৃষি/g, 'কৃষক'],
    [/িামলি/g, 'মালিক'],
    [/মচমেত/g, 'চিন্তিত'],
    [/অথামৎ/g, 'অর্থাৎ'],
    [/স\s*ড়া/g, 'ভেড়া'],
    [/বামড়/g, 'বাড়ি'],
    [/অেত/g, 'অন্তত'],
    [/সিাটা/g, 'মোটা'],
    [/খাওয়াচ্ছনা/g, 'খাওয়ানো'],
    [/পাচ্ছির/g, 'পাশের'],
    [/পামলচ্ছয়/g, 'পালিয়ে'],
    [/িযাচ্ছটর/g, 'ফ্ল্যাটের'],
    [/সবি\s*িরা/g, 'বেক করা'],
    [/মনিামণ/g, 'নির্মাণ'],
    [/িাতাল/g, 'মাতাল'],
    [/ািা/g, 'ভাঙা'],
    [/সমজ্জত/g, 'সজ্জিত'],
    [/গৃমিণী/g, 'গৃহিণী'],
    [/গৃিিতাম/g, 'গৃহকর্তা'],
    [/আ\s*াত/g, 'আঘাত'],
    [/ita\s*it/g, 'মতামত'],
    [/ita\s*it/g, 'মতামত'],
    [/চািমর/g, 'চাকরি'],
    [/সবমির\s*াগ/g, 'বেশিরভাগ'],
    [/বিাঝিা/g, 'বকাঝকা'],
    [/সবসিয়/g, 'সবসময়'],
    [/িব্দ/g, 'শব্দ'],
    [/উদািরণ/g, 'উদাহরণ'],
    [/মব\s*াগ/g, 'বিভাগ'],
    [/খুব\s*াচ্ছলা/g, 'খুব ভালো'],
    [/িায়াি/g, 'কায়াক'],
    [/আগ্রিী/g, 'আগ্রহী'],
    [/আচ্ছপচ্ছলর/g, 'আপেলের'],
    [/গরি/g, 'গরম'],
    [/মিটিাং/g, 'হিটিং'],
    [/ব্ততা/g, 'ব্যস্ততা'],
    [/সিিারী/g, 'সহকারী'],
    [/িীতল/g, 'শীতল'],
    [/ফাোঁি/g, 'ফাঁক'],
    [/উৎপাদন/g, 'উৎপাদন'],
    [/মবদুযৎ/g, 'বিদ্যুৎ'],
    [/স্বপ্ন\s*সদখা/g, 'স্বপ্ন দেখা'],
    [/সাংগ্রি/g, 'সংগ্রহ'],
    [/আচ্ছরাগ্য/g, 'আরোগ্য'],
    [/সিাচ্ছলর/g, 'সকালের'],
    [/পরািি/g, 'পরামর্শ'],
    [/প্রিাি/g, 'প্রকাশ'],
    [/মবচ্ছনাদন/g, 'বিনোদন'],
    [/সিাজ/g, 'সমাজ'],
    [/সমিাংসতা/g, 'সহিংসতা'],
    [/মিশুচ্ছদর/g, 'শিশুদের'],
    [/রূপিথার/g, 'রূপকথার'],
    [/দুগ\s*ম/g, 'দুর্গ'],
    [/চ্ছয়স/g, 'ভয়েস'],
    [/অম\s*চ্ছনতা/g, 'অভিনেতা'],
    [/অম\s*চ্ছনত্রী/g, 'অভিনেত্রী'],
    [/সাংগীত/g, 'সংগীত'],
    [/রি\s*সাংগীত/g, 'রক সংগীত'],
    [/সাংচ্ছক্ষপণ/g, 'সংক্ষেপণ'],
    [/িতামবলী/g, 'শর্তাবলী'],
    [/মনমিত/g, 'নিশ্চিত'],
    [/ঘুমিচ্ছয়/g, 'ঘুমিয়ে'],
    [/স\s*াষণা/g, 'ঘোষণা'],
    [/অমডও/g, 'অডিও'],
    [/ইমঙ্গত/g, 'ইঙ্গিত'],
    [/মিচ্ছরানাি/g, 'শিরোনাম'],
    [/অন্ধিার/g, 'অন্ধকার'],
    [/পরবতী/g, 'পরবর্তী'],
    [/^াগ্য/g, 'ভাগ্য'],
    [/^াচ্ছলা/g, 'ভালো'],
    [/^ারি/g, 'ভারী'],
    [/^ারত/g, 'ভারত'],
    [/^াষা/g, 'ভাষা'],
    [/^াবনা/g, 'ভাবনা'],
    [/দুমিন্তা/g, 'দুশ্চিন্তা'],
    [/দু\s*মিো/g, 'দুশ্চিন্তা'],
    [/শিিব/g, 'শৈশব'],
    [/ি\s*াৎ\s*িচ্ছর/g, 'হঠাৎ করে'],
    [/িারা\s*যাওয়া/g, 'মারা যাওয়া'],
    [/প্র\s*মত\s*া/g, 'প্রতিভা'],
    [/সচি\s*প্র\s*জাতন্ত্র/g, 'চেক প্রজাতন্ত্র'],
    [/উচ্ছিমজত/g, 'উত্তেজিত'],
    [/সবতন/g, 'বেতন'],
    [/প্র\s*িাসন/g, 'প্রশাসন'],
    [/মবরমক্ত/g, 'বিরক্তি'],
    [/ব্\s*বিার/g, 'ব্যবহার'],
    [/কনসার্ট\s*ম\s*িল/g, 'কনসার্ট হল'],
    [/পািম\s*করা\s*বা\s*থাকাচ্ছনা/g, 'পার্ক করা বা থামানো'],
    [/তামল\s*দেওয়া/g, 'তালি দেওয়া'],
    [/সিৌমখি/g, 'মৌখিক'],
    [/সিানা/g, 'শোনা'],
    [/খভাঙার/g, 'খামার'],
    [/ডায়ামলাং\s*সিাড/g, 'ডায়ালিং কোড']
  ];

  for (const [p, r] of rules) {
    s = s.replace(p, r);
  }

  // Remove multiple spaces, tabs, and dangling hyphens
  s = s.replace(/\s+/g, ' ').replace(/^[\s,–—\-]+|[\s,–—\-]+$/g, '').trim();
  return s;
}

// Full plural builder
function buildPlural(german) {
  if (!german) return '—';
  const article = german.startsWith('der ') ? 'der' : german.startsWith('die ') ? 'die' : german.startsWith('das ') ? 'das' : null;
  if (!article) return '—';

  const baseNoun = german.replace(/^(der|die|das)\s+/i, '').replace(/,\s*.*$/, '').replace(/\|/g, '').trim();

  const match = german.match(/,\s*([^\s]+)/);
  if (!match) return '—';
  const marker = match[1];

  if (!marker || marker === '—' || marker === '(Sg.)' || marker.includes('ohne Artikel') || marker.includes('kein Plural')) {
    return '—';
  }

  if (marker === '-en' || marker === 'en') return `die ${baseNoun}en`;
  if (marker === '-n' || marker === 'n') return `die ${baseNoun}n`;
  if (marker === '-s' || marker === 's') return `die ${baseNoun}s`;
  if (marker === '-e' || marker === 'e') return `die ${baseNoun}e`;
  if (marker === '-er' || marker === 'er') return `die ${baseNoun}er`;
  if (marker === '-' || marker === '—') return `die ${baseNoun}`;
  if (marker === '"-e' || marker === '"-er' || marker === '"-') {
    let modified = baseNoun.replace(/a/, 'ä').replace(/o/, 'ö').replace(/u/, 'ü').replace(/A/, 'Ä').replace(/O/, 'Ö').replace(/U/, 'Ü');
    if (marker === '"-e') return `die ${modified}e`;
    if (marker === '"-er') return `die ${modified}er`;
    return `die ${modified}`;
  }

  if (marker.length > 2 && !marker.startsWith('-')) {
    return `die ${marker}`;
  }

  return `die ${baseNoun}${marker.replace(/^-/, '')}`;
}

// Generate an authentic A2 German example sentence and translation
function getExample(german, word, partOfSpeech, bangla, english) {
  const cleanWord = word.trim();
  const art = german.startsWith('der ') ? 'der' : german.startsWith('die ') ? 'die' : german.startsWith('das ') ? 'das' : null;

  if (art === 'der') {
    return {
      exampleGerman: `Der ${cleanWord} ist für uns sehr wichtig.`,
      exampleEnglish: `The ${english} is very important for us.`,
      exampleBangla: `${bangla} আমাদের জন্য অত্যন্ত গুরুত্বপূর্ণ।`
    };
  }
  if (art === 'die') {
    return {
      exampleGerman: `Wir brauchen eine neue ${cleanWord}.`,
      exampleEnglish: `We need a new ${english}.`,
      exampleBangla: `আমাদের একটি নতুন ${bangla} প্রয়োজন।`
    };
  }
  if (art === 'das') {
    return {
      exampleGerman: `Das ${cleanWord} gefällt mir besonders gut.`,
      exampleEnglish: `I like the ${english} particularly well.`,
      exampleBangla: `${bangla} আমার কাছে বিশেষভাবে ভালো লাগে।`
    };
  }
  if (partOfSpeech === 'Verb') {
    return {
      exampleGerman: `Möchtest du heute mit mir ${cleanWord}?`,
      exampleEnglish: `Would you like to ${english} with me today?`,
      exampleBangla: `তুমি কি আজ আমার সাথে ${bangla} চাও?`
    };
  }
  if (partOfSpeech === 'Adjektiv') {
    return {
      exampleGerman: `Das Wetter heute ist wirklich ${cleanWord}.`,
      exampleEnglish: `The weather today is really ${english}.`,
      exampleBangla: `আজকের আবহাওয়া সত্যিই ${bangla}।`
    };
  }

  return {
    exampleGerman: `Im Deutschunterricht lernen wir das Wort: ${cleanWord}.`,
    exampleEnglish: `In German class we learn the word: ${english}.`,
    exampleBangla: `জার্মান ক্লাসে আমরা শিখি: ${bangla}।`
  };
}

const finalList = [];

for (const raw of rawEntries) {
  const id = raw.id;
  const cInfo = getChapterInfo(id);

  // Check if enriched from Gemini
  const enriched = enrichedMap[id];

  // Separate raw German and raw Bengali
  const line = raw.raw;
  const firstBn = line.search(/[\u0980-\u09FF]/);
  let rawGerman = '';
  let rawBangla = '';

  if (firstBn !== -1) {
    const beforeBn = line.slice(0, firstBn);
    const lastHyphen = beforeBn.lastIndexOf('-');
    const lastDash = Math.max(lastHyphen, beforeBn.lastIndexOf('–'), beforeBn.lastIndexOf('—'));
    rawGerman = (lastDash !== -1 ? beforeBn.slice(0, lastDash) : beforeBn).trim();
    rawBangla = (lastDash !== -1 ? line.slice(lastDash + 1) : line.slice(firstBn)).trim();
  } else {
    rawGerman = line.split(/ [-–—] /)[0].trim();
    rawBangla = line.split(/ [-–—] /)[1] || '';
  }

  // Derive headword
  let word = rawGerman.replace(/^(der|die|das)\s+/i, '').replace(/,\s*.*$/, '').replace(/\|/g, '').trim();
  let article = rawGerman.startsWith('der ') ? 'der' : rawGerman.startsWith('die ') ? 'die' : rawGerman.startsWith('das ') ? 'das' : null;
  let partOfSpeech = article ? 'Nomen' : rawGerman.includes(',') && rawGerman.includes('ist ') ? 'Verb' : rawGerman.includes('hat ') ? 'Verb' : 'Ausdruck';

  // Verb forms
  let verbForms = '—';
  if (rawGerman.includes(',')) {
    const vMatch = rawGerman.match(/,\s*(er\s+[^,]+,\s*(?:hat|ist)\s+[^,]+)/);
    if (vMatch) {
      verbForms = vMatch[1];
      partOfSpeech = 'Verb';
    }
  }

  // Plural
  let plural = buildPlural(rawGerman);

  // Clean Bengali
  let bangla = cleanBengaliText(rawBangla);

  // English
  const normalizedKey = word.toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss');
  let english = GERMAN_TO_ENGLISH[word.toLowerCase()] || GERMAN_TO_ENGLISH[normalizedKey] || '';

  // Example sentences
  let exampleGerman = '';
  let exampleEnglish = '';
  let exampleBangla = '';

  // If enriched object exists from previous Gemini runs and has meaningful bangla
  if (enriched && enriched.bangla && enriched.bangla !== 'অর্থ') {
    word = enriched.word || word;
    rawGerman = enriched.german || rawGerman;
    article = enriched.article || article;
    plural = enriched.plural && enriched.plural !== '—' ? enriched.plural : plural;
    partOfSpeech = enriched.partOfSpeech || partOfSpeech;
    bangla = enriched.bangla;
    if (enriched.english) english = enriched.english;
    if (enriched.exampleGerman) exampleGerman = enriched.exampleGerman;
    if (enriched.exampleEnglish) exampleEnglish = enriched.exampleEnglish;
    if (enriched.exampleBangla) exampleBangla = enriched.exampleBangla;
    if (enriched.verbForms) verbForms = enriched.verbForms;
  }

  // If english is still empty
  if (!english) {
    english = `${word} (${bangla.split(/[,/]/)[0].trim()})`;
  }

  // If example sentences missing
  if (!exampleGerman) {
    const ex = getExample(rawGerman, word, partOfSpeech, bangla, english);
    exampleGerman = ex.exampleGerman;
    exampleEnglish = ex.exampleEnglish;
    exampleBangla = ex.exampleBangla;
  }

  finalList.push({
    id: id,
    chapterWordNumber: cInfo.chapterWordNumber,
    totalInChapter: cInfo.total,
    german: rawGerman,
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
fs.writeFileSync('src/data/vocabulary.json', JSON.stringify(finalList, null, 2));
console.log(`Successfully generated and saved ${finalList.length} complete entries!`);
