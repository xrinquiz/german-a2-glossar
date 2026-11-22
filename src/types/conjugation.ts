export interface PersonForms {
  ich: string;
  du: string;
  erSieEs: string;
  wir: string;
  ihr: string;
  sieSie: string;
}

export interface ImperativeForms {
  du: string;
  wir: string;
  ihr: string;
  Sie: string;
}

export interface ParticipleForms {
  present: string; // Partizip I (e.g. machend)
  past: string;    // Partizip II (e.g. gemacht)
}

export interface VerbConjugation {
  infinitive: string;
  rootVerb?: string;
  prefix?: string;
  isSeparable?: boolean;
  isReflexive?: boolean;
  reflexiveCase?: 'akkusativ' | 'dativ';
  auxiliary: 'haben' | 'sein';
  verbType: 'regular' | 'irregular' | 'modal' | 'mixed';
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'Universal';
  isUniversalDynamic?: boolean;
  derivationNote?: string;
  bangla: string;
  english: string;
  present: PersonForms;
  past: PersonForms;            // Präteritum
  perfect: PersonForms;         // Perfekt (mit haben/sein)
  pluperfect: PersonForms;      // Plusquamperfekt (mit hatte/war)
  future1: PersonForms;         // Futur I (mit werden)
  future2: PersonForms;         // Futur II (mit werden ... haben/sein)
  subjunctive1: PersonForms;    // Konjunktiv I
  subjunctive2: PersonForms;    // Konjunktiv II
  imperative: ImperativeForms;
  participle: ParticipleForms;
  infinitiveWithZu: string;
  exampleSentence?: {
    german: string;
    bangla: string;
    english: string;
  };
}

export interface GrammarTopic {
  id: string;
  number: number;
  titleGerman: string;
  titleBangla: string;
  titleEnglish: string;
  summary: string;
  summaryBangla: string;
  sections: {
    headingGerman: string;
    headingBangla: string;
    contentGerman: string;
    contentBangla: string;
    contentEnglish?: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
    examples?: {
      german: string;
      bangla: string;
      english: string;
      note?: string;
    }[];
  }[];
}
