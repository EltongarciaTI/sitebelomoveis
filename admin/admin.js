// ============================================================
// ADMIN PANEL — Casa & Conforto
// ============================================================

const SUPABASE_URL     = 'https://nwgqafruaokqjmxhczry.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53Z3FhZnJ1YW9rcWpteGhjenJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5Njg3NDUsImV4cCI6MjA5MDU0NDc0NX0.OEupeGgpFAp-cEAXcy0Tn91YK5E5fAakknLAxPqdCCQ';


const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storageKey: 'admin-auth',
    lock: async (_name, _acquireTimeout, fn) => fn(),
  }
});

// ── State ────────────────────────────────────────────────────
let allProducts   = [];
let allCategories = [];
let currentUser   = null;
let editingProductId  = null;
let editingCategoryId = null;
let productSearch = '';
let productCategoryFilter = '';
let confirmCallback = null;

// ── Auth ─────────────────────────────────────────────────────
_sb.auth.onAuthStateChange(async (event, session) => {
  currentUser = session?.user ?? null;
  if (currentUser) {
    showApp();
    try {
      await loadAll();
    } catch (err) {
      console.error('[Admin] Erro em loadAll:', err);
      toast('Erro ao carregar dados: ' + err.message, 'error');
    }
  } else {
    showLogin();
  }
});

async function signIn(email, password) {
  const { error } = await _sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

async function signOut() {
  await _sb.auth.signOut();
}

// ── Data ─────────────────────────────────────────────────────
async function loadAll() {
  try {
    await Promise.all([loadCategories(), loadProducts()]);
  } catch (err) {
    console.error('[Admin] Erro ao buscar dados:', err);
    throw err;
  }
  renderDashboard();
  renderProductsTable();
  renderCategoriesTable();
  populateCategorySelect();
}

async function loadProducts() {
  const { data, error } = await _sb
    .from('products')
    .select('*')
    .order('name');
  if (error) { toast('Erro ao carregar produtos: ' + error.message, 'error'); return; }
  allProducts = data || [];
}

async function loadCategories() {
  const { data, error } = await _sb
    .from('categories')
    .select('*')
    .order('sort_order');
  if (error) { toast('Erro ao carregar categorias: ' + error.message, 'error'); return; }
  allCategories = data || [];
}

// ── UI: Login / App ──────────────────────────────────────────
function showLogin() {
  document.getElementById('login-screen').style.display = '';
  document.getElementById('app').setAttribute('hidden', '');
}

function showApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').removeAttribute('hidden');
  const email = currentUser?.email || '';
  document.getElementById('user-email').textContent = email;
  document.getElementById('user-avatar').textContent = (email[0] || 'A').toUpperCase();
}

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item[data-section]').forEach(n => n.classList.remove('active'));
  const section = document.getElementById('section-' + name);
  const navItem = document.querySelector(`.nav-item[data-section="${name}"]`);
  if (section) section.classList.add('active');
  if (navItem) navItem.classList.add('active');

  // Carrega o iframe da prévia só quando o usuário entra na seção
  if (name === 'preview') {
    const f = document.getElementById('preview-frame');
    if (f.src === '' || f.src === 'about:blank' || f.src.endsWith('about:blank')) {
      f.src = '../catalogo.html';
    }
  }

  const titles = {
    dashboard:  'Dashboard',
    products:   'Produtos',
    categories: 'Categorias',
    preview:    'Prévia do Site',
  };
  document.getElementById('topbar-title').textContent = titles[name] || name;
}

