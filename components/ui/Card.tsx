'use client';

import { cn } from '@/lib/utils';
import { type CardProps } from '@/lib/types';

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'glass-card p-6',
        hover && 'hover:bg-opacity-15 transition-all duration-200 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-xl font-semibold text-white', className)}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('text-white text-opacity-90', className)}>
      {children}
    </div>
  );
}
