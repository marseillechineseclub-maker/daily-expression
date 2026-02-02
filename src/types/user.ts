import type { Category } from './expression';

export interface UserData {
  name: string;
  createdAt: string;
  lastVisitDate: string;
}

export interface UserPreferences {
  selectedCategory: Category | 'All';
  dailyGoal: number;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalLearned: number;
  totalReviews: number;
}

export interface StreakData {
  current: number;
  longest: number;
  lastVisit: string;
}
