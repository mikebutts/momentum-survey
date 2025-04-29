"use client";

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/app/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'success';
};

export const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
  const baseClasses = 'px-6 py-3 rounded-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400',
    secondary: 'bg-gray-400 text-white hover:bg-gray-500 focus:ring-gray-300',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-400',
  };

  return (
    <button
      {...props}
      className={cn(baseClasses, variants[variant], className)}
    >
      {children}
    </button>
  );
};
