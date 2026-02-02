import type { Category } from './expression';

export type QuizType = 'multiple-choice' | 'fill-in-blank';

export interface QuizQuestion {
  id: string;
  type: QuizType;
  expressionId: string;
  question: string;
  correctAnswer: string;
  options?: string[];           // For multiple choice
  blankedSentence?: string;     // For fill-in-blank
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface QuizSession {
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  isComplete: boolean;
  startedAt: string;
  completedAt: string | null;
}

export interface QuizSettings {
  questionCount: number;
  quizTypes: QuizType[];
  categories: Category[] | 'All';
  includeOnlyLearned: boolean;
}
