import { useState } from 'react';
import { Card, Badge, categoryToVariant } from '../ui';
import type { Expression, ReviewQuality } from '../../types';

interface ReviewCardProps {
  expression: Expression;
  onReview: (quality: ReviewQuality) => void;
}

export function ReviewCard({ expression, onReview }: ReviewCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const qualityButtons: { quality: ReviewQuality; label: string; color: string }[] = [
    { quality: 'again', label: 'Again', color: 'bg-error hover:bg-error/90' },
    { quality: 'hard', label: 'Hard', color: 'bg-orange-500 hover:bg-orange-600' },
    { quality: 'good', label: 'Good', color: 'bg-accent-primary hover:bg-accent-secondary' },
    { quality: 'easy', label: 'Easy', color: 'bg-success hover:bg-success/90' },
  ];

  const handleReview = (quality: ReviewQuality) => {
    setIsFlipped(false);
    onReview(quality);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      {/* Category badge */}
      <div className="flex justify-between items-start mb-4">
        <Badge variant={categoryToVariant(expression.category)}>
          {expression.category}
        </Badge>
        <span className="text-sm text-gray-500">
          {isFlipped ? 'Answer' : 'Expression'}
        </span>
      </div>

      {/* Flashcard content */}
      <div
        className={`
          min-h-[200px] flex flex-col justify-center transition-all duration-300
          ${isFlipped ? '' : 'cursor-pointer'}
        `}
        onClick={() => !isFlipped && setIsFlipped(true)}
      >
        {!isFlipped ? (
          // Front: Show expression
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              "{expression.expression}"
            </h2>
            <p className="text-gray-500">Tap to reveal meaning</p>
          </div>
        ) : (
          // Back: Show meaning and examples
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              "{expression.expression}"
            </h2>

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Meaning
              </h3>
              <p className="text-lg text-gray-700">{expression.meaning}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Example
              </h3>
              <p className="text-gray-600 italic">"{expression.examples[0]}"</p>
            </div>
          </div>
        )}
      </div>

      {/* Review buttons (only show when flipped) */}
      {isFlipped && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 text-center mb-3">
            How well did you remember?
          </p>
          <div className="flex gap-2">
            {qualityButtons.map((btn) => (
              <button
                key={btn.quality}
                onClick={() => handleReview(btn.quality)}
                className={`
                  flex-1 py-3 rounded-xl text-white font-medium transition-colors
                  ${btn.color}
                `}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
