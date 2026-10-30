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

// 8. ShimmerButton
export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
export const ShimmerButton: React.FC<ShimmerButtonProps> = ({ children = 'Metallic Shimmer', className = '', ...props }) => {
  const { getRadiusClass } = useJXTheme();
  return (
    <button
      className={`relative overflow-hidden px-5 py-2.5 text-sm font-medium text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 ${getRadiusClass('control')} shadow-sm hover:border-slate-400 dark:hover:border-slate-700 transition-all cursor-pointer group ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-indigo-500/15 dark:via-white/20 to-transparent skew-x-12" />
    </button>
  );
};
