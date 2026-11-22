import { VerbConjugation, PersonForms, ImperativeForms, ParticipleForms } from '../types/conjugation';
import {
  STRONG_ROOTS_DATA,
  SEPARABLE_PREFIXES,
  INSEPARABLE_PREFIXES,
  DUAL_PREFIXES,
  SEIN_VERBS_LIST,
  TOP_ESSENTIAL_VERBS
} from '../data/conjugationData';
import expandedCatalogRaw from '../data/expandedVerbCatalog.json';
import a1Raw from '../data/a1_vocabulary.json';
import a2Raw from '../data/a2_vocabulary.json';
import b1Raw from '../data/b1_vocabulary.json';

// Build a dictionary of translations and example sentences from vocabulary datasets
interface GlossarEntry {
  german: string;
  word?: string;
  bangla: string;
  english: string;
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  exampleGerman?: string;
  exampleBangla?: string;
  exampleEnglish?: string;
  verbForms?: string | null;
}

const masterVerbMap = new Map<string, GlossarEntry>();

// 1. Load A1, A2, B1 vocabulary items
[...a1Raw, ...a2Raw, ...b1Raw].forEach((item: any) => {
  if (item.partOfSpeech === 'Verb' || (item.verbForms && item.verbForms.length > 2)) {
    const rawWord = (item.word || item.german || '').trim().toLowerCase();
    const clean = rawWord.replace(/^(sich|etw\.|jmdn\.)\s+/, '').trim().split(/[, ]/)[0];
    if (clean && !masterVerbMap.has(clean)) {
      masterVerbMap.set(clean, {
        german: item.german,
        word: item.word,
        bangla: item.bangla,
        english: item.english,
        level: item.level,
        exampleGerman: item.exampleGerman,
        exampleBangla: item.exampleBangla,
        exampleEnglish: item.exampleEnglish,
        verbForms: item.verbForms
      });
    }
  }
});

// 2. Load expanded verb catalog (1500+ German verbs)
expandedCatalogRaw.forEach((item: any) => {
  const clean = item.infinitive.trim().toLowerCase();
  if (clean && !masterVerbMap.has(clean)) {
    masterVerbMap.set(clean, {
      german: item.infinitive,
      word: item.infinitive,
      bangla: item.bangla,
      english: item.english,
      level: item.level || 'B1'
    });
  }
});

// Helper: detect separable or inseparable prefix
export function detectPrefix(infinitive: string): { prefix: string | null; root: string; isSeparable: boolean } {
  const lower = infinitive.toLowerCase().trim();

  // Check separable prefixes (sorted by length descending so e.g. "zusammen" matches before "zu")
  const sortedSeparable = [...SEPARABLE_PREFIXES].sort((a, b) => b.length - a.length);
  for (const p of sortedSeparable) {
    if (lower.startsWith(p) && lower.length > p.length + 2) {
      const remainder = lower.slice(p.length);
      // Valid German verb remainder ending
      if (remainder.endsWith('en') || remainder.endsWith('ern') || remainder.endsWith('eln') || remainder === 'sein' || remainder === 'tun') {
        return { prefix: p, root: remainder, isSeparable: true };
      }
    }
  }

  // Check inseparable prefixes
  const sortedInseparable = [...INSEPARABLE_PREFIXES].sort((a, b) => b.length - a.length);
  for (const p of sortedInseparable) {
    if (lower.startsWith(p) && lower.length > p.length + 2) {
      const remainder = lower.slice(p.length);
      if (remainder.endsWith('en') || remainder.endsWith('ern') || remainder.endsWith('eln') || remainder === 'sein' || remainder === 'tun') {
        return { prefix: p, root: remainder, isSeparable: false };
      }
    }
  }

  // Check dual prefixes (e.g. durch-, über-, um-, unter-) - default to inseparable if root is strong or weak
  for (const p of DUAL_PREFIXES) {
    if (lower.startsWith(p) && lower.length > p.length + 2) {
      const remainder = lower.slice(p.length);
      if (remainder.endsWith('en') || remainder.endsWith('ern') || remainder.endsWith('eln')) {
        // Most common figurative meanings are inseparable
        return { prefix: p, root: remainder, isSeparable: false };
      }
    }
  }

  return { prefix: null, root: lower, isSeparable: false };
}

