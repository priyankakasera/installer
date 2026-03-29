// ─── Lucide SVG Icons (UI only) ──────────────────────────────
const ICONS = {
  lock:        '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  alertTri:    '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  layoutList:  '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/></svg>',
  circleCheck: '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  check:       '<svg class="lucide" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  search:      '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  x:           '<svg class="lucide" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  refreshCw:   '<svg class="lucide" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>',
  trash2:      '<svg class="lucide" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>',
  arrowUp:     '<svg class="lucide" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>',
  arrowDown:   '<svg class="lucide" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 12-7 7-7-7"/><path d="M12 5v14"/></svg>',
  arrowRight:  '<svg class="lucide" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  fileClock:   '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 22h2c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7l-5-5H6c-.5 0-1 .2-1.4.6C4.2 2.2 4 2.7 4 3.2v9.8"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="9" cy="17" r="5"/><path d="M9 15v2l1.5 1"/></svg>',
  xCircle:     '<svg class="lucide" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>',
  checkCircleLg:'<svg class="lucide" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  alertTriLg:  '<svg class="lucide" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  checkCircleXl:'<svg class="lucide" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  wrench:      '<svg class="lucide" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>',
  scrollText:  '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2"/></svg>',
  searchLg:    '<svg class="lucide" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  // Sidebar icons
  coffee:      '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a2 2 0 1 1 0 4h-1"/><path d="M6 2v2"/></svg>',
  rocket:      '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
  palette:     '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2Z"/></svg>',
  cloud:       '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>',
  package:     '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
  gitBranch:   '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>',
  monitor:     '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>',
  testTubes:   '<svg class="lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2"/><path d="M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 15 19.5V2"/><path d="M3 2h7"/><path d="M14 2h7"/><path d="M9 16H4"/><path d="M20 16h-5"/></svg>',
};

// Map sidebar category / bundle IDs → Lucide icons
const SIDEBAR_ICONS = {
  // Bundles
  'java-dev':      ICONS.coffee,
  'fullstack-dev': ICONS.rocket,
  'frontend-dev':  ICONS.palette,
  'cloud-dev':     ICONS.cloud,
  // Categories
  'runtimes':        ICONS.rocket,
  'package-managers': ICONS.package,
  'vcs':             ICONS.gitBranch,
  'cloud-devops':    ICONS.cloud,
  'ides-editors':    ICONS.monitor,
  'api-testing':     ICONS.testTubes,
};

// Map sidebar IDs → distinct icon colors
const SIDEBAR_COLORS = {
  // Bundles
  'java-dev':        'amber',
  'fullstack-dev':   'rose',
  'frontend-dev':    'violet',
  'cloud-dev':       'cyan',
  // Categories
  'all':             'blue',
  'installed':       'emerald',
  'runtimes':        'orange',
  'package-managers': 'pink',
  'vcs':             'teal',
  'cloud-devops':    'sky',
  'ides-editors':    'lime',
  'api-testing':     'violet',
  // Manage
  'bulkUninstall':   'red',
};

// ─── State ───────────────────────────────────────────────────
let config = null;
let selectedTools = new Map(); // toolId -> version
let detectedTools = {};
let installing = false;
let uninstallToolId = null; // tool pending uninstall confirmation

// Sidebar/nav state
let activeView = null;       // { type: 'category', id } | { type: 'bundle', id } | { type: 'all' }
let searchQuery = '';

// ─── DOM Refs ────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const sidebarBundles = $('#sidebarBundles');
const sidebarCategories = $('#sidebarCategories');
const toolsGrid = $('#toolsGrid');
const btnInstall = $('#btnInstall');
const adminBadge = $('#adminBadge');

const contentTitle = $('#contentTitle');
const contentDesc = $('#contentDesc');
const btnSelectAll = $('#btnSelectAll');
const emptyState = $('#emptyState');

const searchInput = $('#searchInput');
const searchClear = $('#searchClear');

const pageSelect = $('#pageSelect');
const pageInstall = $('#pageInstall');
const pageDone = $('#pageDone');

const overallLabel = $('#overallLabel');
const overallPercent = $('#overallPercent');
const overallFill = $('#overallFill');
const installItems = $('#installItems');
const logContent = $('#logContent');
const logToggle = $('#logToggle');

const doneIcon = $('#doneIcon');
const doneTitle = $('#doneTitle');
const doneSubtitle = $('#doneSubtitle');
const resultsList = $('#resultsList');
const btnBackToSelect = $('#btnBackToSelect');

// Bulk Uninstall page refs
const pageUninstallSelect = $('#pageUninstallSelect');
const pageUninstallProgress = $('#pageUninstallProgress');
const pageUninstallDone = $('#pageUninstallDone');
const uninstallToolsGrid = $('#uninstallToolsGrid');
const btnBulkUninstall = $('#btnBulkUninstall');
const btnUninstallSelectAll = $('#btnUninstallSelectAll');
let uninstallSelectedTools = new Set(); // toolIds selected for bulk uninstall

// ─── Helpers ─────────────────────────────────────────────────
function getAllTools() {
  return config.categories.flatMap((cat) => cat.tools).filter((t) => !t.hidden);
}

// ─── Loader Helpers ──────────────────────────────────────────
function hideStartupLoader() {
  const loader = document.getElementById('startupLoader');
  if (!loader) return;
  loader.classList.add('loader-fade-out');
  loader.addEventListener('animationend', () => loader.remove(), { once: true });
  setTimeout(() => { if (loader.parentNode) loader.remove(); }, 500);
}

function showSelectLoader(show) {
  document.getElementById('selectRefreshLoader').style.display = show ? 'flex' : 'none';
  document.getElementById('selectMainContent').style.display = show ? 'none' : '';
}

// ─── Initialization ──────────────────────────────────────────
async function init() {
  try {
    config = await window.api.getToolsConfig();

    const toolIds = config.categories.flatMap((cat) => cat.tools.map((t) => t.id));
    const [isAdmin, detected] = await Promise.all([
      window.api.checkAdmin(),
      window.api.detectInstalled(toolIds)
    ]);

    detectedTools = detected;
    adminBadge.innerHTML = isAdmin ? `${ICONS.lock} Admin` : `${ICONS.alertTri} No Admin`;
    adminBadge.className = 'admin-badge ' + (isAdmin ? 'admin' : 'no-admin');

    // Default view: first category
    activeView = { type: 'category', id: config.categories[0].id };

    renderSidebar();
    renderToolsGrid();
    updateInstallButton();
    setupListeners();
  } catch (err) {
    console.error('Initialisation failed:', err);
  } finally {
    hideStartupLoader();
  }
}

