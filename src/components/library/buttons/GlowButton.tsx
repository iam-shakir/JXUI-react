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

// 6. GlowButton
export interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
export const GlowButton: React.FC<GlowButtonProps> = ({ children = 'Luminescent Glow', className = '', ...props }) => {
  const { palette, getRadiusClass } = useJXTheme();
  return (
    <button
      className={`relative group px-5 py-2.5 text-sm font-semibold text-white ${palette.bg} ${getRadiusClass('control')} cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] ${className}`}
      {...props}
    >
      <div className={`absolute -inset-0.5 ${palette.bg} rounded-inherit blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
      {children}
    </button>
  );
};
