// SM-2 Spaced Repetition Algorithm types

export interface SRSData {
  expressionId: string;
  easeFactor: number;        // Starts at 2.5, min 1.3
  interval: number;          // Days until next review
  repetitions: number;       // Successful reviews in a row
  nextReviewDate: string;    // ISO date string
  lastReviewDate: string | null;
}

// Quality of recall response
export type ReviewQuality = 'again' | 'hard' | 'good' | 'easy';

export interface ReviewSession {
  sessionId: string;
  startedAt: string;
  completedAt: string | null;
  cardsReviewed: number;
  correctCount: number;
}
