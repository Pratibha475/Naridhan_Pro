
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const FinancialContext = createContext({});

export const useFinancial = () => useContext(FinancialContext);

export const FinancialProvider = ({ children }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [loading, setLoading] = useState(true); // Start with true
  const [monthlySummary, setMonthlySummary] = useState({});

  useEffect(() => {
    if (user) {
      loadTransactions();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadTransactions = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const savedTransactions = await AsyncStorage.getItem(`transactions_${user.id}`);
      if (savedTransactions) {
        const transactionsData = JSON.parse(savedTransactions);
        setTransactions(transactionsData || []);
        calculateTotals(transactionsData || []);
      } else {
        // Add mock transactions for demo
        const mockTransactions = getMockTransactions();
        setTransactions(mockTransactions);
        calculateTotals(mockTransactions);
        await AsyncStorage.setItem(`transactions_${user.id}`, JSON.stringify(mockTransactions));
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const getMockTransactions = () => {
    const now = new Date();
    return [
      {
        id: '1',
        type: 'income',
        amount: 50000,
        description: 'Monthly Salary',
        category: 'Salary',
        date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
      },
      {
        id: '2',
        type: 'expense',
        amount: 2000,
        description: 'Groceries',
        category: 'Food & Dining',
        date: new Date(now.getFullYear(), now.getMonth(), 5).toISOString(),
      },
      {
        id: '3',
        type: 'expense',
        amount: 3500,
        description: 'Shopping',
        category: 'Shopping',
        date: new Date(now.getFullYear(), now.getMonth(), 8).toISOString(),
      },
      {
        id: '4',
        type: 'expense',
        amount: 1500,
        description: 'Electricity Bill',
        category: 'Bills & Utilities',
        date: new Date(now.getFullYear(), now.getMonth(), 10).toISOString(),
      },
    ];
  };

  const calculateTotals = (transactionsData) => {
    let totalIncome = 0;
    let totalExpenses = 0;

    (transactionsData || []).forEach(transaction => {
      if (transaction?.type === 'income') {
        totalIncome += transaction?.amount || 0;
      } else {
        totalExpenses += transaction?.amount || 0;
      }
    });

    setIncome(totalIncome);
    setExpenses(totalExpenses);
    setSavings(totalIncome - totalExpenses);
    calculateMonthlySummary(transactionsData || []);
  };

  const calculateMonthlySummary = (transactionsData) => {
    const summary = {};
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    (transactionsData || []).forEach(transaction => {
      if (transaction?.date) {
        const date = new Date(transaction.date);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          const category = transaction.category || 'Other';
          if (!summary[category]) {
            summary[category] = 0;
          }
          if (transaction.type === 'expense') {
            summary[category] += transaction.amount || 0;
          }
        }
      }
    });

    setMonthlySummary(summary);
  };

  const addTransaction = async (transactionData) => {
    if (!user) throw new Error('User not authenticated');

    setLoading(true);
    try {
      const newTransaction = {
        id: Date.now().toString(),
        ...transactionData,
        createdAt: new Date().toISOString(),
      };

      const updatedTransactions = [newTransaction, ...(transactions || [])];
      setTransactions(updatedTransactions);

      await AsyncStorage.setItem(`transactions_${user.id}`, JSON.stringify(updatedTransactions));
      calculateTotals(updatedTransactions);

      return newTransaction.id;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    transactions: transactions || [],
    income: income || 0,
    expenses: expenses || 0,
    savings: savings || 0,
    loading,
    monthlySummary: monthlySummary || {},
    addTransaction,
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
};