// /components/ui/Input.tsx
import { InputHTMLAttributes } from 'react';

 const Input = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full p-4 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition text-lg"
  />
);

export default Input