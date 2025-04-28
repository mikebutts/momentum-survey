// /components/ui/Checkbox.tsx
import { useState } from 'react';

type CheckboxProps = {
  name: string;
  options: string[];
  register: any;
  error?: any;
};

export const Checkbox = ({ name, options, register, error }: CheckboxProps) => {
  return (
    <fieldset className="space-y-4" aria-required="true">
      <legend className="text-xl font-semibold mb-2">{name}</legend>
      
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`${name}-${option}`}
            value={option}
            {...register(name)}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
