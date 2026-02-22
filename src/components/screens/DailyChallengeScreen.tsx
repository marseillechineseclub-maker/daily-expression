import { useState, useMemo, useEffect } from 'react';
import { Card, Button } from '../ui';
import { MultipleChoice, QuizProgress } from '../quiz';
import { generateQuiz, checkAnswer } from '../../services/quizGenerator';
import { expressions } from '../../data/expressions';
import { getDailyExpressionIndex, getTodayString } from '../../utils/date';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { QuizQuestion } from '../../types';

export interface DailyChallengeRecord {
  date: string;
  score: number;
  total: number;
}

interface DailyChallengeScreenProps {
  onBack: () => void;
}

export function DailyChallengeScreen({ onBack }: DailyChallengeScreenProps) {
  const [dailyChallenge, setDailyChallenge] = useLocalStorage<DailyChallengeRecord | null>(
    'daily-expression-daily-challenge',
    null
  );

  const today = getTodayString();
  const todayCompleted = dailyChallenge?.date === today;

  // Generate deterministic daily questions
  const questions = useMemo(() => {
    const dailyIdx = getDailyExpressionIndex(expressions.length);
    const challengeExpressions = [];
    for (let i = 0; i < 5; i++) {
      challengeExpressions.push(expressions[(dailyIdx + i) % expressions.length]);
    }
    return generateQuiz(challengeExpressions, {
      questionCount: 5,
      quizTypes: ['multiple-choice'],
      categories: 'All',
      includeOnlyLearned: false,
    });
  }, [today]);

  // Local quiz state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(questions);
  const [isComplete, setIsComplete] = useState(false);

  // Sync questions when they change (new day)
  useEffect(() => {
    setQuizQuestions(questions);
  }, [questions]);

  const currentQuestion = !isComplete ? quizQuestions[currentIndex] : null;

  const handleAnswer = (answer: string) => {
    const isCorrect = checkAnswer(quizQuestions[currentIndex], answer);

    const updated = [...quizQuestions];
    updated[currentIndex] = {
      ...updated[currentIndex],
      userAnswer: answer,
      isCorrect,
    };
    setQuizQuestions(updated);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    return isCorrect;
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= quizQuestions.length) {
      setIsComplete(true);
      const finalScore = score;
      setDailyChallenge({ date: today, score: finalScore, total: quizQuestions.length });
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  // Already completed today - show results
  if (todayCompleted && !currentQuestion && !isComplete) {
    return (
      <div className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          <Card className="text-center">
            <span className="text-5xl block mb-4">⚡</span>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Daily Challenge Complete!</h1>
            <p className="text-gray-600 mb-6">You already completed today's challenge.</p>

            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-accent-primary">{dailyChallenge.score}</p>
                <p className="text-sm text-gray-500">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-400">{dailyChallenge.total - dailyChallenge.score}</p>
                <p className="text-sm text-gray-500">Incorrect</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-success">
                  {Math.round((dailyChallenge.score / dailyChallenge.total) * 100)}%
                </p>
                <p className="text-sm text-gray-500">Score</p>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">Come back tomorrow for a new challenge!</p>
            <Button onClick={onBack} variant="secondary">Back to Home</Button>
          </Card>
        </div>
      </div>
    );
  }

  // Quiz complete - show results
  if (isComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <span className="text-5xl block mb-4">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : '💪'}
            </span>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Challenge Complete!</h1>
            <p className="text-gray-600 mb-6">
              {percentage >= 80 ? 'Outstanding work!' : percentage >= 60 ? 'Great effort!' : 'Keep practicing!'}
            </p>

            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-accent-primary">{score}</p>
                <p className="text-sm text-gray-500">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-gray-400">{quizQuestions.length - score}</p>
                <p className="text-sm text-gray-500">Incorrect</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-success">{percentage}%</p>
                <p className="text-sm text-gray-500">Score</p>
              </div>
            </div>

            <Button onClick={onBack}>Back to Home</Button>
          </Card>
        </div>
      </div>
    );
  }

  // Active quiz
  if (currentQuestion) {
    return (
      <div className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to quit the daily challenge?')) {
                onBack();
              }
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Quit Challenge
          </button>

          <div className="text-center mb-4">
            <span className="text-sm font-medium text-accent-secondary">Daily Challenge</span>
          </div>

          <QuizProgress
            current={currentIndex}
            total={quizQuestions.length}
            score={score}
          />

          <MultipleChoice
            question={currentQuestion}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        </div>
      </div>
    );
  }

  return null;
}
