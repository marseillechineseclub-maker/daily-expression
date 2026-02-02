import { useState } from 'react';
import type { QuizQuestion } from '../../types';
import { Button, Card } from '../ui';

interface MultipleChoiceProps {
  question: QuizQuestion;
  onAnswer: (answer: string) => boolean | undefined;
  onNext: () => void;
}

export function MultipleChoice({ question, onAnswer, onNext }: MultipleChoiceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (answer: string) => {
    if (hasAnswered) return;

    setSelectedAnswer(answer);
    const correct = onAnswer(answer);
    setIsCorrect(correct ?? false);
    setHasAnswered(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setIsCorrect(null);
    onNext();
  };

  const getOptionStyles = (option: string) => {
    if (!hasAnswered) {
      return selectedAnswer === option
        ? 'border-accent-primary bg-accent-light'
        : 'border-gray-200 hover:border-accent-primary/50 hover:bg-gray-50';
    }

    if (option === question.correctAnswer) {
      return 'border-success bg-green-50';
    }

    if (option === selectedAnswer && !isCorrect) {
      return 'border-error bg-red-50';
    }

    return 'border-gray-200 opacity-50';
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h2>

      <div className="space-y-3 mb-6">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={hasAnswered}
            className={`
              w-full p-4 text-left rounded-xl border-2 transition-all
              ${getOptionStyles(option)}
              ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}
            `}
          >
            <span className="text-gray-700">{option}</span>
            {hasAnswered && option === question.correctAnswer && (
              <span className="ml-2 text-success">✓</span>
            )}
            {hasAnswered && option === selectedAnswer && !isCorrect && (
              <span className="ml-2 text-error">✗</span>
            )}
          </button>
        ))}
      </div>

      {hasAnswered && (
        <div className="text-center">
          <p className={`text-lg font-medium mb-4 ${isCorrect ? 'text-success' : 'text-error'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </p>
          <Button onClick={handleNext}>Next Question</Button>
        </div>
      )}
    </Card>
  );
}
