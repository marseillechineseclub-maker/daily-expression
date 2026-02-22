import { ProgressBar } from '../ui';

interface HeaderProps {
  userName?: string;
  streak: number;
  progress: { learned: number; total: number };
  onSettingsClick?: () => void;
  onProgressClick?: () => void;
}

export function Header({ userName, streak, progress, onSettingsClick, onProgressClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          {/* Logo and greeting */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h1 className="text-xl font-bold text-gray-800">
              {userName ? `Hi ${userName}!` : 'Daily Expression'}
            </h1>
          </div>

          {/* Streak and settings */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-accent-light px-3 py-1 rounded-full">
              <span className="text-lg">🔥</span>
              <span className="font-semibold text-gray-700">{streak}</span>
              <span className="text-sm text-gray-600">day streak</span>
            </div>

            {onProgressClick && (
              <button
                onClick={onProgressClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Progress"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </button>
            )}

            {onSettingsClick && (
              <button
                onClick={onSettingsClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Settings"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <ProgressBar
          value={progress.learned}
          max={progress.total}
          label="Expressions learned"
        />
      </div>
    </header>
  );
}
