// ============================================================================
// JXUI Unified Master Catalog (351 Total Primitives)
// Combining System A (61 Interactive Showcases) & System B (290 Modular Primitives)
// ============================================================================

import { COMPONENT_CATALOG, ComponentSpec } from './catalog';
import { CATEGORIES_290, COMPONENTS_290, ComponentSpec290, CategorySpec290 } from './catalog290';

export type ComponentTier = 'showcase' | 'primitive';

export interface UnifiedComponentSpec {
  id: string;
  name: string;
  tier: ComponentTier;
  categoryNumber: number;
  categoryTitle: string;
  categoryId: string;
  subtitle: string;
  muiFlaw: string;
  jxuiUpgrade: string;
  jsxSnippet: string;
  badge: string;
  showcaseNumber?: number;
  specA?: ComponentSpec;
  specB?: ComponentSpec290;
}

export interface UnifiedCategorySpec {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  showcaseCount: number;
  primitiveCount: number;
  totalCount: number;
}

// Map each of the 61 System A items to the appropriate 18-category ID
const SHOWCASE_CATEGORY_MAP: Record<number, { catNum: number; catId: string }> = {
  1: { catNum: 4, catId: 'inputs-forms' },          // JXAutocomplete
  2: { catNum: 1, catId: 'buttons-actions' },       // JXButton
  3: { catNum: 1, catId: 'buttons-actions' },       // JXButtonGroup
  4: { catNum: 5, catId: 'toggles-selection' },     // JXCheckbox
  5: { catNum: 1, catId: 'buttons-actions' },       // JXFab
  6: { catNum: 4, catId: 'inputs-forms' },          // JXNumberField
  7: { catNum: 5, catId: 'toggles-selection' },     // JXRadioGroup
  8: { catNum: 4, catId: 'inputs-forms' },          // JXRating
  9: { catNum: 4, catId: 'inputs-forms' },          // JXSelect
  10: { catNum: 4, catId: 'inputs-forms' },         // JXSlider
  11: { catNum: 5, catId: 'toggles-selection' },    // JXSwitch
  12: { catNum: 4, catId: 'inputs-forms' },         // JXTextField
  13: { catNum: 1, catId: 'buttons-actions' },      // JXToggleButtonGroup
  14: { catNum: 4, catId: 'inputs-forms' },         // JXTransferList
  15: { catNum: 18, catId: 'advanced-utilities' },  // JXAvatar & JXAvatarGroup
  16: { catNum: 18, catId: 'advanced-utilities' },  // JXBadge
  17: { catNum: 18, catId: 'advanced-utilities' },  // JXChip
  18: { catNum: 18, catId: 'advanced-utilities' },  // JXDivider
  19: { catNum: 18, catId: 'advanced-utilities' },  // JXIcon
  20: { catNum: 9, catId: 'cards-content' },        // JXImageList
  21: { catNum: 18, catId: 'advanced-utilities' },  // JXList
  22: { catNum: 11, catId: 'tables-datagrids' },    // JXTable
  23: { catNum: 18, catId: 'advanced-utilities' },  // JXTooltip
  24: { catNum: 18, catId: 'advanced-utilities' },  // JXTypography
  25: { catNum: 7, catId: 'feedback-notifications' },// JXAlert
  26: { catNum: 6, catId: 'modals-overlays' },      // JXBackdrop
  27: { catNum: 6, catId: 'modals-overlays' },      // JXDialog
  28: { catNum: 8, catId: 'loading-progress' },     // JXProgress
  29: { catNum: 8, catId: 'loading-progress' },     // JXSkeleton
  30: { catNum: 7, catId: 'feedback-notifications' },// JXSnackbar
  31: { catNum: 2, catId: 'glass-surfaces' },       // JXAccordion
  32: { catNum: 2, catId: 'glass-surfaces' },       // JXAppBar
  33: { catNum: 2, catId: 'glass-surfaces' },       // JXCard
  34: { catNum: 2, catId: 'glass-surfaces' },       // JXPaper
  35: { catNum: 3, catId: 'navigation' },           // JXBottomNavigation
  36: { catNum: 3, catId: 'navigation' },           // JXBreadcrumbs
  37: { catNum: 3, catId: 'navigation' },           // JXDrawer
  38: { catNum: 3, catId: 'navigation' },           // JXLink
  39: { catNum: 3, catId: 'navigation' },           // JXMenu
  40: { catNum: 3, catId: 'navigation' },           // JXPagination
  41: { catNum: 3, catId: 'navigation' },           // JXSpeedDial
  42: { catNum: 3, catId: 'navigation' },           // JXStepper
  43: { catNum: 3, catId: 'navigation' },           // JXTabs
  44: { catNum: 3, catId: 'navigation' },           // JXNavigationRail
  45: { catNum: 13, catId: 'layout-workspace' },    // JXBox & JXContainer
  46: { catNum: 13, catId: 'layout-workspace' },    // JXGrid
  47: { catNum: 13, catId: 'layout-workspace' },    // JXStack
  48: { catNum: 13, catId: 'layout-workspace' },    // JXMasonry
  49: { catNum: 17, catId: 'time-scheduling' },     // JXTimeline
  50: { catNum: 13, catId: 'layout-workspace' },    // JXTransitions & Textarea
  51: { catNum: 11, catId: 'tables-datagrids' },    // JXDataGrid
  52: { catNum: 17, catId: 'time-scheduling' },     // JXDatePicker & Range
  53: { catNum: 10, catId: 'data-visualization' },  // JXCharts
  54: { catNum: 11, catId: 'tables-datagrids' },    // JXTreeView
  55: { catNum: 16, catId: 'editors-creative' },    // JXRichTextEditor & Dropzone
  56: { catNum: 14, catId: 'animation-motion' },    // JXSpotlightDock
  57: { catNum: 9, catId: 'cards-content' },        // JXPricingMatrix
  58: { catNum: 18, catId: 'advanced-utilities' },  // JXTrafficSplitter
  59: { catNum: 18, catId: 'advanced-utilities' },  // JXAudioWaveformScrubber
  60: { catNum: 16, catId: 'editors-creative' },    // JXInteractiveColorStudio
  61: { catNum: 15, catId: 'ai-components' },       // JXSecurityVaultCard
};

