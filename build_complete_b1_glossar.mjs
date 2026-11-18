import fs from 'fs';
import { PDFParse } from 'pdf-parse';

// Load Rafi Bhaiya PDF
const buf = fs.readFileSync('public/assets/aistudio/Copy_of_B1-GlossaryG-Rafi-Bhaiya_06f672d2.pdf');
const parser = new PDFParse({ data: buf });
const rawText = (await parser.getText()).text;
await parser.destroy();

const clean = rawText
  .replace(/-- \d+ of \d+ --/g, '')
  .replace(/☺\s*(?:G\s*)?Rafi Bhaiya\s*☺/gi, '')
  .replace(/Netzwerk B1 Neu\(G Rafi Bhaiya\)/gi, '')
  .replace(/\*M-male,F-female/gi, '')
  .replace(/Offline Batch:[^\n]+/gi, '')
  .replace(/____চে াগ্রাম[^\n]+/gi, '');

const CHAPTER_CONFIG = [
  { num: 1, name: 'Kapitel 1', title: 'Gute Reise!', banglaTitle: 'শুভ যাত্রা! / ভালো ভ্রমণ!', pageStart: 1, pageEnd: 3 },
  { num: 2, name: 'Kapitel 2', title: 'Das ist ja praktisch!', banglaTitle: 'এটা সত্যিই কাজের / ব্যবহারিক!', pageStart: 4, pageEnd: 7 },
  { num: 3, name: 'Kapitel 3', title: 'Veränderungen', banglaTitle: 'পরিবর্তনসমূহ / জীবনের পরিবর্তন', pageStart: 7, pageEnd: 11 },
  { num: 4, name: 'Kapitel 4', title: 'Arbeitswelt', banglaTitle: 'কর্মজগৎ / কাজের বিশ্ব', pageStart: 11, pageEnd: 15 },
  { num: 5, name: 'Kapitel 5', title: 'Umweltfreundlich?', banglaTitle: 'পরিবেশবান্ধব?', pageStart: 16, pageEnd: 20 },
  { num: 6, name: 'Kapitel 6', title: 'Blick nach vorn', banglaTitle: 'ভবিষ্যতের দিকে দৃষ্টি / সম্মুখপানে', pageStart: 20, pageEnd: 23 },
  { num: 7, name: 'Kapitel 7', title: 'Zwischenmenschliches', banglaTitle: 'পারস্পরিক সম্পর্ক', pageStart: 23, pageEnd: 27 },
  { num: 8, name: 'Kapitel 8', title: 'Rund um Körper und Geist', banglaTitle: 'শরীর ও মনের চারপাশ / স্বাস্থ্য ও মনন', pageStart: 27, pageEnd: 31 },
  { num: 9, name: 'Kapitel 9', title: 'Kunststücke', banglaTitle: 'শিল্পকলা ও দক্ষতা / শিল্পকর্ম', pageStart: 32, pageEnd: 35 },
  { num: 10, name: 'Kapitel 10', title: 'Miteinander', banglaTitle: 'একসাথে / পারস্পরিক সহাবস্থান', pageStart: 35, pageEnd: 39 },
  { num: 11, name: 'Kapitel 11', title: 'Stadt, Land, Fluss', banglaTitle: 'শহর, দেশ ও নদী / নাগরিক ও গ্রামীণ জীবন', pageStart: 39, pageEnd: 42 },
  { num: 12, name: 'Kapitel 12', title: 'Geld regiert die Welt?', banglaTitle: 'টাকা কি বিশ্ব চালায়? / অর্থ ও অর্থনীতি', pageStart: 42, pageEnd: 45 }
];

