// ============================================================
// CASA & CONFORTO — Main Script
// ============================================================

// ── DOM Ready + Data Ready ────────────────────────────────────
// Aguarda tanto o DOM quanto os dados do Supabase estarem prontos
let _domReady  = false;
let _dataReady = false;

function _tryInit() {
  if (!_domReady || !_dataReady) return;
  initHeader();
  initSearchOverlay();
  initWaFloat();
  routePageInit();
}

document.addEventListener('DOMContentLoaded', () => {
  _domReady = true;
  _tryInit();
});

// Disparado pelo sb-client.js após buscar dados do Supabase
document.addEventListener('data-ready', () => {
  _dataReady = true;
  _tryInit();
});

// ── Route to the right page initializer ─────────────────────
function routePageInit() {
  const body = document.body.dataset.page;
  if (!body) return;
  switch (body) {
    case 'home':       initHomePage();     break;
    case 'catalog':    initCatalogPage();  break;
    case 'category':   initCategoryPage(); break;
    case 'product':    initProductPage();  break;
    case 'offers':     initOffersPage();   break;
  }
}

// ── Header behavior ─────────────────────────────────────────
function initHeader() {
  const header    = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const drawer    = document.querySelector('.nav-drawer');

  if (!header) return;

  // Scroll shadow
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Popula categorias no drawer e footer dinamicamente
  renderNavDrawerCategories();
  renderFooterCategories();
  hideMissingSocials();

  // Mobile menu (re-bind após renderizar links dinâmicos)
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      drawer.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on backdrop click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && !drawer.contains(e.target)) {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
}

// Renderiza links de categoria no drawer mobile dinamicamente
function renderNavDrawerCategories() {
  const container = document.getElementById('drawer-cats');
  if (!container) return;
  container.innerHTML = CATEGORIES.map(cat => `
    <a href="categoria.html?id=${cat.id}">
      <i class="fa-solid ${cat.icon}"></i> ${escHtml(cat.name)}
    </a>
  `).join('');
}

// Oculta ícones de redes sociais sem URL configurada
function hideMissingSocials() {
  [
    ['footer-ig',  STORE.instagram],
    ['footer-fb',  STORE.facebook],
    ['social-ig',  STORE.instagram],
    ['social-fb',  STORE.facebook],
  ].forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el && !url) el.style.display = 'none';
  });
}

// Renderiza links de categoria no footer dinamicamente (primeiras 8)
function renderFooterCategories() {
  const ul = document.getElementById('footer-cats');
  if (!ul) return;
  ul.innerHTML = CATEGORIES.slice(0, 8).map(cat => `
    <li><a href="categoria.html?id=${cat.id}"><i class="fa-solid fa-chevron-right"></i> ${escHtml(cat.name)}</a></li>
  `).join('');
}

// ── Search overlay ───────────────────────────────────────────
function initSearchOverlay() {
  const overlay   = document.querySelector('.search-overlay');
  const openBtns  = document.querySelectorAll('.nav-search-btn');
  const closeBtn  = document.querySelector('.search-close');
  const input     = document.querySelector('#search-input');
  const preview   = document.querySelector('#search-results-preview');

  if (!overlay) return;

  function openSearch() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 100);
  }
  function closeSearch() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (input)   input.value = '';
    if (preview) preview.innerHTML = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openSearch));
  closeBtn?.addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

  // Live search preview
  if (input && preview) {
    input.addEventListener('input', debounce(() => {
      const term = input.value.trim();
      if (term.length < 2) { preview.innerHTML = ''; return; }
      const results = searchProducts(term).slice(0, 6);
      if (!results.length) {
        preview.innerHTML = `<p style="padding:1rem;font-size:.85rem;color:var(--c-text-muted);text-align:center">Nenhum produto encontrado para "<strong>${escHtml(term)}</strong>"</p>`;
        return;
      }
      preview.innerHTML = results.map(p => `
        <a href="produto.html?id=${p.id}" style="display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;border-bottom:1px solid var(--c-border-light);text-decoration:none;transition:background var(--t-fast);"
           onmouseover="this.style.background='var(--c-surface-warm)'" onmouseout="this.style.background=''">
          <div style="width:48px;height:48px;border-radius:8px;overflow:hidden;background:var(--c-surface-warm);flex-shrink:0">
            ${productThumb(p)}
          </div>
          <div>
            <div style="font-size:.85rem;font-weight:600;color:var(--c-text)">${escHtml(p.name)}</div>
            <div style="font-size:.75rem;color:var(--c-accent)">${getCategoryName(p.category)}</div>
          </div>
        </a>
      `).join('');
    }, 250));

    // Submit → catalog page with query
    overlay.querySelector('form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (q) window.location.href = `catalogo.html?q=${encodeURIComponent(q)}`;
    });
  }
}

