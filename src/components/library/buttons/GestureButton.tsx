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

// 19. GestureButton
export interface GestureButtonProps {
  onSwipeRight?: () => void;
  label?: string;
}
export const GestureButton: React.FC<GestureButtonProps> = ({
  onSwipeRight,
  label = 'Double Tap / Swipe',
}) => {
  const { palette, getRadiusClass } = useJXTheme();
  const [tapped, setTapped] = useState(false);

  const handleDoubleClick = () => {
    setTapped(true);
    onSwipeRight?.();
    setTimeout(() => setTapped(false), 800);
  };

  return (
    <button
      type="button"
      onDoubleClick={handleDoubleClick}
      className={`px-4 py-2 text-xs font-semibold text-white ${palette.bg} ${getRadiusClass('control')} shadow-md active:scale-95 transition-all cursor-pointer select-none`}
    >
      <div className="flex items-center gap-1.5">
        <MousePointer className="w-3.5 h-3.5" />
        <span>{tapped ? 'Gesture Detected!' : label}</span>
      </div>
    </button>
  );
};
