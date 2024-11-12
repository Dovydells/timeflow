import React, { useState } from 'react';
import { PieChart, Calendar, Clock } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';

const CHART_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500'
];

export function UsageAnalytics() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const { projects } = useProjects();

  const calculateTimeAllocations = () => {
    return projects.map((project, index) => {
      const [hours] = project.time.split(':').map(Number);
      return {
        projectName: project.name,
        hours,
        color: CHART_COLORS[index % CHART_COLORS.length]
      };
    });
  };

  const timeAllocations = calculateTimeAllocations();
  const totalHours = timeAllocations.reduce((sum, item) => sum + item.hours, 0) || 0;

  return (
    <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <PieChart className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Usage Analytics</h3>
        </div>

        <div className="flex space-x-2">
          {(['daily', 'weekly', 'monthly'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeframe === t
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Time</p>
            <p className="text-3xl font-bold mt-1">{totalHours}h</p>
          </div>
          <div className="w-32 h-32 relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {timeAllocations.reduce((acc, curr, idx) => {
                const percentage = (curr.hours / totalHours) * 100;
                const prevPercentage = acc.percentage;
                acc.percentage += percentage;
                
                return {
                  percentage: acc.percentage,
                  elements: [
                    ...acc.elements,
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={curr.color.replace('bg-', 'var(--)')}
                      strokeWidth="20"
                      strokeDasharray={`${percentage * 2.51} 251.2`}
                      strokeDashoffset={`${-prevPercentage * 2.51}`}
                      className="transition-all duration-300"
                    />
                  ]
                };
              }, { percentage: 0, elements: [] as JSX.Element[] }).elements}
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          {timeAllocations.map((allocation, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className={`w-3 h-3 flex-shrink-0 rounded-full ${allocation.color}`} />
                <span className="text-sm font-medium truncate">
                  {allocation.projectName}
                </span>
              </div>
              <div className="flex items-center space-x-6 flex-shrink-0">
                <span className="text-sm font-medium">{allocation.hours}h</span>
                <span className="text-sm text-gray-500 w-16 text-right">
                  {allocation.hours > 0 ? `${Math.round((allocation.hours / totalHours) * 100)}%` : '0%'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="font-medium text-sm">Peak Hours</span>
          </div>
          <p className="text-base text-gray-600 dark:text-gray-300">
            10 AM - 2 PM
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span className="font-medium text-sm">Most Productive</span>
          </div>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Tuesday
          </p>
        </div>
      </div>
    </div>
  );
}