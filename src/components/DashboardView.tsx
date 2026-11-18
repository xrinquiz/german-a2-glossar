import React from 'react';
import { BookOpen, CheckCircle2, RotateCcw, Star, Sparkles, ArrowRight, Play, Award, Zap, FileText } from 'lucide-react';
import { VocabularyItem, UserProgressState, LanguageLevel, ChapterInfo } from '../types';
import { VocabularyCard } from './VocabularyCard';

interface DashboardViewProps {
  vocabulary: VocabularyItem[];
  progress: UserProgressState;
  selectedLevel: LanguageLevel;
  setSelectedLevel: (lvl: LanguageLevel) => void;
  chapters: ChapterInfo[];
  onSelectKapitel: (kapitelId: string) => void;
  onStartFlashcards: (kapitelId?: string) => void;
  onStartLearn: (kapitelId?: string) => void;
  onToggleLearned: (id: number) => void;
  onTogglePractice: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  speechSpeed: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  vocabulary,
  progress,
  selectedLevel,
  setSelectedLevel,
  chapters,
  onSelectKapitel,
  onStartFlashcards,
  onStartLearn,
  onToggleLearned,
  onTogglePractice,
  onToggleFavorite,
  speechSpeed
}) => {
  const totalWords = vocabulary.length;
  const learnedCount = vocabulary.filter((w) => progress.learned.includes(w.id)).length;
  const practiceCount = vocabulary.filter((w) => progress.practice.includes(w.id)).length;
  const favoritesCount = vocabulary.filter((w) => progress.favorites.includes(w.id)).length;
  const progressPercent = totalWords > 0 ? Math.round((learnedCount / totalWords) * 1000) / 10 : 0;

  // Calculate chapter stats
  const chapterStats = chapters.map((ch) => {
    const chapterWords = vocabulary.filter(
      (w) => w.kapitel === ch.id && (selectedLevel === 'all' ? w.level === ch.level : true)
    );
    const count = chapterWords.length || ch.wordCount;
    const learnedInChapter = chapterWords.filter((w) => progress.learned.includes(w.id)).length;
    const percent = count > 0 ? Math.round((learnedInChapter / count) * 100) : 0;
    return {
      ...ch,
      count,
      learnedCount: learnedInChapter,
      percent
    };
  });

  // Recent words
  const recentWords = progress.history
    .slice(-6)
    .reverse()
    .map((id) => vocabulary.find((w) => w.id === id))
    .filter(Boolean) as VocabularyItem[];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold mb-4">
            <span>🇩🇪 {selectedLevel === 'all' ? 'A1 + A2 + B1 All-in-One' : `Netzwerk neu ${selectedLevel}`} Vokabeltraining</span>
            <span>•</span>
            <span>বাংলা ও ইংরেজি অর্থ</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {selectedLevel === 'A1'
              ? 'Willkommen zum Netzwerk neu A1 Glossar'
              : selectedLevel === 'A2'
              ? 'Willkommen zum Netzwerk neu A2 Glossar'
              : selectedLevel === 'B1'
              ? 'Willkommen zum Netzwerk neu B1 Glossar'
              : 'Willkommen zum Netzwerk neu A1 + A2 + B1 Glossar'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            {selectedLevel === 'A1'
              ? 'Meistere alle 12 Kapitel und 1.924 essenzielle A1 Vokabeln mit deutscher Audio-Aussprache, präzisen bengalischen und englischen Bedeutungen und Beispielsätzen.'
              : selectedLevel === 'A2'
              ? 'Meistere alle 12 Kapitel und 1.449 essenzielle A2 Vokabeln mit deutscher Audio-Aussprache, präzisen bengalischen und englischen Bedeutungen und Beispielsätzen.'
              : selectedLevel === 'B1'
              ? 'Meistere alle 12 Kapitel und 1.799 essenzielle B1 Vokabeln der offiziellen Klett Glossare mit präzisem Bangla, Englisch, Grammatik und Beispielsätzen.'
              : 'Das ultimative deutsche Lernportal: 36 Kapitel und über 5.100 Vokabeln (A1 + A2 + B1) mit bengalischen & englischen Bedeutungen, Audio und Beispielsätzen.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartLearn()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Learning Mode</span>
            </button>
            <button
              onClick={() => onStartFlashcards()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Study Flashcards</span>
            </button>
          </div>
        </div>

        {/* Decorative background badges */}
        <div className="absolute right-4 bottom-4 sm:right-8 sm:bottom-8 opacity-10 text-8xl font-black select-none pointer-events-none">
          {selectedLevel === 'all' ? 'A1/A2/B1' : selectedLevel}
        </div>
      </div>

      {/* Primary KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Words */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Words</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {totalWords.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {chapters.length} Kapitel ({selectedLevel === 'all' ? 'A1: 12 + A2: 12 + B1: 12' : `Level ${selectedLevel}`})
          </p>
        </div>

        {/* Learned Words */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Learned</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {learnedCount.toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{progressPercent}% of syllabus mastered</p>
        </div>

        {/* Need Practice */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Practice</span>
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 dark:text-orange-400">
            {practiceCount}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Difficult words flagged</p>
        </div>

        {/* Starred Favorites */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Favorites</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {favoritesCount}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Saved for quick access</p>
        </div>
      </div>

      {/* Global Progress Bar */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">A2 Vocabulary Progress</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {learnedCount} / {totalWords} words learned ({progressPercent}%)
            </p>
          </div>
          <span className="text-sm font-extrabold text-red-600 dark:text-red-400">{progressPercent}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(1, progressPercent))}%` }}
          />
        </div>
      </div>

      {/* Kapitel Grid */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Alle Kapitel ({chapters.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any chapter to study vocabulary or practice flashcards
            </p>
          </div>

          {/* Quick Level switch pill in chapters bar */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            <button
              onClick={() => setSelectedLevel('A1')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedLevel === 'A1'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              A1 (12)
            </button>
            <button
              onClick={() => setSelectedLevel('A2')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedLevel === 'A2'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              A2 (12)
            </button>
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedLevel === 'all'
                  ? 'bg-red-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All (24)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapterStats.map((ch) => {
            const chapKey = selectedLevel === 'all' ? (ch.uniqueKey || `${ch.level}:${ch.id}`) : ch.id;
            return (
              <div
                key={ch.uniqueKey || `${ch.level}-${ch.id}`}
                className="group rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-700/80 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 text-[10px] font-black rounded uppercase ${
                        ch.level === 'A1'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                      }`}>
                        {ch.level}
                      </span>
                      <span className="px-2.5 py-1 text-xs font-extrabold rounded-lg bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300">
                        {ch.id}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {ch.count} Wörter
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {ch.title}
                  </h3>
                  {ch.banglaTitle && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {ch.banglaTitle}
                    </p>
                  )}

                  {/* Progress bar inside card */}
                  <div className="mt-4 mb-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>Fortschritt</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{ch.percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${ch.percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/60 mt-2">
                  <button
                    onClick={() => onSelectKapitel(chapKey)}
                    className="flex-1 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40 dark:hover:text-red-300 transition-colors"
                  >
                    Wörter ({ch.count})
                  </button>
                  <button
                    onClick={() => onStartFlashcards(chapKey)}
                    className="px-3 py-2 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
                    title="Practice chapter flashcards"
                  >
                    Flashcards
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recently Studied */}
      {recentWords.length > 0 && (
        <div className="pt-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Recently Studied Vocabulary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentWords.map((item) => (
              <VocabularyCard
                key={item.id}
                item={item}
                isLearned={progress.learned.includes(item.id)}
                isPractice={progress.practice.includes(item.id)}
                isFavorite={progress.favorites.includes(item.id)}
                onToggleLearned={onToggleLearned}
                onTogglePractice={onTogglePractice}
                onToggleFavorite={onToggleFavorite}
                speechSpeed={speechSpeed}
              />
            ))}
          </div>
        </div>
      )}

      {/* Source Reference Section */}
      <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 flex items-start gap-4">
        <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Quelle: German A2 Glossar PDF (Authoritative Data Source)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            All 1,452 vocabulary items, original chapter classifications (Kapitel 1 bis Kapitel 12), articles, plural forms, Bengali meanings, and page numbers (Seiten 1–71) are extracted directly from the official A2-GLOSSAR-Bangla PDF document. German A2 example sentences are paired with clear English translations to ensure a complete, bilingual learning experience.
          </p>
        </div>
      </div>
    </div>
  );
};
