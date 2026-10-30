import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useJXTheme } from '../../../context/JXThemeContext';
import { 
  Sparkles, 
  Check, 
  Loader2, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Command, 
  MousePointer, 
  Flame, 
  Share2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';

// 18. CommandButton
export interface CommandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  shortcut?: string;
}
export const CommandButton: React.FC<CommandButtonProps> = ({
  label = 'Search Project',
  shortcut = '⌘K',
  className = '',
  ...props
}) => {
  const { getRadiusClass } = useJXTheme();
  return (
    <button
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 ${getRadiusClass('control')} shadow-xs hover:border-indigo-500 transition-all cursor-pointer ${className}`}
      {...props}
    >
      <span>{label}</span>
      <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-500 dark:text-slate-400">
        {shortcut}
      </kbd>
    </button>
  );
};
