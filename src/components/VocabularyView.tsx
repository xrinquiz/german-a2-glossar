import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, LayoutGrid, List, CheckCircle2, RotateCcw, Star, X, Sparkles, ChevronLeft, ChevronRight, Volume2, Globe2 } from 'lucide-react';
import { VocabularyItem, SortOption, LearningStatus, LanguageLevel, ChapterInfo } from '../types';
import { CHAPTERS, getChaptersByLevel } from '../data/chapters';
import { VocabularyCard } from './VocabularyCard';
import { speakGerman } from '../utils/audio';
import { searchVocabulary } from '../utils/searchEngine';
import { HighlightText } from './HighlightText';

interface VocabularyViewProps {
  vocabulary: VocabularyItem[];
  selectedKapitel: string;
  setSelectedKapitel: (k: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  learnedIds: number[];
  practiceIds: number[];
  favoriteIds: number[];
  onToggleLearned: (id: number) => void;
  onTogglePractice: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  speechSpeed: number;
  selectedLevel?: LanguageLevel;
  setSelectedLevel?: (lvl: LanguageLevel) => void;
  chapters?: ChapterInfo[];
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  vocabulary,
  selectedKapitel,
  setSelectedKapitel,
  searchQuery,
  setSearchQuery,
  learnedIds,
  practiceIds,
  favoriteIds,
  onToggleLearned,
  onTogglePractice,
  onToggleFavorite,
  speechSpeed,
  selectedLevel,
  setSelectedLevel,
  chapters
}) => {
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<LearningStatus>('all');
  const [sortBy, setSortBy] = useState<SortOption>('id');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(30);
  const [searchScope, setSearchScope] = useState<'all' | 'chapter'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  const availableChapters = useMemo(() => {
    if (chapters && chapters.length > 0) return chapters;
    if (selectedLevel) return getChaptersByLevel(selectedLevel);
    return CHAPTERS;
  }, [chapters, selectedLevel]);

  const availableTopics = useMemo(() => {
    let pool = vocabulary;
    if (selectedKapitel !== 'all') {
      if (selectedKapitel.includes(':')) {
        const [lvl, kap] = selectedKapitel.split(':');
        pool = pool.filter((w) => w.level === lvl && w.kapitel === kap);
      } else {
        pool = pool.filter((w) => w.kapitel === selectedKapitel);
      }
    }
    const topicsMap = new Map<string, { topic: string; topicBangla?: string; count: number }>();
    pool.forEach((w) => {
      if (w.topic) {
        const existing = topicsMap.get(w.topic);
        if (existing) {
          existing.count += 1;
        } else {
          topicsMap.set(w.topic, { topic: w.topic, topicBangla: w.topicBangla, count: 1 });
        }
      }
    });
    return Array.from(topicsMap.values());
  }, [vocabulary, selectedKapitel]);

  // Reset topic when chapter changes
  React.useEffect(() => {
    setSelectedTopic('all');
  }, [selectedKapitel]);

  // Available parts of speech from current data
  const partsOfSpeech = ['all', 'Nomen', 'Verb', 'Adjektiv', 'Adverb', 'Präposition', 'Pronomen', 'Konjunktion', 'Ausdruck'];

  // Global search count across all chapters
  const allScopeMatchesCount = useMemo(() => {
    if (!searchQuery.trim()) return 0;
    return searchVocabulary(vocabulary, searchQuery).length;
  }, [vocabulary, searchQuery]);

  // Chapter-specific search count
  const chapterScopeMatchesCount = useMemo(() => {
    if (!searchQuery.trim() || selectedKapitel === 'all') return allScopeMatchesCount;
    let pool = vocabulary;
    if (selectedKapitel.includes(':')) {
      const [lvl, kap] = selectedKapitel.split(':');
      pool = pool.filter((w) => w.level === lvl && w.kapitel === kap);
    } else {
      pool = pool.filter((w) => w.kapitel === selectedKapitel);
    }
    return searchVocabulary(pool, searchQuery).length;
  }, [vocabulary, selectedKapitel, searchQuery, allScopeMatchesCount]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    const isSearching = searchQuery.trim().length > 0;

    // Determine initial pool based on search scope
    let pool = [...vocabulary];

    // If searching, default to 'all' chapters unless user explicitly chose 'chapter'
    if (isSearching) {
      if (searchScope === 'chapter' && selectedKapitel !== 'all') {
        if (selectedKapitel.includes(':')) {
          const [lvl, kap] = selectedKapitel.split(':');
          pool = pool.filter((w) => w.level === lvl && w.kapitel === kap);
        } else {
          pool = pool.filter((w) => w.kapitel === selectedKapitel);
        }
      }
    } else {
      // Normal chapter filter when not searching
      if (selectedKapitel !== 'all') {
        if (selectedKapitel.includes(':')) {
          const [lvl, kap] = selectedKapitel.split(':');
          pool = pool.filter((w) => w.level === lvl && w.kapitel === kap);
        } else {
          pool = pool.filter((w) => w.kapitel === selectedKapitel);
        }
      }
    }

    // Topic filter
    if (selectedTopic !== 'all') {
      pool = pool.filter((w) => w.topic === selectedTopic);
    }

    // POS filter
    if (selectedPos !== 'all') {
      pool = pool.filter((w) => w.partOfSpeech === selectedPos);
    }

    // Status filter
    if (statusFilter === 'learned') {
      pool = pool.filter((w) => learnedIds.includes(w.id));
    } else if (statusFilter === 'practice') {
      pool = pool.filter((w) => practiceIds.includes(w.id));
    } else if (statusFilter === 'favorites') {
      pool = pool.filter((w) => favoriteIds.includes(w.id));
    } else if (statusFilter === 'unlearned') {
      pool = pool.filter((w) => !learnedIds.includes(w.id));
    }

    // Search query execution via multi-lingual search engine
    if (isSearching) {
      const searchMatches = searchVocabulary(pool, searchQuery);
      let searchResults = searchMatches.map((m) => m.item);

      // If user explicitly picked an alphabetical sort, respect that
      if (sortBy !== 'id') {
        searchResults.sort((a, b) => {
          if (sortBy === 'german-asc') return (a.word || a.german).localeCompare(b.word || b.german, 'de');
          if (sortBy === 'german-desc') return (b.word || b.german).localeCompare(a.word || a.german, 'de');
          if (sortBy === 'english-asc') return (a.english || '').localeCompare(b.english || '', 'en');
          if (sortBy === 'bangla-asc') return (a.bangla || '').localeCompare(b.bangla || '', 'bn');
          return 0;
        });
      }

      return searchResults;
    }

    // Standard sorting when not searching
    pool.sort((a, b) => {
      if (sortBy === 'id') return a.id - b.id;
      if (sortBy === 'german-asc') return (a.word || a.german).localeCompare(b.word || b.german, 'de');
      if (sortBy === 'german-desc') return (b.word || b.german).localeCompare(a.word || a.german, 'de');
      if (sortBy === 'english-asc') return (a.english || '').localeCompare(b.english || '', 'en');
      if (sortBy === 'bangla-asc') return (a.bangla || '').localeCompare(b.bangla || '', 'bn');
      return 0;
    });

    return pool;
  }, [vocabulary, selectedKapitel, selectedTopic, selectedPos, statusFilter, searchQuery, searchScope, sortBy, learnedIds, practiceIds, favoriteIds]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedKapitel, selectedTopic, selectedPos, statusFilter, searchQuery, searchScope, sortBy, pageSize]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const paginatedItems = useMemo(() => {
    if (pageSize === 9999) return filteredItems;
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const clearAllFilters = () => {
    setSelectedKapitel('all');
    setSelectedTopic('all');
    setSelectedPos('all');
    setStatusFilter('all');
    setSearchQuery('');
    setSearchScope('all');
    setSortBy('id');
  };

  const hasActiveFilters =
    selectedKapitel !== 'all' ||
    selectedTopic !== 'all' ||
    selectedPos !== 'all' ||
    statusFilter !== 'all' ||
    searchQuery.trim().length > 0 ||
    sortBy !== 'id';

  return (
    <div className="space-y-6 pb-12">
      {/* Top Filter & Control Panel */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm space-y-4">
        {/* Row 1: Search & Kapitel Select */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Deutsch, English, বা বাংলা..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-red-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Chapter Selector */}
          <div className="md:col-span-4">
            <select
              value={selectedKapitel}
              onChange={(e) => setSelectedKapitel(e.target.value)}
              className="w-full py-2 px-3 text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-red-500 font-semibold"
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

          {/* Sort Selector */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full py-2 px-3 text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-red-500 font-medium"
            >
              <option value="id">Original Order (Word ID)</option>
              <option value="german-asc">Deutsch (A–Z)</option>
              <option value="german-desc">Deutsch (Z–A)</option>
              <option value="english-asc">English (A–Z)</option>
              <option value="bangla-asc">বাংলা (অ–হ)</option>
            </select>
          </div>
        </div>

        {/* Active Search Results Banner */}
        {searchQuery.trim().length > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-950/40 dark:to-amber-950/30 border border-red-200/80 dark:border-red-900/50 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  "{searchQuery}" — <span className="text-red-600 dark:text-red-400 font-black">{filteredItems.length}</span> টি শব্দ পাওয়া গেছে
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {searchScope === 'all'
                    ? 'সবগুলো অধ্যায় জুড়ে খোঁজা হয়েছে'
                    : `শুধুমাত্র ${selectedKapitel} এ খোঁজা হয়েছে`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedKapitel !== 'all' && (
                <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-0.5 text-xs font-semibold">
                  <button
                    onClick={() => setSearchScope('all')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      searchScope === 'all'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    সব অধ্যায়ে ({allScopeMatchesCount})
                  </button>
                  <button
                    onClick={() => setSearchScope('chapter')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      searchScope === 'chapter'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {selectedKapitel} ({chapterScopeMatchesCount})
                  </button>
                </div>
              )}
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                ✕ সার্চ ক্লিয়ার
              </button>
            </div>
          </div>
        )}

        {/* Textbook Topic / Thema Filter Chips */}
        {availableTopics.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs pt-1 border-t border-slate-100 dark:border-slate-700/60">
            <span className="text-red-600 dark:text-red-400 font-extrabold shrink-0 mr-1 flex items-center gap-1">
              <span>Thema:</span>
            </span>
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 ${
                selectedTopic === 'all'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Alle Themen ({availableTopics.length})
            </button>
            {availableTopics.map((topObj) => (
              <button
                key={topObj.topic}
                onClick={() => setSelectedTopic(topObj.topic)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedTopic === topObj.topic
                    ? 'bg-red-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{topObj.topic}</span>
                {topObj.topicBangla && (
                  <span className={`text-[10px] ${selectedTopic === topObj.topic ? 'text-red-100' : 'text-slate-400 dark:text-slate-500'}`}>
                    ({topObj.topicBangla})
                  </span>
                )}
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${selectedTopic === topObj.topic ? 'bg-red-700 text-white' : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300'}`}>
                  {topObj.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Row 2: Secondary Filters (Word Type, Learning Status, View Switch) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
          {/* Part of Speech Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-bold shrink-0 mr-1">Art:</span>
            {partsOfSpeech.map((pos) => (
              <button
                key={pos}
                onClick={() => setSelectedPos(pos)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all shrink-0 ${
                  selectedPos === pos
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {pos === 'all' ? 'Alle Wortarten' : pos}
              </button>
            ))}
          </div>

          {/* Status & View Mode */}
          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LearningStatus)}
              className="py-1 px-2.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">All Status</option>
              <option value="learned">Learned ({learnedIds.length})</option>
              <option value="practice">Need Practice ({practiceIds.length})</option>
              <option value="favorites">Favorites ({favoriteIds.length})</option>
              <option value="unlearned">Unlearned</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-red-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }`}
                title="Grid Card View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-900 text-red-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }`}
                title="Compact Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between text-xs pt-2 text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredItems.length}</strong> of{' '}
              {vocabulary.length} entries
            </span>
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:underline font-semibold"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Vocabulary Items Display */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <Sparkles className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No vocabulary items match your filter</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms, selecting a different chapter, or clearing the active filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-4 px-4 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-500 text-white"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedItems.map((item) => (
            <VocabularyCard
              key={item.id}
              item={item}
              isLearned={learnedIds.includes(item.id)}
              isPractice={practiceIds.includes(item.id)}
              isFavorite={favoriteIds.includes(item.id)}
              onToggleLearned={onToggleLearned}
              onTogglePractice={onTogglePractice}
              onToggleFavorite={onToggleFavorite}
              speechSpeed={speechSpeed}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      ) : (
        /* Compact Table / List View */
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3 px-4 w-12">#</th>
                  <th className="py-3 px-4">Deutsch & Plural</th>
                  <th className="py-3 px-4">বাংলা অর্থ</th>
                  <th className="py-3 px-4">English</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Beispielsatz</th>
                  <th className="py-3 px-4 text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {paginatedItems.map((item) => {
                  const isLearned = learnedIds.includes(item.id);
                  const isPractice = practiceIds.includes(item.id);
                  const isFavorite = favoriteIds.includes(item.id);

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors ${
                        isLearned ? 'bg-emerald-50/30 dark:bg-emerald-950/20' : isPractice ? 'bg-orange-50/30 dark:bg-orange-950/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4 text-xs font-mono text-slate-400">
                        <div className="flex items-center gap-1">
                          <span className={`text-[9px] font-black px-1 py-0.2 rounded uppercase ${
                            item.level === 'A1'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : item.level === 'B1'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}>
                            {item.level || 'B1'}
                          </span>
                          <span>#{item.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => speakGerman(item.german || item.word, speechSpeed)}
                            className="p-1 rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                            title="Listen"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white">
                              <HighlightText text={item.german || item.word} query={searchQuery} />
                            </span>
                            {item.plural && item.plural !== '—' && (
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Pl: <HighlightText text={item.plural} query={searchQuery} />
                              </p>
                            )}
                            {item.topic && (
                              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                                <span className="text-red-600 dark:text-red-400 font-semibold">Thema:</span> {item.topic}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-800 dark:text-emerald-300">
                        <HighlightText text={item.bangla} query={searchQuery} />
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-sky-200">
                        <HighlightText text={item.english} query={searchQuery} />
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell text-xs text-slate-600 dark:text-slate-300 max-w-xs truncate">
                        <HighlightText text={item.exampleGerman} query={searchQuery} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onToggleFavorite(item.id)}
                            className={`p-1.5 rounded-md ${
                              isFavorite ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-amber-500'
                            }`}
                            title="Favorite"
                          >
                            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
                          </button>
                          <button
                            onClick={() => onTogglePractice(item.id)}
                            className={`p-1.5 rounded-md ${
                              isPractice ? 'text-orange-500' : 'text-slate-300 dark:text-slate-600 hover:text-orange-500'
                            }`}
                            title="Need Practice"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onToggleLearned(item.id)}
                            className={`p-1.5 rounded-md ${
                              isLearned ? 'text-emerald-600' : 'text-slate-300 dark:text-slate-600 hover:text-emerald-500'
                            }`}
                            title="Learned"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredItems.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Show:</span>
            {[24, 48, 96].map((size) => (
              <button
                key={size}
                onClick={() => setPageSize(size)}
                className={`px-2.5 py-1 rounded-md font-bold ${
                  pageSize === size
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {size}
              </button>
            ))}
            <button
              onClick={() => setPageSize(9999)}
              className={`px-2.5 py-1 rounded-md font-bold ${
                pageSize === 9999
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              All
            </button>
          </div>

          {pageSize !== 9999 && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
