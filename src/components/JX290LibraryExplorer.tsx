import React, { useState, useMemo, useEffect } from 'react';
import { useJXTheme } from '../context/JXThemeContext';
import { 
  UNIFIED_COMPONENTS_351, 
  UNIFIED_CATEGORIES_18, 
  UnifiedComponentSpec, 
  ComponentTier,
  UNIFIED_STATS 
} from '../data/unifiedCatalog';
import * as Library from './library';
import { 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  Layers, 
  Sliders, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Box,
  Terminal,
  Filter
} from 'lucide-react';

class SafePreviewBoundary extends React.Component<
  { name: string; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.warn(`Preview error in ${this.props.name}:`, error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-700 dark:text-amber-300 font-mono">
          &lt;{this.props.name} /&gt; (Preview Standby)
        </div>
      );
    }
    return this.props.children;
  }
}

export interface JX290LibraryExplorerProps {
  initialCategoryId?: string;
  initialComponentId?: string;
  onJumpToShowcase?: (specNumber: number) => void;
}

export const JX290LibraryExplorer: React.FC<JX290LibraryExplorerProps> = ({
  initialCategoryId,
  initialComponentId,
  onJumpToShowcase,
}) => {
  const { palette, getRadiusClass, pushToast } = useJXTheme();
  const [selectedSuite, setSelectedSuite] = useState<'all' | ComponentTier>('all');
  const [selectedCatId, setSelectedCatId] = useState<string>(initialCategoryId || 'buttons-actions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialComponentId) {
      const comp = UNIFIED_COMPONENTS_351.find((c) => c.id === initialComponentId);
      if (comp) {
        setSelectedCatId(comp.categoryId);
        setSelectedSuite('all');
        setSearchQuery('');
        setHighlightedId(comp.id);
        setTimeout(() => {
          const el = document.getElementById(`spec-${comp.id}`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
        setTimeout(() => setHighlightedId(null), 3000);
      }
    } else if (initialCategoryId) {
      setSelectedCatId(initialCategoryId);
    }
  }, [initialCategoryId, initialComponentId]);

  const activeCategory = useMemo(() => {
    return UNIFIED_CATEGORIES_18.find((c) => c.id === selectedCatId) || UNIFIED_CATEGORIES_18[0];
  }, [selectedCatId]);

  // Filtered components based on suite, category, and search query
  const displayedComponents = useMemo(() => {
    let list = UNIFIED_COMPONENTS_351;

    // Filter by suite tier
    if (selectedSuite !== 'all') {
      list = list.filter((c) => c.tier === selectedSuite);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.jxuiUpgrade.toLowerCase().includes(q) ||
          c.muiFlaw.toLowerCase().includes(q)
      );
    }

    // Filter by category
    return list.filter((c) => c.categoryId === selectedCatId);
  }, [selectedSuite, selectedCatId, searchQuery]);

  const handleCopyCode = (spec: UnifiedComponentSpec) => {
    navigator.clipboard.writeText(spec.jsxSnippet);
    setCopiedId(spec.id);
    pushToast({
      title: `Copied <${spec.name} />`,
      description: 'JSX snippet ready to paste into your codebase',
      variant: 'success',
    });
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Render dynamic component preview safely
  const renderComponentPreview = (spec: UnifiedComponentSpec) => {
    if (spec.tier === 'showcase') {
      return (
        <div className="flex flex-col items-center justify-center p-2 text-center gap-2 w-full">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase Spec #{String(spec.showcaseNumber).padStart(2, '0')}</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Full Interactive State Machine &amp; ARIA Contract
          </span>
          {onJumpToShowcase && spec.showcaseNumber && (
            <button
              type="button"
              onClick={() => onJumpToShowcase(spec.showcaseNumber!)}
              className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              <span>View Workbench Demo</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          )}
        </div>
      );
    }

    // System B atomic primitive rendering
    const libMap = Library as unknown as Record<string, React.ComponentType<any> | undefined>;
    let ComponentToRender = libMap[spec.name];
    if (!ComponentToRender) {
      if (spec.name === 'GlassInput') ComponentToRender = Library.FormGlassInput;
      else if (spec.name === 'GlassNotification') ComponentToRender = Library.FeedbackGlassNotification;
      else if (spec.name === 'GlassCard') ComponentToRender = Library.ContentGlassCard;
    }

    if (!ComponentToRender) {
      return (
        <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-400 font-mono">
          &lt;{spec.name} /&gt;
        </div>
      );
    }

    const Comp = ComponentToRender;
    return (
      <SafePreviewBoundary name={spec.name}>
        <div className="w-full flex items-center justify-center">
          <Comp text="Tactile Surface" />
        </div>
      </SafePreviewBoundary>
    );
  };

  return (
    <section id="jx-290-component-suite" className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 scroll-mt-16">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unified Master Architecture • {UNIFIED_STATS.totalComponents} Total Primitives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            18-Category Master Component Suite
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
            Seamlessly integrating all <strong>{UNIFIED_STATS.totalShowcases} Interactive Showcases</strong> (System A) with <strong>{UNIFIED_STATS.totalPrimitives} Modular Primitives</strong> (System B) across 18 unified categories with real-time previews, WCAG compliance, and zero CLS guarantees.
          </p>
        </div>

        {/* Global Search & Suite Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Suite Filter Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSelectedSuite('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedSuite === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All (351)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSuite('showcase')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedSuite === 'showcase'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Showcase (61)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSuite('primitive')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedSuite === 'primitive'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Modular (290)
            </button>
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-72">
            <div className={`relative flex items-center px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-xs ${getRadiusClass('control')}`}>
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all 351 components..."
                className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 18-Category Ribbon */}
      <div className="overflow-x-auto pb-3 mb-6 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max">
          {UNIFIED_CATEGORIES_18.map((cat) => {
            const isSelected = !searchQuery && selectedCatId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCatId(cat.id);
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? `${palette.bg} text-white border-transparent shadow-sm`
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span>{cat.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Overview Bar */}
      {!searchQuery && (
        <div className={`p-4 mb-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 ${getRadiusClass('card')} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span>{activeCategory.title}</span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800">
                {activeCategory.showcaseCount} Showcases + {activeCategory.primitiveCount} Primitives
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {activeCategory.description}
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 shrink-0">
            Displaying {displayedComponents.length} components
          </span>
        </div>
      )}

      {/* Search Result Counter */}
      {searchQuery && (
        <div className="mb-4 text-xs font-medium text-slate-500 flex items-center justify-between">
          <span>Found {displayedComponents.length} components matching &quot;{searchQuery}&quot;</span>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Component Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {displayedComponents.map((spec) => {
          const isCopied = copiedId === spec.id;
          const isShowcase = spec.tier === 'showcase';
          const isHighlighted = highlightedId === spec.id;

          return (
            <div
              key={spec.id}
              id={`spec-${spec.id}`}
              className={`p-5 bg-white dark:bg-slate-900 border transition-all duration-300 ${
                isHighlighted
                  ? 'border-indigo-500 ring-4 ring-indigo-500/30 scale-[1.02] shadow-2xl'
                  : isShowcase
                  ? 'border-indigo-200 dark:border-indigo-900/60 shadow-md ring-1 ring-indigo-500/10'
                  : 'border-slate-200 dark:border-slate-800 shadow-xs'
              } ${getRadiusClass(
                'card'
              )} hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 flex flex-col justify-between`}
            >
              <div>
                {/* Card Top Title & Suite Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{spec.name}</span>
                      {isShowcase && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                          Showcase
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {spec.subtitle}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded shrink-0 ${
                    isShowcase
                      ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {spec.badge}
                  </span>
                </div>

                {/* Interactive Live Component Viewport */}
                <div className="my-3.5 p-4 bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 rounded-xl min-h-[90px] flex items-center justify-center overflow-hidden">
                  {renderComponentPreview(spec)}
                </div>

                {/* MUI Flaw vs JXUI Upgrade Strip */}
                <div className="flex flex-col gap-1 text-[11px] mb-3">
                  <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 truncate">
                    <span className="font-bold uppercase text-[9px] px-1 bg-rose-50 dark:bg-rose-950/60 rounded">MUI</span>
                    <span className="truncate">{spec.muiFlaw}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 truncate">
                    <span className="font-bold uppercase text-[9px] px-1 bg-emerald-50 dark:bg-emerald-950/60 rounded">JXUI</span>
                    <span className="truncate">{spec.jxuiUpgrade}</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <code className="text-[10px] font-mono text-slate-400 truncate max-w-[170px]">
                  {spec.jsxSnippet.split('\n')[0]}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopyCode(spec)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCopied
                      ? 'bg-emerald-600 text-white border-transparent'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy JSX'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