// ── WhatsApp floating button ─────────────────────────────────
function initWaFloat() {
  const btn = document.querySelector('.wa-float-btn');
  if (!btn) return;
  btn.href = getWhatsAppLink();
}

// ══════════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════════
function initHomePage() {
  renderCategoryCards();
  renderFeaturedProducts();
}

const HOME_CATS_LIMIT = 8; // máx. de categorias exibidas na home

function renderCategoryCards() {
  const grid = document.getElementById('cat-grid');
  if (!grid) return;

  const visible = CATEGORIES.slice(0, HOME_CATS_LIMIT);

  grid.innerHTML = visible.map(cat => {
    const count = PRODUCTS.filter(p => p.category === cat.id).length;
    return `
      <a class="cat-card" href="categoria.html?id=${cat.id}">
        <div class="cat-card-icon" style="background:${cat.color}">
          <i class="fa-solid ${cat.icon}"></i>
        </div>
        <div class="cat-card-name">${escHtml(cat.name)}</div>
        <div class="cat-card-count">${count} produto${count !== 1 ? 's' : ''}</div>
        <i class="fa-solid fa-arrow-right cat-card-arrow"></i>
      </a>
    `;
  }).join('');

  // Mostra o botão "Ver todas" se existirem mais categorias do que o limite
  const moreWrap = document.getElementById('cat-more-wrap');
  if (moreWrap) moreWrap.hidden = CATEGORIES.length <= HOME_CATS_LIMIT;
}

function renderFeaturedProducts() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const products = getFeaturedProducts().slice(0, 8);
  renderProductGrid(grid, products);
}

// ══════════════════════════════════════════════════════════════
// CATALOG PAGE
// ══════════════════════════════════════════════════════════════
let catalogPage   = 0;
let catalogFiltered = [];
const CATALOG_PER_PAGE = 12;

function initCatalogPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const q   = urlParams.get('q') || '';
  const cat = urlParams.get('cat') || '';

  buildFilterChips('cat-filters', cat);

  const searchInput = document.getElementById('catalog-search');
  if (searchInput && q) searchInput.value = q;

  // Event listeners
  searchInput?.addEventListener('input', debounce(() => applyCatalogFilters(), 300));

  applyCatalogFilters(cat, q);

  document.getElementById('load-more-btn')?.addEventListener('click', () => {
    catalogPage++;
    renderCatalogPage(false);
  });
}

function applyCatalogFilters(forceCat, forceQ) {
  const searchInput = document.getElementById('catalog-search');
  const q   = forceQ  ?? (searchInput?.value.trim() || '');
  const cat = forceCat ?? getActiveChip('cat-filters');

  let results = [...PRODUCTS];
  if (cat) results = results.filter(p => p.category === cat);
  if (q)   results = results.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.description.toLowerCase().includes(q.toLowerCase())
  );

  catalogFiltered = results;
  catalogPage = 0;

  const countEl = document.getElementById('catalog-count');
  if (countEl) countEl.textContent = `${results.length} produto${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`;

  renderCatalogPage(true);
}

function renderCatalogPage(reset) {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  const start = catalogPage * CATALOG_PER_PAGE;
  const end   = start + CATALOG_PER_PAGE;
  const slice = catalogFiltered.slice(start, end);

  if (reset) grid.innerHTML = '';
  if (slice.length === 0 && reset) {
    grid.innerHTML = `<div class="empty-state"><i class="fa-solid fa-box-open"></i><p>Nenhum produto encontrado.</p></div>`;
  } else {
    slice.forEach(p => {
      const card = createProductCard(p);
      grid.appendChild(card);
    });
  }

  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = end < catalogFiltered.length ? 'inline-flex' : 'none';
  }
}

