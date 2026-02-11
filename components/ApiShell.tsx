import React from 'react';
import { ApiDefinition } from '../types';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface ApiShellProps {
  definition: ApiDefinition;
  onRefresh?: () => void;
  loading?: boolean;
  error?: string | null;
  children: React.ReactNode;
  controls?: React.ReactNode;
}

export const ApiShell: React.FC<ApiShellProps> = ({ 
  definition, 
  onRefresh, 
  loading, 
  error, 
  children, 
  controls 
}) => {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <definition.icon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{definition.title}</h2>
              <p className="text-sm text-slate-500">{definition.description}</p>
            </div>
          </div>
          
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              {loading ? 'Fetching...' : 'Refresh Data'}
            </button>
          )}
        </div>

        {/* Input Controls Area */}
        {controls && (
           <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
             {controls}
           </div>
        )}

        {/* Content Area */}
        <div className="p-6 min-h-[300px] flex flex-col relative">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className={`transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
             {children}
          </div>

          {loading && !children && (
             <div className="absolute inset-0 flex items-center justify-center">
                <RefreshCw className="animate-spin text-blue-600" size={32} />
             </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-center text-xs text-slate-400">
        Data provided by free public APIs. Reliability may vary.
      </div>
    </div>
  );
};