// ── Dashboard ────────────────────────────────────────────────
function renderDashboard() {
  const total    = allProducts.length;
  const active   = allProducts.filter(p => p.active).length;
  const featured = allProducts.filter(p => p.featured).length;
  const offers   = allProducts.filter(p => p.highlight).length;

  document.getElementById('stat-total').textContent      = total;
  document.getElementById('stat-active').textContent     = active;
  document.getElementById('stat-featured').textContent   = featured;
  document.getElementById('stat-offers').textContent     = offers;
  document.getElementById('stat-categories').textContent = allCategories.length;

  // Featured quick-view table in dashboard
  const featuredList = allProducts.filter(p => p.featured).slice(0, 10);
  const tbody = document.getElementById('dash-featured-tbody');
  if (!tbody) return;

  if (featuredList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><i class="fa-solid fa-star"></i><p>Nenhum produto em destaque. Ative a flag "Destaque na home" em algum produto.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = featuredList.map(p => {
    const catName = allCategories.find(c => c.id === p.category)?.name || p.category || '—';
    const img = thumbHtml(p);
    const badgeHtml = badgeTag(p.badge);
    return `<tr>
      <td>${img}</td>
      <td><strong>${esc(p.name)}</strong></td>
      <td>${esc(catName)}</td>
      <td>${badgeHtml}</td>
      <td>
        <div class="actions">
          <button class="btn-icon edit" onclick="openProductModal('${esc(p.id)}')" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <label class="toggle" title="Remover destaque">
            <input type="checkbox" checked onchange="quickToggle('${esc(p.id)}','featured',this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
      </td>
    </tr>`;
  }).join('');
}

// ── Products Table ───────────────────────────────────────────
function getFiltered() {
  const q   = productSearch.toLowerCase().trim();
  const cat = productCategoryFilter;
  return allProducts.filter(p => {
    const matchQ   = !q   || p.name.toLowerCase().includes(q) || (p.id || '').toLowerCase().includes(q);
    const matchCat = !cat || p.category === cat;
    return matchQ && matchCat;
  });
}

function renderProductsTable() {
  // Refresh category filter options
  const catFilter = document.getElementById('cat-filter');
  const currentVal = catFilter.value;
  catFilter.innerHTML = '<option value="">Todas as categorias</option>';
  allCategories.forEach(c => {
    catFilter.innerHTML += `<option value="${esc(c.id)}">${esc(c.name)}</option>`;
  });
  catFilter.value = currentVal;

  const filtered = getFiltered();
  const tbody = document.getElementById('products-tbody');

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="fa-solid fa-box-open"></i><p>${allProducts.length === 0 ? 'Nenhum produto cadastrado ainda.' : 'Nenhum produto encontrado para o filtro aplicado.'}</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const catName = allCategories.find(c => c.id === p.category)?.name || p.category || '—';
    const img = thumbHtml(p);
    return `<tr>
      <td>${img}</td>
      <td>
        <strong>${esc(p.name)}</strong>
        <br><small style="color:var(--text-muted)">${esc(p.id)}</small>
      </td>
      <td>${esc(catName)}</td>
      <td>${badgeTag(p.badge)}</td>
      <td>
        <label class="toggle" title="Destaque na home">
          <input type="checkbox" ${p.featured ? 'checked' : ''} onchange="quickToggle('${esc(p.id)}','featured',this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </td>
      <td>
        <label class="toggle" title="Em oferta">
          <input type="checkbox" ${p.highlight ? 'checked' : ''} onchange="quickToggle('${esc(p.id)}','highlight',this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </td>
      <td>
        <label class="toggle" title="Visível no site">
          <input type="checkbox" class="green" ${p.active ? 'checked' : ''} onchange="quickToggle('${esc(p.id)}','active',this.checked)">
          <span class="toggle-slider"></span>
        </label>
      </td>
      <td>
        <div class="actions">
          <button class="btn-icon edit"   onclick="openProductModal('${esc(p.id)}')"   title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon danger" onclick="confirmDeleteProduct('${esc(p.id)}')" title="Excluir"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

async function quickToggle(id, field, value) {
  const { error } = await _sb.from('products').update({ [field]: value }).eq('id', id);
  if (error) {
    toast('Erro ao salvar: ' + error.message, 'error');
    await loadProducts();
    renderProductsTable();
    renderDashboard();
    return;
  }
  // Update local state without full reload
  const p = allProducts.find(x => x.id === id);
  if (p) p[field] = value;
  renderDashboard();
}

// ── Product Modal ────────────────────────────────────────────
function openProductModal(id = null) {
  editingProductId = id;
  const isEdit = !!id;

  document.getElementById('modal-product-title').textContent = isEdit ? 'Editar Produto' : 'Novo Produto';
  document.getElementById('product-form').reset();
  document.getElementById('specs-list').innerHTML = '';
  document.getElementById('product-id').readOnly = isEdit;
  document.getElementById('product-id-hint').style.display = isEdit ? 'none' : '';

  populateCategorySelect();

  if (isEdit) {
    const p = allProducts.find(x => x.id === id);
    if (!p) return;
    document.getElementById('product-id').value          = p.id;
    document.getElementById('product-name').value        = p.name || '';
    document.getElementById('product-description').value = p.description || '';
    document.getElementById('product-badge').value       = p.badge || '';
    document.getElementById('product-category').value    = p.category || '';
    document.getElementById('product-images').value      = (p.images || []).join('\n');
    renderImgPreview();
    document.getElementById('product-featured').checked  = !!p.featured;
    document.getElementById('product-highlight').checked = !!p.highlight;
    document.getElementById('product-active').checked    = !!p.active;

    const specs = p.specs || {};
    Object.entries(specs).forEach(([k, v]) => addSpecRow(k, String(v)));
  } else {
    document.getElementById('product-active').checked = true;
    renderImgPreview();
  }

  document.getElementById('modal-product').removeAttribute('hidden');
}

function closeProductModal() {
  document.getElementById('modal-product').setAttribute('hidden', '');
  editingProductId = null;
}

function populateCategorySelect() {
  const sel = document.getElementById('product-category');
  const current = sel.value;
  sel.innerHTML = '<option value="">— Sem categoria —</option>';
  allCategories.forEach(c => {
    sel.innerHTML += `<option value="${esc(c.id)}">${esc(c.name)}</option>`;
  });
  if (current) sel.value = current;
}

function addSpecRow(key = '', value = '') {
  const list = document.getElementById('specs-list');
  const row  = document.createElement('div');
  row.className = 'spec-row';
  row.innerHTML = `
    <input type="text" placeholder="Ex: Cor" value="${esc(key)}">
    <input type="text" placeholder="Ex: Marrom" value="${esc(value)}">
    <button type="button" class="btn-icon danger" onclick="this.parentElement.remove()" title="Remover">
      <i class="fa-solid fa-times"></i>
    </button>`;
  list.appendChild(row);
}

async function submitProductForm() {
  const id   = document.getElementById('product-id').value.trim();
  const name = document.getElementById('product-name').value.trim();

  if (!name) { toast('O nome do produto é obrigatório.', 'error'); return; }

  const productId = id || slugify(name);

  const imagesRaw = document.getElementById('product-images').value;
  const images = imagesRaw.split('\n').map(s => s.trim()).filter(Boolean);

  const specRows = document.querySelectorAll('#specs-list .spec-row');
  const specs = {};
  specRows.forEach(row => {
    const inputs = row.querySelectorAll('input');
    const k = inputs[0].value.trim();
    const v = inputs[1].value.trim();
    if (k) specs[k] = v;
  });

  const payload = {
    id:          productId,
    name,
    category:    document.getElementById('product-category').value || null,
    badge:       document.getElementById('product-badge').value    || null,
    description: document.getElementById('product-description').value.trim(),
    images,
    featured:    document.getElementById('product-featured').checked,
    highlight:   document.getElementById('product-highlight').checked,
    active:      document.getElementById('product-active').checked,
    specs,
  };

  setBtnLoading('btn-save-product', true, 'Salvando...');

  try {
    const { error } = await _sb.from('products').upsert(payload, { onConflict: 'id' });
    if (error) throw error;
    toast(editingProductId ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!', 'success');
    closeProductModal();
    await loadProducts();
    renderProductsTable();
    renderDashboard();
  } catch (err) {
    toast('Erro: ' + err.message, 'error');
  } finally {
    setBtnLoading('btn-save-product', false, 'Salvar');
  }
}

// ── Delete Product ───────────────────────────────────────────
function confirmDeleteProduct(productId) {
  const p = allProducts.find(x => x.id === productId);
  openConfirm(
    `Excluir o produto "${p?.name || productId}"? Esta ação não pode ser desfeita.`,
    () => deleteProduct(productId)
  );
}

async function deleteProduct(id) {
  const { error } = await _sb.from('products').delete().eq('id', id);
  if (error) { toast('Erro: ' + error.message, 'error'); return; }
  toast('Produto excluído.', 'success');
  await loadProducts();
  renderProductsTable();
  renderDashboard();
}

// ── Categories Table ─────────────────────────────────────────
function renderCategoriesTable() {
  const tbody = document.getElementById('categories-tbody');

  if (allCategories.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state"><i class="fa-solid fa-layer-group"></i><p>Nenhuma categoria cadastrada ainda.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = allCategories.map(c => {
    const count = allProducts.filter(p => p.category === c.id).length;
    return `<tr>
      <td>
        <div style="display:flex;align-items:center;gap:.6rem">
          <div style="width:32px;height:32px;border-radius:6px;background:${esc(c.color || '#6B7280')};display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem">
            <i class="fa-solid ${esc(c.icon || 'fa-house')}"></i>
          </div>
        </div>
      </td>
      <td>
        <strong>${esc(c.name)}</strong>
        <br><small style="color:var(--text-muted)">${esc(c.id)}</small>
      </td>
      <td>
        <span style="display:inline-flex;align-items:center;gap:.4rem">
          <span style="width:14px;height:14px;border-radius:3px;background:${esc(c.color || '#6B7280')};display:inline-block;border:1px solid rgba(0,0,0,.1)"></span>
          ${esc(c.color || '—')}
        </span>
      </td>
      <td>${count} produto${count !== 1 ? 's' : ''}</td>
      <td>
        <div class="actions">
          <button class="btn-icon edit"   onclick="openCategoryModal('${esc(c.id)}')" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon danger" onclick="confirmDeleteCategory('${esc(c.id)}')" title="Excluir"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

// ── Category Modal ───────────────────────────────────────────
function openCategoryModal(id = null) {
  editingCategoryId = id;
  const isEdit = !!id;

  document.getElementById('modal-cat-title').textContent = isEdit ? 'Editar Categoria' : 'Nova Categoria';
  document.getElementById('category-form').reset();
  document.getElementById('cat-id').readOnly   = isEdit;
  document.getElementById('cat-id-hint').style.display = isEdit ? 'none' : '';
  document.getElementById('cat-color').value   = '#6B7280';

  if (isEdit) {
    const c = allCategories.find(x => x.id === id);
    if (!c) return;
    document.getElementById('cat-id').value     = c.id;
    document.getElementById('cat-name').value   = c.name   || '';
    document.getElementById('cat-icon').value   = c.icon   || '';
    document.getElementById('cat-color').value  = c.color  || '#6B7280';
    document.getElementById('cat-image').value  = c.image  || '';
    document.getElementById('cat-order').value  = c.sort_order ?? 0;
  }

  document.getElementById('modal-category').removeAttribute('hidden');
}

function closeCategoryModal() {
  document.getElementById('modal-category').setAttribute('hidden', '');
  editingCategoryId = null;
}

async function submitCategoryForm() {
  const id   = document.getElementById('cat-id').value.trim();
  const name = document.getElementById('cat-name').value.trim();

  if (!name) { toast('O nome da categoria é obrigatório.', 'error'); return; }

  const catId = id || slugify(name);

  const payload = {
    id:         catId,
    name,
    icon:       document.getElementById('cat-icon').value.trim()  || 'fa-house',
    color:      document.getElementById('cat-color').value        || '#6B7280',
    image:      document.getElementById('cat-image').value.trim(),
    sort_order: parseInt(document.getElementById('cat-order').value, 10) || 0,
  };

  setBtnLoading('btn-save-category', true, 'Salvando...');

  try {
    const { error } = await _sb.from('categories').upsert(payload, { onConflict: 'id' });
    if (error) throw error;
    toast(editingCategoryId ? 'Categoria atualizada!' : 'Categoria criada!', 'success');
    closeCategoryModal();
    await loadAll();
  } catch (err) {
    toast('Erro: ' + err.message, 'error');
  } finally {
    setBtnLoading('btn-save-category', false, 'Salvar');
  }
}

function confirmDeleteCategory(catId) {
  const c     = allCategories.find(x => x.id === catId);
  const count = allProducts.filter(p => p.category === catId).length;
  let msg = `Excluir a categoria "${c?.name || catId}"?`;
  if (count > 0) msg += ` Atenção: existem ${count} produto(s) nesta categoria.`;
  openConfirm(msg, () => deleteCategoryAction(catId));
}

async function deleteCategoryAction(id) {
  const { error } = await _sb.from('categories').delete().eq('id', id);
  if (error) { toast('Erro: ' + error.message, 'error'); return; }
  toast('Categoria excluída.', 'success');
  await loadAll();
}

// ── Confirm Dialog ───────────────────────────────────────────
function openConfirm(msg, onConfirm) {
  document.getElementById('confirm-msg').textContent = msg;
  confirmCallback = onConfirm;
  document.getElementById('modal-confirm').removeAttribute('hidden');
}

// ── Toast ────────────────────────────────────────────────────
function toast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ── Helpers ──────────────────────────────────────────────────
function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugify(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 48)
    + '-' + Date.now().toString(36);
}

function thumbHtml(p) {
  if (p.images && p.images[0]) {
    return `<img src="${esc(p.images[0])}" class="prod-thumb" loading="lazy"
              onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <div class="prod-no-img" style="display:none"><i class="fa-solid fa-image"></i></div>`;
  }
  return `<div class="prod-no-img"><i class="fa-solid fa-image"></i></div>`;
}

function badgeTag(badge) {
  const cls = { 'Novo': 'badge-novo', 'Destaque': 'badge-destaque', 'Oferta': 'badge-oferta' };
  return badge
    ? `<span class="badge ${cls[badge] || ''}">${esc(badge)}</span>`
    : `<span class="badge badge-none">—</span>`;
}

function setBtnLoading(id, loading, text) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.disabled   = loading;
  btn.textContent = text;
}


