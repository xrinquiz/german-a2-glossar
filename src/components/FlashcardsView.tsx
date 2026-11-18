import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, RotateCw, ArrowLeft, ArrowRight, Shuffle, CheckCircle2, RotateCcw, Star, Sparkles, Filter } from 'lucide-react';
import { VocabularyItem, LanguageLevel, ChapterInfo } from '../types';
import { CHAPTERS, getChaptersByLevel } from '../data/chapters';
import { speakGerman } from '../utils/audio';

interface FlashcardsViewProps {
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

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  vocabulary,
  initialKapitel = 'all',
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
  const [selectedKapitel, setSelectedKapitel] = useState<string>(initialKapitel);
  const [filterMode, setFilterMode] = useState<'all' | 'unlearned' | 'practice' | 'favorites'>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [shuffled, setShuffled] = useState<boolean>(false);
  const [isPlayingWord, setIsPlayingWord] = useState<boolean>(false);
  const [isPlayingSentence, setIsPlayingSentence] = useState<boolean>(false);

  const availableChapters = useMemo(() => {
    if (chapters && chapters.length > 0) return chapters;
    if (selectedLevel) return getChaptersByLevel(selectedLevel);
    return CHAPTERS;
  }, [chapters, selectedLevel]);

  // Filter items
  const cardItems = useMemo(() => {
    let list = [...vocabulary];

    if (selectedKapitel !== 'all') {
      if (selectedKapitel.includes(':')) {
        const [lvl, kap] = selectedKapitel.split(':');
        list = list.filter((w) => w.level === lvl && w.kapitel === kap);
      } else {
        list = list.filter((w) => w.kapitel === selectedKapitel);
      }
    }

    if (filterMode === 'unlearned') {
      list = list.filter((w) => !learnedIds.includes(w.id));
    } else if (filterMode === 'practice') {
      list = list.filter((w) => practiceIds.includes(w.id));
    } else if (filterMode === 'favorites') {
      list = list.filter((w) => favoriteIds.includes(w.id));
    }

    if (shuffled) {
      list = [...list].sort(() => Math.random() - 0.5);
    }

    return list;
  }, [vocabulary, selectedKapitel, filterMode, shuffled, learnedIds, practiceIds, favoriteIds]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedKapitel, filterMode, shuffled]);

  const currentItem = cardItems[currentIndex] || null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.code === 'ArrowRight') {
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
  }, [currentIndex, cardItems, currentItem]);

  const handleNext = () => {
    if (currentIndex < cardItems.length - 1) {
      setIsFlipped(false);
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((i) => i - 1);
    }
  };

  const handlePlayWord = (e?: React.MouseEvent) => {
    e?.stopPropagation();
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

  const handlePlaySentence = (e?: React.MouseEvent) => {
    e?.stopPropagation();
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

  if (cardItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          No Flashcards Found
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          There are no vocabulary items matching your current filters ({selectedKapitel}, {filterMode}).
        </p>
        <button
          onClick={() => {
            setSelectedKapitel('all');
            setFilterMode('all');
          }}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-md transition-colors"
        >
          Reset Filters & Show All
        </button>
      </div>
    );
  }

  const isLearned = currentItem ? learnedIds.includes(currentItem.id) : false;
  const isPractice = currentItem ? practiceIds.includes(currentItem.id) : false;
  const isFavorite = currentItem ? favoriteIds.includes(currentItem.id) : false;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Top Filter & Deck Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
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
                  [{ch.level}] {ch.id}: {ch.title} ({ch.wordCount})
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value as any)}
            className="text-xs font-semibold py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          >
            <option value="all">All Words ({cardItems.length})</option>
            <option value="unlearned">Unlearned Only</option>
            <option value="practice">Need Practice ({practiceIds.length})</option>
            <option value="favorites">Favorites ({favoriteIds.length})</option>
          </select>

          <button
            onClick={() => setShuffled(!shuffled)}
            className={`p-2 rounded-xl transition-colors ${
              shuffled
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
            title={shuffled ? 'Shuffled order active' : 'Shuffle cards'}
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Counter & Bar */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 px-1">
          <span>
            Card <strong className="text-slate-900 dark:text-white">{currentIndex + 1}</strong> of {cardItems.length}
          </span>
          <span>
            {Math.round(((currentIndex + 1) / cardItems.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-red-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / cardItems.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer select-none perspective-[1200px]"
      >
        <div
          className={`relative min-h-[380px] w-full rounded-3xl border transition-all duration-500 shadow-xl p-8 flex flex-col justify-between ${
            isFlipped
              ? 'bg-slate-900 text-white border-slate-700'
              : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700'
          }`}
        >
          {/* Card Top Information */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 text-[10px] font-black rounded uppercase ${
                currentItem.level === 'A1'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : currentItem.level === 'B1'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {currentItem.level || 'B1'}
              </span>
              <span className={`px-2.5 py-0.5 text-xs font-black rounded-md ${
                isFlipped ? 'bg-slate-800 text-slate-300' : 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300'
              }`}>
                {currentItem.kapitel} · #{currentItem.chapterWordNumber} von {currentItem.totalInChapter}
              </span>
              <span className="text-xs text-slate-400">
                (ID: #{currentItem.id} · S. {currentItem.page})
              </span>
              {currentItem.article && (
                <span className={`px-2 py-0.5 text-xs font-bold rounded uppercase ${
                  currentItem.article === 'der'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                    : currentItem.article === 'die'
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                }`}>
                  {currentItem.article}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(currentItem.id);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
              >
                <Star className={`w-5 h-5 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Card Body: Front vs Back */}
          {!isFlipped ? (
            /* FRONT: German Word + Pronunciation */
            <div className="text-center my-auto py-8">
              <p className="text-xs uppercase font-extrabold tracking-widest text-red-500 mb-2">
                🇩🇪 DEUTSCH
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                {currentItem.german || currentItem.word}
              </h2>

              {currentItem.plural && currentItem.plural !== '—' && (
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
                  Plural: <span className="text-slate-700 dark:text-slate-200">{currentItem.plural}</span>
                </p>
              )}

              <div className="flex justify-center mt-6">
                <button
                  onClick={handlePlayWord}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all ${
                    isPlayingWord
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-300'
                  }`}
                >
                  <Volume2 className="w-5 h-5" />
                  <span>{isPlayingWord ? 'Aussprache...' : 'Aussprache anhören'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 dark:text-slate-500 mt-6">
                👆 Click card or press [Space] to flip
              </p>
            </div>
          ) : (
            /* BACK: Bengali & English Meanings + Example Sentence */
            <div className="my-auto py-4 space-y-4">
              {/* Bengali Meaning */}
              <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700/80">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                  <span>🇧🇩</span>
                  <span>বাংলা অর্থ:</span>
                </div>
                <p className="text-xl font-bold text-white leading-snug">
                  {currentItem.bangla}
                </p>
              </div>

              {/* English Meaning */}
              <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700/80">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 mb-1">
                  <span>🇬🇧</span>
                  <span>English Meaning:</span>
                </div>
                <p className="text-base font-semibold text-slate-200">
                  {currentItem.english}
                </p>
              </div>

              {/* German Example Sentence */}
              {currentItem.exampleGerman && (
                <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Beispielsatz
                    </span>
                    <button
                      onClick={handlePlaySentence}
                      className="p-1 rounded-md text-red-400 hover:bg-slate-700"
                      title="Listen to sentence"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-slate-100 leading-relaxed">
                    {currentItem.exampleGerman}
                  </p>
                  {currentItem.exampleBangla && (
                    <p className="text-xs text-emerald-400 font-medium mt-1">
                      🇧🇩 {currentItem.exampleBangla}
                    </p>
                  )}
                  {currentItem.exampleEnglish && (
                    <p className="text-xs text-slate-400 mt-0.5 italic">
                      🇬🇧 {currentItem.exampleEnglish}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Card Bottom: Flip hint & status markers */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Tap to flip</span>
            </span>
            <div className="flex items-center gap-3">
              {isLearned && (
                <span className="flex items-center gap-1 text-emerald-500 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Learned
                </span>
              )}
              {isPractice && (
                <span className="flex items-center gap-1 text-orange-400 font-bold">
                  <RotateCcw className="w-3.5 h-3.5" /> In Practice
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === cardItems.length - 1}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-50 shadow-sm"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Learning Status Buttons: "I Know" vs "Need Practice" */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              if (currentItem) {
                onTogglePractice(currentItem.id);
                handleNext();
              }
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
              isPractice
                ? 'bg-orange-500 text-white'
                : 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 hover:bg-orange-100 border border-orange-200 dark:border-orange-800'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Need Practice</span>
          </button>

          <button
            onClick={() => {
              if (currentItem) {
                onToggleLearned(currentItem.id);
                handleNext();
              }
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-md ${
              isLearned
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I Know It!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
