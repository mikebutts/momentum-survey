// /components/Survey/SurveyForm.tsx
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
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert('Thank you for your feedback!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const nextStep = () => {
    const currentQuestion = surveyQuestions[step];
    if (currentQuestion.required && !watch(currentQuestion.id)) {
      setError(currentQuestion.id, { type: "manual", message: "This field is required" });
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const isLastStep = step === surveyQuestions.length - 1;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-8 space-y-6">
      <ProgressBar step={step} total={surveyQuestions.length} />

      <AnimatePresence mode="wait">
        <motion.div
          key={surveyQuestions[step].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <Question
            question={surveyQuestions[step]}
            register={register}
            error={errors[surveyQuestions[step].id]}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        {step > 0 && (
          <button type="button" onClick={prevStep} className="btn">
            Back
          </button>
        )}
        {!isLastStep ? (
          <button type="button" onClick={nextStep} className="btn">
            Next
          </button>
        ) : (
          <button type="submit" className="btn">
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default SurveyForm;
