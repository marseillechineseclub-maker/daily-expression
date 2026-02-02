interface QuizProgressProps {
  current: number;
  total: number;
  score: number;
}

export function QuizProgress({ current, total, score }: QuizProgressProps) {
  const progress = ((current) / total) * 100;

  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Question {current + 1} of {total}</span>
        <span>Score: {score}/{current}</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-primary rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
