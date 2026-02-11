import React from 'react';
import { ApiDefinition } from '../types';
import { ChevronRight, Database, Box, PlayCircle } from 'lucide-react';

interface SidebarProps {
  apis: ApiDefinition[];
  selectedApiId: string;
  onSelect: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ apis, selectedApiId, onSelect }) => {
  // Group apis by category
  const categories = {
    Data: apis.filter(a => a.category === 'Data'),
    Utility: apis.filter(a => a.category === 'Utility'),
    Entertainment: apis.filter(a => a.category === 'Entertainment'),
  };

  return (
    <div className="w-full md:w-72 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <Box className="text-blue-500" />
          <span>API Nexus</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">Enterprise API Explorer</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              {category === 'Data' && <Database size={12} />}
              {category === 'Utility' && <Box size={12} />}
              {category === 'Entertainment' && <PlayCircle size={12} />}
              {category}
            </div>
            <div className="space-y-1">
              {items.map((api) => {
                const isSelected = selectedApiId === api.id;
                return (
                  <button
                    key={api.id}
                    onClick={() => onSelect(api.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                      ${isSelected 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                        : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <api.icon size={18} className={isSelected ? 'text-blue-200' : 'text-slate-500 group-hover:text-slate-300'} />
                      <span>{api.title}</span>
                    </div>
                    {isSelected && <ChevronRight size={14} className="text-blue-200" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 text-xs text-center text-slate-600">
        &copy; 2024 API Nexus Inc.
      </div>
    </div>
  );
};
