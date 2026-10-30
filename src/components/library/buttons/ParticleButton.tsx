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

// 9. ParticleButton
export interface ParticleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}
export const ParticleButton: React.FC<ParticleButtonProps> = ({ children = 'Particle Burst', className = '', onClick, ...props }) => {
  const { palette, getRadiusClass } = useJXTheme();
  const [burst, setBurst] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
    onClick?.(e);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className={`px-4 py-2 text-sm font-semibold text-white ${palette.bg} ${getRadiusClass('control')} shadow-md active:scale-95 transition-all cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </button>
      {burst && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"
              style={{
                transform: `rotate(${i * 45}deg) translate(${24 + (i % 2) * 8}px)`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
