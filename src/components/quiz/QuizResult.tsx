import { Card, Button } from '../ui';
import type { QuizQuestion } from '../../types';
import { expressions } from '../../data/expressions';

interface QuizResultProps {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  questions: QuizQuestion[];
  onRetry: () => void;
  onBack: () => void;
}

export function QuizResult({
  totalQuestions,
  correctAnswers,
  percentage,
  questions,
  onRetry,
  onBack,
}: QuizResultProps) {
  const getEmoji = () => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 70) return '🎉';
    if (percentage >= 50) return '👍';
    return '💪';
  };

  const getMessage = () => {
    if (percentage >= 90) return 'Excellent! You\'re a master!';
    if (percentage >= 70) return 'Great job! Keep it up!';
    if (percentage >= 50) return 'Good effort! Room to improve.';
    return 'Keep practicing! You\'ll get there.';
  };

  // Get incorrect questions for review
  const incorrectQuestions = questions.filter((q) => !q.isCorrect);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Score card */}
      <Card className="text-center mb-6">
        <p className="text-6xl mb-4">{getEmoji()}</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
        <p className="text-gray-600 mb-4">{getMessage()}</p>

        <div className="flex justify-center gap-8 mb-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-accent-primary">{correctAnswers}</p>
            <p className="text-sm text-gray-500">Correct</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-400">{totalQuestions - correctAnswers}</p>
            <p className="text-sm text-gray-500">Incorrect</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-success">{percentage}%</p>
            <p className="text-sm text-gray-500">Score</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={onRetry}>Try Again</Button>
          <Button variant="secondary" onClick={onBack}>Back to Home</Button>
        </div>
      </Card>

      {/* Incorrect answers review */}
      {incorrectQuestions.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Incorrect Answers</h3>
          <div className="space-y-4">
            {incorrectQuestions.map((q) => {
              const expr = expressions.find((e) => e.id === q.expressionId);
              return (
                <div key={q.id} className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <p className="font-medium text-gray-800 mb-1">
                    {expr?.expression || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">{expr?.meaning}</p>
                  <div className="text-sm">
                    <span className="text-error">Your answer: </span>
                    <span className="text-gray-700">{q.userAnswer || '(no answer)'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
