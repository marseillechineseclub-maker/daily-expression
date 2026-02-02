interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
}

export function ProgressBar({
  value,
  max,
  label,
  showPercentage = true,
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          {label && <span>{label}</span>}
          {showPercentage && (
            <span>
              {value}/{max} ({percentage}%)
            </span>
          )}
        </div>
      )}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
