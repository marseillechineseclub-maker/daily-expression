import { useState, useCallback } from 'react';
import type { QuizSession, QuizSettings, QuizQuestion, Expression } from '../types';
import { generateQuiz, checkAnswer } from '../services/quizGenerator';

const DEFAULT_SETTINGS: QuizSettings = {
  questionCount: 10,
  quizTypes: ['multiple-choice', 'fill-in-blank'],
  categories: 'All',
  includeOnlyLearned: false,
};

export function useQuiz(expressions: Expression[]) {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [settings, setSettings] = useState<QuizSettings>(DEFAULT_SETTINGS);

  const startQuiz = useCallback(
    (customSettings?: Partial<QuizSettings>) => {
      const mergedSettings = { ...settings, ...customSettings };
      setSettings(mergedSettings);

      const questions = generateQuiz(expressions, mergedSettings);

      setSession({
        questions,
        currentIndex: 0,
        score: 0,
        isComplete: false,
        startedAt: new Date().toISOString(),
        completedAt: null,
      });
    },
    [expressions, settings]
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
  }, [session]);

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
  };
}
