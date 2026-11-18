import React from 'react';
import { normalizeGermanSimple } from '../utils/searchEngine';

interface HighlightTextProps {
  text: string;
  query?: string;
  className?: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({ text, query, className = '' }) => {
  if (!text) return null;
  if (!query || !query.trim()) return <span className={className}>{text}</span>;

  const rawQ = query.trim();
  const lowerQ = rawQ.toLowerCase();
  const lowerText = text.toLowerCase();

  // Try direct substring match first
  const idx = lowerText.indexOf(lowerQ);
  if (idx >= 0) {
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + rawQ.length);
    const after = text.slice(idx + rawQ.length);
    return (
      <span className={className}>
        {before}
        <mark className="bg-amber-200/90 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 rounded px-0.5 font-bold underline decoration-amber-400">
          {match}
        </mark>
        {after}
      </span>
    );
  }

  // Try normalized German umlaut match
  const normText = normalizeGermanSimple(text);
  const normQ = normalizeGermanSimple(rawQ);
  const normIdx = normText.indexOf(normQ);
  if (normIdx >= 0 && normQ.length > 2) {
    const start = Math.min(normIdx, text.length - 1);
    const end = Math.min(start + normQ.length, text.length);
    const before = text.slice(0, start);
    const match = text.slice(start, end);
    const after = text.slice(end);
    return (
      <span className={className}>
        {before}
        <mark className="bg-amber-200/90 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 rounded px-0.5 font-bold underline decoration-amber-400">
          {match}
        </mark>
        {after}
      </span>
    );
  }

  return <span className={className}>{text}</span>;
};
