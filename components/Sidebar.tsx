import React from 'react';
import { LayoutDashboard, Folder, BarChart3, Settings } from 'lucide-react';

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onToggleNotifications: () => void;
}

export function Sidebar({ activeView, onNavigate, onToggleNotifications }: SidebarProps) {
  const navItems: NavItem[] = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'projects', icon: <Folder className="w-5 h-5" />, label: 'Projects' },
    { id: 'reports', icon: <BarChart3 className="w-5 h-5" />, label: 'Reports' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-[#2c2c2c] border-r border-gray-200 dark:border-gray-800">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <LayoutDashboard className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">TimeFlow</h1>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeView === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Morgan</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Pro Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}