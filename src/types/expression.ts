export type Category = 'Idioms' | 'Business' | 'Casual' | 'Phrasal Verbs';

export interface Expression {
  id: string;
  expression: string;
  meaning: string;
  category: Category;
  examples: string[];
}

export interface ExpressionProgress {
  expressionId: string;
  isLearned: boolean;
  learnedDate: string | null;
  reviewCount: number;
}