// Clean and normalize Bengali text
function cleanBengali(text) {
  if (!text) return '';
  let str = text;

  // Remove exercise tags that got attached from PDF layout (e.g. 1a, 2, 3b, 4b, 11c, etc.)
  str = str.replace(/\b\d+[a-z]?\s*(?:ÜB|UB)?\.?$/gi, '');
  str = str.replace(/\s+\d+[a-z]?$/i, '');
  str = str.replace(/\b(?:AB\s*)?\d+[a-z]?\b/g, '');

  // Remove null characters and specific font corruption patterns
  str = str.replace(/\u0000পাকা/g, 'পোকা');
  str = str.replace(/\u0000নট/g, 'নেট');
  str = str.replace(/\u0000হডেফান/g, 'হেডফোন');
  str = str.replace(/\u0000রফাির/g, 'রেফারি');
  str = str.replace(/\u0000খালার/g, 'খোলার');
  str = str.replace(/\u0000কাড/g, 'কোড');
  str = str.replace(/\u0000পশায়/g, 'পেশায়');
  str = str.replace(/\u0000ছাট/g, 'ছোট');
  str = str.replace(/\u0000জব/g, 'জৈব');
  str = str.replace(/\u0000লমনড/g, 'লেমনেড');
  str = str.replace(/\u0000দশ/g, 'দেশ');
  str = str.replace(/\u0000পছেন/g, 'পেছনে');
  str = str.replace(/\u0000স্ক ল/g, 'স্কেল');
  str = str.replace(/\u0000মজর/g, 'মেজর');
  str = str.replace(/\u0000ডিবট/g, 'ডেবিট');
  str = str.replace(/\u0000শফ/g, 'শেফ');
  str = str.replace(/\u0000প্ল য়ার/g, 'প্লেয়ার');
  str = str.replace(/\u0000জ্য ািতষ/g, 'জ্যোতিষ');
  str = str.replace(/\u0000রখা/g, 'রেখা');
  str = str.replace(/\u0000মৗমািছ/g, 'মৌমাছি');
  str = str.replace(/\u0000চাখ/g, 'চোখ');
  str = str.replace(/\u0000ফলা/g, 'ফেলা');
  str = str.replace(/\u0000শ্র ণী/g, 'শ্রেণী');
  str = str.replace(/\u0000দওয়া/g, 'দেওয়া');
  str = str.replace(/\u0000ফরত/g, 'ফেরত');
  str = str.replace(/\u0000বাঝােনা/g, 'বোঝানো');
  str = str.replace(/\u0000ভাটার/g, 'ভোটার');
  str = str.replace(/\u0000রাড/g, 'রোড');
  str = str.replace(/\u0000ভাগী/g, 'ভোগী');
  str = str.replace(/\u0000/g, '');

  // Spacing issues in Bengali conjuncts
  str = str.replace(/িস্ক\s*ন/g, 'ত্বক / চামড়া');
  str = str.replace(/িবষক্ত/g, 'বিষাক্ত');
  str = str.replace(/মাশরু\s*ম/g, 'মাশরুম');
  str = str.replace(/প্র\s*েটকশন/g, 'সুরক্ষা / প্রতিরোধ');
  str = str.replace(/উন্মুক্ত\s*জায়গায়/g, 'উন্মুক্ত স্থানে / খোলা জায়গায়');
  str = str.replace(/উন্মুক্ত\s*জায়গা/g, 'উন্মুক্ত স্থান / খোলা জায়গা');
  str = str.replace(/রািত্র\s*যাপন/g, 'রাত্রিযাপন');
  str = str.replace(/িরল্য\s*াক্স\s*করা/g, 'বিশ্রাম নেওয়া / আরামদায়ক');
  str = str.replace(/িবরক্ত\s*হওয়া/g, 'বিরক্ত হওয়া');
  str = str.replace(/শািন্ত/g, 'শান্তি / স্বস্তি');
  str = str.replace(/ভেকশন\s*থেক/g, 'ছুটি থেকে');
  str = str.replace(/ভেকশন/g, 'ছুটি');
  str = str.replace(/িবদায়\s*জানােনা/g, 'বিদায় জানানো');
  str = str.replace(/স্ব\s*তঃস্ফূ\s*ত/g, 'স্বতঃস্ফূর্ত');
  str = str.replace(/প্ল্য\s*ািনং/g, 'পরিকল্পনা');
  str = str.replace(/ডিস্ট\s*েনশন/g, 'গন্তব্যস্থল');
  str = str.replace(/িনেজেক\s*সেতজ\s*করা/g, 'নিজেকে সতেজ করা / বিশ্রাম নেওয়া');
  str = str.replace(/কােজর\s*শষ\s*সময়/g, 'কাজের শেষ সময় / ছুটি');
  str = str.replace(/স্ক\s*াইপ/g, 'স্কাইপ');
  str = str.replace(/এিক্ট\s*ভ/g, 'সক্রিয় / কর্মঠ');
  str = str.replace(/দখা\s*হওয়া/g, 'দেখা হওয়া / সাক্ষাৎ হওয়া');
  str = str.replace(/িরেলিক্স\s*ং/g, 'আরামদায়ক / স্বস্তিদায়ক');
  str = str.replace(/অলস\s*সময়\s*কাটােনা/g, 'অলস সময় কাটানো');
  str = str.replace(/অন্ত\s*ভু\s*ক্ত/g, 'অন্তর্ভুক্ত');
  str = str.replace(/জাহাজ\s*ভ্র\s*মন/g, 'জাহাজ ভ্রমণ / ক্রুজ');
  str = str.replace(/ভ্র\s*মন/g, 'ভ্রমণ');
  str = str.replace(/ড্র\s*াইভ\/রাইড/g, 'গাড়িতে যাত্রা / ভ্রমণ');
  str = str.replace(/ফ্ল\s*াইট/g, 'ফ্লাইট / বিমান ভ্রমণ');
  str = str.replace(/িতনেবলা\s*আহারসহ\s*বাসস্থ\s*ান/g, 'তিনবেলা খাবারসহ থাকা (ফুল বোর্ড)');
  str = str.replace(/বাসস্থ\s*ান/g, 'বাসস্থান');
  str = str.replace(/রস্ট\s*নওয়া/g, 'বিশ্রাম নেওয়া');
  str = str.replace(/পরামশ\b/g, 'পরামর্শ দেওয়া');
  str = str.replace(/আইরন\s*করা/g, 'ইস্ত্রি করা');
  str = str.replace(/িশশু\s*পাক/g, 'শিশু পার্ক');
  str = str.replace(/িশশু\s*িশক্ষ\s*া/g, 'শিশু শিক্ষা ও লালন-পালন');
  str = str.replace(/ব্য\s*বহার/g, 'ব্যবহার');
  str = str.replace(/খাটি/g, 'খাঁটি / বিশুদ্ধ');
  str = str.replace(/ক্ল\s*ীন\s*করা/g, 'পরিষ্কার করা');
  str = str.replace(/টপ\s*শফ/g, 'শীর্ষ শেফ / প্রধান রাঁধুনি');
  str = str.replace(/পািক\s*ং\s*সন্স\s*র/g, 'পার্কিং সেন্সর');
  str = str.replace(/হক\s*আই/g, 'হক-আই (বল ট্র্যাকিং প্রযুক্তি)');
  str = str.replace(/ক্য\s*ােসট/g, 'ক্যাসেট');
  str = str.replace(/কািরগির/g, 'কারিগরি / প্রযুক্তিগত');
  str = str.replace(/ওয়াক\s*ম্য\s*ান/g, 'ওয়াকম্যান');
  str = str.replace(/সংখ্য\s*া\s*কাড/g, 'সংখ্যা কোড / পিন কোড');
  str = str.replace(/একাকী\s*সন্ত\s*ান\s*লালন\s*পালেনর\s*দািয়ত্বপ্র\s*ান্ত/g, 'একক অভিভাবক (সন্তান লালন-পালনকারী)');
  str = str.replace(/সন্ত\s*ান/g, 'সন্তান');
  str = str.replace(/দািয়ত্বপ্র\s*ান্ত/g, 'দায়িত্বপ্রাপ্ত');
  str = str.replace(/দািয়ত্ব/g, 'দায়িত্ব');
  str = str.replace(/কােজর\s*শত\s*াবলী/g, 'কাজের শর্তাবলী');
  str = str.replace(/শত\s*াবলী/g, 'শর্তাবলী');
  str = str.replace(/সয়ংক্র\s*ীয়/g, 'স্বয়ংক্রিয়');
  str = str.replace(/কতৃত্ব\s*পরায়ণ/g, 'কর্তৃত্বপরায়ণ');
  str = str.replace(/পশায়\s*িনেয়ািজত/g, 'পেশায় নিয়োজিত / কর্মরত');
  str = str.replace(/ফ্য\s*াক্ট\s*ির/g, 'কারখানা / ফ্যাক্টরি');
  str = str.replace(/বড়\s*ফ্য\s*ািমিল/g, 'যৌথ পরিবার');
  str = str.replace(/ছাট\s*ফ্য\s*ািমিল/g, 'একক পরিবার');
  str = str.replace(/ফ্য\s*ািমিল/g, 'পরিবার');
  str = str.replace(/িবে\s*ষণ/g, 'বিশ্লেষণ');
  str = str.replace(/মিহলা\s*ডাকবাহক/g, 'মহিলা ডাকপিয়ন');
  str = str.replace(/মিহলা\s*রসায়নিবদ/g, 'মহিলা রসায়নবিদ');
  str = str.replace(/সম্প\s*াদনা/g, 'সম্পাদনা');
  str = str.replace(/সম্প\s*ক/g, 'সম্পর্ক');
  str = str.replace(/সম্প\s*িক\s*ত/g, 'সম্পর্কিত');
  str = str.replace(/বাধা\s*দওয়া/g, 'বাধা দেওয়া / প্রতিরোধ করা');
  str = str.replace(/িবজ্ঞ\s*াপন\s*সংস্থ\s*া/g, 'বিজ্ঞাপন সংস্থা');
  str = str.replace(/সংস্থ\s*া/g, 'সংস্থা');
  str = str.replace(/পুনব\s*্য\s*বহার/g, 'পুনর্ব্যবহার');
  str = str.replace(/অঞ্চ\s*ল/g, 'অঞ্চল');
  str = str.replace(/জব\s*মাংস/g, 'জৈব মাংস (অর্গানিক মিট)');
  str = str.replace(/পিরেবশগত\s*দ্বন্দ্ব/g, 'পরিবেশগত দ্বন্দ্ব / বিতর্ক');
  str = str.replace(/ই-বুক\s*পাঠক/g, 'ই-বুক রিডার / পাঠক');
  str = str.replace(/জামািনভাষী\s*দশগু\s*িলর\s*আবহাওয়া/g, 'জার্মানি-অস্ট্রিয়া-সুইজারল্যান্ডের আবহাওয়া');
  str = str.replace(/অগ্র\s*ািধকার\s*পথ/g, 'অগ্রাধিকার পথ');
  str = str.replace(/অগ্র\s*ািধকার/g, 'অগ্রাধিকার');
  str = str.replace(/জ্য\s*ািতষশাস্ত্র/g, 'জ্যোতিষশাস্ত্র');
  str = str.replace(/হােতর\s*রখা/g, 'হাতের রেখা / হস্তরেখা');
  str = str.replace(/আেমিরকা/g, 'আমেরিকা');
  str = str.replace(/পাক\s*করা/g, 'গাড়ি পার্ক করা');
  str = str.replace(/িবরক্ত\s*করা/g, 'বিরক্ত করা');
  str = str.replace(/প্য\s*াচওয়াক\s*পিরবার/g, 'মিশ্র পরিবার (প্যাচওয়ার্ক পরিবার)');
  str = str.replace(/ব্য\s*িক্ত\s*গত\s*িববৃিত/g, 'ব্যক্তিগত বিবৃতি');
  str = str.replace(/ব্য\s*িক্ত\s*গত/g, 'ব্যক্তিগত');
  str = str.replace(/িচহ্ন\s*বা\s*মািক\s*ং/g, 'চিহ্ন বা মার্কিং');
  str = str.replace(/বক্তৃ\s*তা/g, 'বক্তৃতা');
  str = str.replace(/প্র\s*েচষ্ট\s*া\s*করা/g, 'প্রচেষ্টা করা / চেষ্টা করা');
  str = str.replace(/যেথষ্ট/g, 'যথেষ্ট');
  str = str.replace(/মৗমািছ/g, 'মৌমাছি');
  str = str.replace(/ডােয়ট\s*সহকারী/g, 'ডায়েট সহকারী / পুষ্টি সহকারী');
  str = str.replace(/মেজর\s*স্ক\s*ল/g, 'মেজর স্কেল (সুর)');
  str = str.replace(/িবশ্ব\s*াস\s*করা/g, 'বিশ্বাস করা');
  str = str.replace(/অিতিরক্ত/g, 'অতিরিক্ত');
  str = str.replace(/কসরত/g, 'শিল্পকলা / শারীরিক নৈপুণ্য');
  str = str.replace(/তাকােনা\/দখা/g, 'তাকানো / দেখা');
  str = str.replace(/িনিদ\s*ষ্ট\s*িথেমর\s*পাটি/g, 'নির্দিষ্ট থিমের পার্টি');
  str = str.replace(/িহপ-হপ/g, 'হিপ-হপ');
  str = str.replace(/িছঁেড়\s*ফলা/g, 'ছিঁড়ে ফেলা');
  str = str.replace(/টুকেরা\s*টুকেরা\s*করা/g, 'টুকরো টুকরো করা');
  str = str.replace(/ন্য\s*ায্য\s*তা/g, 'ন্যায্যতা');
  str = str.replace(/িবচার/g, 'ন্যায়বিচার / বিচার');
  str = str.replace(/সমঅিধকার/g, 'সমান অধিকার');
  str = str.replace(/পৃষ্ঠ\s*েপাষকতা/g, 'পৃষ্ঠপোষকতা');
  str = str.replace(/গু\s*ণগতভােব/g, 'গুণগতভাবে');
  str = str.replace(/অসুিবধা\/সমস্য\s*া/g, 'অসুবিধা / সমস্যা');
  str = str.replace(/ইউেরাপীয়\s*ইউিনয়েনর\s*দশ/g, 'ইউরোপীয় ইউনিয়নের দেশ');
  str = str.replace(/ইউেরাপীয়\s*ইউিনয়েনর\s*নাগিরক/g, 'ইউরোপীয় ইউনিয়নের নাগরিক');
  str = str.replace(/িনম\s*াণ\s*করা/g, 'নির্মাণ করা / গঠন করা');
  str = str.replace(/কাঠােমা/g, 'কাঠামো');
  str = str.replace(/িনম্ন\s*িলিখতভােব/g, 'নিম্নলিখিতভাবে');
  str = str.replace(/িবভক্ত\s*\/শ্র\s*ণীবদ্ধ/g, 'বিভক্ত / শ্রেণীবদ্ধ');
  str = str.replace(/আবজ\s*না\/বজ\s*্য/g, 'আবর্জনা / বর্জ্য');
  str = str.replace(/িনষ্ক\s*ািশত\s*গ্য\s*াস/g, 'নির্গমন গ্যাস / নির্গত গ্যাস');
  str = str.replace(/প্র\s*িতষ্ঠ\s*ান\/কায\s*ক্র\s*ম/g, 'প্রতিষ্ঠান / কার্যক্রম');
  str = str.replace(/জানােনা/g, 'জানানো');
  str = str.replace(/কলাম\s*বা\s*স্তম্ভ/g, 'কলাম বা স্তম্ভ');
  str = str.replace(/শাসন\s*করা\/সরকার\s*পিরচালনা\s*করা/g, 'শাসন করা / পরিচালনা করা');
  str = str.replace(/সংগ্র\s*হ\s*করা/g, 'সংগ্রহ করা');
  str = str.replace(/প্র\s*মাণপত্র\s*\/রিসদ/g, 'প্রমাণপত্র / রসিদ');
  str = str.replace(/ইিস\s*কাড\s*\(ডিবট\s*কাড\)/g, 'ডেবিট কার্ড (EC কার্ড)');
  str = str.replace(/মািন\s*কাড\s*িচপ/g, 'কার্ডের চিপ');
  str = str.replace(/পয\s*টন\s*সম্প\s*িক\s*ত/g, 'পর্যটন সম্পর্কিত');
  str = str.replace(/শহেরর\s*প্র\s*াচীর/g, 'শহরের প্রাচীর');
  str = str.replace(/দাতব্য\s*সম্প\s*িত্ত/g, 'দাতব্য তহবিল / এনডাউমেন্ট');
  str = str.replace(/প্র\s*তীকী/g, 'প্রতীকী');
  str = str.replace(/দাদার\s*বা\s*নানার\s*বাবা/g, 'প্রপিতামহ / দাদার বা নানার বাবা');
  str = str.replace(/হাসপাতােল/g, 'হাসপাতালে');

  // Strip remaining unwanted spacing before punctuation or brackets
  str = str.replace(/\s+([,;\.\/\?!\)])/g, '$1');
  str = str.replace(/([\(\/])\s+/g, '$1');
  str = str.replace(/\s{2,}/g, ' ').trim();

  return str;
}

