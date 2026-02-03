import { Card, Badge, categoryToVariant, Button } from '../ui';
import type { Expression } from '../../types';

interface ExpressionCardProps {
  expression: Expression;
  isLearned: boolean;
  onMarkLearned: () => void;
  onMarkUnlearned: () => void;
}

export function ExpressionCard({
  expression,
  isLearned,
  onMarkLearned,
  onMarkUnlearned,
}: ExpressionCardProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      {/* Header with category badge */}
      <div className="flex items-start justify-between mb-4">
        <Badge variant={categoryToVariant(expression.category)}>
          {expression.category}
        </Badge>
        {isLearned && (
          <span className="text-success text-sm font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Learned
          </span>
        )}
      </div>

      {/* Expression */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        "{expression.expression}"
      </h2>

      {/* Meaning */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Meaning
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">{expression.meaning}</p>
      </div>

      {/* Examples */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Examples
        </h3>
        <ul className="space-y-2">
          {expression.examples.map((example, index) => (
            <li
              key={index}
              className="text-gray-600 pl-4 border-l-2 border-accent-light"
            >
              {example}
            </li>
          ))}
        </ul>
      </div>

      {/* Action button */}
      <div className="flex justify-center pt-4 border-t border-gray-100">
        {isLearned ? (
          <Button variant="secondary" onClick={onMarkUnlearned}>
            Mark for Review
          </Button>
        ) : (
          <Button variant="success" onClick={onMarkLearned}>
            I've Learned This!
          </Button>
        )}
      </div>
    </Card>
  );
}
