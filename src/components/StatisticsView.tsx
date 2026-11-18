import React, { useState } from 'react';
import { BarChart3, CheckCircle2, RotateCcw, Star, BookOpen, Award, Download, Upload, Trash2, ArrowUpRight, Check, AlertCircle } from 'lucide-react';
import { VocabularyItem, UserProgressState, LanguageLevel, ChapterInfo } from '../types';
import { CHAPTERS, getChaptersByLevel } from '../data/chapters';

interface StatisticsViewProps {
  vocabulary: VocabularyItem[];
  progress: UserProgressState;
  selectedLevel?: LanguageLevel;
  chapters?: ChapterInfo[];
  onSelectKapitel: (kapitelId: string) => void;
  onResetProgress: () => void;
  onImportProgress: (data: UserProgressState) => void;
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({
  vocabulary,
  progress,
  selectedLevel,
  chapters,
  onSelectKapitel,
  onResetProgress,
  onImportProgress
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const availableChapters = chapters || (selectedLevel ? getChaptersByLevel(selectedLevel) : CHAPTERS);
  const totalWords = vocabulary.length;
  const learnedCount = vocabulary.filter((w) => progress.learned.includes(w.id)).length;
  const practiceCount = vocabulary.filter((w) => progress.practice.includes(w.id)).length;
  const favoritesCount = vocabulary.filter((w) => progress.favorites.includes(w.id)).length;
  const progressPercent = totalWords > 0 ? Math.round((learnedCount / totalWords) * 1000) / 10 : 0;

  // Breakdown by Part of Speech
  const posCounts: Record<string, { total: number; learned: number }> = {};
  vocabulary.forEach((item) => {
    const pos = item.partOfSpeech || 'Other';
    if (!posCounts[pos]) posCounts[pos] = { total: 0, learned: 0 };
    posCounts[pos].total++;
    if (progress.learned.includes(item.id)) {
      posCounts[pos].learned++;
    }
  });

  // Export JSON
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `netzwerk-neu-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotification({ type: 'success', text: 'Progress export downloaded successfully!' });
    setTimeout(() => setNotification(null), 4000);
  };

  // Import JSON
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed.learned)) {
          onImportProgress(parsed);
          setNotification({ type: 'success', text: 'Progress imported successfully!' });
        } else {
          setNotification({ type: 'error', text: 'Invalid progress file format.' });
        }
      } catch (err) {
        setNotification({ type: 'error', text: 'Failed to read file.' });
      }
      setTimeout(() => setNotification(null), 4000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`flex items-center gap-2 p-4 rounded-xl text-sm font-semibold transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
              : 'bg-red-50 dark:bg-red-950/80 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700'
          }`}
        >
          {notification.type === 'success' ? <Check className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
          <span>{notification.text}</span>
        </div>
      )}

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {selectedLevel === 'A1'
            ? 'Netzwerk neu A1 Progress & Analytics'
            : selectedLevel === 'A2'
            ? 'Netzwerk neu A2 Progress & Analytics'
            : selectedLevel === 'B1'
            ? 'Netzwerk neu B1 Progress & Analytics'
            : 'All-in-One A1 + A2 + B1 Progress & Analytics'}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detailed metrics, chapter mastery, and part-of-speech learning performance.
        </p>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Total Words</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{totalWords.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">Across 12 Chapters</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 block mb-1">Learned Words</span>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{learnedCount}</div>
          <p className="text-xs text-slate-500 mt-1">{progressPercent}% overall mastery</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-500 block mb-1">Need Practice</span>
          <div className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">{practiceCount}</div>
          <p className="text-xs text-slate-500 mt-1">Flagged for repetition</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500 block mb-1">Favorited</span>
          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">{favoritesCount}</div>
          <p className="text-xs text-slate-500 mt-1">Bookmarked items</p>
        </div>
      </div>

      {/* Chapter Breakdown Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700/80">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Kapitel-by-Kapitel Mastery</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Word count and completion rate for each chapter</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Kapitel</th>
                <th className="py-3 px-4">Thema / Title</th>
                <th className="py-3 px-4">PDF Seiten</th>
                <th className="py-3 px-4">Wörter</th>
                <th className="py-3 px-4">Gelernt</th>
                <th className="py-3 px-4">Fortschritt</th>
                <th className="py-3 px-4 text-right">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {availableChapters.map((ch) => {
                const chapterWords = vocabulary.filter(
                  (w) => w.kapitel === ch.id && (selectedLevel === 'all' ? w.level === ch.level : true)
                );
                const count = chapterWords.length || ch.wordCount;
                const learned = chapterWords.filter((w) => progress.learned.includes(w.id)).length;
                const pct = count > 0 ? Math.round((learned / count) * 100) : 0;
                const chapKey = selectedLevel === 'all' ? (ch.uniqueKey || `${ch.level}:${ch.id}`) : ch.id;

                return (
                  <tr key={ch.uniqueKey || `${ch.level}-${ch.id}`} className="hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${
                          ch.level === 'A1'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {ch.level}
                        </span>
                        <span>{ch.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{ch.title}</div>
                      {ch.banglaTitle && (
                        <div className="text-xs text-slate-400">{ch.banglaTitle}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-400">
                      S. {ch.pageStart}–{ch.pageEnd}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      {count}
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                      {learned}
                    </td>
                    <td className="py-3 px-4 w-48">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 w-9 text-right">
                          {pct}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSelectKapitel(chapKey)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 inline-flex items-center gap-1 text-xs font-bold"
                      >
                        <span>Öffnen</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part of Speech Distribution */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Word Type Distribution (Wortarten)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(posCounts).map(([pos, data]) => {
            const pct = data.total > 0 ? Math.round((data.learned / data.total) * 100) : 0;
            return (
              <div key={pos} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">{pos}</span>
                <div className="flex items-baseline justify-between mt-1 mb-1.5">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">{data.total}</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{data.learned} learned ({pct}%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Management: Backup, Restore, Reset */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Progress Storage & Backup</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Your learning progress is saved in your browser's LocalStorage automatically.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Progress</span>
          </button>

          <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 hover:bg-red-100 text-xs font-bold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Reset Learning Progress?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              This will clear all learned words, practice markers, and favorites from this browser. This cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-500 shadow-md"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
