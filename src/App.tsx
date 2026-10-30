import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  Search,
  Sun,
  Moon,
  SplitSquareHorizontal,
  CheckCircle2,
  Menu,
  X,
  ArrowUpRight,
  Download,
  ShieldCheck,
  Zap,
  Terminal,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Layers,
  BarChart3,
  Bell,
  Compass,
  LayoutGrid,
  FileCode,
  RotateCcw,
  Keyboard,
  Workflow,
  Box,
  Github,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  JXThemeProvider,
  useJXTheme,
  ACCENT_PALETTES,
  AccentColor,
  RadiusScale,
} from './context/JXThemeContext';
import {
  CATEGORIES,
  COMPONENT_CATALOG,
  CategoryId,
  ComponentSpec,
} from './data/catalog';
import { ComponentSpec290 } from './data/catalog290';
import { UNIFIED_CATEGORIES_18 } from './data/unifiedCatalog';

// Phase 1: High-Performance Code-Splitting via React.lazy
const CommandFinderModal = lazy(() => import('./components/CommandFinderModal').then((m) => ({ default: m.CommandFinderModal })));
const DesignTokenExporter = lazy(() => import('./components/DesignTokenExporter').then((m) => ({ default: m.DesignTokenExporter })));
const AccessibilityAriaSection = lazy(() => import('./components/AccessibilityAriaSection').then((m) => ({ default: m.AccessibilityAriaSection })));
const Category1Inputs = lazy(() => import('./components/Category1Inputs').then((m) => ({ default: m.Category1Inputs })));
const Category2DataDisplay = lazy(() => import('./components/Category2DataDisplay').then((m) => ({ default: m.Category2DataDisplay })));
const Category3And4FeedbackSurfaces = lazy(() => import('./components/Category3And4FeedbackSurfaces').then((m) => ({ default: m.Category3And4FeedbackSurfaces })));
const Category5And6NavLayout = lazy(() => import('./components/Category5And6NavLayout').then((m) => ({ default: m.Category5And6NavLayout })));
const Category7EnterpriseX = lazy(() => import('./components/Category7EnterpriseX').then((m) => ({ default: m.Category7EnterpriseX })));
const Category8SignatureBlocks = lazy(() => import('./components/Category8SignatureBlocks').then((m) => ({ default: m.Category8SignatureBlocks })));
const JX290LibraryExplorer = lazy(() => import('./components/JX290LibraryExplorer').then((m) => ({ default: m.JX290LibraryExplorer })));
const GitHubPage = lazy(() => import('./components/GitHubPage').then((m) => ({ default: m.GitHubPage })));

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

