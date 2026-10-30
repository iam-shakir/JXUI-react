import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useJXTheme } from '../../../context/JXThemeContext';
import { Table, Download, Filter, Columns, ChevronDown, Check, Edit2, Search } from 'lucide-react';

// 3. ExpandableTable
export const ExpandableTable: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border rounded-xl p-2 text-xs">
      <div onClick={() => setExpanded(!expanded)} className="flex items-center justify-between cursor-pointer font-bold">
        <span>Design Token Palette</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </div>
      {expanded && <div className="pt-2 text-slate-500">5 dynamic accents: Indigo, Violet, Emerald, Rose, Ocean.</div>}
    </div>
  );
};
