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

// 4. SpringButton
export interface SpringButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
export const SpringButton: React.FC<SpringButtonProps> = ({ children = 'Spring Press', className = '', ...props }) => {
  const { palette, getRadiusClass } = useJXTheme();
  return (
    <button
      className={`px-4 py-2 text-sm font-semibold text-white ${palette.bg} ${getRadiusClass('control')} shadow-md hover:-translate-y-0.5 active:translate-y-1 active:scale-90 transition-all duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
