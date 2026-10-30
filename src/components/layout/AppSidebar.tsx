import React from 'react';
import {
  Search,
  Sparkles,
  Github,
  Box,
  ArrowUpRight,
  ShieldCheck,
  X,
  Sliders,
  BarChart3,
  Bell,
  Layers,
  Compass,
  LayoutGrid,
  Workflow,
} from 'lucide-react';
import { CATEGORIES, CategoryId } from '../../data/catalog';

export interface AppSidebarProps {
  activeCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  sidebarQuery: string;
  onSidebarQueryChange: (q: string) => void;
  filteredCount: number;
  mobileSidebarOpen: boolean;
  onCloseMobileSidebar: () => void;
  currentView: 'workbench' | 'github-page';
  onNavigateToSection: (sectionId: string) => void;
  onJumpToElementId: (id: string, catId?: CategoryId) => void;
}

const CATEGORY_ICONS: Record<CategoryId, React.ComponentType<{ className?: string }>> = {
  inputs: Sliders,
  'data-display': BarChart3,
  feedback: Bell,
  surfaces: Layers,
  navigation: Compass,
  'layout-utils': LayoutGrid,
  'enterprise-x': Sparkles,
  'signature-blocks': Workflow,
};

const CATEGORY_SUB_ITEMS: Record<CategoryId, { label: string; id: string }[]> = {
  inputs: [
    { label: 'Button & Fab', id: 'jx-button' },
    { label: 'Checkbox & Switch', id: 'jx-checkbox' },
    { label: 'TextField & Autocomplete', id: 'jx-text-field' },
    { label: 'Rating & Sliders', id: 'jx-rating' },
  ],
  'data-display': [
    { label: 'Badge, Chip & Avatar', id: 'jx-badge' },
    { label: 'Table & Data Grid', id: 'jx-table' },
    { label: 'Tooltip & Divider', id: 'jx-tooltip' },
  ],
  feedback: [
    { label: 'Alert & Toast Queue', id: 'jx-alert' },
    { label: 'Spring Dialog & Backdrop', id: 'jx-dialog' },
    { label: 'Zero-Shift Skeletons', id: 'jx-skeleton' },
  ],
  surfaces: [
    { label: 'Spotlight Bento Card', id: 'jx-card' },
    { label: 'Spring Accordion', id: 'jx-accordion' },
    { label: 'Semantic Paper Tiers', id: 'jx-paper' },
  ],
  navigation: [
    { label: 'Pill Tabs & Stepper', id: 'jx-tabs' },
    { label: 'Navigation Rail & Drawer', id: 'jx-navigation-rail' },
    { label: 'Breadcrumbs & SpeedDial', id: 'jx-breadcrumbs' },
  ],
  'layout-utils': [
    { label: 'Responsive 12-Col Grid', id: 'jx-grid' },
    { label: 'FLIP Masonry Packing', id: 'jx-masonry' },
    { label: 'Audit Timeline Track', id: 'jx-timeline' },
  ],
  'enterprise-x': [
    { label: 'Notion/Linear DataGrid', id: 'jx-data-grid' },
    { label: 'NL DateRangePicker', id: 'jx-date-range-picker' },
    { label: 'Magnetic SVG Charts', id: 'jx-charts' },
  ],
  'signature-blocks': [
    { label: 'macOS Magnetic Dock', id: 'jx-dock' },
    { label: 'Canary Traffic Splitter', id: 'canary-traffic-splitter' },
    { label: 'Passkey Vault & Waveform', id: 'passkey-vault' },
  ],
};

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeCategory,
  onSelectCategory,
  sidebarQuery,
  onSidebarQueryChange,
  filteredCount,
  mobileSidebarOpen,
  onCloseMobileSidebar,
  currentView,
  onNavigateToSection,
  onJumpToElementId,
}) => {
  const content = (
    <div className="flex flex-col h-full justify-between overflow-hidden">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <img
              src="./favicon.png"
              alt="JXUI Logo"
              className="w-9 h-9 rounded-xl object-contain shadow-sm ring-1 ring-slate-200/80 dark:ring-slate-800 bg-slate-950/5 dark:bg-white/5"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                  JXUI
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] font-semibold">
                  v2.4.0
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">@jxui/react</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onCloseMobileSidebar}
            aria-label="Close sidebar"
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input Filter */}
        <div className="px-4 py-3 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={sidebarQuery}
              onChange={(e) => onSidebarQueryChange(e.target.value)}
              placeholder="Filter components..."
              aria-label="Filter components list"
              className="w-full pl-8 pr-10 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 border border-transparent focus:border-indigo-500/40 transition-colors"
            />
            <span className="absolute right-2 px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-[10px] font-mono font-medium text-slate-600 dark:text-slate-300">
              {filteredCount}
            </span>
          </div>
        </div>

        {/* Category Batches Nav List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-xs">
          {/* All Components reset pill */}
          <button
            type="button"
            onClick={() => {
              onSelectCategory('all');
              onCloseMobileSidebar();
            }}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>All 61 Components</span>
            </span>
            <span className="font-mono text-[10px]">61</span>
          </button>

          {/* 290-Component Suite Quick Jump */}
          <button
            type="button"
            onClick={() => onNavigateToSection('jx-290-component-suite')}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-100/80 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>290 Suite (18 Cats)</span>
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 bg-indigo-200/80 dark:bg-indigo-800 rounded-full font-bold">290</span>
          </button>

          {/* Official GitHub Page & Showcase Jump */}
          <button
            type="button"
            onClick={() => onNavigateToSection('github-page')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              currentView === 'github-page'
                ? 'bg-[#238636] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <span className="flex items-center gap-2">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Page &amp; Docs</span>
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/20 text-emerald-600 dark:text-emerald-400 font-bold">v2.4</span>
          </button>

          {/* 8 Batches */}
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Box;
            const subItems = CATEGORY_SUB_ITEMS[cat.id] || [];
            const isCatActive = activeCategory === cat.id;

            return (
              <div key={cat.id} className="space-y-1">
                <div
                  onClick={() => {
                    onSelectCategory(cat.id);
                  }}
                  className={`px-2 py-1 flex items-center justify-between rounded-lg cursor-pointer transition-colors ${
                    isCatActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.shortTitle}</span>
                  </span>
                  <span className="font-mono text-[10px] opacity-75">{cat.count}</span>
                </div>

                <div className="space-y-0.5 pl-3 border-l border-slate-200/70 dark:border-slate-800 ml-2">
                  {subItems.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => onJumpToElementId(sub.id, cat.id)}
                      className="w-full flex items-center justify-between px-2 py-1 rounded-md text-[11px] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors text-left truncate cursor-pointer"
                    >
                      <span className="truncate">{sub.label}</span>
                      <ArrowUpRight className="w-2.5 h-2.5 opacity-40 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Compliance & Framework Footer */}
      <div className="p-4 border-t border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>WCAG 2.1 AA Certified</span>
          </span>
          <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">100%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-emerald-500 h-full w-full rounded-full" />
        </div>
        <p className="text-[10px] text-slate-400 font-mono">
          Strict zero-runtime CSS · React 19 Actions
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Nav Rail */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 h-screen sticky top-0 z-40">
        {content}
      </aside>

      {/* Mobile Slide-over Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
          className="fixed inset-0 z-50 lg:hidden flex"
        >
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobileSidebar}
          />
          <div className="relative w-80 max-w-full bg-white dark:bg-slate-900 shadow-2xl h-full z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
