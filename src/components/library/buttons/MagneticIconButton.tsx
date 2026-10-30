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

// 10. MagneticIconButton
export interface MagneticIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ComponentType<{ className?: string }>;
}
export const MagneticIconButton: React.FC<MagneticIconButtonProps> = ({ icon: Icon = Sparkles, className = '', ...props }) => {
  const { palette, getRadiusClass } = useJXTheme();
  return (
    <button
      className={`w-10 h-10 flex items-center justify-center text-white ${palette.bg} ${getRadiusClass('pill')} shadow-md hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer ${className}`}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};
