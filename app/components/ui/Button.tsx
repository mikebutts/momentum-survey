// /components/ui/Button.tsx
import { ButtonHTMLAttributes } from 'react';

export const Button = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    {children}
  </button>
);
