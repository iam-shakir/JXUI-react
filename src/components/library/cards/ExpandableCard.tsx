import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useJXTheme } from '../../../context/JXThemeContext';
import { Sparkles, ArrowUpRight, Check, Heart, ShoppingCart, TrendingUp } from 'lucide-react';

// 5. ExpandableCard
export const ExpandableCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div onClick={() => setExpanded(!expanded)} className="p-3 border rounded-xl cursor-pointer bg-white dark:bg-slate-900">
      <span className="text-xs font-bold">Click to {expanded ? 'Collapse' : 'Expand'}</span>
      {expanded && <p className="text-[11px] text-slate-500 mt-2">Expanded detail payload with zero layout shift.</p>}
    </div>
  );
};