function buildFilterChips(containerId, activeCat) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const chips = [{ id: '', name: 'Todos' }, ...CATEGORIES];
  container.innerHTML = chips.map(c => `
    <button class="chip ${c.id === activeCat ? 'active' : ''}" data-cat="${c.id}"
            onclick="setChipFilter('${containerId}', '${c.id}', this)">
      ${c.name}
    </button>
  `).join('');
}

window.setChipFilter = function(containerId, cat, el) {
  document.querySelectorAll(`#${containerId} .chip`).forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  applyCatalogFilters(cat || undefined);
};

function getActiveChip(containerId) {
  const active = document.querySelector(`#${containerId} .chip.active`);
  return active?.dataset.cat || '';
}

// ══════════════════════════════════════════════════════════════
// CATEGORY PAGE  (página única: categoria.html?id=xxx)
// ══════════════════════════════════════════════════════════════
function initCategoryPage() {
  // Lê o ID da URL (?id=xxx) — compatibilidade com data-category legado
  const urlParams = new URLSearchParams(window.location.search);
  const catId = urlParams.get('id') || document.body.dataset.category || '';

  if (!catId) {
    _showCategoryNotFound();
    return;
  }

  const catObj = CATEGORIES.find(c => c.id === catId);

  // Título da aba
  if (catObj) document.title = `${catObj.name} — ${STORE.name}`;

  // Breadcrumb dinâmico
  const bc = document.getElementById('cat-breadcrumb');
  if (bc) {
    bc.innerHTML = `
      <a href="index.html">Início</a>
      <i class="fa-solid fa-chevron-right"></i>
      <a href="catalogo.html">Catálogo</a>
      <i class="fa-solid fa-chevron-right"></i>
      <span>${escHtml(catObj?.name || catId)}</span>
    `;
  }

  // Ícone do banner
  const bannerIcon = document.getElementById('cat-banner-icon');
  if (bannerIcon && catObj) bannerIcon.className = `fa-solid ${catObj.icon}`;

  // Título do banner
  const bannerTitle = document.getElementById('cat-banner-title');
  if (bannerTitle) bannerTitle.textContent = catObj?.name || catId;

  // Subtítulo do banner
  const bannerSub = document.getElementById('cat-banner-sub');
  if (bannerSub && catObj) {
    const count = PRODUCTS.filter(p => p.category === catId).length;
    bannerSub.innerHTML = `Confira nossos produtos — <span id="cat-count">${count} produto${count !== 1 ? 's' : ''}</span>`;
  }

  // Renderiza grid de produtos
  const products = getProductsByCategory(catId);
  const grid     = document.getElementById('category-grid');
  if (!grid) return;
  renderProductGrid(grid, products);

  // Atualiza contagem caso já exista o elemento separado
  const countEl = document.getElementById('cat-count');
  if (countEl) countEl.textContent = `${products.length} produto${products.length !== 1 ? 's' : ''}`;
}

function _showCategoryNotFound() {
  const grid = document.getElementById('category-grid');
  if (grid) {
    grid.innerHTML = `
      <div style="text-align:center;padding:4rem 1rem;grid-column:1/-1">
        <i class="fa-solid fa-box-open" style="font-size:3rem;color:var(--c-text-muted);opacity:.4;display:block;margin-bottom:1rem"></i>
        <h2 style="color:var(--c-primary);margin-bottom:.5rem">Categoria não encontrada</h2>
        <p style="margin-bottom:1.5rem">A categoria que você procura não existe.</p>
        <a href="catalogo.html" class="btn btn-primary">Ver catálogo completo</a>
      </div>
    `;
  }
}

