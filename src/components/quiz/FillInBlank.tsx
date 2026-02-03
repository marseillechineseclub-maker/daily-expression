import { useState } from 'react';
import type { QuizQuestion } from '../../types';
import { Button, Card } from '../ui';

interface FillInBlankProps {
  question: QuizQuestion;
  onAnswer: (answer: string) => boolean | undefined;
  onNext: () => void;
}

export function FillInBlank({ question, onAnswer, onNext }: FillInBlankProps) {
  const [userInput, setUserInput] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasAnswered || !userInput.trim()) return;

    const correct = onAnswer(userInput.trim());
    setIsCorrect(correct ?? false);
    setHasAnswered(true);
  };

  const handleNext = () => {
    setUserInput('');
    setHasAnswered(false);
    setIsCorrect(null);
    onNext();
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{question.question}</h2>

      {/* Sentence with blank */}
      <p className="text-lg text-gray-700 mb-6 p-4 bg-gray-50 rounded-xl">
        {question.blankedSentence}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={hasAnswered}
            placeholder="Type your answer..."
            className={`
              w-full px-4 py-3 rounded-xl border-2 transition-colors
              focus:outline-none focus:ring-2 focus:ring-accent-primary/50
              ${hasAnswered
                ? isCorrect
                  ? 'border-success bg-green-50'
                  : 'border-error bg-red-50'
                : 'border-gray-200'
              }
            `}
            autoFocus
          />
        </div>

        {!hasAnswered && (
          <Button type="submit" className="w-full" disabled={!userInput.trim()}>
            Check Answer
          </Button>
        )}
      </form>

      {hasAnswered && (
        <div className="mt-4 text-center">
          <p className={`text-lg font-medium mb-2 ${isCorrect ? 'text-success' : 'text-error'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          {!isCorrect && (
            <p className="text-gray-600 mb-4">
              The correct answer was: <strong>"{question.correctAnswer}"</strong>
            </p>
          )}
          <Button onClick={handleNext}>Next Question</Button>
        </div>
      )}
    </Card>
  );
}