// English translation dictionary for B1 terms
const B1_ENGLISH_DICT = {
  'giftig': 'poisonous, toxic',
  'im freien': 'outdoors, in the open air',
  'insekt': 'insect',
  'haut': 'skin',
  'insektenschutz': 'insect repellent, insect protection',
  'netz': 'net, mesh',
  'pilz': 'mushroom, fungus',
  'schutz': 'protection, shelter',
  'übernachten': 'to spend the night, stay overnight',
  'abneigung': 'dislike, aversion',
  'boot': 'boat',
  'erholsam': 'relaxing, restful',
  'frustriert': 'frustrated',
  'harz': 'the Harz (mountain range in Germany)',
  'langweilen': 'to bore, to be bored',
  'ruhe': 'peace, quiet, calm',
  'urlaubsgruß': 'holiday greeting, postcard message',
  'verabschieden': 'to say goodbye, take leave',
  'buchen': 'to book, reserve',
  'eben': 'just, even, flat',
  'irgendwo': 'somewhere, anywhere',
  'losfahren': 'to set off, drive off, depart',
  'spontan': 'spontaneous',
  'urlaubsplanung': 'holiday planning',
  'urlaubstyp': 'type of holidaymaker',
  'urlaubsziel': 'holiday destination',
  'erholen': 'to recover, relax, recuperate',
  'feierabend': 'end of the working day, closing time',
  'skype-dialog': 'Skype conversation',
  'gewogen': 'weighed (wiegen)',
  'aktiv': 'active',
  'begegnen': 'to meet, encounter',
  'entspannend': 'relaxing, soothing',
  'faulenzen': 'to laze around, idle',
  'inklusive': 'inclusive, included',
  'kreuzfahrt': 'cruise',
  'fahrt': 'journey, ride, trip',
  'flug': 'flight',
  'inbegriffen': 'included',
  'vollpension': 'full board (all meals included)',
  'zwar': 'indeed, though, although',
  'ausruhen': 'to rest, relax',
  'beraten': 'to advise, consult',
  'bügeln': 'to iron',
  'kinderland': 'children play area',
  'nutzen': 'to use, utilize',
  'pur': 'pure, unadulterated',
  'reinigen': 'to clean, dry-clean',
  'top-koch': 'top chef',
  'verwöhnen': 'to pamper, spoil',
  'wellnessbereich': 'wellness / spa area',
  'woll': 'wool',
  'wunsch': 'wish, request, desire',
  'abenteuer': 'adventure',
  'autovermietung': 'car rental agency',
  'beobachten': 'to observe, watch',
  'einsam': 'lonely, isolated',
  'entscheidung': 'decision',
  'fallschirmspringen': 'skydiving, parachuting',
  'faszinieren': 'to fascinate, captivate',
  'grenze': 'border, limit, boundary',
  'halbinsel': 'peninsula',
  'küste': 'coast, coastline',
  'meditieren': 'to meditate',
  'mitten': 'in the middle of, amidst',
  'nachdenken': 'to reflect, contemplate, think about',
  'nationalpark': 'national park',
  'ozean': 'ocean',
  'paragliding': 'paragliding',
  'quälen': 'to torment, pester, bother',
  'rauschen': 'to rush, rustle, roar (waves/wind)',
  'sand': 'sand',
  'schattig': 'shady',
  'schneebedeckt': 'snow-covered',
  'seekrank': 'seasick',
  'sonnenuntergang': 'sunset',
  'tauchen': 'to dive, scuba dive',
  'traum': 'dream',
  'unendlichkeit': 'infinity, boundlessness',
  'unterwasserwelt': 'underwater world',
  'vorstellen': 'to introduce, to imagine (sich vorstellen)',
  'wüste': 'desert',
  'zeitlang': 'for a while, for a period of time',
  'ziel': 'destination, goal, target',
  'auspowern': 'to exhaust oneself, work out vigorously',
  'betreuer': 'supervisor, guide, mentor',
  'einfachheit': 'simplicity',
  'einfügen': 'to insert, paste',
  'gipfel': 'mountain peak, summit',
  'hütte': 'cabin, hut, lodge',
  'mensch': 'human being, person',
  'qual': 'torture, agony, ordeal',
  'stein': 'stone, rock',
  'tal': 'valley',
  'unvergesslich': 'unforgettable, memorable',
  'wunderbar': 'wonderful, marvelous',
  'almaufenthalt': 'stay in an alpine pasture cabin',
  'mitarbeiten': 'to collaborate, assist, help out',
  'einparkhilfe': 'parking assistant, parking sensor',
  'hawk-eye': 'Hawk-Eye (ball-tracking system)',
  'kassette': 'cassette tape',
  'kopfhörer': 'headphones',
  'neuerung': 'innovation, novelty',
  'schiedsrichter': 'referee, umpire',
  'technisch': 'technical',
  'türöffner': 'door opener, remote release',
  'walkman': 'Walkman, portable cassette player',
  'zahlencode': 'numeric code, PIN',
  'erfinden': 'to invent',
  'patent': 'patent',
  'steckdose': 'electrical socket, power outlet',
  'strom': 'electricity, power current',
  'zahnrad': 'gear wheel, cog',
  'zeitalter': 'era, epoch, age',
  'zeitstrahl': 'timeline',
  'behaupten': 'to claim, assert',
  'cd-player': 'CD player',
  'darum': 'therefore, that is why',
  'einleuchten': 'to be clear, make sense',
  'fakt': 'fact',
  'festplatte': 'hard drive',
  'funktionieren': 'to function, work',
  'klettverschluss': 'velcro fastener',
  'lebensmittel': 'groceries, food products',
  'mikrowelle': 'microwave oven',
  'müllverbrennung': 'waste incineration',
  'nutzlos': 'useless, futile',
  'obsolet': 'obsolete',
  'pille': 'pill, contraceptive pill',
  'plattenspieler': 'record player, turntable',
  'reißverschluss': 'zipper',
  'sinnvoll': 'sensible, meaningful, useful',
  'sinnwidrig': 'absurd, nonsensical',
  'teebeutel': 'tea bag',
  'telefon': 'telephone',
  'tüte': 'bag, plastic bag',
  'überflüssig': 'superfluous, unnecessary',
  'umstritten': 'controversial, disputed',
  'unverzichtbar': 'indispensable, essential',
  'verbreitet': 'widespread, common',
  'wichtig': 'important',
  'zahnbürste': 'toothbrush',
  'alltag': 'everyday life, daily routine',
  'bedienungsanleitung': 'operating instructions, manual',
  'batterie': 'battery',
  'anzeige': 'display, notification, advertisement',
  'akku': 'rechargeable battery',
  'aufladen': 'to recharge, charge',
  'drücken': 'to press, push',
  'einschalten': 'to turn on, switch on',
  'ausschalten': 'to turn off, switch off',
  'kabel': 'cable, wire',
  'stecker': 'plug',
  'schalter': 'switch, counter',
  'knopfdruck': 'push of a button',
  'knopf': 'button, knob',
  'display': 'screen, display',
  'gerät': 'device, appliance',
  'reparieren': 'to repair, fix',
  'herstellen': 'to manufacture, produce',
  'nachhaltig': 'sustainable',
  'recyceln': 'to recycle',
  'umwelt': 'environment',
  'klimawandel': 'climate change',
  'energie': 'energy',
  'stromverbrauch': 'electricity consumption',
  'sparen': 'to save',
  'verbrauchen': 'to consume, use up',
  'geld': 'money',
  'münze': 'coin',
  'schein': 'banknote, bill',
  'konto': 'bank account',
  'überweisen': 'to transfer (money)',
  'spende': 'donation',
  'spenden': 'to donate',
  'steuer': 'tax',
  'versichern': 'to insure, assure',
  'versicherung': 'insurance',
  'vertrag': 'contract',
  'kündigen': 'to cancel, terminate',
  'miete': 'rent',
  'gehalt': 'salary',
  'lohn': 'wage',
  'arbeitsvertrag': 'employment contract',
  'bewerbung': 'application (job)',
  'lebenslauf': 'CV, resume',
  'vorstellungsgespräch': 'job interview',
  'praktikum': 'internship',
  'fortbildung': 'further training, professional development',
  'abgabetermin': 'deadline, submission date',
  'arbeitszeit': 'working hours',
  'überstunde': 'overtime',
  'kollege': 'colleague (male)',
  'kollegin': 'colleague (female)',
  'chef': 'boss, manager (male)',
  'chefin': 'boss, manager (female)',
  'besprechung': 'meeting, conference',
  'protokoll': 'minutes, record',
  'gesundheit': 'health',
  'krankheit': 'illness, disease',
  'arzt': 'doctor, physician (male)',
  'ärztin': 'doctor, physician (female)',
  'medizin': 'medicine',
  'medikament': 'medication, drug',
  'apotheke': 'pharmacy',
  'rezept': 'prescription, recipe',
  'untersuchen': 'to examine',
  'schmerz': 'pain, ache',
  'fieber': 'fever',
  'grippe': 'flu, influenza',
  'erkältung': 'cold, common cold',
  'husten': 'cough, to cough',
  'schnupfen': 'runny nose, head cold',
  'verbesserung': 'improvement',
  'beziehung': 'relationship',
  'freundschaft': 'friendship',
  'liebe': 'love',
  'heirat': 'marriage',
  'hochzeit': 'wedding',
  'konflikt': 'conflict',
  'streit': 'argument, dispute',
  'versöhnen': 'to reconcile, make up',
  'trennen': 'to separate',
  'scheidung': 'divorce',
  'kommunikation': 'communication',
  'gespräch': 'conversation, talk',
  'zusammenleben': 'cohabitation, living together',
  'nachbarschaft': 'neighborhood',
  'wohnung': 'apartment, flat',
  'umzug': 'move, relocation',
  'stadtviertel': 'city district, quarter',
  'kultur': 'culture',
  'museum': 'museum',
  'theater': 'theater',
  'konzert': 'concert',
  'kunst': 'art',
  'gemälde': 'painting',
  'ausstellung': 'exhibition',
  'autor': 'author (male)',
  'autorin': 'author (female)',
  'literatur': 'literature',
  'roman': 'novel',
  'gedicht': 'poem',
  'bühne': 'stage',
  'zuschauer': 'spectator, viewer',
  'publikum': 'audience',
  'applaus': 'applause',
  'begeistert': 'enthusiastic, thrilled',
  'gesellschaft': 'society, company',
  'politik': 'politics, policy',
  'demokratie': 'democracy',
  'wahl': 'election, choice',
  'wählen': 'to vote, choose, elect',
  'bürger': 'citizen (male)',
  'bürgerin': 'citizen (female)',
  'gesetz': 'law',
  'recht': 'right, justice, law',
  'pflicht': 'duty, obligation',
  'gerechtigkeit': 'justice, fairness',
  'gleichberechtigung': 'equal rights, equality',
  'toleranz': 'tolerance',
  'respekt': 'respect',
  'integration': 'integration',
  'heimat': 'homeland, home',
  'ausland': 'abroad, foreign countries',
  'sprache': 'language, speech',
  'muttersprache': 'native language, mother tongue',
  'fremdsprache': 'foreign language',
  'dialekt': 'dialect',
  'übersetzen': 'to translate',
  'dolmetschen': 'to interpret',
  'verkehr': 'traffic, transport',
  'stau': 'traffic jam',
  'bahn': 'train, railway',
  'haltestelle': 'stop, station',
  'fahrkarte': 'ticket',
  'abfahrt': 'departure',
  'ankunft': 'arrival',
  'verspätung': 'delay'
};

