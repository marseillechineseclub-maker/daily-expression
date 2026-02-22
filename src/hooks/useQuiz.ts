import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { QuizSession, QuizSettings, QuizQuestion, Expression } from '../types';
import { generateQuiz, checkAnswer } from '../services/quizGenerator';

const DEFAULT_SETTINGS: QuizSettings = {
  questionCount: 10,
  quizTypes: ['multiple-choice', 'fill-in-blank'],
  categories: 'All',
  includeOnlyLearned: false,
};

export interface QuizHistoryEntry {
  date: string;
  score: number;
  total: number;
  percentage: number;
}

export function useQuiz(expressions: Expression[], learnedIds: string[] = []) {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [settings, setSettings] = useState<QuizSettings>(DEFAULT_SETTINGS);
  const [quizHistory, setQuizHistory] = useLocalStorage<QuizHistoryEntry[]>(
    'daily-expression-quiz-history',
    []
  );

  const startQuiz = useCallback(
    (customSettings?: Partial<QuizSettings>) => {
      const mergedSettings = { ...settings, ...customSettings };
      setSettings(mergedSettings);

      // Filter to only learned expressions if the toggle is on
      const pool = mergedSettings.includeOnlyLearned
        ? expressions.filter((e) => learnedIds.includes(e.id))
        : expressions;

      const questions = generateQuiz(pool, mergedSettings);

      setSession({
        questions,
        currentIndex: 0,
        score: 0,
        isComplete: false,
        startedAt: new Date().toISOString(),
        completedAt: null,
      });
    },
    [expressions, learnedIds, settings]
  );

  const submitAnswer = useCallback((answer: string) => {
    if (!session || session.isComplete) return;

    const currentQuestion = session.questions[session.currentIndex];
    const isCorrect = checkAnswer(currentQuestion, answer);

    // Update the question with user's answer
    const updatedQuestions = [...session.questions];
    updatedQuestions[session.currentIndex] = {
      ...currentQuestion,
      userAnswer: answer,
      isCorrect,
    };

    setSession((prev) =>
      prev
        ? {
            ...prev,
            questions: updatedQuestions,
            score: prev.score + (isCorrect ? 1 : 0),
          }
        : null
    );

    return isCorrect;
  }, [session]);

  const nextQuestion = useCallback(() => {
    if (!session) return;

    const nextIndex = session.currentIndex + 1;
    const isComplete = nextIndex >= session.questions.length;

    if (isComplete) {
      // Save to quiz history
      const score = session.score;
      const total = session.questions.length;
      const entry: QuizHistoryEntry = {
        date: new Date().toISOString(),
        score,
        total,
        percentage: Math.round((score / total) * 100),
      };
      setQuizHistory((prev) => [...prev, entry].slice(-10));
    }

    setSession((prev) =>
      prev
        ? {
            ...prev,
            currentIndex: nextIndex,
            isComplete,
            completedAt: isComplete ? new Date().toISOString() : null,
          }
        : null
    );
  }, [session, setQuizHistory]);

  const endQuiz = useCallback(() => {
    setSession(null);
  }, []);

  const getCurrentQuestion = useCallback((): QuizQuestion | null => {
    if (!session || session.isComplete) return null;
    return session.questions[session.currentIndex];
  }, [session]);

  const getResults = useCallback(() => {
    if (!session) return null;

    return {
      totalQuestions: session.questions.length,
      correctAnswers: session.score,
      percentage: Math.round((session.score / session.questions.length) * 100),
      questions: session.questions,
    };
  }, [session]);

  return {
    session,
    settings,
    setSettings,
    startQuiz,
    submitAnswer,
    nextQuestion,
    endQuiz,
    getCurrentQuestion,
    getResults,
    quizHistory,
  };
}