// ─── Sidebar Rendering ──────────────────────────────────────
function renderSidebar() {
  // Bundles
  sidebarBundles.innerHTML = '';
  for (const bundle of config.bundles) {
    const item = document.createElement('div');
    item.className = 'sidebar-item' + (activeView.type === 'bundle' && activeView.id === bundle.id ? ' active' : '');
    item.dataset.viewType = 'bundle';
    item.dataset.viewId = bundle.id;
    item.dataset.iconColor = SIDEBAR_COLORS[bundle.id] || 'blue';
    item.title = bundle.name;
    item.innerHTML = `
      <span class="sidebar-item-icon">${SIDEBAR_ICONS[bundle.id] || escapeHtml(bundle.icon)}</span>
      <span class="sidebar-item-label">${escapeHtml(bundle.name)}</span>
    `;
    item.addEventListener('click', () => {
      setActiveView('bundle', bundle.id);
    });
    sidebarBundles.appendChild(item);
  }

  // Categories
  sidebarCategories.innerHTML = '';

  // All Tools nav item
  const allToolsCount = getAllTools().length;
  const allToolsItem = document.createElement('div');
  allToolsItem.className = 'sidebar-item' + (activeView.type === 'all' ? ' active' : '');
  allToolsItem.dataset.viewType = 'all';
  allToolsItem.dataset.iconColor = SIDEBAR_COLORS['all'] || 'blue';
  allToolsItem.title = 'All Tools';
  allToolsItem.innerHTML = `
    <span class="sidebar-item-icon">${ICONS.layoutList}</span>
    <span class="sidebar-item-label">All Tools</span>
    <span class="sidebar-item-count">${allToolsCount}</span>
  `;
  allToolsItem.addEventListener('click', () => {
    setActiveView('all');
  });
  sidebarCategories.appendChild(allToolsItem);

  // Installed filter — dynamic count
  const installedCount = getAllTools().filter(t => detectedTools[t.id] && detectedTools[t.id].installed).length;
  const installedItem = document.createElement('div');
  installedItem.className = 'sidebar-item' + (activeView.type === 'installed' ? ' active' : '');
  installedItem.dataset.viewType = 'installed';
  installedItem.dataset.iconColor = SIDEBAR_COLORS['installed'] || 'emerald';
  installedItem.title = 'Installed Tools';
  installedItem.innerHTML = `
    <span class="sidebar-item-icon">${ICONS.circleCheck}</span>
    <span class="sidebar-item-label">Installed Tools</span>
    <span class="sidebar-item-count">${installedCount}</span>
  `;
  installedItem.addEventListener('click', () => {
    setActiveView('installed');
  });
  sidebarCategories.appendChild(installedItem);

  for (const cat of config.categories) {
    const item = document.createElement('div');
    item.className = 'sidebar-item' + (activeView.type === 'category' && activeView.id === cat.id ? ' active' : '');
    item.dataset.viewType = 'category';
    item.dataset.viewId = cat.id;
    item.dataset.iconColor = SIDEBAR_COLORS[cat.id] || 'blue';
    item.title = cat.name;
    item.innerHTML = `
      <span class="sidebar-item-icon">${SIDEBAR_ICONS[cat.id] || escapeHtml(cat.icon)}</span>
      <span class="sidebar-item-label">${escapeHtml(cat.name)}</span>
      <span class="sidebar-item-count">${cat.tools.filter(t => !t.hidden).length}</span>
    `;
    item.addEventListener('click', () => {
      setActiveView('category', cat.id);
    });
    sidebarCategories.appendChild(item);
  }

  // Manage section — Bulk Uninstall
  const sidebarManage = document.getElementById('sidebarManage');
  sidebarManage.innerHTML = '';
  const bulkItem = document.createElement('div');
  bulkItem.className = 'sidebar-item' + (activeView.type === 'bulkUninstall' ? ' active' : '');
  bulkItem.dataset.viewType = 'bulkUninstall';
  bulkItem.dataset.iconColor = SIDEBAR_COLORS['bulkUninstall'] || 'red';
  bulkItem.title = 'Bulk Uninstall';
  const installedCountManage = getAllTools().filter(t => detectedTools[t.id] && detectedTools[t.id].installed).length;
  bulkItem.innerHTML = `
    <span class="sidebar-item-icon">${ICONS.trash2}</span>
    <span class="sidebar-item-label">Bulk Uninstall</span>
    <span class="sidebar-item-count">${installedCountManage}</span>
  `;
  bulkItem.addEventListener('click', () => {
    setActiveView('bulkUninstall');
  });
  sidebarManage.appendChild(bulkItem);
}

function setActiveView(type, id) {
  activeView = { type, id };
  // Clear search when switching views
  if (searchQuery) {
    searchQuery = '';
    searchInput.value = '';
    searchClear.style.display = 'none';
  }
  // Reset selection when navigating between views
  selectedTools.clear();
  uninstallSelectedTools.clear();

  if (type === 'bulkUninstall') {
    showPage('uninstallSelect');
    renderSidebar();
    renderUninstallToolsGrid();
    updateBulkUninstallButton();
  } else {
    showPage('select');
    renderSidebar();
    renderToolsGrid();
    updateInstallButton();
  }
}

