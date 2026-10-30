import React, { Suspense, lazy } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  ArrowUpRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  useJXTheme,
  ACCENT_PALETTES,
  AccentColor,
  RadiusScale,
} from '../../context/JXThemeContext';
import {
  COMPONENT_CATALOG,
  CategoryId,
  ComponentSpec,
} from '../../data/catalog';

// Lazy-loaded showcase & tool modules
const DesignTokenExporter = lazy(() =>
  import('../DesignTokenExporter').then((m) => ({ default: m.DesignTokenExporter }))
);
const AccessibilityAriaSection = lazy(() =>
  import('../AccessibilityAriaSection').then((m) => ({ default: m.AccessibilityAriaSection }))
);
const Category1Inputs = lazy(() =>
  import('../Category1Inputs').then((m) => ({ default: m.Category1Inputs }))
);
const Category2DataDisplay = lazy(() =>
  import('../Category2DataDisplay').then((m) => ({ default: m.Category2DataDisplay }))
);
const Category3And4FeedbackSurfaces = lazy(() =>
  import('../Category3And4FeedbackSurfaces').then((m) => ({ default: m.Category3And4FeedbackSurfaces }))
);
const Category5And6NavLayout = lazy(() =>
  import('../Category5And6NavLayout').then((m) => ({ default: m.Category5And6NavLayout }))
);
const Category7EnterpriseX = lazy(() =>
  import('../Category7EnterpriseX').then((m) => ({ default: m.Category7EnterpriseX }))
);
const Category8SignatureBlocks = lazy(() =>
  import('../Category8SignatureBlocks').then((m) => ({ default: m.Category8SignatureBlocks }))
);
const JX290LibraryExplorer = lazy(() =>
  import('../JX290LibraryExplorer').then((m) => ({ default: m.JX290LibraryExplorer }))
);

const SectionSkeletonFallback: React.FC<{ label?: string }> = ({
  label = 'Loading component suite...',
}) => (
  <div className="w-full min-h-[300px] rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center animate-pulse">
    <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-400">
      <Sparkles className="w-4 h-4 animate-spin" />
    </div>
    <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300">
      {label}
    </span>
    <span className="text-[10px] text-slate-400 font-mono mt-1">
      Zero CLS Dynamic Chunk Loading
    </span>
  </div>
);

const RADIUS_OPTIONS: { id: RadiusScale; label: string; scaleLabel: string }[] = [
  { id: 'sharp', label: 'Sharp (0px)', scaleLabel: '0.5x' },
  { id: 'sm', label: 'Crisp (8px)', scaleLabel: '0.75x' },
  { id: 'md', label: 'Default (12px)', scaleLabel: '1.0x' },
  { id: 'lg', label: 'Soft (16px)', scaleLabel: '1.35x' },
  { id: 'xl', label: 'Ultra (24px)', scaleLabel: '1.75x' },
];

export interface AppWorkbenchProps {
  activeCategory: CategoryId | 'all';
  setActiveCategory: (cat: CategoryId | 'all') => void;
  selectedExplorerCatId?: string;
  selectedExplorerCompId?: string;
  onJumpToComponent: (spec: ComponentSpec) => void;
  onCopyInstall: () => void;
  copiedInstall: boolean;
  onTriggerToast: () => void;
  showEncyclopedia: boolean;
  onToggleEncyclopedia: () => void;
  encyclopediaFilter: string;
  onEncyclopediaFilterChange: (q: string) => void;
  encyclopediaItems: ComponentSpec[];
  springPressActive: boolean;
  onToggleSpringPress: () => void;
  haloFocusActive: boolean;
  onToggleHaloFocus: () => void;
}

