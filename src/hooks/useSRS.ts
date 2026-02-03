import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { SRSData, ReviewQuality } from '../types';
import { initializeSRS, calculateNextReview, isDue } from '../services/srsAlgorithm';

export function useSRS(learnedIds: string[]) {
  const [srsData, setSrsData] = useLocalStorage<Record<string, SRSData>>(
    'daily-expression-srs',
    {}
  );

  // Get or initialize SRS data for an expression
  const getSrsData = useCallback(
    (expressionId: string): SRSData => {
      return srsData[expressionId] || initializeSRS(expressionId);
    },
    [srsData]
  );

  // Initialize SRS data when expression is marked as learned
  const initializeCard = useCallback(
    (expressionId: string) => {
      if (!srsData[expressionId]) {
        setSrsData((prev) => ({
          ...prev,
          [expressionId]: initializeSRS(expressionId),
        }));
      }
    },
    [srsData, setSrsData]
  );

  // Review a card with given quality
  const reviewCard = useCallback(
    (expressionId: string, quality: ReviewQuality) => {
      const current = getSrsData(expressionId);
      const updated = calculateNextReview(current, quality);

      setSrsData((prev) => ({
        ...prev,
        [expressionId]: updated,
      }));

      return updated;
    },
    [getSrsData, setSrsData]
  );

  // Get all due cards (only learned expressions)
  const dueCards = useMemo(() => {
    return learnedIds.filter((id) => {
      const data = getSrsData(id);
      return isDue(data);
    });
  }, [learnedIds, getSrsData]);

  // Get due count
  const getDueCount = useCallback(() => {
    return dueCards.length;
  }, [dueCards]);

  // Get next review date for an expression
  const getNextReviewDate = useCallback(
    (expressionId: string): string | null => {
      const data = srsData[expressionId];
      return data?.nextReviewDate || null;
    },
    [srsData]
  );

  // Check if expression is due
  const isExpressionDue = useCallback(
    (expressionId: string): boolean => {
      if (!learnedIds.includes(expressionId)) return false;
      const data = getSrsData(expressionId);
      return isDue(data);
    },
    [learnedIds, getSrsData]
  );

  return {
    srsData,
    getSrsData,
    initializeCard,
    reviewCard,
    dueCards,
    getDueCount,
    getNextReviewDate,
    isExpressionDue,
  };
}
