import React from 'react';
import { BookOpen, Sparkles, CheckCircle2, RotateCcw, ArrowRight, Play, FileText, BarChart } from 'lucide-react';
import { VocabularyItem, UserProgressState, LanguageLevel, ChapterInfo } from '../types';

interface KapitelOverviewProps {
  vocabulary: VocabularyItem[];
  progress: UserProgressState;
  selectedLevel: LanguageLevel;
  setSelectedLevel: (lvl: LanguageLevel) => void;
  chapters: ChapterInfo[];
  onSelectKapitel: (kapitelId: string) => void;
  onStartFlashcards: (kapitelId: string) => void;
  onStartLearn: (kapitelId: string) => void;
}

export const KapitelOverview: React.FC<KapitelOverviewProps> = ({
  vocabulary,
  progress,
  selectedLevel,
  setSelectedLevel,
  chapters,
  onSelectKapitel,
  onStartFlashcards,
  onStartLearn
}) => {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {selectedLevel === 'A1'
              ? 'Netzwerk neu A1 Kapitel (1–12)'
              : selectedLevel === 'A2'
              ? 'Netzwerk neu A2 Kapitel (1–12)'
              : selectedLevel === 'B1'
              ? 'Netzwerk neu B1 Kapitel (1–12)'
              : 'Netzwerk neu A1 + A2 + B1 Kapitel (36 Kapitel)'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {selectedLevel === 'A1'
              ? 'Kompletter Wortschatz für A1 aus dem offiziellen Netzwerk neu A1 Glossar (1.924 Wörter).'
              : selectedLevel === 'A2'
              ? 'Kompletter Wortschatz für A2 aus dem offiziellen Netzwerk neu A2 Glossar (1.449 Wörter).'
              : selectedLevel === 'B1'
              ? 'Kompletter Wortschatz für B1 aus den offiziellen Netzwerk neu B1 Glossaren (1.799 Wörter).'
              : 'Kompletter Wortschatz für A1, A2 & B1 (über 5.100 Wörter) mit বাংলা ও ইংরেজি অর্থ এবং অডিও।'}
          </p>
        </div>

        {/* Level Switcher buttons */}
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setSelectedLevel('A1')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedLevel === 'A1'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            A1 (12 Kap)
          </button>
          <button
            onClick={() => setSelectedLevel('A2')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedLevel === 'A2'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            A2 (12 Kap)
          </button>
          <button
            onClick={() => setSelectedLevel('B1')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedLevel === 'B1'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            B1 (12 Kap)
          </button>
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedLevel === 'all'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All (36 Kap)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {chapters.map((ch) => {
          const chapterWords = vocabulary.filter(
            (w) => w.kapitel === ch.id && (selectedLevel === 'all' ? w.level === ch.level : true)
          );
          const totalInChapter = chapterWords.length || ch.wordCount;
          const learnedCount = chapterWords.filter((w) => progress.learned.includes(w.id)).length;
          const percent = totalInChapter > 0 ? Math.round((learnedCount / totalInChapter) * 100) : 0;
          const chapKey = selectedLevel === 'all' ? (ch.uniqueKey || `${ch.level}:${ch.id}`) : ch.id;

          return (
            <div
              key={ch.uniqueKey || `${ch.level}-${ch.id}`}
              className="group rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-6 shadow-sm hover:shadow-lg hover:border-red-400 dark:hover:border-red-600 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                        ch.level === 'A1'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : ch.level === 'B1'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                      }`}
                    >
                      {ch.level}
                    </span>
                    <span className="px-3 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-sm">
                      {ch.id}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    PDF S. {ch.pageStart}–{ch.pageEnd}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {ch.title}
                </h3>
                {ch.banglaTitle && (
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                    {ch.banglaTitle}
                  </p>
                )}

                {/* Chapter stats badge */}
                <div className="grid grid-cols-2 gap-2 mt-4 mb-4 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                    <span className="text-xs text-slate-400 block">Wörter</span>
                    <span className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                      {totalInChapter}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 block">Gelernt</span>
                    <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-300">
                      {learnedCount}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span>Fortschritt</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{percent}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Chapter Topics / Themen list */}
                {(() => {
                  const chapterTopics = Array.from(new Set(chapterWords.map((w) => w.topic).filter(Boolean))) as string[];
                  if (chapterTopics.length === 0) return null;
                  return (
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block mb-1 uppercase tracking-wider">
                        Themen / Topics:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {chapterTopics.slice(0, 4).map((top) => (
                          <span
                            key={top}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300"
                          >
                            {top}
                          </span>
                        ))}
                        {chapterTopics.length > 4 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-500">
                            +{chapterTopics.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onStartLearn(chapKey)}
                    className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Learn Mode</span>
                  </button>

                  <button
                    onClick={() => onStartFlashcards(chapKey)}
                    className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Flashcards</span>
                  </button>
                </div>

                <button
                  onClick={() => onSelectKapitel(chapKey)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Browse Chapter Vocabulary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
