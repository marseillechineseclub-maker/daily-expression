import type { ReactNode } from 'react';
import type { Category } from '../../types';

type BadgeVariant = 'default' | 'idioms' | 'business' | 'casual' | 'phrasal';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  idioms: 'bg-purple-100 text-purple-700',
  business: 'bg-blue-100 text-blue-700',
  casual: 'bg-green-100 text-green-700',
  phrasal: 'bg-orange-100 text-orange-700',
};

export function categoryToVariant(category: Category): BadgeVariant {
  const map: Record<Category, BadgeVariant> = {
    Idioms: 'idioms',
    Business: 'business',
    Casual: 'casual',
    'Phrasal Verbs': 'phrasal',
  };
  return map[category] || 'default';
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
