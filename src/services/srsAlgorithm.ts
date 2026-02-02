import type { SRSData, ReviewQuality } from '../types';
import { addDays, getTodayString } from '../utils/date';

// SM-2 Algorithm constants
const INITIAL_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

// Map our 4-level quality to SM-2's 0-5 scale
const qualityScore: Record<ReviewQuality, number> = {
  again: 0,  // Complete blackout
  hard: 2,   // Correct but with difficulty
  good: 3,   // Correct with hesitation
  easy: 5,   // Perfect recall
};

/**
 * Initialize SRS data for a new expression
 */
export function initializeSRS(expressionId: string): SRSData {
  return {
    expressionId,
    easeFactor: INITIAL_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    nextReviewDate: getTodayString(),
    lastReviewDate: null,
  };
}

/**
 * Calculate next review based on SM-2 algorithm
 *
 * SM-2 Formula for ease factor:
 * EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
 *
 * Where:
 * - EF = current ease factor
 * - q = quality of response (0-5)
 */
export function calculateNextReview(
  currentData: SRSData,
  quality: ReviewQuality
): SRSData {
  const q = qualityScore[quality];
  let { easeFactor, interval, repetitions } = currentData;

  // If quality < 2 (wrong answer), reset the card
  if (q < 2) {
    repetitions = 0;
    interval = 1; // Review again tomorrow
  } else {
    // Correct answer - calculate new interval
    if (repetitions === 0) {
      interval = 1; // First successful review: 1 day
    } else if (repetitions === 1) {
      interval = 6; // Second successful review: 6 days
    } else {
      // Subsequent reviews: multiply by ease factor
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor (minimum 1.3)
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const efChange = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
  easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor + efChange);

  // Calculate next review date
  const nextReviewDate = addDays(new Date(), interval).toISOString().split('T')[0];

  return {
    ...currentData,
    easeFactor: Math.round(easeFactor * 100) / 100, // Round to 2 decimal places
    interval,
    repetitions,
    nextReviewDate,
    lastReviewDate: getTodayString(),
  };
}

/**
 * Check if an SRS card is due for review
 */
export function isDue(srsData: SRSData): boolean {
  const today = getTodayString();
  return srsData.nextReviewDate <= today;
}

/**
 * Get days until next review
 */
export function getDaysUntilReview(srsData: SRSData): number {
  const today = new Date(getTodayString());
  const reviewDate = new Date(srsData.nextReviewDate);
  const diff = reviewDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
