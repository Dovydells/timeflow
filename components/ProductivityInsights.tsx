import React, { useState } from 'react';
import { BarChart2, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';

export function ProductivityInsights() {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly'>('daily');
  const { projects } = useProjects();
  
  const calculateProductivityData = () => {
    return projects.map(project => {
      const completedTasks = project.tasks.filter(t => t.completed).length;
      const totalTasks = project.tasks.length;
      const focusScore = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      
      const [hours] = project.time.split(':').map(Number);
      const timeSpent = hours;
      const timeAllocated = 8;

      return {
        projectName: project.name,
        timeSpent,
        timeAllocated,
        trend: timeSpent >= timeAllocated ? 'up' : 'down',
        focusScore,
        distractions: Math.floor(Math.random() * 10)
      };
    });
  };

  const productivityData = calculateProductivityData();

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' 
      ? <TrendingUp className="w-4 h-4 text-emerald-500" />
      : <AlertTriangle className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart2 className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Productivity Insights</h3>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('daily')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              timeRange === 'daily'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeRange('weekly')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              timeRange === 'weekly'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {productivityData.map((project, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <h4 className="font-medium truncate max-w-[200px]">
                    {project.projectName}
                  </h4>
                </div>
                <div className="flex items-center space-x-3">
                  {getTrendIcon(project.trend)}
                  <span className="text-sm font-medium">
                    {project.timeSpent}h / {project.timeAllocated}h
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Focus Score</span>
                    <span className={`text-sm font-medium ${
                      project.focusScore >= 80 ? 'text-emerald-500' :
                      project.focusScore >= 60 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {Math.round(project.focusScore)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div
                      className={`h-full rounded-full transition-all ${
                        project.focusScore >= 80 ? 'bg-emerald-500' :
                        project.focusScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${project.focusScore}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Time Progress</span>
                    <span className="text-sm font-medium">
                      {Math.round((project.timeSpent / project.timeAllocated) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{
                        width: `${Math.min((project.timeSpent / project.timeAllocated) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Distractions</span>
                    <span className={`text-sm font-medium ${
                      project.distractions <= 3 ? 'text-emerald-500' :
                      project.distractions <= 6 ? 'text-yellow-500' : 'text-red-500'
                    }`}>
                      {project.distractions}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {project.distractions <= 3 ? 'Great focus!' :
                     project.distractions <= 6 ? 'Room for improvement' : 'High distraction'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}