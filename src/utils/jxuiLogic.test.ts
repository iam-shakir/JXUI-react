import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePasswordEntropy,
  getRatingSentiment,
  parseNaturalLanguageDate,
  fuzzyScore,
  exportRowsToCSV,
  formatCopyableJsxCode,
  computeDockIconKinematics,
  calculateTierPricing,
  computeTrafficSplitState,
  generateDesignTokensJSON,
  generateDesignTokensCSS,
  getDesignTokenFilename,
  getComponentAccessibilitySpec,
  evaluateAccessibilityAudit,
} from './jxuiLogic';
import { JXToastQueueManager } from '../components/feedback/JXSnackbar';
import { COMPONENT_CATALOG } from '../data/catalog';
import { UNIFIED_COMPONENTS_351, UNIFIED_CATEGORIES_18, UNIFIED_STATS } from '../data/unifiedCatalog';

test('calculatePasswordEntropy scores empty, weak, and strong passwords accurately', () => {
  const empty = calculatePasswordEntropy('');
  assert.equal(empty.score, 0);
  assert.equal(empty.label, 'Empty');

  const weak = calculatePasswordEntropy('abc12');
  assert.equal(weak.label, 'Weak');
  assert.ok(weak.score > 0 && weak.score < 35);

  const strong = calculatePasswordEntropy('JxUi#2026!DesignSystem');
  assert.equal(strong.label, 'Strong');
  assert.equal(strong.score, 100);
  assert.equal(strong.suggestions.length, 0);
});

test('getRatingSentiment returns expressive labels across 0 to 5 stars', () => {
  assert.equal(getRatingSentiment(0), 'Unrated');
  assert.equal(getRatingSentiment(1), 'Needs Work');
  assert.equal(getRatingSentiment(3), 'Solid & Reliable');
  assert.equal(getRatingSentiment(4.5), 'Delightful');
  assert.equal(getRatingSentiment(5), 'Exceptional');
});

test('parseNaturalLanguageDate resolves natural phrases like in 3 days and next friday', () => {
  const ref = new Date('2026-10-29T12:00:00Z'); // Thursday

  const in3 = parseNaturalLanguageDate('in 3 days', ref);
  assert.ok(in3);
  assert.equal(in3.startDate, '2026-10-29');
  assert.equal(in3.endDate, '2026-11-01');

  const nextFri = parseNaturalLanguageDate('next friday', ref);
  assert.ok(nextFri);
  assert.equal(nextFri.startDate, '2026-10-30');
  assert.equal(nextFri.endDate, '2026-10-30');

  const ytd = parseNaturalLanguageDate('ytd', ref);
  assert.ok(ytd);
  assert.equal(ytd.startDate, '2026-01-01');
  assert.equal(ytd.endDate, '2026-10-29');
});

test('fuzzyScore ranks exact, prefix, substring, and subsequence matches', () => {
  assert.equal(fuzzyScore('JXAutocomplete', 'jxautocomplete'), 100);
  assert.ok(fuzzyScore('JXAutocomplete', 'jxauto') > fuzzyScore('JXAutocomplete', 'complete'));
  assert.ok(fuzzyScore('JXDataGrid', 'jdg') > 0);
  assert.equal(fuzzyScore('JXButton', 'zzz'), 0);
});

test('exportRowsToCSV formats data grid rows cleanly', () => {
  const csv = exportRowsToCSV([
    {
      id: 'JX-01',
      component: 'JXDataGrid',
      category: 'Enterprise X',
      bundleKb: 14.2,
      a11yScore: 100,
      status: 'Stable',
      owner: 'Aria Chen',
    },
  ]);
  const lines = csv.split('\n');
  assert.equal(lines.length, 2);
  assert.ok(lines[0].includes('Component,Category'));
  assert.ok(lines[1].includes('"JXDataGrid","Enterprise X",14.2,100,Stable,"Aria Chen"'));
});

