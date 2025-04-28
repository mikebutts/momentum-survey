// /components/ui/Radio.tsx
import { useEffect, useState } from 'react';

type RadioProps = {
  name: string;
  options: string[];
  register: any;
  error?: any;
};

export const Radio = ({ name, options, register, error }: RadioProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  useEffect(() => {
    const handleArrowKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setFocusedIndex((prev) => (prev + 1) % options.length);
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleArrowKey);
    return () => window.removeEventListener('keydown', handleArrowKey);
  }, [options.length]);

  return (
    <fieldset className="space-y-4" aria-required="true">
      <legend className="text-xl font-semibold mb-2">{name}</legend>
      
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="radio"
            id={`${name}-${option}`}
            value={option}
            {...register(name, { required: true })}
            className="h-5 w-5 border-gray-300 focus:ring-blue-500"
            tabIndex={index === focusedIndex ? 0 : -1}
          />
          <label htmlFor={`${name}-${option}`} className="text-lg">
            {option}
          </label>
        </div>
      ))}
      
      {error && (
        <p role="alert" className="text-red-500 mt-2" id={`${name}-error`}>
          {error.message}
        </p>
      )}
    </fieldset>
  );
};