// Assemble Unified 351 List
export const UNIFIED_COMPONENTS_351: UnifiedComponentSpec[] = [
  // 1. System A Showcases (61 components)
  ...COMPONENT_CATALOG.map((item) => {
    const mapping = SHOWCASE_CATEGORY_MAP[item.number] || { catNum: 18, catId: 'advanced-utilities' };
    const cat = CATEGORIES_290.find((c) => c.id === mapping.catId) || CATEGORIES_290[0];
    return {
      id: item.id,
      name: item.name,
      tier: 'showcase' as const,
      categoryNumber: mapping.catNum,
      categoryTitle: cat.title,
      categoryId: mapping.catId,
      subtitle: item.subtitle,
      muiFlaw: item.muiFlaw,
      jxuiUpgrade: item.jxuiUpgrade,
      jsxSnippet: item.jsxSnippet,
      badge: `Showcase #${String(item.number).padStart(2, '0')}`,
      showcaseNumber: item.number,
      specA: item,
    };
  }),

  // 2. System B Modular Primitives (290 components)
  ...COMPONENTS_290.map((item) => {
    const cat = CATEGORIES_290.find((c) => c.id === item.categoryId) || CATEGORIES_290[0];
    return {
      id: item.id,
      name: item.name,
      tier: 'primitive' as const,
      categoryNumber: item.categoryNumber,
      categoryTitle: cat.title,
      categoryId: item.categoryId,
      subtitle: item.subtitle,
      muiFlaw: item.muiFlaw,
      jxuiUpgrade: item.jxuiUpgrade,
      jsxSnippet: item.jsxSnippet,
      badge: `Primitive Cat ${item.categoryNumber}`,
      specB: item,
    };
  }),
];

// Unified 18 Categories with aggregated counts
export const UNIFIED_CATEGORIES_18: UnifiedCategorySpec[] = CATEGORIES_290.map((cat) => {
  const showcases = UNIFIED_COMPONENTS_351.filter(
    (c) => c.tier === 'showcase' && c.categoryId === cat.id
  ).length;
  const primitives = UNIFIED_COMPONENTS_351.filter(
    (c) => c.tier === 'primitive' && c.categoryId === cat.id
  ).length;

  return {
    id: cat.id,
    number: cat.number,
    title: cat.title,
    shortTitle: `${cat.number}. ${cat.shortTitle.split('.')[1]?.trim().split(' ')[0] || cat.title} (${showcases + primitives})`,
    description: cat.description,
    showcaseCount: showcases,
    primitiveCount: primitives,
    totalCount: showcases + primitives,
  };
});

export const UNIFIED_STATS = {
  totalComponents: UNIFIED_COMPONENTS_351.length, // 351
  totalShowcases: COMPONENT_CATALOG.length,       // 61
  totalPrimitives: COMPONENTS_290.length,         // 290
  totalCategories: UNIFIED_CATEGORIES_18.length,  // 18
  wcagCompliance: '100% WCAG 2.1 AA',
  layoutShift: 'CLS = 0',
};