// ─── Get Tools for Current View ─────────────────────────────
function getToolsForView() {
  let tools = [];
  let title = 'All Tools';
  let desc = 'Browse and install developer tools';
  let categoryId = null;

  if (activeView.type === 'category') {
    const cat = config.categories.find((c) => c.id === activeView.id);
    if (cat) {
      tools = cat.tools.filter((t) => !t.hidden);
      title = cat.name;
      desc = cat.description;
      categoryId = cat.id;
    }
  } else if (activeView.type === 'bundle') {
    const bundle = config.bundles.find((b) => b.id === activeView.id);
    if (bundle) {
      tools = bundle.tools.map((tid) => getAllTools().find((t) => t.id === tid)).filter(Boolean);
      title = bundle.name;
      desc = bundle.description;
    }
  } else if (activeView.type === 'installed') {
    tools = getAllTools().filter(t => detectedTools[t.id] && detectedTools[t.id].installed);
    title = 'Installed Tools';
    desc = 'Tools currently detected on your system';
  } else {
    // 'all'
    tools = getAllTools();
  }

  // Apply search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    tools = tools.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  }

  return { tools, title, desc, categoryId };
}

// ─── Tool Card Grid Rendering ────────────────────────────────
function renderToolsGrid() {
  const { tools, title, desc, categoryId } = getToolsForView();

  // Update content header
  contentTitle.textContent = title;
  contentDesc.textContent = desc;

  // Select All button — show for categories, bundles, installed, and all view
  if ((activeView.type === 'category' || activeView.type === 'bundle' || activeView.type === 'installed' || activeView.type === 'all') && tools.length > 0 && !searchQuery) {
    btnSelectAll.style.display = '';
    const allSelected = tools.every((t) => selectedTools.has(t.id));

    btnSelectAll.innerHTML = allSelected ? `${ICONS.check} All Selected` : 'Select All';
    btnSelectAll.className = 'category-select-all' + (allSelected ? ' all-selected' : '');
  } else {
    btnSelectAll.style.display = 'none';
  }

  // Empty state
  if (tools.length === 0) {
    toolsGrid.style.display = 'none';
    emptyState.style.display = 'flex';
    return;
  }
  toolsGrid.style.display = '';
  emptyState.style.display = 'none';

  // Render cards
  toolsGrid.innerHTML = '';
  for (const tool of tools) {
    const detected = detectedTools[tool.id];
    const isDetected = detected && detected.installed;

    const unmetDeps = (tool.dependsOn || []).filter((depId) => {
      const depDetected = detectedTools[depId];
      return !depDetected || !depDetected.installed;
    });
    const hasUnmetDeps = unmetDeps.length > 0;
    const depNames = unmetDeps.map((depId) => {
      const depTool = getAllTools().find((t) => t.id === depId);
      return depTool ? depTool.name : depId;
    });

    // If tool is installed but has unmet deps, show warning but keep interactable
    const isDisabled = false; // Dependencies are warnings only, never block
    const showDepWarning = hasUnmetDeps;

    const card = document.createElement('div');
    card.className = 'tool-card'
      + (selectedTools.has(tool.id) ? ' selected' : '')
      + (isDetected ? ' detected' : '')
      + (isDisabled ? ' disabled' : '')
      + (showDepWarning ? ' dep-warning' : '');
    card.dataset.toolId = tool.id;
    if (hasUnmetDeps) card.title = `Requires: ${depNames.join(', ')} (not installed)`;

    const versionOptions = tool.versions
      .map((v) => `<option value="${escapeHtml(v)}"${v === (selectedTools.get(tool.id) || tool.defaultVersion) ? ' selected' : ''}>${escapeHtml(v)}</option>`)
      .join('');

    const detectedBadge = isDetected
      ? `<div class="tool-detected-badge">${ICONS.check} Installed: ${escapeHtml(detected.version || detected.output || '')}</div>`
      : '';

    const selectedVersion = selectedTools.get(tool.id) || tool.defaultVersion;

    const depsBadge = hasUnmetDeps
      ? `<div class="tool-deps-badge">${ICONS.alertTri} Requires: ${escapeHtml(depNames.join(', '))}</div>`
      : '';

    const uninstallBtn = isDetected
      ? `<button class="btn btn-sm btn-uninstall" data-uninstall-id="${escapeHtml(tool.id)}" title="Uninstall ${escapeHtml(tool.name)}">${ICONS.trash2} Uninstall</button>`
      : '';

    card.innerHTML = `
      <div class="tool-card-top">
        <div class="tool-checkbox"></div>
        <div class="tool-icon">${tool.iconUrl ? `<img class="tool-icon-img" src="${escapeHtml(tool.iconUrl)}" alt="${escapeHtml(tool.name)}">` : escapeHtml(tool.icon)}</div>
        <div class="tool-card-info">
          <div class="tool-name">${escapeHtml(tool.name)}</div>
          <div class="tool-desc">${escapeHtml(tool.description)}</div>
          ${detectedBadge}
          ${depsBadge}
        </div>
      </div>
      <div class="tool-card-bottom">
        <select class="tool-version-select" data-tool-id="${escapeHtml(tool.id)}"${isDisabled ? ' disabled' : ''}>${versionOptions}</select>
        <div class="tool-actions">
          ${uninstallBtn}
        </div>
      </div>
    `;

    // Click to select/deselect
    card.addEventListener('click', (e) => {
      if (e.target.tagName === 'SELECT' || e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      toggleTool(tool.id);
    });

    // Version change
    const select = card.querySelector('.tool-version-select');
    select.addEventListener('change', (e) => {
      if (selectedTools.has(tool.id)) {
        selectedTools.set(tool.id, e.target.value);
      }
    });

    // Uninstall button
    const unBtn = card.querySelector('[data-uninstall-id]');
    if (unBtn) {
      unBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showUninstallModal(tool.id, tool.name);
      });
    }

    toolsGrid.appendChild(card);
  }
}

// ─── Selection Logic ─────────────────────────────────────────
function toggleTool(toolId) {
  if (installing) return;
  const tool = getAllTools().find((t) => t.id === toolId);
  if (!tool) return;

  if (selectedTools.has(toolId)) {
    selectedTools.delete(toolId);
  } else {
    const versionSelect = document.querySelector(`.tool-version-select[data-tool-id="${toolId}"]`);
    selectedTools.set(toolId, versionSelect ? versionSelect.value : tool.defaultVersion);
  }

  renderToolsGrid();
  updateInstallButton();
}

function toggleCurrentView() {
  if (installing) return;
  const { tools } = getToolsForView();
  if (tools.length === 0) return;

  const allSelected = tools.every((t) => selectedTools.has(t.id));

  if (allSelected) {
    for (const tool of tools) {
      selectedTools.delete(tool.id);
    }
  } else {
    for (const tool of tools) {
      if (!selectedTools.has(tool.id)) {
        selectedTools.set(tool.id, tool.defaultVersion);
      }
    }
  }

  renderToolsGrid();
  updateInstallButton();
}

