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

// 12. SlideToAction
export interface SlideToActionProps {
  onComplete?: () => void;
  label?: string;
  completedText?: string;
}
export const SlideToAction: React.FC<SlideToActionProps> = ({
  onComplete,
  label = 'Slide to unlock',
  completedText = 'Unlocked!',
}) => {
  const { palette, getRadiusClass } = useJXTheme();
  const [dragX, setDragX] = useState(0);
  const [completed, setCompleted] = useState(false);
  const maxDrag = 180;

  const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDragX(val);
    if (val >= maxDrag) {
      setCompleted(true);
      onComplete?.();
    }
  };

  return (
    <div className={`relative w-[260px] h-12 bg-slate-200 dark:bg-slate-800 ${getRadiusClass('pill')} p-1 flex items-center overflow-hidden select-none`}>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {completed ? completedText : label}
      </span>
      <div
        style={{ transform: `translateX(${dragX}px)` }}
        className={`relative z-10 w-10 h-10 ${palette.bg} text-white rounded-full flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing transition-transform`}
      >
        {completed ? <Check className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </div>
      {!completed && (
        <input
          type="range"
          min={0}
          max={maxDrag}
          value={dragX}
          onChange={handleDrag}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
        />
      )}
    </div>
  );
};
