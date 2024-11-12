import React, { useState } from 'react';
import { X, Check, AlertTriangle } from 'lucide-react';

interface ApprovedAppsProps {
  allowedApps: string[];
  onToggleApp: (appName: string) => void;
  showAddModal: boolean;
  onCloseAddModal: () => void;
}

const COMMON_APPS = [
  { name: 'Visual Studio Code', icon: '💻', category: 'Development' },
  { name: 'DaVinci Resolve', icon: '🎬', category: 'Video Editing' },
  { name: 'Final Cut Pro', icon: '🎥', category: 'Video Editing' },
  { name: 'Adobe Premiere', icon: '🎥', category: 'Video Editing' },
  { name: 'Adobe Photoshop', icon: '🎨', category: 'Design' },
  { name: 'Figma', icon: '🎨', category: 'Design' },
  { name: 'Chrome', icon: '🌐', category: 'Browser' },
  { name: 'Safari', icon: '🌐', category: 'Browser' },
  { name: 'Firefox', icon: '🌐', category: 'Browser' },
  { name: 'Slack', icon: '💬', category: 'Communication' },
  { name: 'Discord', icon: '💬', category: 'Communication' },
  { name: 'Zoom', icon: '🎥', category: 'Communication' }
];

const DISTRACTING_APPS = [
  { name: 'YouTube', icon: '▶️', category: 'Entertainment' },
  { name: 'Netflix', icon: '🎬', category: 'Entertainment' },
  { name: 'Twitter', icon: '🐦', category: 'Social Media' },
  { name: 'Facebook', icon: '👥', category: 'Social Media' },
  { name: 'Instagram', icon: '📷', category: 'Social Media' },
  { name: 'TikTok', icon: '🎵', category: 'Social Media' }
];

export function ApprovedApps({ allowedApps, onToggleApp, showAddModal, onCloseAddModal }: ApprovedAppsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Array.from(new Set([
    ...COMMON_APPS.map(app => app.category),
    ...DISTRACTING_APPS.map(app => app.category)
  ]));

  const filteredApps = [...COMMON_APPS, ...DISTRACTING_APPS].filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isDistracting = (appName: string) => {
    return DISTRACTING_APPS.some(app => app.name === appName);
  };

  return (
    <div className="space-y-4">
      {/* App List */}
      <div className="space-y-2">
        {filteredApps.map(app => (
          <div
            key={app.name}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{app.icon}</span>
              <div>
                <p className="font-medium">{app.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {app.category}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isDistracting(app.name) && (
                <div className="flex items-center space-x-1 text-amber-500">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">Distracting</span>
                </div>
              )}
              
              <button
                onClick={() => onToggleApp(app.name)}
                className={`p-2 rounded-lg transition-colors ${
                  allowedApps.includes(app.name)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add App Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#2c2c2c] rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Add New App</h3>
              <button
                onClick={onCloseAddModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Search apps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
              />

              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(
                      selectedCategory === category ? null : category
                    )}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2">
                {filteredApps.map(app => (
                  <button
                    key={app.name}
                    onClick={() => {
                      onToggleApp(app.name);
                      onCloseAddModal();
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <span className="text-xl">{app.icon}</span>
                    <div className="text-left">
                      <p className="font-medium">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}