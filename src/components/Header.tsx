import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Layers,
  CheckCircle2,
  Star,
  Sparkles,
  Moon,
  Sun,
  Volume2,
  Search,
  BarChart3,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  Globe2,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';

import { LanguageLevel, VocabularyItem } from '../types';
import { searchVocabulary } from '../utils/searchEngine';
import { speakGerman } from '../utils/audio';
import { HighlightText } from './HighlightText';

interface HeaderProps {
  activeTab: 'dashboard' | 'kapitel' | 'vocabulary' | 'flashcards' | 'learn' | 'favorites' | 'practice' | 'stats' | 'conjugation';
  setActiveTab: (tab: 'dashboard' | 'kapitel' | 'vocabulary' | 'flashcards' | 'learn' | 'favorites' | 'practice' | 'stats' | 'conjugation') => void;
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [isLevelMenuOpen, setIsLevelMenuOpen] = useState(false);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [isPlayingTestAudio, setIsPlayingTestAudio] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const sectionMenuRef = useRef<HTMLDivElement>(null);
  const levelMenuRef = useRef<HTMLDivElement>(null);
  const speedMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (sectionMenuRef.current && !sectionMenuRef.current.contains(e.target as Node)) {
        setIsSectionMenuOpen(false);
      }
      if (levelMenuRef.current && !levelMenuRef.current.contains(e.target as Node)) {
        setIsLevelMenuOpen(false);
      }
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const quickMatches = useMemo(() => {
    if (!searchQuery.trim() || allVocabulary.length === 0) return [];
    return searchVocabulary(allVocabulary, searchQuery).slice(0, 6);
  }, [allVocabulary, searchQuery]);

  // Unified categorized navigation options
  const navigationGroups = [
    {
      groupTitle: 'শব্দভাণ্ডার ও অধ্যায় (Wortschatz)',
      groupTitleGerman: 'Wortschatz & Kapitel',
      items: [
        {
          id: 'dashboard' as const,
          label: 'Dashboard',
          labelBangla: 'ড্যাশবোর্ড ও ওভারভিউ',
          icon: BookOpen,
          badge: null,
          desc: 'সামগ্রিক অগ্রগতি ও কুইক স্ট্যাটাস'
        },
        {
          id: 'kapitel' as const,
          label: 'Kapitel Übersicht',
          labelBangla: 'অধ্যায়ভিত্তিক শব্দাবলী',
          icon: Layers,
          badge: selectedLevel === 'all' ? '36টি' : '12টি',
          desc: 'পাঠ্যবইয়ের প্রতিটি অধ্যায় অনুযায়ী ব্রাউজ'
        },
        {
          id: 'vocabulary' as const,
          label: 'Alle Wörter',
          labelBangla: 'সম্পূর্ণ শব্দভাণ্ডার',
          icon: Sparkles,
          badge: totalWords > 0 ? `${totalWords}` : null,
          desc: 'অনুসন্ধান, ফিল্টার ও সম্পূর্ণ ওয়ার্ডলিস্ট'
        }
      ]
    },
    {
      groupTitle: 'ক্রিয়া ও ব্যাকরণ (Grammatik)',
      groupTitleGerman: 'Verben & Konjugation',
      items: [
        {
          id: 'conjugation' as const,
          label: 'Verb-Konjugator & Grammatik',
          labelBangla: 'ক্রিয়ার রূপান্তর ও ১১টি ব্যাকরণ টপিক',
          icon: Sparkles,
          badge: '800+ Verben',
          color: 'text-red-500',
          desc: '৬টি কাল, Konjunktiv, Imperativ ও ব্যাকরণ রুলস'
        }
      ]
    },
    {
      groupTitle: 'অনুশীলন ও টেস্ট (Lernen & Praxis)',
      groupTitleGerman: 'Lernen & Prüfung',
      items: [
        {
          id: 'flashcards' as const,
          label: 'Flashcards',
          labelBangla: 'ফ্ল্যাশকার্ড অনুশীলন',
          icon: Sparkles,
          badge: null,
          desc: 'কার্ড উল্টিয়ে দ্রুত মুখস্থ ও রিভিশন'
        },
        {
          id: 'learn' as const,
          label: 'Learn Mode',
          labelBangla: 'ইন্টারেক্টিভ কুইজ ও পরীক্ষা',
          icon: HelpCircle,
          badge: null,
          desc: 'বহুনির্বাচনী প্রশ্ন ও স্মৃতিশক্তি যাচাই'
        },
        {
          id: 'favorites' as const,
          label: 'Favoriten',
          labelBangla: 'পছন্দের সংরক্ষিত শব্দ',
          icon: Star,
          badge: favoritesCount > 0 ? `${favoritesCount}` : null,
          color: 'text-amber-500',
          desc: 'স্টার মার্ক করা গুরুত্বপূর্ণ শব্দসমূহ'
        },
        {
          id: 'practice' as const,
          label: 'Need Practice',
          labelBangla: 'অনুশীলন প্রয়োজন এমন শব্দ',
          icon: CheckCircle2,
          badge: practiceCount > 0 ? `${practiceCount}` : null,
          color: 'text-orange-500',
          desc: 'চ্যালেঞ্জিং শব্দগুলোর আলাদা তালিকা'
        },
        {
          id: 'stats' as const,
          label: 'Fortschritt & Stats',
          labelBangla: 'শেখার অগ্রগতি ও বিশ্লেষণ',
          icon: BarChart3,
          badge: `${learnedCount} শেখা`,
          desc: 'আপনার সম্পূর্ণ ডেটা ও পরিসংখ্যান'
        }
      ]
    }
  ];

