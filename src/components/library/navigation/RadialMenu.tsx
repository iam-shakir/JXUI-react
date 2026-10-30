import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useJXTheme } from '../../../context/JXThemeContext';
import { 
  Home, 
  Compass, 
  Layers, 
  Settings, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Menu, 
  X, 
  Sliders, 
  Folder, 
  FileText,
  Share2,
  Grid,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Bell
} from 'lucide-react';

// 16. RadialMenu
export const RadialMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { palette } = useJXTheme();
  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen(!open)} className={`w-10 h-10 rounded-full ${palette.bg} text-white flex items-center justify-center shadow-lg cursor-pointer`}>
        <Grid className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute -top-12 -left-12 w-32 h-32 pointer-events-none">
          <button className="pointer-events-auto absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center"><Home className="w-3.5 h-3.5 text-indigo-500" /></button>
          <button className="pointer-events-auto absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center"><Search className="w-3.5 h-3.5 text-indigo-500" /></button>
          <button className="pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center"><Settings className="w-3.5 h-3.5 text-indigo-500" /></button>
          <button className="pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center"><Share2 className="w-3.5 h-3.5 text-indigo-500" /></button>
        </div>
      )}
    </div>
  );
};
