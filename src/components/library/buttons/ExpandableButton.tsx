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

// 13. ExpandableButton
export interface ExpandableButtonProps {
  icon?: React.ComponentType<{ className?: string }>;
  label?: string;
  onClick?: () => void;
}
export const ExpandableButton: React.FC<ExpandableButtonProps> = ({
  icon: Icon = Plus,
  label = 'Create New Project',
  onClick,
}) => {
  const { palette, getRadiusClass } = useJXTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-white ${palette.bg} ${getRadiusClass('pill')} shadow-md transition-all duration-300 cursor-pointer overflow-hidden`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${expanded ? 'max-w-xs opacity-100 pr-1' : 'max-w-0 opacity-0'}`}>
        {label}
      </span>
    </button>
  );
};
