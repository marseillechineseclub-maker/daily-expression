import { useState } from 'react';
import { Button, Card } from '../ui';
import type { UserData } from '../../types';
import { getTodayString } from '../../utils/date';

interface WelcomeScreenProps {
  onComplete: (user: UserData) => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({
        name: name.trim(),
        createdAt: getTodayString(),
        lastVisitDate: getTodayString(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <div className="mb-6">
          <img
            src="/welcome.png"
            alt="Welcome to Daily Expression"
            className="w-48 h-48 mx-auto object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to Daily Expression!
        </h1>

        <p className="text-gray-600 mb-8">
          Learn one new English expression every day. Build your vocabulary with
          idioms, business phrases, and casual expressions.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2 text-left"
            >
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary"
              autoFocus
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={!name.trim()}>
            Start Learning
          </Button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          Your progress will be saved locally on this device.
        </p>
      </Card>
    </div>
  );
}