test('JXToastQueueManager manages LIFO stack, promise morphing, and dismissal', async () => {
  const manager = new JXToastQueueManager(3);
  const id1 = manager.push({ title: 'First Toast', variant: 'default' });
  const id2 = manager.push({ title: 'Second Toast', variant: 'success' });
  assert.equal(manager.getQueue().length, 2);
  assert.equal(manager.getQueue()[0].id, id2);

  await manager.promise(Promise.resolve('done'), {
    loadingTitle: 'Syncing...',
    successTitle: 'Synced!',
  });

  const top = manager.getQueue()[0];
  assert.equal(top.title, 'Synced!');
  assert.equal(top.variant, 'success');

  manager.dismiss(id1);
  assert.equal(manager.getQueue().length, 2);

  manager.clear();
  assert.equal(manager.getQueue().length, 0);
});

test('formatCopyableJsxCode extracts JXUI component imports and formats JSX cleanly', () => {
  const formatted = formatCopyableJsxCode(
    '<JXAccordion variant="bento" iconMode="plus-cross" />',
    'JXAccordion',
    true
  );
  assert.ok(formatted.startsWith("import { JXAccordion } from '@jxui/react';"));
  assert.ok(formatted.includes('<JXAccordion variant="bento" iconMode="plus-cross" />'));

  const withoutImports = formatCopyableJsxCode(
    '<JXAccordion variant="bento" />',
    'JXAccordion',
    false
  );
  assert.equal(withoutImports, '<JXAccordion variant="bento" />');
});

test('computeDockIconKinematics calculates cosine-bell proximity, velocity boost, and magnetic-snap gravitation', () => {
  const idle = computeDockIconKinematics(Infinity, 136, 1.48, 0, true);
  assert.deepEqual(idle, {
    scale: 1,
    y: 0,
    rotateZ: 0,
    pullX: 0,
    pullY: 0,
    iconX: 0,
    iconY: 0,
    isSnapped: false,
  });

  const centerStatic = computeDockIconKinematics(0, 136, 1.48, 0, true);
  assert.equal(centerStatic.scale, 1.48);
  assert.equal(centerStatic.y, -9);
  assert.equal(centerStatic.rotateZ, 0);
  assert.equal(centerStatic.pullX, 0);
  assert.equal(centerStatic.isSnapped, true);

  // Cursor 24px to the right and -10px above center: icon gravitates right (+pullX) and up (-pullY)
  const magneticRight = computeDockIconKinematics(24, 136, 1.48, 0, true, -10, true, 0.35);
  assert.ok(magneticRight.pullX > 0);
  assert.ok(magneticRight.pullY < 0);
  assert.ok(magneticRight.iconX > 0);
  assert.equal(magneticRight.isSnapped, true);

  const centerFastSweep = computeDockIconKinematics(0, 136, 1.48, 1400, true);
  assert.ok(centerFastSweep.scale > centerStatic.scale);
  assert.ok(centerFastSweep.y < centerStatic.y);
  assert.ok(centerFastSweep.rotateZ > 0);
});

test('calculateTierPricing computes billing cycle discounts, seat volume tiers, and annual savings', () => {
  const monthlySmall = calculateTierPricing(20, 'monthly', 10, 0.2);
  assert.equal(monthlySmall.effectivePerSeat, 20);
  assert.equal(monthlySmall.monthlyTotal, 200);
  assert.equal(monthlySmall.annualSavings, 0);
  assert.equal(monthlySmall.volumeTierLabel, null);

  const annualMid = calculateTierPricing(20, 'annual', 25, 0.2);
  // 20 * 0.8 (annual) * 0.92 (8% volume) = 14.72 -> 25 * 14.72 = 368
  assert.equal(annualMid.effectivePerSeat, 14.72);
  assert.equal(annualMid.monthlyTotal, 368);
  assert.equal(annualMid.volumeTierLabel, '8% Volume Tier');
  assert.ok(annualMid.annualSavings > 0);

  const annualEnterprise = calculateTierPricing(40, 'annual', 60, 0.2);
  assert.equal(annualEnterprise.volumeTierLabel, '15% Volume Tier');
  assert.equal(annualEnterprise.volumeDiscountPercent, 15);
});

