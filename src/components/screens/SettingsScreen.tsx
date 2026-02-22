import { useState } from 'react';
import { useApp, type UserPreferences } from '../../context/AppContext';
import { Button, Card, Select } from '../ui';
import type { Category, QuizType } from '../../types';

const CATEGORIES: (Category | 'All')[] = ['All', 'Idioms', 'Business', 'Casual', 'Phrasal Verbs'];

const QUIZ_COUNT_OPTIONS = [
  { value: '5', label: '5 questions' },
  { value: '10', label: '10 questions' },
  { value: '15', label: '15 questions' },
  { value: '20', label: '20 questions' },
];

const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c, label: c }));

const QUIZ_TYPE_LABELS: Record<QuizType, string> = {
  'multiple-choice': 'Multiple Choice',
  'fill-in-blank': 'Fill in the Blank',
};

const APP_STORAGE_KEYS = [
  'daily-expression-user',
  'daily-expression-streak',
  'daily-expression-learned',
  'daily-expression-learned-dates',
  'daily-expression-category',
  'daily-expression-preferences',
  'daily-expression-srs',
  'daily-expression-last-welcome',
];

export function SettingsScreen({ onBack }: { onBack: () => void }) {
  const { preferences, setPreferences } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const updatePreference = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const toggleQuizType = (type: QuizType) => {
    const current = preferences.defaultQuizTypes;
    if (current.includes(type)) {
      if (current.length > 1) {
        updatePreference('defaultQuizTypes', current.filter((t) => t !== type));
      }
    } else {
      updatePreference('defaultQuizTypes', [...current, type]);
    }
  };

  const handleResetAllData = () => {
    APP_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Settings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Daily Goal */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Learning</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-700">Daily Goal</p>
              <p className="text-sm text-gray-500">New expressions to learn per day</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updatePreference('dailyGoal', Math.max(1, preferences.dailyGoal - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
                disabled={preferences.dailyGoal <= 1}
              >
                -
              </button>
              <span className="w-8 text-center font-semibold text-gray-800">
                {preferences.dailyGoal}
              </span>
              <button
                onClick={() => updatePreference('dailyGoal', Math.min(10, preferences.dailyGoal + 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
                disabled={preferences.dailyGoal >= 10}
              >
                +
              </button>
            </div>
          </div>
        </Card>

        {/* Quiz Defaults */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quiz Defaults</h2>
          <div className="space-y-5">
            {/* Question count */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Questions per Quiz</p>
                <p className="text-sm text-gray-500">Default number of quiz questions</p>
              </div>
              <Select
                options={QUIZ_COUNT_OPTIONS}
                value={String(preferences.defaultQuizCount)}
                onChange={(v) => updatePreference('defaultQuizCount', Number(v))}
              />
            </div>

            {/* Default category */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Quiz Category</p>
                <p className="text-sm text-gray-500">Default category filter for quizzes</p>
              </div>
              <Select
                options={CATEGORY_OPTIONS}
                value={preferences.defaultQuizCategory}
                onChange={(v) => updatePreference('defaultQuizCategory', v as Category | 'All')}
              />
            </div>

            {/* Quiz types */}
            <div>
              <p className="font-medium text-gray-700 mb-1">Question Types</p>
              <p className="text-sm text-gray-500 mb-3">Select at least one type</p>
              <div className="flex flex-col gap-2">
                {(Object.keys(QUIZ_TYPE_LABELS) as QuizType[]).map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={preferences.defaultQuizTypes.includes(type)}
                      onChange={() => toggleQuizType(type)}
                      className="w-4 h-4 rounded border-gray-300 text-accent-primary focus:ring-accent-primary"
                    />
                    <span className="text-gray-700">{QUIZ_TYPE_LABELS[type]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card>
          <h2 className="text-lg font-semibold text-error mb-4">Danger Zone</h2>
          {!showResetConfirm ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Reset All Data</p>
                <p className="text-sm text-gray-500">
                  Delete all progress, preferences, and SRS data
                </p>
              </div>
              <Button variant="danger" size="sm" onClick={() => setShowResetConfirm(true)}>
                Reset
              </Button>
            </div>
          ) : (
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-red-800 font-medium mb-3">
                Are you sure? This action cannot be undone.
              </p>
              <p className="text-red-600 text-sm mb-4">
                All your learned expressions, streak data, SRS progress, and preferences will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <Button variant="danger" size="sm" onClick={handleResetAllData}>
                  Yes, delete everything
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowResetConfirm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
