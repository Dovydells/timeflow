import React, { useState } from 'react';
import { BarChart3, Plus, Clock } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { MoneyModal } from './MoneyModal';
import { useMoneyManagement } from '../hooks/useMoneyManagement';
import { ProductivityInsights } from './ProductivityInsights';
import { UsageAnalytics } from './UsageAnalytics';
import { GoalTracker } from './GoalTracker';

export function Reports() {
  const { projects } = useProjects();
  const { 
    projectIncome, 
    personalIncome, 
    totalIncome, 
    addTransaction, 
    recentTransactions 
  } = useMoneyManagement();
  
  const [selectedProject, setSelectedProject] = useState<string | 'all'>('all');
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly'>('daily');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMoneyModal, setShowMoneyModal] = useState<'project' | 'personal' | null>(null);

  const selectedProjectData = selectedProject === 'all' 
    ? null 
    : projects.find(p => p.id === selectedProject);

  return (
    <div className="space-y-8">
      {/* Income Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Project Income</h3>
            <button
              onClick={() => setShowMoneyModal('project')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-blue-500"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <p className="text-2xl font-semibold mt-2">{projectIncome} €</p>
        </div>

        <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Personal Income</h3>
            <button
              onClick={() => setShowMoneyModal('personal')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-blue-500"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <p className="text-2xl font-semibold mt-2">{personalIncome} €</p>
        </div>

        <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
          <h3 className="text-lg font-medium">Total Income</h3>
          <p className="text-2xl font-semibold mt-2">{totalIncome} €</p>
        </div>
      </div>

      {/* Project Selection and Analytics */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-medium">Project Analytics</h3>
              </div>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <option value="all">All Projects</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedProjectData && <GoalTracker project={selectedProjectData} onUpdateGoal={() => {}} />}
          </div>

          <ProductivityInsights />
        </div>

        <div className="space-y-6">
          <UsageAnalytics />
        </div>
      </div>

      {/* Money Modal */}
      {showMoneyModal && (
        <MoneyModal
          type={showMoneyModal}
          onClose={() => setShowMoneyModal(null)}
          onAddTransaction={addTransaction}
          recentTransactions={recentTransactions}
        />
      )}
    </div>
  );
}