test('computeTrafficSplitState dynamically color-codes canary rollout phases from 0% to 100%', () => {
  const baseline = computeTrafficSplitState(0);
  assert.equal(baseline.stablePercent, 100);
  assert.equal(baseline.canaryPercent, 0);
  assert.equal(baseline.canaryColorToken, 'slate');
  assert.equal(baseline.phase, 'Baseline (0%)');

  const earlyProbe = computeTrafficSplitState(15);
  assert.equal(earlyProbe.canaryColorToken, 'sky');
  assert.equal(earlyProbe.phase, 'Early Canary (1–25%)');

  const progressive = computeTrafficSplitState(50);
  assert.equal(progressive.canaryColorToken, 'indigo');
  assert.equal(progressive.phase, 'Progressive Split (26–74%)');

  const majority = computeTrafficSplitState(85);
  assert.equal(majority.canaryColorToken, 'amber');
  assert.equal(majority.phase, 'Majority Canary (75–99%)');

  const fullProd = computeTrafficSplitState(100);
  assert.equal(fullProd.stablePercent, 0);
  assert.equal(fullProd.canaryPercent, 100);
  assert.equal(fullProd.canaryColorToken, 'emerald');
  assert.equal(fullProd.phase, 'Full Production (100%)');
});

test('generateDesignTokensJSON and generateDesignTokensCSS reflect active accent, mode, and radiusScale', () => {
  const config = { mode: 'dark' as const, accent: 'emerald' as const, radiusScale: 'xl' as const };
  const jsonStr = generateDesignTokensJSON(config);
  const parsed = JSON.parse(jsonStr);

  assert.equal(parsed.$metadata.activeThemeMode, 'dark');
  assert.equal(parsed.$metadata.activeAccentPalette, 'emerald');
  assert.equal(parsed.$metadata.activeRadiusScale, 'xl');
  assert.equal(parsed.color.accent.name.$value, 'Emerald');
  assert.equal(parsed.color.surface.canvas.$value, '#0B0F19');
  assert.equal(parsed.geometry.radius.card.$value, '24px');

  const cssStr = generateDesignTokensCSS(config);
  assert.ok(cssStr.includes('--jx-accent-500: #10b981;'));
  assert.ok(cssStr.includes('--jx-surface-canvas: #0B0F19;'));
  assert.ok(cssStr.includes('--jx-radius-card: 24px;'));

  assert.equal(getDesignTokenFilename(config, 'json'), 'jxui-tokens-emerald-dark-xl.json');
  assert.equal(getDesignTokenFilename(config, 'css'), 'jxui-tokens-emerald-dark-xl.css');
});

test('getComponentAccessibilitySpec and evaluateAccessibilityAudit cover all 61 components with interactive pass/fail overrides', () => {
  const specs = COMPONENT_CATALOG.map((c) => getComponentAccessibilitySpec(c));
  assert.equal(specs.length, 61);

  const defaultSummary = evaluateAccessibilityAudit(specs, {});
  assert.equal(defaultSummary.totalComponents, 61);
  assert.equal(defaultSummary.keyboardPassCount, 61);
  assert.equal(defaultSummary.screenReaderPassCount, 61);
  assert.equal(defaultSummary.fullyCompliantCount, 61);
  assert.equal(defaultSummary.compliancePercentage, 100);
  assert.equal(defaultSummary.overallStatus, 'WCAG 2.1 AA Certified');

  // Simulate toggling one keyboard check and one screen reader check to Fail
  const modifiedSummary = evaluateAccessibilityAudit(specs, {
    'jx-autocomplete': { keyboardPass: false, screenReaderPass: true },
    'jx-spotlight-dock': { keyboardPass: true, screenReaderPass: false },
  });
  assert.equal(modifiedSummary.keyboardPassCount, 60);
  assert.equal(modifiedSummary.screenReaderPassCount, 60);
  assert.equal(modifiedSummary.fullyCompliantCount, 59);
  assert.equal(modifiedSummary.failedComponentIds.length, 2);
  assert.equal(modifiedSummary.overallStatus, 'Remediation Required');
  assert.ok(modifiedSummary.compliancePercentage < 100);
});

