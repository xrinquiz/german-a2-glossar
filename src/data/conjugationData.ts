import { VerbConjugation } from '../types/conjugation';

export interface StrongRootData {
  type: 'irregular' | 'modal' | 'mixed' | 'regular';
  aux: 'haben' | 'sein';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  bangla: string;
  english: string;
  pres: { ich: string; du: string; erSieEs: string; wir: string; ihr: string; sieSie: string };
  past: { ich: string; du: string; erSieEs: string; wir: string; ihr: string; sieSie: string };
  p2: string;
  k1: { ich: string; du: string; erSieEs: string; wir: string; ihr: string; sieSie: string };
  k2: { ich: string; du: string; erSieEs: string; wir: string; ihr: string; sieSie: string };
  imp: { du: string; wir: string; ihr: string; Sie: string };
}

export const STRONG_ROOTS_DATA: Record<string, StrongRootData> = {
  "sein": {
    "type": "irregular",
    "aux": "sein",
    "level": "A1",
    "bangla": "হওয়া / থাকা",
    "english": "to be",
    "pres": {
      "ich": "bin",
      "du": "bist",
      "erSieEs": "ist",
      "wir": "sind",
      "ihr": "seid",
      "sieSie": "sind"
    },
    "past": {
      "ich": "war",
      "du": "warst",
      "erSieEs": "war",
      "wir": "waren",
      "ihr": "wart",
      "sieSie": "waren"
    },
    "p2": "gewesen",
    "k1": {
      "ich": "sei",
      "du": "seiest",
      "erSieEs": "sei",
      "wir": "seien",
      "ihr": "seiet",
      "sieSie": "seien"
    },
    "k2": {
      "ich": "wäre",
      "du": "wärst",
      "erSieEs": "wäre",
      "wir": "wären",
      "ihr": "wärt",
      "sieSie": "wären"
    },
    "imp": {
      "du": "sei",
      "wir": "seien wir",
      "ihr": "seid",
      "Sie": "seien Sie"
    }
  },
  "haben": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "থাকা / অধিকার থাকা",
    "english": "to have",
    "pres": {
      "ich": "habe",
      "du": "hast",
      "erSieEs": "hat",
      "wir": "haben",
      "ihr": "habt",
      "sieSie": "haben"
    },
    "past": {
      "ich": "hatte",
      "du": "hattest",
      "erSieEs": "hatte",
      "wir": "hatten",
      "ihr": "hattet",
      "sieSie": "hatten"
    },
    "p2": "gehabt",
    "k1": {
      "ich": "habe",
      "du": "habest",
      "erSieEs": "habe",
      "wir": "haben",
      "ihr": "habet",
      "sieSie": "haben"
    },
    "k2": {
      "ich": "hätte",
      "du": "hättest",
      "erSieEs": "hätte",
      "wir": "hätten",
      "ihr": "hättet",
      "sieSie": "hätten"
    },
    "imp": {
      "du": "habe",
      "wir": "haben wir",
      "ihr": "habt",
      "Sie": "haben Sie"
    }
  },
  "werden": {
    "type": "irregular",
    "aux": "sein",
    "level": "A1",
    "bangla": "হওয়া / পরিণতি পাওয়া",
    "english": "to become",
    "pres": {
      "ich": "werde",
      "du": "wirst",
      "erSieEs": "wird",
      "wir": "werden",
      "ihr": "werdet",
      "sieSie": "werden"
    },
    "past": {
      "ich": "wurde",
      "du": "wurdest",
      "erSieEs": "wurde",
      "wir": "wurden",
      "ihr": "wurdet",
      "sieSie": "wurden"
    },
    "p2": "geworden",
    "k1": {
      "ich": "werde",
      "du": "werdest",
      "erSieEs": "werde",
      "wir": "werden",
      "ihr": "werdet",
      "sieSie": "werden"
    },
    "k2": {
      "ich": "würde",
      "du": "würdest",
      "erSieEs": "würde",
      "wir": "würden",
      "ihr": "würdet",
      "sieSie": "würden"
    },
    "imp": {
      "du": "werde",
      "wir": "werden wir",
      "ihr": "werdet",
      "Sie": "werden Sie"
    }
  },
  "können": {
    "type": "modal",
    "aux": "haben",
    "level": "A1",
    "bangla": "পারা / সামর্থ্য থাকা",
    "english": "can, to be able to",
    "pres": {
      "ich": "kann",
      "du": "kannst",
      "erSieEs": "kann",
      "wir": "können",
      "ihr": "könnt",
      "sieSie": "können"
    },
    "past": {
      "ich": "konnte",
      "du": "konntest",
      "erSieEs": "konnte",
      "wir": "konnten",
      "ihr": "konntet",
      "sieSie": "konnten"
    },
    "p2": "gekonnt",
    "k1": {
      "ich": "könne",
      "du": "könnest",
      "erSieEs": "könne",
      "wir": "können",
      "ihr": "könnet",
      "sieSie": "können"
    },
    "k2": {
      "ich": "könnte",
      "du": "könntest",
      "erSieEs": "könnte",
      "wir": "könnten",
      "ihr": "könntet",
      "sieSie": "könnten"
    },
    "imp": {
      "du": "—",
      "wir": "—",
      "ihr": "—",
      "Sie": "—"
    }
  },
  "müssen": {
    "type": "modal",
    "aux": "haben",
    "level": "A1",
    "bangla": "বাধ্য হওয়া / করতেই হবে",
    "english": "must, to have to",
    "pres": {
      "ich": "muss",
      "du": "musst",
      "erSieEs": "muss",
      "wir": "müssen",
      "ihr": "müsst",
      "sieSie": "müssen"
    },
    "past": {
      "ich": "musste",
      "du": "musstest",
      "erSieEs": "musste",
      "wir": "mussten",
      "ihr": "musstet",
      "sieSie": "mussten"
    },
    "p2": "gemusst",
    "k1": {
      "ich": "müsse",
      "du": "müssest",
      "erSieEs": "müsse",
      "wir": "müssen",
      "ihr": "müsset",
      "sieSie": "müssen"
    },
    "k2": {
      "ich": "müsste",
      "du": "müsstest",
      "erSieEs": "müsste",
      "wir": "müssten",
      "ihr": "müsstet",
      "sieSie": "müssten"
    },
    "imp": {
      "du": "—",
      "wir": "—",
      "ihr": "—",
      "Sie": "—"
    }
  },
  "dürfen": {
    "type": "modal",
    "aux": "haben",
    "level": "A1",
    "bangla": "অনুমতি পাওয়া / অধিকার থাকা",
    "english": "may, to be allowed to",
    "pres": {
      "ich": "darf",
      "du": "darfst",
      "erSieEs": "darf",
      "wir": "dürfen",
      "ihr": "dürft",
      "sieSie": "dürfen"
    },
    "past": {
      "ich": "durfte",
      "du": "durftest",
      "erSieEs": "durfte",
      "wir": "durften",
      "ihr": "durftet",
      "sieSie": "durften"
    },
    "p2": "gedurft",
    "k1": {
      "ich": "dürfe",
      "du": "dürfest",
      "erSieEs": "dürfe",
      "wir": "dürfen",
      "ihr": "dürfet",
      "sieSie": "dürfen"
    },
    "k2": {
      "ich": "dürfte",
      "du": "dürftest",
      "erSieEs": "dürfte",
      "wir": "dürften",
      "ihr": "dürftet",
      "sieSie": "dürften"
    },
    "imp": {
      "du": "—",
      "wir": "—",
      "ihr": "—",
      "Sie": "—"
    }
  },
  "sollen": {
    "type": "modal",
    "aux": "haben",
    "level": "A1",
    "bangla": "উচিত হওয়া / দায়িত্ব থাকা",
    "english": "should, ought to",
    "pres": {
      "ich": "soll",
      "du": "sollst",
      "erSieEs": "soll",
      "wir": "sollen",
      "ihr": "sollt",
      "sieSie": "sollen"
    },
    "past": {
      "ich": "sollte",
      "du": "solltest",
      "erSieEs": "sollte",
      "wir": "sollten",
      "ihr": "solltet",
      "sieSie": "sollen"
    },
    "p2": "gesollt",
    "k1": {
      "ich": "solle",
      "du": "sollest",
      "erSieEs": "solle",
      "wir": "sollen",
      "ihr": "sollet",
      "sieSie": "sollen"
    },
    "k2": {
      "ich": "sollte",
      "du": "solltest",
      "erSieEs": "sollte",
      "wir": "sollten",
      "ihr": "solltet",
      "sieSie": "sollten"
    },
    "imp": {
      "du": "—",
      "wir": "—",
      "ihr": "—",
      "Sie": "—"
    }
  },
  "wollen": {
    "type": "modal",
    "aux": "haben",
    "level": "A1",
    "bangla": "চাওয়া / ইচ্ছা প্রকাশ করা",
    "english": "to want to",
    "pres": {
      "ich": "will",
      "du": "willst",
      "erSieEs": "will",
      "wir": "wollen",
      "ihr": "wollt",
      "sieSie": "wollen"
    },
    "past": {
      "ich": "wollte",
      "du": "wolltest",
      "erSieEs": "wollte",
      "wir": "wollten",
      "ihr": "wolltet",
      "sieSie": "wollten"
    },
    "p2": "gewollt",
    "k1": {
      "ich": "wolle",
      "du": "wollest",
      "erSieEs": "wolle",
      "wir": "wollen",
      "ihr": "wollet",
      "sieSie": "wollen"
    },
    "k2": {
      "ich": "wollte",
      "du": "wolltest",
      "erSieEs": "wollte",
      "wir": "wollten",
      "ihr": "wolltet",
      "sieSie": "wollten"
    },
    "imp": {
      "du": "—",
      "wir": "—",
      "ihr": "—",
      "Sie": "—"
    }
  },
  "mögen": {
    "type": "modal",
    "aux": "haben",
    "level": "A1",
    "bangla": "পছন্দ করা / চাওয়া",
    "english": "to like, would like",
    "pres": {
      "ich": "mag",
      "du": "magst",
      "erSieEs": "mag",
      "wir": "mögen",
      "ihr": "mögt",
      "sieSie": "mögen"
    },
    "past": {
      "ich": "mochte",
      "du": "mochtest",
      "erSieEs": "mochte",
      "wir": "mochten",
      "ihr": "mochtet",
      "sieSie": "mochten"
    },
    "p2": "gemocht",
    "k1": {
      "ich": "möge",
      "du": "mögest",
      "erSieEs": "möge",
      "wir": "mögen",
      "ihr": "möget",
      "sieSie": "mögen"
    },
    "k2": {
      "ich": "möchte",
      "du": "möchtest",
      "erSieEs": "möchte",
      "wir": "möchten",
      "ihr": "möchtet",
      "sieSie": "möchten"
    },
    "imp": {
      "du": "—",
      "wir": "—",
      "ihr": "—",
      "Sie": "—"
    }
  },
  "wissen": {
    "type": "mixed",
    "aux": "haben",
    "level": "A1",
    "bangla": "জানা / অবগত থাকা",
    "english": "to know (a fact)",
    "pres": {
      "ich": "weiß",
      "du": "weißt",
      "erSieEs": "weiß",
      "wir": "wissen",
      "ihr": "wisst",
      "sieSie": "wissen"
    },
    "past": {
      "ich": "wusste",
      "du": "wusstest",
      "erSieEs": "wusste",
      "wir": "wussten",
      "ihr": "wusstet",
      "sieSie": "wussten"
    },
    "p2": "gewusst",
    "k1": {
      "ich": "wisse",
      "du": "wissest",
      "erSieEs": "wisse",
      "wir": "wissen",
      "ihr": "wisset",
      "sieSie": "wissen"
    },
    "k2": {
      "ich": "wüsste",
      "du": "wüsstest",
      "erSieEs": "wüsste",
      "wir": "wüssten",
      "ihr": "wüsstet",
      "sieSie": "wüssten"
    },
    "imp": {
      "du": "wisse",
      "wir": "wissen wir",
      "ihr": "wisst",
      "Sie": "wissen Sie"
    }
  },
  "tun": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "করা",
    "english": "to do",
    "pres": {
      "ich": "tue",
      "du": "tust",
      "erSieEs": "tut",
      "wir": "tun",
      "ihr": "tut",
      "sieSie": "tun"
    },
    "past": {
      "ich": "tat",
      "du": "tatest",
      "erSieEs": "tat",
      "wir": "taten",
      "ihr": "tatet",
      "sieSie": "taten"
    },
    "p2": "getan",
    "k1": {
      "ich": "tue",
      "du": "tuest",
      "erSieEs": "tue",
      "wir": "tuen",
      "ihr": "tuet",
      "sieSie": "tuen"
    },
    "k2": {
      "ich": "täte",
      "du": "tätest",
      "erSieEs": "täte",
      "wir": "täten",
      "ihr": "tätet",
      "sieSie": "täten"
    },
    "imp": {
      "du": "tu / tue",
      "wir": "tun wir",
      "ihr": "tut",
      "Sie": "tun Sie"
    }
  },
  "backen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "বেক করা / সেঁকা",
    "english": "to bake",
    "pres": {
      "ich": "backe",
      "du": "bäckst",
      "erSieEs": "bäckt",
      "wir": "backen",
      "ihr": "backt",
      "sieSie": "backen"
    },
    "past": {
      "ich": "buk",
      "du": "bukst",
      "erSieEs": "buk",
      "wir": "buken",
      "ihr": "bukt",
      "sieSie": "buken"
    },
    "p2": "gebacken",
    "k1": {
      "ich": "backe",
      "du": "backest",
      "erSieEs": "backe",
      "wir": "backen",
      "ihr": "backet",
      "sieSie": "backen"
    },
    "k2": {
      "ich": "bükee",
      "du": "bükeest",
      "erSieEs": "bükee",
      "wir": "bükeen",
      "ihr": "bükeet",
      "sieSie": "bükeen"
    },
    "imp": {
      "du": "backe",
      "wir": "backen wir",
      "ihr": "backt",
      "Sie": "backen Sie"
    }
  },
  "befehlen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "আদেশ দেওয়া",
    "english": "to command",
    "pres": {
      "ich": "befehle",
      "du": "befiehlst",
      "erSieEs": "befiehlt",
      "wir": "befehlen",
      "ihr": "befehlt",
      "sieSie": "befehlen"
    },
    "past": {
      "ich": "befahl",
      "du": "befahlst",
      "erSieEs": "befahl",
      "wir": "befahlen",
      "ihr": "befahlt",
      "sieSie": "befahlen"
    },
    "p2": "gebefohlen",
    "k1": {
      "ich": "befehle",
      "du": "befehlest",
      "erSieEs": "befehle",
      "wir": "befehlen",
      "ihr": "befehlet",
      "sieSie": "befehlen"
    },
    "k2": {
      "ich": "beföhlee",
      "du": "beföhleest",
      "erSieEs": "beföhlee",
      "wir": "beföhleen",
      "ihr": "beföhleet",
      "sieSie": "beföhleen"
    },
    "imp": {
      "du": "befiehl",
      "wir": "befehlen wir",
      "ihr": "befehlt",
      "Sie": "befehlen Sie"
    }
  },
  "beginnen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "শুরু করা",
    "english": "to begin",
    "pres": {
      "ich": "beginne",
      "du": "beginnst",
      "erSieEs": "beginnt",
      "wir": "beginnen",
      "ihr": "beginnt",
      "sieSie": "beginnen"
    },
    "past": {
      "ich": "begann",
      "du": "begannst",
      "erSieEs": "begann",
      "wir": "begannen",
      "ihr": "begannt",
      "sieSie": "begannen"
    },
    "p2": "gebegonnen",
    "k1": {
      "ich": "beginne",
      "du": "beginnest",
      "erSieEs": "beginne",
      "wir": "beginnen",
      "ihr": "beginnet",
      "sieSie": "beginnen"
    },
    "k2": {
      "ich": "begännee",
      "du": "begänneest",
      "erSieEs": "begännee",
      "wir": "begänneen",
      "ihr": "begänneet",
      "sieSie": "begänneen"
    },
    "imp": {
      "du": "beginn",
      "wir": "beginnen wir",
      "ihr": "beginnt",
      "Sie": "beginnen Sie"
    }
  },
  "beißen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "কামড়ানো",
    "english": "to bite",
    "pres": {
      "ich": "beiße",
      "du": "beißt",
      "erSieEs": "beißt",
      "wir": "beißen",
      "ihr": "beißt",
      "sieSie": "beißen"
    },
    "past": {
      "ich": "biss",
      "du": "bissst",
      "erSieEs": "biss",
      "wir": "bissen",
      "ihr": "bisst",
      "sieSie": "bissen"
    },
    "p2": "gebissen",
    "k1": {
      "ich": "beiße",
      "du": "beißest",
      "erSieEs": "beiße",
      "wir": "beißen",
      "ihr": "beißet",
      "sieSie": "beißen"
    },
    "k2": {
      "ich": "bissee",
      "du": "bisseest",
      "erSieEs": "bissee",
      "wir": "bisseen",
      "ihr": "bisseet",
      "sieSie": "bisseen"
    },
    "imp": {
      "du": "beiß",
      "wir": "beißen wir",
      "ihr": "beißt",
      "Sie": "beißen Sie"
    }
  },
  "bergen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "উদ্ধার করা / গোপন রাখা",
    "english": "to salvage, recover",
    "pres": {
      "ich": "berge",
      "du": "birgst",
      "erSieEs": "birgt",
      "wir": "bergen",
      "ihr": "bergt",
      "sieSie": "bergen"
    },
    "past": {
      "ich": "barg",
      "du": "bargst",
      "erSieEs": "barg",
      "wir": "bargen",
      "ihr": "bargt",
      "sieSie": "bargen"
    },
    "p2": "geborgen",
    "k1": {
      "ich": "berge",
      "du": "bergest",
      "erSieEs": "berge",
      "wir": "bergen",
      "ihr": "berget",
      "sieSie": "bergen"
    },
    "k2": {
      "ich": "bärgee",
      "du": "bärgeest",
      "erSieEs": "bärgee",
      "wir": "bärgeen",
      "ihr": "bärgeet",
      "sieSie": "bärgeen"
    },
    "imp": {
      "du": "birg",
      "wir": "bergen wir",
      "ihr": "bergt",
      "Sie": "bergen Sie"
    }
  },
  "bersten": {
    "type": "irregular",
    "aux": "sein",
    "level": "B2",
    "bangla": "ফেটে যাওয়া",
    "english": "to burst",
    "pres": {
      "ich": "berste",
      "du": "birst",
      "erSieEs": "birst",
      "wir": "bersten",
      "ihr": "berstt",
      "sieSie": "bersten"
    },
    "past": {
      "ich": "barst",
      "du": "barstest",
      "erSieEs": "barst",
      "wir": "barsten",
      "ihr": "barstet",
      "sieSie": "barsten"
    },
    "p2": "geborsten",
    "k1": {
      "ich": "berste",
      "du": "berstest",
      "erSieEs": "berste",
      "wir": "bersten",
      "ihr": "berstet",
      "sieSie": "bersten"
    },
    "k2": {
      "ich": "bärstee",
      "du": "bärsteest",
      "erSieEs": "bärstee",
      "wir": "bärsteen",
      "ihr": "bärsteet",
      "sieSie": "bärsteen"
    },
    "imp": {
      "du": "birst",
      "wir": "bersten wir",
      "ihr": "berstt",
      "Sie": "bersten Sie"
    }
  },
  "betrügen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "প্রতারণা করা",
    "english": "to cheat, deceive",
    "pres": {
      "ich": "betrüge",
      "du": "betrügst",
      "erSieEs": "betrügt",
      "wir": "betrügen",
      "ihr": "betrügt",
      "sieSie": "betrügen"
    },
    "past": {
      "ich": "betrog",
      "du": "betrogst",
      "erSieEs": "betrog",
      "wir": "betrogen",
      "ihr": "betrogt",
      "sieSie": "betrogen"
    },
    "p2": "gebetrogen",
    "k1": {
      "ich": "betrüge",
      "du": "betrügest",
      "erSieEs": "betrüge",
      "wir": "betrügen",
      "ihr": "betrüget",
      "sieSie": "betrügen"
    },
    "k2": {
      "ich": "betrögee",
      "du": "betrögeest",
      "erSieEs": "betrögee",
      "wir": "betrögeen",
      "ihr": "betrögeet",
      "sieSie": "betrögeen"
    },
    "imp": {
      "du": "betrüg",
      "wir": "betrügen wir",
      "ihr": "betrügt",
      "Sie": "betrügen Sie"
    }
  },
  "bewegen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "অনুপ্রাণিত করা / সরানো",
    "english": "to induce, move",
    "pres": {
      "ich": "bewege",
      "du": "bewegst",
      "erSieEs": "bewegt",
      "wir": "bewegen",
      "ihr": "bewegt",
      "sieSie": "bewegen"
    },
    "past": {
      "ich": "bewog",
      "du": "bewogst",
      "erSieEs": "bewog",
      "wir": "bewogen",
      "ihr": "bewogt",
      "sieSie": "bewogen"
    },
    "p2": "gebewogen",
    "k1": {
      "ich": "bewege",
      "du": "bewegest",
      "erSieEs": "bewege",
      "wir": "bewegen",
      "ihr": "beweget",
      "sieSie": "bewegen"
    },
    "k2": {
      "ich": "bewögee",
      "du": "bewögeest",
      "erSieEs": "bewögee",
      "wir": "bewögeen",
      "ihr": "bewögeet",
      "sieSie": "bewögeen"
    },
    "imp": {
      "du": "bewege",
      "wir": "bewegen wir",
      "ihr": "bewegt",
      "Sie": "bewegen Sie"
    }
  },
  "biegen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "বাঁকানো",
    "english": "to bend",
    "pres": {
      "ich": "biege",
      "du": "biegst",
      "erSieEs": "biegt",
      "wir": "biegen",
      "ihr": "biegt",
      "sieSie": "biegen"
    },
    "past": {
      "ich": "bog",
      "du": "bogst",
      "erSieEs": "bog",
      "wir": "bogen",
      "ihr": "bogt",
      "sieSie": "bogen"
    },
    "p2": "gebogen",
    "k1": {
      "ich": "biege",
      "du": "biegest",
      "erSieEs": "biege",
      "wir": "biegen",
      "ihr": "bieget",
      "sieSie": "biegen"
    },
    "k2": {
      "ich": "bögee",
      "du": "bögeest",
      "erSieEs": "bögee",
      "wir": "bögeen",
      "ihr": "bögeet",
      "sieSie": "bögeen"
    },
    "imp": {
      "du": "bieg",
      "wir": "biegen wir",
      "ihr": "biegt",
      "Sie": "biegen Sie"
    }
  },
  "bieten": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "প্রস্তাব করা",
    "english": "to offer",
    "pres": {
      "ich": "biete",
      "du": "bietest",
      "erSieEs": "bietet",
      "wir": "bieten",
      "ihr": "biett",
      "sieSie": "bieten"
    },
    "past": {
      "ich": "bot",
      "du": "botest",
      "erSieEs": "bot",
      "wir": "boten",
      "ihr": "botet",
      "sieSie": "boten"
    },
    "p2": "geboten",
    "k1": {
      "ich": "biete",
      "du": "bietest",
      "erSieEs": "biete",
      "wir": "bieten",
      "ihr": "bietet",
      "sieSie": "bieten"
    },
    "k2": {
      "ich": "bötee",
      "du": "böteest",
      "erSieEs": "bötee",
      "wir": "böteen",
      "ihr": "böteet",
      "sieSie": "böteen"
    },
    "imp": {
      "du": "biete",
      "wir": "bieten wir",
      "ihr": "biett",
      "Sie": "bieten Sie"
    }
  },
  "binden": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "বাঁধা",
    "english": "to bind, tie",
    "pres": {
      "ich": "binde",
      "du": "bindest",
      "erSieEs": "bindet",
      "wir": "binden",
      "ihr": "bindt",
      "sieSie": "binden"
    },
    "past": {
      "ich": "band",
      "du": "bandest",
      "erSieEs": "band",
      "wir": "banden",
      "ihr": "bandet",
      "sieSie": "banden"
    },
    "p2": "gebunden",
    "k1": {
      "ich": "binde",
      "du": "bindest",
      "erSieEs": "binde",
      "wir": "binden",
      "ihr": "bindet",
      "sieSie": "binden"
    },
    "k2": {
      "ich": "bändee",
      "du": "bändeest",
      "erSieEs": "bändee",
      "wir": "bändeen",
      "ihr": "bändeet",
      "sieSie": "bändeen"
    },
    "imp": {
      "du": "binde",
      "wir": "binden wir",
      "ihr": "bindt",
      "Sie": "binden Sie"
    }
  },
  "bitten": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "অনুরোধ করা",
    "english": "to ask, request",
    "pres": {
      "ich": "bitte",
      "du": "bittest",
      "erSieEs": "bittet",
      "wir": "bitten",
      "ihr": "bittt",
      "sieSie": "bitten"
    },
    "past": {
      "ich": "bat",
      "du": "batest",
      "erSieEs": "bat",
      "wir": "baten",
      "ihr": "batet",
      "sieSie": "baten"
    },
    "p2": "gebeten",
    "k1": {
      "ich": "bitte",
      "du": "bittest",
      "erSieEs": "bitte",
      "wir": "bitten",
      "ihr": "bittet",
      "sieSie": "bitten"
    },
    "k2": {
      "ich": "bätee",
      "du": "bäteest",
      "erSieEs": "bätee",
      "wir": "bäteen",
      "ihr": "bäteet",
      "sieSie": "bäteen"
    },
    "imp": {
      "du": "bitte",
      "wir": "bitten wir",
      "ihr": "bittt",
      "Sie": "bitten Sie"
    }
  },
  "blasen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ফুঁ দেওয়া",
    "english": "to blow",
    "pres": {
      "ich": "blase",
      "du": "bläst",
      "erSieEs": "bläst",
      "wir": "blasen",
      "ihr": "blast",
      "sieSie": "blasen"
    },
    "past": {
      "ich": "blies",
      "du": "bliesst",
      "erSieEs": "blies",
      "wir": "bliesen",
      "ihr": "bliest",
      "sieSie": "bliesen"
    },
    "p2": "geblasen",
    "k1": {
      "ich": "blase",
      "du": "blasest",
      "erSieEs": "blase",
      "wir": "blasen",
      "ihr": "blaset",
      "sieSie": "blasen"
    },
    "k2": {
      "ich": "bliesee",
      "du": "blieseest",
      "erSieEs": "bliesee",
      "wir": "blieseen",
      "ihr": "blieseet",
      "sieSie": "blieseen"
    },
    "imp": {
      "du": "blase",
      "wir": "blasen wir",
      "ihr": "blast",
      "Sie": "blasen Sie"
    }
  },
  "bleiben": {
    "type": "irregular",
    "aux": "sein",
    "level": "A1",
    "bangla": "থাকা",
    "english": "to stay, remain",
    "pres": {
      "ich": "bleibe",
      "du": "bleibst",
      "erSieEs": "bleibt",
      "wir": "bleiben",
      "ihr": "bleibt",
      "sieSie": "bleiben"
    },
    "past": {
      "ich": "blieb",
      "du": "bliebst",
      "erSieEs": "blieb",
      "wir": "blieben",
      "ihr": "bliebt",
      "sieSie": "blieben"
    },
    "p2": "geblieben",
    "k1": {
      "ich": "bleibe",
      "du": "bleibest",
      "erSieEs": "bleibe",
      "wir": "bleiben",
      "ihr": "bleibet",
      "sieSie": "bleiben"
    },
    "k2": {
      "ich": "bliebee",
      "du": "bliebeest",
      "erSieEs": "bliebee",
      "wir": "bliebeen",
      "ihr": "bliebeet",
      "sieSie": "bliebeen"
    },
    "imp": {
      "du": "bleib",
      "wir": "bleiben wir",
      "ihr": "bleibt",
      "Sie": "bleiben Sie"
    }
  },
  "braten": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ভাজা",
    "english": "to roast, fry",
    "pres": {
      "ich": "brate",
      "du": "brätst",
      "erSieEs": "brät",
      "wir": "braten",
      "ihr": "bratt",
      "sieSie": "braten"
    },
    "past": {
      "ich": "briet",
      "du": "brietest",
      "erSieEs": "briet",
      "wir": "brieten",
      "ihr": "brietet",
      "sieSie": "brieten"
    },
    "p2": "gebraten",
    "k1": {
      "ich": "brate",
      "du": "bratest",
      "erSieEs": "brate",
      "wir": "braten",
      "ihr": "bratet",
      "sieSie": "braten"
    },
    "k2": {
      "ich": "brietee",
      "du": "brieteest",
      "erSieEs": "brietee",
      "wir": "brieteen",
      "ihr": "brieteet",
      "sieSie": "brieteen"
    },
    "imp": {
      "du": "brate",
      "wir": "braten wir",
      "ihr": "bratt",
      "Sie": "braten Sie"
    }
  },
  "brechen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ভাঙা",
    "english": "to break",
    "pres": {
      "ich": "breche",
      "du": "brichst",
      "erSieEs": "bricht",
      "wir": "brechen",
      "ihr": "brecht",
      "sieSie": "brechen"
    },
    "past": {
      "ich": "brach",
      "du": "brachst",
      "erSieEs": "brach",
      "wir": "brachen",
      "ihr": "bracht",
      "sieSie": "brachen"
    },
    "p2": "gebrochen",
    "k1": {
      "ich": "breche",
      "du": "brechest",
      "erSieEs": "breche",
      "wir": "brechen",
      "ihr": "brechet",
      "sieSie": "brechen"
    },
    "k2": {
      "ich": "brächee",
      "du": "brächeest",
      "erSieEs": "brächee",
      "wir": "brächeen",
      "ihr": "brächeet",
      "sieSie": "brächeen"
    },
    "imp": {
      "du": "brich",
      "wir": "brechen wir",
      "ihr": "brecht",
      "Sie": "brechen Sie"
    }
  },
  "brennen": {
    "type": "mixed",
    "aux": "haben",
    "level": "A2",
    "bangla": "জ্বলা / পোড়া",
    "english": "to burn",
    "pres": {
      "ich": "brenne",
      "du": "brennst",
      "erSieEs": "brennt",
      "wir": "brennen",
      "ihr": "brennt",
      "sieSie": "brennen"
    },
    "past": {
      "ich": "brannte",
      "du": "branntest",
      "erSieEs": "brannte",
      "wir": "brannteen",
      "ihr": "branntet",
      "sieSie": "brannteen"
    },
    "p2": "gebrannt",
    "k1": {
      "ich": "brenne",
      "du": "brennest",
      "erSieEs": "brenne",
      "wir": "brennen",
      "ihr": "brennet",
      "sieSie": "brennen"
    },
    "k2": {
      "ich": "brenntee",
      "du": "brennteest",
      "erSieEs": "brenntee",
      "wir": "brennteen",
      "ihr": "brennteet",
      "sieSie": "brennteen"
    },
    "imp": {
      "du": "brenne",
      "wir": "brennen wir",
      "ihr": "brennt",
      "Sie": "brennen Sie"
    }
  },
  "bringen": {
    "type": "mixed",
    "aux": "haben",
    "level": "A1",
    "bangla": "আনা",
    "english": "to bring",
    "pres": {
      "ich": "bringe",
      "du": "bringst",
      "erSieEs": "bringt",
      "wir": "bringen",
      "ihr": "bringt",
      "sieSie": "bringen"
    },
    "past": {
      "ich": "brachte",
      "du": "brachtest",
      "erSieEs": "brachte",
      "wir": "brachteen",
      "ihr": "brachtet",
      "sieSie": "brachteen"
    },
    "p2": "gebracht",
    "k1": {
      "ich": "bringe",
      "du": "bringest",
      "erSieEs": "bringe",
      "wir": "bringen",
      "ihr": "bringet",
      "sieSie": "bringen"
    },
    "k2": {
      "ich": "brächtee",
      "du": "brächteest",
      "erSieEs": "brächtee",
      "wir": "brächteen",
      "ihr": "brächteet",
      "sieSie": "brächteen"
    },
    "imp": {
      "du": "bring",
      "wir": "bringen wir",
      "ihr": "bringt",
      "Sie": "bringen Sie"
    }
  },
  "denken": {
    "type": "mixed",
    "aux": "haben",
    "level": "A1",
    "bangla": "চিন্তা করা",
    "english": "to think",
    "pres": {
      "ich": "denke",
      "du": "denkst",
      "erSieEs": "denkt",
      "wir": "denken",
      "ihr": "denkt",
      "sieSie": "denken"
    },
    "past": {
      "ich": "dachte",
      "du": "dachtest",
      "erSieEs": "dachte",
      "wir": "dachteen",
      "ihr": "dachtet",
      "sieSie": "dachteen"
    },
    "p2": "gedacht",
    "k1": {
      "ich": "denke",
      "du": "denkest",
      "erSieEs": "denke",
      "wir": "denken",
      "ihr": "denket",
      "sieSie": "denken"
    },
    "k2": {
      "ich": "dächtee",
      "du": "dächteest",
      "erSieEs": "dächtee",
      "wir": "dächteen",
      "ihr": "dächteet",
      "sieSie": "dächteen"
    },
    "imp": {
      "du": "denk",
      "wir": "denken wir",
      "ihr": "denkt",
      "Sie": "denken Sie"
    }
  },
  "dringen": {
    "type": "irregular",
    "aux": "sein",
    "level": "B1",
    "bangla": "প্রবেশ করা",
    "english": "to pierce, penetrate",
    "pres": {
      "ich": "dringe",
      "du": "dringst",
      "erSieEs": "dringt",
      "wir": "dringen",
      "ihr": "dringt",
      "sieSie": "dringen"
    },
    "past": {
      "ich": "drang",
      "du": "drangst",
      "erSieEs": "drang",
      "wir": "drangen",
      "ihr": "drangt",
      "sieSie": "drangen"
    },
    "p2": "gedrungen",
    "k1": {
      "ich": "dringe",
      "du": "dringest",
      "erSieEs": "dringe",
      "wir": "dringen",
      "ihr": "dringet",
      "sieSie": "dringen"
    },
    "k2": {
      "ich": "drängee",
      "du": "drängeest",
      "erSieEs": "drängee",
      "wir": "drängeen",
      "ihr": "drängeet",
      "sieSie": "drängeen"
    },
    "imp": {
      "du": "dringe",
      "wir": "dringen wir",
      "ihr": "dringt",
      "Sie": "dringen Sie"
    }
  },
  "empfehlen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "সুপারিশ করা",
    "english": "to recommend",
    "pres": {
      "ich": "empfehle",
      "du": "empfiehlst",
      "erSieEs": "empfiehlt",
      "wir": "empfehlen",
      "ihr": "empfehlt",
      "sieSie": "empfehlen"
    },
    "past": {
      "ich": "empfahl",
      "du": "empfahlst",
      "erSieEs": "empfahl",
      "wir": "empfahlen",
      "ihr": "empfahlt",
      "sieSie": "empfahlen"
    },
    "p2": "geempfohlen",
    "k1": {
      "ich": "empfehle",
      "du": "empfehlest",
      "erSieEs": "empfehle",
      "wir": "empfehlen",
      "ihr": "empfehlet",
      "sieSie": "empfehlen"
    },
    "k2": {
      "ich": "empföhlee",
      "du": "empföhleest",
      "erSieEs": "empföhlee",
      "wir": "empföhleen",
      "ihr": "empföhleet",
      "sieSie": "empföhleen"
    },
    "imp": {
      "du": "empfiehl",
      "wir": "empfehlen wir",
      "ihr": "empfehlt",
      "Sie": "empfehlen Sie"
    }
  },
  "erschrecken": {
    "type": "irregular",
    "aux": "sein",
    "level": "B1",
    "bangla": "ভয় পাওয়া",
    "english": "to be startled",
    "pres": {
      "ich": "erschrecke",
      "du": "erschrickst",
      "erSieEs": "erschrickt",
      "wir": "erschrecken",
      "ihr": "erschreckt",
      "sieSie": "erschrecken"
    },
    "past": {
      "ich": "erschrak",
      "du": "erschrakst",
      "erSieEs": "erschrak",
      "wir": "erschraken",
      "ihr": "erschrakt",
      "sieSie": "erschraken"
    },
    "p2": "geerschrocken",
    "k1": {
      "ich": "erschrecke",
      "du": "erschreckest",
      "erSieEs": "erschrecke",
      "wir": "erschrecken",
      "ihr": "erschrecket",
      "sieSie": "erschrecken"
    },
    "k2": {
      "ich": "erschräkee",
      "du": "erschräkeest",
      "erSieEs": "erschräkee",
      "wir": "erschräkeen",
      "ihr": "erschräkeet",
      "sieSie": "erschräkeen"
    },
    "imp": {
      "du": "erschrick",
      "wir": "erschrecken wir",
      "ihr": "erschreckt",
      "Sie": "erschrecken Sie"
    }
  },
  "erwägen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "বিবেচনা করা",
    "english": "to consider",
    "pres": {
      "ich": "erwäge",
      "du": "erwägst",
      "erSieEs": "erwägt",
      "wir": "erwägen",
      "ihr": "erwägt",
      "sieSie": "erwägen"
    },
    "past": {
      "ich": "erwog",
      "du": "erwogst",
      "erSieEs": "erwog",
      "wir": "erwogen",
      "ihr": "erwogt",
      "sieSie": "erwogen"
    },
    "p2": "geerwogen",
    "k1": {
      "ich": "erwäge",
      "du": "erwägest",
      "erSieEs": "erwäge",
      "wir": "erwägen",
      "ihr": "erwäget",
      "sieSie": "erwägen"
    },
    "k2": {
      "ich": "erwögee",
      "du": "erwögeest",
      "erSieEs": "erwögee",
      "wir": "erwögeen",
      "ihr": "erwögeet",
      "sieSie": "erwögeen"
    },
    "imp": {
      "du": "erwäge",
      "wir": "erwägen wir",
      "ihr": "erwägt",
      "Sie": "erwägen Sie"
    }
  },
  "essen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "খাওয়া",
    "english": "to eat",
    "pres": {
      "ich": "esse",
      "du": "isst",
      "erSieEs": "isst",
      "wir": "essen",
      "ihr": "esst",
      "sieSie": "essen"
    },
    "past": {
      "ich": "aß",
      "du": "aßst",
      "erSieEs": "aß",
      "wir": "aßen",
      "ihr": "aßt",
      "sieSie": "aßen"
    },
    "p2": "gegessen",
    "k1": {
      "ich": "esse",
      "du": "essest",
      "erSieEs": "esse",
      "wir": "essen",
      "ihr": "esset",
      "sieSie": "essen"
    },
    "k2": {
      "ich": "äßee",
      "du": "äßeest",
      "erSieEs": "äßee",
      "wir": "äßeen",
      "ihr": "äßeet",
      "sieSie": "äßeen"
    },
    "imp": {
      "du": "iss",
      "wir": "essen wir",
      "ihr": "esst",
      "Sie": "essen Sie"
    }
  },
  "fahren": {
    "type": "irregular",
    "aux": "sein",
    "level": "A1",
    "bangla": "যানবাহনে যাওয়া",
    "english": "to drive, ride",
    "pres": {
      "ich": "fahre",
      "du": "fährst",
      "erSieEs": "fährt",
      "wir": "fahren",
      "ihr": "fahrt",
      "sieSie": "fahren"
    },
    "past": {
      "ich": "fuhr",
      "du": "fuhrst",
      "erSieEs": "fuhr",
      "wir": "fuhren",
      "ihr": "fuhrt",
      "sieSie": "fuhren"
    },
    "p2": "gefahren",
    "k1": {
      "ich": "fahre",
      "du": "fahrest",
      "erSieEs": "fahre",
      "wir": "fahren",
      "ihr": "fahret",
      "sieSie": "fahren"
    },
    "k2": {
      "ich": "führee",
      "du": "führeest",
      "erSieEs": "führee",
      "wir": "führeen",
      "ihr": "führeet",
      "sieSie": "führeen"
    },
    "imp": {
      "du": "fahr",
      "wir": "fahren wir",
      "ihr": "fahrt",
      "Sie": "fahren Sie"
    }
  },
  "fallen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "পড়া",
    "english": "to fall",
    "pres": {
      "ich": "falle",
      "du": "fällst",
      "erSieEs": "fällt",
      "wir": "fallen",
      "ihr": "fallt",
      "sieSie": "fallen"
    },
    "past": {
      "ich": "fiel",
      "du": "fielst",
      "erSieEs": "fiel",
      "wir": "fielen",
      "ihr": "fielt",
      "sieSie": "fielen"
    },
    "p2": "gefallen",
    "k1": {
      "ich": "falle",
      "du": "fallest",
      "erSieEs": "falle",
      "wir": "fallen",
      "ihr": "fallet",
      "sieSie": "fallen"
    },
    "k2": {
      "ich": "fielee",
      "du": "fieleest",
      "erSieEs": "fielee",
      "wir": "fieleen",
      "ihr": "fieleet",
      "sieSie": "fieleen"
    },
    "imp": {
      "du": "fall",
      "wir": "fallen wir",
      "ihr": "fallt",
      "Sie": "fallen Sie"
    }
  },
  "fangen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ধরা",
    "english": "to catch",
    "pres": {
      "ich": "fange",
      "du": "fängst",
      "erSieEs": "fängt",
      "wir": "fangen",
      "ihr": "fangt",
      "sieSie": "fangen"
    },
    "past": {
      "ich": "fing",
      "du": "fingst",
      "erSieEs": "fing",
      "wir": "fingen",
      "ihr": "fingt",
      "sieSie": "fingen"
    },
    "p2": "gefangen",
    "k1": {
      "ich": "fange",
      "du": "fangest",
      "erSieEs": "fange",
      "wir": "fangen",
      "ihr": "fanget",
      "sieSie": "fangen"
    },
    "k2": {
      "ich": "fingee",
      "du": "fingeest",
      "erSieEs": "fingee",
      "wir": "fingeen",
      "ihr": "fingeet",
      "sieSie": "fingeen"
    },
    "imp": {
      "du": "fang",
      "wir": "fangen wir",
      "ihr": "fangt",
      "Sie": "fangen Sie"
    }
  },
  "fechten": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "তলোয়ার যুদ্ধ করা",
    "english": "to fence",
    "pres": {
      "ich": "fechte",
      "du": "fichtst",
      "erSieEs": "ficht",
      "wir": "fechten",
      "ihr": "fechtt",
      "sieSie": "fechten"
    },
    "past": {
      "ich": "focht",
      "du": "fochtest",
      "erSieEs": "focht",
      "wir": "fochten",
      "ihr": "fochtet",
      "sieSie": "fochten"
    },
    "p2": "gefochten",
    "k1": {
      "ich": "fechte",
      "du": "fechtest",
      "erSieEs": "fechte",
      "wir": "fechten",
      "ihr": "fechtet",
      "sieSie": "fechten"
    },
    "k2": {
      "ich": "föchtee",
      "du": "föchteest",
      "erSieEs": "föchtee",
      "wir": "föchteen",
      "ihr": "föchteet",
      "sieSie": "föchteen"
    },
    "imp": {
      "du": "ficht",
      "wir": "fechten wir",
      "ihr": "fechtt",
      "Sie": "fechten Sie"
    }
  },
  "finden": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "খুঁজে পাওয়া",
    "english": "to find",
    "pres": {
      "ich": "finde",
      "du": "findest",
      "erSieEs": "findet",
      "wir": "finden",
      "ihr": "findt",
      "sieSie": "finden"
    },
    "past": {
      "ich": "fand",
      "du": "fandest",
      "erSieEs": "fand",
      "wir": "fanden",
      "ihr": "fandet",
      "sieSie": "fanden"
    },
    "p2": "gefunden",
    "k1": {
      "ich": "finde",
      "du": "findest",
      "erSieEs": "finde",
      "wir": "finden",
      "ihr": "findet",
      "sieSie": "finden"
    },
    "k2": {
      "ich": "fändee",
      "du": "fändeest",
      "erSieEs": "fändee",
      "wir": "fändeen",
      "ihr": "fändeet",
      "sieSie": "fändeen"
    },
    "imp": {
      "du": "finde",
      "wir": "finden wir",
      "ihr": "findt",
      "Sie": "finden Sie"
    }
  },
  "flechten": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "বিনুনি করা / বোনা",
    "english": "to braid, plait",
    "pres": {
      "ich": "flechte",
      "du": "flichtst",
      "erSieEs": "flicht",
      "wir": "flechten",
      "ihr": "flechtt",
      "sieSie": "flechten"
    },
    "past": {
      "ich": "flocht",
      "du": "flochtest",
      "erSieEs": "flocht",
      "wir": "flochten",
      "ihr": "flochtet",
      "sieSie": "flochten"
    },
    "p2": "geflochten",
    "k1": {
      "ich": "flechte",
      "du": "flechtest",
      "erSieEs": "flechte",
      "wir": "flechten",
      "ihr": "flechtet",
      "sieSie": "flechten"
    },
    "k2": {
      "ich": "flöchtee",
      "du": "flöchteest",
      "erSieEs": "flöchtee",
      "wir": "flöchteen",
      "ihr": "flöchteet",
      "sieSie": "flöchteen"
    },
    "imp": {
      "du": "flicht",
      "wir": "flechten wir",
      "ihr": "flechtt",
      "Sie": "flechten Sie"
    }
  },
  "fliegen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A1",
    "bangla": "উড়া",
    "english": "to fly",
    "pres": {
      "ich": "fliege",
      "du": "fliegst",
      "erSieEs": "fliegt",
      "wir": "fliegen",
      "ihr": "fliegt",
      "sieSie": "fliegen"
    },
    "past": {
      "ich": "flog",
      "du": "flogst",
      "erSieEs": "flog",
      "wir": "flogen",
      "ihr": "flogt",
      "sieSie": "flogen"
    },
    "p2": "geflogen",
    "k1": {
      "ich": "fliege",
      "du": "fliegest",
      "erSieEs": "fliege",
      "wir": "fliegen",
      "ihr": "flieget",
      "sieSie": "fliegen"
    },
    "k2": {
      "ich": "flögee",
      "du": "flögeest",
      "erSieEs": "flögee",
      "wir": "flögeen",
      "ihr": "flögeet",
      "sieSie": "flögeen"
    },
    "imp": {
      "du": "flieg",
      "wir": "fliegen wir",
      "ihr": "fliegt",
      "Sie": "fliegen Sie"
    }
  },
  "fliehen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "পালানো",
    "english": "to flee",
    "pres": {
      "ich": "fliehe",
      "du": "fliehst",
      "erSieEs": "flieht",
      "wir": "fliehen",
      "ihr": "flieht",
      "sieSie": "fliehen"
    },
    "past": {
      "ich": "floh",
      "du": "flohst",
      "erSieEs": "floh",
      "wir": "flohen",
      "ihr": "floht",
      "sieSie": "flohen"
    },
    "p2": "geflohen",
    "k1": {
      "ich": "fliehe",
      "du": "fliehest",
      "erSieEs": "fliehe",
      "wir": "fliehen",
      "ihr": "fliehet",
      "sieSie": "fliehen"
    },
    "k2": {
      "ich": "flöhee",
      "du": "flöheest",
      "erSieEs": "flöhee",
      "wir": "flöheen",
      "ihr": "flöheet",
      "sieSie": "flöheen"
    },
    "imp": {
      "du": "flieh",
      "wir": "fliehen wir",
      "ihr": "flieht",
      "Sie": "fliehen Sie"
    }
  },
  "fließen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "প্রবাহিত হওয়া",
    "english": "to flow",
    "pres": {
      "ich": "fließe",
      "du": "fließt",
      "erSieEs": "fließt",
      "wir": "fließen",
      "ihr": "fließt",
      "sieSie": "fließen"
    },
    "past": {
      "ich": "floss",
      "du": "flossst",
      "erSieEs": "floss",
      "wir": "flossen",
      "ihr": "flosst",
      "sieSie": "flossen"
    },
    "p2": "geflossen",
    "k1": {
      "ich": "fließe",
      "du": "fließest",
      "erSieEs": "fließe",
      "wir": "fließen",
      "ihr": "fließet",
      "sieSie": "fließen"
    },
    "k2": {
      "ich": "flössee",
      "du": "flösseest",
      "erSieEs": "flössee",
      "wir": "flösseen",
      "ihr": "flösseet",
      "sieSie": "flösseen"
    },
    "imp": {
      "du": "fließe",
      "wir": "fließen wir",
      "ihr": "fließt",
      "Sie": "fließen Sie"
    }
  },
  "fressen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "পশুর খাওয়া",
    "english": "to devour, eat (animals)",
    "pres": {
      "ich": "fresse",
      "du": "frisst",
      "erSieEs": "frisst",
      "wir": "fressen",
      "ihr": "fresst",
      "sieSie": "fressen"
    },
    "past": {
      "ich": "fraß",
      "du": "fraßst",
      "erSieEs": "fraß",
      "wir": "fraßen",
      "ihr": "fraßt",
      "sieSie": "fraßen"
    },
    "p2": "gefressen",
    "k1": {
      "ich": "fresse",
      "du": "fressest",
      "erSieEs": "fresse",
      "wir": "fressen",
      "ihr": "fresset",
      "sieSie": "fressen"
    },
    "k2": {
      "ich": "fräßee",
      "du": "fräßeest",
      "erSieEs": "fräßee",
      "wir": "fräßeen",
      "ihr": "fräßeet",
      "sieSie": "fräßeen"
    },
    "imp": {
      "du": "friss",
      "wir": "fressen wir",
      "ihr": "fresst",
      "Sie": "fressen Sie"
    }
  },
  "frieren": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ঠান্ডা লাগা / জমাট বাঁধা",
    "english": "to freeze",
    "pres": {
      "ich": "friere",
      "du": "frierst",
      "erSieEs": "friert",
      "wir": "frieren",
      "ihr": "friert",
      "sieSie": "frieren"
    },
    "past": {
      "ich": "fror",
      "du": "frorst",
      "erSieEs": "fror",
      "wir": "froren",
      "ihr": "frort",
      "sieSie": "froren"
    },
    "p2": "gefroren",
    "k1": {
      "ich": "friere",
      "du": "frierest",
      "erSieEs": "friere",
      "wir": "frieren",
      "ihr": "frieret",
      "sieSie": "frieren"
    },
    "k2": {
      "ich": "fröree",
      "du": "fröreest",
      "erSieEs": "fröree",
      "wir": "fröreen",
      "ihr": "fröreet",
      "sieSie": "fröreen"
    },
    "imp": {
      "du": "frier",
      "wir": "frieren wir",
      "ihr": "friert",
      "Sie": "frieren Sie"
    }
  },
  "gebären": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "জন্ম দেওয়া",
    "english": "to give birth",
    "pres": {
      "ich": "gebäre",
      "du": "gebierst",
      "erSieEs": "gebiert",
      "wir": "gebären",
      "ihr": "gebärt",
      "sieSie": "gebären"
    },
    "past": {
      "ich": "gebar",
      "du": "gebarst",
      "erSieEs": "gebar",
      "wir": "gebaren",
      "ihr": "gebart",
      "sieSie": "gebaren"
    },
    "p2": "geboren",
    "k1": {
      "ich": "gebäre",
      "du": "gebärest",
      "erSieEs": "gebäre",
      "wir": "gebären",
      "ihr": "gebäret",
      "sieSie": "gebären"
    },
    "k2": {
      "ich": "gebäree",
      "du": "gebäreest",
      "erSieEs": "gebäree",
      "wir": "gebäreen",
      "ihr": "gebäreet",
      "sieSie": "gebäreen"
    },
    "imp": {
      "du": "gebäre",
      "wir": "gebären wir",
      "ihr": "gebärt",
      "Sie": "gebären Sie"
    }
  },
  "geben": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "দেওয়া",
    "english": "to give",
    "pres": {
      "ich": "gebe",
      "du": "gibst",
      "erSieEs": "gibt",
      "wir": "geben",
      "ihr": "gebt",
      "sieSie": "geben"
    },
    "past": {
      "ich": "gab",
      "du": "gabst",
      "erSieEs": "gab",
      "wir": "gaben",
      "ihr": "gabt",
      "sieSie": "gaben"
    },
    "p2": "gegeben",
    "k1": {
      "ich": "gebe",
      "du": "gebest",
      "erSieEs": "gebe",
      "wir": "geben",
      "ihr": "gebet",
      "sieSie": "geben"
    },
    "k2": {
      "ich": "gäbee",
      "du": "gäbeest",
      "erSieEs": "gäbee",
      "wir": "gäbeen",
      "ihr": "gäbeet",
      "sieSie": "gäbeen"
    },
    "imp": {
      "du": "gib",
      "wir": "geben wir",
      "ihr": "gebt",
      "Sie": "geben Sie"
    }
  },
  "gedeihen": {
    "type": "irregular",
    "aux": "sein",
    "level": "B2",
    "bangla": "উন্নতি করা / বেড়ে ওঠা",
    "english": "to flourish, thrive",
    "pres": {
      "ich": "gedeihe",
      "du": "gedeihst",
      "erSieEs": "gedeiht",
      "wir": "gedeihen",
      "ihr": "gedeiht",
      "sieSie": "gedeihen"
    },
    "past": {
      "ich": "gedieh",
      "du": "gediehst",
      "erSieEs": "gedieh",
      "wir": "gediehen",
      "ihr": "gedieht",
      "sieSie": "gediehen"
    },
    "p2": "gediehen",
    "k1": {
      "ich": "gedeihe",
      "du": "gedeihest",
      "erSieEs": "gedeihe",
      "wir": "gedeihen",
      "ihr": "gedeihet",
      "sieSie": "gedeihen"
    },
    "k2": {
      "ich": "gediehee",
      "du": "gedieheest",
      "erSieEs": "gediehee",
      "wir": "gedieheen",
      "ihr": "gedieheet",
      "sieSie": "gedieheen"
    },
    "imp": {
      "du": "gedeih",
      "wir": "gedeihen wir",
      "ihr": "gedeiht",
      "Sie": "gedeihen Sie"
    }
  },
  "gehen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A1",
    "bangla": "যাওয়া",
    "english": "to go",
    "pres": {
      "ich": "gehe",
      "du": "gehst",
      "erSieEs": "geht",
      "wir": "gehen",
      "ihr": "geht",
      "sieSie": "gehen"
    },
    "past": {
      "ich": "ging",
      "du": "gingst",
      "erSieEs": "ging",
      "wir": "gingen",
      "ihr": "gingt",
      "sieSie": "gingen"
    },
    "p2": "gegangen",
    "k1": {
      "ich": "gehe",
      "du": "gehest",
      "erSieEs": "gehe",
      "wir": "gehen",
      "ihr": "gehet",
      "sieSie": "gehen"
    },
    "k2": {
      "ich": "gingee",
      "du": "gingeest",
      "erSieEs": "gingee",
      "wir": "gingeen",
      "ihr": "gingeet",
      "sieSie": "gingeen"
    },
    "imp": {
      "du": "geh",
      "wir": "gehen wir",
      "ihr": "geht",
      "Sie": "gehen Sie"
    }
  },
  "gelingen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "সফল হওয়া",
    "english": "to succeed",
    "pres": {
      "ich": "gelinge",
      "du": "gelingt",
      "erSieEs": "gelingt",
      "wir": "gelingen",
      "ihr": "gelingt",
      "sieSie": "gelingen"
    },
    "past": {
      "ich": "gelang",
      "du": "gelangst",
      "erSieEs": "gelang",
      "wir": "gelangen",
      "ihr": "gelangt",
      "sieSie": "gelangen"
    },
    "p2": "gelungen",
    "k1": {
      "ich": "gelinge",
      "du": "gelingest",
      "erSieEs": "gelinge",
      "wir": "gelingen",
      "ihr": "gelinget",
      "sieSie": "gelingen"
    },
    "k2": {
      "ich": "gelängee",
      "du": "gelängeest",
      "erSieEs": "gelängee",
      "wir": "gelängeen",
      "ihr": "gelängeet",
      "sieSie": "gelängeen"
    },
    "imp": {
      "du": "gelinge",
      "wir": "gelingen wir",
      "ihr": "gelingt",
      "Sie": "gelingen Sie"
    }
  },
  "gelten": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "প্রযোজ্য হওয়া / মূল্য থাকা",
    "english": "to be valid",
    "pres": {
      "ich": "gelte",
      "du": "giltst",
      "erSieEs": "gilt",
      "wir": "gelten",
      "ihr": "geltt",
      "sieSie": "gelten"
    },
    "past": {
      "ich": "galt",
      "du": "galtest",
      "erSieEs": "galt",
      "wir": "galten",
      "ihr": "galtet",
      "sieSie": "galten"
    },
    "p2": "gegolten",
    "k1": {
      "ich": "gelte",
      "du": "geltest",
      "erSieEs": "gelte",
      "wir": "gelten",
      "ihr": "geltet",
      "sieSie": "gelten"
    },
    "k2": {
      "ich": "göltee",
      "du": "gölteest",
      "erSieEs": "göltee",
      "wir": "gölteen",
      "ihr": "gölteet",
      "sieSie": "gölteen"
    },
    "imp": {
      "du": "gilt",
      "wir": "gelten wir",
      "ihr": "geltt",
      "Sie": "gelten Sie"
    }
  },
  "genesen": {
    "type": "irregular",
    "aux": "sein",
    "level": "B2",
    "bangla": "সুস্থ হওয়া",
    "english": "to recover, convalesce",
    "pres": {
      "ich": "genese",
      "du": "genesest",
      "erSieEs": "genest",
      "wir": "genesen",
      "ihr": "genest",
      "sieSie": "genesen"
    },
    "past": {
      "ich": "genas",
      "du": "genasst",
      "erSieEs": "genas",
      "wir": "genasen",
      "ihr": "genast",
      "sieSie": "genasen"
    },
    "p2": "genesen",
    "k1": {
      "ich": "genese",
      "du": "genesest",
      "erSieEs": "genese",
      "wir": "genesen",
      "ihr": "geneset",
      "sieSie": "genesen"
    },
    "k2": {
      "ich": "genäsee",
      "du": "genäseest",
      "erSieEs": "genäsee",
      "wir": "genäseen",
      "ihr": "genäseet",
      "sieSie": "genäseen"
    },
    "imp": {
      "du": "genese",
      "wir": "genesen wir",
      "ihr": "genest",
      "Sie": "genesen Sie"
    }
  },
  "genießen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "উপভোগ করা",
    "english": "to enjoy",
    "pres": {
      "ich": "genieße",
      "du": "genießt",
      "erSieEs": "genießt",
      "wir": "genießen",
      "ihr": "genießt",
      "sieSie": "genießen"
    },
    "past": {
      "ich": "genoss",
      "du": "genossst",
      "erSieEs": "genoss",
      "wir": "genossen",
      "ihr": "genosst",
      "sieSie": "genossen"
    },
    "p2": "genossen",
    "k1": {
      "ich": "genieße",
      "du": "genießest",
      "erSieEs": "genieße",
      "wir": "genießen",
      "ihr": "genießet",
      "sieSie": "genießen"
    },
    "k2": {
      "ich": "genössee",
      "du": "genösseest",
      "erSieEs": "genössee",
      "wir": "genösseen",
      "ihr": "genösseet",
      "sieSie": "genösseen"
    },
    "imp": {
      "du": "genieße",
      "wir": "genießen wir",
      "ihr": "genießt",
      "Sie": "genießen Sie"
    }
  },
  "geraten": {
    "type": "irregular",
    "aux": "sein",
    "level": "B1",
    "bangla": "পড়া (বিপদে ইত্যাদি)",
    "english": "to get into (trouble/state)",
    "pres": {
      "ich": "gerate",
      "du": "gerätst",
      "erSieEs": "gerät",
      "wir": "geraten",
      "ihr": "geratt",
      "sieSie": "geraten"
    },
    "past": {
      "ich": "geriet",
      "du": "gerietest",
      "erSieEs": "geriet",
      "wir": "gerieten",
      "ihr": "gerietet",
      "sieSie": "gerieten"
    },
    "p2": "geraten",
    "k1": {
      "ich": "gerate",
      "du": "geratest",
      "erSieEs": "gerate",
      "wir": "geraten",
      "ihr": "geratet",
      "sieSie": "geraten"
    },
    "k2": {
      "ich": "gerietee",
      "du": "gerieteest",
      "erSieEs": "gerietee",
      "wir": "gerieteen",
      "ihr": "gerieteet",
      "sieSie": "gerieteen"
    },
    "imp": {
      "du": "gerate",
      "wir": "geraten wir",
      "ihr": "geratt",
      "Sie": "geraten Sie"
    }
  },
  "geschehen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "ঘটা",
    "english": "to happen",
    "pres": {
      "ich": "geschehe",
      "du": "geschieht",
      "erSieEs": "geschieht",
      "wir": "geschehen",
      "ihr": "gescheht",
      "sieSie": "geschehen"
    },
    "past": {
      "ich": "geschah",
      "du": "geschahst",
      "erSieEs": "geschah",
      "wir": "geschahen",
      "ihr": "geschaht",
      "sieSie": "geschahen"
    },
    "p2": "geschehen",
    "k1": {
      "ich": "geschehe",
      "du": "geschehest",
      "erSieEs": "geschehe",
      "wir": "geschehen",
      "ihr": "geschehet",
      "sieSie": "geschehen"
    },
    "k2": {
      "ich": "geschähee",
      "du": "geschäheest",
      "erSieEs": "geschähee",
      "wir": "geschäheen",
      "ihr": "geschäheet",
      "sieSie": "geschäheen"
    },
    "imp": {
      "du": "geschehe",
      "wir": "geschehen wir",
      "ihr": "gescheht",
      "Sie": "geschehen Sie"
    }
  },
  "gewinnen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "জেতা",
    "english": "to win",
    "pres": {
      "ich": "gewinne",
      "du": "gewinnst",
      "erSieEs": "gewinnt",
      "wir": "gewinnen",
      "ihr": "gewinnt",
      "sieSie": "gewinnen"
    },
    "past": {
      "ich": "gewann",
      "du": "gewannst",
      "erSieEs": "gewann",
      "wir": "gewannen",
      "ihr": "gewannt",
      "sieSie": "gewannen"
    },
    "p2": "gewonnen",
    "k1": {
      "ich": "gewinne",
      "du": "gewinnest",
      "erSieEs": "gewinne",
      "wir": "gewinnen",
      "ihr": "gewinnet",
      "sieSie": "gewinnen"
    },
    "k2": {
      "ich": "gewännee",
      "du": "gewänneest",
      "erSieEs": "gewännee",
      "wir": "gewänneen",
      "ihr": "gewänneet",
      "sieSie": "gewänneen"
    },
    "imp": {
      "du": "gewinn",
      "wir": "gewinnen wir",
      "ihr": "gewinnt",
      "Sie": "gewinnen Sie"
    }
  },
  "gießen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ঢালা / জল দেওয়া",
    "english": "to pour, water",
    "pres": {
      "ich": "gieße",
      "du": "gießt",
      "erSieEs": "gießt",
      "wir": "gießen",
      "ihr": "gießt",
      "sieSie": "gießen"
    },
    "past": {
      "ich": "goss",
      "du": "gossst",
      "erSieEs": "goss",
      "wir": "gossen",
      "ihr": "gosst",
      "sieSie": "gossen"
    },
    "p2": "gegossen",
    "k1": {
      "ich": "gieße",
      "du": "gießest",
      "erSieEs": "gieße",
      "wir": "gießen",
      "ihr": "gießet",
      "sieSie": "gießen"
    },
    "k2": {
      "ich": "gössee",
      "du": "gösseest",
      "erSieEs": "gössee",
      "wir": "gösseen",
      "ihr": "gösseet",
      "sieSie": "gösseen"
    },
    "imp": {
      "du": "gieße",
      "wir": "gießen wir",
      "ihr": "gießt",
      "Sie": "gießen Sie"
    }
  },
  "gleichen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "সদৃশ হওয়া",
    "english": "to resemble",
    "pres": {
      "ich": "gleiche",
      "du": "gleichst",
      "erSieEs": "gleicht",
      "wir": "gleichen",
      "ihr": "gleicht",
      "sieSie": "gleichen"
    },
    "past": {
      "ich": "glich",
      "du": "glichst",
      "erSieEs": "glich",
      "wir": "glichen",
      "ihr": "glicht",
      "sieSie": "glichen"
    },
    "p2": "geglichen",
    "k1": {
      "ich": "gleiche",
      "du": "gleichest",
      "erSieEs": "gleiche",
      "wir": "gleichen",
      "ihr": "gleichet",
      "sieSie": "gleichen"
    },
    "k2": {
      "ich": "glichee",
      "du": "glicheest",
      "erSieEs": "glichee",
      "wir": "glicheen",
      "ihr": "glicheet",
      "sieSie": "glicheen"
    },
    "imp": {
      "du": "gleiche",
      "wir": "gleichen wir",
      "ihr": "gleicht",
      "Sie": "gleichen Sie"
    }
  },
  "gleiten": {
    "type": "irregular",
    "aux": "sein",
    "level": "B1",
    "bangla": "পিছলে যাওয়া",
    "english": "to glide, slide",
    "pres": {
      "ich": "gleite",
      "du": "gleitest",
      "erSieEs": "gleitet",
      "wir": "gleiten",
      "ihr": "gleitt",
      "sieSie": "gleiten"
    },
    "past": {
      "ich": "glitt",
      "du": "glittest",
      "erSieEs": "glitt",
      "wir": "glitten",
      "ihr": "glittet",
      "sieSie": "glitten"
    },
    "p2": "geglitten",
    "k1": {
      "ich": "gleite",
      "du": "gleitest",
      "erSieEs": "gleite",
      "wir": "gleiten",
      "ihr": "gleitet",
      "sieSie": "gleiten"
    },
    "k2": {
      "ich": "glittee",
      "du": "glitteest",
      "erSieEs": "glittee",
      "wir": "glitteen",
      "ihr": "glitteet",
      "sieSie": "glitteen"
    },
    "imp": {
      "du": "gleite",
      "wir": "gleiten wir",
      "ihr": "gleitt",
      "Sie": "gleiten Sie"
    }
  },
  "glimmen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "ধিকিধিকি জ্বলা",
    "english": "to glimmer, smolder",
    "pres": {
      "ich": "glimme",
      "du": "glimmst",
      "erSieEs": "glimmt",
      "wir": "glimmen",
      "ihr": "glimmt",
      "sieSie": "glimmen"
    },
    "past": {
      "ich": "glomm",
      "du": "glommst",
      "erSieEs": "glomm",
      "wir": "glommen",
      "ihr": "glommt",
      "sieSie": "glommen"
    },
    "p2": "geglommen",
    "k1": {
      "ich": "glimme",
      "du": "glimmest",
      "erSieEs": "glimme",
      "wir": "glimmen",
      "ihr": "glimmet",
      "sieSie": "glimmen"
    },
    "k2": {
      "ich": "glömmee",
      "du": "glömmeest",
      "erSieEs": "glömmee",
      "wir": "glömmeen",
      "ihr": "glömmeet",
      "sieSie": "glömmeen"
    },
    "imp": {
      "du": "glimme",
      "wir": "glimmen wir",
      "ihr": "glimmt",
      "Sie": "glimmen Sie"
    }
  },
  "graben": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "খনন করা",
    "english": "to dig",
    "pres": {
      "ich": "grabe",
      "du": "gräbst",
      "erSieEs": "gräbt",
      "wir": "graben",
      "ihr": "grabt",
      "sieSie": "graben"
    },
    "past": {
      "ich": "grub",
      "du": "grubst",
      "erSieEs": "grub",
      "wir": "gruben",
      "ihr": "grubt",
      "sieSie": "gruben"
    },
    "p2": "gegraben",
    "k1": {
      "ich": "grabe",
      "du": "grabest",
      "erSieEs": "grabe",
      "wir": "graben",
      "ihr": "grabet",
      "sieSie": "graben"
    },
    "k2": {
      "ich": "grübee",
      "du": "grübeest",
      "erSieEs": "grübee",
      "wir": "grübeen",
      "ihr": "grübeet",
      "sieSie": "grübeen"
    },
    "imp": {
      "du": "grab",
      "wir": "graben wir",
      "ihr": "grabt",
      "Sie": "graben Sie"
    }
  },
  "greifen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ধরা / আঁকড়ে ধরা",
    "english": "to grab, grasp",
    "pres": {
      "ich": "greife",
      "du": "greifst",
      "erSieEs": "greift",
      "wir": "greifen",
      "ihr": "greift",
      "sieSie": "greifen"
    },
    "past": {
      "ich": "griff",
      "du": "griffst",
      "erSieEs": "griff",
      "wir": "griffen",
      "ihr": "grifft",
      "sieSie": "griffen"
    },
    "p2": "gegriffen",
    "k1": {
      "ich": "greife",
      "du": "greifest",
      "erSieEs": "greife",
      "wir": "greifen",
      "ihr": "greifet",
      "sieSie": "greifen"
    },
    "k2": {
      "ich": "griffee",
      "du": "griffeest",
      "erSieEs": "griffee",
      "wir": "griffeen",
      "ihr": "griffeet",
      "sieSie": "griffeen"
    },
    "imp": {
      "du": "greif",
      "wir": "greifen wir",
      "ihr": "greift",
      "Sie": "greifen Sie"
    }
  },
  "halten": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ধরা / থামা",
    "english": "to hold, stop",
    "pres": {
      "ich": "halte",
      "du": "hältst",
      "erSieEs": "hält",
      "wir": "halten",
      "ihr": "haltt",
      "sieSie": "halten"
    },
    "past": {
      "ich": "hielt",
      "du": "hieltest",
      "erSieEs": "hielt",
      "wir": "hielten",
      "ihr": "hieltet",
      "sieSie": "hielten"
    },
    "p2": "gehalten",
    "k1": {
      "ich": "halte",
      "du": "haltest",
      "erSieEs": "halte",
      "wir": "halten",
      "ihr": "haltet",
      "sieSie": "halten"
    },
    "k2": {
      "ich": "hieltee",
      "du": "hielteest",
      "erSieEs": "hieltee",
      "wir": "hielteen",
      "ihr": "hielteet",
      "sieSie": "hielteen"
    },
    "imp": {
      "du": "halt",
      "wir": "halten wir",
      "ihr": "haltt",
      "Sie": "halten Sie"
    }
  },
  "hängen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ঝুলে থাকা",
    "english": "to hang",
    "pres": {
      "ich": "hänge",
      "du": "hängst",
      "erSieEs": "hängt",
      "wir": "hängen",
      "ihr": "hängt",
      "sieSie": "hängen"
    },
    "past": {
      "ich": "hing",
      "du": "hingst",
      "erSieEs": "hing",
      "wir": "hingen",
      "ihr": "hingt",
      "sieSie": "hingen"
    },
    "p2": "gehangen",
    "k1": {
      "ich": "hänge",
      "du": "hängest",
      "erSieEs": "hänge",
      "wir": "hängen",
      "ihr": "hänget",
      "sieSie": "hängen"
    },
    "k2": {
      "ich": "hingee",
      "du": "hingeest",
      "erSieEs": "hingee",
      "wir": "hingeen",
      "ihr": "hingeet",
      "sieSie": "hingeen"
    },
    "imp": {
      "du": "häng",
      "wir": "hängen wir",
      "ihr": "hängt",
      "Sie": "hängen Sie"
    }
  },
  "hauen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "আঘাত করা / কোপানো",
    "english": "to hit, chop",
    "pres": {
      "ich": "haue",
      "du": "haust",
      "erSieEs": "haut",
      "wir": "hauen",
      "ihr": "haut",
      "sieSie": "hauen"
    },
    "past": {
      "ich": "hieb",
      "du": "hiebst",
      "erSieEs": "hieb",
      "wir": "hieben",
      "ihr": "hiebt",
      "sieSie": "hieben"
    },
    "p2": "gehauen",
    "k1": {
      "ich": "haue",
      "du": "hauest",
      "erSieEs": "haue",
      "wir": "hauen",
      "ihr": "hauet",
      "sieSie": "hauen"
    },
    "k2": {
      "ich": "hiebee",
      "du": "hiebeest",
      "erSieEs": "hiebee",
      "wir": "hiebeen",
      "ihr": "hiebeet",
      "sieSie": "hiebeen"
    },
    "imp": {
      "du": "hau",
      "wir": "hauen wir",
      "ihr": "haut",
      "Sie": "hauen Sie"
    }
  },
  "heben": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "তোলা / উত্তোলন করা",
    "english": "to lift, raise",
    "pres": {
      "ich": "hebe",
      "du": "hebst",
      "erSieEs": "hebt",
      "wir": "heben",
      "ihr": "hebt",
      "sieSie": "heben"
    },
    "past": {
      "ich": "hob",
      "du": "hobst",
      "erSieEs": "hob",
      "wir": "hoben",
      "ihr": "hobt",
      "sieSie": "hoben"
    },
    "p2": "gehoben",
    "k1": {
      "ich": "hebe",
      "du": "hebest",
      "erSieEs": "hebe",
      "wir": "heben",
      "ihr": "hebet",
      "sieSie": "heben"
    },
    "k2": {
      "ich": "höbee",
      "du": "höbeest",
      "erSieEs": "höbee",
      "wir": "höbeen",
      "ihr": "höbeet",
      "sieSie": "höbeen"
    },
    "imp": {
      "du": "heb",
      "wir": "heben wir",
      "ihr": "hebt",
      "Sie": "heben Sie"
    }
  },
  "heißen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "নাম হওয়া",
    "english": "to be called",
    "pres": {
      "ich": "heiße",
      "du": "heißt",
      "erSieEs": "heißt",
      "wir": "heißen",
      "ihr": "heißt",
      "sieSie": "heißen"
    },
    "past": {
      "ich": "hieß",
      "du": "hießst",
      "erSieEs": "hieß",
      "wir": "hießen",
      "ihr": "hießt",
      "sieSie": "hießen"
    },
    "p2": "geheißen",
    "k1": {
      "ich": "heiße",
      "du": "heißest",
      "erSieEs": "heiße",
      "wir": "heißen",
      "ihr": "heißet",
      "sieSie": "heißen"
    },
    "k2": {
      "ich": "hießee",
      "du": "hießeest",
      "erSieEs": "hießee",
      "wir": "hießeen",
      "ihr": "hießeet",
      "sieSie": "hießeen"
    },
    "imp": {
      "du": "heiß",
      "wir": "heißen wir",
      "ihr": "heißt",
      "Sie": "heißen Sie"
    }
  },
  "helfen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "সাহায্য করা",
    "english": "to help",
    "pres": {
      "ich": "helfe",
      "du": "hilfst",
      "erSieEs": "hilft",
      "wir": "helfen",
      "ihr": "helft",
      "sieSie": "helfen"
    },
    "past": {
      "ich": "half",
      "du": "halfst",
      "erSieEs": "half",
      "wir": "halfen",
      "ihr": "halft",
      "sieSie": "halfen"
    },
    "p2": "geholfen",
    "k1": {
      "ich": "helfe",
      "du": "helfest",
      "erSieEs": "helfe",
      "wir": "helfen",
      "ihr": "helfet",
      "sieSie": "helfen"
    },
    "k2": {
      "ich": "hülfee",
      "du": "hülfeest",
      "erSieEs": "hülfee",
      "wir": "hülfeen",
      "ihr": "hülfeet",
      "sieSie": "hülfeen"
    },
    "imp": {
      "du": "hilf",
      "wir": "helfen wir",
      "ihr": "helft",
      "Sie": "helfen Sie"
    }
  },
  "kennen": {
    "type": "mixed",
    "aux": "haben",
    "level": "A1",
    "bangla": "চেনা / জানা",
    "english": "to know (be familiar)",
    "pres": {
      "ich": "kenne",
      "du": "kennst",
      "erSieEs": "kennt",
      "wir": "kennen",
      "ihr": "kennt",
      "sieSie": "kennen"
    },
    "past": {
      "ich": "kannte",
      "du": "kanntest",
      "erSieEs": "kannte",
      "wir": "kannteen",
      "ihr": "kanntet",
      "sieSie": "kannteen"
    },
    "p2": "gekannt",
    "k1": {
      "ich": "kenne",
      "du": "kennest",
      "erSieEs": "kenne",
      "wir": "kennen",
      "ihr": "kennet",
      "sieSie": "kennen"
    },
    "k2": {
      "ich": "kenntee",
      "du": "kennteest",
      "erSieEs": "kenntee",
      "wir": "kennteen",
      "ihr": "kennteet",
      "sieSie": "kennteen"
    },
    "imp": {
      "du": "kenn",
      "wir": "kennen wir",
      "ihr": "kennt",
      "Sie": "kennen Sie"
    }
  },
  "klingen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ধ্বনি দেওয়া / শোনানো",
    "english": "to sound, ring",
    "pres": {
      "ich": "klinge",
      "du": "klingst",
      "erSieEs": "klingt",
      "wir": "klingen",
      "ihr": "klingt",
      "sieSie": "klingen"
    },
    "past": {
      "ich": "klang",
      "du": "klangst",
      "erSieEs": "klang",
      "wir": "klangen",
      "ihr": "klangt",
      "sieSie": "klangen"
    },
    "p2": "geklungen",
    "k1": {
      "ich": "klinge",
      "du": "klingest",
      "erSieEs": "klinge",
      "wir": "klingen",
      "ihr": "klinget",
      "sieSie": "klingen"
    },
    "k2": {
      "ich": "klängee",
      "du": "klängeest",
      "erSieEs": "klängee",
      "wir": "klängeen",
      "ihr": "klängeet",
      "sieSie": "klängeen"
    },
    "imp": {
      "du": "klinge",
      "wir": "klingen wir",
      "ihr": "klingt",
      "Sie": "klingen Sie"
    }
  },
  "kneifen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "চিমটি কাটা",
    "english": "to pinch",
    "pres": {
      "ich": "kneife",
      "du": "kneifst",
      "erSieEs": "kneift",
      "wir": "kneifen",
      "ihr": "kneift",
      "sieSie": "kneifen"
    },
    "past": {
      "ich": "kniff",
      "du": "kniffst",
      "erSieEs": "kniff",
      "wir": "kniffen",
      "ihr": "knifft",
      "sieSie": "kniffen"
    },
    "p2": "gekniffen",
    "k1": {
      "ich": "kneife",
      "du": "kneifest",
      "erSieEs": "kneife",
      "wir": "kneifen",
      "ihr": "kneifet",
      "sieSie": "kneifen"
    },
    "k2": {
      "ich": "kniffee",
      "du": "kniffeest",
      "erSieEs": "kniffee",
      "wir": "kniffeen",
      "ihr": "kniffeet",
      "sieSie": "kniffeen"
    },
    "imp": {
      "du": "kneife",
      "wir": "kneifen wir",
      "ihr": "kneift",
      "Sie": "kneifen Sie"
    }
  },
  "kommen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A1",
    "bangla": "আসা",
    "english": "to come",
    "pres": {
      "ich": "komme",
      "du": "kommst",
      "erSieEs": "kommt",
      "wir": "kommen",
      "ihr": "kommt",
      "sieSie": "kommen"
    },
    "past": {
      "ich": "kam",
      "du": "kamst",
      "erSieEs": "kam",
      "wir": "kamen",
      "ihr": "kamt",
      "sieSie": "kamen"
    },
    "p2": "gekommen",
    "k1": {
      "ich": "komme",
      "du": "kommest",
      "erSieEs": "komme",
      "wir": "kommen",
      "ihr": "kommet",
      "sieSie": "kommen"
    },
    "k2": {
      "ich": "kämee",
      "du": "kämeest",
      "erSieEs": "kämee",
      "wir": "kämeen",
      "ihr": "kämeet",
      "sieSie": "kämeen"
    },
    "imp": {
      "du": "komm",
      "wir": "kommen wir",
      "ihr": "kommt",
      "Sie": "kommen Sie"
    }
  },
  "kriechen": {
    "type": "irregular",
    "aux": "sein",
    "level": "B1",
    "bangla": "হামাগুড়ি দেওয়া",
    "english": "to crawl, creep",
    "pres": {
      "ich": "krieche",
      "du": "kriechst",
      "erSieEs": "kriecht",
      "wir": "kriechen",
      "ihr": "kriecht",
      "sieSie": "kriechen"
    },
    "past": {
      "ich": "kroch",
      "du": "krochst",
      "erSieEs": "kroch",
      "wir": "krochen",
      "ihr": "krocht",
      "sieSie": "krochen"
    },
    "p2": "gekrochen",
    "k1": {
      "ich": "krieche",
      "du": "kriechest",
      "erSieEs": "krieche",
      "wir": "kriechen",
      "ihr": "kriechet",
      "sieSie": "kriechen"
    },
    "k2": {
      "ich": "kröchee",
      "du": "kröcheest",
      "erSieEs": "kröchee",
      "wir": "kröcheen",
      "ihr": "kröcheet",
      "sieSie": "kröcheen"
    },
    "imp": {
      "du": "kriech",
      "wir": "kriechen wir",
      "ihr": "kriecht",
      "Sie": "kriechen Sie"
    }
  },
  "laden": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "লোড করা / আমন্ত্রণ করা",
    "english": "to load, invite",
    "pres": {
      "ich": "lade",
      "du": "lädst",
      "erSieEs": "lädt",
      "wir": "laden",
      "ihr": "ladt",
      "sieSie": "laden"
    },
    "past": {
      "ich": "lud",
      "du": "ludest",
      "erSieEs": "lud",
      "wir": "luden",
      "ihr": "ludet",
      "sieSie": "luden"
    },
    "p2": "geladen",
    "k1": {
      "ich": "lade",
      "du": "ladest",
      "erSieEs": "lade",
      "wir": "laden",
      "ihr": "ladet",
      "sieSie": "laden"
    },
    "k2": {
      "ich": "lüdee",
      "du": "lüdeest",
      "erSieEs": "lüdee",
      "wir": "lüdeen",
      "ihr": "lüdeet",
      "sieSie": "lüdeen"
    },
    "imp": {
      "du": "lade",
      "wir": "laden wir",
      "ihr": "ladt",
      "Sie": "laden Sie"
    }
  },
  "lassen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "করতে দেওয়া / ছেড়ে দেওয়া",
    "english": "to let, allow",
    "pres": {
      "ich": "lasse",
      "du": "lässt",
      "erSieEs": "lässt",
      "wir": "lassen",
      "ihr": "lasst",
      "sieSie": "lassen"
    },
    "past": {
      "ich": "ließ",
      "du": "ließst",
      "erSieEs": "ließ",
      "wir": "ließen",
      "ihr": "ließt",
      "sieSie": "ließen"
    },
    "p2": "gelassen",
    "k1": {
      "ich": "lasse",
      "du": "lassest",
      "erSieEs": "lasse",
      "wir": "lassen",
      "ihr": "lasset",
      "sieSie": "lassen"
    },
    "k2": {
      "ich": "ließee",
      "du": "ließeest",
      "erSieEs": "ließee",
      "wir": "ließeen",
      "ihr": "ließeet",
      "sieSie": "ließeen"
    },
    "imp": {
      "du": "lass",
      "wir": "lassen wir",
      "ihr": "lasst",
      "Sie": "lassen Sie"
    }
  },
  "laufen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A1",
    "bangla": "দৌড়ানো",
    "english": "to run",
    "pres": {
      "ich": "laufe",
      "du": "läufst",
      "erSieEs": "läuft",
      "wir": "laufen",
      "ihr": "lauft",
      "sieSie": "laufen"
    },
    "past": {
      "ich": "lief",
      "du": "liefst",
      "erSieEs": "lief",
      "wir": "liefen",
      "ihr": "lieft",
      "sieSie": "liefen"
    },
    "p2": "gelaufen",
    "k1": {
      "ich": "laufe",
      "du": "laufest",
      "erSieEs": "laufe",
      "wir": "laufen",
      "ihr": "laufet",
      "sieSie": "laufen"
    },
    "k2": {
      "ich": "liefee",
      "du": "liefeest",
      "erSieEs": "liefee",
      "wir": "liefeen",
      "ihr": "liefeet",
      "sieSie": "liefeen"
    },
    "imp": {
      "du": "lauf",
      "wir": "laufen wir",
      "ihr": "lauft",
      "Sie": "laufen Sie"
    }
  },
  "leiden": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "কষ্ট পাওয়া / সহ্য করা",
    "english": "to suffer",
    "pres": {
      "ich": "leide",
      "du": "leidest",
      "erSieEs": "leidet",
      "wir": "leiden",
      "ihr": "leidt",
      "sieSie": "leiden"
    },
    "past": {
      "ich": "litt",
      "du": "littest",
      "erSieEs": "litt",
      "wir": "litten",
      "ihr": "littet",
      "sieSie": "litten"
    },
    "p2": "gelitten",
    "k1": {
      "ich": "leide",
      "du": "leidest",
      "erSieEs": "leide",
      "wir": "leiden",
      "ihr": "leidet",
      "sieSie": "leiden"
    },
    "k2": {
      "ich": "littee",
      "du": "litteest",
      "erSieEs": "littee",
      "wir": "litteen",
      "ihr": "litteet",
      "sieSie": "litteen"
    },
    "imp": {
      "du": "leide",
      "wir": "leiden wir",
      "ihr": "leidt",
      "Sie": "leiden Sie"
    }
  },
  "leihen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ধার দেওয়া / নেওয়া",
    "english": "to lend, borrow",
    "pres": {
      "ich": "leihe",
      "du": "leihst",
      "erSieEs": "leiht",
      "wir": "leihen",
      "ihr": "leiht",
      "sieSie": "leihen"
    },
    "past": {
      "ich": "lieh",
      "du": "liehst",
      "erSieEs": "lieh",
      "wir": "liehen",
      "ihr": "lieht",
      "sieSie": "liehen"
    },
    "p2": "geliehen",
    "k1": {
      "ich": "leihe",
      "du": "leihest",
      "erSieEs": "leihe",
      "wir": "leihen",
      "ihr": "leihet",
      "sieSie": "leihen"
    },
    "k2": {
      "ich": "liehee",
      "du": "lieheest",
      "erSieEs": "liehee",
      "wir": "lieheen",
      "ihr": "lieheet",
      "sieSie": "lieheen"
    },
    "imp": {
      "du": "leih",
      "wir": "leihen wir",
      "ihr": "leiht",
      "Sie": "leihen Sie"
    }
  },
  "lesen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "পড়া",
    "english": "to read",
    "pres": {
      "ich": "lese",
      "du": "liest",
      "erSieEs": "liest",
      "wir": "lesen",
      "ihr": "lest",
      "sieSie": "lesen"
    },
    "past": {
      "ich": "las",
      "du": "lasst",
      "erSieEs": "las",
      "wir": "lasen",
      "ihr": "last",
      "sieSie": "lasen"
    },
    "p2": "gelesen",
    "k1": {
      "ich": "lese",
      "du": "lesest",
      "erSieEs": "lese",
      "wir": "lesen",
      "ihr": "leset",
      "sieSie": "lesen"
    },
    "k2": {
      "ich": "läsee",
      "du": "läseest",
      "erSieEs": "läsee",
      "wir": "läseen",
      "ihr": "läseet",
      "sieSie": "läseen"
    },
    "imp": {
      "du": "lies",
      "wir": "lesen wir",
      "ihr": "lest",
      "Sie": "lesen Sie"
    }
  },
  "liegen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "শায়িত থাকা",
    "english": "to lie down",
    "pres": {
      "ich": "liege",
      "du": "liegst",
      "erSieEs": "liegt",
      "wir": "liegen",
      "ihr": "liegt",
      "sieSie": "liegen"
    },
    "past": {
      "ich": "lag",
      "du": "lagst",
      "erSieEs": "lag",
      "wir": "lagen",
      "ihr": "lagt",
      "sieSie": "lagen"
    },
    "p2": "gelegen",
    "k1": {
      "ich": "liege",
      "du": "liegest",
      "erSieEs": "liege",
      "wir": "liegen",
      "ihr": "lieget",
      "sieSie": "liegen"
    },
    "k2": {
      "ich": "lägee",
      "du": "lägeest",
      "erSieEs": "lägee",
      "wir": "lägeen",
      "ihr": "lägeet",
      "sieSie": "lägeen"
    },
    "imp": {
      "du": "lieg",
      "wir": "liegen wir",
      "ihr": "liegt",
      "Sie": "liegen Sie"
    }
  },
  "lügen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "মিথ্যা বলা",
    "english": "to lie (tell lies)",
    "pres": {
      "ich": "lüge",
      "du": "lügst",
      "erSieEs": "lügt",
      "wir": "lügen",
      "ihr": "lügt",
      "sieSie": "lügen"
    },
    "past": {
      "ich": "log",
      "du": "logst",
      "erSieEs": "log",
      "wir": "logen",
      "ihr": "logt",
      "sieSie": "logen"
    },
    "p2": "gelogen",
    "k1": {
      "ich": "lüge",
      "du": "lügest",
      "erSieEs": "lüge",
      "wir": "lügen",
      "ihr": "lüget",
      "sieSie": "lügen"
    },
    "k2": {
      "ich": "lögee",
      "du": "lögeest",
      "erSieEs": "lögee",
      "wir": "lögeen",
      "ihr": "lögeet",
      "sieSie": "lögeen"
    },
    "imp": {
      "du": "lüg",
      "wir": "lügen wir",
      "ihr": "lügt",
      "Sie": "lügen Sie"
    }
  },
  "mahlen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "পেষা / গুঁড়া করা",
    "english": "to grind, mill",
    "pres": {
      "ich": "mahle",
      "du": "mahlst",
      "erSieEs": "mahlt",
      "wir": "mahlen",
      "ihr": "mahlt",
      "sieSie": "mahlen"
    },
    "past": {
      "ich": "mahlte",
      "du": "mahltest",
      "erSieEs": "mahlte",
      "wir": "mahlteen",
      "ihr": "mahltet",
      "sieSie": "mahlteen"
    },
    "p2": "gemahlen",
    "k1": {
      "ich": "mahle",
      "du": "mahlest",
      "erSieEs": "mahle",
      "wir": "mahlen",
      "ihr": "mahlet",
      "sieSie": "mahlen"
    },
    "k2": {
      "ich": "mahltee",
      "du": "mahlteest",
      "erSieEs": "mahltee",
      "wir": "mahlteen",
      "ihr": "mahlteet",
      "sieSie": "mahlteen"
    },
    "imp": {
      "du": "mahle",
      "wir": "mahlen wir",
      "ihr": "mahlt",
      "Sie": "mahlen Sie"
    }
  },
  "meiden": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "এড়িয়ে চলা",
    "english": "to avoid",
    "pres": {
      "ich": "meide",
      "du": "meidest",
      "erSieEs": "meidet",
      "wir": "meiden",
      "ihr": "meidt",
      "sieSie": "meiden"
    },
    "past": {
      "ich": "mied",
      "du": "miedest",
      "erSieEs": "mied",
      "wir": "mieden",
      "ihr": "miedet",
      "sieSie": "mieden"
    },
    "p2": "gemieden",
    "k1": {
      "ich": "meide",
      "du": "meidest",
      "erSieEs": "meide",
      "wir": "meiden",
      "ihr": "meidet",
      "sieSie": "meiden"
    },
    "k2": {
      "ich": "miedee",
      "du": "miedeest",
      "erSieEs": "miedee",
      "wir": "miedeen",
      "ihr": "miedeet",
      "sieSie": "miedeen"
    },
    "imp": {
      "du": "meide",
      "wir": "meiden wir",
      "ihr": "meidt",
      "Sie": "meiden Sie"
    }
  },
  "melken": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "দুধ দোয়ানো",
    "english": "to milk",
    "pres": {
      "ich": "melke",
      "du": "melkst",
      "erSieEs": "melkt",
      "wir": "melken",
      "ihr": "melkt",
      "sieSie": "melken"
    },
    "past": {
      "ich": "molk",
      "du": "molkst",
      "erSieEs": "molk",
      "wir": "molken",
      "ihr": "molkt",
      "sieSie": "molken"
    },
    "p2": "gemolken",
    "k1": {
      "ich": "melke",
      "du": "melkest",
      "erSieEs": "melke",
      "wir": "melken",
      "ihr": "melket",
      "sieSie": "melken"
    },
    "k2": {
      "ich": "mölkee",
      "du": "mölkeest",
      "erSieEs": "mölkee",
      "wir": "mölkeen",
      "ihr": "mölkeet",
      "sieSie": "mölkeen"
    },
    "imp": {
      "du": "melke",
      "wir": "melken wir",
      "ihr": "melkt",
      "Sie": "melken Sie"
    }
  },
  "messen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "পরিমাপ করা",
    "english": "to measure",
    "pres": {
      "ich": "messe",
      "du": "misst",
      "erSieEs": "misst",
      "wir": "messen",
      "ihr": "messt",
      "sieSie": "messen"
    },
    "past": {
      "ich": "maß",
      "du": "maßst",
      "erSieEs": "maß",
      "wir": "maßen",
      "ihr": "maßt",
      "sieSie": "maßen"
    },
    "p2": "gemessen",
    "k1": {
      "ich": "messe",
      "du": "messest",
      "erSieEs": "messe",
      "wir": "messen",
      "ihr": "messet",
      "sieSie": "messen"
    },
    "k2": {
      "ich": "mäßee",
      "du": "mäßeest",
      "erSieEs": "mäßee",
      "wir": "mäßeen",
      "ihr": "mäßeet",
      "sieSie": "mäßeen"
    },
    "imp": {
      "du": "miss",
      "wir": "messen wir",
      "ihr": "messt",
      "Sie": "messen Sie"
    }
  },
  "misslingen": {
    "type": "irregular",
    "aux": "sein",
    "level": "B1",
    "bangla": "ব্যর্থ হওয়া",
    "english": "to fail",
    "pres": {
      "ich": "misslinge",
      "du": "misslingt",
      "erSieEs": "misslingt",
      "wir": "misslingen",
      "ihr": "misslingt",
      "sieSie": "misslingen"
    },
    "past": {
      "ich": "misslang",
      "du": "misslangst",
      "erSieEs": "misslang",
      "wir": "misslangen",
      "ihr": "misslangt",
      "sieSie": "misslangen"
    },
    "p2": "gemisslungen",
    "k1": {
      "ich": "misslinge",
      "du": "misslingest",
      "erSieEs": "misslinge",
      "wir": "misslingen",
      "ihr": "misslinget",
      "sieSie": "misslingen"
    },
    "k2": {
      "ich": "misslängee",
      "du": "misslängeest",
      "erSieEs": "misslängee",
      "wir": "misslängeen",
      "ihr": "misslängeet",
      "sieSie": "misslängeen"
    },
    "imp": {
      "du": "misslinge",
      "wir": "misslingen wir",
      "ihr": "misslingt",
      "Sie": "misslingen Sie"
    }
  },
  "nehmen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "নেওয়া",
    "english": "to take",
    "pres": {
      "ich": "nehme",
      "du": "nimmst",
      "erSieEs": "nimmt",
      "wir": "nehmen",
      "ihr": "nehmt",
      "sieSie": "nehmen"
    },
    "past": {
      "ich": "nahm",
      "du": "nahmst",
      "erSieEs": "nahm",
      "wir": "nahmen",
      "ihr": "nahmt",
      "sieSie": "nahmen"
    },
    "p2": "genommen",
    "k1": {
      "ich": "nehme",
      "du": "nehmest",
      "erSieEs": "nehme",
      "wir": "nehmen",
      "ihr": "nehmet",
      "sieSie": "nehmen"
    },
    "k2": {
      "ich": "nähmee",
      "du": "nähmeest",
      "erSieEs": "nähmee",
      "wir": "nähmeen",
      "ihr": "nähmeet",
      "sieSie": "nähmeen"
    },
    "imp": {
      "du": "nimm",
      "wir": "nehmen wir",
      "ihr": "nehmt",
      "Sie": "nehmen Sie"
    }
  },
  "nennen": {
    "type": "mixed",
    "aux": "haben",
    "level": "A2",
    "bangla": "নাম রাখা / ডাকা",
    "english": "to name, call",
    "pres": {
      "ich": "nenne",
      "du": "nennst",
      "erSieEs": "nennt",
      "wir": "nennen",
      "ihr": "nennt",
      "sieSie": "nennen"
    },
    "past": {
      "ich": "nannte",
      "du": "nanntest",
      "erSieEs": "nannte",
      "wir": "nannteen",
      "ihr": "nanntet",
      "sieSie": "nannteen"
    },
    "p2": "genannt",
    "k1": {
      "ich": "nenne",
      "du": "nennest",
      "erSieEs": "nenne",
      "wir": "nennen",
      "ihr": "nennet",
      "sieSie": "nennen"
    },
    "k2": {
      "ich": "nenntee",
      "du": "nennteest",
      "erSieEs": "nenntee",
      "wir": "nennteen",
      "ihr": "nennteet",
      "sieSie": "nennteen"
    },
    "imp": {
      "du": "nenn",
      "wir": "nennen wir",
      "ihr": "nennt",
      "Sie": "nennen Sie"
    }
  },
  "pfeifen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "শিস দেওয়া",
    "english": "to whistle",
    "pres": {
      "ich": "pfeife",
      "du": "pfeifst",
      "erSieEs": "pfeift",
      "wir": "pfeifen",
      "ihr": "pfeift",
      "sieSie": "pfeifen"
    },
    "past": {
      "ich": "pfiff",
      "du": "pfiffst",
      "erSieEs": "pfiff",
      "wir": "pfiffen",
      "ihr": "pfifft",
      "sieSie": "pfiffen"
    },
    "p2": "gepfiffen",
    "k1": {
      "ich": "pfeife",
      "du": "pfeifest",
      "erSieEs": "pfeife",
      "wir": "pfeifen",
      "ihr": "pfeifet",
      "sieSie": "pfeifen"
    },
    "k2": {
      "ich": "pfiffee",
      "du": "pfiffeest",
      "erSieEs": "pfiffee",
      "wir": "pfiffeen",
      "ihr": "pfiffeet",
      "sieSie": "pfiffeen"
    },
    "imp": {
      "du": "pfeif",
      "wir": "pfeifen wir",
      "ihr": "pfeift",
      "Sie": "pfeifen Sie"
    }
  },
  "preisen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "প্রশংসা করা",
    "english": "to praise",
    "pres": {
      "ich": "preise",
      "du": "preist",
      "erSieEs": "preist",
      "wir": "preisen",
      "ihr": "preist",
      "sieSie": "preisen"
    },
    "past": {
      "ich": "pries",
      "du": "priesst",
      "erSieEs": "pries",
      "wir": "priesen",
      "ihr": "priest",
      "sieSie": "priesen"
    },
    "p2": "gepriesen",
    "k1": {
      "ich": "preise",
      "du": "preisest",
      "erSieEs": "preise",
      "wir": "preisen",
      "ihr": "preiset",
      "sieSie": "preisen"
    },
    "k2": {
      "ich": "priesee",
      "du": "prieseest",
      "erSieEs": "priesee",
      "wir": "prieseen",
      "ihr": "prieseet",
      "sieSie": "prieseen"
    },
    "imp": {
      "du": "preise",
      "wir": "preisen wir",
      "ihr": "preist",
      "Sie": "preisen Sie"
    }
  },
  "quellen": {
    "type": "irregular",
    "aux": "sein",
    "level": "B2",
    "bangla": "উথলে ওঠা / ফোলা",
    "english": "to gush, swell",
    "pres": {
      "ich": "quelle",
      "du": "quillst",
      "erSieEs": "quillt",
      "wir": "quellen",
      "ihr": "quellt",
      "sieSie": "quellen"
    },
    "past": {
      "ich": "quoll",
      "du": "quollst",
      "erSieEs": "quoll",
      "wir": "quollen",
      "ihr": "quollt",
      "sieSie": "quollen"
    },
    "p2": "gequollen",
    "k1": {
      "ich": "quelle",
      "du": "quellest",
      "erSieEs": "quelle",
      "wir": "quellen",
      "ihr": "quellet",
      "sieSie": "quellen"
    },
    "k2": {
      "ich": "quöllee",
      "du": "quölleest",
      "erSieEs": "quöllee",
      "wir": "quölleen",
      "ihr": "quölleet",
      "sieSie": "quölleen"
    },
    "imp": {
      "du": "quill",
      "wir": "quellen wir",
      "ihr": "quellt",
      "Sie": "quellen Sie"
    }
  },
  "raten": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "পরামর্শ দেওয়া / অনুমান করা",
    "english": "to advise, guess",
    "pres": {
      "ich": "rate",
      "du": "rätst",
      "erSieEs": "rät",
      "wir": "raten",
      "ihr": "ratt",
      "sieSie": "raten"
    },
    "past": {
      "ich": "riet",
      "du": "rietest",
      "erSieEs": "riet",
      "wir": "rieten",
      "ihr": "rietet",
      "sieSie": "rieten"
    },
    "p2": "geraten",
    "k1": {
      "ich": "rate",
      "du": "ratest",
      "erSieEs": "rate",
      "wir": "raten",
      "ihr": "ratet",
      "sieSie": "raten"
    },
    "k2": {
      "ich": "rietee",
      "du": "rieteest",
      "erSieEs": "rietee",
      "wir": "rieteen",
      "ihr": "rieteet",
      "sieSie": "rieteen"
    },
    "imp": {
      "du": "rate",
      "wir": "raten wir",
      "ihr": "ratt",
      "Sie": "raten Sie"
    }
  },
  "reiben": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ঘষা",
    "english": "to rub, grate",
    "pres": {
      "ich": "reibe",
      "du": "reibst",
      "erSieEs": "reibt",
      "wir": "reiben",
      "ihr": "reibt",
      "sieSie": "reiben"
    },
    "past": {
      "ich": "rieb",
      "du": "riebst",
      "erSieEs": "rieb",
      "wir": "rieben",
      "ihr": "riebt",
      "sieSie": "rieben"
    },
    "p2": "gerieben",
    "k1": {
      "ich": "reibe",
      "du": "reibest",
      "erSieEs": "reibe",
      "wir": "reiben",
      "ihr": "reibet",
      "sieSie": "reiben"
    },
    "k2": {
      "ich": "riebee",
      "du": "riebeest",
      "erSieEs": "riebee",
      "wir": "riebeen",
      "ihr": "riebeet",
      "sieSie": "riebeen"
    },
    "imp": {
      "du": "reib",
      "wir": "reiben wir",
      "ihr": "reibt",
      "Sie": "reiben Sie"
    }
  },
  "reißen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ছেঁড়া / টেনে নেওয়া",
    "english": "to tear, rip",
    "pres": {
      "ich": "reiße",
      "du": "reißt",
      "erSieEs": "reißt",
      "wir": "reißen",
      "ihr": "reißt",
      "sieSie": "reißen"
    },
    "past": {
      "ich": "riss",
      "du": "rissst",
      "erSieEs": "riss",
      "wir": "rissen",
      "ihr": "risst",
      "sieSie": "rissen"
    },
    "p2": "gerissen",
    "k1": {
      "ich": "reiße",
      "du": "reißest",
      "erSieEs": "reiße",
      "wir": "reißen",
      "ihr": "reißet",
      "sieSie": "reißen"
    },
    "k2": {
      "ich": "rissee",
      "du": "risseest",
      "erSieEs": "rissee",
      "wir": "risseen",
      "ihr": "risseet",
      "sieSie": "risseen"
    },
    "imp": {
      "du": "reiß",
      "wir": "reißen wir",
      "ihr": "reißt",
      "Sie": "reißen Sie"
    }
  },
  "reiten": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "ঘোড়ায় চড়া",
    "english": "to ride (horse)",
    "pres": {
      "ich": "reite",
      "du": "reitest",
      "erSieEs": "reitet",
      "wir": "reiten",
      "ihr": "reitt",
      "sieSie": "reiten"
    },
    "past": {
      "ich": "ritt",
      "du": "rittest",
      "erSieEs": "ritt",
      "wir": "ritten",
      "ihr": "rittet",
      "sieSie": "ritten"
    },
    "p2": "geritten",
    "k1": {
      "ich": "reite",
      "du": "reitest",
      "erSieEs": "reite",
      "wir": "reiten",
      "ihr": "reitet",
      "sieSie": "reiten"
    },
    "k2": {
      "ich": "rittee",
      "du": "ritteest",
      "erSieEs": "rittee",
      "wir": "ritteen",
      "ihr": "ritteet",
      "sieSie": "ritteen"
    },
    "imp": {
      "du": "reite",
      "wir": "reiten wir",
      "ihr": "reitt",
      "Sie": "reiten Sie"
    }
  },
  "rennen": {
    "type": "mixed",
    "aux": "sein",
    "level": "A2",
    "bangla": "ছুটে চলা",
    "english": "to race, run",
    "pres": {
      "ich": "renne",
      "du": "rennst",
      "erSieEs": "rennt",
      "wir": "rennen",
      "ihr": "rennt",
      "sieSie": "rennen"
    },
    "past": {
      "ich": "rannte",
      "du": "ranntest",
      "erSieEs": "rannte",
      "wir": "rannteen",
      "ihr": "ranntet",
      "sieSie": "rannteen"
    },
    "p2": "gerannt",
    "k1": {
      "ich": "renne",
      "du": "rennest",
      "erSieEs": "renne",
      "wir": "rennen",
      "ihr": "rennet",
      "sieSie": "rennen"
    },
    "k2": {
      "ich": "renntee",
      "du": "rennteest",
      "erSieEs": "renntee",
      "wir": "rennteen",
      "ihr": "rennteet",
      "sieSie": "rennteen"
    },
    "imp": {
      "du": "renn",
      "wir": "rennen wir",
      "ihr": "rennt",
      "Sie": "rennen Sie"
    }
  },
  "riechen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "গন্ধ পাওয়া / নেওয়া",
    "english": "to smell",
    "pres": {
      "ich": "rieche",
      "du": "riechst",
      "erSieEs": "riecht",
      "wir": "riechen",
      "ihr": "riecht",
      "sieSie": "riechen"
    },
    "past": {
      "ich": "roch",
      "du": "rochst",
      "erSieEs": "roch",
      "wir": "rochen",
      "ihr": "rocht",
      "sieSie": "rochen"
    },
    "p2": "gerochen",
    "k1": {
      "ich": "rieche",
      "du": "riechest",
      "erSieEs": "rieche",
      "wir": "riechen",
      "ihr": "riechet",
      "sieSie": "riechen"
    },
    "k2": {
      "ich": "röchee",
      "du": "röcheest",
      "erSieEs": "röchee",
      "wir": "röcheen",
      "ihr": "röcheet",
      "sieSie": "röcheen"
    },
    "imp": {
      "du": "riech",
      "wir": "riechen wir",
      "ihr": "riecht",
      "Sie": "riechen Sie"
    }
  },
  "ringen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "কুস্তি করা / সংগ্রাম করা",
    "english": "to wrestle, struggle",
    "pres": {
      "ich": "ringe",
      "du": "ringst",
      "erSieEs": "ringt",
      "wir": "ringen",
      "ihr": "ringt",
      "sieSie": "ringen"
    },
    "past": {
      "ich": "rang",
      "du": "rangst",
      "erSieEs": "rang",
      "wir": "rangen",
      "ihr": "rangt",
      "sieSie": "rangen"
    },
    "p2": "gerungen",
    "k1": {
      "ich": "ringe",
      "du": "ringest",
      "erSieEs": "ringe",
      "wir": "ringen",
      "ihr": "ringet",
      "sieSie": "ringen"
    },
    "k2": {
      "ich": "rängee",
      "du": "rängeest",
      "erSieEs": "rängee",
      "wir": "rängeen",
      "ihr": "rängeet",
      "sieSie": "rängeen"
    },
    "imp": {
      "du": "ringe",
      "wir": "ringen wir",
      "ihr": "ringt",
      "Sie": "ringen Sie"
    }
  },
  "rinnen": {
    "type": "irregular",
    "aux": "sein",
    "level": "B2",
    "bangla": "গড়িয়ে পড়া / ঝরা",
    "english": "to trickle, flow",
    "pres": {
      "ich": "rinne",
      "du": "rinnst",
      "erSieEs": "rinnt",
      "wir": "rinnen",
      "ihr": "rinnt",
      "sieSie": "rinnen"
    },
    "past": {
      "ich": "rann",
      "du": "rannst",
      "erSieEs": "rann",
      "wir": "rannen",
      "ihr": "rannt",
      "sieSie": "rannen"
    },
    "p2": "geronnen",
    "k1": {
      "ich": "rinne",
      "du": "rinnest",
      "erSieEs": "rinne",
      "wir": "rinnen",
      "ihr": "rinnet",
      "sieSie": "rinnen"
    },
    "k2": {
      "ich": "rännee",
      "du": "ränneest",
      "erSieEs": "rännee",
      "wir": "ränneen",
      "ihr": "ränneet",
      "sieSie": "ränneen"
    },
    "imp": {
      "du": "rinne",
      "wir": "rinnen wir",
      "ihr": "rinnt",
      "Sie": "rinnen Sie"
    }
  },
  "rufen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ডাকা",
    "english": "to call, shout",
    "pres": {
      "ich": "rufe",
      "du": "rufst",
      "erSieEs": "ruft",
      "wir": "rufen",
      "ihr": "ruft",
      "sieSie": "rufen"
    },
    "past": {
      "ich": "rief",
      "du": "riefst",
      "erSieEs": "rief",
      "wir": "riefen",
      "ihr": "rieft",
      "sieSie": "riefen"
    },
    "p2": "gerufen",
    "k1": {
      "ich": "rufe",
      "du": "rufest",
      "erSieEs": "rufe",
      "wir": "rufen",
      "ihr": "rufet",
      "sieSie": "rufen"
    },
    "k2": {
      "ich": "riefee",
      "du": "riefeest",
      "erSieEs": "riefee",
      "wir": "riefeen",
      "ihr": "riefeet",
      "sieSie": "riefeen"
    },
    "imp": {
      "du": "ruf",
      "wir": "rufen wir",
      "ihr": "ruft",
      "Sie": "rufen Sie"
    }
  },
  "salzen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "লবণ দেওয়া",
    "english": "to salt",
    "pres": {
      "ich": "salze",
      "du": "salzt",
      "erSieEs": "salzt",
      "wir": "salzen",
      "ihr": "salzt",
      "sieSie": "salzen"
    },
    "past": {
      "ich": "salzte",
      "du": "salztest",
      "erSieEs": "salzte",
      "wir": "salzteen",
      "ihr": "salztet",
      "sieSie": "salzteen"
    },
    "p2": "gesalzen",
    "k1": {
      "ich": "salze",
      "du": "salzest",
      "erSieEs": "salze",
      "wir": "salzen",
      "ihr": "salzet",
      "sieSie": "salzen"
    },
    "k2": {
      "ich": "salztee",
      "du": "salzteest",
      "erSieEs": "salztee",
      "wir": "salzteen",
      "ihr": "salzteet",
      "sieSie": "salzteen"
    },
    "imp": {
      "du": "salze",
      "wir": "salzen wir",
      "ihr": "salzt",
      "Sie": "salzen Sie"
    }
  },
  "saufen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "অতিরিক্ত পান করা",
    "english": "to drink heavily",
    "pres": {
      "ich": "saufe",
      "du": "säufst",
      "erSieEs": "säuft",
      "wir": "saufen",
      "ihr": "sauft",
      "sieSie": "saufen"
    },
    "past": {
      "ich": "soff",
      "du": "soffst",
      "erSieEs": "soff",
      "wir": "soffen",
      "ihr": "sofft",
      "sieSie": "soffen"
    },
    "p2": "gesoffen",
    "k1": {
      "ich": "saufe",
      "du": "saufest",
      "erSieEs": "saufe",
      "wir": "saufen",
      "ihr": "saufet",
      "sieSie": "saufen"
    },
    "k2": {
      "ich": "söffee",
      "du": "söffeest",
      "erSieEs": "söffee",
      "wir": "söffeen",
      "ihr": "söffeet",
      "sieSie": "söffeen"
    },
    "imp": {
      "du": "sauf",
      "wir": "saufen wir",
      "ihr": "sauft",
      "Sie": "saufen Sie"
    }
  },
  "saugen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "চুষে নেওয়া / ভ্যাকুয়াম করা",
    "english": "to suck, vacuum",
    "pres": {
      "ich": "sauge",
      "du": "saugst",
      "erSieEs": "saugt",
      "wir": "saugen",
      "ihr": "saugt",
      "sieSie": "saugen"
    },
    "past": {
      "ich": "sog",
      "du": "sogst",
      "erSieEs": "sog",
      "wir": "sogen",
      "ihr": "sogt",
      "sieSie": "sogen"
    },
    "p2": "gesogen",
    "k1": {
      "ich": "sauge",
      "du": "saugest",
      "erSieEs": "sauge",
      "wir": "saugen",
      "ihr": "sauget",
      "sieSie": "saugen"
    },
    "k2": {
      "ich": "sögee",
      "du": "sögeest",
      "erSieEs": "sögee",
      "wir": "sögeen",
      "ihr": "sögeet",
      "sieSie": "sögeen"
    },
    "imp": {
      "du": "saug",
      "wir": "saugen wir",
      "ihr": "saugt",
      "Sie": "saugen Sie"
    }
  },
  "schaffen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "সৃষ্টি করা / সম্পন্ন করা",
    "english": "to create, manage",
    "pres": {
      "ich": "schaffe",
      "du": "schaffst",
      "erSieEs": "schafft",
      "wir": "schaffen",
      "ihr": "schafft",
      "sieSie": "schaffen"
    },
    "past": {
      "ich": "schuf",
      "du": "schufst",
      "erSieEs": "schuf",
      "wir": "schufen",
      "ihr": "schuft",
      "sieSie": "schufen"
    },
    "p2": "geschaffen",
    "k1": {
      "ich": "schaffe",
      "du": "schaffest",
      "erSieEs": "schaffe",
      "wir": "schaffen",
      "ihr": "schaffet",
      "sieSie": "schaffen"
    },
    "k2": {
      "ich": "schüfee",
      "du": "schüfeest",
      "erSieEs": "schüfee",
      "wir": "schüfeen",
      "ihr": "schüfeet",
      "sieSie": "schüfeen"
    },
    "imp": {
      "du": "schaffe",
      "wir": "schaffen wir",
      "ihr": "schafft",
      "Sie": "schaffen Sie"
    }
  },
  "scheiden": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "বিচ্ছেদ করা / আলাদা হওয়া",
    "english": "to separate, divorce",
    "pres": {
      "ich": "scheide",
      "du": "scheidest",
      "erSieEs": "scheidet",
      "wir": "scheiden",
      "ihr": "scheidt",
      "sieSie": "scheiden"
    },
    "past": {
      "ich": "schied",
      "du": "schiedest",
      "erSieEs": "schied",
      "wir": "schieden",
      "ihr": "schiedet",
      "sieSie": "schieden"
    },
    "p2": "geschieden",
    "k1": {
      "ich": "scheide",
      "du": "scheidest",
      "erSieEs": "scheide",
      "wir": "scheiden",
      "ihr": "scheidet",
      "sieSie": "scheiden"
    },
    "k2": {
      "ich": "schiedee",
      "du": "schiedeest",
      "erSieEs": "schiedee",
      "wir": "schiedeen",
      "ihr": "schiedeet",
      "sieSie": "schiedeen"
    },
    "imp": {
      "du": "scheide",
      "wir": "scheiden wir",
      "ihr": "scheidt",
      "Sie": "scheiden Sie"
    }
  },
  "scheinen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "আলো দেওয়া / মনে হওয়া",
    "english": "to shine, seem",
    "pres": {
      "ich": "scheine",
      "du": "scheinst",
      "erSieEs": "scheint",
      "wir": "scheinen",
      "ihr": "scheint",
      "sieSie": "scheinen"
    },
    "past": {
      "ich": "schien",
      "du": "schienst",
      "erSieEs": "schien",
      "wir": "schienen",
      "ihr": "schient",
      "sieSie": "schienen"
    },
    "p2": "geschienen",
    "k1": {
      "ich": "scheine",
      "du": "scheinest",
      "erSieEs": "scheine",
      "wir": "scheinen",
      "ihr": "scheinet",
      "sieSie": "scheinen"
    },
    "k2": {
      "ich": "schienee",
      "du": "schieneest",
      "erSieEs": "schienee",
      "wir": "schieneen",
      "ihr": "schieneet",
      "sieSie": "schieneen"
    },
    "imp": {
      "du": "schein",
      "wir": "scheinen wir",
      "ihr": "scheint",
      "Sie": "scheinen Sie"
    }
  },
  "schelten": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "তিরস্কার করা",
    "english": "to scold",
    "pres": {
      "ich": "schelte",
      "du": "schiltst",
      "erSieEs": "schilt",
      "wir": "schelten",
      "ihr": "scheltt",
      "sieSie": "schelten"
    },
    "past": {
      "ich": "schalt",
      "du": "schaltest",
      "erSieEs": "schalt",
      "wir": "schalten",
      "ihr": "schaltet",
      "sieSie": "schalten"
    },
    "p2": "gescholten",
    "k1": {
      "ich": "schelte",
      "du": "scheltest",
      "erSieEs": "schelte",
      "wir": "schelten",
      "ihr": "scheltet",
      "sieSie": "schelten"
    },
    "k2": {
      "ich": "schöltee",
      "du": "schölteest",
      "erSieEs": "schöltee",
      "wir": "schölteen",
      "ihr": "schölteet",
      "sieSie": "schölteen"
    },
    "imp": {
      "du": "schilt",
      "wir": "schelten wir",
      "ihr": "scheltt",
      "Sie": "schelten Sie"
    }
  },
  "scheren": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "পশম কাটা / যত্ন নেওয়া",
    "english": "to shear, care",
    "pres": {
      "ich": "schere",
      "du": "scherst",
      "erSieEs": "schert",
      "wir": "scheren",
      "ihr": "schert",
      "sieSie": "scheren"
    },
    "past": {
      "ich": "schor",
      "du": "schorst",
      "erSieEs": "schor",
      "wir": "schoren",
      "ihr": "schort",
      "sieSie": "schoren"
    },
    "p2": "geschoren",
    "k1": {
      "ich": "schere",
      "du": "scherest",
      "erSieEs": "schere",
      "wir": "scheren",
      "ihr": "scheret",
      "sieSie": "scheren"
    },
    "k2": {
      "ich": "schöree",
      "du": "schöreest",
      "erSieEs": "schöree",
      "wir": "schöreen",
      "ihr": "schöreet",
      "sieSie": "schöreen"
    },
    "imp": {
      "du": "schere",
      "wir": "scheren wir",
      "ihr": "schert",
      "Sie": "scheren Sie"
    }
  },
  "schieben": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ঠেলা / ধাক্কা দেওয়া",
    "english": "to push, shove",
    "pres": {
      "ich": "schiebe",
      "du": "schiebst",
      "erSieEs": "schiebt",
      "wir": "schieben",
      "ihr": "schiebt",
      "sieSie": "schieben"
    },
    "past": {
      "ich": "schob",
      "du": "schobst",
      "erSieEs": "schob",
      "wir": "schoben",
      "ihr": "schobt",
      "sieSie": "schoben"
    },
    "p2": "geschoben",
    "k1": {
      "ich": "schiebe",
      "du": "schiebest",
      "erSieEs": "schiebe",
      "wir": "schieben",
      "ihr": "schiebet",
      "sieSie": "schieben"
    },
    "k2": {
      "ich": "schöbee",
      "du": "schöbeest",
      "erSieEs": "schöbee",
      "wir": "schöbeen",
      "ihr": "schöbeet",
      "sieSie": "schöbeen"
    },
    "imp": {
      "du": "schieb",
      "wir": "schieben wir",
      "ihr": "schiebt",
      "Sie": "schieben Sie"
    }
  },
  "schießen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "গুলি করা",
    "english": "to shoot",
    "pres": {
      "ich": "schieße",
      "du": "schießt",
      "erSieEs": "schießt",
      "wir": "schießen",
      "ihr": "schießt",
      "sieSie": "schießen"
    },
    "past": {
      "ich": "schoss",
      "du": "schossst",
      "erSieEs": "schoss",
      "wir": "schossen",
      "ihr": "schosst",
      "sieSie": "schossen"
    },
    "p2": "geschossen",
    "k1": {
      "ich": "schieße",
      "du": "schießest",
      "erSieEs": "schieße",
      "wir": "schießen",
      "ihr": "schießet",
      "sieSie": "schießen"
    },
    "k2": {
      "ich": "schössee",
      "du": "schösseest",
      "erSieEs": "schössee",
      "wir": "schösseen",
      "ihr": "schösseet",
      "sieSie": "schösseen"
    },
    "imp": {
      "du": "schieße",
      "wir": "schießen wir",
      "ihr": "schießt",
      "Sie": "schießen Sie"
    }
  },
  "schlafen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "ঘুমানো",
    "english": "to sleep",
    "pres": {
      "ich": "schlafe",
      "du": "schläfst",
      "erSieEs": "schläft",
      "wir": "schlafen",
      "ihr": "schlaft",
      "sieSie": "schlafen"
    },
    "past": {
      "ich": "schlief",
      "du": "schliefst",
      "erSieEs": "schlief",
      "wir": "schliefen",
      "ihr": "schlieft",
      "sieSie": "schliefen"
    },
    "p2": "geschlafen",
    "k1": {
      "ich": "schlafe",
      "du": "schlafest",
      "erSieEs": "schlafe",
      "wir": "schlafen",
      "ihr": "schlafet",
      "sieSie": "schlafen"
    },
    "k2": {
      "ich": "schliefee",
      "du": "schliefeest",
      "erSieEs": "schliefee",
      "wir": "schliefeen",
      "ihr": "schliefeet",
      "sieSie": "schliefeen"
    },
    "imp": {
      "du": "schlaf",
      "wir": "schlafen wir",
      "ihr": "schlaft",
      "Sie": "schlafen Sie"
    }
  },
  "schlagen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "মারা / আঘাত করা",
    "english": "to hit, beat",
    "pres": {
      "ich": "schlage",
      "du": "schlägst",
      "erSieEs": "schlägt",
      "wir": "schlagen",
      "ihr": "schlagt",
      "sieSie": "schlagen"
    },
    "past": {
      "ich": "schlug",
      "du": "schlugst",
      "erSieEs": "schlug",
      "wir": "schlugen",
      "ihr": "schlugt",
      "sieSie": "schlugen"
    },
    "p2": "geschlagen",
    "k1": {
      "ich": "schlage",
      "du": "schlagest",
      "erSieEs": "schlage",
      "wir": "schlagen",
      "ihr": "schlaget",
      "sieSie": "schlagen"
    },
    "k2": {
      "ich": "schlügee",
      "du": "schlügeest",
      "erSieEs": "schlügee",
      "wir": "schlügeen",
      "ihr": "schlügeet",
      "sieSie": "schlügeen"
    },
    "imp": {
      "du": "schlag",
      "wir": "schlagen wir",
      "ihr": "schlagt",
      "Sie": "schlagen Sie"
    }
  },
  "schleichen": {
    "type": "irregular",
    "aux": "sein",
    "level": "B1",
    "bangla": "চুপিচুপি হাঁটা",
    "english": "to sneak, creep",
    "pres": {
      "ich": "schleiche",
      "du": "schleichst",
      "erSieEs": "schleicht",
      "wir": "schleichen",
      "ihr": "schleicht",
      "sieSie": "schleichen"
    },
    "past": {
      "ich": "schlich",
      "du": "schlichst",
      "erSieEs": "schlich",
      "wir": "schlichen",
      "ihr": "schlicht",
      "sieSie": "schlichen"
    },
    "p2": "geschlichen",
    "k1": {
      "ich": "schleiche",
      "du": "schleichest",
      "erSieEs": "schleiche",
      "wir": "schleichen",
      "ihr": "schleichet",
      "sieSie": "schleichen"
    },
    "k2": {
      "ich": "schlichee",
      "du": "schlicheest",
      "erSieEs": "schlichee",
      "wir": "schlicheen",
      "ihr": "schlicheet",
      "sieSie": "schlicheen"
    },
    "imp": {
      "du": "schleiche",
      "wir": "schleichen wir",
      "ihr": "schleicht",
      "Sie": "schleichen Sie"
    }
  },
  "schleifen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "ধার দেওয়া / পালিশ করা",
    "english": "to grind, polish",
    "pres": {
      "ich": "schleife",
      "du": "schleifst",
      "erSieEs": "schleift",
      "wir": "schleifen",
      "ihr": "schleift",
      "sieSie": "schleifen"
    },
    "past": {
      "ich": "schliff",
      "du": "schliffst",
      "erSieEs": "schliff",
      "wir": "schliffen",
      "ihr": "schlifft",
      "sieSie": "schliffen"
    },
    "p2": "geschliffen",
    "k1": {
      "ich": "schleife",
      "du": "schleifest",
      "erSieEs": "schleife",
      "wir": "schleifen",
      "ihr": "schleifet",
      "sieSie": "schleifen"
    },
    "k2": {
      "ich": "schliffee",
      "du": "schliffeest",
      "erSieEs": "schliffee",
      "wir": "schliffeen",
      "ihr": "schliffeet",
      "sieSie": "schliffeen"
    },
    "imp": {
      "du": "schleif",
      "wir": "schleifen wir",
      "ihr": "schleift",
      "Sie": "schleifen Sie"
    }
  },
  "schließen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "বন্ধ করা",
    "english": "to close, conclude",
    "pres": {
      "ich": "schließe",
      "du": "schließt",
      "erSieEs": "schließt",
      "wir": "schließen",
      "ihr": "schließt",
      "sieSie": "schließen"
    },
    "past": {
      "ich": "schloss",
      "du": "schlossst",
      "erSieEs": "schloss",
      "wir": "schlossen",
      "ihr": "schlosst",
      "sieSie": "schlossen"
    },
    "p2": "geschlossen",
    "k1": {
      "ich": "schließe",
      "du": "schließest",
      "erSieEs": "schließe",
      "wir": "schließen",
      "ihr": "schließet",
      "sieSie": "schließen"
    },
    "k2": {
      "ich": "schlössee",
      "du": "schlösseest",
      "erSieEs": "schlössee",
      "wir": "schlösseen",
      "ihr": "schlösseet",
      "sieSie": "schlösseen"
    },
    "imp": {
      "du": "schließ",
      "wir": "schließen wir",
      "ihr": "schließt",
      "Sie": "schließen Sie"
    }
  },
  "schlingen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "জড়ানো / গোগ্রাসে গেলা",
    "english": "to loop, swallow",
    "pres": {
      "ich": "schlinge",
      "du": "schlingst",
      "erSieEs": "schlingt",
      "wir": "schlingen",
      "ihr": "schlingt",
      "sieSie": "schlingen"
    },
    "past": {
      "ich": "schlang",
      "du": "schlangst",
      "erSieEs": "schlang",
      "wir": "schlangen",
      "ihr": "schlangt",
      "sieSie": "schlangen"
    },
    "p2": "geschlungen",
    "k1": {
      "ich": "schlinge",
      "du": "schlingest",
      "erSieEs": "schlinge",
      "wir": "schlingen",
      "ihr": "schlinget",
      "sieSie": "schlingen"
    },
    "k2": {
      "ich": "schlängee",
      "du": "schlängeest",
      "erSieEs": "schlängee",
      "wir": "schlängeen",
      "ihr": "schlängeet",
      "sieSie": "schlängeen"
    },
    "imp": {
      "du": "schlinge",
      "wir": "schlingen wir",
      "ihr": "schlingt",
      "Sie": "schlingen Sie"
    }
  },
  "schmeißen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ছুঁড়ে ফেলা",
    "english": "to fling, toss",
    "pres": {
      "ich": "schmeiße",
      "du": "schmeißt",
      "erSieEs": "schmeißt",
      "wir": "schmeißen",
      "ihr": "schmeißt",
      "sieSie": "schmeißen"
    },
    "past": {
      "ich": "schmiss",
      "du": "schmissst",
      "erSieEs": "schmiss",
      "wir": "schmissen",
      "ihr": "schmisst",
      "sieSie": "schmissen"
    },
    "p2": "geschmissen",
    "k1": {
      "ich": "schmeiße",
      "du": "schmeißest",
      "erSieEs": "schmeiße",
      "wir": "schmeißen",
      "ihr": "schmeißet",
      "sieSie": "schmeißen"
    },
    "k2": {
      "ich": "schmissee",
      "du": "schmisseest",
      "erSieEs": "schmissee",
      "wir": "schmisseen",
      "ihr": "schmisseet",
      "sieSie": "schmisseen"
    },
    "imp": {
      "du": "schmeiß",
      "wir": "schmeißen wir",
      "ihr": "schmeißt",
      "Sie": "schmeißen Sie"
    }
  },
  "schmelzen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "গলে যাওয়া",
    "english": "to melt",
    "pres": {
      "ich": "schmelze",
      "du": "schmilzt",
      "erSieEs": "schmilzt",
      "wir": "schmelzen",
      "ihr": "schmelzt",
      "sieSie": "schmelzen"
    },
    "past": {
      "ich": "schmolz",
      "du": "schmolzst",
      "erSieEs": "schmolz",
      "wir": "schmolzen",
      "ihr": "schmolzt",
      "sieSie": "schmolzen"
    },
    "p2": "geschmolzen",
    "k1": {
      "ich": "schmelze",
      "du": "schmelzest",
      "erSieEs": "schmelze",
      "wir": "schmelzen",
      "ihr": "schmelzet",
      "sieSie": "schmelzen"
    },
    "k2": {
      "ich": "schmölzee",
      "du": "schmölzeest",
      "erSieEs": "schmölzee",
      "wir": "schmölzeen",
      "ihr": "schmölzeet",
      "sieSie": "schmölzeen"
    },
    "imp": {
      "du": "schmilz",
      "wir": "schmelzen wir",
      "ihr": "schmelzt",
      "Sie": "schmelzen Sie"
    }
  },
  "schneiden": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "কাটা",
    "english": "to cut",
    "pres": {
      "ich": "schneide",
      "du": "schneidest",
      "erSieEs": "schneidet",
      "wir": "schneiden",
      "ihr": "schneidt",
      "sieSie": "schneiden"
    },
    "past": {
      "ich": "schnitt",
      "du": "schnittest",
      "erSieEs": "schnitt",
      "wir": "schnitten",
      "ihr": "schnittet",
      "sieSie": "schnitten"
    },
    "p2": "geschnitten",
    "k1": {
      "ich": "schneide",
      "du": "schneidest",
      "erSieEs": "schneide",
      "wir": "schneiden",
      "ihr": "schneidet",
      "sieSie": "schneiden"
    },
    "k2": {
      "ich": "schnittee",
      "du": "schnitteest",
      "erSieEs": "schnittee",
      "wir": "schnitteen",
      "ihr": "schnitteet",
      "sieSie": "schnitteen"
    },
    "imp": {
      "du": "schneide",
      "wir": "schneiden wir",
      "ihr": "schneidt",
      "Sie": "schneiden Sie"
    }
  },
  "schreiben": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "লেখা",
    "english": "to write",
    "pres": {
      "ich": "schreibe",
      "du": "schreibst",
      "erSieEs": "schreibt",
      "wir": "schreiben",
      "ihr": "schreibt",
      "sieSie": "schreiben"
    },
    "past": {
      "ich": "schrieb",
      "du": "schriebst",
      "erSieEs": "schrieb",
      "wir": "schrieben",
      "ihr": "schriebt",
      "sieSie": "schrieben"
    },
    "p2": "geschrieben",
    "k1": {
      "ich": "schreibe",
      "du": "schreibest",
      "erSieEs": "schreibe",
      "wir": "schreiben",
      "ihr": "schreibet",
      "sieSie": "schreiben"
    },
    "k2": {
      "ich": "schriebee",
      "du": "schriebeest",
      "erSieEs": "schriebee",
      "wir": "schriebeen",
      "ihr": "schriebeet",
      "sieSie": "schriebeen"
    },
    "imp": {
      "du": "schreib",
      "wir": "schreiben wir",
      "ihr": "schreibt",
      "Sie": "schreiben Sie"
    }
  },
  "schreien": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "চিৎকার করা",
    "english": "to scream, shout",
    "pres": {
      "ich": "schreie",
      "du": "schreist",
      "erSieEs": "schreit",
      "wir": "schreien",
      "ihr": "schreit",
      "sieSie": "schreien"
    },
    "past": {
      "ich": "schrie",
      "du": "schriest",
      "erSieEs": "schrie",
      "wir": "schrieen",
      "ihr": "schriet",
      "sieSie": "schrieen"
    },
    "p2": "geschrien",
    "k1": {
      "ich": "schreie",
      "du": "schreiest",
      "erSieEs": "schreie",
      "wir": "schreien",
      "ihr": "schreiet",
      "sieSie": "schreien"
    },
    "k2": {
      "ich": "schriee",
      "du": "schrieest",
      "erSieEs": "schriee",
      "wir": "schrieen",
      "ihr": "schrieet",
      "sieSie": "schrieen"
    },
    "imp": {
      "du": "schrei",
      "wir": "schreien wir",
      "ihr": "schreit",
      "Sie": "schreien Sie"
    }
  },
  "schreiten": {
    "type": "irregular",
    "aux": "sein",
    "level": "B2",
    "bangla": "ধীর পদক্ষেপে হাঁটা",
    "english": "to stride, step",
    "pres": {
      "ich": "schreite",
      "du": "schreitest",
      "erSieEs": "schreitet",
      "wir": "schreiten",
      "ihr": "schreitt",
      "sieSie": "schreiten"
    },
    "past": {
      "ich": "schritt",
      "du": "schrittest",
      "erSieEs": "schritt",
      "wir": "schritten",
      "ihr": "schrittet",
      "sieSie": "schritten"
    },
    "p2": "geschritten",
    "k1": {
      "ich": "schreite",
      "du": "schreitest",
      "erSieEs": "schreite",
      "wir": "schreiten",
      "ihr": "schreitet",
      "sieSie": "schreiten"
    },
    "k2": {
      "ich": "schrittee",
      "du": "schritteest",
      "erSieEs": "schrittee",
      "wir": "schritteen",
      "ihr": "schritteet",
      "sieSie": "schritteen"
    },
    "imp": {
      "du": "schreite",
      "wir": "schreiten wir",
      "ihr": "schreitt",
      "Sie": "schreiten Sie"
    }
  },
  "schweigen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "নীরব থাকা",
    "english": "to remain silent",
    "pres": {
      "ich": "schweige",
      "du": "schweigst",
      "erSieEs": "schweigt",
      "wir": "schweigen",
      "ihr": "schweigt",
      "sieSie": "schweigen"
    },
    "past": {
      "ich": "schwieg",
      "du": "schwiegst",
      "erSieEs": "schwieg",
      "wir": "schwiegen",
      "ihr": "schwiegt",
      "sieSie": "schwiegen"
    },
    "p2": "geschwiegen",
    "k1": {
      "ich": "schweige",
      "du": "schweigest",
      "erSieEs": "schweige",
      "wir": "schweigen",
      "ihr": "schweiget",
      "sieSie": "schweigen"
    },
    "k2": {
      "ich": "schwiegee",
      "du": "schwiegeest",
      "erSieEs": "schwiegee",
      "wir": "schwiegeen",
      "ihr": "schwiegeet",
      "sieSie": "schwiegeen"
    },
    "imp": {
      "du": "schweig",
      "wir": "schweigen wir",
      "ihr": "schweigt",
      "Sie": "schweigen Sie"
    }
  },
  "schwellen": {
    "type": "irregular",
    "aux": "sein",
    "level": "B2",
    "bangla": "ফোলা / বৃদ্ধি পাওয়া",
    "english": "to swell",
    "pres": {
      "ich": "schwelle",
      "du": "schwillst",
      "erSieEs": "schwillt",
      "wir": "schwellen",
      "ihr": "schwellt",
      "sieSie": "schwellen"
    },
    "past": {
      "ich": "schwoll",
      "du": "schwollst",
      "erSieEs": "schwoll",
      "wir": "schwollen",
      "ihr": "schwollt",
      "sieSie": "schwollen"
    },
    "p2": "geschwollen",
    "k1": {
      "ich": "schwelle",
      "du": "schwellest",
      "erSieEs": "schwelle",
      "wir": "schwellen",
      "ihr": "schwellet",
      "sieSie": "schwellen"
    },
    "k2": {
      "ich": "schwöllee",
      "du": "schwölleest",
      "erSieEs": "schwöllee",
      "wir": "schwölleen",
      "ihr": "schwölleet",
      "sieSie": "schwölleen"
    },
    "imp": {
      "du": "schwill",
      "wir": "schwellen wir",
      "ihr": "schwellt",
      "Sie": "schwellen Sie"
    }
  },
  "schwimmen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A1",
    "bangla": "সাঁতার কাটা",
    "english": "to swim",
    "pres": {
      "ich": "schwimme",
      "du": "schwimmst",
      "erSieEs": "schwimmt",
      "wir": "schwimmen",
      "ihr": "schwimmt",
      "sieSie": "schwimmen"
    },
    "past": {
      "ich": "schwamm",
      "du": "schwammst",
      "erSieEs": "schwamm",
      "wir": "schwammen",
      "ihr": "schwammt",
      "sieSie": "schwammen"
    },
    "p2": "geschwommen",
    "k1": {
      "ich": "schwimme",
      "du": "schwimmest",
      "erSieEs": "schwimme",
      "wir": "schwimmen",
      "ihr": "schwimmet",
      "sieSie": "schwimmen"
    },
    "k2": {
      "ich": "schwömmee",
      "du": "schwömmeest",
      "erSieEs": "schwömmee",
      "wir": "schwömmeen",
      "ihr": "schwömmeet",
      "sieSie": "schwömmeen"
    },
    "imp": {
      "du": "schwimm",
      "wir": "schwimmen wir",
      "ihr": "schwimmt",
      "Sie": "schwimmen Sie"
    }
  },
  "schwinden": {
    "type": "irregular",
    "aux": "sein",
    "level": "B2",
    "bangla": "বিলীন হওয়া / হ্রাস পাওয়া",
    "english": "to dwindle, disappear",
    "pres": {
      "ich": "schwinde",
      "du": "schwindest",
      "erSieEs": "schwindet",
      "wir": "schwinden",
      "ihr": "schwindt",
      "sieSie": "schwinden"
    },
    "past": {
      "ich": "schwand",
      "du": "schwandest",
      "erSieEs": "schwand",
      "wir": "schwanden",
      "ihr": "schwandet",
      "sieSie": "schwanden"
    },
    "p2": "geschwunden",
    "k1": {
      "ich": "schwinde",
      "du": "schwindest",
      "erSieEs": "schwinde",
      "wir": "schwinden",
      "ihr": "schwindet",
      "sieSie": "schwinden"
    },
    "k2": {
      "ich": "schwändee",
      "du": "schwändeest",
      "erSieEs": "schwändee",
      "wir": "schwändeen",
      "ihr": "schwändeet",
      "sieSie": "schwändeen"
    },
    "imp": {
      "du": "schwinde",
      "wir": "schwinden wir",
      "ihr": "schwindt",
      "Sie": "schwinden Sie"
    }
  },
  "schwingen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "দোলানো / কম্পিত হওয়া",
    "english": "to swing, vibrate",
    "pres": {
      "ich": "schwinge",
      "du": "schwingst",
      "erSieEs": "schwingt",
      "wir": "schwingen",
      "ihr": "schwingt",
      "sieSie": "schwingen"
    },
    "past": {
      "ich": "schwang",
      "du": "schwangst",
      "erSieEs": "schwang",
      "wir": "schwangen",
      "ihr": "schwangt",
      "sieSie": "schwangen"
    },
    "p2": "geschwungen",
    "k1": {
      "ich": "schwinge",
      "du": "schwingest",
      "erSieEs": "schwinge",
      "wir": "schwingen",
      "ihr": "schwinget",
      "sieSie": "schwingen"
    },
    "k2": {
      "ich": "schwängee",
      "du": "schwängeest",
      "erSieEs": "schwängee",
      "wir": "schwängeen",
      "ihr": "schwängeet",
      "sieSie": "schwängeen"
    },
    "imp": {
      "du": "schwinge",
      "wir": "schwingen wir",
      "ihr": "schwingt",
      "Sie": "schwingen Sie"
    }
  },
  "schwören": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "শপথ করা",
    "english": "to swear, vow",
    "pres": {
      "ich": "schwöre",
      "du": "schwörst",
      "erSieEs": "schwört",
      "wir": "schwören",
      "ihr": "schwört",
      "sieSie": "schwören"
    },
    "past": {
      "ich": "schwur",
      "du": "schwurst",
      "erSieEs": "schwur",
      "wir": "schwuren",
      "ihr": "schwurt",
      "sieSie": "schwuren"
    },
    "p2": "geschworen",
    "k1": {
      "ich": "schwöre",
      "du": "schwörest",
      "erSieEs": "schwöre",
      "wir": "schwören",
      "ihr": "schwöret",
      "sieSie": "schwören"
    },
    "k2": {
      "ich": "schwüree",
      "du": "schwüreest",
      "erSieEs": "schwüree",
      "wir": "schwüreen",
      "ihr": "schwüreet",
      "sieSie": "schwüreen"
    },
    "imp": {
      "du": "schwör",
      "wir": "schwören wir",
      "ihr": "schwört",
      "Sie": "schwören Sie"
    }
  },
  "sehen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "দেখা",
    "english": "to see",
    "pres": {
      "ich": "sehe",
      "du": "siehst",
      "erSieEs": "sieht",
      "wir": "sehen",
      "ihr": "seht",
      "sieSie": "sehen"
    },
    "past": {
      "ich": "sah",
      "du": "sahst",
      "erSieEs": "sah",
      "wir": "sahen",
      "ihr": "saht",
      "sieSie": "sahen"
    },
    "p2": "gesehen",
    "k1": {
      "ich": "sehe",
      "du": "sehest",
      "erSieEs": "sehe",
      "wir": "sehen",
      "ihr": "sehet",
      "sieSie": "sehen"
    },
    "k2": {
      "ich": "sähee",
      "du": "säheest",
      "erSieEs": "sähee",
      "wir": "säheen",
      "ihr": "säheet",
      "sieSie": "säheen"
    },
    "imp": {
      "du": "sieh",
      "wir": "sehen wir",
      "ihr": "seht",
      "Sie": "sehen Sie"
    }
  },
  "senden": {
    "type": "mixed",
    "aux": "haben",
    "level": "A2",
    "bangla": "পাঠানো / সম্প্রচার করা",
    "english": "to send, broadcast",
    "pres": {
      "ich": "sende",
      "du": "sendest",
      "erSieEs": "sendet",
      "wir": "senden",
      "ihr": "sendt",
      "sieSie": "senden"
    },
    "past": {
      "ich": "sandte",
      "du": "sandtest",
      "erSieEs": "sandte",
      "wir": "sandteen",
      "ihr": "sandtet",
      "sieSie": "sandteen"
    },
    "p2": "gesandt",
    "k1": {
      "ich": "sende",
      "du": "sendest",
      "erSieEs": "sende",
      "wir": "senden",
      "ihr": "sendet",
      "sieSie": "senden"
    },
    "k2": {
      "ich": "sendetee",
      "du": "sendeteest",
      "erSieEs": "sendetee",
      "wir": "sendeteen",
      "ihr": "sendeteet",
      "sieSie": "sendeteen"
    },
    "imp": {
      "du": "sende",
      "wir": "senden wir",
      "ihr": "sendt",
      "Sie": "senden Sie"
    }
  },
  "sieden": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "ফুটানো",
    "english": "to simmer, boil",
    "pres": {
      "ich": "siede",
      "du": "siedest",
      "erSieEs": "siedet",
      "wir": "sieden",
      "ihr": "siedt",
      "sieSie": "sieden"
    },
    "past": {
      "ich": "sott",
      "du": "sottest",
      "erSieEs": "sott",
      "wir": "sotten",
      "ihr": "sottet",
      "sieSie": "sotten"
    },
    "p2": "gesotten",
    "k1": {
      "ich": "siede",
      "du": "siedest",
      "erSieEs": "siede",
      "wir": "sieden",
      "ihr": "siedet",
      "sieSie": "sieden"
    },
    "k2": {
      "ich": "söttee",
      "du": "sötteest",
      "erSieEs": "söttee",
      "wir": "sötteen",
      "ihr": "sötteet",
      "sieSie": "sötteen"
    },
    "imp": {
      "du": "siede",
      "wir": "sieden wir",
      "ihr": "siedt",
      "Sie": "sieden Sie"
    }
  },
  "singen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "গান গাওয়া",
    "english": "to sing",
    "pres": {
      "ich": "singe",
      "du": "singst",
      "erSieEs": "singt",
      "wir": "singen",
      "ihr": "singt",
      "sieSie": "singen"
    },
    "past": {
      "ich": "sang",
      "du": "sangst",
      "erSieEs": "sang",
      "wir": "sangen",
      "ihr": "sangt",
      "sieSie": "sangen"
    },
    "p2": "gesungen",
    "k1": {
      "ich": "singe",
      "du": "singest",
      "erSieEs": "singe",
      "wir": "singen",
      "ihr": "singet",
      "sieSie": "singen"
    },
    "k2": {
      "ich": "sängee",
      "du": "sängeest",
      "erSieEs": "sängee",
      "wir": "sängeen",
      "ihr": "sängeet",
      "sieSie": "sängeen"
    },
    "imp": {
      "du": "sing",
      "wir": "singen wir",
      "ihr": "singt",
      "Sie": "singen Sie"
    }
  },
  "sinken": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "ডুবে যাওয়া / কমে যাওয়া",
    "english": "to sink, decrease",
    "pres": {
      "ich": "sinke",
      "du": "sinkst",
      "erSieEs": "sinkt",
      "wir": "sinken",
      "ihr": "sinkt",
      "sieSie": "sinken"
    },
    "past": {
      "ich": "sank",
      "du": "sankst",
      "erSieEs": "sank",
      "wir": "sanken",
      "ihr": "sankt",
      "sieSie": "sanken"
    },
    "p2": "gesunken",
    "k1": {
      "ich": "sinke",
      "du": "sinkest",
      "erSieEs": "sinke",
      "wir": "sinken",
      "ihr": "sinket",
      "sieSie": "sinken"
    },
    "k2": {
      "ich": "sänkee",
      "du": "sänkeest",
      "erSieEs": "sänkee",
      "wir": "sänkeen",
      "ihr": "sänkeet",
      "sieSie": "sänkeen"
    },
    "imp": {
      "du": "sink",
      "wir": "sinken wir",
      "ihr": "sinkt",
      "Sie": "sinken Sie"
    }
  },
  "sinnen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "গভীর চিন্তা করা",
    "english": "to meditate, ponder",
    "pres": {
      "ich": "sinne",
      "du": "sinnst",
      "erSieEs": "sinnt",
      "wir": "sinnen",
      "ihr": "sinnt",
      "sieSie": "sinnen"
    },
    "past": {
      "ich": "sann",
      "du": "sannst",
      "erSieEs": "sann",
      "wir": "sannen",
      "ihr": "sannt",
      "sieSie": "sannen"
    },
    "p2": "gesonnen",
    "k1": {
      "ich": "sinne",
      "du": "sinnest",
      "erSieEs": "sinne",
      "wir": "sinnen",
      "ihr": "sinnet",
      "sieSie": "sinnen"
    },
    "k2": {
      "ich": "sännee",
      "du": "sänneest",
      "erSieEs": "sännee",
      "wir": "sänneen",
      "ihr": "sänneet",
      "sieSie": "sänneen"
    },
    "imp": {
      "du": "sinne",
      "wir": "sinnen wir",
      "ihr": "sinnt",
      "Sie": "sinnen Sie"
    }
  },
  "sitzen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "বসা",
    "english": "to sit",
    "pres": {
      "ich": "sitze",
      "du": "sitzt",
      "erSieEs": "sitzt",
      "wir": "sitzen",
      "ihr": "sitzt",
      "sieSie": "sitzen"
    },
    "past": {
      "ich": "saß",
      "du": "saßst",
      "erSieEs": "saß",
      "wir": "saßen",
      "ihr": "saßt",
      "sieSie": "saßen"
    },
    "p2": "gesessen",
    "k1": {
      "ich": "sitze",
      "du": "sitzest",
      "erSieEs": "sitze",
      "wir": "sitzen",
      "ihr": "sitzet",
      "sieSie": "sitzen"
    },
    "k2": {
      "ich": "säßee",
      "du": "säßeest",
      "erSieEs": "säßee",
      "wir": "säßeen",
      "ihr": "säßeet",
      "sieSie": "säßeen"
    },
    "imp": {
      "du": "sitz",
      "wir": "sitzen wir",
      "ihr": "sitzt",
      "Sie": "sitzen Sie"
    }
  },
  "spalten": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "বিভক্ত করা / ফালা করা",
    "english": "to split",
    "pres": {
      "ich": "spalte",
      "du": "spaltest",
      "erSieEs": "spaltet",
      "wir": "spalten",
      "ihr": "spaltt",
      "sieSie": "spalten"
    },
    "past": {
      "ich": "spaltete",
      "du": "spaltetest",
      "erSieEs": "spaltete",
      "wir": "spalteteen",
      "ihr": "spaltetet",
      "sieSie": "spalteteen"
    },
    "p2": "gespalten",
    "k1": {
      "ich": "spalte",
      "du": "spaltest",
      "erSieEs": "spalte",
      "wir": "spalten",
      "ihr": "spaltet",
      "sieSie": "spalten"
    },
    "k2": {
      "ich": "spaltetee",
      "du": "spalteteest",
      "erSieEs": "spaltetee",
      "wir": "spalteteen",
      "ihr": "spalteteet",
      "sieSie": "spalteteen"
    },
    "imp": {
      "du": "spalte",
      "wir": "spalten wir",
      "ihr": "spaltt",
      "Sie": "spalten Sie"
    }
  },
  "speien": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "থুথু ফেলা / উদগীরণ করা",
    "english": "to spit, spew",
    "pres": {
      "ich": "speie",
      "du": "speist",
      "erSieEs": "speit",
      "wir": "speien",
      "ihr": "speit",
      "sieSie": "speien"
    },
    "past": {
      "ich": "spie",
      "du": "spiest",
      "erSieEs": "spie",
      "wir": "spieen",
      "ihr": "spiet",
      "sieSie": "spieen"
    },
    "p2": "gespien",
    "k1": {
      "ich": "speie",
      "du": "speiest",
      "erSieEs": "speie",
      "wir": "speien",
      "ihr": "speiet",
      "sieSie": "speien"
    },
    "k2": {
      "ich": "spiee",
      "du": "spieest",
      "erSieEs": "spiee",
      "wir": "spieen",
      "ihr": "spieet",
      "sieSie": "spieen"
    },
    "imp": {
      "du": "spei",
      "wir": "speien wir",
      "ihr": "speit",
      "Sie": "speien Sie"
    }
  },
  "spinnen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "সুতা কাটা / পাগল হওয়া",
    "english": "to spin, be crazy",
    "pres": {
      "ich": "spinne",
      "du": "spinnst",
      "erSieEs": "spinnt",
      "wir": "spinnen",
      "ihr": "spinnt",
      "sieSie": "spinnen"
    },
    "past": {
      "ich": "spann",
      "du": "spannst",
      "erSieEs": "spann",
      "wir": "spannen",
      "ihr": "spannt",
      "sieSie": "spannen"
    },
    "p2": "gesponnen",
    "k1": {
      "ich": "spinne",
      "du": "spinnest",
      "erSieEs": "spinne",
      "wir": "spinnen",
      "ihr": "spinnet",
      "sieSie": "spinnen"
    },
    "k2": {
      "ich": "spännee",
      "du": "spänneest",
      "erSieEs": "spännee",
      "wir": "spänneen",
      "ihr": "spänneet",
      "sieSie": "spänneen"
    },
    "imp": {
      "du": "spinn",
      "wir": "spinnen wir",
      "ihr": "spinnt",
      "Sie": "spinnen Sie"
    }
  },
  "sprechen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "কথা বলা",
    "english": "to speak",
    "pres": {
      "ich": "spreche",
      "du": "sprichst",
      "erSieEs": "spricht",
      "wir": "sprechen",
      "ihr": "sprecht",
      "sieSie": "sprechen"
    },
    "past": {
      "ich": "sprach",
      "du": "sprachst",
      "erSieEs": "sprach",
      "wir": "sprachen",
      "ihr": "spracht",
      "sieSie": "sprachen"
    },
    "p2": "gesprochen",
    "k1": {
      "ich": "spreche",
      "du": "sprechest",
      "erSieEs": "spreche",
      "wir": "sprechen",
      "ihr": "sprechet",
      "sieSie": "sprechen"
    },
    "k2": {
      "ich": "sprächee",
      "du": "sprächeest",
      "erSieEs": "sprächee",
      "wir": "sprächeen",
      "ihr": "sprächeet",
      "sieSie": "sprächeen"
    },
    "imp": {
      "du": "sprich",
      "wir": "sprechen wir",
      "ihr": "sprecht",
      "Sie": "sprechen Sie"
    }
  },
  "sprießen": {
    "type": "irregular",
    "aux": "sein",
    "level": "B2",
    "bangla": "অঙ্কুরিত হওয়া",
    "english": "to sprout",
    "pres": {
      "ich": "sprieße",
      "du": "sprießt",
      "erSieEs": "sprießt",
      "wir": "sprießen",
      "ihr": "sprießt",
      "sieSie": "sprießen"
    },
    "past": {
      "ich": "spross",
      "du": "sprossst",
      "erSieEs": "spross",
      "wir": "sprossen",
      "ihr": "sprosst",
      "sieSie": "sprossen"
    },
    "p2": "gesprossen",
    "k1": {
      "ich": "sprieße",
      "du": "sprießest",
      "erSieEs": "sprieße",
      "wir": "sprießen",
      "ihr": "sprießet",
      "sieSie": "sprießen"
    },
    "k2": {
      "ich": "sprössee",
      "du": "sprösseest",
      "erSieEs": "sprössee",
      "wir": "sprösseen",
      "ihr": "sprösseet",
      "sieSie": "sprösseen"
    },
    "imp": {
      "du": "sprieße",
      "wir": "sprießen wir",
      "ihr": "sprießt",
      "Sie": "sprießen Sie"
    }
  },
  "springen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "লাফানো",
    "english": "to jump",
    "pres": {
      "ich": "springe",
      "du": "springst",
      "erSieEs": "springt",
      "wir": "springen",
      "ihr": "springt",
      "sieSie": "springen"
    },
    "past": {
      "ich": "sprang",
      "du": "sprangst",
      "erSieEs": "sprang",
      "wir": "sprangen",
      "ihr": "sprangt",
      "sieSie": "sprangen"
    },
    "p2": "gesprungen",
    "k1": {
      "ich": "springe",
      "du": "springest",
      "erSieEs": "springe",
      "wir": "springen",
      "ihr": "springet",
      "sieSie": "springen"
    },
    "k2": {
      "ich": "sprängee",
      "du": "sprängeest",
      "erSieEs": "sprängee",
      "wir": "sprängeen",
      "ihr": "sprängeet",
      "sieSie": "sprängeen"
    },
    "imp": {
      "du": "spring",
      "wir": "springen wir",
      "ihr": "springt",
      "Sie": "springen Sie"
    }
  },
  "stechen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "হুল ফোটানো / খোঁচানো",
    "english": "to sting, prick",
    "pres": {
      "ich": "steche",
      "du": "stichst",
      "erSieEs": "sticht",
      "wir": "stechen",
      "ihr": "stecht",
      "sieSie": "stechen"
    },
    "past": {
      "ich": "stach",
      "du": "stachst",
      "erSieEs": "stach",
      "wir": "stachen",
      "ihr": "stacht",
      "sieSie": "stachen"
    },
    "p2": "gestochen",
    "k1": {
      "ich": "steche",
      "du": "stechest",
      "erSieEs": "steche",
      "wir": "stechen",
      "ihr": "stechet",
      "sieSie": "stechen"
    },
    "k2": {
      "ich": "stächee",
      "du": "stächeest",
      "erSieEs": "stächee",
      "wir": "stächeen",
      "ihr": "stächeet",
      "sieSie": "stächeen"
    },
    "imp": {
      "du": "stich",
      "wir": "stechen wir",
      "ihr": "stecht",
      "Sie": "stechen Sie"
    }
  },
  "stecken": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "গুঁজে রাখা / আটকে থাকা",
    "english": "to stick, put",
    "pres": {
      "ich": "stecke",
      "du": "steckst",
      "erSieEs": "steckt",
      "wir": "stecken",
      "ihr": "steckt",
      "sieSie": "stecken"
    },
    "past": {
      "ich": "steckte",
      "du": "stecktest",
      "erSieEs": "steckte",
      "wir": "steckteen",
      "ihr": "stecktet",
      "sieSie": "steckteen"
    },
    "p2": "gesteckt",
    "k1": {
      "ich": "stecke",
      "du": "steckest",
      "erSieEs": "stecke",
      "wir": "stecken",
      "ihr": "stecket",
      "sieSie": "stecken"
    },
    "k2": {
      "ich": "stecktee",
      "du": "steckteest",
      "erSieEs": "stecktee",
      "wir": "steckteen",
      "ihr": "steckteet",
      "sieSie": "steckteen"
    },
    "imp": {
      "du": "steck",
      "wir": "stecken wir",
      "ihr": "steckt",
      "Sie": "stecken Sie"
    }
  },
  "stehen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "দাঁড়ানো",
    "english": "to stand",
    "pres": {
      "ich": "stehe",
      "du": "stehst",
      "erSieEs": "steht",
      "wir": "stehen",
      "ihr": "steht",
      "sieSie": "stehen"
    },
    "past": {
      "ich": "stand",
      "du": "standest",
      "erSieEs": "stand",
      "wir": "standen",
      "ihr": "standet",
      "sieSie": "standen"
    },
    "p2": "gestanden",
    "k1": {
      "ich": "stehe",
      "du": "stehest",
      "erSieEs": "stehe",
      "wir": "stehen",
      "ihr": "stehet",
      "sieSie": "stehen"
    },
    "k2": {
      "ich": "ständee",
      "du": "ständeest",
      "erSieEs": "ständee",
      "wir": "ständeen",
      "ihr": "ständeet",
      "sieSie": "ständeen"
    },
    "imp": {
      "du": "steh",
      "wir": "stehen wir",
      "ihr": "steht",
      "Sie": "stehen Sie"
    }
  },
  "stehlen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "চুরি করা",
    "english": "to steal",
    "pres": {
      "ich": "stehle",
      "du": "stiehlst",
      "erSieEs": "stiehlt",
      "wir": "stehlen",
      "ihr": "stehlt",
      "sieSie": "stehlen"
    },
    "past": {
      "ich": "stahl",
      "du": "stahlst",
      "erSieEs": "stahl",
      "wir": "stahlen",
      "ihr": "stahlt",
      "sieSie": "stahlen"
    },
    "p2": "gestohlen",
    "k1": {
      "ich": "stehle",
      "du": "stehlest",
      "erSieEs": "stehle",
      "wir": "stehlen",
      "ihr": "stehlet",
      "sieSie": "stehlen"
    },
    "k2": {
      "ich": "stählee",
      "du": "stähleest",
      "erSieEs": "stählee",
      "wir": "stähleen",
      "ihr": "stähleet",
      "sieSie": "stähleen"
    },
    "imp": {
      "du": "stiehl",
      "wir": "stehlen wir",
      "ihr": "stehlt",
      "Sie": "stehlen Sie"
    }
  },
  "steigen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "ওঠা / চড়া",
    "english": "to climb, increase",
    "pres": {
      "ich": "steige",
      "du": "steigst",
      "erSieEs": "steigt",
      "wir": "steigen",
      "ihr": "steigt",
      "sieSie": "steigen"
    },
    "past": {
      "ich": "stieg",
      "du": "stiegst",
      "erSieEs": "stieg",
      "wir": "stiegen",
      "ihr": "stiegt",
      "sieSie": "stiegen"
    },
    "p2": "gestiegen",
    "k1": {
      "ich": "steige",
      "du": "steigest",
      "erSieEs": "steige",
      "wir": "steigen",
      "ihr": "steiget",
      "sieSie": "steigen"
    },
    "k2": {
      "ich": "stiegee",
      "du": "stiegeest",
      "erSieEs": "stiegee",
      "wir": "stiegeen",
      "ihr": "stiegeet",
      "sieSie": "stiegeen"
    },
    "imp": {
      "du": "steig",
      "wir": "steigen wir",
      "ihr": "steigt",
      "Sie": "steigen Sie"
    }
  },
  "sterben": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "মারা যাওয়া",
    "english": "to die",
    "pres": {
      "ich": "sterbe",
      "du": "stirbst",
      "erSieEs": "stirbt",
      "wir": "sterben",
      "ihr": "sterbt",
      "sieSie": "sterben"
    },
    "past": {
      "ich": "starb",
      "du": "starbst",
      "erSieEs": "starb",
      "wir": "starben",
      "ihr": "starbt",
      "sieSie": "starben"
    },
    "p2": "gestorben",
    "k1": {
      "ich": "sterbe",
      "du": "sterbest",
      "erSieEs": "sterbe",
      "wir": "sterben",
      "ihr": "sterbet",
      "sieSie": "sterben"
    },
    "k2": {
      "ich": "stürbee",
      "du": "stürbeest",
      "erSieEs": "stürbee",
      "wir": "stürbeen",
      "ihr": "stürbeet",
      "sieSie": "stürbeen"
    },
    "imp": {
      "du": "stirb",
      "wir": "sterben wir",
      "ihr": "sterbt",
      "Sie": "sterben Sie"
    }
  },
  "stinken": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "দুর্গন্ধ ছড়ানো",
    "english": "to stink",
    "pres": {
      "ich": "stinke",
      "du": "stinkst",
      "erSieEs": "stinkt",
      "wir": "stinken",
      "ihr": "stinkt",
      "sieSie": "stinken"
    },
    "past": {
      "ich": "stank",
      "du": "stankst",
      "erSieEs": "stank",
      "wir": "stanken",
      "ihr": "stankt",
      "sieSie": "stanken"
    },
    "p2": "gestunken",
    "k1": {
      "ich": "stinke",
      "du": "stinkest",
      "erSieEs": "stinke",
      "wir": "stinken",
      "ihr": "stinket",
      "sieSie": "stinken"
    },
    "k2": {
      "ich": "stänkee",
      "du": "stänkeest",
      "erSieEs": "stänkee",
      "wir": "stänkeen",
      "ihr": "stänkeet",
      "sieSie": "stänkeen"
    },
    "imp": {
      "du": "stink",
      "wir": "stinken wir",
      "ihr": "stinkt",
      "Sie": "stinken Sie"
    }
  },
  "stoßen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ধাক্কা দেওয়া",
    "english": "to bump, push",
    "pres": {
      "ich": "stoße",
      "du": "stößt",
      "erSieEs": "stößt",
      "wir": "stoßen",
      "ihr": "stoßt",
      "sieSie": "stoßen"
    },
    "past": {
      "ich": "stieß",
      "du": "stießst",
      "erSieEs": "stieß",
      "wir": "stießen",
      "ihr": "stießt",
      "sieSie": "stießen"
    },
    "p2": "gestoßen",
    "k1": {
      "ich": "stoße",
      "du": "stoßest",
      "erSieEs": "stoße",
      "wir": "stoßen",
      "ihr": "stoßet",
      "sieSie": "stoßen"
    },
    "k2": {
      "ich": "stießee",
      "du": "stießeest",
      "erSieEs": "stießee",
      "wir": "stießeen",
      "ihr": "stießeet",
      "sieSie": "stießeen"
    },
    "imp": {
      "du": "stoß",
      "wir": "stoßen wir",
      "ihr": "stoßt",
      "Sie": "stoßen Sie"
    }
  },
  "streichen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "রং করা / বাতিল করা",
    "english": "to paint, strike/cancel",
    "pres": {
      "ich": "streiche",
      "du": "streichst",
      "erSieEs": "streicht",
      "wir": "streichen",
      "ihr": "streicht",
      "sieSie": "streichen"
    },
    "past": {
      "ich": "strich",
      "du": "strichst",
      "erSieEs": "strich",
      "wir": "strichen",
      "ihr": "stricht",
      "sieSie": "strichen"
    },
    "p2": "gestrichen",
    "k1": {
      "ich": "streiche",
      "du": "streichest",
      "erSieEs": "streiche",
      "wir": "streichen",
      "ihr": "streichet",
      "sieSie": "streichen"
    },
    "k2": {
      "ich": "strichee",
      "du": "stricheest",
      "erSieEs": "strichee",
      "wir": "stricheen",
      "ihr": "stricheet",
      "sieSie": "stricheen"
    },
    "imp": {
      "du": "streich",
      "wir": "streichen wir",
      "ihr": "streicht",
      "Sie": "streichen Sie"
    }
  },
  "streiten": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "তর্ক বা ঝগড়া করা",
    "english": "to argue, fight",
    "pres": {
      "ich": "streite",
      "du": "streitest",
      "erSieEs": "streitet",
      "wir": "streiten",
      "ihr": "streitt",
      "sieSie": "streiten"
    },
    "past": {
      "ich": "stritt",
      "du": "strittest",
      "erSieEs": "stritt",
      "wir": "stritten",
      "ihr": "strittet",
      "sieSie": "stritten"
    },
    "p2": "gestritten",
    "k1": {
      "ich": "streite",
      "du": "streitest",
      "erSieEs": "streite",
      "wir": "streiten",
      "ihr": "streitet",
      "sieSie": "streiten"
    },
    "k2": {
      "ich": "strittee",
      "du": "stritteest",
      "erSieEs": "strittee",
      "wir": "stritteen",
      "ihr": "stritteet",
      "sieSie": "stritteen"
    },
    "imp": {
      "du": "streite",
      "wir": "streiten wir",
      "ihr": "streitt",
      "Sie": "streiten Sie"
    }
  },
  "tragen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "বহন করা / পরা",
    "english": "to carry, wear",
    "pres": {
      "ich": "trage",
      "du": "trägst",
      "erSieEs": "trägt",
      "wir": "tragen",
      "ihr": "tragt",
      "sieSie": "tragen"
    },
    "past": {
      "ich": "trug",
      "du": "trugst",
      "erSieEs": "trug",
      "wir": "trugen",
      "ihr": "trugt",
      "sieSie": "trugen"
    },
    "p2": "getragen",
    "k1": {
      "ich": "trage",
      "du": "tragest",
      "erSieEs": "trage",
      "wir": "tragen",
      "ihr": "traget",
      "sieSie": "tragen"
    },
    "k2": {
      "ich": "trügee",
      "du": "trügeest",
      "erSieEs": "trügee",
      "wir": "trügeen",
      "ihr": "trügeet",
      "sieSie": "trügeen"
    },
    "imp": {
      "du": "trag",
      "wir": "tragen wir",
      "ihr": "tragt",
      "Sie": "tragen Sie"
    }
  },
  "treffen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "সাক্ষাৎ করা",
    "english": "to meet",
    "pres": {
      "ich": "treffe",
      "du": "triffst",
      "erSieEs": "trifft",
      "wir": "treffen",
      "ihr": "trefft",
      "sieSie": "treffen"
    },
    "past": {
      "ich": "traf",
      "du": "trafst",
      "erSieEs": "traf",
      "wir": "trafen",
      "ihr": "traft",
      "sieSie": "trafen"
    },
    "p2": "getroffen",
    "k1": {
      "ich": "treffe",
      "du": "treffest",
      "erSieEs": "treffe",
      "wir": "treffen",
      "ihr": "treffet",
      "sieSie": "treffen"
    },
    "k2": {
      "ich": "träfee",
      "du": "träfeest",
      "erSieEs": "träfee",
      "wir": "träfeen",
      "ihr": "träfeet",
      "sieSie": "träfeen"
    },
    "imp": {
      "du": "triff",
      "wir": "treffen wir",
      "ihr": "trefft",
      "Sie": "treffen Sie"
    }
  },
  "treiben": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "চালিত করা / চর্চা করা",
    "english": "to drive, do (sports)",
    "pres": {
      "ich": "treibe",
      "du": "treibst",
      "erSieEs": "treibt",
      "wir": "treiben",
      "ihr": "treibt",
      "sieSie": "treiben"
    },
    "past": {
      "ich": "trieb",
      "du": "triebst",
      "erSieEs": "trieb",
      "wir": "trieben",
      "ihr": "triebt",
      "sieSie": "trieben"
    },
    "p2": "getrieben",
    "k1": {
      "ich": "treibe",
      "du": "treibest",
      "erSieEs": "treibe",
      "wir": "treiben",
      "ihr": "treibet",
      "sieSie": "treiben"
    },
    "k2": {
      "ich": "triebee",
      "du": "triebeest",
      "erSieEs": "triebee",
      "wir": "triebeen",
      "ihr": "triebeet",
      "sieSie": "triebeen"
    },
    "imp": {
      "du": "treib",
      "wir": "treiben wir",
      "ihr": "treibt",
      "Sie": "treiben Sie"
    }
  },
  "treten": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "পা রাখা / লাথি মারা",
    "english": "to step, kick",
    "pres": {
      "ich": "trete",
      "du": "trittst",
      "erSieEs": "tritt",
      "wir": "treten",
      "ihr": "trett",
      "sieSie": "treten"
    },
    "past": {
      "ich": "trat",
      "du": "tratest",
      "erSieEs": "trat",
      "wir": "traten",
      "ihr": "tratet",
      "sieSie": "traten"
    },
    "p2": "getreten",
    "k1": {
      "ich": "trete",
      "du": "tretest",
      "erSieEs": "trete",
      "wir": "treten",
      "ihr": "tretet",
      "sieSie": "treten"
    },
    "k2": {
      "ich": "trätee",
      "du": "träteest",
      "erSieEs": "trätee",
      "wir": "träteen",
      "ihr": "träteet",
      "sieSie": "träteen"
    },
    "imp": {
      "du": "tritt",
      "wir": "treten wir",
      "ihr": "trett",
      "Sie": "treten Sie"
    }
  },
  "trinken": {
    "type": "irregular",
    "aux": "haben",
    "level": "A1",
    "bangla": "পান করা",
    "english": "to drink",
    "pres": {
      "ich": "trinke",
      "du": "trinkst",
      "erSieEs": "trinkt",
      "wir": "trinken",
      "ihr": "trinkt",
      "sieSie": "trinken"
    },
    "past": {
      "ich": "trank",
      "du": "trankst",
      "erSieEs": "trank",
      "wir": "tranken",
      "ihr": "trankt",
      "sieSie": "tranken"
    },
    "p2": "getrunken",
    "k1": {
      "ich": "trinke",
      "du": "trinkest",
      "erSieEs": "trinke",
      "wir": "trinken",
      "ihr": "trinket",
      "sieSie": "trinken"
    },
    "k2": {
      "ich": "tränkee",
      "du": "tränkeest",
      "erSieEs": "tränkee",
      "wir": "tränkeen",
      "ihr": "tränkeet",
      "sieSie": "tränkeen"
    },
    "imp": {
      "du": "trink",
      "wir": "trinken wir",
      "ihr": "trinkt",
      "Sie": "trinken Sie"
    }
  },
  "trügen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "বিভ্রান্ত করা",
    "english": "to deceive",
    "pres": {
      "ich": "trüge",
      "du": "trügst",
      "erSieEs": "trügt",
      "wir": "trügen",
      "ihr": "trügt",
      "sieSie": "trügen"
    },
    "past": {
      "ich": "trog",
      "du": "trogst",
      "erSieEs": "trog",
      "wir": "trogen",
      "ihr": "trogt",
      "sieSie": "trogen"
    },
    "p2": "getrogen",
    "k1": {
      "ich": "trüge",
      "du": "trügest",
      "erSieEs": "trüge",
      "wir": "trügen",
      "ihr": "trüget",
      "sieSie": "trügen"
    },
    "k2": {
      "ich": "trögee",
      "du": "trögeest",
      "erSieEs": "trögee",
      "wir": "trögeen",
      "ihr": "trögeet",
      "sieSie": "trögeen"
    },
    "imp": {
      "du": "trüg",
      "wir": "trügen wir",
      "ihr": "trügt",
      "Sie": "trügen Sie"
    }
  },
  "verderben": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "নষ্ট করা / হওয়া",
    "english": "to spoil, ruin",
    "pres": {
      "ich": "verderbe",
      "du": "verdirbst",
      "erSieEs": "verdirbt",
      "wir": "verderben",
      "ihr": "verderbt",
      "sieSie": "verderben"
    },
    "past": {
      "ich": "verdarb",
      "du": "verdarbst",
      "erSieEs": "verdarb",
      "wir": "verdarben",
      "ihr": "verdarbt",
      "sieSie": "verdarben"
    },
    "p2": "geverdorben",
    "k1": {
      "ich": "verderbe",
      "du": "verderbest",
      "erSieEs": "verderbe",
      "wir": "verderben",
      "ihr": "verderbet",
      "sieSie": "verderben"
    },
    "k2": {
      "ich": "verdürbee",
      "du": "verdürbeest",
      "erSieEs": "verdürbee",
      "wir": "verdürbeen",
      "ihr": "verdürbeet",
      "sieSie": "verdürbeen"
    },
    "imp": {
      "du": "verdirb",
      "wir": "verderben wir",
      "ihr": "verderbt",
      "Sie": "verderben Sie"
    }
  },
  "vergessen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ভুলে যাওয়া",
    "english": "to forget",
    "pres": {
      "ich": "vergesse",
      "du": "vergisst",
      "erSieEs": "vergisst",
      "wir": "vergessen",
      "ihr": "vergesst",
      "sieSie": "vergessen"
    },
    "past": {
      "ich": "vergaß",
      "du": "vergaßst",
      "erSieEs": "vergaß",
      "wir": "vergaßen",
      "ihr": "vergaßt",
      "sieSie": "vergaßen"
    },
    "p2": "gevergessen",
    "k1": {
      "ich": "vergesse",
      "du": "vergessest",
      "erSieEs": "vergesse",
      "wir": "vergessen",
      "ihr": "vergesset",
      "sieSie": "vergessen"
    },
    "k2": {
      "ich": "vergäßee",
      "du": "vergäßeest",
      "erSieEs": "vergäßee",
      "wir": "vergäßeen",
      "ihr": "vergäßeet",
      "sieSie": "vergäßeen"
    },
    "imp": {
      "du": "vergiss",
      "wir": "vergessen wir",
      "ihr": "vergesst",
      "Sie": "vergessen Sie"
    }
  },
  "verlieren": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "হারানো",
    "english": "to lose",
    "pres": {
      "ich": "verliere",
      "du": "verlierst",
      "erSieEs": "verliert",
      "wir": "verlieren",
      "ihr": "verliert",
      "sieSie": "verlieren"
    },
    "past": {
      "ich": "verlor",
      "du": "verlorst",
      "erSieEs": "verlor",
      "wir": "verloren",
      "ihr": "verlort",
      "sieSie": "verloren"
    },
    "p2": "geverloren",
    "k1": {
      "ich": "verliere",
      "du": "verlierest",
      "erSieEs": "verliere",
      "wir": "verlieren",
      "ihr": "verlieret",
      "sieSie": "verlieren"
    },
    "k2": {
      "ich": "verlöree",
      "du": "verlöreest",
      "erSieEs": "verlöree",
      "wir": "verlöreen",
      "ihr": "verlöreet",
      "sieSie": "verlöreen"
    },
    "imp": {
      "du": "verlier",
      "wir": "verlieren wir",
      "ihr": "verliert",
      "Sie": "verlieren Sie"
    }
  },
  "verzeihen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ক্ষমা করা",
    "english": "to forgive",
    "pres": {
      "ich": "verzeihe",
      "du": "verzeihst",
      "erSieEs": "verzeiht",
      "wir": "verzeihen",
      "ihr": "verzeiht",
      "sieSie": "verzeihen"
    },
    "past": {
      "ich": "verzieh",
      "du": "verziehst",
      "erSieEs": "verzieh",
      "wir": "verziehen",
      "ihr": "verzieht",
      "sieSie": "verziehen"
    },
    "p2": "geverziehen",
    "k1": {
      "ich": "verzeihe",
      "du": "verzeihest",
      "erSieEs": "verzeihe",
      "wir": "verzeihen",
      "ihr": "verzeihet",
      "sieSie": "verzeihen"
    },
    "k2": {
      "ich": "verziehee",
      "du": "verzieheest",
      "erSieEs": "verziehee",
      "wir": "verzieheen",
      "ihr": "verzieheet",
      "sieSie": "verzieheen"
    },
    "imp": {
      "du": "verzeih",
      "wir": "verzeihen wir",
      "ihr": "verzeiht",
      "Sie": "verzeihen Sie"
    }
  },
  "wachsen": {
    "type": "irregular",
    "aux": "sein",
    "level": "A2",
    "bangla": "বৃদ্ধি পাওয়া / বড় হওয়া",
    "english": "to grow",
    "pres": {
      "ich": "wachse",
      "du": "wächst",
      "erSieEs": "wächst",
      "wir": "wachsen",
      "ihr": "wachst",
      "sieSie": "wachsen"
    },
    "past": {
      "ich": "wuchs",
      "du": "wuchsst",
      "erSieEs": "wuchs",
      "wir": "wuchsen",
      "ihr": "wuchst",
      "sieSie": "wuchsen"
    },
    "p2": "gewachsen",
    "k1": {
      "ich": "wachse",
      "du": "wachsest",
      "erSieEs": "wachse",
      "wir": "wachsen",
      "ihr": "wachset",
      "sieSie": "wachsen"
    },
    "k2": {
      "ich": "wüchsee",
      "du": "wüchseest",
      "erSieEs": "wüchsee",
      "wir": "wüchseen",
      "ihr": "wüchseet",
      "sieSie": "wüchseen"
    },
    "imp": {
      "du": "wachs",
      "wir": "wachsen wir",
      "ihr": "wachst",
      "Sie": "wachsen Sie"
    }
  },
  "waschen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ধোয়া",
    "english": "to wash",
    "pres": {
      "ich": "wasche",
      "du": "wäschst",
      "erSieEs": "wäscht",
      "wir": "waschen",
      "ihr": "wascht",
      "sieSie": "waschen"
    },
    "past": {
      "ich": "wusch",
      "du": "wuschst",
      "erSieEs": "wusch",
      "wir": "wuschen",
      "ihr": "wuscht",
      "sieSie": "wuschen"
    },
    "p2": "gewaschen",
    "k1": {
      "ich": "wasche",
      "du": "waschest",
      "erSieEs": "wasche",
      "wir": "waschen",
      "ihr": "waschet",
      "sieSie": "waschen"
    },
    "k2": {
      "ich": "wüschee",
      "du": "wüscheest",
      "erSieEs": "wüschee",
      "wir": "wüscheen",
      "ihr": "wüscheet",
      "sieSie": "wüscheen"
    },
    "imp": {
      "du": "wasch",
      "wir": "waschen wir",
      "ihr": "wascht",
      "Sie": "waschen Sie"
    }
  },
  "weichen": {
    "type": "irregular",
    "aux": "sein",
    "level": "B2",
    "bangla": "পিছু হটা / সরে যাওয়া",
    "english": "to yield, give way",
    "pres": {
      "ich": "weiche",
      "du": "weichst",
      "erSieEs": "weicht",
      "wir": "weichen",
      "ihr": "weicht",
      "sieSie": "weichen"
    },
    "past": {
      "ich": "wich",
      "du": "wichst",
      "erSieEs": "wich",
      "wir": "wichen",
      "ihr": "wicht",
      "sieSie": "wichen"
    },
    "p2": "gewichen",
    "k1": {
      "ich": "weiche",
      "du": "weichest",
      "erSieEs": "weiche",
      "wir": "weichen",
      "ihr": "weichet",
      "sieSie": "weichen"
    },
    "k2": {
      "ich": "wichee",
      "du": "wicheest",
      "erSieEs": "wichee",
      "wir": "wicheen",
      "ihr": "wicheet",
      "sieSie": "wicheen"
    },
    "imp": {
      "du": "weiche",
      "wir": "weichen wir",
      "ihr": "weicht",
      "Sie": "weichen Sie"
    }
  },
  "weisen": {
    "type": "irregular",
    "aux": "haben",
    "level": "B1",
    "bangla": "নির্দেশ করা / দেখানো",
    "english": "to point, show",
    "pres": {
      "ich": "weise",
      "du": "weist",
      "erSieEs": "weist",
      "wir": "weisen",
      "ihr": "weist",
      "sieSie": "weisen"
    },
    "past": {
      "ich": "wies",
      "du": "wiesst",
      "erSieEs": "wies",
      "wir": "wiesen",
      "ihr": "wiest",
      "sieSie": "wiesen"
    },
    "p2": "gewiesen",
    "k1": {
      "ich": "weise",
      "du": "weisest",
      "erSieEs": "weise",
      "wir": "weisen",
      "ihr": "weiset",
      "sieSie": "weisen"
    },
    "k2": {
      "ich": "wiesee",
      "du": "wieseest",
      "erSieEs": "wiesee",
      "wir": "wieseen",
      "ihr": "wieseet",
      "sieSie": "wieseen"
    },
    "imp": {
      "du": "weis",
      "wir": "weisen wir",
      "ihr": "weist",
      "Sie": "weisen Sie"
    }
  },
  "wenden": {
    "type": "mixed",
    "aux": "haben",
    "level": "A2",
    "bangla": "ঘোরানো / মোড় নেওয়া",
    "english": "to turn",
    "pres": {
      "ich": "wende",
      "du": "wendest",
      "erSieEs": "wendet",
      "wir": "wenden",
      "ihr": "wendt",
      "sieSie": "wenden"
    },
    "past": {
      "ich": "wandte",
      "du": "wandtest",
      "erSieEs": "wandte",
      "wir": "wandteen",
      "ihr": "wandtet",
      "sieSie": "wandteen"
    },
    "p2": "gewandt",
    "k1": {
      "ich": "wende",
      "du": "wendest",
      "erSieEs": "wende",
      "wir": "wenden",
      "ihr": "wendet",
      "sieSie": "wenden"
    },
    "k2": {
      "ich": "wendetee",
      "du": "wendeteest",
      "erSieEs": "wendetee",
      "wir": "wendeteen",
      "ihr": "wendeteet",
      "sieSie": "wendeteen"
    },
    "imp": {
      "du": "wende",
      "wir": "wenden wir",
      "ihr": "wendt",
      "Sie": "wenden Sie"
    }
  },
  "werben": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "বিজ্ঞাপন দেওয়া",
    "english": "to advertise, recruit",
    "pres": {
      "ich": "werbe",
      "du": "wirbst",
      "erSieEs": "wirbt",
      "wir": "werben",
      "ihr": "werbt",
      "sieSie": "werben"
    },
    "past": {
      "ich": "warb",
      "du": "warbst",
      "erSieEs": "warb",
      "wir": "warben",
      "ihr": "warbt",
      "sieSie": "warben"
    },
    "p2": "geworben",
    "k1": {
      "ich": "werbe",
      "du": "werbest",
      "erSieEs": "werbe",
      "wir": "werben",
      "ihr": "werbet",
      "sieSie": "werben"
    },
    "k2": {
      "ich": "würbee",
      "du": "würbeest",
      "erSieEs": "würbee",
      "wir": "würbeen",
      "ihr": "würbeet",
      "sieSie": "würbeen"
    },
    "imp": {
      "du": "wirb",
      "wir": "werben wir",
      "ihr": "werbt",
      "Sie": "werben Sie"
    }
  },
  "werfen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "নিক্ষেপ করা",
    "english": "to throw",
    "pres": {
      "ich": "werfe",
      "du": "wirfst",
      "erSieEs": "wirft",
      "wir": "werfen",
      "ihr": "werft",
      "sieSie": "werfen"
    },
    "past": {
      "ich": "warf",
      "du": "warfst",
      "erSieEs": "warf",
      "wir": "warfen",
      "ihr": "warft",
      "sieSie": "warfen"
    },
    "p2": "geworfen",
    "k1": {
      "ich": "werfe",
      "du": "werfest",
      "erSieEs": "werfe",
      "wir": "werfen",
      "ihr": "werfet",
      "sieSie": "werfen"
    },
    "k2": {
      "ich": "würfee",
      "du": "würfeest",
      "erSieEs": "würfee",
      "wir": "würfeen",
      "ihr": "würfeet",
      "sieSie": "würfeen"
    },
    "imp": {
      "du": "wirf",
      "wir": "werfen wir",
      "ihr": "werft",
      "Sie": "werfen Sie"
    }
  },
  "wiegen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "ওজন করা / হওয়া",
    "english": "to weigh",
    "pres": {
      "ich": "wiege",
      "du": "wiegst",
      "erSieEs": "wiegt",
      "wir": "wiegen",
      "ihr": "wiegt",
      "sieSie": "wiegen"
    },
    "past": {
      "ich": "wog",
      "du": "wogst",
      "erSieEs": "wog",
      "wir": "wogen",
      "ihr": "wogt",
      "sieSie": "wogen"
    },
    "p2": "gewogen",
    "k1": {
      "ich": "wiege",
      "du": "wiegest",
      "erSieEs": "wiege",
      "wir": "wiegen",
      "ihr": "wieget",
      "sieSie": "wiegen"
    },
    "k2": {
      "ich": "wögee",
      "du": "wögeest",
      "erSieEs": "wögee",
      "wir": "wögeen",
      "ihr": "wögeet",
      "sieSie": "wögeen"
    },
    "imp": {
      "du": "wieg",
      "wir": "wiegen wir",
      "ihr": "wiegt",
      "Sie": "wiegen Sie"
    }
  },
  "winden": {
    "type": "irregular",
    "aux": "haben",
    "level": "B2",
    "bangla": "প্যাঁচানো",
    "english": "to wind, twist",
    "pres": {
      "ich": "winde",
      "du": "windest",
      "erSieEs": "windet",
      "wir": "winden",
      "ihr": "windt",
      "sieSie": "winden"
    },
    "past": {
      "ich": "wand",
      "du": "wandest",
      "erSieEs": "wand",
      "wir": "wanden",
      "ihr": "wandet",
      "sieSie": "wanden"
    },
    "p2": "gewunden",
    "k1": {
      "ich": "winde",
      "du": "windest",
      "erSieEs": "winde",
      "wir": "winden",
      "ihr": "windet",
      "sieSie": "winden"
    },
    "k2": {
      "ich": "wändee",
      "du": "wändeest",
      "erSieEs": "wändee",
      "wir": "wändeen",
      "ihr": "wändeet",
      "sieSie": "wändeen"
    },
    "imp": {
      "du": "winde",
      "wir": "winden wir",
      "ihr": "windt",
      "Sie": "winden Sie"
    }
  },
  "ziehen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "টানা / স্থানান্তরিত হওয়া",
    "english": "to pull, move",
    "pres": {
      "ich": "ziehe",
      "du": "ziehst",
      "erSieEs": "zieht",
      "wir": "ziehen",
      "ihr": "zieht",
      "sieSie": "ziehen"
    },
    "past": {
      "ich": "zog",
      "du": "zogst",
      "erSieEs": "zog",
      "wir": "zogen",
      "ihr": "zogt",
      "sieSie": "zogen"
    },
    "p2": "gezogen",
    "k1": {
      "ich": "ziehe",
      "du": "ziehest",
      "erSieEs": "ziehe",
      "wir": "ziehen",
      "ihr": "ziehet",
      "sieSie": "ziehen"
    },
    "k2": {
      "ich": "zögee",
      "du": "zögeest",
      "erSieEs": "zögee",
      "wir": "zögeen",
      "ihr": "zögeet",
      "sieSie": "zögeen"
    },
    "imp": {
      "du": "zieh",
      "wir": "ziehen wir",
      "ihr": "zieht",
      "Sie": "ziehen Sie"
    }
  },
  "zwingen": {
    "type": "irregular",
    "aux": "haben",
    "level": "A2",
    "bangla": "বাধ্য করা",
    "english": "to force, compel",
    "pres": {
      "ich": "zwinge",
      "du": "zwingst",
      "erSieEs": "zwingt",
      "wir": "zwingen",
      "ihr": "zwingt",
      "sieSie": "zwingen"
    },
    "past": {
      "ich": "zwang",
      "du": "zwangst",
      "erSieEs": "zwang",
      "wir": "zwangen",
      "ihr": "zwangt",
      "sieSie": "zwangen"
    },
    "p2": "gezwungen",
    "k1": {
      "ich": "zwinge",
      "du": "zwingest",
      "erSieEs": "zwinge",
      "wir": "zwingen",
      "ihr": "zwinget",
      "sieSie": "zwingen"
    },
    "k2": {
      "ich": "zwängee",
      "du": "zwängeest",
      "erSieEs": "zwängee",
      "wir": "zwängeen",
      "ihr": "zwängeet",
      "sieSie": "zwängeen"
    },
    "imp": {
      "du": "zwing",
      "wir": "zwingen wir",
      "ihr": "zwingt",
      "Sie": "zwingen Sie"
    }
  }
};

