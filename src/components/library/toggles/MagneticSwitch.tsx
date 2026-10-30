import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useJXTheme } from '../../../context/JXThemeContext';
import { Check, Minus, X, Trash2, Copy, Sparkles } from 'lucide-react';

// 3. MagneticSwitch
export const MagneticSwitch: React.FC = () => {
  const [active, setActive] = useState(true);
  return (
    <div onClick={() => setActive(!active)} className="relative w-14 h-7 bg-slate-200 dark:bg-slate-800 rounded-full p-1 cursor-pointer">
      <div className={`w-5 h-5 rounded-full bg-indigo-600 shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${active ? 'translate-x-7' : 'translate-x-0'}`} />
    </div>
  );
};
