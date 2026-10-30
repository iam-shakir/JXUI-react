import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useJXTheme } from '../../../context/JXThemeContext';
import { 
  Sparkles, 
  Layers, 
  Search, 
  Sliders, 
  Bell, 
  X, 
  Folder, 
  FileText, 
  Settings, 
  Maximize2,
  ChevronRight,
  Info
} from 'lucide-react';

// 16. GlassTabs
export interface GlassTabsProps {
  tabs?: string[];
  activeTab?: string;
  onChange?: (tab: string) => void;
}
export const GlassTabs: React.FC<GlassTabsProps> = ({ tabs = ['Design', 'Code', 'Audit', 'Tokens'], activeTab = 'Design', onChange }) => {
  const { palette, getRadiusClass } = useJXTheme();
  return (
    <div className={`inline-flex p-1 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800 ${getRadiusClass('pill')}`}>
      {tabs.map((tab) => {
        const isSelected = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange?.(tab)}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              isSelected ? `${palette.bg} text-white shadow-xs` : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};
