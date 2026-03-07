
// Simple rule-based expense categorizer
export const categorizeExpense = (text) => {
  const lowerText = text.toLowerCase();

  const categories = {
    'Food & Dining': ['lunch', 'dinner', 'breakfast', 'restaurant', 'food', 'coffee', 'tea', 'snacks', 'pizza', 'burger'],
    'Shopping': ['shopping', 'clothes', 'dress', 'bag', 'shoes', 'mall', 'amazon', 'flipkart'],
    'Transportation': ['uber', 'ola', 'taxi', 'bus', 'train', 'metro', 'petrol', 'diesel', 'fuel', 'auto'],
    'Entertainment': ['movie', 'netflix', 'prime', 'theatre', 'concert', 'show', 'game'],
    'Bills & Utilities': ['electricity', 'water', 'gas', 'bill', 'phone', 'mobile', 'internet', 'wifi'],
    'Healthcare': ['doctor', 'medicine', 'hospital', 'clinic', 'health', 'medical', 'pharmacy'],
    'Education': ['book', 'course', 'class', 'tution', 'school', 'college', 'fees'],
    'Personal Care': ['salon', 'spa', 'hair', 'makeup', 'gym', 'fitness'],
    'Travel': ['hotel', 'flight', 'train', 'bus', 'holiday', 'trip', 'vacation'],
    'Other': []
  };

  for (const [category, keywords] of Object.entries(categories)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return category;
      }
    }
  }

  return 'Other';
};