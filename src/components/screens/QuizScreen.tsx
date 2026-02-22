import { useState, useRef, useEffect } from 'react';
import { Button, Card, Select } from '../ui';
import { MultipleChoice, FillInBlank, QuizProgress, QuizResult } from '../quiz';
import { useQuiz } from '../../hooks/useQuiz';
import { useSRS } from '../../hooks/useSRS';
import { useApp } from '../../context/AppContext';
import { expressions, categories } from '../../data/expressions';
import type { QuizType, Category } from '../../types';

interface QuizScreenProps {
  onBack: () => void;
}

export function QuizScreen({ onBack }: QuizScreenProps) {
  const { learnedIds } = useApp();
  const {
    session,
    settings,
    startQuiz,
    submitAnswer,
    nextQuestion,
    endQuiz,
    getCurrentQuestion,
    getResults,
    quizHistory,
  } = useQuiz(expressions, learnedIds);

  const { reviewCard } = useSRS(learnedIds);

  const [questionCount, setQuestionCount] = useState(settings.questionCount.toString());
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedTypes, setSelectedTypes] = useState<QuizType[]>(['multiple-choice', 'fill-in-blank']);
  const [onlyLearned, setOnlyLearned] = useState(false);
  const [srsUpdatedCount, setSrsUpdatedCount] = useState(0);

  const hasProcessedResults = useRef(false);

  const currentQuestion = getCurrentQuestion();
  const results = getResults();

  // Process SRS updates when quiz completes
  useEffect(() => {
    if (session?.isComplete && !hasProcessedResults.current) {
      hasProcessedResults.current = true;
      let count = 0;
      session.questions.forEach((q) => {
        if (learnedIds.includes(q.expressionId)) {
          reviewCard(q.expressionId, q.isCorrect ? 'good' : 'again');
          count++;
        }
      });
      setSrsUpdatedCount(count);
    }
    if (!session) {
      hasProcessedResults.current = false;
      setSrsUpdatedCount(0);
    }
  }, [session, learnedIds, reviewCard]);

  const handleStart = () => {
    startQuiz({
      questionCount: parseInt(questionCount, 10),
      categories: selectedCategory === 'All' ? 'All' : [selectedCategory],
      quizTypes: selectedTypes,
      includeOnlyLearned: onlyLearned,
    });
  };

  const handleTypeToggle = (type: QuizType) => {
    if (selectedTypes.includes(type)) {
      if (selectedTypes.length > 1) {
        setSelectedTypes(selectedTypes.filter((t) => t !== type));
      }
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Quiz setup screen
  if (!session) {
    return (
      <div className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          <Card>
            <div className="text-center mb-6">
              <span className="text-5xl">📝</span>
              <h1 className="text-2xl font-bold text-gray-800 mt-4">Quiz Mode</h1>
              <p className="text-gray-600 mt-2">Test your knowledge of expressions!</p>
            </div>

            {/* Question count */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of questions
              </label>
              <Select
                options={[
                  { value: '5', label: '5 questions' },
                  { value: '10', label: '10 questions' },
                  { value: '15', label: '15 questions' },
                  { value: '20', label: '20 questions' },
                ]}
                value={questionCount}
                onChange={setQuestionCount}
                className="w-full"
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select
                options={categories.map((cat) => ({ value: cat, label: cat }))}
                value={selectedCategory}
                onChange={(v) => setSelectedCategory(v as Category | 'All')}
                className="w-full"
              />
            </div>

            {/* Only Learned toggle */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Only Learned Expressions
              </label>
              <button
                onClick={() => setOnlyLearned(!onlyLearned)}
                className={`w-full p-3 rounded-xl border-2 transition-colors ${
                  onlyLearned
                    ? 'border-accent-primary bg-accent-light'
                    : 'border-gray-200'
                }`}
              >
                <span className="block text-sm font-medium">
                  {onlyLearned ? 'On — Quiz only learned expressions' : 'Off — Quiz all expressions'}
                </span>
              </button>
              {onlyLearned && learnedIds.length === 0 && (
                <p className="mt-2 text-sm text-amber-600">No expressions learned yet</p>
              )}
            </div>

            {/* Question types */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question types
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleTypeToggle('multiple-choice')}
                  className={`flex-1 p-3 rounded-xl border-2 transition-colors ${
                    selectedTypes.includes('multiple-choice')
                      ? 'border-accent-primary bg-accent-light'
                      : 'border-gray-200'
                  }`}
                >
                  <span className="block text-sm font-medium">Multiple Choice</span>
                </button>
                <button
                  onClick={() => handleTypeToggle('fill-in-blank')}
                  className={`flex-1 p-3 rounded-xl border-2 transition-colors ${
                    selectedTypes.includes('fill-in-blank')
                      ? 'border-accent-primary bg-accent-light'
                      : 'border-gray-200'
                  }`}
                >
                  <span className="block text-sm font-medium">Fill in Blank</span>
                </button>
              </div>
            </div>

            <Button onClick={handleStart} size="lg" className="w-full">
              Start Quiz
            </Button>
          </Card>

          {/* Recent Scores */}
          {quizHistory.length > 0 && (
            <Card className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Scores</h3>
              <div className="space-y-2">
                {quizHistory.slice(-3).reverse().map((entry, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm"
                  >
                    <span className="text-gray-500">{formatDate(entry.date)}</span>
                    <span className="font-medium text-gray-800">
                      {entry.score}/{entry.total} ({entry.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // Quiz results screen
  if (session.isComplete && results) {
    return (
      <div className="min-h-screen bg-cream py-8 px-4">
        <QuizResult
          totalQuestions={results.totalQuestions}
          correctAnswers={results.correctAnswers}
          percentage={results.percentage}
          questions={results.questions}
          onRetry={() => {
            endQuiz();
            handleStart();
          }}
          onBack={() => {
            endQuiz();
            onBack();
          }}
        />
        {srsUpdatedCount > 0 && (
          <div className="max-w-2xl mx-auto mt-4">
            <p className="text-center text-sm text-green-700 bg-green-50 rounded-xl p-3">
              Updated {srsUpdatedCount} SRS intervals based on your performance
            </p>
          </div>
        )}
      </div>
    );
  }

  // Active quiz screen
  if (currentQuestion) {
    return (
      <div className="min-h-screen bg-cream py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to quit the quiz?')) {
                endQuiz();
                onBack();
              }
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Quit Quiz
          </button>

          <QuizProgress
            current={session.currentIndex}
            total={session.questions.length}
            score={session.score}
          />

          {currentQuestion.type === 'multiple-choice' ? (
            <MultipleChoice
              question={currentQuestion}
              onAnswer={submitAnswer}
              onNext={nextQuestion}
            />
          ) : (
            <FillInBlank
              question={currentQuestion}
              onAnswer={submitAnswer}
              onNext={nextQuestion}
            />
          )}
        </div>
      </div>
    );
  }

  return null;
}
