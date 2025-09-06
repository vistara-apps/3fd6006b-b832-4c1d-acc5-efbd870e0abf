'use client';

import { cn } from '@/lib/utils';
import { type ButtonProps } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export function Button({
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl',
    outline: 'border border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-10',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    secondary: 'bg-white bg-opacity-10 text-white hover:bg-opacity-20',
    ghost: 'text-white hover:bg-white hover:bg-opacity-10',
    link: 'text-purple-300 hover:text-purple-200 underline-offset-4 hover:underline',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
