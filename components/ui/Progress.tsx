'use client';

import { cn } from '@/lib/utils';
import { type ProgressProps } from '@/lib/types';

export function Progress({ value, max = 100, className = '' }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full bg-white bg-opacity-20 rounded-full h-2', className)}>
      <div
        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