function renderImgPreview() {
  const grid = document.getElementById('img-preview-grid');
  if (!grid) return;
  const urls = (document.getElementById('product-images').value || '')
    .split('\n').map(s => s.trim()).filter(Boolean);
  grid.innerHTML = urls.map((url, i) => `
    <div class="img-thumb">
      <img src="${esc(url)}" alt="" onerror="this.style.opacity='.3'">
      ${i === 0 ? '<span class="img-thumb-label">Capa</span>' : ''}
      <button type="button" onclick="removeImg(${i})" title="Remover foto">
        <i class="fa-solid fa-times"></i>
      </button>
    </div>`).join('');
}

function removeImg(i) {
  const ta   = document.getElementById('product-images');
  const urls = ta.value.split('\n').map(s => s.trim()).filter(Boolean);
  urls.splice(i, 1);
  ta.value = urls.join('\n');
  renderImgPreview();
}

// ── Preview ──────────────────────────────────────────────────
function setPreviewMode(mode) {
  const frame      = document.getElementById('preview-frame');
  const btnDesktop = document.getElementById('btn-view-desktop');
  const btnMobile  = document.getElementById('btn-view-mobile');
  if (mode === 'mobile') {
    frame.classList.add('mobile-view');
    btnMobile.classList.add('active');
    btnDesktop.classList.remove('active');
  } else {
    frame.classList.remove('mobile-view');
    btnDesktop.classList.add('active');
    btnMobile.classList.remove('active');
  }
}

