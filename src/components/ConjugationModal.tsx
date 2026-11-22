import React, { useState } from 'react';
import { X, Volume2, Sparkles, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { conjugateVerb } from '../utils/conjugator';
import { speakGerman } from '../utils/audio';

interface ConjugationModalProps {
  verb: string;
  onClose: () => void;
  onGoToConjugationTab?: (verb: string) => void;
  speechSpeed: number;
}

export const ConjugationModal: React.FC<ConjugationModalProps> = ({
  verb,
  onClose,
  onGoToConjugationTab,
  speechSpeed
}) => {
  const [selectedTense, setSelectedTense] = useState<
    'present' | 'perfect' | 'past' | 'pluperfect' | 'future1' | 'subjunctive2' | 'imperative' | 'participle'
  >('present');
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const conj = conjugateVerb(verb);

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

  const tenseTabs: {
    id: 'present' | 'perfect' | 'past' | 'pluperfect' | 'future1' | 'subjunctive2' | 'imperative' | 'participle';
    labelGerman: string;
    labelBangla: string;
  }[] = [
    { id: 'present', labelGerman: 'Präsens', labelBangla: 'বর্তমান কাল' },
    { id: 'perfect', labelGerman: 'Perfekt', labelBangla: 'কথ্য অতীত / পুরাঘটিত বর্তমান' },
    { id: 'past', labelGerman: 'Präteritum', labelBangla: 'সাধারণ অতীত কাল' },
    { id: 'pluperfect', labelGerman: 'Plusquamperfekt', labelBangla: 'পুরাঘটিত অতীত' },
    { id: 'future1', labelGerman: 'Futur I', labelBangla: 'ভবিষ্যৎ কাল' },
    { id: 'subjunctive2', labelGerman: 'Konjunktiv II', labelBangla: 'ইচ্ছা / বিনম্র রূপ' },
    { id: 'imperative', labelGerman: 'Imperativ', labelBangla: 'আদেশ / অনুরোধ' },
    { id: 'participle', labelGerman: 'Partizip & Infinitiv', labelBangla: 'অসমাপিকা রূপ' }
  ];

  const getTenseData = () => {
    switch (selectedTense) {
      case 'present':
        return {
          title: 'Indikativ Präsens (সাধারণ বর্তমান কাল)',
          desc: 'বর্তমান সময় বা নিকট ভবিষ্যতের জন্য ব্যবহৃত হয়।',
          data: [
            { pronoun: 'ich (আমি)', form: conj.present.ich },
            { pronoun: 'du (তুমি)', form: conj.present.du },
            { pronoun: 'er / sie / es (সে)', form: conj.present.erSieEs },
            { pronoun: 'wir (আমরা)', form: conj.present.wir },
            { pronoun: 'ihr (তোমরা)', form: conj.present.ihr },
            { pronoun: 'sie / Sie (তারা/আপনি)', form: conj.present.sieSie }
          ]
        };
      case 'perfect':
        return {
          title: `Indikativ Perfekt (সহায়ক ক্রিয়া: ${conj.auxiliary})`,
          desc: 'দৈনন্দিন কথ্য ভাষায় অতীত ঘটনা প্রকাশে সর্বাধিক ব্যবহৃত হয়।',
          data: [
            { pronoun: 'ich', form: `ich ${conj.perfect.ich}` },
            { pronoun: 'du', form: `du ${conj.perfect.du}` },
            { pronoun: 'er / sie / es', form: `er ${conj.perfect.erSieEs}` },
            { pronoun: 'wir', form: `wir ${conj.perfect.wir}` },
            { pronoun: 'ihr', form: `ihr ${conj.perfect.ihr}` },
            { pronoun: 'sie / Sie', form: `sie ${conj.perfect.sieSie}` }
          ]
        };
      case 'past':
        return {
          title: 'Indikativ Präteritum (সাধারণ লিখিত অতীত)',
          desc: 'সংবাদ, বই, লিখিত রূপ এবং সহায়ক/মোডাল ক্রিয়ার সাধারণ অতীত।',
          data: [
            { pronoun: 'ich', form: conj.past.ich },
            { pronoun: 'du', form: conj.past.du },
            { pronoun: 'er / sie / es', form: conj.past.erSieEs },
            { pronoun: 'wir', form: conj.past.wir },
            { pronoun: 'ihr', form: conj.past.ihr },
            { pronoun: 'sie / Sie', form: conj.past.sieSie }
          ]
        };
      case 'pluperfect':
        return {
          title: 'Indikativ Plusquamperfekt (পুরাঘটিত অতীত কাল)',
          desc: 'অতীতের কোনো ঘটনারও আগে সম্পন্ন হওয়া কাজ।',
          data: [
            { pronoun: 'ich', form: `ich ${conj.pluperfect.ich}` },
            { pronoun: 'du', form: `du ${conj.pluperfect.du}` },
            { pronoun: 'er / sie / es', form: `er ${conj.pluperfect.erSieEs}` },
            { pronoun: 'wir', form: `wir ${conj.pluperfect.wir}` },
            { pronoun: 'ihr', form: `ihr ${conj.pluperfect.ihr}` },
            { pronoun: 'sie / Sie', form: `sie ${conj.pluperfect.sieSie}` }
          ]
        };
      case 'future1':
        return {
          title: 'Indikativ Futur I (ভবিষ্যৎ কাল)',
          desc: 'ভবিষ্যতের পরিকল্পনা বা অনুমান প্রকাশের জন্য।',
          data: [
            { pronoun: 'ich', form: conj.future1.ich },
            { pronoun: 'du', form: conj.future1.du },
            { pronoun: 'er / sie / es', form: conj.future1.erSieEs },
            { pronoun: 'wir', form: conj.future1.wir },
            { pronoun: 'ihr', form: conj.future1.ihr },
            { pronoun: 'sie / Sie', form: conj.future1.sieSie }
          ]
        };
      case 'subjunctive2':
        return {
          title: 'Konjunktiv II (স্বপ্ন, ইচ্ছা, শর্ত ও বিনম্র অনুরোধ)',
          desc: 'কাল্পনিক অবস্থা বা ভদ্রভাবে কোনো কিছু চাইতে ব্যবহৃত হয়।',
          data: [
            { pronoun: 'ich', form: conj.subjunctive2.ich },
            { pronoun: 'du', form: conj.subjunctive2.du },
            { pronoun: 'er / sie / es', form: conj.subjunctive2.erSieEs },
            { pronoun: 'wir', form: conj.subjunctive2.wir },
            { pronoun: 'ihr', form: conj.subjunctive2.ihr },
            { pronoun: 'sie / Sie', form: conj.subjunctive2.sieSie }
          ]
        };
      case 'imperative':
        return {
          title: 'Imperativ Präsens (আদেশ ও অনুরোধের রূপ)',
          desc: 'কাউকে কোনো কিছু করার নির্দেশ বা বিনীত অনুরোধ করতে।',
          data: [
            { pronoun: 'du-Form (একবচন আপনজন)', form: conj.imperative.du },
            { pronoun: 'wir-Form (চল যাই)', form: conj.imperative.wir },
            { pronoun: 'ihr-Form (তোমরা সবাই)', form: conj.imperative.ihr },
            { pronoun: 'Sie-Form (সম্মানসূচক)', form: conj.imperative.Sie }
          ]
        };
      case 'participle':
        return {
          title: 'Partizipien & Infinitiv mit "zu"',
          desc: 'অসমাপিকা ক্রিয়া এবং বাক্যের শেষে ব্যবহৃত ভাববাচক রূপ।',
          data: [
            { pronoun: 'Partizip I (Präsens)', form: conj.participle.present },
            { pronoun: 'Partizip II (Perfekt)', form: conj.participle.past },
            { pronoun: 'Infinitiv mit "zu"', form: conj.infinitiveWithZu }
          ]
        };
    }
  };

  const currentTense = getTenseData();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/80 dark:bg-slate-900/80">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-300/60 dark:border-red-800">
                {conj.verbType === 'irregular'
                  ? 'Starkes Verb (অনিয়মিত)'
                  : conj.verbType === 'modal'
                  ? 'Modalverb (মোডাল)'
                  : conj.verbType === 'mixed'
                  ? 'Gemischtes Verb (মিশ্র)'
                  : 'Regelmäßiges Verb (নিয়মিত)'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Hilfsverb: <strong>{conj.auxiliary}</strong>
              </span>
              {conj.isSeparable && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                  Trennbar ({conj.prefix})
                </span>
              )}
              {conj.isReflexive && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300">
                  Reflexiv (sich)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {conj.infinitive}
              </h2>
              <button
                onClick={() => playAudio(conj.infinitive, 'headword')}
                className={`p-2 rounded-xl text-xs font-bold transition-all ${
                  playingKey === 'headword'
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/70 dark:text-red-300'
                }`}
                title="উচ্চারণ শুনুন"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1">
              বাংলা: <span className="text-emerald-700 dark:text-emerald-400">{conj.bangla}</span> · English:{' '}
              <span className="text-slate-600 dark:text-slate-400">{conj.english}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tense navigation tabs */}
        <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-x-auto flex items-center gap-1.5 scrollbar-thin">
          {tenseTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTense(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex flex-col items-center gap-0.5 ${
                selectedTense === tab.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{tab.labelGerman}</span>
              <span
                className={`text-[9px] font-normal ${
                  selectedTense === tab.id ? 'text-red-100' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {tab.labelBangla}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Tense Summary Banner */}
          <div className="bg-red-50/60 dark:bg-red-950/20 border border-red-200/70 dark:border-red-900/40 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-sm text-red-900 dark:text-red-200">{currentTense.title}</h4>
              <p className="text-xs text-red-700/90 dark:text-red-300/80 mt-0.5">{currentTense.desc}</p>
            </div>
          </div>

          {/* Conjugation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentTense.data.map((row, idx) => {
              const rowKey = `tense-${idx}`;
              const isPlaying = playingKey === rowKey;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-3.5 flex items-center justify-between gap-2 hover:border-red-300 dark:hover:border-red-800/80 transition-all"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 block mb-0.5">
                      {row.pronoun}
                    </span>
                    <strong className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {row.form}
                    </strong>
                  </div>

                  <button
                    onClick={() => playAudio(row.form, rowKey)}
                    className={`p-2 rounded-xl transition-all ${
                      isPlaying
                        ? 'bg-red-600 text-white animate-pulse'
                        : 'text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-700'
                    }`}
                    title="উচ্চারণ শুনুন"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Example Sentence if available */}
          {conj.exampleSentence && (
            <div className="bg-slate-100/70 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">
                Beispielsatz (উদাহরণ বাক্য)
              </span>
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {conj.exampleSentence.german}
                </p>
                <button
                  onClick={() => playAudio(conj.exampleSentence!.german, 'example')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              {conj.exampleSentence.bangla && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                  {conj.exampleSentence.bangla}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer / Jump to full page */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            সমস্ত Zeitformen এবং ব্যাকরণ নিয়ম দেখতে কনজুগেশন পেজে যান।
          </p>
          {onGoToConjugationTab && (
            <button
              onClick={() => {
                onClose();
                onGoToConjugationTab(conj.infinitive);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>পূর্ণাঙ্গ কনজুগেশন ভিউ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
