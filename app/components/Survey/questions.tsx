// /components/Survey/questions.ts

export const surveyQuestions = [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'How would you rate the real-time responsiveness of Momentum?',
      options: ['Excellent', 'Good', 'Average', 'Poor'],
      required: true,
    },
    {
      id: 'q2',
      type: 'rating',
      question: 'How satisfied are you overall with Momentum?',
      scale: 5,
      required: true,
    },
    {
      id: 'q3',
      type: 'checkbox',
      question: 'Which features do you use the most? (Select all that apply)',
      options: ['Real-time adjustment', 'Mobile App Control', 'Energy Reports', 'Smart Scheduling'],
      required: true,
    },
    {
      id: 'q4',
      type: 'text',
      question: 'What improvements would you like to see?',
      required: false,
    },
    {
      id: 'q5',
      type: 'email',
      question: 'If you’d like us to follow up, please leave your email address (optional)',
      required: false,
    },
  ];
  