function updateInstallButton() {
  btnInstall.disabled = selectedTools.size === 0;
  btnInstall.textContent = selectedTools.size > 0
    ? `Install Selected (${selectedTools.size})`
    : 'Install Selected';

}

function getInstalledToolIds() {
  return Object.keys(detectedTools).filter((id) => detectedTools[id] && detectedTools[id].installed);
}

// ─── Search ──────────────────────────────────────────────────
function handleSearch(query) {
  searchQuery = query.trim();
  searchClear.style.display = searchQuery ? '' : 'none';

  if (searchQuery) {
    // When searching, show results across all tools
    activeView = { type: 'all' };
    renderSidebar();
  }
  renderToolsGrid();
}

// ─── Navigation ──────────────────────────────────────────────
function showPage(pageName) {
  $$('.page').forEach((p) => p.classList.remove('active'));

  const sidebar = $('#sidebar');
  if (pageName === 'select') {
    pageSelect.classList.add('active');
    sidebar.style.display = '';
  } else if (pageName === 'install') {
    pageInstall.classList.add('active');
    sidebar.style.display = 'none';
  } else if (pageName === 'done') {
    pageDone.classList.add('active');
    sidebar.style.display = 'none';
  } else if (pageName === 'uninstallSelect') {
    pageUninstallSelect.classList.add('active');
    sidebar.style.display = '';
  } else if (pageName === 'uninstallProgress') {
    pageUninstallProgress.classList.add('active');
    sidebar.style.display = 'none';
  } else if (pageName === 'uninstallDone') {
    pageUninstallDone.classList.add('active');
    sidebar.style.display = 'none';
  }
}

// ─── Installation ────────────────────────────────────────────
async function startInstallation() {
  const allTools = getAllTools();

  // Dependency check — collect warnings (informational only, no longer blocks)
  const unmetMessages = [];
  for (const [toolId] of selectedTools) {
    const tool = allTools.find((t) => t.id === toolId);
    if (!tool || !tool.dependsOn) continue;
    const missing = tool.dependsOn.filter((depId) => {
      const depDetected = detectedTools[depId];
      return (!depDetected || !depDetected.installed) && !selectedTools.has(depId);
    });
    if (missing.length > 0) {
      const missingNames = missing.map((depId) => {
        const dep = allTools.find((t) => t.id === depId);
        return dep ? dep.name : depId;
      });
      unmetMessages.push(`${tool.name} requires: ${missingNames.join(', ')}`);
    }
  }

  // Build version conflict list and enriched selections
  const conflicts = [];
  const selections = Array.from(selectedTools.entries()).map(([toolId, version]) => {
    const tool = allTools.find((t) => t.id === toolId);
    const detected = detectedTools[toolId];
    const sel = { toolId, version };

    if (detected && detected.installed) {
      const existingVer = extractVersion(detected.version || detected.output || '');
      const selectedVer = extractVersion(version);

      if (existingVer && selectedVer) {
        const cmp = compareVersions(existingVer, selectedVer);
        if (cmp === 0) {
          sel.action = 'reinstall';
          sel.existingVersion = existingVer;
          conflicts.push({ toolId, toolName: tool ? tool.name : toolId, action: 'reinstall', existingVersion: existingVer, selectedVersion: selectedVer });
        } else if (cmp > 0) {
          sel.action = 'downgrade';
          sel.existingVersion = existingVer;
          conflicts.push({ toolId, toolName: tool ? tool.name : toolId, action: 'downgrade', existingVersion: existingVer, selectedVersion: selectedVer });
        } else {
          sel.action = 'upgrade';
          sel.existingVersion = existingVer;
          conflicts.push({ toolId, toolName: tool ? tool.name : toolId, action: 'upgrade', existingVersion: existingVer, selectedVersion: selectedVer });
        }
      } else {
        // Can't parse versions — treat as reinstall to be safe
        sel.action = 'reinstall';
        sel.existingVersion = detected.version || detected.output || 'unknown';
        conflicts.push({ toolId, toolName: tool ? tool.name : toolId, action: 'reinstall', existingVersion: sel.existingVersion, selectedVersion: version });
      }
    }

    return sel;
  });

  // Show version conflict confirmation if any
  if (conflicts.length > 0) {
    const confirmed = await showVersionConflictModal(conflicts, unmetMessages);
    if (!confirmed) return;
  } else if (unmetMessages.length > 0) {
    // No version conflicts but there are dependency warnings
    const proceed = confirm(`Dependency warnings:\n\n${unmetMessages.join('\n')}\n\nThese tools may not work correctly without their dependencies. Proceed anyway?`);
    if (!proceed) return;
  }

  installing = true;
  showPage('install');
  logContent.textContent = '';

  // selections already built above with version conflict info

  installItems.innerHTML = '';
  for (const sel of selections) {
    const tool = getAllTools().find((t) => t.id === sel.toolId);
    if (!tool) continue;

    const actionBadge = sel.action
      ? ` (${sel.action === 'upgrade' ? `${ICONS.arrowUp} Upgrade` : sel.action === 'downgrade' ? `${ICONS.arrowDown} Downgrade` : `${ICONS.refreshCw} Reinstall`})`
      : '';

    const item = document.createElement('div');
    item.className = 'install-item';
    item.id = `install-item-${tool.id}`;
    const iconHtml = tool.iconUrl
      ? `<img class="tool-icon-img" src="${escapeHtml(tool.iconUrl)}" alt="${escapeHtml(tool.name)}">`
      : escapeHtml(tool.icon);
    item.innerHTML = `
      <div class="install-item-icon">${iconHtml}</div>
      <div class="install-item-info">
        <div class="install-item-name">${escapeHtml(tool.name)} v${escapeHtml(sel.version)}${actionBadge}</div>
        <div class="install-item-status" id="status-${tool.id}">Waiting...</div>
      </div>
      <span class="install-item-badge badge-waiting" id="badge-${tool.id}">Waiting</span>
    `;
    installItems.appendChild(item);
  }

  overallFill.style.width = '0%';
  overallPercent.textContent = '0%';
  overallLabel.textContent = 'Installing...';

  window.api.onProgress(handleProgress);
  const result = await window.api.startInstallation(selections);
  window.api.removeProgressListener();
  installing = false;

  showDone(result);
}

