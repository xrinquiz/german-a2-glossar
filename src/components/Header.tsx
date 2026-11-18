import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BookOpen, Layers, CheckCircle2, Star, Sparkles, Moon, Sun, Volume2, Search, BarChart3, HelpCircle, Menu, X, ArrowRight } from 'lucide-react';

import { LanguageLevel, VocabularyItem } from '../types';
import { searchVocabulary } from '../utils/searchEngine';
import { speakGerman } from '../utils/audio';
import { HighlightText } from './HighlightText';

interface HeaderProps {
  activeTab: 'dashboard' | 'kapitel' | 'vocabulary' | 'flashcards' | 'learn' | 'favorites' | 'practice' | 'stats';
  setActiveTab: (tab: 'dashboard' | 'kapitel' | 'vocabulary' | 'flashcards' | 'learn' | 'favorites' | 'practice' | 'stats') => void;
  selectedLevel: LanguageLevel;
  setSelectedLevel: (level: LanguageLevel) => void;
  a1Count: number;
  a2Count: number;
  b1Count: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  speechSpeed: number;
  setSpeechSpeed: (speed: number) => void;
  learnedCount: number;
  totalWords: number;
  favoritesCount: number;
  practiceCount: number;
  allVocabulary?: VocabularyItem[];
  onSelectWord?: (item: VocabularyItem) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedLevel,
  setSelectedLevel,
  a1Count,
  a2Count,
  b1Count,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  speechSpeed,
  setSpeechSpeed,
  learnedCount,
  totalWords,
  favoritesCount,
  practiceCount,
  allVocabulary = [],
  onSelectWord
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const quickMatches = useMemo(() => {
    if (!searchQuery.trim() || allVocabulary.length === 0) return [];
    return searchVocabulary(allVocabulary, searchQuery).slice(0, 6);
  }, [allVocabulary, searchQuery]);

  interface NavItem {
    id: 'dashboard' | 'kapitel' | 'vocabulary' | 'flashcards' | 'learn' | 'favorites' | 'practice' | 'stats';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string | number | null;
    color?: string;
  }