// ══════════════════════════════════════════════════════════════
// PRODUCT DETAIL PAGE
// ══════════════════════════════════════════════════════════════
function initProductPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (!id) { showProductNotFound(); return; }

  const product = getProductById(id);
  if (!product) { showProductNotFound(); return; }

  // Title
  document.title = `${product.name} — ${STORE.name}`;

  // Breadcrumb
  const bc = document.getElementById('product-breadcrumb');
  if (bc) {
    const catObj = CATEGORIES.find(c => c.id === product.category);
    bc.innerHTML = `
      <a href="index.html">Início</a>
      <i class="fa-solid fa-chevron-right"></i>
      <a href="catalogo.html">Catálogo</a>
      <i class="fa-solid fa-chevron-right"></i>
      <a href="categoria.html?id=${product.category}">${escHtml(catObj?.name || product.category)}</a>
      <i class="fa-solid fa-chevron-right"></i>
      <span>${escHtml(product.name)}</span>
    `;
  }

  // Category
  const catEl = document.getElementById('product-category');
  if (catEl) {
    const catObj = CATEGORIES.find(c => c.id === product.category);
    catEl.textContent = catObj?.name || product.category;
    catEl.href = `categoria.html?id=${product.category}`;
  }

  // Name
  const nameEl = document.getElementById('product-name');
  if (nameEl) nameEl.textContent = product.name;

  // Description
  const descEl = document.getElementById('product-desc');
  if (descEl) descEl.textContent = product.description;

  // Galeria de imagens
  renderProductGallery(product);

  // Badge
  if (product.badge) {
    const badgeEl = document.getElementById('product-badge');
    if (badgeEl) {
      badgeEl.textContent = product.badge;
      badgeEl.className = `badge badge-${product.badge.toLowerCase().replace('ê', 'e')}`;
    }
  }

  // Specs
  const specsEl = document.getElementById('product-specs');
  if (specsEl && product.specs) {
    const rows = Object.entries(product.specs)
      .filter(([, v]) => v)
      .map(([k, v]) => `
        <div class="spec-row">
          <span class="spec-label">${escHtml(k)}</span>
          <span class="spec-value">${escHtml(v)}</span>
        </div>
      `).join('');
    specsEl.innerHTML = rows || '<p style="padding:1rem;font-size:.85rem;color:var(--c-text-muted)">Consulte-nos para mais informações.</p>';
  }

  // WhatsApp buttons
  const waLink = getWhatsAppLink(product.name);
  document.querySelectorAll('.product-wa-btn').forEach(btn => {
    btn.href = waLink;
  });

  // Related products
  const relatedGrid = document.getElementById('related-grid');
  if (relatedGrid) {
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    renderProductGrid(relatedGrid, related);
  }
}

function showProductNotFound() {
  const content = document.getElementById('product-content');
  if (content) {
    content.innerHTML = `
      <div style="text-align:center;padding:4rem 1rem">
        <i class="fa-solid fa-box-open" style="font-size:3rem;color:var(--c-text-muted);opacity:.4;display:block;margin-bottom:1rem"></i>
        <h2 style="color:var(--c-primary);margin-bottom:.5rem">Produto não encontrado</h2>
        <p style="margin-bottom:1.5rem">O produto que você procura não está disponível.</p>
        <a href="catalogo.html" class="btn btn-primary">Ver catálogo completo</a>
      </div>
    `;
  }
}

// ══════════════════════════════════════════════════════════════
// OFFERS PAGE
// ══════════════════════════════════════════════════════════════
function initOffersPage() {
  const grid = document.getElementById('offers-grid');
  if (!grid) return;
  const products = getHighlightProducts();
  renderProductGrid(grid, products);

  const countEl = document.getElementById('offers-count');
  if (countEl) countEl.textContent = `${products.length} produto${products.length !== 1 ? 's' : ''}`;
}

// ══════════════════════════════════════════════════════════════
// RENDER HELPERS
// ══════════════════════════════════════════════════════════════

function renderProductGrid(container, products) {
  if (!products.length) {
    container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-box-open"></i><p>Nenhum produto nesta categoria ainda.</p><a href="catalogo.html" class="btn btn-outline-dark btn-sm" style="margin-top:.75rem">Ver todos os produtos</a></div>`;
    return;
  }
  container.innerHTML = '';
  products.forEach(p => container.appendChild(createProductCard(p)));
}

