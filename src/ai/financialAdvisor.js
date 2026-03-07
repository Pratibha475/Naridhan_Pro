
export const getFinancialAdvice = async (financialData) => {
  const { income, expenses, savings, transactions, userProfile } = financialData;

  // Calculate financial health score
  const savingsRate = income > 0 ? (savings / income) * 100 : 0;
  const expenseRatio = income > 0 ? (expenses / income) * 100 : 0;

  let healthScore = 50; // Base score

  if (savingsRate >= 20) healthScore += 20;
  else if (savingsRate >= 10) healthScore += 10;

  if (expenseRatio <= 50) healthScore += 20;
  else if (expenseRatio <= 70) healthScore += 10;

  if (savings > 0) healthScore += 10;

  // Generate insights
  const insights = [];

  if (expenseRatio > 70) {
    insights.push({
      type: 'negative',
      message: 'Your expenses are very high. Try to reduce discretionary spending.',
    });
  } else if (expenseRatio < 50) {
    insights.push({
      type: 'positive',
      message: 'Great job keeping expenses under control!',
    });
  }

  if (savingsRate < 10) {
    insights.push({
      type: 'negative',
      message: 'Consider increasing your savings rate to at least 20% of income.',
    });
  } else if (savingsRate > 20) {
    insights.push({
      type: 'positive',
      message: 'Excellent savings rate! You\'re building wealth effectively.',
    });
  }

  // Generate recommendations
  const recommendations = [];

  if (savings < expenses * 3) {
    recommendations.push({
      title: 'Build Emergency Fund',
      description: 'Aim to save 3-6 months of expenses for emergencies.',
      action: 'Start Saving',
    });
  }

  if (savingsRate > 10 && savingsRate < 20) {
    recommendations.push({
      title: 'Start SIP Investments',
      description: 'Consider investing your surplus in mutual funds through SIP.',
      action: 'Explore Options',
    });
  }

  // Return advice object
  return {
    healthScore: Math.min(healthScore, 100),
    summary: `Based on your financial data, you're doing ${healthScore >= 70 ? 'great' : healthScore >= 50 ? 'okay' : 'needs improvement'
      }. Focus on building savings and reducing unnecessary expenses.`,
    insights,
    recommendations,
    metrics: {
      savingsRate,
      expenseManagement: 100 - expenseRatio,
      incomeStability: 80, // Placeholder
    },
    savingsPotential: income * 0.2 - savings,
    savingsTips: [
      'Track your daily expenses',
      'Set up automatic savings transfer',
      'Review subscriptions monthly',
    ],
    riskProfile: userProfile?.riskProfile || 'moderate',
    emergencyTips: [
      'Keep emergency fund in liquid assets',
      'Aim for 6 months of expenses',
      'Review emergency fund quarterly',
    ],
  };
};