export const SEPARABLE_PREFIXES: string[] = [
  'auseinander', 'dazwischen', 'hinterher', 'zusammen', 'gegenüber', 'vorüber',
  'hinunter', 'herunter', 'hervor', 'herüber', 'hinüber', 'einher', 'entlang',
  'spazieren', 'zurück', 'weiter', 'vorbei', 'voraus', 'voran', 'vorher', 'vorweg',
  'wieder', 'hinaus', 'herein', 'herum', 'hinauf', 'herauf', 'hinein', 'herab',
  'hinab', 'heran', 'herbei', 'hinzu', 'kennen', 'stehen', 'fern', 'fest', 'fort',
  'frei', 'heim', 'hoch', 'inne', 'klar', 'los', 'mit', 'nach', 'nahe', 'nieder',
  'preis', 'rad', 'schief', 'statt', 'teil', 'tot', 'weg', 'ab', 'an', 'auf',
  'aus', 'bei', 'dar', 'ein', 'vor', 'zu'
];

export const INSEPARABLE_PREFIXES: string[] = [
  'be', 'emp', 'ent', 'er', 'ge', 'hinter', 'miss', 'miß', 'ver', 'zer', 'wider'
];

export const DUAL_PREFIXES: string[] = [
  'durch', 'über', 'um', 'unter', 'voll', 'wieder'
];

