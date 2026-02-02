interface NavigationProps {
  currentIndex: number;
  totalExpressions: number;
  dailyIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onRandom: () => void;
  onBackToDaily: () => void;
}

export function Navigation({
  currentIndex,
  totalExpressions,
  dailyIndex,
  onPrevious,
  onNext,
  onRandom,
  onBackToDaily,
}: NavigationProps) {
  const isAtDaily = currentIndex === dailyIndex;

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="p-2 rounded-lg hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous expression"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <span className="text-sm text-gray-600 px-2">
        {currentIndex + 1} / {totalExpressions}
      </span>

      <button
        onClick={onNext}
        disabled={currentIndex === totalExpressions - 1}
        className="p-2 rounded-lg hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next expression"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="flex gap-2 ml-4">
        <button
          onClick={onRandom}
          className="px-3 py-1.5 text-sm bg-accent-light hover:bg-accent-secondary/30 rounded-lg transition-colors"
        >
          🎲 Random
        </button>

        {!isAtDaily && (
          <button
            onClick={onBackToDaily}
            className="px-3 py-1.5 text-sm bg-accent-primary text-white hover:bg-accent-secondary rounded-lg transition-colors"
          >
            📅 Today
          </button>
        )}
      </div>
    </div>
  );
}
