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

// 17. AnimatedButtonGroup
export interface AnimatedButtonGroupProps {
  options?: string[];
  value?: string;
  onChange?: (val: string) => void;
}
export const AnimatedButtonGroup: React.FC<AnimatedButtonGroupProps> = ({
  options = ['Day', 'Week', 'Month', 'Year'],
  value = 'Week',
  onChange,
}) => {
  const { palette, getRadiusClass } = useJXTheme();
  return (
    <div className={`inline-flex p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${getRadiusClass('pill')}`}>
      {options.map((opt) => {
        const isSelected = opt === value;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange?.(opt)}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              isSelected
                ? `${palette.bg} text-white shadow-sm`
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};