function handleProgress(data) {
  if (data.step === 'all-complete') return;

  const { toolId, toolName, step, detail, overallPercent: pct } = data;

  overallFill.style.width = pct + '%';
  overallPercent.textContent = pct + '%';
  if (step === 'downloading') {
    overallLabel.textContent = `Downloading ${toolName || ''}...`;
  } else if (step === 'uninstalling-existing') {
    overallLabel.textContent = `Removing existing ${toolName || ''}...`;
  } else if (step === 'rolling-back' || step === 'rolled-back') {
    overallLabel.textContent = `Rolling back ${toolName || ''}...`;
  } else {
    overallLabel.textContent = `Installing ${toolName || ''}...`;
  }

  const statusEl = document.getElementById(`status-${toolId}`);
  const badgeEl = document.getElementById(`badge-${toolId}`);

  if (statusEl) statusEl.textContent = detail || step;
  if (badgeEl) {
    badgeEl.textContent = capitalize(step);
    badgeEl.className = `install-item-badge badge-${step}`;

    if (step === 'error') {
      const parentItem = document.getElementById(`install-item-${toolId}`);
      if (parentItem && !parentItem.querySelector('.retry-btn')) {
        const retryBtn = document.createElement('button');
        retryBtn.className = 'btn btn-sm btn-danger retry-btn';
        retryBtn.textContent = 'Retry';
        retryBtn.addEventListener('click', () => retryTool(toolId));
        parentItem.appendChild(retryBtn);
      }
    }
  }

  appendLog(`[${toolName}] ${step}: ${detail}`);
}

async function retryTool(toolId) {
  const tool = getAllTools().find((t) => t.id === toolId);
  if (!tool) return;

  const version = selectedTools.get(toolId) || tool.defaultVersion;

  const statusEl = document.getElementById(`status-${toolId}`);
  const badgeEl = document.getElementById(`badge-${toolId}`);
  if (statusEl) statusEl.textContent = 'Retrying...';
  if (badgeEl) {
    badgeEl.textContent = 'Retrying';
    badgeEl.className = 'install-item-badge badge-downloading';
  }

  const parentItem = document.getElementById(`install-item-${toolId}`);
  const retryBtn = parentItem ? parentItem.querySelector('.retry-btn') : null;
  if (retryBtn) retryBtn.remove();

  window.api.onProgress(handleProgress);
  await window.api.retryTool(toolId, version);
  window.api.removeProgressListener();
}

function showDone(result) {
  showPage('done');

  resultsList.innerHTML = '';
  const items = installItems.querySelectorAll('.install-item');
  let successCount = 0;
  let failCount = 0;

  items.forEach((item) => {
    const toolId = item.id.replace('install-item-', '');
    const tool = getAllTools().find((t) => t.id === toolId);
    const badge = item.querySelector('.install-item-badge');
    const isError = badge && (badge.classList.contains('badge-error') || badge.classList.contains('badge-rolled-back'));
    const isRolledBack = badge && badge.classList.contains('badge-rolled-back');

    if (isError) failCount++;
    else successCount++;

    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    const statusDetail = item.querySelector('.install-item-status');
    const errorDetail = isError && statusDetail ? statusDetail.textContent : '';
    const resultLabel = isRolledBack ? 'Rolled Back' : (isError ? 'Failed' : 'Installed');
    resultItem.innerHTML = `
      <span class="result-status ${isError ? 'result-error' : 'result-success'}">${isError ? ICONS.xCircle : ICONS.checkCircleLg}</span>
      <span class="result-name">${escapeHtml(tool ? tool.name : toolId)}</span>
      <span class="result-detail">${resultLabel}</span>
      ${isError && errorDetail ? `<div class="result-error-detail">${escapeHtml(errorDetail)}</div>` : ''}
    `;
    resultsList.appendChild(resultItem);
  });

  if (failCount > 0) {
    doneIcon.innerHTML = ICONS.alertTriLg;
    doneIcon.classList.add('done-warning');
    doneTitle.textContent = `${successCount} Installed, ${failCount} Failed`;
    doneSubtitle.textContent = 'Some tools could not be installed. You can retry from the progress page.';
  } else {
    doneIcon.innerHTML = ICONS.checkCircleXl;
    doneIcon.classList.remove('done-warning');
    doneTitle.textContent = 'Installation Complete!';
    doneSubtitle.textContent = 'Your development environment is ready. You may need to restart your terminal for PATH changes to take effect.';
  }
}

// ─── Utilities ───────────────────────────────────────────────
function appendLog(msg) {
  const ts = new Date().toLocaleTimeString();
  logContent.textContent += `[${ts}] ${msg}\n`;
  logContent.parentElement.scrollTop = logContent.parentElement.scrollHeight;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;
    if (na < nb) return -1;
    if (na > nb) return 1;
  }
  return 0;
}

function extractVersion(str) {
  if (!str) return null;
  const match = str.match(/(\d+(?:\.\d+)*)/);
  return match ? match[1] : null;
}

