import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useJXTheme } from '../../../context/JXThemeContext';
import { Move, GripVertical, UploadCloud, Calendar, Grid } from 'lucide-react';

// 4. SortableGrid
export const SortableGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="p-2 border rounded text-center cursor-grab">Tile A</div>
      <div className="p-2 border rounded text-center cursor-grab">Tile B</div>
    </div>
  );
};
