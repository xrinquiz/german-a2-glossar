import { GrammarTopic } from '../types/conjugation';

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'intro-categories',
    number: 1,
    titleGerman: 'Deutsche Verbkonjugation – Grundbegriffe',
    titleBangla: 'জার্মান ক্রিয়ার রূপান্তর ও মৌলিক ধারণা',
    titleEnglish: 'German Verb Conjugation – Basic Concepts & Categories',
    summary: 'Die fünf grammatischen Kategorien des deutschen Verbs: Person, Numerus, Tempus, Modus und Genus Verbi.',
    summaryBangla: 'জার্মান ক্রিয়ার ৫টি মূল ব্যাকরণিক বৈশিষ্ট্য: পুরুষ (Person), বচন (Numerus), কাল (Tempus), মনের ভাব (Modus) এবং বাচ্য (Genus Verbi)।',
    sections: [
      {
        headingGerman: 'Was ist Konjugation?',
        headingBangla: 'কনজুগেশন বা ক্রিয়ার রূপান্তর কী?',
        contentGerman: 'Die Konjugation (Beugung) ist die Veränderung der Verbform nach Person, Numerus, Tempus, Modus und Genus Verbi. Die meisten deutschen Verben enden im Infinitiv auf -en (z. B. machen, lernen) oder seltener auf -n (z. B. sammeln, wandern).',
        contentBangla: 'বাক্যে কর্তা (Subject), কাল (Tense) ও ভাব (Mood) অনুযায়ী ক্রিয়ার রূপ পরিবর্তন করাকে Konjugation বা রূপান্তর বলে। জার্মান ভাষার অধিকাংশ ক্রিয়ামূল ইনফিনিটিভে -en (যেমন: machen, lernen) বা কখনো -n (যেমন: wandern, sammeln) দিয়ে শেষ হয়।',
        contentEnglish: 'Conjugation is the inflection of verbs according to person, number, tense, mood, and voice. Most German verbs end in -en in the infinitive, or sometimes -n.',
        table: {
          headers: ['Kategorie (জার্মান)', 'বাংলা অর্থ', 'ব্যাখ্যা ও উদাহরণ'],
          rows: [
            ['Person (পুরুষ)', '১ম, ২য় ও ৩য় পুরুষ', 'ich (আমি), du/Sie (তুমি/আপনি), er/sie/es (সে/তিনি)'],
            ['Numerus (বচন)', 'একবচন ও বহুবচন', 'Singular (একবচন) vs. Plural (বহুবচন: wir, ihr, sie)'],
            ['Tempus (কাল)', 'ক্রিয়ার সময়কাল', 'Präsens, Perfekt, Präteritum, Plusquamperfekt, Futur I & II'],
            ['Modus (মনের ভাব)', 'বাস্তবতা বা ভাব প্রকাশের ধরন', 'Indikativ (বাস্তব), Konjunktiv (সম্ভাবনা/পরোক্ষ), Imperativ (আদেশ)'],
            ['Genus Verbi (বাচ্য)', 'কর্তৃবাচ্য ও কর্মবাচ্য', 'Aktiv (সক্রিয় বাচ্য) vs. Passiv (কর্মবাচ্য)']
          ]
        }
      },
      {
        headingGerman: 'Die regelmäßigen Personalendungen im Präsens',
        headingBangla: 'বর্তমান কালের (Präsens) নিয়মিত বিভক্তি',
        contentGerman: 'Im Präsens werden an den Verbstamm (Infinitiv ohne -en) die standardmäßigen Personalendungen angehängt: -e, -st, -t, -en, -t, -en.',
        contentBangla: 'সাধারণ নিয়মিত ক্রিয়ার ক্ষেত্রে ক্রিয়ামূলের (Verbstamm) সাথে নির্দিষ্ট বিভক্তি যুক্ত হয়: ich (-e), du (-st), er/sie/es (-t), wir (-en), ihr (-t), sie/Sie (-en)।',
        table: {
          headers: ['Pronomen', 'Endung', 'Beispiel: lernen (শেখা)', 'Beispiel: machen (করা)', 'বাংলা অর্থ'],
          rows: [
            ['ich (আমি)', '-e', 'ich lerne', 'ich mache', 'আমি শিখি / করি'],
            ['du (তুমি)', '-st', 'du lernst', 'du machst', 'তুমি শেখো / করো'],
            ['er / sie / es (সে)', '-t', 'er lernt', 'er macht', 'সে শেখে / করে'],
            ['wir (আমরা)', '-en', 'wir lernen', 'wir machen', 'আমরা শিখি / করি'],
            ['ihr (তোমরা)', '-t', 'ihr lernt', 'ihr macht', 'তোমরা শেখো / করো'],
            ['sie / Sie (তারা/আপনি)', '-en', 'sie lernen', 'sie machen', 'তারা শেখেন / আপনি করেন']
          ]
        },
        examples: [
          {
            german: 'Ich lerne jeden Tag Deutsch.',
            bangla: 'আমি প্রতিদিন জার্মান ভাষা শিখি।',
            english: 'I learn German every day.'
          },
          {
            german: 'Was machst du am Wochenende?',
            bangla: 'তুমি সাপ্তাহিক ছুটির দিনে কী করো?',
            english: 'What are you doing on the weekend?'
          }
        ]
      }
    ]
  },
  {
    id: 'weak-strong-verbs',
    number: 2,
    titleGerman: 'Schwache, starke und gemischte Verben',
    titleBangla: 'দুর্বল, সবল ও মিশ্র ক্রিয়া (Regular vs. Irregular)',
    titleEnglish: 'Weak, Strong and Mixed Verbs (Regular vs Irregular)',
    summary: 'Unterscheidung zwischen regelmäßigen schwachen Verben, unregelmäßigen starken Verben mit Vokalwechsel und gemischten Verben.',
    summaryBangla: 'নিয়মিত দুর্বল ক্রিয়া (Schwache Verben), স্বরবর্ণ পরিবর্তনশীল সবল ক্রিয়া (Starke Verben) এবং মিশ্র ক্রিয়ার (Gemischte Verben) গঠন ও পার্থক্য।',
    sections: [
      {
        headingGerman: '1. Schwache Verben (Regelmäßige Verben)',
        headingBangla: '১. দুর্বল ক্রিয়া (নিয়মিত ক্রিয়া)',
        contentGerman: 'Die Mehrheit der deutschen Verben ist schwach (regelmäßig). Ihr Verbstamm ändert sich nie. Das Präteritum wird mit -te- gebildet, und das Partizip II endet auf -t (z. B. gemacht, gelernt).',
        contentBangla: 'জার্মান ভাষার বেশিরভাগ ক্রিয়াই দুর্বল বা নিয়মিত। এদের ক্রিয়ামূলের স্বরবর্ণ কখনোই পরিবর্তিত হয় না। Präteritum-এ -te যোগ হয় এবং Partizip II-তে ge-...-t রূপ নেয়।',
        examples: [
          {
            german: 'kaufen → kaufte → hat gekauft',
            bangla: 'কেনা → কিনেছিল → কিনেছে',
            english: 'to buy → bought → has bought'
          },
          {
            german: 'wohnen → wohnte → hat gewohnt',
            bangla: 'বাস করা → বাস করেছিল → বাস করেছে',
            english: 'to live/reside → lived → has lived'
          }
        ]
      },
      {
        headingGerman: 'Besonderheit: Verbstamm auf -d, -t, -m, -n',
        headingBangla: 'বিশেষ নিয়ম: ক্রিয়ামূলের শেষে d, t বা m, n থাকলে',
        contentGerman: 'Wenn der Stamm auf -d oder -t endet (z. B. arbeiten, finden, warten), wird vor -st und -t ein -e- eingefügt zur leichteren Aussprache: du arbeitest, er arbeitet.',
        contentBangla: 'ক্রিয়ামূলের শেষ অক্ষর d বা t হলে উচ্চারণের সুবিধার্থে du ও er/sie/es এবং ihr-এর ক্ষেত্রে অতিরিক্ত একটি "-e-" যুক্ত হয় (যেমন: du arbeitest, er arbeitet, ihr arbeitet)।',
        examples: [
          {
            german: 'Er arbeitet bei Siemens.',
            bangla: 'সে সিমেন্সে কাজ করে।',
            english: 'He works at Siemens.'
          },
          {
            german: 'Du wartest an der Haltestelle.',
            bangla: 'তুমি বাস স্টপে অপেক্ষা করছ।',
            english: 'You are waiting at the bus stop.'
          }
        ]
      },
      {
        headingGerman: '2. Starke Verben (Unregelmäßige Verben mit Vokalwechsel)',
        headingBangla: '২. সবল ক্রিয়া (অনিয়মিত ক্রিয়া ও স্বর পরিবর্তন)',
        contentGerman: 'Starke Verben ändern ihren Stammvokal im Präteritum und oft auch im Partizip II (Ablautreihen). Sehr viele starke Verben ändern auch im Präsens bei "du" und "er/sie/es" den Vokal (e → i/ie, a → ä). Das Partizip II endet immer auf -en.',
        contentBangla: 'সবল ক্রিয়ার ক্ষেত্রে ক্রিয়ামূলের মূল স্বরবর্ণ বদলে যায় (Ablaut)। বর্তমান কালেও du এবং er/sie/es-এর ক্ষেত্রে e পরিবর্তিত হয়ে i বা ie হয়, এবং a পরিবর্তিত হয়ে ä হয়। এদের Partizip II সর্বদা -en দিয়ে শেষ হয়।',
        table: {
          headers: ['Vokalwechsel', 'Infinitiv', 'du-Form', 'er/sie/es-Form', 'Partizip II', 'বাংলা অর্থ'],
          rows: [
            ['e → i', 'sprechen', 'du sprichst', 'er spricht', 'hat gesprochen', 'কথা বলা'],
            ['e → i', 'geben', 'du gibst', 'er gibt', 'hat gegeben', 'দেওয়া'],
            ['e → i', 'helfen', 'du hilfst', 'er hilft', 'hat geholfen', 'সাহায্য করা'],
            ['e → ie', 'sehen', 'du siehst', 'er sieht', 'hat gesehen', 'দেখা'],
            ['e → ie', 'lesen', 'du liest', 'er liest', 'hat gelesen', 'পড়া'],
            ['a → ä', 'fahren', 'du fährst', 'er fährt', 'ist gefahren', 'যানবাহনে যাওয়া'],
            ['a → ä', 'schlafen', 'du schläfst', 'er schläft', 'hat geschlafen', 'ঘুমানো'],
            ['a → ä', 'waschen', 'du wäschst', 'er wäscht', 'hat gewaschen', 'ধোয়া']
          ]
        }
      },
      {
        headingGerman: '3. Gemischte Verben',
        headingBangla: '৩. মিশ্র ক্রিয়া (Mixed Verbs)',
        contentGerman: 'Gemischte Verben kombinieren Merkmale starker und schwacher Verben: Sie haben einen Vokalwechsel wie starke Verben, aber die Endungen schwacher Verben (-te, -t).',
        contentBangla: 'মিশ্র ক্রিয়াগুলো সবল ক্রিয়ার মতো স্বরবর্ণ পরিবর্তন করে কিন্তু দুর্বল ক্রিয়ার মতো Präteritum-এ -te এবং Partizip II-তে -t গ্রহণ করে।',
        table: {
          headers: ['Infinitiv', 'Präsens (er)', 'Präteritum (er)', 'Partizip II', 'বাংলা অর্থ'],
          rows: [
            ['bringen', 'er bringt', 'er brachte', 'hat gebracht', 'নিয়ে আসা'],
            ['denken', 'er denkt', 'er dachte', 'hat gedacht', 'চিন্তা করা'],
            ['kennen', 'er kennt', 'er kannte', 'hat gekannt', 'চেনা / জানা'],
            ['wissen', 'er weiß', 'er wusste', 'hat gewusst', 'জানা / অবগত থাকা'],
            ['nennen', 'er nennt', 'er nannte', 'hat genannt', 'নামকরণ করা']
          ]
        }
      }
    ]
  },
  {
    id: 'person-number',
    number: 3,
    titleGerman: 'Person, Numerus und Personalpronomen',
    titleBangla: 'পুরুষ, বচন ও সর্বনামের সঠিক ব্যবহার',
    titleEnglish: 'Person, Number and Personal Pronouns (Familiar vs Formal)',
    summary: 'Verwendung der Personalpronomen: Unterschied zwischen du, ihr und der Höflichkeitsform Sie.',
    summaryBangla: 'জার্মান সর্বনামের ব্যবহার: পরিচিত বা বন্ধুমহল (du, ihr) বনাম আনুষ্ঠানিক বা সম্মানসূচক রূপের (Sie) নিয়ম।',
    sections: [
      {
        headingGerman: 'Die Personalpronomen im Nominativ',
        headingBangla: 'কর্তৃকারকে (Nominativ) ব্যক্তিগত সর্বনামসমূহ',
        contentGerman: 'Im Deutschen unterscheidet man streng zwischen der vertraulichen Anrede (du für eine Person, ihr für mehrere Personen) und der höflichen Anrede (Sie für eine oder mehrere Personen, immer großgeschrieben).',
        contentBangla: 'জার্মান ভাষায় আপনজন, বন্ধু ও শিশুদের ক্ষেত্রে du (একবচন) ও ihr (বহুবচন) ব্যবহৃত হয়। অপরিচিত ব্যক্তি, কর্মক্ষেত্র বা মুরুব্বিদের ক্ষেত্রে সর্বদা বড় হাতের অক্ষরে "Sie" ব্যবহৃত হয় (একবচন ও বহুবচন উভয়তেই)।',
        table: {
          headers: ['Pronomen', 'Bedeutung', 'Numerus & Anrede', 'Verbendung', 'Beispiel'],
          rows: [
            ['ich', 'আমি', 'Singular (1. Person)', '-e', 'ich komme (আমি আসি)'],
            ['du', 'তুমি', 'Singular (2. Person vertraulich)', '-st', 'du kommst (তুমি আসো)'],
            ['er', 'সে (পুং)', 'Singular (3. Person maskulin)', '-t', 'er kommt (সে আসে)'],
            ['sie', 'সে (স্ত্রী)', 'Singular (3. Person feminin)', '-t', 'sie kommt (সে আসে)'],
            ['es', 'ইহা / সে (ক্লীব)', 'Singular (3. Person neutral)', '-t', 'es kommt (ইহা আসে)'],
            ['wir', 'আমরা', 'Plural (1. Person)', '-en', 'wir kommen (আমরা আসি)'],
            ['ihr', 'তোমরা', 'Plural (2. Person vertraulich)', '-t', 'ihr kommt (তোমরা আসো)'],
            ['sie', 'তারা', 'Plural (3. Person)', '-en', 'sie kommen (তারা আসে)'],
            ['Sie', 'আপনি / আপনারা', 'Singular/Plural (Höflichkeitsform)', '-en', 'Sie kommen (আপনি/আপনারা আসেন)']
          ]
        },
        examples: [
          {
            german: 'Kommst du morgen zur Party? (du-Form)',
            bangla: 'তুমি কি কাল পার্টিতে আসছ? (বন্ধুভাবাপন্ন)',
            english: 'Are you coming to the party tomorrow? (informal singular)'
          },
          {
            german: 'Kommen Sie bitte herein! (Sie-Form)',
            bangla: 'দয়া করে ভেতরে আসুন! (সম্মানসূচক)',
            english: 'Please come in! (formal singular/plural)'
          }
        ]
      }
    ]
  },
  {
    id: 'six-tenses',
    number: 4,
    titleGerman: 'Die 6 Zeitformen im Deutschen',
    titleBangla: 'জার্মান ভাষার ৬টি কাল (Tenses)',
    titleEnglish: 'The 6 German Tenses (Tempora): Formation & Usage',
    summary: 'Überblick über Präsens, Perfekt, Präteritum, Plusquamperfekt, Futur I und Futur II.',
    summaryBangla: 'জার্মান ভাষার ৬টি কালের গঠন ও ব্যবহার: Präsens, Perfekt, Präteritum, Plusquamperfekt, Futur I এবং Futur II।',
    sections: [
      {
        headingGerman: '1. Präsens (Gegenwart & nahe Zukunft)',
        headingBangla: '১. প্রেজেন্স (বর্তমান কাল ও নিকট ভবিষ্যৎ)',
        contentGerman: 'Das Präsens drückt Handlungen in der Gegenwart aus, allgemeine Tatsachen sowie zukünftige Ereignisse mit Zeitangabe (z. B. Morgen fliege ich nach Berlin).',
        contentBangla: 'বর্তমান সময়, চিরন্তন সত্য এবং ভবিষ্যৎ সূচক শব্দ যোগ করে নিকট ভবিষ্যতের ঘটনা বোঝাতে Präsens ব্যবহৃত হয়।',
        examples: [
          {
            german: 'Wir essen gerade zu Abend.',
            bangla: 'আমরা এখন রাতের খাবার খাচ্ছি।',
            english: 'We are eating dinner right now.'
          },
          {
            german: 'Nächste Woche fahre ich nach Hamburg.',
            bangla: 'আগামী সপ্তাহে আমি হামবুর্গ যাচ্ছি।',
            english: 'Next week I am going to Hamburg.'
          }
        ]
      },
      {
        headingGerman: '2. Perfekt (Gesprochene Vergangenheit)',
        headingBangla: '২. পারফেক্ট (কথোপকথনে ব্যবহৃত অতীত কাল)',
        contentGerman: 'Das Perfekt ist die wichtigste Vergangenheitsform in der gesprochenen Sprache. Bildung: haben / sein (im Präsens) + Partizip II am Satzende.',
        contentBangla: 'কথ্য জার্মান ভাষায় অতীত ঘটনা বর্ণনায় Perfekt সবচেয়ে বেশি ব্যবহৃত হয়। গঠন: haben বা sein (বর্তমান রূপে) + বাক্যের শেষে Partizip II।',
        table: {
          headers: ['Hilfsverb', 'Wann wird es verwendet?', 'Beispiele', 'বাংলা অর্থ'],
          rows: [
            ['haben', 'Bei den meisten Verben (transitive Verben mit Akkusativ-Objekt, reflexive Verben, Verben des Verharrens)', 'Ich habe ein Buch gelesen. Er hat geschlafen.', 'আমি একটি বই পড়েছি। সে ঘুমিয়েছে।'],
            ['sein', 'Bei Verben der Ortsveränderung (Bewegung), Zustandsänderung sowie bei sein, werden, bleiben, passieren', 'Wir sind nach Hause gegangen. Er ist aufgewacht.', 'আমরা বাড়ি গিয়েছি। সে জেগে উঠেছে।']
          ]
        },
        examples: [
          {
            german: 'Hast du deine Hausaufgaben gemacht?',
            bangla: 'তুমি কি তোমার বাড়ির কাজ করেছ?',
            english: 'Have you done your homework?'
          },
          {
            german: 'Er ist gestern um 8 Uhr angekommen.',
            bangla: 'সে গতকাল সকাল ৮টায় পৌঁছেছে।',
            english: 'He arrived yesterday at 8 o\'clock.'
          }
        ]
      },
      {
        headingGerman: '3. Präteritum (Schriftliche Vergangenheit)',
        headingBangla: '৩. প্রেতেরিতুম (লিখিত অতীত কাল)',
        contentGerman: 'Das Präteritum wird vor allem in Zeitungen, Büchern, Berichten und Erzählungen verwendet. Bei Hilfsverben (war, hatte) und Modalverben (konnte, musste, wollte) wird es aber auch in der Alltagssprache fast immer dem Perfekt vorgezogen!',
        contentBangla: 'পত্রিকা, বই, গল্প ও সংবাদে Präteritum ব্যবহৃত হয়। তবে Hilfsverb (sein → war, haben → hatte) এবং Modalverb (können → konnte, müssen → musste)-এর ক্ষেত্রে কথ্য ভাষাতেও Perfekt-এর চেয়ে Präteritum ব্যবহার করা হয়!',
        examples: [
          {
            german: 'Gestern war das Wetter sehr schön.',
            bangla: 'গতকাল আবহাওয়া খুব চমৎকার ছিল।',
            english: 'Yesterday the weather was very nice.'
          },
          {
            german: 'Ich musste gestern lange arbeiten.',
            bangla: 'আমাকে গতকাল অনেকক্ষণ কাজ করতে হয়েছিল।',
            english: 'I had to work for a long time yesterday.'
          }
        ]
      },
      {
        headingGerman: '4. Plusquamperfekt (Vorvergangenheit)',
        headingBangla: '৪. প্লুসকোয়ামপারফেক্ট (পুরাঘটিত অতীত কাল)',
        contentGerman: 'Das Plusquamperfekt drückt Handlungen aus, die vor einem bestimmten Zeitpunkt in der Vergangenheit bereits abgeschlossen waren. Bildung: hatte / war (Präteritum) + Partizip II.',
        contentBangla: 'অতীতের কোনো ঘটনার পূর্বে ঘটে যাওয়া অন্য একটি অতীত ঘটনা প্রকাশ করতে Plusquamperfekt ব্যবহৃত হয়। গঠন: hatte বা war + Partizip II।',
        examples: [
          {
            german: 'Nachdem er gegessen hatte, ging er spazieren.',
            bangla: 'খাওয়ার পর সে হাঁটতে গিয়েছিল।',
            english: 'After he had eaten, he went for a walk.'
          }
        ]
      },
      {
        headingGerman: '5. Futur I & 6. Futur II (Zukunft)',
        headingBangla: '৫. ফিউচার ১ এবং ৬. ফিউচার ২ (ভবিষ্যৎ কাল)',
        contentGerman: 'Futur I drückt Pläne, Absichten, Vermutungen oder Versprechen in der Zukunft aus (werden + Infinitiv). Futur II drückt eine Vermutung über eine bereits abgeschlossene Handlung oder ein zukünftig abgeschlossenes Geschehen aus (werden + Partizip II + haben/sein).',
        contentBangla: 'ভবিষ্যতের পরিকল্পনা, অনুমান বা প্রতিশ্রুতি বোঝাতে Futur I গঠিত হয়: werden + Infinitiv। আর ভবিষ্যতে কোনো কাজ সম্পন্ন হয়ে থাকবে অনুমান করতে Futur II ব্যবহৃত হয়: werden + Partizip II + haben/sein।',
        examples: [
          {
            german: 'Ich werde dich morgen anrufen. (Futur I)',
            bangla: 'আমি কাল তোমাকে ফোন করব।',
            english: 'I will call you tomorrow.'
          },
          {
            german: 'Bis morgen wird er die Arbeit beendet haben. (Futur II)',
            bangla: 'আগামীকালের মধ্যে সে কাজটি শেষ করে থাকবে।',
            english: 'By tomorrow he will have finished the work.'
          }
        ]
      }
    ]
  },
  {
    id: 'grammatical-mood',
    number: 5,
    titleGerman: 'Die Modi: Indikativ, Konjunktiv I & II, Imperativ',
    titleBangla: 'ক্রিয়ার ভাব: ইন্ডিকেটিভ, কনজুঙ্কটিভ ও ইম্পারেটিভ',
    titleEnglish: 'Grammatical Mood: Indicative, Subjunctive I & II, Imperative',
    summary: 'Aussagen von Tatsachen (Indikativ), indirekte Rede (Konjunktiv I), Wünsche und Höflichkeit (Konjunktiv II) sowie Befehle (Imperativ).',
    summaryBangla: 'বাস্তব ঘটনা (Indikativ), পরোক্ষ উক্তি (Konjunktiv I), ইচ্ছা ও ভদ্রতা (Konjunktiv II) এবং আদেশ বা অনুরোধ (Imperativ)।',
    sections: [
      {
        headingGerman: '1. Indikativ (Wirklichkeitsform)',
        headingBangla: '১. ইন্ডিকেটিভ (বাস্তব রূপ)',
        contentGerman: 'Der Indikativ stellt Handlungen und Zustände als real, objektiv und sicher dar. Er ist der am häufigsten gebrauchte Modus in allen 6 Zeitformen.',
        contentBangla: 'কোনো ঘটনা বা সত্যকে বাস্তব ও নিশ্চিত হিসেবে প্রকাশ করতে Indikativ ব্যবহৃত হয়।',
        examples: [
          {
            german: 'Der Zug fährt um 10 Uhr ab.',
            bangla: 'ট্রেনটি সকাল ১০টায় ছাড়বে।',
            english: 'The train departs at 10 o\'clock.'
          }
        ]
      },
      {
        headingGerman: '2. Konjunktiv I (Indirekte Rede)',
        headingBangla: '২. কনজুঙ্কটিভ ১ (পরোক্ষ উক্তি / Indirect Speech)',
        contentGerman: 'Der Konjunktiv I wird vor allem im Journalismus und in der Schriftsprache verwendet, um Aussagen anderer Personen neutral wiederzugeben (indirekte Rede). Häufigste Formen: er habe, er sei, er wisse.',
        contentBangla: 'সংবাদ ও আনুষ্ঠানিক লেখায় অন্যের বক্তব্য বা উক্তি হুবহু নিজের মতামত ছাড়া বর্ণনা করতে Konjunktiv I ব্যবহৃত হয়।',
        examples: [
          {
            german: 'Der Minister sagte, er sei unschuldig.',
            bangla: 'মন্ত্রী বলেছিলেন যে তিনি নির্দোষ।',
            english: 'The minister said he was innocent.'
          }
        ]
      },
      {
        headingGerman: '3. Konjunktiv II (Wünsche, Träume, Höflichkeit & Bedingungssätze)',
        headingBangla: '৩. কনজুঙ্কটিভ ২ (ইচ্ছা, স্বপ্ন, ভদ্রতা ও শর্তসাপেক্ষ বাক্য)',
        contentGerman: 'Der Konjunktiv II drückt Irreales, Wünsche, höfliche Bitten und hypothetische Bedingungen aus (Wenn ich reich wäre...). In der Alltagssprache wird meist die Umschreibung "würde + Infinitiv" verwendet, außer bei sein (wäre), haben (hätte) und Modalverben (könnte, müsste, dürfte).',
        contentBangla: 'কাল্পনিক ইচ্ছা, শর্ত (যদি আমি ধনী হতাম...), এবং অত্যন্ত বিনম্র অনুরোধ করতে Konjunktiv II ব্যবহৃত হয়। দৈনন্দিন ব্যবহারে বেশিরভাগ ক্রিয়ার সাথে "würde + Infinitiv" বসে, শুধু sein (wäre), haben (hätte) ও মোডাল ভার্বগুলোর নিজস্ব রূপ প্রচলিত।',
        table: {
          headers: ['Verb', 'Konjunktiv II Form', 'Bedeutung', 'Beispiel'],
          rows: [
            ['haben', 'ich hätte, du hättest, er hätte', 'থাকত / পেতাম', 'Ich hätte gern einen Kaffee. (আমি একটি কফি পেলে খুশি হতাম)'],
            ['sein', 'ich wäre, du wärst, er wäre', 'হতাম / হতো', 'Wenn ich mehr Zeit hätte, wäre ich glücklich.'],
            ['können', 'ich könnte, du könntest, er könnte', 'পারতাম / পারবেন কি', 'Könnten Sie mir bitte helfen? (আমাকে একটু সাহায্য করতে পারবেন?)'],
            ['alle anderen', 'würde + Infinitiv', 'করতাম / যেত', 'Ich würde gern nach Deutschland reisen.']
          ]
        }
      },
      {
        headingGerman: '4. Imperativ (Befehlsform)',
        headingBangla: '৪. ইম্পারেটিভ (আদেশ, অনুরোধ ও পরামর্শ)',
        contentGerman: 'Der Imperativ existiert für vier Personen: du (Komm!), ihr (Kommt!), wir (Gehen wir!) und die Höflichkeitsform Sie (Kommen Sie!). Bei "du" entfällt das Pronomen und die Endung -st.',
        contentBangla: 'আদেশ, অনুরোধ বা পরামর্শ দিতে Imperativ ব্যবহৃত হয়। du-এর ক্ষেত্রে সর্বনাম বাদ যায় এবং -st উঠে যায় (Komm!)। ihr-এর ক্ষেত্রে শুধু সর্বনাম বাদ যায় (Kommt!)। Sie-এর ক্ষেত্রে ক্রিয়ার পর Sie বসে (Kommen Sie!)।',
        examples: [
          {
            german: 'Mach bitte das Fenster auf! (du)',
            bangla: 'দয়া করে জানালাটি খোলো! (একবচন)',
            english: 'Please open the window!'
          },
          {
            german: 'Warten Sie einen Moment, bitte! (Sie)',
            bangla: 'দয়া করে একটু অপেক্ষা করুন! (সম্মানসূচক)',
            english: 'Please wait a moment!'
          }
        ]
      }
    ]
  },
  {
    id: 'separable-prefixes',
    number: 6,
    titleGerman: 'Trennbare und untrennbare Verben',
    titleBangla: 'বিভাজ্য ও অবিভাজ্য উপসর্গযুক্ত ক্রিয়া',
    titleEnglish: 'Separable and Inseparable Prefix Verbs',
    summary: 'Regeln für trennbare Präfixe (ab-, an-, auf-, mit- usw.) und untrennbare Präfixe (be-, ent-, er-, ver-, zer- usw.).',
    summaryBangla: 'বিভাজ্য উপসর্গ (Trennbare Präfixe) এবং অবিভাজ্য উপসর্গের (Untrennbare Präfixe) অবস্থান ও বাক্যে প্রয়োগের নিয়ম।',
    sections: [
      {
        headingGerman: 'Trennbare Verben (Das Präfix trennt sich)',
        headingBangla: 'বিভাজ্য ক্রিয়া (Trennbare Verben)',
        contentGerman: 'Bei trennbaren Verben wird das Präfix im Hauptsatz im Präsens und Präteritum abgetrennt und wandert ganz ans Ende des Satzes! Im Partizip II steht das "ge-" zwischen Präfix und Stamm (auf-ge-standen). Im Infinitiv mit "zu" steht das "zu" dazwischen (auf-zu-stehen).',
        contentBangla: 'প্রধান বাক্যে (Hauptsatz) বর্তমান ও অতীতে উপসর্গটি ক্রিয়ামূল থেকে আলাদা হয়ে বাক্যের একবারে শেষে বসে। Partizip II-তে "ge-" উপসর্গ ও ক্রিয়ার মাঝে ঢোকে (যেমন: auf-ge-standen)। Infinitiv mit zu-এর ক্ষেত্রে "zu" উপসর্গ ও ক্রিয়ামূলের মাঝে বসে (যেমন: ein-zu-kaufen)।',
        table: {
          headers: ['Typische trennbare Präfixe', 'Beispielverb', 'Satz im Präsens', 'Partizip II', 'বাংলা অর্থ'],
          rows: [
            ['ab-', 'abfahren', 'Der Zug fährt um 9 Uhr ab.', 'ist abgefahren', 'ছেড়ে যাওয়া'],
            ['an-', 'ankommen', 'Der Bus kommt bald an.', 'ist angekommen', 'পৌঁছানো'],
            ['auf-', 'aufstehen', 'Ich stehe um 7 Uhr auf.', 'ist aufgestanden', 'ঘুম থেকে ওঠা'],
            ['aus-', 'ausfüllen', 'Er füllt das Formular aus.', 'hat ausgefüllt', 'পূরণ করা'],
            ['ein-', 'einkaufen', 'Wir kaufen im Supermarkt ein.', 'hat eingekauft', 'কেনাকাটা করা'],
            ['mit-', 'mitbringen', 'Bringst du bitte Brot mit?', 'hat mitgebracht', 'সাথে নিয়ে আসা'],
            ['vor-', 'vorstellen', 'Ich stelle mich vor.', 'hat vorgestellt', 'পরিচয় দেওয়া'],
            ['zu-', 'zumachen', 'Mach bitte die Tür zu.', 'hat zugemacht', 'বন্ধ করা'],
            ['zurück-', 'zurückkommen', 'Wann kommst du zurück?', 'ist zurückgekommen', 'ফিরে আসা']
          ]
        }
      },
      {
        headingGerman: 'Untrennbare Verben (Das Präfix trennt sich NIE)',
        headingBangla: 'অবিভাজ্য ক্রিয়া (Untrennbare Verben)',
        contentGerman: 'Untrennbare Verben sind unbetont und trennen sich in keinem Fall vom Verbstamm. Wichtig: Im Partizip II bekommen sie KEIN "ge-"! Merksatz für untrennbare Präfixe: "be-, emp-, ent-, er-, ge-, miss-, ver-, zer-".',
        contentBangla: 'অবিভাজ্য উপসর্গ কখনোই ক্রিয়ামূল থেকে আলাদা হয় না। সবচেয়ে গুরুত্বপূর্ণ নিয়ম: এদের Partizip II-তে কোনো "ge-" যুক্ত হয় না! অবিভাজ্য উপসর্গ মনে রাখার সহজ সূত্র: be-, emp-, ent-, er-, ge-, miss-, ver-, zer-।',
        table: {
          headers: ['Präfix', 'Beispielverb', 'Präsens', 'Partizip II (kein ge-!)', 'বাংলা অর্থ'],
          rows: [
            ['be-', 'bezahlen', 'Ich bezahle die Rechnung.', 'hat bezahlt', 'বিল পরিশোধ করা'],
            ['emp-', 'empfehlen', 'Er empfiehlt das Restaurant.', 'hat empfohlen', 'সুপারিশ করা'],
            ['ent-', 'entscheiden', 'Wir entscheiden heute.', 'hat entschieden', 'সিদ্ধান্ত নেওয়া'],
            ['er-', 'erzählen', 'Opa erzählt eine Geschichte.', 'hat erzählt', 'গল্প বলা / বর্ণনা করা'],
            ['ver-', 'verstehen', 'Verstehst du das Problem?', 'hat verstanden', 'বুঝতে পারা'],
            ['zer-', 'zerstören', 'Der Sturm zerstört das Haus.', 'hat zerstört', 'ধ্বংস করা']
          ]
        }
      }
    ]
  },
  {
    id: 'infinitive-clauses',
    number: 7,
    titleGerman: 'Infinitivkonstruktionen (mit und ohne "zu")',
    titleBangla: 'ইনফিনিটিভ বাক্যগঠন ("zu" সহ এবং ছাড়া)',
    titleEnglish: 'Infinitive Constructions (with and without "zu")',
    summary: 'Wann steht ein Verb im Infinitiv mit "zu" und wann ohne "zu" (z. B. bei Modalverben).',
    summaryBangla: 'কখন ক্রিয়ার পূর্বে "zu" যুক্ত হয় (Infinitiv mit zu) এবং কখন "zu" ছাড়া সরাসরি ইনফিনিটিভ বসে।',
    sections: [
      {
        headingGerman: '1. Infinitiv ohne "zu"',
        headingBangla: '১. "zu" ছাড়া ইনফিনিটিভ',
        contentGerman: 'Der reine Infinitiv ohne "zu" steht nach: Modalverben (können, müssen, dürfen, sollen, wollen, möchten), Verben der Bewegung (gehen, fahren), Verben der Wahrnehmung (sehen, hören) sowie lassen, bleiben.',
        contentBangla: 'মোডাল ভার্ব, গতিবাচক ক্রিয়া (gehen, fahren), অনুভূতিবাচক ক্রিয়া (sehen, hören) এবং lassen, bleiben ইত্যাদির পর সরাসরি Infinitiv বসে, কোনো "zu" বসে না।',
        examples: [
          {
            german: 'Ich kann sehr gut schwimmen. (Modalverb)',
            bangla: 'আমি খুব ভালো সাঁতার কাটতে পারি।',
            english: 'I can swim very well.'
          },
          {
            german: 'Wir gehen am Abend tanzen.',
            bangla: 'আমরা সন্ধ্যায় নাচতে যাব।',
            english: 'We are going dancing in the evening.'
          }
        ]
      },
      {
        headingGerman: '2. Infinitiv mit "zu"',
        headingBangla: '২. "zu" সহ ইনফিনিটিভ',
        contentGerman: 'In den meisten anderen Fällen, wenn zwei Verben kombiniert werden, steht das zweite Verb am Satzende mit "zu": nach unpersönlichen Ausdrücken (Es ist wichtig, zu...), nach Nomen (Ich habe Lust/Zeit, zu...) oder nach Verben wie hoffen, planen, vergessen, vorhaben.',
        contentBangla: 'অধিকাংশ ভাববাচক বাক্যে দ্বিতীয় ক্রিয়াটি বাক্যের শেষে "zu" সহ বসে: অনুভূতি বা ইচ্ছে প্রকাশের পর (Lust/Zeit/Angst haben zu...), পরিকল্পনা প্রকাশের পর (planen, hoffen, vergessen zu...), কিংবা বর্ণনামূলক বাক্যে (Es ist schön/wichtig zu...)।',
        examples: [
          {
            german: 'Es ist wichtig, jeden Tag Vokabeln zu lernen.',
            bangla: 'প্রতিদিন শব্দভাণ্ডার শেখা অত্যন্ত গুরুত্বপূর্ণ।',
            english: 'It is important to learn vocabulary every day.'
          },
          {
            german: 'Ich habe vor, morgen früh aufzustehen. (trennbare Verben: auf-zu-stehen)',
            bangla: 'আমার কাল সকালে জলদি ঘুম থেকে ওঠার ইচ্ছা আছে।',
            english: 'I plan to get up early tomorrow.'
          }
        ]
      }
    ]
  },
  {
    id: 'auxiliary-and-modals',
    number: 8,
    titleGerman: 'Hilfsverben und Modalverben',
    titleBangla: 'সহায়ক ও মোডাল ক্রিয়া (Auxiliary & Modal Verbs)',
    titleEnglish: 'Auxiliary Verbs (haben, sein, werden) and German Modal Verbs',
    summary: 'Bedeutung, Konjugation und Besonderheiten der drei Hilfsverben und der sechs Modalverben.',
    summaryBangla: 'তিনটি সহায়ক ক্রিয়া (haben, sein, werden) এবং ছয়টি মোডাল ক্রিয়ার অর্থ ও নিয়ম।',
    sections: [
      {
        headingGerman: 'Die drei großen Hilfsverben: haben, sein, werden',
        headingBangla: 'তিনটি প্রধান সহায়ক ক্রিয়া: haben, sein, werden',
        contentGerman: 'Diese drei Verben können sowohl als Vollverben als auch als Hilfsverben zur Bildung von Zeitformen und Passiv fungieren.',
        contentBangla: 'এই তিনটি ক্রিয়া নিজে পূর্ণাঙ্গ ক্রিয়া হিসেবে যেমন কাজ করতে পারে, তেমনি কাল (Tense) এবং কর্মবাচ্য (Passive) গঠনে অপরিহার্য ভূমিকা পালন করে।',
        table: {
          headers: ['Hilfsverb', 'Präsens (er)', 'Präteritum (er)', 'Partizip II', 'Hauptfunktion als Hilfsverb'],
          rows: [
            ['haben', 'hat', 'hatte', 'hat gehabt', 'Perfekt & Plusquamperfekt bei transitiven/reflexiven Verben'],
            ['sein', 'ist', 'war', 'ist gewesen', 'Perfekt & Plusquamperfekt bei Bewegungs-/Zustandsverben'],
            ['werden', 'wird', 'wurde', 'ist geworden', 'Futur I & II sowie Vorgangspassiv']
          ]
        }
      },
      {
        headingGerman: 'Die 6 Modalverben im Deutschen',
        headingBangla: 'জার্মান ভাষার ৬টি মোডাল ভার্ব',
        contentGerman: 'Modalverben modifizieren die Aussage eines Hauptverbs. Im Präsens sind die 1. und 3. Person Singular immer identisch und haben KEINE Endung! Fast alle haben einen Vokalwechsel im Singular.',
        contentBangla: 'মোডাল ভার্ব মূল ক্রিয়ার ভাব পরিবর্তন করে (সামর্থ্য, বাধ্যবাধকতা, অনুমতি ইত্যাদি)। বর্তমানকালে ১ম ও ৩য় পুরুষ একবচনে (ich এবং er/sie/es) কোনো বিভক্তি থাকে না এবং দুটি হুবহু একই হয়!',
        table: {
          headers: ['Modalverb', 'Bedeutung', 'ich / er Form', 'du Form', 'wir / Sie Form', 'Präteritum (ich/er)'],
          rows: [
            ['können', 'সামর্থ্য / সম্ভাবনা (can)', 'kann', 'kannst', 'können', 'konnte'],
            ['müssen', 'বাধ্যবাধকতা (must/have to)', 'muss', 'musst', 'müssen', 'musste'],
            ['dürfen', 'অনুমতি / নিষেধ (may/allowed)', 'darf', 'darfst', 'dürfen', 'durfte'],
            ['sollen', 'দায়িত্ব / উপদেশ (should)', 'soll', 'sollst', 'sollen', 'sollte'],
            ['wollen', 'দৃঢ় ইচ্ছা / চাওয়া (want to)', 'will', 'willst', 'wollen', 'wollte'],
            ['mögen (möchte)', 'পছন্দ করা / চাওয়া (like/would like)', 'mag (möchte)', 'magst (möchtest)', 'mögen (möchten)', 'mochte (wollte)']
          ]
        }
      }
    ]
  },
  {
    id: 'reflexive-verbs',
    number: 9,
    titleGerman: 'Reflexive Verben (Sich-Verben)',
    titleBangla: 'আত্মবাচক ক্রিয়া (Reflexive Verben)',
    titleEnglish: 'Reflexive Verbs and Reflexive Pronouns (Accusative vs Dative)',
    summary: 'Verben, die mit einem Reflexivpronomen (mich/mir, dich/dir, sich) verwendet werden.',
    summaryBangla: 'যেসব ক্রিয়া আত্মবাচক সর্বনাম (Reflexivpronomen) সহযোগে নিজের উপর কাজের প্রভাব বোঝায়।',
    sections: [
      {
        headingGerman: 'Akkusativ vs. Dativ Reflexivpronomen',
        headingBangla: 'আকুসাটিভ বনাম ডাটিভ আত্মবাচক সর্বনাম',
        contentGerman: 'Wenn kein weiteres Akkusativobjekt im Satz vorhanden ist, steht das Reflexivpronomen im Akkusativ. Wenn bereits ein direktes Akkusativobjekt vorhanden ist, wechselt das Pronomen bei "ich" und "du" in den Dativ (mir, dir).',
        contentBangla: 'বাক্যে যদি অন্য কোনো বস্তুবাচক কর্ম (Akkusativ-Objekt) না থাকে, তবে সর্বনামটি আকুসাটিভ হয়। কিন্তু যদি ইতোমধ্যে একটি আকুসাটিভ কর্ম থাকে, তবে "ich" হয়ে যায় "mir" এবং "du" হয়ে যায় "dir"। বাকি সব রূপ অপরিবর্তিত থাকে।',
        table: {
          headers: ['Pronomen', 'Akkusativ (ich wasche mich)', 'Dativ (ich wasche mir die Hände)', 'বাংলা অর্থ'],
          rows: [
            ['ich', 'mich', 'mir', 'নিজেকে / আমার'],
            ['du', 'dich', 'dir', 'তোমাকে / তোমার'],
            ['er / sie / es', 'sich', 'sich', 'নিজেকে / তার'],
            ['wir', 'uns', 'uns', 'নিজেদের / আমাদের'],
            ['ihr', 'euch', 'euch', 'তোমাদের / নিজেদের'],
            ['sie / Sie', 'sich', 'sich', 'নিজেকে / আপনার']
          ]
        },
        examples: [
          {
            german: 'Ich freue mich auf den Urlaub. (Akkusativ)',
            bangla: 'আমি ছুটির জন্য আনন্দিত / অধীর আগ্রহে অপেক্ষা করছি।',
            english: 'I look forward to the vacation.'
          },
          {
            german: 'Ich wasche mir die Hände. (Dativ, da "die Hände" das Akkusativ-Objekt ist)',
            bangla: 'আমি আমার হাত ধুচ্ছি।',
            english: 'I am washing my hands.'
          }
        ]
      }
    ]
  },
  {
    id: 'passive-voice',
    number: 10,
    titleGerman: 'Das Passiv im Deutschen',
    titleBangla: 'কর্মবাচ্য (Passive Voice: Vorgangspassiv & Zustandspassiv)',
    titleEnglish: 'Passive Voice in German: Process vs State Passive',
    summary: 'Bildung des Vorgangspassivs mit "werden" und des Zustandspassivs mit "sein".',
    summaryBangla: 'প্রক্রিয়াভিত্তিক কর্মবাচ্য (werden + Partizip II) এবং অবস্থাগত কর্মবাচ্য (sein + Partizip II)-এর নিয়ম।',
    sections: [
      {
        headingGerman: 'Vorgangspassiv (werden + Partizip II)',
        headingBangla: '১. প্রক্রিয়াভিত্তিক কর্মবাচ্য (Vorgangspassiv)',
        contentGerman: 'Das Vorgangspassiv betont die Handlung selbst und nicht die Person, die sie ausführt. Bildung: entsprechende Form von "werden" + Partizip II am Satzende. Der Verursacher kann mit "von + Dativ" (Person) oder "durch + Akkusativ" (Mittel/Ursache) genannt werden.',
        contentBangla: 'এখানে কর্তার চেয়ে কাজটি ঘটার প্রক্রিয়াটি মুখ্য। গঠন: werden-এর কালভিত্তিক রূপ + বাক্যের শেষে Partizip II। কর্তা উল্লেখ করতে চাইলে "von + Dativ" (ব্যক্তির জন্য) বা "durch + Akkusativ" (উপায় বা কারণের জন্য) বসে।',
        table: {
          headers: ['Zeitform', 'Aktiv-Satz', 'Passiv-Satz', 'বাংলা অর্থ'],
          rows: [
            ['Präsens', 'Der Arzt untersucht das Kind.', 'Das Kind wird (vom Arzt) untersucht.', 'শিশুটি ডাক্তার কর্তৃক পরীক্ষিত হচ্ছে।'],
            ['Präteritum', 'Der Mechaniker reparierte das Auto.', 'Das Auto wurde repariert.', 'গাড়িটি মেরামত করা হয়েছিল।'],
            ['Perfekt', 'Man hat das Haus gebaut.', 'Das Haus ist gebaut worden.', 'বাড়িটি নির্মাণ করা হয়েছে।'],
            ['Futur I', 'Wir werden das Projekt abschließen.', 'Das Projekt wird abgeschlossen werden.', 'প্রকল্পটি সমাপ্ত করা হবে।']
          ]
        }
      },
      {
        headingGerman: 'Zustandspassiv (sein + Partizip II)',
        headingBangla: '২. অবস্থাগত কর্মবাচ্য (Zustandspassiv)',
        contentGerman: 'Das Zustandspassiv beschreibt das fertige Resultat oder den Zustand nach einer Handlung. Bildung: Form von "sein" + Partizip II.',
        contentBangla: 'কাজটি শেষ হওয়ার পর বর্তমান অবস্থা বোঝাতে Zustandspassiv ব্যবহৃত হয়। গঠন: sein + Partizip II।',
        examples: [
          {
            german: 'Das Geschäft ist geöffnet.',
            bangla: 'দোকানটি খোলা (খোলা অবস্থায় আছে)।',
            english: 'The shop is open.'
          },
          {
            german: 'Die Tür war geschlossen.',
            bangla: 'দরজাটি বন্ধ ছিল।',
            english: 'The door was closed.'
          }
        ]
      }
    ]
  },
  {
    id: 'conjugation-models',
    number: 11,
    titleGerman: 'Konjugationsmodelle & Stammvokalwechsel',
    titleBangla: 'কনজুগেশন মডেল ও ক্রিয়া প্যাটার্ন (Ablautreihen)',
    titleEnglish: 'German Conjugation Models & Stem Vowel Change Patterns',
    summary: 'Systematische Verbgruppen und Lautwechselmuster für hunderte unregelmäßige Verben.',
    summaryBangla: 'অনিয়মিত ও সবল ক্রিয়াসমূহের সাধারণ প্যাটার্ন ও পরিবার (যেমন: -eiben, -ingen, -ehen ইত্যাদি)।',
    sections: [
      {
        headingGerman: 'Häufige Ablautreihen bei starken Verben',
        headingBangla: 'সবল ক্রিয়ার প্রধান ধ্বনি পরিবর্তন পরিবার (Ablaut Patterns)',
        contentGerman: 'Starke Verben folgen historischen Klangmustern. Wenn Sie das Muster eines Modellverbs kennen, können Sie alle abgeleiteten und verwandten Verben mühelos konjugieren!',
        contentBangla: 'জার্মান সবল ক্রিয়াগুলো নির্দিষ্ট কিছু ধ্বনি পরিবর্তন প্যাটার্ন অনুসরণ করে। একটি মডেল ভার্বের রূপ মনে রাখলে তার সমগোত্রীয় সকল ক্রিয়ার রূপান্তর পানির মতো সহজ হয়ে যায়!',
        table: {
          headers: ['Modell-Muster', 'Vokalwechsel (Inf. → Prät. → Part. II)', 'Musterverb', 'Weitere Verben nach diesem Modell', 'বাংলা অর্থ'],
          rows: [
            ['-eiben Gruppe', 'ei → ie → ie', 'schreiben (schrieb, geschrieben)', 'bleiben, treiben, steigen, scheinen, vermeiden', 'লেখা / থাকা / ওঠা / আলো দেওয়া'],
            ['-ingen Gruppe', 'i → a → u', 'singen (sang, gesungen)', 'trinken, springen, finden, klingen, sinken, zwingen', 'গান গাওয়া / পান করা / পাওয়া'],
            ['-ehen Gruppe', 'e → a → a/o', 'stehen (stand, gestanden)', 'verstehen, entstehen, bestehen, gestehen', 'দাঁড়ানো / বোঝা / সৃষ্টি হওয়া'],
            ['-agen Gruppe', 'a (ä) → u → a', 'tragen (trug, getragen)', 'fahren, schlagen, vorschlagen, einladen', 'বহন করা / চালানো / নিমন্ত্রণ করা'],
            ['-ehmen Gruppe', 'e (i/imm) → a → o', 'nehmen (nahm, genommen)', 'aufnehmen, mitnehmen, teilnehmen, zunehmen', 'নেওয়া / অংশ নেওয়া / বৃদ্ধি পাওয়া'],
            ['-prechen Gruppe', 'e (i) → a → o', 'sprechen (sprach, gesprochen)', 'brechen, treffen, helfen, sterben, werfen', 'কথা বলা / দেখা করা / সাহায্য করা'],
            ['-essen Gruppe', 'e (i/iss) → a → e', 'essen (aß, gegessen)', 'vergessen, messen, fressen', 'খাওয়া / ভুলে যাওয়া / পরিমাপ করা']
          ]
        }
      }
    ]
  }
];