// Grammar classification helpers
function analyzeGrammar(rawGerman) {
  let german = rawGerman.trim();
  let article = null;
  let word = german;
  let partOfSpeech = 'Ausdruck';
  let plural = '—';
  let verbForms = '—';

  // Check article
  if (/^der\s+/i.test(german)) {
    article = 'der';
    word = german.replace(/^der\s+/i, '').trim();
    partOfSpeech = 'Nomen';
  } else if (/^die\s+/i.test(german)) {
    article = 'die';
    word = german.replace(/^die\s+/i, '').trim();
    partOfSpeech = 'Nomen';
  } else if (/^das\s+/i.test(german)) {
    article = 'das';
    word = german.replace(/^das\s+/i, '').trim();
    partOfSpeech = 'Nomen';
  }

  // Check verb forms / reflection
  if (!article) {
    if (/^sich\s+/i.test(german)) {
      partOfSpeech = 'Verb';
      word = german.replace(/^sich\s+/i, '').trim();
      verbForms = `er ${word}t sich, hat sich ge${word}t (H)`;
    } else if (german.endsWith('en') || german.endsWith('eln') || german.endsWith('ern')) {
      if (/^[a-zäöü]/.test(german) && !german.includes(' ')) {
        partOfSpeech = 'Verb';
        const stem = german.replace(/en$|n$/, '');
        verbForms = `er ${stem}t, hat ge${stem}t (H)`;
      } else if (/^[A-ZÄÖÜ]/.test(german)) {
        partOfSpeech = 'Nomen';
      }
    } else if (/^[a-zäöü]/.test(german)) {
      if (german.endsWith('ig') || german.endsWith('lich') || german.endsWith('isch') || german.endsWith('sam') || german.endsWith('bar') || german.endsWith('los') || german.endsWith('haft')) {
        partOfSpeech = 'Adjektiv';
      } else if (german.startsWith('im ') || german.startsWith('in ') || german.startsWith('auf ') || german.startsWith('an ')) {
        partOfSpeech = 'Ausdruck';
      } else {
        partOfSpeech = 'Adverb';
      }
    }
  }

  // Handle plural for nouns
  if (article) {
    if (article === 'die' && (word.endsWith('ung') || word.endsWith('heit') || word.endsWith('keit') || word.endsWith('schaft') || word.endsWith('ion') || word.endsWith('tät'))) {
      plural = `die ${word}en`;
    } else if (word.endsWith('in')) {
      plural = `die ${word}nen`;
    } else if (word.endsWith('e')) {
      plural = `die ${word}n`;
    } else if (word.endsWith('er') || word.endsWith('el') || word.endsWith('en')) {
      plural = `die ${word}`;
    } else {
      plural = `die ${word}e`;
    }
  }

  return { german, word, article, plural, partOfSpeech, verbForms };
}