export const SEIN_VERBS_LIST: string[] = [
  'sein', 'werden', 'bleiben', 'gehen', 'kommen', 'fahren', 'laufen', 'fliegen',
  'schwimmen', 'steigen', 'fallen', 'springen', 'reisen', 'wandern', 'passieren',
  'geschehen', 'aufstehen', 'ankommen', 'mitkommen', 'abfahren', 'zurückkommen',
  'einschlafen', 'aufwachen', 'sterben', 'wachsen', 'umziehen', 'ausziehen', 'einziehen',
  'erscheinen', 'verschwinden', 'sinken', 'ertrinken', 'eintreffen', 'fliehen',
  'entkommen', 'gleiten', 'klettern', 'kriechen', 'reiten', 'rennen', 'segeln',
  'stürzen', 'tauchen', 'gelingen', 'misslingen', 'verunglücken', 'zerfallen'
];

export const TOP_ESSENTIAL_VERBS: string[] = [
  'sein', 'haben', 'werden', 'können', 'müssen', 'machen', 'gehen', 'sehen',
  'sprechen', 'nehmen', 'kommen', 'fahren', 'lesen', 'wissen', 'wollen',
  'arbeiten', 'sagen', 'schlafen', 'geben', 'kaufen', 'helfen', 'trinken',
  'finden', 'laufen', 'lernen', 'treffen', 'bleiben', 'schreiben', 'wohnen',
  'aufstehen', 'ankommen', 'einladen', 'fernsehen', 'mitbringen', 'verstehen',
  'essen', 'beginnen', 'bringen', 'denken', 'gefallen', 'dürfen', 'sollen',
  'brauchen', 'glauben', 'leben', 'lieben', 'hoffen', 'warten', 'öffnen'
];
