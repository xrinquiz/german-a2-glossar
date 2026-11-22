import { UserProgressState } from '../types';

const STORAGE_KEY = 'german_a2_progress_v1';
const THEME_KEY = 'german_a2_theme_v1';

const DEFAULT_STATE: UserProgressState = {
  learned: [],
  practice: [],
  favorites: [],
  history: [],
  lastKapitel: 'Kapitel 1'
};

export const getStoredProgress = (): UserProgressState => {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      learned: Array.isArray(parsed.learned) ? parsed.learned : [],
      practice: Array.isArray(parsed.practice) ? parsed.practice : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      history: Array.isArray(parsed.history) ? parsed.history : [],
      lastKapitel: typeof parsed.lastKapitel === 'string' ? parsed.lastKapitel : 'Kapitel 1'
    };
  } catch (e) {
    console.error('Failed to load progress from localStorage:', e);
    return DEFAULT_STATE;
  }
};

export const saveStoredProgress = (state: UserProgressState) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save progress to localStorage:', e);
  }
};

export const getStoredTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    // Check OS preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {
    // ignore
  }
  return 'light';
};

export const saveStoredTheme = (theme: 'light' | 'dark') => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  } catch (e) {
    // ignore
  }
};
