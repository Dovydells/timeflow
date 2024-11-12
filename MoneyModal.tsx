import React, { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import type { MoneyTransaction } from '../types';

interface MoneyModalProps {
  type: 'project' | 'personal';
  onClose: () => void;
  onAddTransaction: (transaction: Omit<MoneyTransaction, 'id' | 'date'>) => void;
  recentTransactions: MoneyTransaction[];
}

export function MoneyModal({ type, onClose, onAddTransaction, recentTransactions }: MoneyModalProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      onAddTransaction({
        type,
        amount: numAmount,
        operation,
        description: description.trim() || undefined
      });
      onClose();
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            {type === 'project' ? 'Project Income' : 'Personal Income'}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setOperation('add')}
              className={`flex-1 py-2 rounded-lg ${
                operation === 'add'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <Plus className="w-4 h-4 mx-auto" />
            </button>
            <button
              onClick={() => setOperation('subtract')}
              className={`flex-1 py-2 rounded-lg ${
                operation === 'subtract'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <Minus className="w-4 h-4 mx-auto" />
            </button>
          </div>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          />

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          />

          {recentTransactions.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Recent Transactions
              </h4>
              <div className="space-y-2">
                {recentTransactions.map(tx => (
                  <div 
                    key={tx.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        {tx.operation === 'add' ? (
                          <Plus className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Minus className="w-3 h-3 text-red-500" />
                        )}
                        <span className="text-sm">
                          {tx.amount.toLocaleString()} €
                        </span>
                      </div>
                      {tx.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {tx.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(tx.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}