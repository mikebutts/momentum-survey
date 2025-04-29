// /components/Survey/Question.tsx

"use client"
import { Checkbox } from '../ui/Checkbox';
import  Input  from '../ui/Input';
import { Radio } from '../ui/Radio';
import { Rating } from '../ui/Rating';

type QuestionProps = {
  question: any;
  register: any;
  error: any;
  setValue: any;
};

const Question = ({ question, register, error, setValue }: QuestionProps) => {
  switch (question.type) {
    case 'multiple-choice':
      return (
        <Radio
          name={question.id}
          options={question.options}
          register={register}
          error={error}
        />
      );

    case 'rating':
      return (
        <Rating
          name={question.id}
          scale={question.scale}
          register={register}
          setValue={setValue}
          error={error}
        />
      );

    case 'checkbox':
      return (
        <Checkbox
          name={question.id}
          options={question.options}
          register={register}
          error={error}
        />
      );

    case 'text':
      return (
        <fieldset className="space-y-4">
          <legend className="text-xl font-semibold mb-2">{question.question}</legend>
          <Input
            type="text"
            aria-required={question.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${question.id}-error` : undefined}
            {...register(question.id, { required: question.required })}
          />
          {error && (
            <p role="alert" id={`${question.id}-error`} className="text-red-500 mt-2">
              {error.message}
            </p>
          )}
        </fieldset>
      );

    case 'email':
      return (
        <fieldset className="space-y-4">
          <legend className="text-xl font-semibold mb-2">{question.question}</legend>
          <Input
            type="email"
            aria-required={question.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${question.id}-error` : undefined}
            {...register(question.id, {
              required: question.required,
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
          />
          {error && (
            <p role="alert" id={`${question.id}-error`} className="text-red-500 mt-2">
              {error.message}
            </p>
          )}
        </fieldset>
      );

    default:
      return null;
  }
};

export default Question;
