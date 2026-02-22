import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useSRS } from '../../hooks/useSRS';
import { expressions } from '../../data/expressions';
import { Card, Badge, categoryToVariant } from '../ui';
import type { Category } from '../../types';

const ALL_CATEGORIES: Category[] = ['Idioms', 'Business', 'Casual', 'Phrasal Verbs'];

interface SRSBucket {
  label: string;
  count: number;
  color: string;
}

export function ProgressScreen({ onBack }: { onBack: () => void }) {
  const { learnedIds, learnedDates, streak } = useApp();
  const { srsData } = useSRS(learnedIds);

  // SRS distribution
  const srsBuckets = useMemo<SRSBucket[]>(() => {
    let newCount = 0;
    let learningCount = 0;
    let youngCount = 0;
    let matureCount = 0;

    for (const id of learnedIds) {
      const data = srsData[id];
      if (!data || data.interval === 0) {
        newCount++;
      } else if (data.interval <= 5) {
        learningCount++;
      } else if (data.interval <= 20) {
        youngCount++;
      } else {
        matureCount++;
      }
    }

    return [
      { label: 'New', count: newCount, color: 'bg-gray-400' },
      { label: 'Learning', count: learningCount, color: 'bg-orange-400' },
      { label: 'Young', count: youngCount, color: 'bg-blue-400' },
      { label: 'Mature', count: matureCount, color: 'bg-green-500' },
    ];
  }, [learnedIds, srsData]);

  const maxBucket = Math.max(...srsBuckets.map((b) => b.count), 1);

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    return ALL_CATEGORIES.map((category) => {
      const total = expressions.filter((e) => e.category === category).length;
      const learned = expressions.filter(
        (e) => e.category === category && learnedIds.includes(e.id)
      ).length;
      return { category, learned, total };
    });
  }, [learnedIds]);

  // Learned dates stats
  const dateStats = useMemo(() => {
    const dates = Object.values(learnedDates);
    if (dates.length === 0) return null;

    const sorted = [...dates].sort();
    return {
      first: sorted[0],
      latest: sorted[sorted.length - 1],
    };
  }, [learnedDates]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Progress</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="text-center">
            <p className="text-3xl font-bold text-accent-primary">{learnedIds.length}</p>
            <p className="text-sm text-gray-600 mt-1">Total Learned</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-accent-primary">{streak.current}</p>
            <p className="text-sm text-gray-600 mt-1">Current Streak</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-accent-primary">{streak.longest}</p>
            <p className="text-sm text-gray-600 mt-1">Longest Streak</p>
          </Card>
          <Card className="text-center">
            <p className="text-3xl font-bold text-accent-primary">{expressions.length}</p>
            <p className="text-sm text-gray-600 mt-1">Total Expressions</p>
          </Card>
        </div>

        {/* Learned Dates */}
        {dateStats && (
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Timeline</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">First learned</span>
                <span className="font-medium text-gray-800">{formatDate(dateStats.first)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Most recently learned</span>
                <span className="font-medium text-gray-800">{formatDate(dateStats.latest)}</span>
              </div>
            </div>
          </Card>
        )}

        {/* SRS Distribution */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">SRS Distribution</h2>
          {learnedIds.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Learn some expressions to see your SRS distribution.
            </p>
          ) : (
            <div className="space-y-3">
              {srsBuckets.map((bucket) => (
                <div key={bucket.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{bucket.label}</span>
                    <span className="font-medium text-gray-800">{bucket.count}</span>
                  </div>
                  <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${bucket.color} rounded-full transition-all duration-500`}
                      style={{ width: `${(bucket.count / maxBucket) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-3 mt-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-400" /> New: not yet reviewed
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Learning: 1-5 days
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Young: 6-20 days
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Mature: 21+ days
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Category Breakdown */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
          <div className="space-y-4">
            {categoryBreakdown.map(({ category, learned, total }) => {
              const pct = total > 0 ? Math.round((learned / total) * 100) : 0;
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1.5">
                    <Badge variant={categoryToVariant(category)}>{category}</Badge>
                    <span className="text-sm font-medium text-gray-700">
                      {learned}/{total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-primary rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
}
