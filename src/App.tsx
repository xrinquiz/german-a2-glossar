import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Sparkles, Layers, GraduationCap, Flame, RotateCcw } from 'lucide-react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { KapitelOverview } from './components/KapitelOverview';
import { VocabularyView } from './components/VocabularyView';
import { FlashcardsView } from './components/FlashcardsView';
import { LearnModeView } from './components/LearnModeView';
import { StatisticsView } from './components/StatisticsView';
import { ConjugationView } from './components/ConjugationView';
import { ConjugationModal } from './components/ConjugationModal';
import { VocabularyItem, UserProgressState, LanguageLevel } from './types';
import a1Raw from './data/a1_vocabulary.json';
import a2Raw from './data/a2_vocabulary.json';
import b1Raw from './data/b1_vocabulary.json';
import { getChaptersByLevel } from './data/chapters';
import {
  getStoredProgress,
  saveStoredProgress,
  getStoredTheme,
  saveStoredTheme
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'kapitel' | 'vocabulary' | 'flashcards' | 'learn' | 'favorites' | 'practice' | 'stats' | 'conjugation'
  >('dashboard');
  const [modalVerb, setModalVerb] = useState<string | null>(null);
  const [activeConjugationVerb, setActiveConjugationVerb] = useState<string>('machen');

  const [selectedLevel, setSelectedLevel] = useState<LanguageLevel>(() => {
    try {
      const stored = localStorage.getItem('german_glossar_level') as LanguageLevel;
      if (stored === 'A1' || stored === 'A2' || stored === 'B1' || stored === 'all') return stored;
    } catch (e) {
      // ignore
    }
    return 'B1';
  });

  const [selectedKapitel, setSelectedKapitel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [speechSpeed, setSpeechSpeed] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('german_speech_speed');
      if (saved) {
        const val = parseFloat(saved);
        if (!isNaN(val) && val >= 0.25 && val <= 1.2) return val;
      }
    } catch (e) {}
    return 0.85;
  });
  const [darkMode, setDarkMode] = useState<boolean>(() => getStoredTheme() === 'dark');
  const [progress, setProgress] = useState<UserProgressState>(getStoredProgress);

  useEffect(() => {
    try {
      localStorage.setItem('german_speech_speed', speechSpeed.toString());
    } catch (e) {}
  }, [speechSpeed]);

  const a1Vocabulary = a1Raw as VocabularyItem[];
  const a2Vocabulary = a2Raw as VocabularyItem[];
  const b1Vocabulary = b1Raw as VocabularyItem[];

  const allVocabulary = useMemo<VocabularyItem[]>(() => {
    return [...a1Vocabulary, ...a2Vocabulary, ...b1Vocabulary];
  }, [a1Vocabulary, a2Vocabulary, b1Vocabulary]);

  const activeVocabulary = useMemo<VocabularyItem[]>(() => {
    if (selectedLevel === 'A1') return a1Vocabulary;
    if (selectedLevel === 'A2') return a2Vocabulary;
    if (selectedLevel === 'B1') return b1Vocabulary;
    return allVocabulary;
  }, [selectedLevel, a1Vocabulary, a2Vocabulary, b1Vocabulary, allVocabulary]);

  const activeChapters = useMemo(() => {
    return getChaptersByLevel(selectedLevel);
  }, [selectedLevel]);

  // Persist selected level
  useEffect(() => {
    try {
      localStorage.setItem('german_glossar_level', selectedLevel);
    } catch (e) {
      // ignore
    }
  }, [selectedLevel]);

  // Sync theme changes with DOM and localStorage
  useEffect(() => {
    saveStoredTheme(darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync progress changes to localStorage
  useEffect(() => {
    saveStoredProgress(progress);
  }, [progress]);

  // Reset chapter filter when switching levels
  const handleLevelChange = (lvl: LanguageLevel) => {
    setSelectedLevel(lvl);
    setSelectedKapitel('all');
  };

  // Handle word status toggles
  const handleToggleLearned = (id: number) => {
    setProgress((prev) => {
      const isLearned = prev.learned.includes(id);
      const newLearned = isLearned
        ? prev.learned.filter((itemId) => itemId !== id)
        : [...prev.learned, id];

      // If marked learned, remove from practice list
      const newPractice = !isLearned
        ? prev.practice.filter((itemId) => itemId !== id)
        : prev.practice;

      // Add to history
      const newHistory = [id, ...prev.history.filter((h) => h !== id)].slice(0, 30);

      return {
        ...prev,
        learned: newLearned,
        practice: newPractice,
        history: newHistory
      };
    });
  };

  const handleTogglePractice = (id: number) => {
    setProgress((prev) => {
      const isPractice = prev.practice.includes(id);
      const newPractice = isPractice
        ? prev.practice.filter((itemId) => itemId !== id)
        : [...prev.practice, id];

      // If added to practice, remove from learned
      const newLearned = !isPractice
        ? prev.learned.filter((itemId) => itemId !== id)
        : prev.learned;

      const newHistory = [id, ...prev.history.filter((h) => h !== id)].slice(0, 30);

      return {
        ...prev,
        practice: newPractice,
        learned: newLearned,
        history: newHistory
      };
    });
  };

  const handleToggleFavorite = (id: number) => {
    setProgress((prev) => {
      const isFav = prev.favorites.includes(id);
      const newFavs = isFav
        ? prev.favorites.filter((itemId) => itemId !== id)
        : [...prev.favorites, id];

      return {
        ...prev,
        favorites: newFavs
      };
    });
  };

  const handleSelectKapitel = (kapitelId: string) => {
    setSelectedKapitel(kapitelId);
    setActiveTab('vocabulary');
  };

  const handleStartFlashcards = (kapitelId?: string) => {
    if (kapitelId) setSelectedKapitel(kapitelId);
    setActiveTab('flashcards');
  };

  const handleStartLearn = (kapitelId?: string) => {
    if (kapitelId) setSelectedKapitel(kapitelId);
    setActiveTab('learn');
  };

  const handleResetProgress = () => {
    const emptyState: UserProgressState = {
      learned: [],
      practice: [],
      favorites: [],
      history: [],
      lastKapitel: 'Kapitel 1'
    };
    setProgress(emptyState);
    saveStoredProgress(emptyState);
  };

  const handleImportProgress = (data: UserProgressState) => {
    setProgress(data);
    saveStoredProgress(data);
  };

  const handleSelectWordFromSearch = (item: VocabularyItem) => {
    if (item.level && item.level !== selectedLevel && selectedLevel !== 'all') {
      setSelectedLevel(item.level);
    }
    setSelectedKapitel(item.kapitel);
    setSearchQuery(item.word || item.german);
    setActiveTab('vocabulary');
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased flex flex-col ${darkMode ? 'dark' : ''}`}>
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLevel={selectedLevel}
        setSelectedLevel={handleLevelChange}
        a1Count={a1Vocabulary.length}
        a2Count={a2Vocabulary.length}
        b1Count={b1Vocabulary.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        speechSpeed={speechSpeed}
        setSpeechSpeed={setSpeechSpeed}
        learnedCount={activeVocabulary.filter((w) => progress.learned.includes(w.id)).length}
        totalWords={activeVocabulary.length}
        favoritesCount={activeVocabulary.filter((w) => progress.favorites.includes(w.id)).length}
        practiceCount={activeVocabulary.filter((w) => progress.practice.includes(w.id)).length}
        allVocabulary={allVocabulary}
        onSelectWord={handleSelectWordFromSearch}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 md:pb-12">
        {activeTab === 'dashboard' && (
          <DashboardView
            vocabulary={activeVocabulary}
            progress={progress}
            selectedLevel={selectedLevel}
            setSelectedLevel={handleLevelChange}
            chapters={activeChapters}
            onSelectKapitel={handleSelectKapitel}
            onStartFlashcards={handleStartFlashcards}
            onStartLearn={handleStartLearn}
            onToggleLearned={handleToggleLearned}
            onTogglePractice={handleTogglePractice}
            onToggleFavorite={handleToggleFavorite}
            speechSpeed={speechSpeed}
          />
        )}

        {activeTab === 'kapitel' && (
          <KapitelOverview
            vocabulary={activeVocabulary}
            progress={progress}
            selectedLevel={selectedLevel}
            setSelectedLevel={handleLevelChange}
            chapters={activeChapters}
            onSelectKapitel={handleSelectKapitel}
            onStartFlashcards={handleStartFlashcards}
            onStartLearn={handleStartLearn}
          />
        )}

        {activeTab === 'vocabulary' && (
          <VocabularyView
            vocabulary={activeVocabulary}
            selectedKapitel={selectedKapitel}
            setSelectedKapitel={setSelectedKapitel}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            learnedIds={progress.learned}
            practiceIds={progress.practice}
            favoriteIds={progress.favorites}
            onToggleLearned={handleToggleLearned}
            onTogglePractice={handleTogglePractice}
            onToggleFavorite={handleToggleFavorite}
            speechSpeed={speechSpeed}
            selectedLevel={selectedLevel}
            setSelectedLevel={handleLevelChange}
            chapters={activeChapters}
            onOpenConjugation={(v) => setModalVerb(v)}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            vocabulary={activeVocabulary}
            initialKapitel={selectedKapitel}
            learnedIds={progress.learned}
            practiceIds={progress.practice}
            favoriteIds={progress.favorites}
            onToggleLearned={handleToggleLearned}
            onTogglePractice={handleTogglePractice}
            onToggleFavorite={handleToggleFavorite}
            speechSpeed={speechSpeed}
            selectedLevel={selectedLevel}
            chapters={activeChapters}
          />
        )}

        {activeTab === 'learn' && (
          <LearnModeView
            vocabulary={activeVocabulary}
            initialKapitel={selectedKapitel}
            learnedIds={progress.learned}
            practiceIds={progress.practice}
            favoriteIds={progress.favorites}
            onToggleLearned={handleToggleLearned}
            onTogglePractice={handleTogglePractice}
            onToggleFavorite={handleToggleFavorite}
            speechSpeed={speechSpeed}
            selectedLevel={selectedLevel}
            chapters={activeChapters}
          />
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                ⭐ Favorite Vocabulary ({allVocabulary.filter((w) => progress.favorites.includes(w.id)).length})
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Important and starred words across A1 and A2 saved for quick review.
              </p>
            </div>
            <VocabularyView
              vocabulary={allVocabulary.filter((w) => progress.favorites.includes(w.id))}
              selectedKapitel="all"
              setSelectedKapitel={() => {}}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              learnedIds={progress.learned}
              practiceIds={progress.practice}
              favoriteIds={progress.favorites}
              onToggleLearned={handleToggleLearned}
              onTogglePractice={handleTogglePractice}
              onToggleFavorite={handleToggleFavorite}
              speechSpeed={speechSpeed}
              selectedLevel="all"
              chapters={getChaptersByLevel('all')}
              onOpenConjugation={(v) => setModalVerb(v)}
            />
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                📝 Need Practice List ({allVocabulary.filter((w) => progress.practice.includes(w.id)).length})
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Vocabulary words marked as challenging or requiring extra repetition.
              </p>
            </div>
            <VocabularyView
              vocabulary={allVocabulary.filter((w) => progress.practice.includes(w.id))}
              selectedKapitel="all"
              setSelectedKapitel={() => {}}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              learnedIds={progress.learned}
              practiceIds={progress.practice}
              favoriteIds={progress.favorites}
              onToggleLearned={handleToggleLearned}
              onTogglePractice={handleTogglePractice}
              onToggleFavorite={handleToggleFavorite}
              speechSpeed={speechSpeed}
              selectedLevel="all"
              chapters={getChaptersByLevel('all')}
              onOpenConjugation={(v) => setModalVerb(v)}
            />
          </div>
        )}

        {activeTab === 'conjugation' && (
          <ConjugationView
            initialVerb={activeConjugationVerb}
            speechSpeed={speechSpeed}
          />
        )}

        {activeTab === 'stats' && (
          <StatisticsView
            vocabulary={activeVocabulary}
            progress={progress}
            selectedLevel={selectedLevel}
            chapters={activeChapters}
            onSelectKapitel={handleSelectKapitel}
            onResetProgress={handleResetProgress}
            onImportProgress={handleImportProgress}
          />
        )}
      </main>

      {/* Pop-up Conjugation Modal */}
      {modalVerb && (
        <ConjugationModal
          verb={modalVerb}
          onClose={() => setModalVerb(null)}
          onGoToConjugationTab={(v) => {
            setActiveConjugationVerb(v);
            setActiveTab('conjugation');
          }}
          speechSpeed={speechSpeed}
        />
      )}

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="font-bold text-slate-800 dark:text-slate-200">Netzwerk neu A1 + A2 Glossar</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">A1: 1,761 Wörter</span>
            <span>•</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">A2: 1,452 Wörter</span>
            <span>•</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">Total: 3,213 Wörter (24 Kapitel)</span>
          </div>
          <div>
            উৎস: <em>Netzwerk neu A1 & A2 Glossar</em> · বাংলা ও ইংরেজি অর্থ এবং সঠিক উচ্চারণ সহ
          </div>
        </div>
      </footer>
      {/* Mobile Bottom Navigation Dock (Phones & Small Tablets < 768px) */}
      <nav
        aria-label="Mobile Navigation Dock"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 shadow-xl px-2 py-1.5 flex items-center justify-around text-[10px] font-bold"
        style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
      >
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'dashboard'
              ? 'text-red-600 dark:text-red-400 font-black scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>ড্যাশবোর্ড</span>
        </button>

        <button
          onClick={() => setActiveTab('vocabulary')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'vocabulary'
              ? 'text-red-600 dark:text-red-400 font-black scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>শব্দভাণ্ডার</span>
        </button>

        <button
          onClick={() => setActiveTab('conjugation')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all relative ${
            activeTab === 'conjugation'
              ? 'text-red-600 dark:text-red-400 font-black scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-lg text-white shadow-xs transition-colors ${activeTab === 'conjugation' ? 'bg-red-600 ring-2 ring-red-400/30' : 'bg-slate-700 dark:bg-slate-700'}`}>
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span>ভার্ব</span>
        </button>

        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'flashcards'
              ? 'text-red-600 dark:text-red-400 font-black scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>কার্ড</span>
        </button>

        <button
          onClick={() => setActiveTab('learn')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'learn'
              ? 'text-red-600 dark:text-red-400 font-black scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>লার্ন মোড</span>
        </button>
      </nav>
    </div>
  );
}