const WorkbenchShell: React.FC = () => {
  const {
    mode,
    toggleMode,
    accent,
    setAccent,
    palette,
    radiusScale,
    setRadiusScale,
    getRadiusClass,
    compareMode,
    setCompareMode,
    pushToast,
  } = useJXTheme();

  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [sidebarQuery, setSidebarQuery] = useState('');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);
  const [encyclopediaFilter, setEncyclopediaFilter] = useState('');
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [springPressActive, setSpringPressActive] = useState(true);
  const [haloFocusActive, setHaloFocusActive] = useState(true);
  const [currentView, setCurrentView] = useState<'workbench' | 'github-page'>('workbench');
  const [selectedExplorerCompId, setSelectedExplorerCompId] = useState<string | undefined>();
  const [selectedExplorerCatId, setSelectedExplorerCatId] = useState<string | undefined>();

  const handleSelect290Component = (item: ComponentSpec290) => {
    setActiveCategory('all');
    setSelectedExplorerCompId(item.id);
    const cat = UNIFIED_CATEGORIES_18.find((c) => c.number === item.categoryNumber);
    if (cat) {
      setSelectedExplorerCatId(cat.id);
    }
    setMobileSidebarOpen(false);
    setCmdOpen(false);
    setTimeout(() => {
      const el = document.getElementById(`spec-${item.id}`) || document.getElementById('jx-290-component-suite');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
  };

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      } else if (e.key === 'Escape' && mobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileSidebarOpen]);

  const handleCopyInstall = () => {
    navigator.clipboard?.writeText('npm i @jxui/react').catch(() => {});
    setCopiedInstall(true);
    pushToast({
      title: 'Copied installation command',
      description: '$ npm i @jxui/react copied to clipboard',
      variant: 'success',
    });
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleTriggerToast = () => {
    pushToast({
      title: 'Tactile Luminescence Event',
      description: 'Zero cumulative layout shift (CLS = 0) with spring physics settling.',
      variant: 'default',
    });
  };

  const handleJumpToComponent = (spec: ComponentSpec) => {
    if (activeCategory !== 'all' && activeCategory !== spec.category) {
      setActiveCategory('all');
    }
    setMobileSidebarOpen(false);
    setTimeout(() => {
      const el = document.getElementById(spec.id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleJumpToElementId = (id: string, catId?: CategoryId) => {
    if (catId && activeCategory !== 'all' && activeCategory !== catId) {
      setActiveCategory('all');
    }
    setMobileSidebarOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (sectionId === 'github-page') {
      setCurrentView('github-page');
      setMobileSidebarOpen(false);
      setCmdOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentView('workbench');
    setActiveCategory('all');
    setMobileSidebarOpen(false);
    setCmdOpen(false);
    setTimeout(() => {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleToggleEncyclopedia = () => {
    setActiveCategory('all');
    setShowEncyclopedia(true);
    setMobileSidebarOpen(false);
    setCmdOpen(false);
    setTimeout(() => {
      const el = document.getElementById('jx-encyclopedia-section');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const filteredCatalog = COMPONENT_CATALOG.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      !sidebarQuery.trim() ||
      item.name.toLowerCase().includes(sidebarQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(sidebarQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const encyclopediaItems = COMPONENT_CATALOG.filter((item) => {
    if (!encyclopediaFilter.trim()) return true;
    const q = encyclopediaFilter.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.muiFlaw.toLowerCase().includes(q) ||
      item.jxuiUpgrade.toLowerCase().includes(q)
    );
  });

  // Reusable Sidebar Content matching Design/code.html
  const renderSidebar = () => (
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
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close sidebar"
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
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
              onChange={(e) => setSidebarQuery(e.target.value)}
              placeholder="Filter components..."
              aria-label="Filter components list"
              className="w-full pl-8 pr-10 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 border border-transparent focus:border-indigo-500/40 transition-colors"
            />
            <span className="absolute right-2 px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-[10px] font-mono font-medium text-slate-600 dark:text-slate-300">
              {filteredCatalog.length}
            </span>
          </div>
        </div>

        {/* Category Batches Nav List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-xs">
          {/* All Components reset pill */}
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setMobileSidebarOpen(false);
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
            onClick={() => handleNavigateToSection('jx-290-component-suite')}
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
            onClick={() => handleNavigateToSection('github-page')}
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
                    setActiveCategory(cat.id);
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
                      onClick={() => handleJumpToElementId(sub.id, cat.id)}
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
      <div className="p-4 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-200/70 dark:border-slate-800 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>WCAG 2.1 AA Verified</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
          <FileCode className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>100% Strict TypeScript</span>
        </div>
        <div className="pt-1 flex items-center justify-between text-slate-400 font-mono text-[10px]">
          <span>Build v2.4.0</span>
          <span>React 19+ Ready</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Fixed Left Sidebar (Desktop lg+) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex-col justify-between overflow-hidden">
        {renderSidebar()}
      </aside>

      {/* Mobile Slide-Over Sidebar Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              aria-label="Mobile Navigation Sidebar"
              className="relative z-10 w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full overflow-hidden shadow-2xl"
            >
              {renderSidebar()}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Canvas Area Offset for Sidebar */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-40 h-16 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar directory"
              className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700 cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Quick Find / Cmd+K Search Trigger */}
            <div
              onClick={() => setCmdOpen(true)}
              className="flex items-center gap-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 px-3.5 py-1.5 rounded-xl cursor-pointer transition-colors text-slate-500 dark:text-slate-400 text-xs w-64 sm:w-80 border border-transparent hover:border-slate-300 dark:hover:border-slate-700"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="font-medium text-slate-600 dark:text-slate-300 truncate">
                Quick Find / Jump to Component...
              </span>
              <kbd className="ml-auto px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 font-mono text-[10px] text-slate-600 dark:text-slate-300 shadow-xs border border-slate-200 dark:border-slate-700 shrink-0">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Top Right Controls Toolbar */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Color Accent Swatches (Desktop) */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
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
                        ? 'ring-2 ring-indigo-500 ring-offset-1 scale-110'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                );
              })}
            </div>

            {/* Radius Scale Multipliers */}
            <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[11px] font-semibold">
              {RADIUS_OPTIONS.slice(1, 4).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRadiusScale(r.id)}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    radiusScale === r.id
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {r.scaleLabel}
                </button>
              ))}
            </div>

            {/* Split Compare Mode Toggle */}
            <button
              type="button"
              onClick={() => setCompareMode(compareMode === 'jxui' ? 'split' : 'jxui')}
              title="Toggle MUI vs JXUI Split Compare"
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                compareMode === 'split'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <SplitSquareHorizontal className="w-4 h-4" />
              <span className="hidden xl:inline">Split Compare</span>
            </button>

            {/* Theme Luminance Toggle (Light/Dark) */}
            <button
              type="button"
              onClick={toggleMode}
              title={`Switch to ${mode === 'light' ? 'Dark Obsidian' : 'Light Alabaster'}`}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {mode === 'light' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            {/* GitHub Showcase Page View Toggle */}
            <button
              type="button"
              onClick={() => setCurrentView(currentView === 'workbench' ? 'github-page' : 'workbench')}
              title={currentView === 'workbench' ? 'Switch to GitHub Showcase Page' : 'Return to Interactive Workbench'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                currentView === 'github-page'
                  ? 'bg-[#238636] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 text-slate-700 dark:text-slate-200'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>{currentView === 'github-page' ? 'Workbench' : 'GitHub Page'}</span>
            </button>
          </div>
        </header>

        {/* Main Content Body: Switch between GitHub Showcase Page and Interactive Workbench */}
        {currentView === 'github-page' ? (
          <Suspense fallback={<SectionSkeletonFallback label="Loading GitHub Showcase & Docs..." />}>
            <GitHubPage
              onBackToWorkbench={() => {
                setCurrentView('workbench');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToCategory={(catId) => {
                setCurrentView('workbench');
                setSelectedExplorerCatId(catId);
                setTimeout(() => {
                  const el = document.getElementById('jx-290-component-suite');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 80);
              }}
            />
          </Suspense>
        ) : (
          <main className="w-full flex-1 px-4 sm:px-8 py-6 sm:py-8 space-y-8 sm:space-y-12 max-w-7xl mx-auto">
          {/* Top Specular Ambient Glow Layer */}
          <div className="relative w-full overflow-hidden pt-2">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] h-[340px] bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

            {/* 1. WORKBENCH HERO & TELEMETRY BANNER */}
            <div className="relative z-10 space-y-6">
              {/* Breadcrumb Meta Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5 shadow-xs border border-indigo-200/60 dark:border-indigo-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    v2.4.0 Production Ready
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">/</span>
                  <span className="font-mono text-slate-500 dark:text-slate-400 font-medium">
                    @jxui/react
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">/</span>
                  <span className="text-slate-500 dark:text-slate-400">Workbench Suite</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>17.4:1 AAA Contrast</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300 shadow-xs">
                    <Zap className="w-3.5 h-3.5 text-indigo-500" />
                    <span>React 19 + TS 7.0</span>
                  </div>
                </div>
              </div>

              {/* Main Headline Block with 3D Isometric Emblem Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/60">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Next-Gen Drop-in MUI Replacement</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                    Tactile Ergonomics for Enterprise Interfaces
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                    A reimagined React 19 + TypeScript component architecture with spring-physics micro-interactions, strict WCAG 2.1 AA parity, and drop-in MUI API compatibility across 351 production-ready primitives (61 interactive showcases + 290 modular building blocks).
                  </p>

                  {/* Quick Action Bar */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {/* 1-Click Code installation button */}
                    <button
                      type="button"
                      onClick={handleCopyInstall}
                      className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-xs font-semibold shadow-md hover:opacity-95 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span className="text-indigo-400 dark:text-indigo-600">$</span>
                      <span>npm i @jxui/react</span>
                      {copiedInstall ? (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400 group-hover:text-white dark:group-hover:text-slate-900 transition-colors shrink-0" />
                      )}
                      {copiedInstall && (
                        <span className="font-sans text-[11px] text-emerald-400 font-bold ml-1">
                          COPIED
                        </span>
                      )}
                    </button>

                    {/* Explore 8 Batches */}
                    <a
                      href="#interactive-playground"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById('interactive-playground')
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md hover:bg-indigo-500 transition-all active:scale-[0.98]"
                    >
                      <span>Explore 8 Batches</span>
                      <ArrowUpRight className="w-4 h-4 rotate-45" />
                    </a>

                    {/* Design Tokens Link */}
                    <a
                      href="#jx-design-token-exporter"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById('jx-design-token-exporter')
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-xs shadow-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4 text-indigo-500" />
                      <span>Design Tokens (W3C)</span>
                    </a>

                    {/* Cmd+K Palette Button */}
                    <button
                      type="button"
                      onClick={() => setCmdOpen(true)}
                      className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Cmd+K Palette</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 font-mono text-[10px] text-slate-500 shadow-xs">
                        ⌘K
                      </kbd>
                    </button>

                    {/* Trigger Sonner Toast */}
                    <button
                      type="button"
                      onClick={handleTriggerToast}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Bell className="w-3.5 h-3.5 text-rose-500" />
                      <span>Test Spatial Toast</span>
                    </button>
                  </div>
                </div>

                {/* 3D Isometric Emblem Feature Card */}
                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <div className="relative w-64 h-64 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xl flex flex-col items-center justify-center overflow-hidden group">
                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative flex flex-col items-center justify-center space-y-3">
                      <div className="w-36 h-18 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 shadow-xl flex items-center justify-center transform -rotate-12 translate-y-1 transition-transform duration-300 group-hover:scale-105">
                        <div className="w-16 h-8 rounded-full bg-white/30 backdrop-blur-md p-1 flex items-center justify-end shadow-inner">
                          <div className="w-6 h-6 rounded-full bg-white shadow-md" />
                        </div>
                      </div>
                      <div className="w-36 h-9 rounded-xl bg-slate-800 transform -rotate-12 opacity-80 shadow-md flex items-center justify-center">
                        <span className="text-[10px] font-mono text-slate-300">
                          CLS = 0.00
                        </span>
                      </div>
                      <div className="pt-2 text-center">
                        <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                          JXUI 2.4.0
                        </span>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          Tactile Luminescence
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Telemetry KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {/* KPI 1 */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-md transition-all space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      Total Components
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      100% Ready
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      351
                    </span>
                    <span className="text-xs text-slate-500">in 18 Categories</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Zero external CSS runtime</span>
                  </div>
                </div>

                {/* KPI 2 */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-md transition-all space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      Accessibility Audit
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                      WCAG 2.1 AA
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      17.4 : 1
                    </span>
                    <span className="text-xs text-slate-500">max contrast</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                    <Keyboard className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Roving tabIndex + 3px halo</span>
                  </div>
                </div>

                {/* KPI 3 */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-md transition-all space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      Bundle Footprint
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                      Gzip Core
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      14.2 kB
                    </span>
                    <span className="text-xs text-slate-500">tree-shakable</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                    <span>Sub-path modular exports</span>
                  </div>
                </div>

                {/* KPI 4 */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-md transition-all space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      Runtime Physics
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 text-[10px] font-bold">
                      Spring Damped
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      200 ms
                    </span>
                    <span className="text-xs text-slate-500">settling window</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                    <Sliders className="w-3.5 h-3.5 text-violet-500" />
                    <span className="font-mono text-[11px]">scale(0.98) compression</span>
                  </div>
                </div>
              </div>

              {/* MUI Core vs JXUI Ergonomics Matrix Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                        Drop-In Migration
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        MUI Core vs. JXUI Ergonomics Matrix
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                      100% API-compatible props with zero Emotion/styled-engine runtime overhead and native physics.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold">
                      61 Drop-in Replacements
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px] font-medium">
                      8 Comprehensive Batches
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Column 1 */}
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

                  {/* Column 2 */}
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

                  {/* Column 3 */}
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
                        className={`w-6 h-6 rounded-lg transition-transform cursor-pointer ${
                          active
                            ? 'ring-2 ring-indigo-500 ring-offset-2 scale-110'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Radius Multipliers */}
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
                      {r.scaleLabel}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Physics Toggles */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={springPressActive}
                  onChange={(e) => setSpringPressActive(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>Spring Press (scale 0.98)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={haloFocusActive}
                  onChange={(e) => setHaloFocusActive(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>3px Focus Aura</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setAccent('indigo');
                  setRadiusScale('md');
                  setSpringPressActive(true);
                  setHaloFocusActive(true);
                  setActiveCategory('all');
                  pushToast({ title: 'Workbench settings reset to default', variant: 'default' });
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
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
                    onChange={(e) => setEncyclopediaFilter(e.target.value)}
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
                        onClick={() => handleJumpToComponent(spec)}
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
                        Data Display &amp; Presence (10 Component Groups)
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Squircle avatar stacks, rolling odometer badges, inset trees, and tables with floating glassmorphic bulk action bars.
                    </p>
                  </div>
                  <span className="font-mono text-xs text-slate-400">#15 – #24</span>
                </div>
                <Category2DataDisplay />
              </section>
            )}

            {/* Category 3 & 4: Feedback & Surfaces */}
            {(activeCategory === 'all' ||
              activeCategory === 'feedback' ||
              activeCategory === 'surfaces') && (
              <section className="space-y-4">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-[11px] font-bold">
                        BATCH 03 &amp; 04
                      </span>
                      <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Feedback Overlays &amp; Layered Surfaces (10 Components)
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Sonner-style 3D spatial toast stacks, destructive-guarded spring dialogs, spotlight bento cards, and semantic surfaces.
                    </p>
                  </div>
                  <span className="font-mono text-xs text-slate-400">#25 – #34</span>
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

            {/* Category 5 & 6: Navigation & Layout/Utils */}
            {(activeCategory === 'all' ||
              activeCategory === 'navigation' ||
              activeCategory === 'layout-utils') && (
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
                if (spec) handleJumpToComponent(spec);
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
              <AccessibilityAriaSection onJumpToComponent={handleJumpToComponent} />
            </div>
          </Suspense>
        </main>
      )}
      </div>

      {/* Global Cmd+K Component Finder / JX Spotlight Modal */}
      <Suspense fallback={null}>
        <CommandFinderModal
          open={cmdOpen}
          onClose={() => setCmdOpen(false)}
          onSelectComponent={handleJumpToComponent}
          onSelect290Component={handleSelect290Component}
          onSelectCategory={setActiveCategory}
          onNavigateToSection={handleNavigateToSection}
          onToggleEncyclopedia={handleToggleEncyclopedia}
        />
      </Suspense>
    </div>
  );
};

export default function App() {
  return (
    <JXThemeProvider>
      <WorkbenchShell />
    </JXThemeProvider>
  );
}
