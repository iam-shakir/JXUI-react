import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Sparkles } from 'lucide-react';
import {
  JXThemeProvider,
  useJXTheme,
} from './context/JXThemeContext';
import {
  COMPONENT_CATALOG,
  CategoryId,
  ComponentSpec,
} from './data/catalog';
import { ComponentSpec290 } from './data/catalog290';
import { UNIFIED_CATEGORIES_18 } from './data/unifiedCatalog';
import { AppSidebar } from './components/layout/AppSidebar';
import { AppHeader } from './components/layout/AppHeader';
import { AppWorkbench } from './components/layout/AppWorkbench';

// Phase 1: High-Performance Code-Splitting via React.lazy
const CommandFinderModal = lazy(() =>
  import('./components/CommandFinderModal').then((m) => ({ default: m.CommandFinderModal }))
);
const GitHubPage = lazy(() =>
  import('./components/GitHubPage').then((m) => ({ default: m.GitHubPage }))
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

const WorkbenchShell: React.FC = () => {
  const { pushToast } = useJXTheme();

  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [sidebarQuery, setSidebarQuery] = useState('');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);
  const [encyclopediaFilter, setEncyclopediaFilter] = useState('');
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [springPressActive, setSpringPressActive] = useState(true);
  const [haloFocusActive, setHaloFocusActive] = useState(true);
  const [currentView, setCurrentView] = useState<'workbench' | 'github-page'>(() => {
    if (typeof window !== 'undefined') {
      const v = new URLSearchParams(window.location.search).get('view');
      if (v === 'github-page' || v === 'workbench') return v;
    }
    return 'workbench';
  });
  const [selectedExplorerCompId, setSelectedExplorerCompId] = useState<string | undefined>();
  const [selectedExplorerCatId, setSelectedExplorerCatId] = useState<string | undefined>();

  // URL sync for currentView
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const url = new URL(window.location.href);
      if (currentView === 'github-page') {
        url.searchParams.set('view', 'github-page');
      } else {
        url.searchParams.delete('view');
      }
      window.history.replaceState(null, '', url.toString());
    } catch {
      // ignore
    }
  }, [currentView]);

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

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 antialiased selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:text-indigo-300">
      {/* 1. Modular Decomposed Sidebar */}
      <AppSidebar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        sidebarQuery={sidebarQuery}
        onSidebarQueryChange={setSidebarQuery}
        filteredCount={filteredCatalog.length}
        mobileSidebarOpen={mobileSidebarOpen}
        onCloseMobileSidebar={() => setMobileSidebarOpen(false)}
        currentView={currentView}
        onNavigateToSection={handleNavigateToSection}
        onJumpToElementId={handleJumpToElementId}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Modular Decomposed Header */}
        <AppHeader
          onOpenCmd={() => setCmdOpen(true)}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          currentView={currentView}
          onToggleView={() => setCurrentView(currentView === 'workbench' ? 'github-page' : 'workbench')}
        />

        {/* 3. Main Body: Switch between GitHub Showcase Page and Interactive Workbench */}
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
          <AppWorkbench
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            selectedExplorerCatId={selectedExplorerCatId}
            selectedExplorerCompId={selectedExplorerCompId}
            onJumpToComponent={handleJumpToComponent}
            onCopyInstall={handleCopyInstall}
            copiedInstall={copiedInstall}
            onTriggerToast={handleTriggerToast}
            showEncyclopedia={showEncyclopedia}
            onToggleEncyclopedia={handleToggleEncyclopedia}
            encyclopediaFilter={encyclopediaFilter}
            onEncyclopediaFilterChange={setEncyclopediaFilter}
            encyclopediaItems={encyclopediaItems}
            springPressActive={springPressActive}
            onToggleSpringPress={() => setSpringPressActive((v) => !v)}
            haloFocusActive={haloFocusActive}
            onToggleHaloFocus={() => setHaloFocusActive((v) => !v)}
          />
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
