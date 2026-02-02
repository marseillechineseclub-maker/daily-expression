// Get today's date as YYYY-MM-DD string
export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

// Get formatted date for display
export function getFormattedDate(): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date().toLocaleDateString('en-US', options);
}

// Calculate daily expression index (deterministic based on date)
export function getDailyExpressionIndex(totalExpressions: number): number {
  const today = new Date();
  const epoch = new Date('2024-01-01');
  const diffTime = today.getTime() - epoch.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % totalExpressions;
}

// Add days to a date
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Check if two date strings are the same day
export function isSameDay(date1: string, date2: string): boolean {
  return date1 === date2;
}

// Check if date1 is the day before date2
export function isYesterday(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = d2.getTime() - d1.getTime();
  const daysDiff = diff / (1000 * 60 * 60 * 24);
  return daysDiff >= 0.5 && daysDiff < 1.5;
}
