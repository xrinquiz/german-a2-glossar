import json
import re

# Comprehensive Bengali font repair rules
def clean_bengali(text):
    if not text:
        return ""
    t = text
    # 1. Strip footer watermarks and trailing promo text
    t = re.split(r'_________+\s*Kapitel-?\s*ENDE', t, flags=re.I)[0]
    t = re.split(r'Netzwerk\s+B1\s+Neu', t, flags=re.I)[0]
    t = re.split(r'িবঃদ্র\s*ঃ', t)[0]
    t = re.split(r'বিঃদ্রঃ', t)[0]
    t = re.split(r'\(?G\s*Rafi\s*Bhaiya\)?', t, flags=re.I)[0]
    t = re.split(r'__________+', t)[0]
    
    # 2. Fix broken character sequences from PDF font conversions
    rep = [
        ('এম্ব ািস', 'দূতাবাস / অ্যাম্বাসি'),
        ('কনসুেলট', 'কনস্যুলেট'),
        ('িভসা', 'ভিসা'),
        ('পাসেপাট', 'পাসপোর্ট'),
        ('কেন্ট্র াল', 'কন্ট্রোল / নিয়ন্ত্রণ'),
        ('লােগজ', 'লাগেজ'),
        ('বল্ট', 'বেল্ট'),
        ('কম্প াটেমন্ট', 'কম্পার্টমেন্ট'),
        ('সািড়', 'সারি'),
        ('গ্র ফতার', 'গ্রেপ্তার'),
        ('অপ্রস্তু ত', 'অপ্রস্তুত'),
        ('চেল যাওয়া', 'চলে যাওয়া'),
        ('িতনেবলা', 'তিনবেলা'),
        ('বাসস্থ ান', 'বাসস্থান'),
        ('অিভবাদন', 'অভিবাদন'),
        ('হােতর', 'হাতের'),
        ('পিরবহন', 'পরিবহন'),
        ('প্র েটকশন', 'সুরক্ষা / প্রতিরোধ'),
        ('প্রোটকশন', 'সুরক্ষা / প্রতিরোধ'),
        ('রািত্র', 'রাত্রি'),
        ('িরল্য াক্স', 'বিশ্রাম / রিল্যাক্স'),
        ('িরল্যাক্স', 'বিশ্রাম / রিল্যাক্স'),
        ('হাজ পাহাড়', 'হার্জ পর্বতমালা'),
        ('িবরক্ত', 'বিরক্ত'),
        ('শািন্ত', 'শান্তি'),
        ('িবদায়', 'বিদায়'),
        ('স্ব তঃস্ফূ ত', 'স্বতঃস্ফূর্ত'),
        ('ভেকশন', 'ভ্যাকেশন / ছুটি'),
        ('প্ল্য ািনং', 'পরিকল্পনা'),
        ('িনেজেক', 'নিজেকে'),
        ('সেতজ', 'সতেজ'),
        ('কােজর', 'কাজের'),
        ('শষ সময়', 'শেষ সময়'),
        ('স্ক াইপ', 'স্কাইপ'),
        ('এিক্ট ভ', 'সক্রিয় / অ্যাক্টিভ'),
        ('দখা হওয়া', 'দেখা হওয়া'),
        ('িরেলিক্স ং', 'আরামদায়ক'),
        ('অন্ত ভু ক্ত', 'অন্তর্ভুক্ত'),
        ('ভ্র মন', 'ভ্রমণ'),
        ('ফ্ল াইট', 'ফ্লাইট'),
        ('দািয়ত্ব', 'দায়িত্ব'),
        ('সন্ত ান', 'সন্তান'),
        ('পাহােড়', 'পাহাড়ে'),
        ('অবস্থ ান', 'অবস্থান'),
        ('একসােথ', 'একসাথে'),
        ('আেমিরকা', 'আমেরিকা'),
        ('প্য াচওয়াক', 'প্যাচওয়ার্ক'),
        ('িহপ-হপ', 'হিপহপ'),
        ('গু ণ', 'গুণ'),
        ('িচহ্ন', 'চিহ্ন'),
        ('বক্তৃ তা', 'বক্তৃতা'),
        ('প্র েচষ্ট া', 'প্রচেষ্টা'),
        ('িছঁেড়', 'ছিঁড়ে'),
        ('টুকেরা', 'টুকরো'),
        ('ন্যা ায্য', 'ন্যায্য'),
        ('ন্যা ায্য তা', 'ন্যায্যতা'),
        ('ইউিনয়ন', 'ইউনিয়ন'),
        ('নাগিরক', 'নাগরিক'),
        ('িনম াণ', 'নির্মাণ'),
        ('আবজ না', 'আবর্জনা'),
        ('বজ ্য', 'বর্জ্য'),
        ('িনষ্ক ািশত', 'নির্গমিত'),
        ('প্র িতষ্ঠ ান', 'প্রতিষ্ঠান'),
        ('কায ক্র ম', 'কার্যক্রম'),
        ('পয টন', 'পর্যটন'),
        ('প্র াচীর', 'প্রাচীর'),
        ('সম্প িত্ত', 'সম্পত্তি'),
        ('প্র তীকী', 'প্রতীকী'),
        ('হাসপাতােল', 'হাসপাতালে'),
        ('ডিস্ট েনশন', 'গন্তব্যস্থল'),
        ('ট্যাক্স / করা', 'করা'),
        ('ট্যাক্স / করু ন', 'করুন'),
        ('ট্যাক্স / করের', 'করে'),
        ('ট্যাক্স / করু ণ', 'করুন'),
        ('ট্যাক্স / কর', 'কর'),
        ('টুট্যাক্স / করো', 'টুকরো'),
        ('বর্ণনাকারী', 'বর্ণনাকারী'),
        ('যানবাহেনর', 'যানবাহনের'),
        ('গেল যাওয়া', 'গলে যাওয়া'),
        ('বিভক্ত', 'বিভক্ত'),
        ('পাকামাকড়', 'পোকামাকড়'),
        ('িস্ক ন', 'ত্বক / চামড়া'),
        ('মাশরু ম', 'মাশরুম'),
        ('কাথাও', 'কোথাও'),
        ('ওজন করা', 'ওজন করা / মাপা')
    ]
    for src, dst in rep:
        t = t.replace(src, dst)
        
    # Strip trailing numbers and exercise codes
    t = re.sub(r'\s+AB\b', '', t)
    t = re.sub(r'\b(?:AB\s*)?\d+[a-z]?\b', '', t)
    t = re.sub(r'\s{2,}', ' ', t).strip()
    t = re.sub(r'[\s\-_]+$', '', t)
    return t

