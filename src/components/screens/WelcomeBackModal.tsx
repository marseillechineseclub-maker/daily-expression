import { Button, Card } from '../ui';

interface WelcomeBackModalProps {
  userName: string;
  streak: number;
  dueCount: number;
  onClose: () => void;
}

export function WelcomeBackModal({
  userName,
  streak,
  dueCount,
  onClose,
}: WelcomeBackModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full text-center animate-in fade-in zoom-in-95 duration-300">
        <p className="text-5xl mb-4">👋</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, {userName}!
        </h2>
        <p className="text-gray-600 mb-6">
          Great to see you again. Ready to learn something new today?
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6">
          {streak > 0 && (
            <div className="text-center">
              <p className="text-3xl font-bold text-accent-primary flex items-center justify-center gap-1">
                🔥 {streak}
              </p>
              <p className="text-sm text-gray-500">Day streak</p>
            </div>
          )}
          {dueCount > 0 && (
            <div className="text-center">
              <p className="text-3xl font-bold text-error">{dueCount}</p>
              <p className="text-sm text-gray-500">Due for review</p>
            </div>
          )}
        </div>

        <Button onClick={onClose} size="lg" className="w-full">
          Let's Go!
        </Button>
      </Card>
    </div>
  );
}
