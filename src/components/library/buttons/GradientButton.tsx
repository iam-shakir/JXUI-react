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

// 7. GradientButton
export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
export const GradientButton: React.FC<GradientButtonProps> = ({ children = 'Gradient Aura', className = '', ...props }) => {
  const { palette, getRadiusClass } = useJXTheme();
  return (
    <button
      className={`px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r ${palette.gradient} ${getRadiusClass('control')} shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
