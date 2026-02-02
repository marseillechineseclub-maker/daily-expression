import type { Expression, QuizQuestion, QuizSettings } from '../types';
import { shuffle, generateId } from '../utils/shuffle';

export function generateQuiz(
  expressions: Expression[],
  settings: QuizSettings
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  // Filter by categories if specified
  let pool = settings.categories === 'All'
    ? expressions
    : expressions.filter((e) => settings.categories.includes(e.category));

  // Shuffle and limit to question count
  pool = shuffle(pool).slice(0, settings.questionCount);

  pool.forEach((expr, index) => {
    // Rotate through question types
    const type = settings.quizTypes[index % settings.quizTypes.length];

    switch (type) {
      case 'multiple-choice':
        questions.push(generateMultipleChoice(expr, expressions));
        break;
      case 'fill-in-blank':
        questions.push(generateFillInBlank(expr));
        break;
    }
  });

  return questions;
}

function generateMultipleChoice(
  correct: Expression,
  allExpressions: Expression[]
): QuizQuestion {
  // Get 3 wrong answers, preferring same category
  const sameCategory = allExpressions.filter(
    (e) => e.id !== correct.id && e.category === correct.category
  );
  const otherCategory = allExpressions.filter(
    (e) => e.id !== correct.id && e.category !== correct.category
  );

  // Mix: prefer same category, fill with others
  const wrongPool = shuffle([...sameCategory, ...otherCategory]).slice(0, 3);
  const options = shuffle([correct.meaning, ...wrongPool.map((e) => e.meaning)]);

  return {
    id: generateId(),
    type: 'multiple-choice',
    expressionId: correct.id,
    question: `What does "${correct.expression}" mean?`,
    correctAnswer: correct.meaning,
    options,
  };
}

function generateFillInBlank(expression: Expression): QuizQuestion {
  // Take first example and blank out the expression
  const example = expression.examples[0];

  // Create a regex that matches the expression (case insensitive)
  const escapedExpr = expression.expression.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedExpr, 'gi');
  const blankedSentence = example.replace(regex, '_____');

  return {
    id: generateId(),
    type: 'fill-in-blank',
    expressionId: expression.id,
    question: 'Complete the sentence with the correct expression:',
    blankedSentence,
    correctAnswer: expression.expression.toLowerCase(),
  };
}

export function checkAnswer(question: QuizQuestion, userAnswer: string): boolean {
  if (question.type === 'multiple-choice') {
    return userAnswer === question.correctAnswer;
  }

  if (question.type === 'fill-in-blank') {
    // Normalize both answers for comparison
    const normalizedUser = userAnswer.toLowerCase().trim();
    const normalizedCorrect = question.correctAnswer.toLowerCase().trim();

    // Exact match
    if (normalizedUser === normalizedCorrect) return true;

    // Allow minor variations (without "the", "a", etc.)
    const stripArticles = (s: string) => s.replace(/^(the|a|an)\s+/i, '');
    return stripArticles(normalizedUser) === stripArticles(normalizedCorrect);
  }

  return false;
}