// Check if verb requires "sein" as auxiliary
export function isSeinVerb(infinitive: string, root: string): boolean {
  if (SEIN_VERBS_LIST.includes(infinitive) || SEIN_VERBS_LIST.includes(root)) return true;
  if (STRONG_ROOTS_DATA[infinitive]?.aux === 'sein') return true;
  if (STRONG_ROOTS_DATA[root]?.aux === 'sein') return true;

  // Additional common movement/state-transition roots
  const movementRoots = [
    'geh', 'komm', 'fahr', 'lauf', 'flieg', 'schwimm', 'steig', 'fall',
    'spring', 'reis', 'wander', 'renn', 'reit', 'kletter', 'kriech', 'gleit'
  ];
  return movementRoots.some((m) => root.startsWith(m) || infinitive.startsWith(m));
}

// Main Universal Conjugator function - Conjugates ANY German verb in existence
export function conjugateVerb(verbInput: string): VerbConjugation {
  let cleanInput = verbInput.trim().toLowerCase();
  const isReflexive = cleanInput.startsWith('sich ') || cleanInput.endsWith(' sich') || cleanInput.includes(' (sich)');
  cleanInput = cleanInput.replace(/^(sich|etw\.|jmdn\.)\s+/, '').replace(/\s+\(sich\)$/, '').replace(/\s+sich$/, '').trim().split(/[, ]/)[0];

  // Fallback if empty
  if (!cleanInput) cleanInput = 'machen';

  const { prefix, root, isSeparable } = detectPrefix(cleanInput);
  const glossar = masterVerbMap.get(cleanInput) || masterVerbMap.get(root);

  // Check strong verb dictionary for either the full verb or its root
  const fullStrong = STRONG_ROOTS_DATA[cleanInput];
  const rootStrong = STRONG_ROOTS_DATA[root];

  const aux: 'haben' | 'sein' = isReflexive ? 'haben' : isSeinVerb(cleanInput, root) ? 'sein' : 'haben';
  const verbType: 'regular' | 'irregular' | 'modal' | 'mixed' = fullStrong?.type || rootStrong?.type || 'regular';
  const level = glossar?.level || fullStrong?.level || rootStrong?.level || 'Universal';
  
  // Clean, professional Bengali and English translations
  let bangla = glossar?.bangla || fullStrong?.bangla || (rootStrong ? `${rootStrong.bangla} (যৌগিক রূপ)` : 'জার্মান ক্রিয়া');
  let english = glossar?.english || fullStrong?.english || (rootStrong ? `${rootStrong.english} (compound)` : 'to perform action');

  const isUniversalDynamic = !fullStrong && !glossar;
  let derivationNote: string | undefined = undefined;
  if (prefix && rootStrong) {
    derivationNote = `যৌগিক ক্রিয়া: উপসর্গ '${prefix}-' + মূল অনিয়মিত রূপ '${root}'`;
  } else if (prefix && !rootStrong) {
    derivationNote = `যৌগিক নিয়মিত ক্রিয়া: উপসর্গ '${prefix}-' + নিয়মিত মূল '${root}'`;
  } else if (isUniversalDynamic) {
    derivationNote = 'Universal Engine: অ্যালগরিদমিক নিয়মের মাধ্যমে স্বয়ংক্রিয়ভাবে কনজুগেটকৃত';
  }

  // Reflexive pronouns
  const refPronouns = {
    ich: 'mich',
    du: 'dich',
    erSieEs: 'sich',
    wir: 'uns',
    ihr: 'euch',
    sieSie: 'sich'
  };

  // 1. Present Tense (Präsens)
  let pres: PersonForms;
  if (fullStrong) {
    pres = { ...fullStrong.pres };
  } else if (rootStrong && isSeparable && prefix) {
    pres = {
      ich: `${rootStrong.pres.ich} ${prefix}`,
      du: `${rootStrong.pres.du} ${prefix}`,
      erSieEs: `${rootStrong.pres.erSieEs} ${prefix}`,
      wir: `${rootStrong.pres.wir} ${prefix}`,
      ihr: `${rootStrong.pres.ihr} ${prefix}`,
      sieSie: `${rootStrong.pres.sieSie} ${prefix}`
    };
  } else if (rootStrong && !isSeparable) {
    // Inseparable with strong root, e.g. verstehen -> stehen
    // Prefix attaches directly to root form
    pres = {
      ich: `${prefix || ''}${rootStrong.pres.ich}`,
      du: `${prefix || ''}${rootStrong.pres.du}`,
      erSieEs: `${prefix || ''}${rootStrong.pres.erSieEs}`,
      wir: `${prefix || ''}${rootStrong.pres.wir}`,
      ihr: `${prefix || ''}${rootStrong.pres.ihr}`,
      sieSie: `${prefix || ''}${rootStrong.pres.sieSie}`
    };
  } else {
    // Regular weak verb conjugation
    const base = isSeparable && prefix ? root : cleanInput;
    let stem = base;
    if (base.endsWith('en')) stem = base.slice(0, -2);
    else if (base.endsWith('n')) stem = base.slice(0, -1);

    const needsE = stem.endsWith('t') || stem.endsWith('d') || /(?:[bdfgklmnprstvwz][mn])$/i.test(stem);
    const duTOnly = stem.endsWith('s') || stem.endsWith('ß') || stem.endsWith('z') || stem.endsWith('x');

    const pSuffix = isSeparable && prefix ? ` ${prefix}` : '';

    pres = {
      ich: `${stem}e${pSuffix}`,
      du: `${stem}${needsE ? 'e' : ''}${duTOnly ? 't' : 'st'}${pSuffix}`,
      erSieEs: `${stem}${needsE ? 'e' : ''}t${pSuffix}`,
      wir: `${base}${pSuffix}`,
      ihr: `${stem}${needsE ? 'e' : ''}t${pSuffix}`,
      sieSie: `${base}${pSuffix}`
    };
  }

  // 2. Past Tense (Präteritum)
  let past: PersonForms;
  if (fullStrong) {
    past = { ...fullStrong.past };
  } else if (rootStrong && isSeparable && prefix) {
    past = {
      ich: `${rootStrong.past.ich} ${prefix}`,
      du: `${rootStrong.past.du} ${prefix}`,
      erSieEs: `${rootStrong.past.erSieEs} ${prefix}`,
      wir: `${rootStrong.past.wir} ${prefix}`,
      ihr: `${rootStrong.past.ihr} ${prefix}`,
      sieSie: `${rootStrong.past.sieSie} ${prefix}`
    };
  } else if (rootStrong && !isSeparable) {
    past = {
      ich: `${prefix || ''}${rootStrong.past.ich}`,
      du: `${prefix || ''}${rootStrong.past.du}`,
      erSieEs: `${prefix || ''}${rootStrong.past.erSieEs}`,
      wir: `${prefix || ''}${rootStrong.past.wir}`,
      ihr: `${prefix || ''}${rootStrong.past.ihr}`,
      sieSie: `${prefix || ''}${rootStrong.past.sieSie}`
    };
  } else {
    // Regular Präteritum
    const base = isSeparable && prefix ? root : cleanInput;
    let stem = base;
    if (base.endsWith('en')) stem = base.slice(0, -2);
    else if (base.endsWith('n')) stem = base.slice(0, -1);

    const needsE = stem.endsWith('t') || stem.endsWith('d') || /(?:[bdfgklmnprstvwz][mn])$/i.test(stem);
    const pSuffix = isSeparable && prefix ? ` ${prefix}` : '';
    const te = needsE ? 'ete' : 'te';

    past = {
      ich: `${stem}${te}${pSuffix}`,
      du: `${stem}${te}st${pSuffix}`,
      erSieEs: `${stem}${te}${pSuffix}`,
      wir: `${stem}${te}n${pSuffix}`,
      ihr: `${stem}${te}t${pSuffix}`,
      sieSie: `${stem}${te}n${pSuffix}`
    };
  }

  // 3. Partizip II
  let p2: string;
  if (fullStrong) {
    p2 = fullStrong.p2;
  } else if (rootStrong && isSeparable && prefix) {
    // e.g. aufstehen -> aufgestanden
    p2 = `${prefix}${rootStrong.p2}`;
  } else if (rootStrong && !isSeparable && prefix) {
    // e.g. verstehen -> verstanden (strip "ge" if root has it)
    const rootP2NoGe = rootStrong.p2.startsWith('ge') ? rootStrong.p2.slice(2) : rootStrong.p2;
    p2 = `${prefix}${rootP2NoGe}`;
  } else {
    // Regular Partizip II
    const base = isSeparable && prefix ? root : cleanInput;
    let stem = base;
    if (base.endsWith('en')) stem = base.slice(0, -2);
    else if (base.endsWith('n')) stem = base.slice(0, -1);
    const needsE = stem.endsWith('t') || stem.endsWith('d');

    if (cleanInput.endsWith('ieren') || (!isSeparable && prefix)) {
      // Inseparable prefix or -ieren verb: no ge- prefix (e.g. bezahlt, studiert)
      p2 = `${prefix || ''}${stem}${needsE ? 'et' : 't'}`;
    } else if (isSeparable && prefix) {
      // Separable: prefix + ge + stem + t (e.g. eingekauft, aufgemacht)
      p2 = `${prefix}ge${stem}${needsE ? 'et' : 't'}`;
    } else {
      // Standard: ge + stem + t (e.g. gemacht, gearbeitet)
      p2 = `ge${stem}${needsE ? 'et' : 't'}`;
    }
  }

  // 4. Subjunctive I (Konjunktiv I)
  let k1: PersonForms;
  if (fullStrong) {
    k1 = { ...fullStrong.k1 };
  } else if (rootStrong && isSeparable && prefix) {
    k1 = {
      ich: `${rootStrong.k1.ich} ${prefix}`,
      du: `${rootStrong.k1.du} ${prefix}`,
      erSieEs: `${rootStrong.k1.erSieEs} ${prefix}`,
      wir: `${rootStrong.k1.wir} ${prefix}`,
      ihr: `${rootStrong.k1.ihr} ${prefix}`,
      sieSie: `${rootStrong.k1.sieSie} ${prefix}`
    };
  } else if (rootStrong && !isSeparable) {
    k1 = {
      ich: `${prefix || ''}${rootStrong.k1.ich}`,
      du: `${prefix || ''}${rootStrong.k1.du}`,
      erSieEs: `${prefix || ''}${rootStrong.k1.erSieEs}`,
      wir: `${prefix || ''}${rootStrong.k1.wir}`,
      ihr: `${prefix || ''}${rootStrong.k1.ihr}`,
      sieSie: `${prefix || ''}${rootStrong.k1.sieSie}`
    };
  } else {
    const base = isSeparable && prefix ? root : cleanInput;
    let stem = base;
    if (base.endsWith('en')) stem = base.slice(0, -2);
    else if (base.endsWith('n')) stem = base.slice(0, -1);
    const pSuffix = isSeparable && prefix ? ` ${prefix}` : '';

    k1 = {
      ich: `${stem}e${pSuffix}`,
      du: `${stem}est${pSuffix}`,
      erSieEs: `${stem}e${pSuffix}`,
      wir: `${stem}en${pSuffix}`,
      ihr: `${stem}et${pSuffix}`,
      sieSie: `${stem}en${pSuffix}`
    };
  }

  // 5. Subjunctive II (Konjunktiv II)
  let k2: PersonForms;
  if (fullStrong) {
    k2 = { ...fullStrong.k2 };
  } else if (rootStrong && isSeparable && prefix) {
    k2 = {
      ich: `${rootStrong.k2.ich} ${prefix}`,
      du: `${rootStrong.k2.du} ${prefix}`,
      erSieEs: `${rootStrong.k2.erSieEs} ${prefix}`,
      wir: `${rootStrong.k2.wir} ${prefix}`,
      ihr: `${rootStrong.k2.ihr} ${prefix}`,
      sieSie: `${rootStrong.k2.sieSie} ${prefix}`
    };
  } else if (rootStrong && !isSeparable) {
    k2 = {
      ich: `${prefix || ''}${rootStrong.k2.ich}`,
      du: `${prefix || ''}${rootStrong.k2.du}`,
      erSieEs: `${prefix || ''}${rootStrong.k2.erSieEs}`,
      wir: `${prefix || ''}${rootStrong.k2.wir}`,
      ihr: `${prefix || ''}${rootStrong.k2.ihr}`,
      sieSie: `${prefix || ''}${rootStrong.k2.sieSie}`
    };
  } else {
    // For regular verbs, modern standard German uses "würde + Infinitiv"
    k2 = {
      ich: `würde ${cleanInput}`,
      du: `würdest ${cleanInput}`,
      erSieEs: `würde ${cleanInput}`,
      wir: `würden ${cleanInput}`,
      ihr: `würdet ${cleanInput}`,
      sieSie: `würden ${cleanInput}`
    };
  }

  // 6. Imperative (Imperativ)
  let imp: ImperativeForms;
  if (fullStrong) {
    imp = { ...fullStrong.imp };
  } else if (rootStrong && isSeparable && prefix) {
    imp = {
      du: `${rootStrong.imp.du} ${prefix}`,
      wir: `${cleanInput} wir`,
      ihr: `${rootStrong.imp.ihr} ${prefix}`,
      Sie: `${cleanInput} Sie`
    };
  } else if (rootStrong && !isSeparable) {
    imp = {
      du: `${prefix || ''}${rootStrong.imp.du}`,
      wir: `${cleanInput} wir`,
      ihr: `${prefix || ''}${rootStrong.imp.ihr}`,
      Sie: `${cleanInput} Sie`
    };
  } else {
    const base = isSeparable && prefix ? root : cleanInput;
    let stem = base;
    if (base.endsWith('en')) stem = base.slice(0, -2);
    else if (base.endsWith('n')) stem = base.slice(0, -1);
    const needsE = stem.endsWith('t') || stem.endsWith('d');
    const pSuffix = isSeparable && prefix ? ` ${prefix}` : '';

    imp = {
      du: `${stem}${needsE ? 'e' : ''}${pSuffix}`,
      wir: `${cleanInput} wir`,
      ihr: `${stem}${needsE ? 'e' : ''}t${pSuffix}`,
      Sie: `${cleanInput} Sie`
    };
  }

  // If reflexive, attach reflexive pronouns to present and past
  if (isReflexive) {
    pres = {
      ich: `${pres.ich} ${refPronouns.ich}`,
      du: `${pres.du} ${refPronouns.du}`,
      erSieEs: `${pres.erSieEs} ${refPronouns.erSieEs}`,
      wir: `${pres.wir} ${refPronouns.wir}`,
      ihr: `${pres.ihr} ${refPronouns.ihr}`,
      sieSie: `${pres.sieSie} ${refPronouns.sieSie}`
    };
    past = {
      ich: `${past.ich} ${refPronouns.ich}`,
      du: `${past.du} ${refPronouns.du}`,
      erSieEs: `${past.erSieEs} ${refPronouns.erSieEs}`,
      wir: `${past.wir} ${refPronouns.wir}`,
      ihr: `${past.ihr} ${refPronouns.ihr}`,
      sieSie: `${past.sieSie} ${refPronouns.sieSie}`
    };
  }

  // 7. Compound Tenses
  // Perfekt (haben / sein + Partizip II)
  const perfect: PersonForms =
    aux === 'sein'
      ? {
          ich: `bin ${p2}`,
          du: `bist ${p2}`,
          erSieEs: `ist ${p2}`,
          wir: `sind ${p2}`,
          ihr: `seid ${p2}`,
          sieSie: `sind ${p2}`
        }
      : {
          ich: `habe ${p2}`,
          du: `hast ${p2}`,
          erSieEs: `hat ${p2}`,
          wir: `haben ${p2}`,
          ihr: `habt ${p2}`,
          sieSie: `haben ${p2}`
        };

  // Plusquamperfekt (war / hatte + Partizip II)
  const pluperfect: PersonForms =
    aux === 'sein'
      ? {
          ich: `war ${p2}`,
          du: `warst ${p2}`,
          erSieEs: `war ${p2}`,
          wir: `waren ${p2}`,
          ihr: `wart ${p2}`,
          sieSie: `waren ${p2}`
        }
      : {
          ich: `hatte ${p2}`,
          du: `hattest ${p2}`,
          erSieEs: `hatte ${p2}`,
          wir: `hatten ${p2}`,
          ihr: `hattet ${p2}`,
          sieSie: `hatten ${p2}`
        };

  // Futur I (werden + Infinitiv)
  const future1: PersonForms = {
    ich: `werde ${cleanInput}`,
    du: `wirst ${cleanInput}`,
    erSieEs: `wird ${cleanInput}`,
    wir: `werden ${cleanInput}`,
    ihr: `werdet ${cleanInput}`,
    sieSie: `werden ${cleanInput}`
  };

  // Futur II (werden + Partizip II + haben/sein)
  const future2: PersonForms = {
    ich: `werde ${p2} ${aux}`,
    du: `wirst ${p2} ${aux}`,
    erSieEs: `wird ${p2} ${aux}`,
    wir: `werden ${p2} ${aux}`,
    ihr: `werdet ${p2} ${aux}`,
    sieSie: `werden ${p2} ${aux}`
  };

  // Participle & Infinitive with zu
  const participle: ParticipleForms = {
    present: `${cleanInput}d`,
    past: p2
  };

  const infinitiveWithZu = isSeparable && prefix ? `${prefix}zu${root}` : `zu ${cleanInput}`;

  return {
    infinitive: isReflexive ? `sich ${cleanInput}` : cleanInput,
    rootVerb: root !== cleanInput ? root : undefined,
    prefix: prefix || undefined,
    isSeparable,
    isReflexive,
    auxiliary: aux,
    verbType,
    level,
    bangla,
    english,
    isUniversalDynamic,
    derivationNote,
    present: pres,
    past,
    perfect,
    pluperfect,
    future1,
    future2,
    subjunctive1: k1,
    subjunctive2: k2,
    imperative: imp,
    participle,
    infinitiveWithZu,
    exampleSentence: glossar?.exampleGerman
      ? {
          german: glossar.exampleGerman,
          bangla: glossar.exampleBangla || '',
          english: glossar.exampleEnglish || ''
        }
      : undefined
  };
}

