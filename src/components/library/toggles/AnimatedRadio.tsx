import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useJXTheme } from '../../../context/JXThemeContext';
import { Check, Minus, X, Trash2, Copy, Sparkles } from 'lucide-react';

// 7. AnimatedRadio
export const AnimatedRadio: React.FC = () => {
  const [selected, setSelected] = useState(true);
  return (
    <div onClick={() => setSelected(!selected)} className="w-5 h-5 rounded-full border-2 border-indigo-600 flex items-center justify-center cursor-pointer">
      {selected && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-scale-in" />}
    </div>
  );
};