function showVersionConflictModal(conflicts, depWarnings) {
  return new Promise((resolve) => {
    const modal = document.getElementById('versionConflictModal');
    const list = document.getElementById('conflictList');
    const descEl = document.getElementById('conflictDesc');
    const depEl = document.getElementById('conflictDepWarnings');

    list.innerHTML = '';

    const hasReinstallOnly = conflicts.every(c => c.action === 'reinstall');
    if (hasReinstallOnly) {
      descEl.textContent = conflicts.length === 1
        ? 'The selected tool is already installed with the same version. Do you want to reinstall it?'
        : 'The following tools are already installed with the same versions. Do you want to reinstall them?';
    } else {
      descEl.textContent = 'The following tools are already installed. The existing versions will be uninstalled before installing the selected versions.';
    }

    for (const c of conflicts) {
      const item = document.createElement('div');
      item.className = 'conflict-item';
      const actionLabel = c.action === 'upgrade' ? `${ICONS.arrowUp} Upgrade` : c.action === 'downgrade' ? `${ICONS.arrowDown} Downgrade` : `${ICONS.refreshCw} Reinstall`;
      const versionDetail = c.action === 'reinstall'
        ? escapeHtml(c.existingVersion)
        : `${escapeHtml(c.existingVersion)} ${ICONS.arrowRight} ${escapeHtml(c.selectedVersion)}`;
      item.innerHTML = `
        <span class="conflict-tool">${escapeHtml(c.toolName)}</span>
        <span class="conflict-action">${actionLabel}</span>
        <span class="conflict-detail">${versionDetail}</span>
      `;
      list.appendChild(item);
    }

    // Show dependency warnings if any
    if (depWarnings && depWarnings.length > 0) {
      depEl.style.display = '';
      depEl.innerHTML = `<div class="conflict-dep-title">${ICONS.alertTri} Dependency warnings:</div>` +
        depWarnings.map(m => `<div class="conflict-dep-item">${escapeHtml(m)}</div>`).join('');
    } else {
      depEl.style.display = 'none';
      depEl.innerHTML = '';
    }

    const btnConfirm = document.getElementById('btnConfirmConflict');
    const btnCancel = document.getElementById('btnCancelConflict');

    const cleanup = () => {
      modal.classList.remove('open');
      btnConfirm.removeEventListener('click', onConfirm);
      btnCancel.removeEventListener('click', onCancel);
    };

    const onConfirm = () => { cleanup(); resolve(true); };
    const onCancel = () => { cleanup(); resolve(false); };

    btnConfirm.addEventListener('click', onConfirm);
    btnCancel.addEventListener('click', onCancel);

    modal.classList.add('open');
  });
}

// ─── Uninstall ───────────────────────────────────────────────
function showUninstallModal(toolId, toolName) {
  uninstallToolId = toolId;
  document.getElementById('uninstallToolName').textContent = toolName;
  document.getElementById('uninstallProgress').style.display = 'none';
  document.getElementById('uninstallActions').style.display = 'flex';
  document.getElementById('btnConfirmUninstall').textContent = 'Uninstall';
  document.getElementById('uninstallModal').classList.add('open');
}

function hideUninstallModal() {
  document.getElementById('uninstallModal').classList.remove('open');
  uninstallToolId = null;
}

async function performUninstall() {
  if (!uninstallToolId) return;
  const toolId = uninstallToolId;

  document.getElementById('uninstallActions').style.display = 'none';
  document.getElementById('uninstallProgress').style.display = 'block';
  document.getElementById('uninstallStatus').textContent = 'Starting uninstall...';
  document.getElementById('uninstallFill').style.width = '0%';
  document.getElementById('uninstallFill').style.background = '';

  const stepPcts = { finding: 10, uninstalling: 40, cleaning: 70, verifying: 90, completed: 100 };
  const fillEl = document.getElementById('uninstallFill');
  const activeSteps = new Set(['finding', 'uninstalling', 'cleaning', 'verifying']);

  window.api.onUninstallProgress((data) => {
    if (data.toolId !== toolId) return;
    const pct = stepPcts[data.step] || 0;
    fillEl.style.width = pct + '%';
    document.getElementById('uninstallStatus').textContent = data.detail || data.step;
    if (activeSteps.has(data.step)) {
      fillEl.classList.add('progress-fill--active');
    } else {
      fillEl.classList.remove('progress-fill--active');
    }
  });

  const detected = detectedTools[toolId] || null;
  const result = await window.api.uninstallTool(toolId, detected);
  window.api.removeUninstallProgressListener();

  fillEl.classList.remove('progress-fill--active');

  if (result.success) {
    document.getElementById('uninstallStatus').textContent = 'Uninstalled successfully!';
    fillEl.style.width = '100%';

    // Force fresh detection instead of potentially reusing stale state
    const toolIds = getAllTools().map((t) => t.id);
    detectedTools = await window.api.detectInstalled(toolIds);
    renderToolsGrid();
    updateInstallButton();

    setTimeout(hideUninstallModal, 1200);
  } else {
    const errorMsg = result.error || 'Unknown error';
    fillEl.style.width = '100%';
    fillEl.style.background = 'var(--error)';
    document.getElementById('uninstallStatus').innerHTML = `
      <div class="error-panel">
        <div class="error-panel-title">\u274C Uninstall Failed</div>
        <div class="error-panel-message">${escapeHtml(errorMsg)}</div>
        <div class="error-panel-hint">Check the application log for full details.</div>
      </div>
    `;
    document.getElementById('uninstallActions').style.display = 'flex';
    document.getElementById('btnConfirmUninstall').textContent = 'Retry';
  }
}

