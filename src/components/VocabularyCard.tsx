import React, { useState } from 'react';
import { Volume2, VolumeX, Star, BookmarkCheck, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { VocabularyItem } from '../types';
import { speakGerman } from '../utils/audio';
import { HighlightText } from './HighlightText';

interface VocabularyCardProps {
  item: VocabularyItem;
  isLearned: boolean;
  isPractice: boolean;
  isFavorite: boolean;
  onToggleLearned: (id: number) => void;
  onTogglePractice: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  speechSpeed: number;
  searchQuery?: string;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({
  item,
  isLearned,
  isPractice,
  isFavorite,
  onToggleLearned,
  onTogglePractice,
  onToggleFavorite,
  speechSpeed,
  searchQuery
}) => {
  const [isPlayingWord, setIsPlayingWord] = useState(false);
  const [isPlayingSentence, setIsPlayingSentence] = useState(false);

  const handlePlayWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingWord) return;
    setIsPlayingWord(true);
    speakGerman(
      item.german || item.word,
      speechSpeed,
      () => setIsPlayingWord(true),
      () => setIsPlayingWord(false),
      () => setIsPlayingWord(false)
    );
  };

  const handlePlaySentence = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingSentence || !item.exampleGerman) return;
    setIsPlayingSentence(true);
    speakGerman(
      item.exampleGerman,
      speechSpeed,
      () => setIsPlayingSentence(true),
      () => setIsPlayingSentence(false),
      () => setIsPlayingSentence(false)
    );
  };

  // Article color badges
  const getArticleBadge = () => {
    if (!item.article) return null;
    if (item.article === 'der') {
      return (
        <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          der (maskulin)
        </span>
      );
    }
    if (item.article === 'die') {
      return (
        <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          die (feminin)
        </span>
      );
    }
    if (item.article === 'das') {
      return (
        <span className="px-2 py-0.5 text-xs font-bold uppercase rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          das (neutral)
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-800/95 p-5 shadow-sm hover:shadow-md ${
        isLearned
          ? 'border-emerald-300/80 dark:border-emerald-700/60 ring-1 ring-emerald-500/20'
          : isPractice
          ? 'border-orange-300/80 dark:border-orange-700/60 ring-1 ring-orange-500/20'
          : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
    >
      {/* Top Bar: Chapter, ID, POS, Favorite */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Level badge */}
          <span
            className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
              item.level === 'A1'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60'
                : item.level === 'B1'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300/60 dark:border-blue-700/60'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60'
            }`}
          >
            {item.level || 'B1'}
          </span>
          {/* Chapter Word Number (e.g. Wort #1 / 86) */}
          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-red-100 text-red-700 dark:bg-red-950/70 dark:text-red-300">
            {item.kapitel} · #{item.chapterWordNumber}
          </span>
          <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400" title="Overall Glossary Word ID">
            ID: #{item.id}
          </span>
          {item.page && (
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              PDF S. {item.page}
            </span>
          )}
          {item.partOfSpeech && (
            <span className="text-[11px] px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              {item.partOfSpeech}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          className={`p-1.5 rounded-lg transition-colors ${
            isFavorite
              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
              : 'text-slate-300 dark:text-slate-600 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
        </button>
      </div>

      {/* Textbook Topic / Thema Badge */}
      {item.topic && (
        <div className="mb-2.5 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 rounded-lg px-2.5 py-1">
          <span className="font-bold text-red-600 dark:text-red-400 text-[11px] uppercase tracking-wider">Thema:</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{item.topic}</span>
          {item.topicBangla && (
            <span className="text-slate-500 dark:text-slate-400">({item.topicBangla})</span>
          )}
        </div>
      )}

      {/* German Headword & Audio Button */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              <HighlightText text={item.german || item.word} query={searchQuery} />
            </h3>
          </div>
          {getArticleBadge()}
        </div>

        {/* Independent Listen Button */}
        <button
          onClick={handlePlayWord}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            isPlayingWord
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-900/60'
          }`}
          title="Listen to German pronunciation"
        >
          <Volume2 className="w-4 h-4" />
          <span>{isPlayingWord ? 'Hören...' : 'Listen'}</span>
        </button>
      </div>

      {/* Plural / Verb forms */}
      <div className="text-xs text-slate-500 dark:text-slate-400 mb-3 space-y-0.5">
        {item.plural && item.plural !== '—' && (
          <p className="font-medium">
            <span className="text-slate-400 dark:text-slate-500">Plural:</span>{' '}
            <strong className="text-slate-700 dark:text-slate-200 font-semibold">
              <HighlightText text={item.plural} query={searchQuery} />
            </strong>
          </p>
        )}
        {item.verbForms && item.verbForms !== '—' && (
          <p className="font-medium text-slate-600 dark:text-slate-400 text-[11px] font-mono">
            <HighlightText text={item.verbForms} query={searchQuery} />
          </p>
        )}
      </div>

      {/* Meanings: Bangla & English */}
      <div className="space-y-2.5 my-3.5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
        {/* Bengali Meaning */}
        <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-0.5">
            <span>🇧🇩</span>
            <span>বাংলা অর্থ:</span>
          </div>
          <p className="text-base font-semibold text-slate-900 dark:text-emerald-100 leading-snug">
            <HighlightText text={item.bangla} query={searchQuery} />
          </p>
        </div>

        {/* English Meaning */}
        <div className="bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/40 rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 dark:text-sky-300 mb-0.5">
            <span>🇬🇧</span>
            <span>English:</span>
          </div>
          <p className="text-sm font-medium text-slate-800 dark:text-sky-100">
            <HighlightText text={item.english} query={searchQuery} />
          </p>
        </div>
      </div>

      {/* German Example Sentence & English Translation */}
      {item.exampleGerman && (
        <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Beispielsatz ({item.level || 'A1'})
            </span>
            <button
              onClick={handlePlaySentence}
              className={`p-1 rounded-md text-xs transition-colors ${
                isPlayingSentence
                  ? 'text-red-600 bg-red-100 dark:bg-red-950'
                  : 'text-slate-400 hover:text-red-600 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
              title="Listen to example sentence"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
            <HighlightText text={item.exampleGerman} query={searchQuery} />
          </p>
          {item.exampleBangla && (
            <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium mt-1">
              🇧🇩 <HighlightText text={item.exampleBangla} query={searchQuery} />
            </p>
          )}
          {item.exampleEnglish && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 italic">
              🇬🇧 <HighlightText text={item.exampleEnglish} query={searchQuery} />
            </p>
          )}
        </div>
      )}

      {/* Bottom Action Buttons: Learned & Practice */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePractice(item.id);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            isPractice
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/40 dark:hover:text-orange-300'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isPractice ? 'In Practice' : 'Need Practice'}</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLearned(item.id);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            isLearned
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isLearned ? 'Learned' : 'Mark Learned'}</span>
        </button>
      </div>
    </div>
  );
};