# Topic definitions for B1
B1_TOPICS = {
    "Kapitel 1": [
        (25, "Die Urlaubsplanung & Vorbereitung", "ছুটির পরিকল্পনা ও প্রস্তুতি"),
        (50, "Im Reisebüro & Buchung", "ট্রাভেল এজেন্সিতে বুকিং"),
        (75, "Reiseziele in Deutschland", "জার্মানির ভ্রমণ গন্তব্যসমূহ"),
        (98, "Unterwegs: Ohren auf! & Erlebnisse", "ভ্রমণপথে অভিজ্ঞতা ও অনুভূতি")
    ],
    "Kapitel 2": [
        (35, "Alltagshelfer & Haushaltsgeräte", "দৈনন্দিন কাজের সহায়ক যন্ত্রপাতি"),
        (70, "Erfindungen im Alltag", "দৈনন্দিন জীবনের উদ্ভাবনসমূহ"),
        (105, "Gebrauchsanweisungen & Reparatur", "ব্যবহারবিধি ও মেরামত"),
        (136, "Technologie & Zukunft", "প্রযুক্তি ও ভবিষ্যৎ")
    ],
    "Kapitel 3": [
        (42, "Lebensstationen & Biografie", "জীবনের বিভিন্ন ধাপ ও আত্মজীবনী"),
        (85, "Entscheidungen im Leben", "জীবনের গুরুত্বপূর্ণ সিদ্ধান্ত"),
        (128, "Erinnerungen & Neuanfänge", "স্মৃতিচারণ ও নতুন সূচনা"),
        (166, "Wendepunkte & Veränderungen", "জীবনের মোড় পরিবর্তন")
    ],
    "Kapitel 4": [
        (25, "Berufsleben & Arbeitsalltag", "কর্মজীবন ও দৈনন্দিন দায়িত্ব"),
        (50, "Das Vorstellungsgespräch", "চাকরির ইন্টারভিউ"),
        (75, "Arbeitsbedingungen & Rechte", "কাজের শর্ত ও আইনি অধিকার"),
        (97, "Teamwork & Arbeitsklima", "দলগত কাজ ও কর্মক্ষেত্রের পরিবেশ")
    ],
    "Kapitel 5": [
        (52, "Natur & Umweltschutz", "প্রকৃতি ও পরিবেশ সংরক্ষণ"),
        (105, "Müll, Recycling & Energie", "বর্জ্য, পুনর্ব্যবহার ও জ্বালানি"),
        (155, "Klimawandel & Konsumverhalten", "জলবায়ু পরিবর্তন ও ভোগবাদী আচরণ"),
        (207, "Ökologischer Fußabdruck & Zukunft", "কার্বন ফুটপ্রিন্ট ও ভবিষ্যৎ প্রজন্ম")
    ],
    "Kapitel 6": [
        (32, "Zukunftspläne & Visionen", "ভবিষ্যতের পরিকল্পনা ও রূপকল্প"),
        (64, "Wünsche, Träume & Hoffnungen", "ইচ্ছা, স্বপ্ন ও প্রত্যাশা"),
        (95, "Prognosen für die Zukunft", "ভবিষ্যতের পূর্বাভাস"),
        (126, "Wissenschaft & Innovation", "বিজ্ঞান ও নব উদ্ভাবন")
    ],
    "Kapitel 7": [
        (35, "Freundschaft, Familie & Beziehungen", "বন্ধুত্ব, পরিবার ও মানবীয় সম্পর্ক"),
        (70, "Gefühle ausdrücken", "অনুভূতি ও মনোভাব প্রকাশ"),
        (105, "Konflikte & Missverständnisse", "দ্বন্দ্ব ও ভুল বোঝাবুঝি"),
        (138, "Zusammenleben & Verständnis", "পারস্পরিক সহাবস্থান ও সহমর্মিতা")
    ],
    "Kapitel 8": [
        (57, "Gesundheit & Ernährung", "স্বাস্থ্য ও পুষ্টিকর খাদ্যাভ্যাস"),
        (115, "Sport, Fitness & Bewegung", "খেলাধুলা, ফিটনেস ও শরীরচর্চা"),
        (170, "Stressbewältigung & Entspannung", "মানসিক চাপ নিয়ন্ত্রণ ও প্রশান্তি"),
        (226, "Medizin & seelisches Wohlbefinden", "চিকিৎসা ও মানসিক সুস্থতা")
    ],
    "Kapitel 9": [
        (47, "Kunst, Malerei & Skulptur", "চিত্রকলা ও ভাস্কর্য"),
        (95, "Musik, Konzerte & Theater", "সঙ্গীত, কনসার্ট ও নাট্যশালা"),
        (140, "Literatur, Bücher & Dichtung", "সাহিত্য, বই ও কবিতা"),
        (186, "Kreativität & Künstlerporträts", "সৃজনশীলতা ও শিল্পীদের জীবন")
    ],
    "Kapitel 10": [
        (36, "Gesellschaft & Zusammenleben", "সমাজ ও সামাজিক সম্প্রীতি"),
        (72, "Engagement & Ehrenamt", "স্বেচ্ছাসেবা ও সামাজিক কাজ"),
        (108, "Regeln, Gesetze & Werte", "নিয়মকানুন, আইন ও নৈতিক মূল্যবোধ"),
        (144, "Generationendialog & Toleranz", "প্রজন্মের সংলাপ ও সহনশীলতা")
    ],
    "Kapitel 11": [
        (32, "Stadtleben vs. Landleben", "শহুরে জীবন বনাম গ্রামীণ জীবন"),
        (64, "Heimat, Natur & Landschaften", "মাতৃভূমি, প্রকৃতি ও ভৌগোলিক বৈচিত্র্য"),
        (95, "Architektur & Stadtplanung", "স্থাপত্যকলা ও নগর পরিকল্পনা"),
        (126, "Regionen im deutschsprachigen Raum", "জার্মানভাষী অঞ্চলের ঐতিহ্যবাহী জনপদ")
    ],
    "Kapitel 12": [
        (38, "Finanzen, Geld & Banken", "অর্থায়ন, মুদ্রা ও ব্যাংকিং"),
        (76, "Konsum, Sparen & Schulden", "ব্যয়, সঞ্চয় ও ঋণ ব্যবস্থাপনা"),
        (114, "Wirtschaft, Wohlstand & Arbeit", "অর্থনীতি, প্রাচুর্য ও শ্রমবাজার"),
        (149, "Glück, Werte & Lebensqualität", "সুখ, আত্মিক মূল্যবোধ ও জীবনের মান")
    ]
}

