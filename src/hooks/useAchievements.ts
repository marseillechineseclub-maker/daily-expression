import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface AchievementDef {
  id: string;
  title: string;
  desc: string;
  emoji: string;
}

interface AchievementStats {
  learnedCount: number;
  currentStreak: number;
  totalReviews: number;
  hasPerfectQuiz: boolean;
}

const ACHIEVEMENTS: (AchievementDef & { check: (s: AchievementStats) => boolean })[] = [
  { id: 'first-learned', title: 'First Step', desc: 'Learned your first expression', emoji: '🌱', check: (s) => s.learnedCount >= 1 },
  { id: 'streak-7', title: 'Week Warrior', desc: 'Achieved a 7-day streak', emoji: '🔥', check: (s) => s.currentStreak >= 7 },
  { id: 'milestone-25', title: 'Quarter Century', desc: 'Learned 25 expressions', emoji: '⭐', check: (s) => s.learnedCount >= 25 },
  { id: 'milestone-50', title: 'Halfway There', desc: 'Learned 50 expressions', emoji: '🌟', check: (s) => s.learnedCount >= 50 },
  { id: 'milestone-100', title: 'Century Club', desc: 'Learned 100 expressions!', emoji: '🏆', check: (s) => s.learnedCount >= 100 },
  { id: 'first-review', title: 'Memory Keeper', desc: 'Completed your first SRS review', emoji: '🧠', check: (s) => s.totalReviews >= 1 },
  { id: 'perfect-quiz', title: 'Perfect Score', desc: 'Got 100% on a quiz', emoji: '💯', check: (s) => s.hasPerfectQuiz },
];

export function useAchievements(stats: AchievementStats) {
  const [unlockedIds, setUnlockedIds] = useLocalStorage<string[]>('daily-expression-achievements', []);
  const [newlyUnlocked, setNewlyUnlocked] = useState<AchievementDef | null>(null);

  useEffect(() => {
    for (const achievement of ACHIEVEMENTS) {
      if (!unlockedIds.includes(achievement.id) && achievement.check(stats)) {
        setUnlockedIds((prev) => [...prev, achievement.id]);
        setNewlyUnlocked({ id: achievement.id, title: achievement.title, desc: achievement.desc, emoji: achievement.emoji });
        break; // one at a time
      }
    }
  }, [stats.learnedCount, stats.currentStreak, stats.totalReviews, stats.hasPerfectQuiz]);

  const clearNewlyUnlocked = () => setNewlyUnlocked(null);

  const unlockedAchievements = ACHIEVEMENTS
    .filter((a) => unlockedIds.includes(a.id))
    .map(({ id, title, desc, emoji }) => ({ id, title, desc, emoji }));

  return { unlockedIds, unlockedAchievements, newlyUnlocked, clearNewlyUnlocked };
}
