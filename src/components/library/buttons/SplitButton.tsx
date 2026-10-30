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

// 16. SplitButton
export interface SplitButtonProps {
  label?: string;
  options?: string[];
  onPrimaryClick?: () => void;
  onSelectOption?: (opt: string) => void;
}
export const SplitButton: React.FC<SplitButtonProps> = ({
  label = 'Commit Changes',
  options = ['Commit & Push', 'Commit to New Branch', 'Save Stash'],
  onPrimaryClick,
  onSelectOption,
}) => {
  const { palette, getRadiusClass } = useJXTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex rounded-lg shadow-sm">
      <button
        type="button"
        onClick={onPrimaryClick}
        className={`px-3.5 py-2 text-sm font-medium text-white ${palette.bg} rounded-l-lg border-r border-white/20 hover:brightness-110 active:scale-98 transition-all cursor-pointer`}
      >
        {label}
      </button>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`px-2 py-2 text-white ${palette.bg} rounded-r-lg hover:brightness-110 active:scale-98 transition-all cursor-pointer`}
      >
        <ChevronDown className="w-4 h-4" />
      </button>
      {open && (
        <div className={`absolute top-full mt-1.5 right-0 z-30 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl ${getRadiusClass('control')} py-1`}>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onSelectOption?.(opt);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
