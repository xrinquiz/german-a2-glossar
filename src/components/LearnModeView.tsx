import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Star, Sparkles, HelpCircle, Layers } from 'lucide-react';
import { VocabularyItem, LanguageLevel, ChapterInfo } from '../types';
import { CHAPTERS, getChaptersByLevel } from '../data/chapters';
import { speakGerman } from '../utils/audio';

interface LearnModeViewProps {
  vocabulary: VocabularyItem[];
  initialKapitel?: string;
  learnedIds: number[];
  practiceIds: number[];
  favoriteIds: number[];
  onToggleLearned: (id: number) => void;
  onTogglePractice: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  speechSpeed: number;
  selectedLevel?: LanguageLevel;
  chapters?: ChapterInfo[];
}

export const LearnModeView: React.FC<LearnModeViewProps> = ({
  vocabulary,
  initialKapitel = 'Kapitel 1',
  learnedIds,
  practiceIds,
  favoriteIds,
  onToggleLearned,
  onTogglePractice,
  onToggleFavorite,
  speechSpeed,
  selectedLevel,
  chapters
}) => {
  const [selectedKapitel, setSelectedKapitel] = useState<string>(
    initialKapitel === 'all' ? 'Kapitel 1' : initialKapitel
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlayingWord, setIsPlayingWord] = useState<boolean>(false);
  const [isPlayingSentence, setIsPlayingSentence] = useState<boolean>(false);

  const availableChapters = useMemo(() => {
    if (chapters && chapters.length > 0) return chapters;
    if (selectedLevel) return getChaptersByLevel(selectedLevel);
    return CHAPTERS;
  }, [chapters, selectedLevel]);

  const chapterWords = useMemo(() => {
    if (selectedKapitel === 'all') return vocabulary;
    if (selectedKapitel.includes(':')) {
      const [lvl, kap] = selectedKapitel.split(':');
      return vocabulary.filter((w) => w.level === lvl && w.kapitel === kap);
    }
    return vocabulary.filter((w) => w.kapitel === selectedKapitel);
  }, [vocabulary, selectedKapitel]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedKapitel]);

  const currentItem = chapterWords[currentIndex] || null;

  const handleNext = () => {
    if (currentIndex < chapterWords.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.code === 'KeyL' && currentItem) {
        e.preventDefault();
        onToggleLearned(currentItem.id);
      } else if (e.code === 'KeyP' && currentItem) {
        e.preventDefault();
        onTogglePractice(currentItem.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, chapterWords, currentItem]);

  const handlePlayWord = () => {
    if (!currentItem || isPlayingWord) return;
    setIsPlayingWord(true);
    speakGerman(
      currentItem.german || currentItem.word,
      speechSpeed,
      () => setIsPlayingWord(true),
      () => setIsPlayingWord(false),
      () => setIsPlayingWord(false)
    );
  };

  const handlePlaySentence = () => {
    if (!currentItem?.exampleGerman || isPlayingSentence) return;
    setIsPlayingSentence(true);
    speakGerman(
      currentItem.exampleGerman,
      speechSpeed,
      () => setIsPlayingSentence(true),
      () => setIsPlayingSentence(false),
      () => setIsPlayingSentence(false)
    );
  };

  if (!currentItem) {
    return (
      <div className="text-center py-16 text-slate-500">
        No vocabulary available in this chapter.
      </div>
    );
  }

  const isLearned = learnedIds.includes(currentItem.id);
  const isPractice = practiceIds.includes(currentItem.id);
  const isFavorite = favoriteIds.includes(currentItem.id);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Chapter Selection Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-2 flex-1">
          <Layers className="w-4 h-4 text-red-600" />
          <select
            value={selectedKapitel}
            onChange={(e) => setSelectedKapitel(e.target.value)}
            className="w-full text-xs font-bold py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          >
            <option value="all">📚 All Kapitel ({availableChapters.length})</option>
            {availableChapters.map((ch) => {
              const val = selectedLevel === 'all' ? (ch.uniqueKey || `${ch.level}:${ch.id}`) : ch.id;
              return (
                <option key={ch.uniqueKey || `${ch.level}-${ch.id}`} value={val}>
                  [{ch.level}] {ch.id}: {ch.title} ({ch.wordCount} Wörter)
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFavorite(currentItem.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isFavorite
                ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-500'
                : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500'
            }`}
            title="Bookmark Word"
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Progress Header: Word 23 / 145 */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
          <span className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
              currentItem.level === 'A1'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            }`}>
              {currentItem.level || 'A2'}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 font-extrabold">
              {currentItem.kapitel}
            </span>
            <span>
              Wort <strong className="text-slate-900 dark:text-white text-sm">#{currentItem.chapterWordNumber}</strong> von {currentItem.totalInChapter}
            </span>
            <span className="text-[11px] text-slate-400">
              (ID: #{currentItem.id})
            </span>
          </span>
          <span>{Math.round((currentItem.chapterWordNumber / currentItem.totalInChapter) * 100)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentItem.chapterWordNumber / currentItem.totalInChapter) * 100}%` }}
          />
        </div>
      </div>

      {/* Detailed Step-By-Step Learning Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-xl space-y-6">
        {/* Step 1: German Word */}
        <div className="border-b border-slate-100 dark:border-slate-700/80 pb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-red-600 dark:text-red-400">
              1. German Word
            </span>
            <span className="text-xs text-slate-400">
              Kapitel #{currentItem.chapterWordNumber} · ID: #{currentItem.id} · PDF S. {currentItem.page}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {currentItem.german || currentItem.word}
              </h2>
              {currentItem.plural && currentItem.plural !== '—' && (
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  Plural: <span className="text-slate-700 dark:text-slate-200 font-bold">{currentItem.plural}</span>
                </p>
              )}
              {currentItem.verbForms && currentItem.verbForms !== '—' && (
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                  {currentItem.verbForms}
                </p>
              )}
            </div>

            {/* Pronunciation Button */}
            <button
              onClick={handlePlayWord}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all shrink-0 ${
                isPlayingWord
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/80 dark:text-red-300'
              }`}
            >
              <Volume2 className="w-5 h-5" />
              <span>{isPlayingWord ? 'Hören...' : 'Listen 🔊'}</span>
            </button>
          </div>
        </div>

        {/* Step 2: Bangla Meaning */}
        <div className="bg-emerald-50/80 dark:bg-emerald-950/40 rounded-2xl p-4 border border-emerald-200/80 dark:border-emerald-800/60">
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
            2. বাংলা অর্থ
          </span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentItem.bangla}
          </p>
        </div>

        {/* Step 3: English Meaning */}
        <div className="bg-sky-50/80 dark:bg-sky-950/40 rounded-2xl p-4 border border-sky-200/80 dark:border-sky-800/60">
          <span className="text-xs uppercase font-extrabold tracking-wider text-sky-700 dark:text-sky-400 block mb-1">
            3. English Meaning
          </span>
          <p className="text-lg font-semibold text-slate-800 dark:text-sky-100">
            {currentItem.english}
          </p>
        </div>

        {/* Step 4 & 5: German Example Sentence & Translations */}
        {currentItem.exampleGerman && (
          <div className="bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
                  4. German Example Sentence
                </span>
                <button
                  onClick={handlePlaySentence}
                  className="p-1 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-slate-800"
                  title="Listen to sentence"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentItem.exampleGerman}
              </p>
            </div>

            {currentItem.exampleBangla && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700 dark:text-emerald-400 block mb-0.5">
                  5. বাংলা অনুবাদ
                </span>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {currentItem.exampleBangla}
                </p>
              </div>
            )}

            {currentItem.exampleEnglish && (
              <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/40">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 block mb-0.5">
                  6. English Translation
                </span>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 italic">
                  {currentItem.exampleEnglish}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mark Learned & Need Practice in card */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/80">
          <button
            onClick={() => onTogglePractice(currentItem.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              isPractice
                ? 'bg-orange-500 text-white'
                : 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 hover:bg-orange-100'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isPractice ? 'In Practice List' : 'Need Practice'}</span>
          </button>

          <button
            onClick={() => onToggleLearned(currentItem.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              isLearned
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isLearned ? 'Learned ✓' : 'Mark as Learned'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Buttons: Previous / Next */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Previous Word</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === chapterWords.length - 1}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm disabled:opacity-40 shadow-lg shadow-red-600/20"
        >
          <span>Next Word →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
