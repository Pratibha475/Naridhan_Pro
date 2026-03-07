

export const calculateSIP = (monthlyAmount, annualRate, years) => {
  const months = years * 12;
  const monthlyRate = annualRate / (12 * 100);

  // Future Value = P * ((1 + r)^n - 1) / r * (1 + r)
  const futureValue = monthlyAmount *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate);

  const totalInvestment = monthlyAmount * months;
  const estimatedReturns = futureValue - totalInvestment;

  return {
    totalInvestment: Math.round(totalInvestment),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(futureValue),
    principalPercentage: Math.round((totalInvestment / futureValue) * 100),
    returnsPercentage: Math.round((estimatedReturns / futureValue) * 100),
  };
};

export const calculateGoalAmount = (targetAmount, annualRate, years) => {
  const months = years * 12;
  const monthlyRate = annualRate / (12 * 100);

  // Monthly SIP needed = FV * r / ((1 + r) * ((1 + r)^n - 1))
  const monthlyInvestment = targetAmount * monthlyRate /
    ((1 + monthlyRate) * (Math.pow(1 + monthlyRate, months) - 1));

  const totalInvestment = monthlyInvestment * months;
  const estimatedReturns = targetAmount - totalInvestment;

  return {
    monthlyInvestment: Math.round(monthlyInvestment),
    totalInvestment: Math.round(totalInvestment),
    estimatedReturns: Math.round(estimatedReturns),
    targetAmount: Math.round(targetAmount),
  };
};

export const calculateLumpsum = (principal, annualRate, years) => {
  const futureValue = principal * Math.pow(1 + annualRate / 100, years);
  const estimatedReturns = futureValue - principal;

  return {
    futureValue: Math.round(futureValue),
    estimatedReturns: Math.round(estimatedReturns),
    principal: Math.round(principal),
  };
};