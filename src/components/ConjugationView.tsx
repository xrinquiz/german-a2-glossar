import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  Sparkles,
  BookOpen,
  Layers,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Filter,
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { conjugateVerb, searchVerbs, getAllAvailableVerbs } from '../utils/conjugator';
import { GRAMMAR_TOPICS } from '../data/conjugationTopics';
import { TOP_ESSENTIAL_VERBS } from '../data/conjugationData';
import { speakGerman } from '../utils/audio';
import { GrammarTopic } from '../types/conjugation';

interface ConjugationViewProps {
  initialVerb?: string;
  speechSpeed: number;
}

export const ConjugationView: React.FC<ConjugationViewProps> = ({
  initialVerb = 'machen',
  speechSpeed
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'conjugator' | 'grammar'>('conjugator');
  const [selectedVerb, setSelectedVerb] = useState<string>(initialVerb || 'machen');
  const [searchInput, setSearchInput] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'A1' | 'A2' | 'B1'>('all');
  const [filterType, setFilterType] = useState<'all' | 'regular' | 'irregular' | 'modal'>('all');
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const [grammarSearch, setGrammarSearch] = useState<string>('');
  const [expandedTopicId, setExpandedTopicId] = useState<string>('intro-categories');

  // Conjugation of currently active verb
  const conj = useMemo(() => {
    return conjugateVerb(selectedVerb);
  }, [selectedVerb]);

  // Audio helper
  const playAudio = (text: string, key: string) => {
    if (playingKey) return;
    setPlayingKey(key);
    speakGerman(
      text,
      speechSpeed,
      () => setPlayingKey(key),
      () => setPlayingKey(null),
      () => setPlayingKey(null)
    );
  };

  // Search results for verbs
  const searchResults = useMemo(() => {
    return searchVerbs(searchInput);
  }, [searchInput]);

  // Filtered topics in grammar guide
  const filteredTopics = useMemo(() => {
    if (!grammarSearch.trim()) return GRAMMAR_TOPICS;
    const q = grammarSearch.toLowerCase();
    return GRAMMAR_TOPICS.filter(
      (t) =>
        t.titleGerman.toLowerCase().includes(q) ||
        t.titleBangla.toLowerCase().includes(q) ||
        t.summaryBangla.toLowerCase().includes(q) ||
        t.sections.some(
          (s) =>
            s.headingGerman.toLowerCase().includes(q) ||
            s.headingBangla.toLowerCase().includes(q) ||
            s.contentBangla.toLowerCase().includes(q)
        )
    );
  }, [grammarSearch]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Heading & Main Tab Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-300/50">
              Deutsche Verben & Grammatik
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              বিশ্বের যেকোনো জার্মান ক্রিয়ার কনজুগেশন ইঞ্জিন (১,৫০০+ ইনডেক্সড ও ইউনিভার্সাল অ্যালগরিদম)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ইউনিভার্সাল জার্মান ভার্ব কনজুগেশন ও ব্যাকরণ গাইড
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            ১৭৩টি ঐতিহাসিক রুট, সমস্ত উপসর্গ এবং যেকোনো দুর্বল বা মিশ্র ক্রিয়ার পূর্ণাঙ্গ ৬টি Zeitformen, Konjunktiv, Imperativ ও অডিও উচ্চারণ।
          </p>
        </div>

        {/* Tab Pills: Conjugator vs Grammar Guide */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveMainTab('conjugator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMainTab === 'conjugator'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>ভার্ব কনজুগেশন টেবিল</span>
          </button>
          <button
            onClick={() => setActiveMainTab('grammar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMainTab === 'grammar'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>ব্যাকরণ ও নিয়মাবলী (১১টি টপিক)</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* VIEW 1: VERB CONJUGATOR                                         */}
      {/* ============================================================== */}
      {activeMainTab === 'conjugator' && (
        <div className="space-y-6">
          {/* Search & Popular Verbs Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchInput.trim()) {
                      setSelectedVerb(searchInput.trim());
                      setSearchInput('');
                    }
                  }}
                  placeholder="বিশ্বের যেকোনো জার্মান ক্রিয়া টাইপ করুন (যেমন: aufstehen, verstehen, zerreißen, frühstücken, studieren...)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                />
              </div>

              {searchInput.trim() && (
                <button
                  onClick={() => {
                    if (searchInput.trim()) {
                      setSelectedVerb(searchInput.trim());
                      setSearchInput('');
                    }
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm whitespace-nowrap"
                >
                  কনজুগেট করুন
                </button>
              )}
            </div>

            {/* Quick autocomplete dropdown if searching */}
            {searchInput.trim() && searchResults.length > 0 && (
              <div className="p-2 bg-slate-50 dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 max-h-56 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 scrollbar-thin">
                {searchResults.slice(0, 12).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedVerb(item.infinitive);
                      setSearchInput('');
                    }}
                    className="p-2 rounded-xl text-left hover:bg-red-50 dark:hover:bg-red-950/40 border border-transparent hover:border-red-200 dark:hover:border-red-900 transition-all flex items-center justify-between"
                  >
                    <div>
                      <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                        {item.infinitive}
                      </strong>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px] block">
                        {item.bangla}
                      </span>
                    </div>
                    {item.level && (
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {item.level}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Popular Verbs Ribbon */}
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                জনপ্রিয় ও অপরিহার্য ক্রিয়াসমূহ (দ্রুত সিলেক্ট করুন):
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {TOP_ESSENTIAL_VERBS.slice(0, 20).map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVerb(v)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      selectedVerb === v
                        ? 'bg-red-600 text-white shadow-sm ring-2 ring-red-400/40'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Current Verb Hero Banner */}
          <div className="bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 pointer-events-none rounded-r-3xl transform skew-x-12" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-sm text-white border border-white/30">
                    {conj.verbType === 'irregular'
                      ? 'সবল ক্রিয়া (Starkes Verb)'
                      : conj.verbType === 'modal'
                      ? 'মোডাল ক্রিয়া (Modalverb)'
                      : conj.verbType === 'mixed'
                      ? 'মিশ্র ক্রিয়া (Gemischtes Verb)'
                      : 'নিয়মিত দুর্বল ক্রিয়া (Schwaches Verb)'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-sm text-white border border-white/30">
                    Hilfsverb: <strong>{conj.auxiliary}</strong>
                  </span>
                  {conj.isSeparable && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900">
                      বিভাজ্য ক্রিয়া ({conj.prefix})
                    </span>
                  )}
                  {conj.level && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-white text-red-700">
                      {conj.level}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight break-words">{conj.infinitive}</h2>
                  <button
                    onClick={() => playAudio(conj.infinitive, 'hero-infinitive')}
                    className={`p-3 rounded-2xl transition-all shadow-md ${
                      playingKey === 'hero-infinitive'
                        ? 'bg-white text-red-600 animate-pulse'
                        : 'bg-white/20 hover:bg-white text-white hover:text-red-600 backdrop-blur-sm'
                    }`}
                    title="উচ্চারণ শুনুন"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-base sm:text-lg font-medium text-white/95 mt-2">
                  বাংলা অর্থ: <strong className="font-bold underline decoration-amber-300">{conj.bangla}</strong>
                </p>
                <p className="text-xs sm:text-sm text-white/80 mt-0.5">English: {conj.english}</p>

                {conj.derivationNote && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{conj.derivationNote}</span>
                  </div>
                )}
              </div>

              {/* Quick Principle Forms Card */}
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 w-full md:w-auto min-w-0 sm:min-w-[240px] space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-white/70 block">
                  Stammformen (প্রধান রূপত্রয়):
                </span>
                <div className="text-xs sm:text-sm font-mono space-y-1">
                  <div>
                    <span className="text-white/60">Infinitiv:</span>{' '}
                    <strong className="text-white">{conj.infinitive}</strong>
                  </div>
                  <div>
                    <span className="text-white/60">Präteritum:</span>{' '}
                    <strong className="text-white">{conj.past.erSieEs}</strong>
                  </div>
                  <div>
                    <span className="text-white/60">Partizip II:</span>{' '}
                    <strong className="text-amber-300">
                      {conj.participle.past} ({conj.auxiliary})
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Example sentence if present */}
            {conj.exampleSentence && (
              <div className="mt-5 pt-4 border-t border-white/20 flex items-start justify-between gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/70 block">
                    Beispielsatz (উদাহরণ বাক্য):
                  </span>
                  <p className="font-bold text-white mt-0.5">"{conj.exampleSentence.german}"</p>
                  {conj.exampleSentence.bangla && (
                    <p className="text-white/80 text-xs mt-0.5">({conj.exampleSentence.bangla})</p>
                  )}
                </div>
                <button
                  onClick={() => playAudio(conj.exampleSentence!.german, 'hero-example')}
                  className="p-2 rounded-xl bg-white/20 hover:bg-white text-white hover:text-red-600 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* ==================== 6 TENSES GRID ==================== */}
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-red-600" />
              <span>Indikativ (বাস্তব রূপের ৬টি কাল)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* 1. Präsens */}
              <TenseCard
                titleGerman="Präsens"
                titleBangla="সাধারণ বর্তমান কাল"
                desc="বর্তমান বা নিকট ভবিষ্যতের ঘটনা"
                forms={[
                  { p: 'ich', v: conj.present.ich },
                  { p: 'du', v: conj.present.du },
                  { p: 'er/sie/es', v: conj.present.erSieEs },
                  { p: 'wir', v: conj.present.wir },
                  { p: 'ihr', v: conj.present.ihr },
                  { p: 'sie/Sie', v: conj.present.sieSie }
                ]}
                onPlay={(text, key) => playAudio(text, `pres-${key}`)}
                playingKey={playingKey}
                prefixKey="pres"
              />

              {/* 2. Perfekt */}
              <TenseCard
                titleGerman="Perfekt"
                titleBangla="কথ্য অতীত (পুরাঘটিত বর্তমান)"
                desc={`সহায়ক ক্রিয়া ${conj.auxiliary} + Partizip II`}
                forms={[
                  { p: 'ich', v: `ich ${conj.perfect.ich}` },
                  { p: 'du', v: `du ${conj.perfect.du}` },
                  { p: 'er/sie/es', v: `er ${conj.perfect.erSieEs}` },
                  { p: 'wir', v: `wir ${conj.perfect.wir}` },
                  { p: 'ihr', v: `ihr ${conj.perfect.ihr}` },
                  { p: 'sie/Sie', v: `sie ${conj.perfect.sieSie}` }
                ]}
                onPlay={(text, key) => playAudio(text, `perf-${key}`)}
                playingKey={playingKey}
                prefixKey="perf"
              />

              {/* 3. Präteritum */}
              <TenseCard
                titleGerman="Präteritum"
                titleBangla="সাধারণ লিখিত অতীত কাল"
                desc="সংবাদপত্র, বই ও আনুষ্ঠানিক বর্ণনায়"
                forms={[
                  { p: 'ich', v: conj.past.ich },
                  { p: 'du', v: conj.past.du },
                  { p: 'er/sie/es', v: conj.past.erSieEs },
                  { p: 'wir', v: conj.past.wir },
                  { p: 'ihr', v: conj.past.ihr },
                  { p: 'sie/Sie', v: conj.past.sieSie }
                ]}
                onPlay={(text, key) => playAudio(text, `past-${key}`)}
                playingKey={playingKey}
                prefixKey="past"
              />

              {/* 4. Plusquamperfekt */}
              <TenseCard
                titleGerman="Plusquamperfekt"
                titleBangla="পুরাঘটিত অতীত কাল"
                desc="অতীতের আগের অতীত ঘটনা"
                forms={[
                  { p: 'ich', v: `ich ${conj.pluperfect.ich}` },
                  { p: 'du', v: `du ${conj.pluperfect.du}` },
                  { p: 'er/sie/es', v: `er ${conj.pluperfect.erSieEs}` },
                  { p: 'wir', v: `wir ${conj.pluperfect.wir}` },
                  { p: 'ihr', v: `ihr ${conj.pluperfect.ihr}` },
                  { p: 'sie/Sie', v: `sie ${conj.pluperfect.sieSie}` }
                ]}
                onPlay={(text, key) => playAudio(text, `plup-${key}`)}
                playingKey={playingKey}
                prefixKey="plup"
              />

              {/* 5. Futur I */}
              <TenseCard
                titleGerman="Futur I"
                titleBangla="ভবিষ্যৎ কাল"
                desc="পরিকল্পনা বা অনুমান (werden + Infinitiv)"
                forms={[
                  { p: 'ich', v: conj.future1.ich },
                  { p: 'du', v: conj.future1.du },
                  { p: 'er/sie/es', v: conj.future1.erSieEs },
                  { p: 'wir', v: conj.future1.wir },
                  { p: 'ihr', v: conj.future1.ihr },
                  { p: 'sie/Sie', v: conj.future1.sieSie }
                ]}
                onPlay={(text, key) => playAudio(text, `fut1-${key}`)}
                playingKey={playingKey}
                prefixKey="fut1"
              />

              {/* 6. Futur II */}
              <TenseCard
                titleGerman="Futur II"
                titleBangla="পুরাঘটিত ভবিষ্যৎ কাল"
                desc="ভবিষ্যতে সম্পন্ন হয়ে থাকবে এমন অনুমান"
                forms={[
                  { p: 'ich', v: conj.future2.ich },
                  { p: 'du', v: conj.future2.du },
                  { p: 'er/sie/es', v: conj.future2.erSieEs },
                  { p: 'wir', v: conj.future2.wir },
                  { p: 'ihr', v: conj.future2.ihr },
                  { p: 'sie/Sie', v: conj.future2.sieSie }
                ]}
                onPlay={(text, key) => playAudio(text, `fut2-${key}`)}
                playingKey={playingKey}
                prefixKey="fut2"
              />
            </div>
          </div>

          {/* ==================== KONJUNKTIV & IMPERATIV ==================== */}
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Konjunktiv, Imperativ & Partizipien (অন্যান্য ভাব ও রূপ)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Konjunktiv II */}
              <TenseCard
                titleGerman="Konjunktiv II"
                titleBangla="ইচ্ছা, শর্ত ও বিনম্র অনুরোধ"
                desc="অবাস্তব কল্পনা বা ভদ্রতা প্রকাশে"
                forms={[
                  { p: 'ich', v: conj.subjunctive2.ich },
                  { p: 'du', v: conj.subjunctive2.du },
                  { p: 'er/sie/es', v: conj.subjunctive2.erSieEs },
                  { p: 'wir', v: conj.subjunctive2.wir },
                  { p: 'ihr', v: conj.subjunctive2.ihr },
                  { p: 'sie/Sie', v: conj.subjunctive2.sieSie }
                ]}
                onPlay={(text, key) => playAudio(text, `k2-${key}`)}
                playingKey={playingKey}
                prefixKey="k2"
              />

              {/* Imperativ */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Imperativ Präsens</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      আদেশ ও অনুরোধ
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    কাউকে সরাসরি নির্দেশ বা অনুরোধ করা
                  </p>

                  <div className="space-y-2 font-sans">
                    <ImperativeRow
                      label="du-Form (আপনজন)"
                      value={conj.imperative.du}
                      onPlay={() => playAudio(conj.imperative.du, 'imp-du')}
                      isPlaying={playingKey === 'imp-du'}
                    />
                    <ImperativeRow
                      label="wir-Form (চল যাই)"
                      value={conj.imperative.wir}
                      onPlay={() => playAudio(conj.imperative.wir, 'imp-wir')}
                      isPlaying={playingKey === 'imp-wir'}
                    />
                    <ImperativeRow
                      label="ihr-Form (তোমরা)"
                      value={conj.imperative.ihr}
                      onPlay={() => playAudio(conj.imperative.ihr, 'imp-ihr')}
                      isPlaying={playingKey === 'imp-ihr'}
                    />
                    <ImperativeRow
                      label="Sie-Form (সম্মানসূচক)"
                      value={conj.imperative.Sie}
                      onPlay={() => playAudio(conj.imperative.Sie, 'imp-Sie')}
                      isPlaying={playingKey === 'imp-Sie'}
                    />
                  </div>
                </div>
              </div>

              {/* Partizipien & Infinitiv */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Partizip & Infinitiv</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      অসমাপিকা রূপ
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    কাল ও ভাববাচক বাক্যে ব্যবহৃত গঠন
                  </p>

                  <div className="space-y-2 font-sans">
                    <ImperativeRow
                      label="Partizip I (Präsens)"
                      value={conj.participle.present}
                      onPlay={() => playAudio(conj.participle.present, 'part-1')}
                      isPlaying={playingKey === 'part-1'}
                    />
                    <ImperativeRow
                      label="Partizip II (Perfekt)"
                      value={conj.participle.past}
                      onPlay={() => playAudio(conj.participle.past, 'part-2')}
                      isPlaying={playingKey === 'part-2'}
                    />
                    <ImperativeRow
                      label='Infinitiv mit "zu"'
                      value={conj.infinitiveWithZu}
                      onPlay={() => playAudio(conj.infinitiveWithZu, 'inf-zu')}
                      isPlaying={playingKey === 'inf-zu'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: COMPREHENSIVE GRAMMAR GUIDE (11 TOPICS)                 */}
      {/* ============================================================== */}
      {activeMainTab === 'grammar' && (
        <div className="space-y-6">
          {/* Search within Grammar Topics */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={grammarSearch}
                onChange={(e) => setGrammarSearch(e.target.value)}
                placeholder="ব্যাকরণ টপিক বা নিয়ম খুঁজুন (যেমন: Trennbare Verben, Perfekt, Konjunktiv, Passiv, ইত্যাদি)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
              />
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
              মোট টপিক: {filteredTopics.length} / {GRAMMAR_TOPICS.length}
            </div>
          </div>

          {/* Topics List */}
          <div className="space-y-4">
            {filteredTopics.map((topic) => {
              const isExpanded = expandedTopicId === topic.id;
              return (
                <div
                  key={topic.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
                >
                  {/* Topic Header Accordion Button */}
                  <button
                    onClick={() => setExpandedTopicId(isExpanded ? '' : topic.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300">
                          টপিক #{topic.number}
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                          {topic.titleGerman}
                        </h3>
                      </div>
                      <h4 className="text-sm font-bold text-red-600 dark:text-red-400">
                        {topic.titleBangla}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {topic.summaryBangla}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* Expanded Topic Content */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800 space-y-6 bg-slate-50/50 dark:bg-slate-900/40">
                      {topic.sections.map((sec, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-white dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 space-y-4"
                        >
                          <div>
                            <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                              {sec.headingGerman}
                            </h4>
                            <h5 className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              {sec.headingBangla}
                            </h5>
                          </div>

                          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            <p className="bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 font-medium">
                              {sec.contentBangla}
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs italic">
                              {sec.contentGerman}
                            </p>
                          </div>

                          {/* Table if present */}
                          {sec.table && (
                            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="bg-slate-100 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 font-extrabold">
                                    {sec.table.headers.map((h, hIdx) => (
                                      <th key={hIdx} className="p-3 border-b border-slate-200 dark:border-slate-700">
                                        {h}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {sec.table.rows.map((row, rIdx) => (
                                    <tr
                                      key={rIdx}
                                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
                                    >
                                      {row.map((cell, cIdx) => (
                                        <td
                                          key={cIdx}
                                          className={`p-3 ${
                                            cIdx === 0
                                              ? 'font-bold text-red-600 dark:text-red-400'
                                              : 'text-slate-700 dark:text-slate-300'
                                          }`}
                                        >
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* Examples if present */}
                          {sec.examples && sec.examples.length > 0 && (
                            <div className="space-y-2 pt-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                                Beispielsätze (উদাহরণসমূহ):
                              </span>
                              <div className="space-y-2">
                                {sec.examples.map((ex, exIdx) => {
                                  const exKey = `ex-${topic.id}-${sIdx}-${exIdx}`;
                                  const isPlaying = playingKey === exKey;
                                  return (
                                    <div
                                      key={exIdx}
                                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 flex items-start justify-between gap-3"
                                    >
                                      <div>
                                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                          {ex.german}
                                        </p>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                                          বাংলা: {ex.bangla}
                                        </p>
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                          English: {ex.english}
                                        </p>
                                      </div>
                                      <button
                                        onClick={() => playAudio(ex.german, exKey)}
                                        className={`p-1.5 rounded-lg transition-all ${
                                          isPlaying
                                            ? 'bg-red-600 text-white animate-pulse'
                                            : 'text-slate-400 hover:text-red-600 hover:bg-slate-200 dark:hover:bg-slate-700'
                                        }`}
                                      >
                                        <Volume2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Subcomponent: Tense Card
interface TenseCardProps {
  titleGerman: string;
  titleBangla: string;
  desc: string;
  forms: { p: string; v: string }[];
  onPlay: (text: string, key: string) => void;
  playingKey: string | null;
  prefixKey: string;
}

const TenseCard: React.FC<TenseCardProps> = ({
  titleGerman,
  titleBangla,
  desc,
  forms,
  onPlay,
  playingKey,
  prefixKey
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
      <div>
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{titleGerman}</h4>
          <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-full">
            {titleBangla}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3.5">{desc}</p>

        <div className="space-y-1.5 font-sans">
          {forms.map((item, idx) => {
            const rowKey = `${prefixKey}-${idx}`;
            const isPlaying = playingKey === rowKey;
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate-400 w-16">{item.p}</span>
                  <strong className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                    {item.v}
                  </strong>
                </div>

                <button
                  onClick={() => onPlay(item.v, rowKey)}
                  className={`p-1.5 rounded-lg transition-all ${
                    isPlaying
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'text-slate-400 hover:text-red-600 hover:bg-white dark:hover:bg-slate-700'
                  }`}
                  title="শুনুন"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Subcomponent: Imperative / Participle Row
const ImperativeRow: React.FC<{
  label: string;
  value: string;
  onPlay: () => void;
  isPlaying: boolean;
}> = ({ label, value, onPlay, isPlaying }) => {
  return (
    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
      <div>
        <span className="text-[10px] font-semibold text-slate-400 block">{label}</span>
        <strong className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{value}</strong>
      </div>
      <button
        onClick={onPlay}
        className={`p-1.5 rounded-lg transition-all ${
          isPlaying
            ? 'bg-red-600 text-white animate-pulse'
            : 'text-slate-400 hover:text-red-600 hover:bg-white dark:hover:bg-slate-700'
        }`}
      >
        <Volume2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