// Get list of all available verbs for instant search and autocomplete
export function getAllAvailableVerbs(): { infinitive: string; bangla: string; english: string; level?: string }[] {
  const result: { infinitive: string; bangla: string; english: string; level?: string }[] = [];
  const seen = new Set<string>();

  // 1. Add top essential verbs first
  TOP_ESSENTIAL_VERBS.forEach((v) => {
    if (!seen.has(v)) {
      seen.add(v);
      const conj = conjugateVerb(v);
      result.push({
        infinitive: v,
        bangla: conj.bangla,
        english: conj.english,
        level: conj.level
      });
    }
  });

  // 2. Add all verbs from master dictionary
  masterVerbMap.forEach((entry, key) => {
    if (!seen.has(key)) {
      seen.add(key);
      result.push({
        infinitive: key,
        bangla: entry.bangla,
        english: entry.english,
        level: entry.level
      });
    }
  });

  // 3. Add any remaining strong roots
  Object.entries(STRONG_ROOTS_DATA).forEach(([root, data]) => {
    if (!seen.has(root)) {
      seen.add(root);
      result.push({
        infinitive: root,
        bangla: data.bangla,
        english: data.english,
        level: data.level
      });
    }
  });

  return result;
}

// Search conjugations by German, English, or Bangla query
export function searchVerbs(query: string): { infinitive: string; bangla: string; english: string; level?: string }[] {
  const q = query.trim().toLowerCase();
  const all = getAllAvailableVerbs();

  if (!q) return all.slice(0, 100);

  const matched = all.filter(
    (v) =>
      v.infinitive.toLowerCase().includes(q) ||
      v.bangla.toLowerCase().includes(q) ||
      v.english.toLowerCase().includes(q)
  );

  // If query is an exact German verb that isn't pre-indexed, dynamically prepend it
  if (!matched.some((m) => m.infinitive.toLowerCase() === q) && q.length >= 3) {
    const dynamicConj = conjugateVerb(q);
    matched.unshift({
      infinitive: q,
      bangla: dynamicConj.bangla,
      english: dynamicConj.english,
      level: 'Universal'
    });
  }

  return matched.slice(0, 100);
}