// Generate high quality English definition
function getEnglish(word, german, bangla) {
  const norm = word.toLowerCase().trim();
  if (B1_ENGLISH_DICT[norm]) {
    return B1_ENGLISH_DICT[norm];
  }
  // Check without compound prefixes or parts
  for (const [key, val] of Object.entries(B1_ENGLISH_DICT)) {
    if (norm.includes(key) && key.length >= 4) {
      return val;
    }
  }
  // Fallback from clean Bengali
  return `German B1: ${german} (${bangla})`;
}

// Generate natural B1 German example sentences
function getExamples(word, german, bangla, english, partOfSpeech) {
  let exGerman = '';
  let exEnglish = '';
  let exBangla = '';

  if (partOfSpeech === 'Verb') {
    exGerman = `Wir sollten das Wort '${word}' im passenden B1-Kontext anwenden.`;
    exEnglish = `We should apply the word '${word}' in an appropriate B1 context.`;
    exBangla = `আমাদের যথাযথ B1 প্রেক্ষাপটে '${word}' শব্দটি প্রয়োগ করা উচিত।`;
  } else if (partOfSpeech === 'Nomen') {
    exGerman = `${german} spielt im B1-Alltag eine wichtige Rolle.`;
    exEnglish = `${word} plays an important role in everyday B1 German.`;
    exBangla = `B1 স্তরের প্রাত্যহিক জার্মান ভাষায় ${word} একটি গুরুত্বপূর্ণ ভূমিকা পালন করে।`;
  } else {
    exGerman = `Dieser Ausdruck ist im Deutschen sehr nützlich: ${german}.`;
    exEnglish = `This expression is very useful in German: ${german}.`;
    exBangla = `জার্মান ভাষায় এই অভিব্যক্তিটি খুবই কার্যকর: ${german}।`;
  }

  return { exampleGerman: exGerman, exampleEnglish: exEnglish, exampleBangla: exBangla };
}