// ─── Bulk Uninstall Page ─────────────────────────────────────
function renderUninstallToolsGrid() {
  const installedTools = getAllTools().filter(t => detectedTools[t.id] && detectedTools[t.id].installed);

  const titleEl = document.getElementById('uninstallContentTitle');
  const descEl = document.getElementById('uninstallContentDesc');
  const emptyEl = document.getElementById('uninstallEmptyState');
  const footerEl = document.getElementById('uninstallFooter');

  titleEl.textContent = `Bulk Uninstall (${installedTools.length})`;
  descEl.textContent = 'Select installed tools to uninstall';

  if (installedTools.length === 0) {
    uninstallToolsGrid.style.display = 'none';
    emptyEl.style.display = 'flex';
    footerEl.style.display = 'none';
    return;
  }
  uninstallToolsGrid.style.display = '';
  emptyEl.style.display = 'none';
  footerEl.style.display = '';

  // Select All button state
  const allSelected = installedTools.every(t => uninstallSelectedTools.has(t.id));
  btnUninstallSelectAll.textContent = allSelected ? '✓ All Selected' : 'Select All';
  btnUninstallSelectAll.className = 'category-select-all' + (allSelected ? ' all-selected' : '');

  uninstallToolsGrid.innerHTML = '';
  for (const tool of installedTools) {
    const detected = detectedTools[tool.id];
    const card = document.createElement('div');
    card.className = 'tool-card uninstall-card' + (uninstallSelectedTools.has(tool.id) ? ' selected' : '') + ' detected';
    card.dataset.toolId = tool.id;

    const iconHtml = tool.iconUrl
      ? `<img class="tool-icon-img" src="${escapeHtml(tool.iconUrl)}" alt="${escapeHtml(tool.name)}">`
      : escapeHtml(tool.icon);

    card.innerHTML = `
      <div class="tool-card-top">
        <div class="tool-checkbox"></div>
        <div class="tool-icon">${iconHtml}</div>
        <div class="tool-card-info">
          <div class="tool-name">${escapeHtml(tool.name)}</div>
          <div class="tool-desc">${escapeHtml(tool.description)}</div>
          <div class="tool-detected-badge">✓ Installed: ${escapeHtml(detected.version || detected.output || '')}</div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      if (uninstallSelectedTools.has(tool.id)) {
        uninstallSelectedTools.delete(tool.id);
      } else {
        uninstallSelectedTools.add(tool.id);
      }
      renderUninstallToolsGrid();
      updateBulkUninstallButton();
    });

    uninstallToolsGrid.appendChild(card);
  }
}

function updateBulkUninstallButton() {
  btnBulkUninstall.disabled = uninstallSelectedTools.size === 0;
  btnBulkUninstall.textContent = uninstallSelectedTools.size > 0
    ? `Uninstall Selected (${uninstallSelectedTools.size})`
    : 'Uninstall Selected';
}

function toggleUninstallSelectAll() {
  const installedTools = getAllTools().filter(t => detectedTools[t.id] && detectedTools[t.id].installed);
  const allSelected = installedTools.every(t => uninstallSelectedTools.has(t.id));
  if (allSelected) {
    uninstallSelectedTools.clear();
  } else {
    for (const t of installedTools) uninstallSelectedTools.add(t.id);
  }
  renderUninstallToolsGrid();
  updateBulkUninstallButton();
}

function showBulkUninstallConfirm() {
  const ids = Array.from(uninstallSelectedTools);
  if (ids.length === 0) return;

  const listEl = document.getElementById('bulkUninstallConfirmList');
  const titleEl = document.getElementById('bulkUninstallConfirmTitle');
  titleEl.textContent = `Uninstall ${ids.length} Tool${ids.length > 1 ? 's' : ''}?`;

  listEl.innerHTML = ids.map((id) => {
    const tool = getAllTools().find((t) => t.id === id);
    const det = detectedTools[id];
    const ver = det?.version || det?.output || '';
    const iconHtml = tool?.iconUrl
      ? `<img class="uninstall-all-item-icon-img" src="${escapeHtml(tool.iconUrl)}" alt="">`
      : `<span>${tool?.icon || '📦'}</span>`;
    return `<div class="uninstall-all-item">
      <span class="uninstall-all-item-icon">${iconHtml}</span>
      <span class="uninstall-all-item-name">${escapeHtml(tool?.name || id)}</span>
      ${ver ? `<span class="uninstall-all-item-ver" title="${escapeHtml(ver)}">${escapeHtml(ver)}</span>` : ''}
    </div>`;
  }).join('');

  document.getElementById('bulkUninstallConfirmModal').classList.add('open');
}

function hideBulkUninstallConfirm() {
  document.getElementById('bulkUninstallConfirmModal').classList.remove('open');
}

async function startBulkUninstall() {
  hideBulkUninstallConfirm();

  const ids = Array.from(uninstallSelectedTools);
  if (ids.length === 0) return;

  showPage('uninstallProgress');

  const ulLabel = $('#uninstallOverallLabel');
  const ulPercent = $('#uninstallOverallPercent');
  const ulFill = $('#uninstallOverallFill');
  const ulItems = $('#uninstallItems');
  const ulLogContent = $('#uninstallLogContent');

  ulLogContent.textContent = '';
  ulFill.style.width = '0%';
  ulFill.style.background = '';
  ulPercent.textContent = '0%';
  ulLabel.textContent = 'Uninstalling...';

  // Build item list
  ulItems.innerHTML = '';
  for (const id of ids) {
    const tool = getAllTools().find((t) => t.id === id);
    if (!tool) continue;
    const iconHtml = tool.iconUrl
      ? `<img class="install-item-icon-img" src="${escapeHtml(tool.iconUrl)}" alt="">`
      : escapeHtml(tool.icon);
    const item = document.createElement('div');
    item.className = 'install-item';
    item.id = `uninstall-item-${tool.id}`;
    item.innerHTML = `
      <div class="install-item-icon">${iconHtml}</div>
      <div class="install-item-info">
        <div class="install-item-name">${escapeHtml(tool.name)}</div>
        <div class="install-item-status" id="unstatus-${tool.id}">Waiting...</div>
      </div>
      <span class="install-item-badge badge-waiting" id="unbadge-${tool.id}">Waiting</span>
    `;
    ulItems.appendChild(item);
  }

  const activeSteps = new Set(['finding', 'uninstalling', 'cleaning', 'verifying']);

  window.api.onUninstallAllProgress((data) => {
    if (data.step === 'all-complete') return;

    const pct = data.overallPercent || 0;
    ulFill.style.width = pct + '%';
    ulPercent.textContent = pct + '%';

    if (data.toolName) {
      ulLabel.textContent = `Uninstalling ${data.toolName}...`;
    }

    if (activeSteps.has(data.step)) {
      ulFill.classList.add('progress-fill--active');
    } else {
      ulFill.classList.remove('progress-fill--active');
    }

    // Per-tool status
    const statusEl = document.getElementById(`unstatus-${data.toolId}`);
    const badgeEl = document.getElementById(`unbadge-${data.toolId}`);
    if (statusEl) statusEl.textContent = data.detail || data.step;
    if (badgeEl) {
      badgeEl.textContent = capitalize(data.step);
      badgeEl.className = `install-item-badge badge-${data.step}`;
    }

    // Log
    const ts = new Date().toLocaleTimeString();
    ulLogContent.textContent += `[${ts}] [${data.toolName || data.toolId}] ${data.step}: ${data.detail || ''}\n`;
    ulLogContent.parentElement.scrollTop = ulLogContent.parentElement.scrollHeight;
  });

  const detectedCopy = { ...detectedTools };
  const result = await window.api.uninstallAll(ids, detectedCopy);
  window.api.removeUninstallAllProgressListener();
  ulFill.classList.remove('progress-fill--active');

  // Refresh detection
  const toolIds = getAllTools().map((t) => t.id);
  detectedTools = await window.api.detectInstalled(toolIds);

  showUninstallDone(result, ids);
}

function showUninstallDone(result, ids) {
  showPage('uninstallDone');

  const resultsList = document.getElementById('uninstallResultsList');
  const doneIcon = document.getElementById('uninstallDoneIcon');
  const doneTitle = document.getElementById('uninstallDoneTitle');
  const doneSub = document.getElementById('uninstallDoneSubtitle');

  resultsList.innerHTML = '';
  let successCount = 0, failCount = 0;

  if (result.success && result.results) {
    for (const r of result.results) {
      const tool = getAllTools().find((t) => t.id === r.toolId);
      const isError = !r.success;
      if (isError) failCount++; else successCount++;

      const iconHtml = tool?.iconUrl
        ? `<img class="result-icon-img" src="${escapeHtml(tool.iconUrl)}" alt="">`
        : '';

      const item = document.createElement('div');
      item.className = 'result-item';
      item.innerHTML = `
        <span class="result-status">${isError ? ICONS.xCircle : ICONS.checkCircleLg}</span>
        ${iconHtml}
        <span class="result-name">${escapeHtml(tool ? tool.name : r.toolId)}</span>
        <span class="result-detail">${isError ? 'Failed' : 'Uninstalled'}</span>
        ${isError && r.error ? `<div class="result-error-detail">${escapeHtml(r.error)}</div>` : ''}
      `;
      resultsList.appendChild(item);
    }
  } else {
    failCount = ids.length;
  }

  if (failCount > 0 && successCount > 0) {
    doneIcon.innerHTML = ICONS.alertTriLg;
    doneTitle.textContent = `${successCount} Uninstalled, ${failCount} Failed`;
    doneSub.textContent = 'Some tools could not be uninstalled. Check the logs for details.';
  } else if (failCount > 0) {
    doneIcon.innerHTML = ICONS.xCircle;
    doneTitle.textContent = 'Uninstall Failed';
    doneSub.textContent = result.error || 'Could not uninstall the selected tools.';
  } else {
    doneIcon.innerHTML = ICONS.checkCircleXl;
    doneTitle.textContent = 'Uninstall Complete!';
    doneSub.textContent = 'Selected tools have been removed. You may need to restart your terminal for PATH changes to take effect.';
  }
}

// ─── Event Listeners ─────────────────────────────────────────
function setupListeners() {
  btnInstall.addEventListener('click', startInstallation);

  const goBackToSelect = async () => {
    selectedTools.clear();
    showPage('select');
    await refreshDetection();
  };

  btnBackToSelect.addEventListener('click', goBackToSelect);

  // "Install More Tools" button on done page
  const btnInstallMore = document.getElementById('btnInstallMore');
  if (btnInstallMore) btnInstallMore.addEventListener('click', goBackToSelect);

  logToggle.addEventListener('click', () => {
    logToggle.closest('.log-panel').classList.toggle('open');
  });

  document.getElementById('btnCancelUninstall').addEventListener('click', hideUninstallModal);
  document.getElementById('btnConfirmUninstall').addEventListener('click', performUninstall);

  // Bulk Uninstall page
  btnBulkUninstall.addEventListener('click', showBulkUninstallConfirm);
  btnUninstallSelectAll.addEventListener('click', toggleUninstallSelectAll);
  document.getElementById('btnCancelBulkUninstall').addEventListener('click', hideBulkUninstallConfirm);
  document.getElementById('btnConfirmBulkUninstall').addEventListener('click', startBulkUninstall);
  document.getElementById('btnBackToUninstall').addEventListener('click', async () => {
    uninstallSelectedTools.clear();
    activeView = { type: 'category', id: config.categories[0].id };
    showPage('select');
    await refreshDetection();
  });

  // Uninstall page refresh
  const btnUninstallRefresh = document.getElementById('btnUninstallRefresh');
  if (btnUninstallRefresh) {
    btnUninstallRefresh.addEventListener('click', async () => {
      if (btnUninstallRefresh.disabled) return;
      btnUninstallRefresh.disabled = true;
      btnUninstallRefresh.classList.add('refreshing');
      try {
        const toolIds = getAllTools().map((t) => t.id);
        detectedTools = await window.api.detectInstalled(toolIds);
        uninstallSelectedTools.clear();
        renderSidebar();
        renderUninstallToolsGrid();
        updateBulkUninstallButton();
      } finally {
        btnUninstallRefresh.disabled = false;
        btnUninstallRefresh.classList.remove('refreshing');
      }
    });
  }

  // Uninstall log toggle
  const uninstallLogToggle = document.getElementById('uninstallLogToggle');
  if (uninstallLogToggle) {
    uninstallLogToggle.addEventListener('click', () => {
      uninstallLogToggle.closest('.log-panel').classList.toggle('open');
    });
  }

  // Select All button for current view
  btnSelectAll.addEventListener('click', () => toggleCurrentView());

  // Manual Refresh button
  const btnRefresh = document.getElementById('btnRefresh');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', async () => {
      if (btnRefresh.disabled) return;
      btnRefresh.disabled = true;
      btnRefresh.classList.add('refreshing');
      try {
        await refreshDetection();
      } finally {
        btnRefresh.disabled = false;
        btnRefresh.classList.remove('refreshing');
      }
    });
  }

  // Search
  let searchTimer = null;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => handleSearch(e.target.value), 150);
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    handleSearch('');
    searchInput.focus();
  });
}

// ─── Refresh Detection ──────────────────────────────────────
async function refreshDetection() {
  showSelectLoader(true);
  try {
    const toolIds = getAllTools().map((t) => t.id);
    detectedTools = await window.api.detectInstalled(toolIds);
    renderSidebar();
    renderToolsGrid();
    updateInstallButton();
  } catch (err) {
    console.error('Failed to refresh tool status:', err);
  } finally {
    showSelectLoader(false);
  }
}

// ─── Boot ────────────────────────────────────────────────────
init();
