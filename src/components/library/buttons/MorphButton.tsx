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

// 3. MorphButton (Zero-shift 3-state morphing: idle -> loading -> success)
export interface MorphButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status?: 'idle' | 'loading' | 'success';
  idleText?: string;
  loadingText?: string;
  successText?: string;
  onTrigger?: () => void;
}
export const MorphButton: React.FC<MorphButtonProps> = ({
  status = 'idle',
  idleText = 'Deploy Changes',
  loadingText = 'Deploying...',
  successText = 'Deployed!',
  onTrigger,
  className = '',
  ...props
}) => {
  const { palette, getRadiusClass } = useJXTheme();
  return (
    <button
      type="button"
      onClick={onTrigger}
      disabled={status === 'loading'}
      className={`relative min-w-[140px] px-4 py-2 text-sm font-medium transition-all duration-300 ${getRadiusClass('control')} cursor-pointer ${
        status === 'success'
          ? 'bg-emerald-600 text-white shadow-emerald-500/20'
          : `${palette.bg} text-white shadow-md active:scale-95`
      } ${className}`}
      {...props}
    >
      <div className="flex items-center justify-center gap-2 min-h-[20px]">
        {status === 'idle' && <span>{idleText}</span>}
        {status === 'loading' && (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{loadingText}</span>
          </>
        )}
        {status === 'success' && (
          <>
            <Check className="w-4 h-4 animate-scale-in" />
            <span>{successText}</span>
          </>
        )}
      </div>
    </button>
  );
};
