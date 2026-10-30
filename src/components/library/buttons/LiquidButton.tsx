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

// 2. LiquidButton
export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
export const LiquidButton: React.FC<LiquidButtonProps> = ({ 
  children = 'Liquid Gel', 
  className = '', 
  ...props 
}) => {
  const { palette, getRadiusClass } = useJXTheme();
  return (
    <button
      className={`relative overflow-hidden px-5 py-2.5 font-semibold text-sm text-white ${palette.bg} ${getRadiusClass('pill')} shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 group cursor-pointer ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-spin-slow" />
        {children}
      </span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
      <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md bg-white/20 pointer-events-none" />
    </button>
  );
};
