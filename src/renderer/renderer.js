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

// ─── Helpers ─────────────────────────────────────────────────
function getAllTools() {
  return config.categories.flatMap((cat) => cat.tools);
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
    adminBadge.textContent = isAdmin ? '🔒 Admin' : '⚠ No Admin';
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
    item.innerHTML = `
      <span class="sidebar-item-icon">${escapeHtml(bundle.icon)}</span>
      <span class="sidebar-item-label">${escapeHtml(bundle.name)}</span>
    `;
    item.addEventListener('click', () => {
      setActiveView('bundle', bundle.id);
    });
    sidebarBundles.appendChild(item);
  }

  // Categories
  sidebarCategories.innerHTML = '';

  for (const cat of config.categories) {
    const item = document.createElement('div');
    item.className = 'sidebar-item' + (activeView.type === 'category' && activeView.id === cat.id ? ' active' : '');
    item.dataset.viewType = 'category';
    item.dataset.viewId = cat.id;
    item.innerHTML = `
      <span class="sidebar-item-icon">${escapeHtml(cat.icon)}</span>
      <span class="sidebar-item-label">${escapeHtml(cat.name)}</span>
      <span class="sidebar-item-count">${cat.tools.length}</span>
    `;
    item.addEventListener('click', () => {
      setActiveView('category', cat.id);
    });
    sidebarCategories.appendChild(item);
  }
}

function setActiveView(type, id) {
  activeView = { type, id };
  // Clear search when switching views
  if (searchQuery) {
    searchQuery = '';
    searchInput.value = '';
    searchClear.style.display = 'none';
  }
  renderSidebar();
  renderToolsGrid();
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
      tools = cat.tools;
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

  // Select All button — show for categories and bundles
  if ((activeView.type === 'category' || activeView.type === 'bundle') && tools.length > 0 && !searchQuery) {
    btnSelectAll.style.display = '';
    const allSelected = tools.every((t) => selectedTools.has(t.id));
    btnSelectAll.textContent = allSelected ? '✓ All Selected' : 'Select All';
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

    const card = document.createElement('div');
    card.className = 'tool-card'
      + (selectedTools.has(tool.id) ? ' selected' : '')
      + (isDetected ? ' detected' : '')
      + (hasUnmetDeps ? ' disabled' : '');
    card.dataset.toolId = tool.id;
    if (hasUnmetDeps) card.title = `Requires: ${depNames.join(', ')} (not installed)`;

    const versionOptions = tool.versions
      .map((v) => `<option value="${escapeHtml(v)}"${v === (selectedTools.get(tool.id) || tool.defaultVersion) ? ' selected' : ''}>${escapeHtml(v)}</option>`)
      .join('');

    const detectedBadge = isDetected
      ? `<div class="tool-detected-badge">✓ Installed: ${escapeHtml(detected.output || detected.version || '')}</div>`
      : '';

    const depsBadge = hasUnmetDeps
      ? `<div class="tool-deps-badge">⚠ Requires: ${escapeHtml(depNames.join(', '))}</div>`
      : '';

    const uninstallBtn = isDetected
      ? `<button class="btn btn-sm btn-uninstall" data-uninstall-id="${escapeHtml(tool.id)}" title="Uninstall ${escapeHtml(tool.name)}">🗑️ Uninstall</button>`
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
        <select class="tool-version-select" data-tool-id="${escapeHtml(tool.id)}"${hasUnmetDeps ? ' disabled' : ''}>${versionOptions}</select>
        <div class="tool-actions">
          ${uninstallBtn}
        </div>
      </div>
    `;

    // Click to select/deselect
    card.addEventListener('click', (e) => {
      if (hasUnmetDeps) return;
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
  }
}

// ─── Installation ────────────────────────────────────────────
async function startInstallation() {
  const allTools = getAllTools();
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
  if (unmetMessages.length > 0) {
    alert(`Cannot install — unmet dependencies:\n\n${unmetMessages.join('\n')}\n\nPlease select the required tools first.`);
    return;
  }

  installing = true;
  showPage('install');
  logContent.textContent = '';

  const selections = Array.from(selectedTools.entries()).map(([toolId, version]) => ({ toolId, version }));

  installItems.innerHTML = '';
  for (const sel of selections) {
    const tool = getAllTools().find((t) => t.id === sel.toolId);
    if (!tool) continue;

    const item = document.createElement('div');
    item.className = 'install-item';
    item.id = `install-item-${tool.id}`;
    item.innerHTML = `
      <div class="install-item-icon">${escapeHtml(tool.icon)}</div>
      <div class="install-item-info">
        <div class="install-item-name">${escapeHtml(tool.name)} v${escapeHtml(sel.version)}</div>
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
  overallLabel.textContent = `Installing ${toolName || ''}...`;

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
    const isError = badge && badge.classList.contains('badge-error');

    if (isError) failCount++;
    else successCount++;

    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    const statusDetail = item.querySelector('.install-item-status');
    const errorDetail = isError && statusDetail ? statusDetail.textContent : '';
    resultItem.innerHTML = `
      <span class="result-status">${isError ? '\u274C' : '\u2705'}</span>
      <span class="result-name">${escapeHtml(tool ? tool.name : toolId)}</span>
      <span class="result-detail">${isError ? 'Failed' : 'Installed'}</span>
      ${isError && errorDetail ? `<div class="result-error-detail">${escapeHtml(errorDetail)}</div>` : ''}
    `;
    resultsList.appendChild(resultItem);
  });

  if (failCount > 0) {
    doneIcon.textContent = '⚠️';
    doneTitle.textContent = `${successCount} Installed, ${failCount} Failed`;
    doneSubtitle.textContent = 'Some tools could not be installed. You can retry from the progress page.';
  } else {
    doneIcon.textContent = '✅';
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

// ─── Event Listeners ─────────────────────────────────────────
function setupListeners() {
  btnInstall.addEventListener('click', startInstallation);

  btnBackToSelect.addEventListener('click', async () => {
    selectedTools.clear();
    showPage('select');
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
  });

  logToggle.addEventListener('click', () => {
    logToggle.closest('.log-panel').classList.toggle('open');
  });

  document.getElementById('btnCancelUninstall').addEventListener('click', hideUninstallModal);
  document.getElementById('btnConfirmUninstall').addEventListener('click', performUninstall);

  // Select All button for current view
  btnSelectAll.addEventListener('click', () => toggleCurrentView());

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

// ─── Boot ────────────────────────────────────────────────────
init();
