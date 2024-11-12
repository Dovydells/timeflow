import React, { useState } from 'react';
import { Clock, Zap, Calendar, ArrowUpRight, X } from 'lucide-react';

interface QuickActionsProps {
  onResumeLastProject: () => void;
  onAddQuickTask: (task: { projectId: string; title: string }) => void;
  lastProject?: { id: string; name: string; time: string };
}

export function QuickActions({ onResumeLastProject, onAddQuickTask, lastProject }: QuickActionsProps) {
  const [showQuickTaskModal, setShowQuickTaskModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => lastProject && setShowResumeModal(true)}
          className="flex items-center space-x-4 bg-white dark:bg-[#2c2c2c] p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
        >
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="font-medium flex items-center space-x-1">
              <span>Tęsti laikmatį</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {lastProject ? `Paskutinis: ${lastProject.name}` : 'Nėra aktyvių projektų'}
            </p>
          </div>
        </button>

        <button
          onClick={() => setShowQuickTaskModal(true)}
          className="flex items-center space-x-4 bg-white dark:bg-[#2c2c2c] p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
        >
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Zap className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="font-medium flex items-center space-x-1">
              <span>Greita užduotis</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pridėti naują užduotį</p>
          </div>
        </button>

        <button className="flex items-center space-x-4 bg-white dark:bg-[#2c2c2c] p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="font-medium flex items-center space-x-1">
              <span>Kalendorius</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Peržiūrėti terminus</p>
          </div>
        </button>
      </div>

      {/* Quick Task Modal */}
      {showQuickTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#2c2c2c] rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Nauja užduotis</h3>
              <button 
                onClick={() => setShowQuickTaskModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Užduoties pavadinimas"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mb-4"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowQuickTaskModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300"
              >
                Atšaukti
              </button>
              <button
                onClick={() => {
                  if (taskTitle.trim() && lastProject) {
                    onAddQuickTask({ projectId: lastProject.id, title: taskTitle });
                    setShowQuickTaskModal(false);
                    setTaskTitle('');
                  }
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Pridėti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Timer Modal */}
      {showResumeModal && lastProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#2c2c2c] rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Tęsti projektą?</h3>
              <button 
                onClick={() => setShowResumeModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Ar norite tęsti darbą su projektu "{lastProject.name}"?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300"
              >
                Atšaukti
              </button>
              <button
                onClick={() => {
                  onResumeLastProject();
                  setShowResumeModal(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Tęsti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}