export const AppWorkbench: React.FC<AppWorkbenchProps> = ({
  activeCategory,
  setActiveCategory,
  selectedExplorerCatId,
  selectedExplorerCompId,
  onJumpToComponent,
  onCopyInstall,
  copiedInstall,
  onTriggerToast,
  showEncyclopedia,
  onToggleEncyclopedia,
  encyclopediaFilter,
  onEncyclopediaFilterChange,
  encyclopediaItems,
  springPressActive,
  onToggleSpringPress,
  haloFocusActive,
  onToggleHaloFocus,
}) => {
  const {
    accent,
    setAccent,
    radiusScale,
    setRadiusScale,
    compareMode,
    setCompareMode,
  } = useJXTheme();

  return (
    <main className="w-full flex-1 px-4 sm:px-8 py-6 sm:py-8 space-y-8 sm:space-y-12 max-w-7xl mx-auto">
      {/* Top Specular Ambient Glow Layer */}
      <div className="relative w-full overflow-hidden pt-2">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] h-[340px] bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* 1. HERO HEADER WITH LIVE ARCHITECTURAL COMPARISON STATS */}
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                <span>Next-Gen Enterprise React Component System</span>
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <span className="font-mono text-[11px] opacity-90">MUI Core · Lab · X Parity</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Reimagining Every Material UI Component.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                61 flagship showcases + 290 atomic primitives with zero runtime CSS overhead, native
                physics spring damped transitions (200ms), 3px roving tactile focus rings, and full React
                19 concurrent actions.
              </p>
            </div>

            {/* Quick NPM Install Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-950 text-slate-100 font-mono text-xs border border-slate-800 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400 select-none">$</span>
                  <span className="text-slate-200">npm i @jxui/react</span>
                </div>
                <button
                  type="button"
                  onClick={onCopyInstall}
                  aria-label="Copy npm install command"
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedInstall ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={onToggleEncyclopedia}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs cursor-pointer"
              >
                <span>61 Architectural Flaws</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                  vs JXUI
                </span>
              </button>
            </div>
          </div>

          {/* 3 Key Pillar Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800/70 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  CSS Engine &amp; Styling
                </span>
                <span className="px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[10px] font-bold">
                  MUI: Emotion (14kB)
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero-Runtime CSS Variables + Tailwind</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                No CSS-in-JS compilation stalls; sub-millisecond SSR hydration.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800/70 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  Interactions &amp; Haptics
                </span>
                <span className="px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                  MUI: CSS Ripple
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Tactile Damped Spring Physics (200ms)</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Natural mass, damping scale(0.98), and 3px roving focus halos.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800/70 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  TypeScript &amp; React 19
                </span>
                <span className="px-1.5 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-[10px] font-bold">
                  MUI: React 17/18
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Native React 19 Actions &amp; TS 7.0 Parity</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Zero type mismatch with 'as', strict polymorphic component slots.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RUNTIME THEME STUDIO & CONTROLS TOOLBAR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Palette Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              Accent:
            </span>
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {(Object.keys(ACCENT_PALETTES) as AccentColor[]).map((key) => {
                const pal = ACCENT_PALETTES[key];
                const active = accent === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAccent(key)}
                    style={{ backgroundColor: pal.hex }}
                    title={`${pal.name} Palette`}
                    className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                      active
                        ? 'ring-2 ring-indigo-500 ring-offset-2 scale-110'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Radius Scale Multipliers */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              Radius:
            </span>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              {RADIUS_OPTIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRadiusScale(r.id)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    radiusScale === r.id
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Compare Mode */}
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              View:
            </span>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setCompareMode('jxui')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  compareMode === 'jxui'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                JXUI Pure
              </button>
              <button
                type="button"
                onClick={() => setCompareMode('split')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  compareMode === 'split'
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                MUI vs JXUI Split
              </button>
            </div>
          </div>
        </div>

        {/* Tactile & Toast Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleSpringPress}
            title={springPressActive ? 'Spring Press Physics Active (scale 0.98)' : 'Physics Springs Disabled'}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
              springPressActive
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-bold'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-indigo-500" />
            <span>Spring (200ms)</span>
          </button>

          <button
            type="button"
            onClick={onToggleHaloFocus}
            title={haloFocusActive ? '3px Roving Tactile Focus Halos Active' : 'Focus Halos Disabled'}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
              haloFocusActive
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-bold'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-500" />
            <span>3px Focus Halo</span>
          </button>

          <button
            type="button"
            onClick={onTriggerToast}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            Test 3D Toast
          </button>

          <button
            type="button"
            onClick={() => {
              setAccent('indigo');
              setRadiusScale('md');
              setCompareMode('jxui');
              onToggleSpringPress();
              onToggleHaloFocus();
            }}
            title="Reset Studio to Defaults"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Expandable Full 61-Component Encyclopedia */}
      <AnimatePresence initial={false}>
        {showEncyclopedia && (
          <motion.section
            id="jx-encyclopedia-section"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            className="scroll-mt-24 overflow-hidden p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Complete 61-Component Architectural Encyclopedia (#01–#61)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every component’s legacy Material UI flaw, JXUI ergonomic upgrade, and live jump link.
                </p>
              </div>
              <input
                type="text"
                value={encyclopediaFilter}
                onChange={(e) => onEncyclopediaFilterChange(e.target.value)}
                placeholder="Search all 61 component specs..."
                aria-label="Search all 61 component specifications"
                className="w-full sm:w-72 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
              />
            </div>

            <div className="max-h-96 overflow-y-auto border border-slate-200/80 dark:border-slate-800 rounded-xl divide-y divide-slate-200/70 dark:divide-slate-800">
              {encyclopediaItems.map((spec) => (
                <div
                  key={spec.id}
                  className="p-3.5 sm:p-4 bg-slate-50/40 dark:bg-slate-950/30 hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        #{String(spec.number).padStart(2, '0')}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {spec.name}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        · {spec.subtitle}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      <strong className="text-rose-600 dark:text-rose-400">MUI Flaw:</strong>{' '}
                      {spec.muiFlaw}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        JXUI Upgrade:
                      </strong>{' '}
                      {spec.jxuiUpgrade}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onJumpToComponent(spec)}
                    className="self-start inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400 shrink-0 cursor-pointer"
                  >
                    <span>Inspect Live</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3. LIVE COMPONENT SHOWCASE & INTERACTIVE PLAYGROUND */}
      <Suspense fallback={<SectionSkeletonFallback label="Hydrating interactive component showcase batches..." />}>
        <div id="interactive-playground" className="space-y-12">
          {/* Category 1: Inputs */}
          {(activeCategory === 'all' || activeCategory === 'inputs') && (
            <section className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[11px] font-bold">
                      BATCH 01
                    </span>
                    <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Inputs &amp; Tactile Controls (14 Components)
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Replaces notched outlines, ALL-CAPS buttons, and tiny steppers with zero-shift morphing and card selection modes.
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-400">#01 – #14</span>
              </div>
              <Category1Inputs />
            </section>
          )}

          {/* Category 2: Data Display */}
          {(activeCategory === 'all' || activeCategory === 'data-display') && (
            <section className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[11px] font-bold">
                      BATCH 02
                    </span>
                    <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Data Display &amp; Enterprise Grids (9 Components)
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Compact avatars, virtualized zero-layout-shift tables, magnetic chips, and keyboard-first inspection cards.
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-400">#15 – #23</span>
              </div>
              <Category2DataDisplay />
            </section>
          )}

          {/* Category 3 & 4: Feedback & Dynamic Surfaces */}
          {(activeCategory === 'all' || activeCategory === 'feedback' || activeCategory === 'surfaces') && (
            <section className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[11px] font-bold">
                      BATCH 03 &amp; 04
                    </span>
                    <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Feedback &amp; Dynamic Surfaces (11 Components)
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Stacked Sonner-style 3D spatial toast notifications, spring dialog sheets, fluid accordions, and tactile Bento spotlight cards.
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-400">#24 – #34</span>
              </div>
              <Category3And4FeedbackSurfaces
                activeCategoryFilter={
                  activeCategory === 'feedback'
                    ? 'feedback'
                    : activeCategory === 'surfaces'
                    ? 'surfaces'
                    : 'all'
                }
              />
            </section>
          )}

          {/* Category 5 & 6: Navigation, Bento Layouts & Lab Primitives */}
          {(activeCategory === 'all' || activeCategory === 'navigation' || activeCategory === 'layout-utils') && (
            <section className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[11px] font-bold">
                      BATCH 05 &amp; 06
                    </span>
                    <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Navigation, Bento Layouts &amp; Lab Primitives (16 Components)
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Floating mobile pill docks, collapsible breadcrumbs, vertical desktop navigation rails, asymmetric Bento grids, and audit timelines.
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-400">#35 – #50</span>
              </div>
              <Category5And6NavLayout
                activeCategoryFilter={
                  activeCategory === 'navigation'
                    ? 'navigation'
                    : activeCategory === 'layout-utils'
                    ? 'layout-utils'
                    : 'all'
                }
              />
            </section>
          )}

          {/* Category 7: JXUI X Enterprise */}
          {(activeCategory === 'all' || activeCategory === 'enterprise-x') && (
            <section className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[11px] font-bold">
                      BATCH 07
                    </span>
                    <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      JXUI X — Enterprise Suite (5 Flagship Suites)
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Notion/Linear hybrid DataGrid, Natural Language DateRangePicker, interactive SVG telemetry charts, TreeView explorer, and Slash Editor.
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-400">#51 – #55</span>
              </div>
              <Category7EnterpriseX />
            </section>
          )}

          {/* Category 8: Signature Composed Blocks */}
          {(activeCategory === 'all' || activeCategory === 'signature-blocks') && (
            <section className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[11px] font-bold">
                      BATCH 08
                    </span>
                    <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Signature Composed Blocks &amp; Next-Gen Elements (6 Hero Blocks)
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Multi-component compositions built from @jxui/react primitives: proximity-magnified floating glass docks, SaaS pricing matrices, canary traffic splitters, 48-bar audio scrubbers, and FIDO2 passkey vaults.
                  </p>
                </div>
                <span className="font-mono text-xs text-slate-400">#56 – #61</span>
              </div>
              <Category8SignatureBlocks />
            </section>
          )}
        </div>
      </Suspense>

      {/* 351 Master Component Suite Explorer (18 Categories • Showcases + Primitives) */}
      <Suspense fallback={<SectionSkeletonFallback label="Loading 351 Component Suite Explorer..." />}>
        <JX290LibraryExplorer
          initialCategoryId={selectedExplorerCatId}
          initialComponentId={selectedExplorerCompId}
          onJumpToShowcase={(specNumber) => {
            const spec = COMPONENT_CATALOG.find((s) => s.number === specNumber);
            if (spec) onJumpToComponent(spec);
          }}
        />
      </Suspense>

      {/* Design Token Exporter Module */}
      <Suspense fallback={null}>
        <div id="jx-design-token-exporter" className="scroll-mt-20">
          <DesignTokenExporter />
        </div>
      </Suspense>

      {/* Accessibility & ARIA Standards WCAG 2.1 AA Checklist */}
      <Suspense fallback={null}>
        <div id="jx-accessibility-aria-standards" className="scroll-mt-20">
          <AccessibilityAriaSection onJumpToComponent={onJumpToComponent} />
        </div>
      </Suspense>
    </main>
  );
};
