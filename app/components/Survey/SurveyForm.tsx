"use client";

import { useState } from 'react';
import { surveyQuestions } from './questions';
import { AnimatePresence, motion } from 'framer-motion';
import ProgressBar from './ProgressBar';
import Question from './Question';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  [key: string]: any;
};

const SurveyForm = () => {
  const [step, setStep] = useState(0);

  const { register, handleSubmit, watch, formState: { errors }, setError, setValue } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert('Thank you for your feedback!');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const nextStep = () => {
    const currentQuestion = surveyQuestions[step];
    const value = watch(currentQuestion.id);

    if (currentQuestion.required && (value === undefined || value.length === 0)) {
      setError(currentQuestion.id, { type: 'manual', message: 'This field is required' });
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const isLastStep = step === surveyQuestions.length - 1;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-8 space-y-8">
      <ProgressBar step={step} total={surveyQuestions.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={surveyQuestions[step].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <Question
            question={surveyQuestions[step]}
            register={register}
            error={errors[surveyQuestions[step].id]}
            setValue={setValue} // ✅ NOW PASSED CORRECTLY
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between pt-6">
        {step > 0 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-3 rounded-full bg-gray-400 hover:bg-gray-500 text-white font-semibold transition"
          >
            Back
          </button>
        )}
        {!isLastStep ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition ml-auto"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default SurveyForm;
