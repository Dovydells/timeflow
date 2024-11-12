import React from 'react';
import { Clock, X } from 'lucide-react';

interface TimerProps {
  activeProject: string;
  time: string;
  isTracking: boolean;
  onToggleTracking: () => void;
  onClose: () => void;
}

export function Timer({ activeProject, time, isTracking, onToggleTracking, onClose }: TimerProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-white/90" />
              <span className="text-sm text-white/90 font-medium">{activeProject}</span>
              <div className="bg-white/10 rounded-md px-3 py-1">
                <span className="font-mono text-sm text-white">{time}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onToggleTracking}
                className={`
                  px-3 py-1 rounded-md text-sm font-medium transition-all
                  ${isTracking 
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-white' 
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-white'
                  }
                `}
              >
                {isTracking ? 'Stop' : 'Start'}
              </button>
              
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white/80"
                aria-label="Close timer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}