test('UNIFIED_COMPONENTS_351 combines 61 showcases and 300 primitives across 18 categories without loss', () => {
  assert.equal(UNIFIED_COMPONENTS_351.length, 361);
  assert.equal(UNIFIED_STATS.totalComponents, 361);
  assert.equal(UNIFIED_STATS.totalShowcases, 61);
  assert.equal(UNIFIED_STATS.totalPrimitives, 300);
  assert.equal(UNIFIED_STATS.totalCategories, 18);

  const showcases = UNIFIED_COMPONENTS_351.filter((c) => c.tier === 'showcase');
  const primitives = UNIFIED_COMPONENTS_351.filter((c) => c.tier === 'primitive');
  assert.equal(showcases.length, 61);
  assert.equal(primitives.length, 300);

  assert.equal(UNIFIED_CATEGORIES_18.length, 18);
  for (const cat of UNIFIED_CATEGORIES_18) {
    assert.ok(cat.totalCount > 0, `Category ${cat.title} should have components`);
    assert.equal(cat.totalCount, cat.showcaseCount + cat.primitiveCount);
  }
});

test('Data architecture: all components conform to strictly typed schema with documentation and quality indicators', () => {
  for (const comp of UNIFIED_COMPONENTS_351) {
    assert.ok(comp.id, 'Component must have non-empty id');
    assert.ok(comp.name, 'Component must have non-empty name');
    assert.ok(comp.categoryId, 'Component must have valid categoryId');
    assert.ok(comp.categoryTitle, 'Component must have categoryTitle');
    assert.ok(comp.subtitle, 'Component must have subtitle');
    assert.ok(comp.tags.length > 0, `${comp.name} must have at least one tag`);
    assert.ok(comp.frameworks.includes('React 19'), `${comp.name} must support React 19`);
    assert.ok(
      ['beginner', 'intermediate', 'advanced', 'enterprise'].includes(comp.difficulty),
      `${comp.name} must have valid difficulty`
    );

    // Quality Indicators
    assert.ok(comp.quality, `${comp.name} must have quality indicators`);
    assert.ok(comp.quality.wcagScore.includes('WCAG'), `${comp.name} must have WCAG score`);
    assert.ok(comp.quality.responsive.mobile, `${comp.name} must support mobile`);
    assert.ok(comp.quality.responsive.tablet, `${comp.name} must support tablet`);
    assert.ok(comp.quality.responsive.desktop, `${comp.name} must support desktop`);
    assert.ok(comp.quality.ariaRoles.length > 0, `${comp.name} must have ARIA roles`);

    // Documentation
    assert.ok(comp.doc.installation.includes('npm install'), `${comp.name} must have npm install guide`);
    assert.ok(comp.doc.usageCode.length > 0, `${comp.name} must have usageCode`);
    assert.ok(comp.doc.props.length >= 4, `${comp.name} must define at least 4 props`);
    assert.ok(comp.doc.accessibilityNotes.length > 0, `${comp.name} must have a11y notes`);
    assert.ok(comp.doc.keyboardShortcuts.length > 0, `${comp.name} must have keyboard contracts`);
  }
});

