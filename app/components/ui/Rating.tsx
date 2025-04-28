// /components/ui/Rating.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

type RatingProps = {
  name: string;
  scale: number;
  register: any;
  setValue: any;
  error?: any;
};

export const Rating = ({ name, scale, register, setValue, error }: RatingProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setSelected(value);
    setValue(name, value); // Update form state
  };

  return (
    <fieldset className="space-y-4" aria-required="true">
      <legend className="text-xl font-semibold mb-2">{name}</legend>

      <div className="flex space-x-4">
        {Array.from({ length: scale }, (_, i) => i + 1).map((value) => (
          <motion.button
            key={value}
            type="button"
            onClick={() => handleSelect(value)}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border ${
              selected && selected >= value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            } hover:bg-blue-500 hover:text-white focus:outline-none`}
            aria-label={`${value} star`}
          >
            {value}
          </motion.button>
        ))}
      </div>

      <input
        type="hidden"
        {...register(name, { required: true })}
        value={selected || ''}
      />

      {error && (
        <p role="alert" className="text-red-500 mt-2" id={`${name}-error`}>
          {error.message}
        </p>
      )}
    </fieldset>
  );
};
