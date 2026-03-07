

export const calculateEmergencyFund = (monthlyExpenses, months = 6) => {
  return monthlyExpenses * months;
};

export const calculateSavingsRate = (income, expenses) => {
  if (!income || income === 0) return 0;
  return ((income - expenses) / income) * 100;
};

export const calculateExpenseRatio = (expenses, income) => {
  if (!income || income === 0) return 0;
  return (expenses / income) * 100;
};

export const calculateMonthlyBudget = (income, categories) => {
  const budget = {};
  const totalAllocated = categories.reduce((sum, cat) => sum + cat.percentage, 0);

  categories.forEach(category => {
    budget[category.name] = (income * category.percentage) / 100;
  });

  return budget;
};