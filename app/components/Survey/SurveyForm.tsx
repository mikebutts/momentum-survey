"use client";

import { useState } from 'react';
import { surveyQuestions } from './questions';
import { AnimatePresence, motion } from 'framer-motion';
import ProgressBar from './ProgressBar';
import Question from './Question';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/Button';

type FormData = {
  [key: string]: any;
};

const SurveyForm = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const { register, watch, handleSubmit, formState: { errors }, setError, setValue } = useForm<FormData>();

  const isLastStep = step === surveyQuestions.length - 1;

  const nextStep = () => {
    const currentQuestion = surveyQuestions[step];
    const value = watch(currentQuestion.id);

    if (currentQuestion.required && (value === undefined || value?.length === 0)) {
      setError(currentQuestion.id, { type: 'manual', message: 'This field is required' });
      return;
    }

    if (step >= surveyQuestions.length - 1) {
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  if (submitted) {
    // 🚀 Animated Thank You screen (we'll make it fancier next)
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen p-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-green-600 mb-6">🎉 Thank You!</h1>
        <p className="text-lg text-gray-700">We appreciate your feedback.</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
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
            setValue={setValue}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between pt-6">
        {step > 0 && (
          <Button type="button" onClick={prevStep} variant="secondary">
            Back
          </Button>
        )}
        {!isLastStep ? (
          <Button type="button" onClick={nextStep} className="ml-auto">
            Next
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit(onSubmit)} className="ml-auto" variant="success">
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default SurveyForm;