  const chapterCount = selectedLevel === 'all' ? 36 : 12;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen, badge: null },
    { id: 'kapitel', label: 'Kapitel', icon: Layers, badge: `${chapterCount}` },
    { id: 'vocabulary', label: 'Wörter', icon: Sparkles, badge: totalWords > 0 ? `${totalWords}` : null },
    { id: 'flashcards', label: 'Flashcards', icon: Sparkles, badge: null },
    { id: 'learn', label: 'Learn Mode', icon: HelpCircle, badge: null },
    { id: 'favorites', label: 'Favorites', icon: Star, badge: favoritesCount > 0 ? favoritesCount : null, color: 'text-amber-500' },
    { id: 'practice', label: 'Practice', icon: CheckCircle2, badge: practiceCount > 0 ? practiceCount : null, color: 'text-orange-500' },
    { id: 'stats', label: 'Progress', icon: BarChart3, badge: null }
  ];

  const cycleSpeed = () => {
    if (speechSpeed === 0.8) setSpeechSpeed(1.0);
    else if (speechSpeed === 1.0) setSpeechSpeed(1.2);
    else setSpeechSpeed(0.8);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo */}
          <div 
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-slate-900 via-red-600 to-amber-500 flex items-center justify-center shadow-md shadow-red-500/10 text-white font-bold text-base sm:text-lg group-hover:scale-105 transition-transform">
              <span>🇩🇪</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">Netzwerk neu</span>
                <span className={`px-1.5 py-0.5 text-[11px] font-black rounded ${
                  selectedLevel === 'A1'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                    : selectedLevel === 'A2'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                }`}>
                  {selectedLevel === 'all' ? 'A1 + A2 + B1' : selectedLevel}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">বাংলা ও ইংরেজি অর্থ সহ</p>
            </div>
          </div>

          {/* Level Switcher (Desktop / Tablet) */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shrink-0 text-xs font-bold">
            <button
              onClick={() => setSelectedLevel('A1')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                selectedLevel === 'A1'
                  ? 'bg-emerald-600 text-white shadow-sm font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
              title="Netzwerk neu A1 (1,761 Wörter)"
            >
              <span>A1</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedLevel === 'A1' ? 'bg-emerald-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {a1Count}
              </span>
            </button>

            <button
              onClick={() => setSelectedLevel('A2')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                selectedLevel === 'A2'
                  ? 'bg-amber-600 text-white shadow-sm font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
              title="Netzwerk neu A2 (1,452 Wörter)"
            >
              <span>A2</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedLevel === 'A2' ? 'bg-amber-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {a2Count}
              </span>
            </button>

            <button
              onClick={() => setSelectedLevel('B1')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                selectedLevel === 'B1'
                  ? 'bg-blue-600 text-white shadow-sm font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
              title="Netzwerk neu B1 (1,799 Wörter)"
            >
              <span>B1</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedLevel === 'B1' ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {b1Count}
              </span>
            </button>

            <button
              onClick={() => setSelectedLevel('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                selectedLevel === 'all'
                  ? 'bg-red-600 text-white shadow-sm font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
              }`}
              title="All Levels"
            >
              <span>All</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedLevel === 'all' ? 'bg-red-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {a1Count + a2Count + b1Count}
              </span>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                  if (activeTab !== 'vocabulary' && e.target.value.trim()) {
                    setActiveTab('vocabulary');
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsSearchFocused(false);
                    searchInputRef.current?.blur();
                  } else if (e.key === 'Enter') {
                    setIsSearchFocused(false);
                    setActiveTab('vocabulary');
                  }
                }}
                placeholder="Search Deutsch, English, বা বাংলায় খুঁজুন..."
                className="w-full pl-9 pr-9 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg border border-transparent focus:border-red-400 dark:focus:border-red-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchFocused(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                >
                  ✕
                </button>
              )}

              {/* Instant Search Results Dropdown */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 overflow-hidden max-h-[460px] overflow-y-auto">
                  <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700/60 mb-1">
                    <span className="font-bold">
                      {quickMatches.length > 0 ? `তাৎক্ষণিক রেজাল্ট (${quickMatches.length})` : 'কোনো মিল পাওয়া যায়নি'}
                    </span>
                    <span className="text-[10px]">Enter চাপলে সম্পূর্ণ তালিকা</span>
                  </div>

                  {quickMatches.length > 0 ? (
                    <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                      {quickMatches.map((m) => {
                        const item = m.item;
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              if (onSelectWord) {
                                onSelectWord(item);
                              } else {
                                setSearchQuery(item.word || item.german);
                                setActiveTab('vocabulary');
                              }
                              setIsSearchFocused(false);
                            }}
                            className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                                <span className={`text-[9px] font-black px-1 py-0.2 rounded uppercase ${
                                  item.level === 'A1'
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                    : item.level === 'B1'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                }`}>
                                  {item.level || 'A1'}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                                  {item.kapitel}
                                </span>
                                {item.article && (
                                  <span className={`text-[10px] font-extrabold px-1 py-0.2 rounded ${
                                    item.article === 'der'
                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                                      : item.article === 'die'
                                      ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                  }`}>
                                    {item.article}
                                  </span>
                                )}
                                <span className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                                  <HighlightText text={item.german || item.word} query={searchQuery} />
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs truncate">
                                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                                  🇧🇩 <HighlightText text={item.bangla} query={searchQuery} />
                                </span>
                                <span className="text-slate-300 dark:text-slate-600">·</span>
                                <span className="text-slate-500 dark:text-slate-400">
                                  🇬🇧 <HighlightText text={item.english} query={searchQuery} />
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakGerman(item.german || item.word, speechSpeed);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700 shrink-0"
                              title="Listen"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                      <p className="font-semibold mb-1">"{searchQuery}" এর জন্য কোনো শব্দ মেলেনি</p>
                      <p className="text-[11px] text-slate-400">বানান যাচাই করুন অথবা অন্য ভাষায় লিখুন (বাংলা, ইংরেজি বা জার্মান)</p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setIsSearchFocused(false);
                      setActiveTab('vocabulary');
                    }}
                    className="w-full mt-1 pt-2 pb-1 text-center text-xs font-bold text-red-600 dark:text-red-400 hover:underline border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-center gap-1"
                  >
                    <span>Vocabulary পেজে সব ফলাফল দেখুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons & Toggles */}
          <div className="flex items-center gap-2">
            {/* Speed Toggle */}
            <button
              onClick={cycleSpeed}
              title={`Speech Speed: ${speechSpeed}x (Click to change)`}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-red-500" />
              <span>{speechSpeed}x</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="md:hidden pb-3 pt-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'vocabulary' && e.target.value.trim()) {
                    setActiveTab('vocabulary');
                  }
                }}
                placeholder="Search Deutsch, English, বা বাংলায়..."
                className="w-full pl-9 pr-9 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg border border-transparent focus:border-red-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none border-t border-slate-100 dark:border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 shadow-sm border border-red-200/60 dark:border-red-900/50'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-600 dark:text-red-400' : item.color || ''}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                      isActive
                        ? 'bg-red-600 text-white dark:bg-red-500'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-2 shadow-xl">
          {/* Mobile Level Switcher */}
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold mb-2">
            <button
              onClick={() => {
                setSelectedLevel('A1');
              }}
              className={`py-2 rounded-lg text-center transition-all ${
                selectedLevel === 'A1'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span>A1 ({a1Count})</span>
            </button>
            <button
              onClick={() => {
                setSelectedLevel('A2');
              }}
              className={`py-2 rounded-lg text-center transition-all ${
                selectedLevel === 'A2'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span>A2 ({a2Count})</span>
            </button>
            <button
              onClick={() => {
                setSelectedLevel('B1');
              }}
              className={`py-2 rounded-lg text-center transition-all ${
                selectedLevel === 'B1'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span>B1 ({b1Count})</span>
            </button>
            <button
              onClick={() => {
                setSelectedLevel('all');
              }}
              className={`py-2 rounded-lg text-center transition-all ${
                selectedLevel === 'all'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span>All ({a1Count + a2Count + b1Count})</span>
            </button>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-600 dark:text-red-400' : item.color || ''}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
