import { useState, useMemo } from 'react';
import { Card, Button } from '../ui';
import { ReviewCard } from '../srs';
import { useSRS } from '../../hooks/useSRS';
import { expressions } from '../../data/expressions';
import type { ReviewQuality } from '../../types';

interface ReviewScreenProps {
  learnedIds: string[];
  onBack: () => void;
}

export function ReviewScreen({ learnedIds, onBack }: ReviewScreenProps) {
  const { dueCards, reviewCard, getSrsData } = useSRS(learnedIds);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);

  // Get the due expressions
  const dueExpressions = useMemo(() => {
    return dueCards
      .map((id) => expressions.find((e) => e.id === id))
      .filter((e) => e !== undefined);
  }, [dueCards]);

  const currentExpression = dueExpressions[currentIndex];

  const handleReview = (quality: ReviewQuality) => {
    if (!currentExpression) return;

    // Update SRS data
    reviewCard(currentExpression.id, quality);
    setReviewedCount((prev) => prev + 1);

    // Move to next card or complete
    if (currentIndex < dueExpressions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setSessionComplete(true);
    }
  };

  // No cards to review
  if (dueExpressions.length === 0 && !sessionComplete) {
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
            <p className="text-5xl mb-4">🎉</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">All caught up!</h2>
            <p className="text-gray-600 mb-6">
              {learnedIds.length === 0
                ? "You haven't learned any expressions yet. Mark some as learned to start reviewing!"
                : "No expressions due for review right now. Check back later!"}
            </p>
            <Button onClick={onBack}>Back to Learning</Button>
          </Card>
        </div>
      </div>
    );
  }

  // Session complete
  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <p className="text-5xl mb-4">✨</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Complete!</h2>
            <p className="text-gray-600 mb-2">
              You reviewed {reviewedCount} expression{reviewedCount !== 1 ? 's' : ''}.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Your next review dates have been updated based on your performance.
            </p>
            <Button onClick={onBack}>Back to Home</Button>
          </Card>
        </div>
      </div>
    );
  }

  // Active review
  return (
    <div className="min-h-screen bg-cream py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to end this review session?')) {
                onBack();
              }
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            End Review
          </button>

          <span className="text-gray-600">
            {currentIndex + 1} / {dueExpressions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-accent-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex) / dueExpressions.length) * 100}%` }}
          />
        </div>

        {currentExpression && (
          <ReviewCard expression={currentExpression} onReview={handleReview} />
        )}

        {/* SRS info */}
        {currentExpression && (
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              Current interval: {getSrsData(currentExpression.id).interval} day(s)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
