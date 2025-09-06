import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function calculateProgress(current: number, total: number): number {
  return Math.round((current / total) * 100);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const SCOPING_QUESTIONS = [
  "What problem are you trying to solve with your app?",
  "Who is your target audience?",
  "What makes your solution unique?",
  "What are the core features your MVP needs?",
  "How do you plan to monetize this?",
];

export const VALIDATION_CRITERIA = {
  problemClarity: 'How clearly defined is the problem?',
  marketSize: 'How large is the potential market?',
  competition: 'How competitive is the space?',
  feasibility: 'How feasible is the technical implementation?',
  monetization: 'How viable is the monetization strategy?',
};