function createProductCard(product) {
  const div  = document.createElement('div');
  div.className = 'product-card fade-up';
  const catObj  = CATEGORIES.find(c => c.id === product.category);
  const waLink  = getWhatsAppLink(product.name);

  div.innerHTML = `
    <a href="produto.html?id=${product.id}" class="product-card-img">
      ${product.badge ? `<span class="badge badge-${product.badge.toLowerCase().replace('ê','e').replace('ã','a')}">${escHtml(product.badge)}</span>` : ''}
      ${productImgHtml(product)}
    </a>
    <div class="product-card-body">
      <div class="product-card-cat">${catObj?.name || product.category}</div>
      <div class="product-card-name">${escHtml(product.name)}</div>
      <div class="product-card-desc">${escHtml(product.description)}</div>
      <div class="product-card-actions mt-auto">
        <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-wa btn-sm">
          <i class="fa-brands fa-whatsapp"></i> Pedir agora
        </a>
        <a href="produto.html?id=${product.id}" class="btn-detail" title="Ver detalhes">
          <i class="fa-solid fa-eye"></i>
        </a>
      </div>
    </div>
  `;
  return div;
}

// ── Product Gallery ──────────────────────────────────────
function renderProductGallery(product) {
  const container = document.getElementById('product-gallery');
  if (!container) return;

  const images  = (product.images || []).filter(Boolean);
  const catIcon = CATEGORIES.find(c => c.id === product.category)?.icon || 'fa-couch';

  const placeholder = `
    <div class="img-placeholder">
      <i class="fa-solid ${catIcon}" style="font-size:4rem;opacity:.25"></i>
      <span>Foto do produto</span>
    </div>`;

  if (!images.length) {
    container.innerHTML = `<div class="gallery-main">${placeholder}</div>`;
    return;
  }

  const mainHtml = `
    <div class="gallery-main">
      <img id="gallery-active-img"
           src="${escHtml(images[0])}"
           alt="${escHtml(product.name)}"
           loading="eager"
           onerror="this.parentElement.innerHTML='${placeholder.replace(/\n\s*/g,' ').replace(/'/g,"\\'")}'"
      >
    </div>`;

  const thumbsHtml = images.length > 1 ? `
    <div class="gallery-thumbs" id="gallery-thumbs">
      ${images.map((img, i) => `
        <button class="gallery-thumb ${i === 0 ? 'active' : ''}"
                onclick="setGalleryImg('${escHtml(img)}', this)"
                aria-label="Foto ${i + 1}">
          <img src="${escHtml(img)}"
               alt="${escHtml(product.name)} — foto ${i + 1}"
               loading="lazy"
               onerror="this.closest('.gallery-thumb').style.display='none'">
        </button>`).join('')}
    </div>` : '';

  container.innerHTML = mainHtml + thumbsHtml;
}

window.setGalleryImg = function(src, btn) {
  const activeImg = document.getElementById('gallery-active-img');
  if (!activeImg) return;
  activeImg.classList.add('fade');
  setTimeout(() => {
    activeImg.src = src;
    activeImg.classList.remove('fade');
  }, 150);
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
};

function productImgHtml(product, large = false) {
  const src = product.images?.[0];
  const size = large ? 'font-size:4rem' : 'font-size:2.2rem';
  const catIcon = CATEGORIES.find(c => c.id === product.category)?.icon || 'fa-house';
  const placeholder = `
    <div class="img-placeholder">
      <i class="fa-solid ${catIcon}" style="${size};opacity:.25"></i>
      <span>Foto do produto</span>
    </div>
  `;
  if (!src) return placeholder;
  return `<img src="${escHtml(src)}" alt="${escHtml(product.name)}" loading="lazy" onerror="this.parentElement.innerHTML='${placeholder.replace(/'/g, "\\'").replace(/\n/g, '')}'">`;
}

function productThumb(product) {
  const src = product.images?.[0];
  const catIcon = CATEGORIES.find(c => c.id === product.category)?.icon || 'fa-house';
  if (!src) return `<div class="img-placeholder"><i class="fa-solid ${catIcon}" style="font-size:1.2rem;opacity:.3"></i></div>`;
  return `<img src="${escHtml(src)}" alt="${escHtml(product.name)}" style="width:100%;height:100%;object-fit:cover">`;
}

function getCategoryName(catId) {
  return CATEGORIES.find(c => c.id === catId)?.name || catId;
}

// ── Utilities ────────────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ── Lazy fade-in observer ────────────────────────────────────
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  // Observe cards added to the DOM
  const mutObs = new MutationObserver(() => {
    document.querySelectorAll('.product-card:not([data-observed])').forEach(el => {
      el.dataset.observed = '1';
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
      observer.observe(el);
    });
  });
  mutObs.observe(document.body, { childList: true, subtree: true });
}