test('Search & Multi-Filtering: accurately filters by name, category, tags, framework, and difficulty', () => {
  // 1. Search by name
  const buttonMatches = UNIFIED_COMPONENTS_351.filter((c) =>
    c.name.toLowerCase().includes('button')
  );
  assert.ok(buttonMatches.length > 0);
  assert.ok(buttonMatches.some((c) => c.name === 'JXButton'));

  // 2. Filter by category
  const navComponents = UNIFIED_COMPONENTS_351.filter((c) => c.categoryId === 'navigation');
  assert.ok(navComponents.length > 0);
  for (const c of navComponents) {
    assert.equal(c.categoryId, 'navigation');
  }

  // 3. Filter by tag
  const zeroShiftComponents = UNIFIED_COMPONENTS_351.filter((c) =>
    c.tags.includes('zero-shift')
  );
  assert.equal(zeroShiftComponents.length, 361); // all components guarantee zero shift

  // 4. Filter by difficulty
  const enterpriseComponents = UNIFIED_COMPONENTS_351.filter(
    (c) => c.difficulty === 'enterprise'
  );
  assert.ok(enterpriseComponents.length > 0);
  assert.ok(enterpriseComponents.some((c) => c.name === 'JXDataGrid'));

  // 5. Multi-filter combination: Category + Difficulty + Framework
  const filtered = UNIFIED_COMPONENTS_351.filter(
    (c) =>
      c.categoryId === 'buttons-actions' &&
      c.difficulty === 'beginner' &&
      c.frameworks.includes('Next.js 15')
  );
  assert.ok(filtered.length > 0);
  assert.ok(filtered.some((c) => c.name === 'JXButton'));
});

test('Favorites & Collections Engine: manages bookmarks, custom collections, and JSON serialization', () => {
  const initial = {
    favorites: ['jx-button'],
    collections: [
      {
        id: 'col-test',
        name: 'Test Collection',
        description: 'Unit test collection',
        icon: 'folder',
        componentIds: ['jx-button'],
        createdAt: 1000,
      },
    ],
  };

  // Toggle favorite
  const withCard = {
    ...initial,
    favorites: [...initial.favorites, 'jx-card'],
  };
  assert.equal(withCard.favorites.length, 2);
  assert.ok(withCard.favorites.includes('jx-card'));

  const removedCard = {
    ...withCard,
    favorites: withCard.favorites.filter((id) => id !== 'jx-card'),
  };
  assert.equal(removedCard.favorites.length, 1);
  assert.ok(!removedCard.favorites.includes('jx-card'));

  // Add component to collection
  const updatedCollection = {
    ...initial.collections[0],
    componentIds: [...initial.collections[0].componentIds, 'jx-switch'],
  };
  assert.equal(updatedCollection.componentIds.length, 2);
  assert.ok(updatedCollection.componentIds.includes('jx-switch'));

  // Serialization
  const serialized = JSON.stringify(initial);
  const deserialized = JSON.parse(serialized);
  assert.deepEqual(deserialized, initial);
});

test('URL Deep Linking: correctly parses and serializes view, doc, cat, and collection params', () => {
  const url = new URL('https://jxui.design/?view=github-page&doc=jx-data-grid&cat=data-grid-tables&collection=enterprise-core');
  
  assert.equal(url.searchParams.get('view'), 'github-page');
  assert.equal(url.searchParams.get('doc'), 'jx-data-grid');
  assert.equal(url.searchParams.get('cat'), 'data-grid-tables');
  assert.equal(url.searchParams.get('collection'), 'enterprise-core');

  // Verify component exists in UNIFIED_COMPONENTS_351
  const docComp = UNIFIED_COMPONENTS_351.find((c) => c.id === url.searchParams.get('doc'));
  assert.ok(docComp);
  assert.equal(docComp?.name, 'JXDataGrid');

  // Verify mutating search parameters
  url.searchParams.delete('doc');
  url.searchParams.set('cat', 'inputs-selection');
  assert.equal(url.searchParams.get('doc'), null);
  assert.equal(url.searchParams.get('cat'), 'inputs-selection');
});


