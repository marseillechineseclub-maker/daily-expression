import { useState } from 'react';
import { Button, Card, Select } from '../ui';
import { MultipleChoice, FillInBlank, QuizProgress, QuizResult } from '../quiz';
import { useQuiz } from '../../hooks/useQuiz';
import { expressions, categories } from '../../data/expressions';
import type { QuizType, Category } from '../../types';

interface QuizScreenProps {
  onBack: () => void;
}

export function QuizScreen({ onBack }: QuizScreenProps) {
  const {
    session,
    settings,
    startQuiz,
    submitAnswer,
    nextQuestion,
    endQuiz,
    getCurrentQuestion,
    getResults,
  } = useQuiz(expressions);

  const [questionCount, setQuestionCount] = useState(settings.questionCount.toString());
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedTypes, setSelectedTypes] = useState<QuizType[]>(['multiple-choice', 'fill-in-blank']);

  const currentQuestion = getCurrentQuestion();
  const results = getResults();

  const handleStart = () => {
    startQuiz({
      questionCount: parseInt(questionCount, 10),
      categories: selectedCategory === 'All' ? 'All' : [selectedCategory],
      quizTypes: selectedTypes,
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
