
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '0';

  // Format Indian currency
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount).replace('₹', '');
};

export const formatDate = (date) => {
  if (!date) return '';

  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatMonthYear = (date) => {
  if (!date) return '';

  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });
};

export const formatPercentage = (value) => {
  if (!value && value !== 0) return '0%';
  return `${Math.round(value)}%`;
};