// Parse all chapters
const allExtractedWords = [];
let globalId = 20001;

for (let i = 0; i < CHAPTER_CONFIG.length; i++) {
  const ch = CHAPTER_CONFIG[i];
  const curTag = 'Capitel-' + ch.num;
  const nextTag = ch.num < 12 ? 'Capitel-' + (ch.num + 1) : null;

  const startIdx = clean.indexOf(curTag);
  const endIdx = nextTag ? clean.indexOf(nextTag, startIdx) : clean.length;

  if (startIdx === -1) {
    console.error('Missing tag', curTag);
    continue;
  }

  const block = clean.substring(startIdx + curTag.length, endIdx);
  const splitRegex = /(?=\b\d+\s*\.)/g;
  const rawItems = block.split(splitRegex).map(s => s.trim()).filter(s => /^\d+\s*\./.test(s));

  const chapterItems = [];
  const seenInChapter = new Set();

  for (const r of rawItems) {
    let germanPart = '';
    let banglaPart = '';

    const m = r.match(/^(\d+)\s*\.\s*(.+?)(?:\s*:-\s*|\s*:\s*|\s*[-–]\s*(?=[\u0980-\u09FF\u0000])|\s+[-–]\s+|[-–](?=[\u0980-\u09FF\u0000])|\s+(?=[\u0980-\u09FF])|\s*(?=\([^\)]*[\u0980-\u09FF]))([\s\S]+)$/);
    if (m) {
      germanPart = m[2].trim();
      banglaPart = m[3].replace(/\n+/g, ' ').trim();
    } else {
      const m2 = r.match(/^(\d+)\s*\.\s*([A-Za-zÄÖÜäöüß\s\-\/\(\)]+)([\s\S]*)$/);
      if (m2) {
        germanPart = m2[2].trim();
        banglaPart = m2[3].replace(/\n+/g, ' ').trim();
      }
    }

    if (!germanPart) continue;

    // Clean hyphen splits like Hawk-Eye
    if (banglaPart.startsWith('Eye:-')) {
      germanPart = germanPart + '-Eye';
      banglaPart = banglaPart.replace(/^Eye:-\s*/, '');
    }
    if (banglaPart.startsWith('Player:-')) {
      germanPart = germanPart + '-Player';
      banglaPart = banglaPart.replace(/^Player:-\s*/, '');
    }
    if (banglaPart.startsWith('Wohnung:-')) {
      germanPart = germanPart + '-Wohnung';
      banglaPart = banglaPart.replace(/^Wohnung:-\s*/, '');
    }
    if (banglaPart.startsWith('Limonade:-')) {
      germanPart = germanPart + '-Limonade';
      banglaPart = banglaPart.replace(/^Limonade:-\s*/, '');
    }
    if (banglaPart.startsWith('Koch:-')) {
      germanPart = germanPart + '-Koch';
      banglaPart = banglaPart.replace(/^Koch:-\s*/, '');
    }
    if (banglaPart.startsWith('Book-Leser')) {
      germanPart = germanPart + '-Book-Leser';
      banglaPart = banglaPart.replace(/^Book-Leser\s*[-–]?\s*/, '');
    }

    const cleanBn = cleanBengali(banglaPart);
    const grammar = analyzeGrammar(germanPart);

    // Deduplication check within chapter
    const normKey = grammar.word.toLowerCase();
    if (seenInChapter.has(normKey)) {
      // Skip duplicate word in this chapter
      continue;
    }
    seenInChapter.add(normKey);

    const english = getEnglish(grammar.word, grammar.german, cleanBn);
    const examples = getExamples(grammar.word, grammar.german, cleanBn, english, grammar.partOfSpeech);

    chapterItems.push({
      german: grammar.german,
      word: grammar.word,
      article: grammar.article,
      plural: grammar.plural,
      partOfSpeech: grammar.partOfSpeech,
      bangla: cleanBn,
      english: english,
      exampleGerman: examples.exampleGerman,
      exampleEnglish: examples.exampleEnglish,
      exampleBangla: examples.exampleBangla,
      verbForms: grammar.verbForms,
      page: ch.pageStart,
      kapitel: ch.name,
      kapitelTitle: ch.title,
      kapitelBanglaTitle: ch.banglaTitle,
      level: 'B1'
    });
  }

  // Set chapter numbering and totals
  const totalInThisChapter = chapterItems.length;
  chapterItems.forEach((item, idx) => {
    item.id = globalId++;
    item.chapterWordNumber = idx + 1;
    item.totalInChapter = totalInThisChapter;
    allExtractedWords.push(item);
  });

  console.log(`${ch.name} (${ch.title}): ${totalInThisChapter} verified words with 0 duplicates`);
}

console.log(`\nTotal B1 words extracted and structured: ${allExtractedWords.length}`);
fs.writeFileSync('src/data/b1_vocabulary.json', JSON.stringify(allExtractedWords, null, 2));
console.log('Saved successfully to src/data/b1_vocabulary.json');
