'use client';

import { cn } from '@/lib/utils';
import { type BadgeProps } from '@/lib/types';

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    secondary: 'bg-white bg-opacity-20 text-white',
    destructive: 'bg-red-500 text-white',
    outline: 'border border-white border-opacity-30 text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
