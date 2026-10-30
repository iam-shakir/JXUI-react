import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  SplitSquareHorizontal,
  SlidersHorizontal,
  Settings2,
  BookOpen,
  Cpu,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ComponentSpec, CATEGORIES } from '../data/catalog';
import { useJXTheme } from '../context/JXThemeContext';
import { formatCopyableJsxCode } from '../utils/jxuiLogic';

export interface ComponentDocumentationProps {
  spec: ComponentSpec;
  children: React.ReactNode;
  muiBaselinePreview?: React.ReactNode;
  customJsx?: string;
  headerControls?: React.ReactNode;
  stateControls?: React.ReactNode;
  codeConfigPanel?: React.ReactNode;
  defaultShowCode?: boolean;
}

export const ComponentDocumentation: React.FC<ComponentDocumentationProps> = ({
  spec,
  children,
  muiBaselinePreview,
  customJsx,
  headerControls,
  stateControls,
  codeConfigPanel,
  defaultShowCode = false,
}) => {
  const { getRadiusClass, compareMode, pushToast } = useJXTheme();
  const [showCode, setShowCode] = useState(defaultShowCode);
  const [showSpecGuide, setShowSpecGuide] = useState(false);
  const [includeImports, setIncludeImports] = useState(true);
  const [copied, setCopied] = useState(false);

  const rawCode = customJsx || spec.jsxSnippet;
  const formattedCode = formatCopyableJsxCode(rawCode, spec.name, includeImports);
  const codeLines = formattedCode.split('\n');

  const categoryMeta = CATEGORIES.find((c) => c.id === spec.category);

  const handleCopy = () => {
    navigator.clipboard?.writeText(formattedCode).catch(() => {});
    setCopied(true);
    pushToast({
      title: `Copied ${spec.name} JSX`,
      description: 'Formatted jxui-react code copied to clipboard',
      variant: 'success',
    });
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      id={spec.id}
      aria-label={`${spec.name} Documentation Workbench`}
      className={`bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 jx-elevation-1 transition-all duration-200 ${getRadiusClass('card')} overflow-hidden scroll-mt-24 max-w-full`}
    >
      {/* Top Header Bar */}
      <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200/60 dark:border-slate-800/70 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>#{String(spec.number).padStart(2, '0')}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-700 dark:text-slate-300 font-sans font-medium">
              {spec.subtitle}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-0.5">
            {spec.name}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {headerControls}
          <button
            type="button"
            aria-expanded={showSpecGuide}
            onClick={() => setShowSpecGuide((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 border cursor-pointer ${getRadiusClass('control')} ${
              showSpecGuide
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{showSpecGuide ? 'Hide Explanation' : 'Explain Architecture'}</span>
          </button>
          <button
            type="button"
            aria-expanded={showCode}
            onClick={() => setShowCode((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 border cursor-pointer ${getRadiusClass('control')} ${
              showCode
                ? 'bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 dark:border-slate-100'
                : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{showCode ? 'Hide JSX Code' : 'View JSX Code'}</span>
          </button>
        </div>
      </div>

      {/* Architectural Comparison Notes Strip */}
      <div className="px-4 sm:px-6 py-3 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-200/60 dark:border-slate-800/60 space-y-1.5 text-xs leading-relaxed">
        <p className="text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-rose-600 dark:text-rose-400 mr-1.5">
            MUI Flaw:
          </span>
          {spec.muiFlaw}
        </p>
        <p className="text-slate-700 dark:text-slate-300">
          <span className="font-semibold text-emerald-600 dark:text-emerald-400 mr-1.5">
            JXUI Upgrade:
          </span>
          {spec.jxuiUpgrade}
        </p>
      </div>

      {/* Expandable Full Component Architecture & Props Explanation Drawer */}
      <AnimatePresence initial={false}>
        {showSpecGuide && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            className="overflow-hidden border-b border-slate-200/70 dark:border-slate-800 bg-indigo-50/35 dark:bg-indigo-950/20"
          >
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <Cpu className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>Drop-In MUI API + JXUI Props</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Replaces <code className="font-mono text-indigo-600 dark:text-indigo-400">{spec.name.replace(/^JX/, 'MUI ')}</code> in{' '}
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {categoryMeta?.title || 'JXUI Core'}
                  </span>
                  . Supports standard MUI props (<code className="font-mono">variant</code>, <code className="font-mono">size</code>, <code className="font-mono">color</code>, <code className="font-mono">disabled</code>, <code className="font-mono">className</code>) plus JXUI tokens (<code className="font-mono">spring</code>, <code className="font-mono">glass</code>, <code className="font-mono">halo</code>, <code className="font-mono">morphSuccess</code>).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Spring Physics &amp; WAI-ARIA Ergonomics</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Replaces Material ink ripples with tactile spring physics (<code className="font-mono">cubic-bezier(0.22, 1, 0.36, 1)</code>), zero-shift layout transitions, soft focus halos (<code className="font-mono">3px rgba(99,102,241,0.18)</code>), and full keyboard navigation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                  <Smartphone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Responsive Multi-Viewport Behavior</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Fluidly adapts across mobile (<code className="font-mono">390px</code>), tablet (<code className="font-mono">768px</code>), and desktop (<code className="font-mono">1440px</code>) with touch-friendly 40px+ hit targets, overflow-safe horizontal scroll containers, and adaptive grid reflow.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standardized Live State Controls Toolbar */}
      {stateControls && (
        <div className="px-4 sm:px-6 py-2.5 bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <SlidersHorizontal className="w-3 h-3 text-indigo-500" />
            Live State Controls
          </span>
          <div className="flex flex-wrap items-center gap-2">{stateControls}</div>
        </div>
      )}

      {/* Interactive Component Canvas (Supports Split-Compare Mode) */}
      {compareMode === 'split' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/70 dark:divide-slate-800/70">
          {/* Left Column: Legacy MUI Simulation */}
          <div className="lg:col-span-5 p-4 sm:p-6 bg-slate-100/50 dark:bg-slate-950/60 flex flex-col justify-between min-w-0">
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-4 pb-2 border-b border-slate-200/70 dark:border-slate-800">
                <span className="font-medium">Standard MUI Baseline (Legacy Ergonomics)</span>
                <span className="font-mono">@mui/material</span>
              </div>
              {muiBaselinePreview ? (
                muiBaselinePreview
              ) : (
                <div className="p-4 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-400 space-y-2">
                  <div className="uppercase tracking-wider font-mono text-[11px] px-3 py-1.5 border border-slate-400 dark:border-slate-600 inline-block text-slate-700 dark:text-slate-300">
                    LEGACY {spec.name.replace(/^JX/, 'MUI ')}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Exhibits standard Material specs: {spec.muiFlaw}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1.5 text-[11px] text-slate-500">
              <SplitSquareHorizontal className="w-3.5 h-3.5 shrink-0" />
              <span>Split-Compare active · Interact with the upgraded JXUI surface on the right</span>
            </div>
          </div>

          {/* Right Column: Upgraded JXUI Component */}
          <div className="lg:col-span-7 p-4 sm:p-6 min-w-0 overflow-x-auto">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                JXUI Enhanced Interactive Surface
              </span>
              <span className="font-mono">jxui-react</span>
            </div>
            {children}
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 min-w-0 overflow-x-auto">{children}</div>
      )}

      {/* Collapsible Formatted JSX Code Drawer + Optional Real-Time Configuration Panel */}
      <AnimatePresence initial={false}>
        {showCode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            className="overflow-hidden border-t border-slate-200/80 dark:border-slate-800 bg-slate-950 text-slate-100"
          >
            <div className="p-4 space-y-3.5">
              {codeConfigPanel && (
                <div
                  data-testid="jsx-code-config-panel"
                  className="rounded-xl bg-slate-900/95 border border-slate-800 p-3.5 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-indigo-300">
                    <span className="inline-flex items-center gap-1.5 font-semibold">
                      <Settings2 className="w-3.5 h-3.5 text-indigo-400" />
                      Real-Time JSX Prop Configuration Panel
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Updates live preview &amp; JSX output
                    </span>
                  </div>
                  {codeConfigPanel}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    jxui-react · Copy-Pasteable TypeScript JSX
                  </span>
                  <button
                    type="button"
                    onClick={() => setIncludeImports((v) => !v)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      includeImports
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {includeImports ? 'Imports: Included' : 'Imports: Hidden'}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy JSX
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                <code>
                  {codeLines.map((line, i) => (
                    <div key={i} className="table-row">
                      <span className="table-cell select-none pr-4 text-right text-[10px] text-slate-600">
                        {i + 1}
                      </span>
                      <span className="table-cell whitespace-pre">{line}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

