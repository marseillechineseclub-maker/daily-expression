import { Select } from '../ui';
import { categories } from '../../data/expressions';
import type { Category } from '../../types';

interface CategoryFilterProps {
  value: Category | 'All';
  onChange: (category: Category | 'All') => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const options = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  return (
    <Select
      options={options}
      value={value}
      onChange={(v) => onChange(v as Category | 'All')}
    />
  );
}
