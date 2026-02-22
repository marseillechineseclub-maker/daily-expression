import { useEffect, useCallback, useState, useRef } from 'react';
import { Header, Navigation } from '../layout';
import { ExpressionCard, CategoryFilter } from '../expression';
import { WelcomeBackModal } from './WelcomeBackModal';
import { useApp } from '../../context/AppContext';
import { useSRS } from '../../hooks/useSRS';
import { useAchievements } from '../../hooks/useAchievements';
import { getFormattedDate, getTodayString } from '../../utils/date';
import { getDaysUntilReview } from '../../services/srsAlgorithm';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { DailyChallengeRecord } from './DailyChallengeScreen';

interface QuizHistoryEntry {
  date: string;
  score: number;
  total: number;
  percentage: number;
}

export function HomeScreen() {
  const {
    user,
    streak,
    progress,
    filteredExpressions,
    currentIndex,
    setCurrentIndex,
    dailyIndex,
    selectedCategory,
    setCategory,
    isLearned,
    markAsLearned,
    markAsUnlearned,
    updateStreak,
    setScreen,
    learnedIds,
  } = useApp();

  const { getDueCount, initializeCard, srsData } = useSRS(learnedIds);
  const dueCount = getDueCount();

  const [showCongrats, setShowCongrats] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [lastWelcomeShown, setLastWelcomeShown] = useLocalStorage<string>(
    'daily-expression-last-welcome',
    ''
  );
  const hasCheckedWelcome = useRef(false);

  // Daily challenge tracking
  const [dailyChallenge] = useLocalStorage<DailyChallengeRecord | null>(
    'daily-expression-daily-challenge',
    null
  );
  const todayCompleted = dailyChallenge?.date === getTodayString();

  // Quiz history for achievements
  const [quizHistory] = useLocalStorage<QuizHistoryEntry[]>(
    'daily-expression-quiz-history',
    []
  );

  // Review forecast
  const dueToday = learnedIds.filter(
    (id) => srsData[id] && getDaysUntilReview(srsData[id]) <= 0
  ).length;
  const dueTomorrow = learnedIds.filter(
    (id) => srsData[id] && getDaysUntilReview(srsData[id]) === 1
  ).length;
  const dueThisWeek = learnedIds.filter(
    (id) =>
      srsData[id] &&
      getDaysUntilReview(srsData[id]) >= 2 &&
      getDaysUntilReview(srsData[id]) <= 7
  ).length;

  // Achievements
  const totalReviews = learnedIds.filter(
    (id) => srsData[id]?.lastReviewDate !== null && srsData[id]?.lastReviewDate !== undefined
  ).length;
  const hasPerfectQuiz = quizHistory.some((entry) => entry.percentage === 100);

  const { unlockedAchievements, newlyUnlocked, clearNewlyUnlocked } = useAchievements({
    learnedCount: learnedIds.length,
    currentStreak: streak.current,
    totalReviews,
    hasPerfectQuiz,
  });

  // Auto-dismiss achievement toast
  useEffect(() => {
    if (newlyUnlocked) {
      const timer = setTimeout(() => clearNewlyUnlocked(), 3000);
      return () => clearTimeout(timer);
    }
  }, [newlyUnlocked, clearNewlyUnlocked]);

  // Update streak on mount
  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Show welcome back modal for returning users (once per day)
  useEffect(() => {
    if (hasCheckedWelcome.current) return;
    hasCheckedWelcome.current = true;

    const today = getTodayString();
    if (user && lastWelcomeShown !== today) {
      setShowWelcomeBack(true);
      setLastWelcomeShown(today);
    }
  }, [user, lastWelcomeShown, setLastWelcomeShown]);

  // Get current expression
  const currentExpression = filteredExpressions[currentIndex];

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, setCurrentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < filteredExpressions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, filteredExpressions.length, setCurrentIndex]);

  const handleRandom = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * filteredExpressions.length);
    setCurrentIndex(randomIndex);
  }, [filteredExpressions.length, setCurrentIndex]);

  const handleBackToDaily = useCallback(() => {
    // Find the daily expression in filtered list
    const dailyExpression = filteredExpressions.find(
      (_, idx) => idx === dailyIndex % filteredExpressions.length
    );
    if (dailyExpression) {
      setCurrentIndex(dailyIndex % filteredExpressions.length);
    } else {
      setCurrentIndex(0);
    }
  }, [dailyIndex, filteredExpressions, setCurrentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);

  // Handle marking as learned with celebration
  const handleMarkLearned = useCallback(() => {
    if (currentExpression) {
      markAsLearned(currentExpression.id);
      initializeCard(currentExpression.id); // Initialize SRS tracking
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 2000);
    }
  }, [currentExpression, markAsLearned, initializeCard]);

  const handleMarkUnlearned = useCallback(() => {
    if (currentExpression) {
      markAsUnlearned(currentExpression.id);
    }
  }, [currentExpression, markAsUnlearned]);

  if (!currentExpression) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-gray-600">No expressions found for this category.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header
        userName={user?.name}
        streak={streak.current}
        progress={progress}
        onProgressClick={() => setScreen('progress')}
        onSettingsClick={() => setScreen('settings')}
      />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Date and filter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">{getFormattedDate()}</p>
          <CategoryFilter value={selectedCategory} onChange={setCategory} />
        </div>

        {/* Expression card */}
        <div className="mb-6">
          <ExpressionCard
            expression={currentExpression}
            isLearned={isLearned(currentExpression.id)}
            onMarkLearned={handleMarkLearned}
            onMarkUnlearned={handleMarkUnlearned}
          />
        </div>

        {/* Navigation */}
        <Navigation
          currentIndex={currentIndex}
          totalExpressions={filteredExpressions.length}
          dailyIndex={dailyIndex % filteredExpressions.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onRandom={handleRandom}
          onBackToDaily={handleBackToDaily}
        />

        {/* Mode buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setScreen('quiz')}
            className="px-6 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-2"
          >
            <span className="text-xl">📝</span>
            <span className="font-medium text-gray-700">Quiz Mode</span>
          </button>
          <button
            onClick={() => setScreen('review')}
            className="px-6 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-2 relative"
          >
            <span className="text-xl">🔄</span>
            <span className="font-medium text-gray-700">Review</span>
            {dueCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-error text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {dueCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setScreen('daily-challenge')}
            className="px-6 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center gap-2 relative"
          >
            <span className="text-xl">⚡</span>
            <span className="font-medium text-gray-700">Daily Challenge</span>
            {todayCompleted && (
              <span className="absolute -top-2 -right-2 bg-success text-white text-xs font-bold px-2 py-0.5 rounded-full">
                ✓
              </span>
            )}
          </button>
        </div>

        {/* Achievements badges */}
        {unlockedAchievements.length > 0 && (
          <div className="flex justify-center gap-2 mt-4">
            {unlockedAchievements.map((a) => (
              <span
                key={a.id}
                title={`${a.title}: ${a.desc}`}
                className="text-2xl cursor-default"
              >
                {a.emoji}
              </span>
            ))}
          </div>
        )}

        {/* Review forecast */}
        {learnedIds.length > 0 && (
          <div className="flex justify-center gap-3 mt-4">
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                dueToday > 0
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-600'
              }`}
            >
              {dueToday} today
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-500">
              {dueTomorrow} tomorrow
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-500">
              {dueThisWeek} this week
            </span>
          </div>
        )}
      </main>

      {/* Congratulations overlay */}
      {showCongrats && (
        <div className="fixed inset-0 bg-celebration-bg/90 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="text-center">
            <img
              src="/congratulations.png"
              alt="Congratulations!"
              className="w-64 h-64 mx-auto object-contain mb-4"
            />
            <h2 className="text-3xl font-bold text-white mb-2">
              Great job{user?.name ? `, ${user.name}` : ''}!
            </h2>
            <p className="text-celebration-gold text-lg">
              Expression learned!
            </p>
          </div>
        </div>
      )}

      {/* Welcome back modal */}
      {showWelcomeBack && user && (
        <WelcomeBackModal
          userName={user.name}
          streak={streak.current}
          dueCount={dueCount}
          onClose={() => setShowWelcomeBack(false)}
        />
      )}

      {/* Achievement toast */}
      {newlyUnlocked && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 z-50 animate-in slide-in-from-bottom duration-300">
          <span className="text-3xl">{newlyUnlocked.emoji}</span>
          <div>
            <p className="font-bold text-gray-800">Achievement Unlocked!</p>
            <p className="text-sm text-gray-600">{newlyUnlocked.title}: {newlyUnlocked.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
