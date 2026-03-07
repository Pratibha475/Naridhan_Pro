
export const getRiskProfileQuestions = () => {
  return [
    {
      question: 'How would you react if your investments lost 10% in a month?',
      options: [
        { text: 'Sell everything immediately', score: 1 },
        { text: 'Sell some investments', score: 2 },
        { text: 'Do nothing and wait', score: 3 },
        { text: 'Buy more at lower prices', score: 4 },
      ],
    },
    {
      question: 'What is your investment time horizon?',
      options: [
        { text: 'Less than 1 year', score: 1 },
        { text: '1-3 years', score: 2 },
        { text: '3-5 years', score: 3 },
        { text: 'More than 5 years', score: 4 },
      ],
    },
    {
      question: 'What is your primary investment goal?',
      options: [
        { text: 'Preserve capital', score: 1 },
        { text: 'Generate regular income', score: 2 },
        { text: 'Balanced growth and income', score: 3 },
        { text: 'Maximum long-term growth', score: 4 },
      ],
    },
    {
      question: 'How much investment experience do you have?',
      options: [
        { text: 'None', score: 1 },
        { text: 'Limited experience', score: 2 },
        { text: 'Moderate experience', score: 3 },
        { text: 'Extensive experience', score: 4 },
      ],
    },
    {
      question: 'What percentage of your income can you invest monthly?',
      options: [
        { text: 'Less than 5%', score: 1 },
        { text: '5-10%', score: 2 },
        { text: '10-20%', score: 3 },
        { text: 'More than 20%', score: 4 },
      ],
    },
  ];
};