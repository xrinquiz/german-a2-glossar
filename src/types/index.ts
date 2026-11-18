export interface VocabularyItem {
  id: number;
  chapterWordNumber: number; // e.g. 1, 2, 3... within that chapter
  totalInChapter: number;    // e.g. 86
  german: string;            // e.g. "die Ausbildung, -en" or "fließend" or "liegen, er liegt, hat gelegen"
  word: string;              // Core word e.g. "Ausbildung", "liegen"
  article: 'der' | 'die' | 'das' | null;
  plural: string;            // e.g. "die Ausbildungen" or "—"
  partOfSpeech: 'Nomen' | 'Verb' | 'Adjektiv' | 'Adverb' | 'Präposition' | 'Pronomen' | 'Konjunktion' | 'Ausdruck';
  bangla: string;            // Clean Bengali translation
  english: string;           // Clear English translation
  exampleGerman: string;     // A2-level natural German example sentence
  exampleBangla?: string;    // Bengali translation of example sentence
  exampleEnglish: string;    // English translation of example sentence
  verbForms?: string | null; // Principal verb forms if verb e.g. "er liegt, hat gelegen (H)"
  page: number;              // Original PDF page number (1 to 71)
  kapitel: string;           // e.g. "Kapitel 1"
  kapitelTitle: string;      // e.g. "Und was machst du?"
  kapitelBanglaTitle?: string;
  level?: 'A1' | 'A2' | 'B1';
  topic?: string;
  topicBangla?: string;
}

export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'all';

export type LearningStatus = 'all' | 'learned' | 'learning' | 'practice' | 'favorites' | 'unlearned';

export type SortOption = 'id' | 'german-asc' | 'german-desc' | 'english-asc' | 'bangla-asc';

export interface UserProgressState {
  learned: number[];     // IDs of learned words
  practice: number[];    // IDs of words marked for practice
  favorites: number[];   // IDs of starred words
  history: number[];     // Recently viewed/practiced word IDs
  lastKapitel: string;   // Last visited chapter
}

export interface ChapterInfo {
  id: string;            // e.g. "Kapitel 1"
  uniqueKey?: string;    // e.g. "A1:Kapitel 1"
  number: number;        // e.g. 1
  level: 'A1' | 'A2' | 'B1'; // 'A1', 'A2', or 'B1'
  title: string;         // e.g. "Guten Tag!", "Und was machst du?", or "Gute Reise!"
  banglaTitle?: string;  // e.g. "শুভ যাত্রা! / ভালো ভ্রমণ!"
  wordCount: number;     // e.g. 117, 86, or 98
  pageStart: number;
  pageEnd: number;
}
