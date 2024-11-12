import { useState, useEffect } from 'react';
import { useProjects } from './useProjects';
import type { MoneyTransaction } from '../types';

export function useMoneyManagement() {
  const [transactions, setTransactions] = useState<MoneyTransaction[]>([]);
  const { projects } = useProjects();

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Calculate project income from projects data
  const projectIncome = projects.reduce((total, project) => {
    return total + (project.profit - project.expenses);
  }, 0);

  // Calculate personal income from transactions
  const personalIncome = transactions.reduce((total, tx) => {
    if (tx.type === 'personal') {
      return total + (tx.operation === 'add' ? tx.amount : -tx.amount);
    }
    return total;
  }, 0);

  const addTransaction = (transaction: Omit<MoneyTransaction, 'id' | 'date'>) => {
    const newTransaction: MoneyTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const getRecentTransactions = (limit = 5) => {
    return transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  };

  return {
    projectIncome,
    personalIncome,
    totalIncome: projectIncome + personalIncome,
    transactions,
    recentTransactions: getRecentTransactions(),
    addTransaction
  };
}