import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { expressions } from '../data/expressions';
import type { Category, UserData, StreakData } from '../types';
import { getTodayString, getDailyExpressionIndex, isYesterday, isSameDay } from '../utils/date';

type Screen = 'welcome' | 'home' | 'quiz' | 'review' | 'progress' | 'settings';

interface AppState {
  // User data
  user: UserData | null;
  streak: StreakData;

  // Expression state
  learnedIds: string[];
  selectedCategory: Category | 'All';
  currentIndex: number;

  // Navigation
  currentScreen: Screen;
}

interface AppContextValue extends AppState {
  // User actions
  setUser: (user: UserData) => void;
  updateStreak: () => void;

  // Expression actions
  markAsLearned: (id: string) => void;
  markAsUnlearned: (id: string) => void;
  isLearned: (id: string) => boolean;
  setCategory: (category: Category | 'All') => void;
  setCurrentIndex: (index: number) => void;

  // Navigation
  setScreen: (screen: Screen) => void;

  // Computed values
  dailyIndex: number;
  filteredExpressions: typeof expressions;
  progress: { learned: number; total: number };
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // Persisted state
  const [user, setUserStorage] = useLocalStorage<UserData | null>('daily-expression-user', null);
  const [streak, setStreak] = useLocalStorage<StreakData>('daily-expression-streak', {
    current: 0,
    longest: 0,
    lastVisit: '',
  });
  const [learnedIds, setLearnedIds] = useLocalStorage<string[]>('daily-expression-learned', []);
  const [selectedCategory, setSelectedCategory] = useLocalStorage<Category | 'All'>(
    'daily-expression-category',
    'All'
  );

  // Local state
  const [currentScreen, setCurrentScreen] = useState<Screen>(user ? 'home' : 'welcome');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Computed values
  const dailyIndex = getDailyExpressionIndex(expressions.length);

  const filteredExpressions = selectedCategory === 'All'
    ? expressions
    : expressions.filter((e) => e.category === selectedCategory);

  const progress = {
    learned: learnedIds.length,
    total: expressions.length,
  };

  // User actions
  const setUser = useCallback((newUser: UserData) => {
    setUserStorage(newUser);
    setCurrentScreen('home');
  }, [setUserStorage]);

  const updateStreak = useCallback(() => {
    const today = getTodayString();

    setStreak((prev) => {
      // First visit
      if (!prev.lastVisit) {
        return { current: 1, longest: 1, lastVisit: today };
      }

      // Already visited today
      if (isSameDay(prev.lastVisit, today)) {
        return prev;
      }

      // Visited yesterday - continue streak
      if (isYesterday(prev.lastVisit, today)) {
        const newStreak = prev.current + 1;
        return {
          current: newStreak,
          longest: Math.max(newStreak, prev.longest),
          lastVisit: today,
        };
      }

      // Streak broken - reset to 1
      return {
        current: 1,
        longest: prev.longest,
        lastVisit: today,
      };
    });
  }, [setStreak]);

  // Expression actions
  const markAsLearned = useCallback((id: string) => {
    setLearnedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, [setLearnedIds]);

  const markAsUnlearned = useCallback((id: string) => {
    setLearnedIds((prev) => prev.filter((learnedId) => learnedId !== id));
  }, [setLearnedIds]);

  const isLearned = useCallback(
    (id: string) => learnedIds.includes(id),
    [learnedIds]
  );

  const setCategory = useCallback(
    (category: Category | 'All') => {
      setSelectedCategory(category);
      setCurrentIndex(0);
    },
    [setSelectedCategory]
  );

  const setScreen = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
  }, []);

  const value: AppContextValue = {
    // State
    user,
    streak,
    learnedIds,
    selectedCategory,
    currentIndex,
    currentScreen,

    // User actions
    setUser,
    updateStreak,

    // Expression actions
    markAsLearned,
    markAsUnlearned,
    isLearned,
    setCategory,
    setCurrentIndex,

    // Navigation
    setScreen,

    // Computed
    dailyIndex,
    filteredExpressions,
    progress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