function reloadPreview() {
  const f = document.getElementById('preview-frame');
  f.src = f.src;
}

// ── Boot ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── Login form ──
  document.getElementById('login-form').addEventListener('submit', async e => {
    e.preventDefault();
    const email    = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errEl    = document.getElementById('login-error');

    errEl.textContent = '';
    setBtnLoading('btn-login', true, 'Entrando...');

    try {
      await signIn(email, password);
    } catch {
      errEl.textContent = 'E-mail ou senha incorretos.';
    } finally {
      setBtnLoading('btn-login', false, 'Entrar');
    }
  });

  // ── Logout ──
  document.getElementById('btn-logout').addEventListener('click', signOut);

  // ── Nav ──
  document.querySelectorAll('.nav-item[data-section]').forEach(item => {
    item.addEventListener('click', () => showSection(item.dataset.section));
  });

  // ── Product filters ──
  document.getElementById('products-search').addEventListener('input', e => {
    productSearch = e.target.value;
    renderProductsTable();
  });

  document.getElementById('cat-filter').addEventListener('change', e => {
    productCategoryFilter = e.target.value;
    renderProductsTable();
  });

  // ── Add / Save product ──
  document.getElementById('btn-add-product').addEventListener('click', () => openProductModal());
  document.getElementById('product-form').addEventListener('submit', e => {
    e.preventDefault();
    submitProductForm();
  });
  document.getElementById('btn-cancel-product').addEventListener('click', closeProductModal);
  document.getElementById('btn-close-product').addEventListener('click', closeProductModal);

  // ── Specs ──
  document.getElementById('btn-add-spec').addEventListener('click', () => addSpecRow());

  // ── Add / Save category ──
  document.getElementById('btn-add-category').addEventListener('click', () => openCategoryModal());
  document.getElementById('category-form').addEventListener('submit', e => {
    e.preventDefault();
    submitCategoryForm();
  });
  document.getElementById('btn-cancel-category').addEventListener('click', closeCategoryModal);
  document.getElementById('btn-close-category').addEventListener('click', closeCategoryModal);

  // ── Confirm dialog ──
  document.getElementById('btn-confirm-yes').addEventListener('click', () => {
    document.getElementById('modal-confirm').setAttribute('hidden', '');
    if (confirmCallback) { confirmCallback(); confirmCallback = null; }
  });
  document.getElementById('btn-confirm-no').addEventListener('click', () => {
    document.getElementById('modal-confirm').setAttribute('hidden', '');
    confirmCallback = null;
  });

  // Close modals on backdrop click
  ['modal-product', 'modal-category', 'modal-confirm'].forEach(id => {
    document.getElementById(id).addEventListener('click', e => {
      if (e.target === e.currentTarget) {
        e.currentTarget.setAttribute('hidden', '');
        if (id === 'modal-confirm') confirmCallback = null;
        if (id === 'modal-product')  editingProductId  = null;
        if (id === 'modal-category') editingCategoryId = null;
      }
    });
  });

  // ── Refresh button ──
  document.getElementById('btn-refresh').addEventListener('click', async () => {
    toast('Atualizando dados...', 'info');
    await loadAll();
  });
});
