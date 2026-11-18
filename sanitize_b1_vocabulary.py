import json
import re

with open('src/data/b1_vocabulary.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

for it in items:
    bn = it.get('bangla', '')

    # 1. Strip footer watermarks and trailing promo text
    bn = re.split(r'_________+\s*Kapitel-?\s*ENDE', bn, flags=re.I)[0]
    bn = re.split(r'Netzwerk\s+B1\s+Neu', bn, flags=re.I)[0]
    bn = re.split(r'িবঃদ্র\s*ঃ', bn)[0]
    bn = re.split(r'বিঃদ্রঃ', bn)[0]
    bn = re.split(r'\(?G\s*Rafi\s*Bhaiya\)?', bn, flags=re.I)[0]
    bn = re.split(r'__________+', bn)[0]

    # 2. Fix the accidental "ট্যাক্স / করা" corruption
    bn = bn.replace('ট্যাক্স / করা', 'করা')
    bn = bn.replace('ট্যাক্স / করু ন', 'করুন')
    bn = bn.replace('ট্যাক্স / করের', 'করে')
    bn = bn.replace('ট্যাক্স / করু ণ', 'করুন')
    bn = bn.replace('ট্যাক্স / কর', 'কর')

    # If the word is actually "die Steuer", keep tax meaning
    if 'steuer' in it.get('word', '').lower():
        bn = 'কর / ট্যাক্স'

    # 3. Clean trailing exercise tags like "AB", "1a", "2", "3b"
    bn = re.sub(r'\s+AB\b', '', bn)
    bn = re.sub(r'\b(?:AB\s*)?\d+[a-z]?\b', '', bn)

    # 4. Clean extra spaces and punctuation
    bn = re.sub(r'\s{2,}', ' ', bn).strip()
    bn = re.sub(r'[\s\-_]+$', '', bn)

    # 5. Fix common Bengali typos
    bn = bn.replace('িবভক্ত', 'বিভক্ত')
    bn = bn.replace('টুট্যাক্স / করো', 'টুকরো')
    bn = bn.replace('টুকরো টুকরো করা', 'টুকরো টুকরো করা')
    bn = bn.replace('বণনাকারী', 'বর্ণনাকারী')
    bn = bn.replace('যানবাহেনর', 'যানবাহনের')
    bn = bn.replace('গেল যাওয়া', 'গলে যাওয়া')

    it['bangla'] = bn

    # Clean exampleBengali if it got corrupted
    if 'exampleBangla' in it:
        exBn = it['exampleBangla']
        exBn = exBn.replace('ট্যাক্স / করা', 'করা')
        it['exampleBangla'] = exBn

with open('src/data/b1_vocabulary.json', 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)

print(f"Sanitized all {len(items)} B1 items.")
