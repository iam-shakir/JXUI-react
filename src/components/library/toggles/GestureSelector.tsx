import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useJXTheme } from '../../../context/JXThemeContext';
import { Check, Minus, X, Trash2, Copy, Sparkles } from 'lucide-react';

// 14. GestureSelector
export const GestureSelector: React.FC = () => {
  return (
    <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-500">
      Drag handle left / right to toggle
    </div>
  );
};