  // Flat list of all items for lookups
  const allNavItems = useMemo(() => {
    return navigationGroups.flatMap((g) => g.items);
  }, []);

  const activeItemInfo = useMemo(() => {
    return allNavItems.find((i) => i.id === activeTab) || allNavItems[0];
  }, [allNavItems, activeTab]);

  const speedPresets = [
    { value: 0.35, label: '0.35x', tag: '০.৫ এর নিচে (খুব ধীর)', desc: 'নিখুঁতভাবে ভেঙে শোনার জন্য' },
    { value: 0.5, label: '0.50x', tag: 'ধীরগতি (০.৫x)', desc: 'ধীরেসুস্থে স্পষ্ট উচ্চারণে' },
    { value: 0.7, label: '0.70x', tag: 'সহজ গতি', desc: 'সহজবোধ্য উচ্চারণ' },
    { value: 0.85, label: '0.85x', tag: 'প্রস্তাবিত', desc: 'সবচেয়ে ভারসাম্যপূর্ণ গতি' },
    { value: 1.0, label: '1.00x', tag: 'স্বাভাবিক', desc: 'প্রাকৃতিক কথ্য জার্মান গতি' },
    { value: 1.2, label: '1.20x', tag: 'সর্বোচ্চ ১.২x', desc: 'উচ্চ গতিতে শোনার জন্য' }
  ];