def get_b1_topic(kapitel, word_num):
    rules = B1_TOPICS.get(kapitel, [])
    for max_num, name, bn_name in rules:
        if word_num <= max_num:
            return name, bn_name
    if rules:
        return rules[-1][1], rules[-1][2]
    return kapitel, kapitel

# Load existing B1 data
with open('src/data/b1_vocabulary.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

# Load base dictionary
from b1_translations_data import KNOWN_TRANSLATIONS

updated_count = 0
for it in items:
    # 1. Clean Bangla
    it['bangla'] = clean_bengali(it.get('bangla', ''))
    
    # 2. Assign topic and topicBangla
    top, top_bn = get_b1_topic(it.get('kapitel'), it.get('chapterWordNumber', 1))
    it['topic'] = top
    it['topicBangla'] = top_bn
    
    # 3. Check and enhance English
    gw = it.get('word', it.get('german')).strip()
    gw_lower = gw.lower()
    curr_en = it.get('english', '').strip()
    
    # Check if English is tautological
    is_tautological = (curr_en.lower().replace('to ', '').strip() == gw_lower) or curr_en.startswith('German B1:')
    
    if is_tautological or gw_lower in KNOWN_TRANSLATIONS:
        if gw_lower in KNOWN_TRANSLATIONS:
            it['english'] = KNOWN_TRANSLATIONS[gw_lower]
            updated_count += 1
        elif gw in KNOWN_TRANSLATIONS:
            it['english'] = KNOWN_TRANSLATIONS[gw]
            updated_count += 1
        else:
            # Fallback based on part of speech
            pos = it.get('partOfSpeech')
            if pos == 'Verb':
                it['english'] = f"to {gw_lower}" if not gw_lower.startswith('sich') else f"to {gw_lower.replace('sich ', '')} oneself"
            else:
                it['english'] = gw

# Save back to file
with open('src/data/b1_vocabulary.json', 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)

print(f"Processed {len(items)} B1 items. Updated English for {updated_count} items with specific definitions.")
