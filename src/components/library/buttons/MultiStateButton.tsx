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

// 20. MultiStateButton
export interface MultiStateButtonProps {
  states?: string[];
  activeState?: string;
  onCycle?: (nextState: string) => void;
}
export const MultiStateButton: React.FC<MultiStateButtonProps> = ({
  states = ['Pending', 'In Review', 'Approved', 'Rejected'],
  activeState = 'Pending',
  onCycle,
}) => {
  const { getRadiusClass } = useJXTheme();
  const handleNext = () => {
    const idx = states.indexOf(activeState);
    const next = states[(idx + 1) % states.length];
    onCycle?.(next);
  };

  const getTone = (st: string) => {
    switch (st) {
      case 'Approved':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30';
      case 'Rejected':
        return 'bg-rose-500/10 text-rose-600 border-rose-500/30';
      case 'In Review':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <button
      type="button"
      onClick={handleNext}
      className={`px-3 py-1.5 text-xs font-semibold border ${getRadiusClass('pill')} ${getTone(activeState)} transition-all cursor-pointer flex items-center gap-1.5`}
    >
      <span className="w-2 h-2 rounded-full bg-current" />
      <span>Status: {activeState}</span>
    </button>
  );
};
