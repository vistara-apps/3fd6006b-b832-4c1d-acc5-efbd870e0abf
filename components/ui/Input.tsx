'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border border-white border-opacity-30 bg-white bg-opacity-10 px-3 py-2 text-sm text-white placeholder:text-white placeholder:text-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
