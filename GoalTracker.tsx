import React, { useState } from 'react';
import { Target, TrendingUp, Check } from 'lucide-react';
import type { Project } from '../types';

interface GoalTrackerProps {
  project: Project;
  onUpdateGoal: (goal: { target: number; timeframe: 'weekly' | 'monthly' }) => void;
}

export function GoalTracker({ project, onUpdateGoal }: GoalTrackerProps) {
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalTarget, setGoalTarget] = useState('');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(goalTarget);
    if (!isNaN(target) && target > 0) {
      onUpdateGoal({ target, timeframe });
      setShowGoalForm(false);
      setGoalTarget('');
    }
  };

  const calculateProgress = () => {
    // Simulated progress calculation
    const progress = Math.min(Math.random() * 100, 100);
    return Math.round(progress);
  };

  const progress = calculateProgress();

  return (
    <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Target className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Project Goals</h3>
        </div>
        {!showGoalForm && (
          <button
            onClick={() => setShowGoalForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
          >
            Set New Goal
          </button>
        )}
      </div>

      {showGoalForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Target Hours</label>
            <input
              type="number"
              value={goalTarget}
              onChange={(e) => setGoalTarget(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
              placeholder="Enter target hours"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Timeframe</label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setTimeframe('weekly')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeframe === 'weekly'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('monthly')}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeframe === 'monthly'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowGoalForm(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Set Goal
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Progress</p>
              <div className="flex items-center space-x-2 mt-1">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-2xl font-semibold">{progress}%</span>
              </div>
            </div>
            {progress >= 100 && (
              <div className="flex items-center space-x-2 text-emerald-500">
                <Check className="w-5 h-5" />
                <span className="font-medium">Goal Achieved!</span>
              </div>
            )}
          </div>

          <div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Time Spent</p>
              <p className="text-lg font-semibold mt-1">24h 30m</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Target</p>
              <p className="text-lg font-semibold mt-1">40h 00m</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}