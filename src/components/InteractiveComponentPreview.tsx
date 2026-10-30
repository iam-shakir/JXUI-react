import React, { useState } from 'react';
import { UnifiedComponentSpec } from '../data/unifiedCatalog';
import { useJXTheme } from '../context/JXThemeContext';
import * as Library from './library';
import { 
  Check, 
  Sparkles, 
  Star, 
  Volume2, 
  Sliders, 
  Layers, 
  ExternalLink,
  RefreshCw,
  Bell,
  CheckCircle2,
  X
} from 'lucide-react';

interface InteractiveComponentPreviewProps {
  spec: UnifiedComponentSpec;
  onOpenDocs?: (spec: UnifiedComponentSpec) => void;
  onJumpToShowcase?: (showcaseNumber: number) => void;
}

export const InteractiveComponentPreview: React.FC<InteractiveComponentPreviewProps> = ({
  spec,
  onOpenDocs,
  onJumpToShowcase,
}) => {
  const { palette, getRadiusClass } = useJXTheme();

  // Local interactive states
  const [clickCount, setClickCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('Tactile Design');
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [sliderVal, setSliderVal] = useState<number>(75);
  const [starRating, setStarRating] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<'preview' | 'telemetry' | 'audit'>('preview');
  const [progressVal, setProgressVal] = useState<number>(68);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<number>(1);

  // 1. Buttons & Fabs
  if (spec.interactiveType === 'button') {
    return (
      <div className="flex flex-col items-center justify-center gap-2.5 py-1">
        <button
          type="button"
          onClick={() => setClickCount((c) => c + 1)}
          className={`px-4 py-2 text-xs font-semibold text-white rounded-xl shadow-md transition-all duration-150 active:scale-95 cursor-pointer flex items-center gap-2 ${palette.bg} hover:opacity-90`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{spec.name}</span>
          <span className="px-1.5 py-0.2 bg-white/25 rounded-full text-[10px] font-mono">
            {clickCount > 0 ? `${clickCount}x` : 'Click me'}
          </span>
        </button>
        <span className="text-[10px] text-slate-400 font-mono">
          Tactile spring bounce: 0 layout shift
        </span>
      </div>
    );
  }

  // 2. Inputs & Forms
  if (spec.interactiveType === 'input') {
    return (
      <div className="w-full max-w-[240px] flex flex-col gap-1.5 py-1">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type value..."
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => setInputValue('')}
              className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
          <span>{inputValue.length} chars</span>
          <span className="text-emerald-500 font-medium">Valid</span>
        </div>
      </div>
    );
  }

  // 3. Toggles & Switches
  if (spec.interactiveType === 'switch') {
    return (
      <div className="flex items-center gap-3 py-1">
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
            isChecked ? palette.bg : 'bg-slate-300 dark:bg-slate-700'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
              isChecked ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {isChecked ? 'Enabled' : 'Disabled'}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Zero CLS spring</span>
        </div>
      </div>
    );
  }

  // 4. Sliders & Knobs
  if (spec.interactiveType === 'slider') {
    return (
      <div className="w-full max-w-[240px] flex flex-col gap-1.5 py-1">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Scalar Metric</span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400">{sliderVal}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderVal}
          onChange={(e) => setSliderVal(Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[9px] text-slate-400 font-mono">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    );
  }

  // 5. Star Rating
  if (spec.interactiveType === 'rating') {
    return (
      <div className="flex flex-col items-center gap-1.5 py-1">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setStarRating(star)}
              className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
            >
              <Star
                className={`w-4 h-4 ${
                  star <= starRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'
                }`}
              />
            </button>
          ))}
        </div>
        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
          {starRating === 5 ? 'Exceptional (5.0)' : starRating === 4 ? 'Delightful (4.0)' : 'Solid (3.0)'}
        </span>
      </div>
    );
  }

  // 6. Tabs & Steppers
  if (spec.interactiveType === 'tabs') {
    return (
      <div className="flex flex-col gap-2 w-full max-w-[240px] py-1">
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[11px] font-semibold">
          {(['preview', 'telemetry', 'audit'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1 rounded-md capitalize transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-2 bg-white/60 dark:bg-slate-900/60 rounded border border-slate-200/50 dark:border-slate-800 text-[10px] text-slate-500 font-mono text-center">
          Active: [{activeTab.toUpperCase()}]
        </div>
      </div>
    );
  }

  // 7. Toast & Notifications
  if (spec.interactiveType === 'toast') {
    return (
      <div className="flex flex-col items-center gap-2 py-1">
        <button
          type="button"
          onClick={() => {
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 2400);
          }}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/40"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Trigger Toast</span>
        </button>
        {toastVisible && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-lg animate-bounce">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Success: Action Recorded</span>
          </div>
        )}
      </div>
    );
  }

  // 8. Progress & Skeletons
  if (spec.interactiveType === 'progress') {
    return (
      <div className="w-full max-w-[240px] flex flex-col gap-2 py-1">
        <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Hydration State</span>
          <span className="font-mono text-emerald-600">{progressVal}%</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${palette.bg} transition-all duration-300`}
            style={{ width: `${progressVal}%` }}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setProgressVal((p) => (p >= 100 ? 25 : p + 25))}
            className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
          >
            <RefreshCw className="w-2.5 h-2.5" />
            <span>Step Progress</span>
          </button>
        </div>
      </div>
    );
  }

  // 9. Tables & DataGrids
  if (spec.interactiveType === 'table') {
    return (
      <div className="w-full max-w-[240px] text-[11px] border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
        <div className="grid grid-cols-3 bg-slate-100 dark:bg-slate-800 p-1.5 font-bold text-slate-700 dark:text-slate-300 text-[10px]">
          <span>Row</span>
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>
        {[1, 2].map((r) => (
          <div
            key={r}
            onClick={() => setSelectedRow(r)}
            className={`grid grid-cols-3 p-1.5 border-t border-slate-100 dark:border-slate-800/60 cursor-pointer transition-colors ${
              selectedRow === r
                ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <span>#0{r}</span>
            <span className="text-emerald-500 font-medium">Ready</span>
            <span className="text-right text-[10px]">{selectedRow === r ? '✓ Active' : 'Select'}</span>
          </div>
        ))}
      </div>
    );
  }

  // 10. Cards & Glass Surfaces
  if (spec.interactiveType === 'card') {
    return (
      <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md flex flex-col gap-1.5 w-full max-w-[240px]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-white">Specular Surface</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            Glass FX
          </span>
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
          Tactile spring hover response
        </p>
      </div>
    );
  }

  // 11. System B Primitive Lookup or Fallback
  if (spec.tier === 'primitive') {
    const libMap = Library as unknown as Record<string, React.ComponentType<any> | undefined>;
    let ComponentToRender = libMap[spec.name];
    if (!ComponentToRender) {
      if (spec.name === 'GlassInput') ComponentToRender = Library.FormGlassInput;
      else if (spec.name === 'GlassNotification') ComponentToRender = Library.FeedbackGlassNotification;
      else if (spec.name === 'GlassCard') ComponentToRender = Library.ContentGlassCard;
    }

    if (ComponentToRender) {
      const Comp = ComponentToRender;
      return (
        <div className="w-full flex items-center justify-center py-1">
          <Comp text="Tactile Surface" />
        </div>
      );
    }
  }

  // Default Showcase Indicator
  return (
    <div className="flex flex-col items-center justify-center p-2 text-center gap-1.5 w-full">
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 shadow-xs">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Live State Preview</span>
      </div>
      <span className="text-[11px] text-slate-500 dark:text-slate-400">
        {spec.name} • {spec.difficulty}
      </span>
      {spec.showcaseNumber && onJumpToShowcase && (
        <button
          type="button"
          onClick={() => onJumpToShowcase(spec.showcaseNumber!)}
          className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
        >
          <span>Workbench Live Showcase</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