  const cycleSpeed = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const values = [0.35, 0.5, 0.7, 0.85, 1.0, 1.2];
    const currentIndex = values.findIndex((v) => Math.abs(v - speechSpeed) < 0.04);
    if (currentIndex === -1 || currentIndex === values.length - 1) {
      setSpeechSpeed(values[0]);
    } else {
      setSpeechSpeed(values[currentIndex + 1]);
    }
  };

  const handleTestAudio = () => {
    if (isPlayingTestAudio) return;
    setIsPlayingTestAudio(true);
    speakGerman(
      'Guten Tag! Wie geht es Ihnen?',
      speechSpeed,
      () => setIsPlayingTestAudio(true),
      () => setIsPlayingTestAudio(false),
      () => setIsPlayingTestAudio(false)
    );
  };

  const levelOptions: { id: LanguageLevel; label: string; count: number; desc: string }[] = [
    { id: 'A1', label: 'Netzwerk neu A1', count: a1Count, desc: 'প্রাথমিক লেভেল (১,৭৬১ শব্দ)' },
    { id: 'A2', label: 'Netzwerk neu A2', count: a2Count, desc: 'মধ্যবর্তী লেভেল (১,৪৫২ শব্দ)' },
    { id: 'B1', label: 'Netzwerk neu B1', count: b1Count, desc: 'অগ্রবর্তী লেভেল (১,৭৯৯ শব্দ)' },
    { id: 'all', label: 'Alle Stufen (A1+A2+B1)', count: a1Count + a2Count + b1Count, desc: 'সম্পূর্ণ সংগ্রহ (৩,২১৩+ শব্দ)' }
  ];

  const currentLevelInfo = levelOptions.find((l) => l.id === selectedLevel) || levelOptions[1];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-3">
          {/* ========================================================= */}
          {/* 1. BRAND LOGO & TITLE                                      */}
          {/* ========================================================= */}
          <div
            onClick={() => {
              setActiveTab('dashboard');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-slate-900 via-red-600 to-amber-500 flex items-center justify-center shadow-md shadow-red-500/10 text-white font-bold text-base sm:text-lg group-hover:scale-105 transition-transform">
              <span>🇩🇪</span>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">
                  Netzwerk neu
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded uppercase bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                  Glossar
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">বাংলা ও ইংরেজি অর্থ সহ</p>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. UNIFIED OPTION SELECTOR (THE CLEAN PROFESSIONAL HUB)   */}
          {/* ========================================================= */}
          <div className="flex items-center gap-2">
            {/* Unified Section / Tab Selector Dropdown */}
            <div ref={sectionMenuRef} className="relative">
              <button
                onClick={() => {
                  setIsSectionMenuOpen(!isSectionMenuOpen);
                  setIsLevelMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-2xl border text-xs sm:text-sm font-bold transition-all shadow-xs ${
                  isSectionMenuOpen
                    ? 'bg-red-50 text-red-700 border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800'
                    : 'bg-slate-100/80 hover:bg-slate-200/70 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
                }`}
                title="বিভাগ বা অপশন নির্বাচন করুন"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-red-600 text-white shadow-xs">
                    <activeItemInfo.icon className="w-3.5 h-3.5" />
                  </span>
                  <div className="text-left hidden xs:block">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-none font-semibold">
                      মডিউল / অপশন:
                    </span>
                    <span className="font-extrabold text-xs sm:text-sm leading-tight block">
                      {activeItemInfo.label}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isSectionMenuOpen ? 'rotate-180 text-red-600' : ''
                  }`}
                />
              </button>

              {/* Categorized Dropdown Menu */}
              {isSectionMenuOpen && (
                <div className="absolute left-0 mt-2 w-[calc(100vw-1.5rem)] max-w-sm sm:w-84 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[82vh] overflow-y-auto scrollbar-thin">
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800/80 mb-1 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      অ্যাপ্লিকেশন মডিউল
                    </span>
                    <span className="text-[10px]">ক্লিক করে নির্বাচন করুন</span>
                  </div>

                  {navigationGroups.map((group, gIdx) => (
                    <div key={gIdx} className="mb-2 last:mb-0">
                      <div className="px-2.5 py-1 text-[11px] font-black text-red-600 dark:text-red-400 tracking-wider uppercase">
                        {group.groupTitle}
                      </div>

                      <div className="space-y-0.5">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setActiveTab(item.id);
                                setIsSectionMenuOpen(false);
                              }}
                              className={`w-full p-2.5 rounded-2xl text-left flex items-start gap-3 transition-all ${
                                isActive
                                  ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/60 font-bold'
                                  : 'hover:bg-slate-100 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-transparent'
                              }`}
                            >
                              <div
                                className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                                  isActive
                                    ? 'bg-red-600 text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span
                                      className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                                        isActive
                                          ? 'bg-red-600 text-white'
                                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                      }`}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                                  {item.labelBangla}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Unified Level Selector Dropdown */}
            <div ref={levelMenuRef} className="relative">
              <button
                onClick={() => {
                  setIsLevelMenuOpen(!isLevelMenuOpen);
                  setIsSectionMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-2xl border text-xs sm:text-sm font-bold transition-all shadow-xs ${
                  isLevelMenuOpen
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900'
                    : 'bg-slate-100/80 hover:bg-slate-200/70 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
                }`}
                title="লেভেল পরিবর্তন করুন (A1, A2, B1 বা সম্পূর্ণ)"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${
                      selectedLevel === 'A1'
                        ? 'bg-emerald-600 text-white'
                        : selectedLevel === 'A2'
                        ? 'bg-amber-600 text-white'
                        : selectedLevel === 'B1'
                        ? 'bg-blue-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {selectedLevel === 'all' ? 'All' : selectedLevel}
                  </span>
                  <span className="hidden md:inline font-extrabold text-xs">
                    {currentLevelInfo.count} শব্দ
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    isLevelMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Level Dropdown Menu */}
              {isLevelMenuOpen && (
                <div className="absolute left-0 mt-2 w-[calc(100vw-1.5rem)] max-w-xs sm:w-64 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 mb-1">
                    ভাষার লেভেল নির্বাচন করুন
                  </div>

                  <div className="space-y-1">
                    {levelOptions.map((opt) => {
                      const isLvlActive = selectedLevel === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSelectedLevel(opt.id);
                            setIsLevelMenuOpen(false);
                          }}
                          className={`w-full p-2.5 rounded-2xl text-left flex items-center justify-between gap-2 transition-all ${
                            isLvlActive
                              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${
                                  opt.id === 'A1'
                                    ? 'bg-emerald-500 text-white'
                                    : opt.id === 'A2'
                                    ? 'bg-amber-500 text-white'
                                    : opt.id === 'B1'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-red-500 text-white'
                                }`}
                              >
                                {opt.id}
                              </span>
                              <strong className="text-xs">{opt.label}</strong>
                            </div>
                            <span className="text-[11px] opacity-80 block mt-0.5">{opt.desc}</span>
                          </div>

                          <span className="text-xs font-mono font-bold opacity-90">{opt.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Quick-Access Pills (Top 3 Essential Tabs for Ultra Fast Switching) */}
            <div className="hidden lg:flex items-center gap-1 pl-1 border-l border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('vocabulary')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'vocabulary'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Wörter
              </button>
              <button
                onClick={() => setActiveTab('conjugation')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'conjugation'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Konjugation
              </button>
              <button
                onClick={() => setActiveTab('learn')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'learn'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Test & Übung
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. SEARCH BAR (RESPONSIVE & CLEAN)                         */}
          {/* ========================================================= */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative">
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
                placeholder="শব্দ বা অর্থ খুঁজুন..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 rounded-2xl border border-transparent focus:border-red-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setIsSearchFocused(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}

              {/* Instant Search Dropdown */}
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2 z-50 max-h-[380px] overflow-y-auto scrollbar-thin">
                  {quickMatches.length > 0 ? (
                    quickMatches.map((m) => {
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
                          className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/60 cursor-pointer transition-colors flex items-center justify-between gap-2"
                        >
                          <div>
                            <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                              {item.german || item.word}
                            </strong>
                            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block">
                              🇧🇩 {item.bangla}
                            </span>
                          </div>
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                            {item.level || 'A1'}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-3 text-center text-xs text-slate-400">কোনো শব্দ পাওয়া যায়নি</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* 4. UTILITY CONTROLS: SPEED, THEME & MOBILE                */}
          {/* ========================================================= */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Speed Control Popover & Toggle */}
            <div className="relative" ref={speedMenuRef}>
              <button
                onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
                title={`উচ্চারণ গতি: ${speechSpeed.toFixed(2)}x (ক্লিক করে নিয়ন্ত্রণ করুন)`}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                  isSpeedMenuOpen
                    ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-300 dark:border-red-800 ring-2 ring-red-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="font-mono">{speechSpeed.toFixed(2)}x</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isSpeedMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Speed Popover Dropdown */}
              {isSpeedMenuOpen && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] max-w-xs sm:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <SlidersHorizontal className="w-4 h-4 text-red-600" />
                      <span className="text-xs font-black uppercase text-slate-900 dark:text-white">সাউন্ড স্পিড</span>
                    </div>
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50">
                      {speechSpeed.toFixed(2)}x
                    </span>
                  </div>

                  {/* Range Slider: min 0.30x to max 1.20x */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      <span>গতি অ্যাডজাস্ট করুন:</span>
                      <span className="text-[10px] text-red-600 dark:text-red-400 font-bold">
                        {speechSpeed < 0.5 ? '০.৫ এর নিচে (খুব ধীর)' : speechSpeed >= 1.1 ? 'সর্বোচ্চ সীমা (১.২x)' : 'স্বাভাবিক রেঞ্জ'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.30"
                      max="1.20"
                      step="0.05"
                      value={speechSpeed}
                      onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
                      className="w-full accent-red-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>০.৩০x (সর্বনিম্ন)</span>
                      <span>০.৫০x</span>
                      <span>০.৮৫x</span>
                      <span>১.২০x (সর্বোচ্চ)</span>
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      প্রিসেট অপশন (ক্লিক করে দ্রুত নির্বাচন করুন):
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {speedPresets.map((p) => {
                        const isCurrent = Math.abs(p.value - speechSpeed) < 0.04;
                        return (
                          <button
                            key={p.value}
                            onClick={() => setSpeechSpeed(p.value)}
                            className={`p-1.5 rounded-xl text-center transition-all border ${
                              isCurrent
                                ? 'bg-red-600 text-white font-bold border-red-600 shadow-sm'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-red-300'
                            }`}
                          >
                            <span className="text-xs font-mono block">{p.label}</span>
                            <span className="text-[9px] opacity-80 block truncate">{p.tag}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Test Audio Button */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={handleTestAudio}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        isPlayingTestAudio
                          ? 'bg-amber-500 text-white animate-pulse'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlayingTestAudio ? 'উচ্চারণ প্লে হচ্ছে...' : 'উচ্চারণ টেস্ট শুনুন (Test Audio)'}</span>
                    </button>
                    <span className="text-[10px] text-slate-400 text-center block mt-1">
                      "Guten Tag! Wie geht es Ihnen?"
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Single Theme Toggle Button (Flip Animation) */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`relative p-2 rounded-xl border transition-all duration-300 ease-in-out transform active:scale-90 ${
                darkMode
                  ? 'bg-slate-800 text-amber-400 border-slate-700 hover:bg-slate-700 hover:text-amber-300 shadow-sm'
                  : 'bg-slate-100 text-slate-700 border-slate-200/80 hover:bg-slate-200 hover:text-slate-900 shadow-xs'
              }`}
              title={darkMode ? 'লাইট মোডে পরিবর্তন করুন (Click for Light Mode)' : 'ডার্ক মোডে পরিবর্তন করুন (Click for Dark Mode)'}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className={`transition-transform duration-300 transform ${darkMode ? 'rotate-180 scale-105' : 'rotate-0 scale-100'}`}>
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400 drop-shadow-sm transition-transform duration-300" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300" />
                )}
              </div>
            </button>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
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
                className="w-full pl-9 pr-9 py-2 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl border border-transparent focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Level Switcher (Mobile) */}
          <div>
            <span className="text-[11px] font-black uppercase text-slate-400 block mb-2">লেভেল সিলেক্ট করুন:</span>
            <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
              {levelOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedLevel(opt.id);
                  }}
                  className={`py-2 rounded-xl text-center transition-all ${
                    selectedLevel === opt.id
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>{opt.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sound Speed Controller (Mobile) */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-red-600" />
                <span>সাউন্ড স্পিড (Speech Speed):</span>
              </span>
              <span className="text-xs font-bold font-mono text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded-lg">
                {speechSpeed.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min="0.30"
              max="1.20"
              step="0.05"
              value={speechSpeed}
              onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
              className="w-full accent-red-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>০.৩০x (খুব ধীর)</span>
              <span>০.৫০x</span>
              <span>০.৮৫x</span>
              <span>১.২০x (সর্বোচ্চ)</span>
            </div>
            <div className="grid grid-cols-3 gap-1 pt-1">
              {speedPresets.map((p) => {
                const isCurrent = Math.abs(p.value - speechSpeed) < 0.04;
                return (
                  <button
                    key={p.value}
                    onClick={() => setSpeechSpeed(p.value)}
                    className={`py-1 text-[10px] font-mono rounded-lg transition-all border ${
                      isCurrent
                        ? 'bg-red-600 text-white font-bold border-red-600'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Toggle (Mobile) */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">থিম মোড (Theme):</span>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all duration-300 transform active:scale-95 ${
                darkMode
                  ? 'bg-slate-800 text-amber-400 border-slate-700 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <div className={`transition-transform duration-300 ${darkMode ? 'rotate-180' : 'rotate-0'}`}>
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </div>
              <span>{darkMode ? 'ডার্ক মোড' : 'লাইট মোড'}</span>
            </button>
          </div>

          {/* Module Selector (Mobile) */}
          <div className="space-y-3">
            <span className="text-[11px] font-black uppercase text-slate-400 block">মডিউল / অপশন:</span>
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full p-3 rounded-2xl text-left flex items-center justify-between gap-2 transition-all ${
                    isActive
                      ? 'bg-red-600 text-white font-bold shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <div>
                      <span className="text-xs font-bold block">{item.label}</span>
                      <span className="text-[10px] opacity-80 block">{item.labelBangla}</span>
                    </div>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/20 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
