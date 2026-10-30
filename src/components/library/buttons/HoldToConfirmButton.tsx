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

// 11. HoldToConfirmButton
export interface HoldToConfirmButtonProps {
  label?: string;
  onConfirm?: () => void;
  holdDurationMs?: number;
}
export const HoldToConfirmButton: React.FC<HoldToConfirmButtonProps> = ({
  label = 'Hold to Delete',
  onConfirm,
  holdDurationMs = 1500,
}) => {
  const { getRadiusClass } = useJXTheme();
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const handleStart = () => {
    startTimeRef.current = Date.now();
    timerRef.current = window.setInterval(() => {
      if (!startTimeRef.current) return;
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / holdDurationMs) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timerRef.current!);
        onConfirm?.();
        setProgress(0);
        startTimeRef.current = null;
      }
    }, 20);
  };

  const handleEnd = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(0);
    startTimeRef.current = null;
  };

  return (
    <button
      type="button"
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      className={`relative overflow-hidden px-4 py-2 text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 ${getRadiusClass('control')} cursor-pointer select-none active:scale-98`}
    >
      <div
        className="absolute inset-y-0 left-0 bg-rose-500/20 dark:bg-rose-500/30 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
      <div className="relative z-10 flex items-center gap-2">
        <Trash2 className="w-4 h-4" />
        <span>{label}</span>
        {progress > 0 && <span className="font-mono text-xs">{Math.round(progress)}%</span>}
      </div>
    </button>
  );
};
