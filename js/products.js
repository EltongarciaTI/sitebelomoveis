// ============================================================
// CONFIGURAÇÕES DA LOJA — edite aqui
// Este arquivo agora mantém apenas dados gerais da loja,
// categorias padrão e os helpers do front.
// Os PRODUTOS serão carregados pelo Supabase.
// ============================================================
const STORE = {
  name: 'Bello Móveis Algodões',
  tagline: 'Qualidade e bom preço para a sua casa',
  whatsapp: '5575988031491',
  instagram: 'https://www.instagram.com/bello_moveis_algodoes?igsh=MTdwcThoZTJ3dm9zOQ==',
  facebook: '',
  address: 'Praça Tiradentes, em frente à feira de verduras — Algodões/BA',
  phone: '(75) 98803-1491',
  email: '',
  hours: 'Seg a Sex: 8h às 17h30',
  mapsEmbed: ''
};

// ============================================================
// CATEGORIAS
// Padrão do site — substituídas pelo Supabase se a tabela existir.
// Organizadas por grupo: Quarto → Sala → Eletro → Outros
// Para adicionar uma nova categoria, basta inserir no Supabase
// (painel admin) — não é necessário criar novo HTML.
// ============================================================
const CATEGORIES = [
  // ── Quarto ─────────────────────────────────────────────────
  { id: 'camas',         name: 'Camas',             icon: 'fa-bed',          color: '#6B4226', sort_order: 1  },
  { id: 'colchoes',      name: 'Colchões',          icon: 'fa-moon',         color: '#8B6914', sort_order: 2  },
  { id: 'guarda-roupas', name: 'Guarda-Roupas',     icon: 'fa-door-closed',  color: '#4A6741', sort_order: 3  },
  { id: 'box',           name: 'Box',               icon: 'fa-square-full',  color: '#6B4A3A', sort_order: 4  },
  // ── Sala e Estar ────────────────────────────────────────────
  { id: 'sofas',         name: 'Sofás',             icon: 'fa-couch',        color: '#5A3A6B', sort_order: 5  },
  { id: 'mesas',         name: 'Mesas',             icon: 'fa-table',        color: '#7A5A2A', sort_order: 6  },
  { id: 'cadeiras',      name: 'Cadeiras',          icon: 'fa-chair',        color: '#4A6B5A', sort_order: 7  },
  { id: 'estantes',      name: 'Estantes e Racks',  icon: 'fa-layer-group',  color: '#3A5A6B', sort_order: 8  },
  { id: 'paineis',       name: 'Painéis',           icon: 'fa-display',      color: '#2A4A6B', sort_order: 9  },
  { id: 'armarios',      name: 'Armários',          icon: 'fa-box-archive',  color: '#5A3A1A', sort_order: 10 },
  // ── Eletrodomésticos ────────────────────────────────────────
  { id: 'tv',            name: 'Televisores',       icon: 'fa-tv',           color: '#1A3A6B', sort_order: 11 },
  { id: 'fogoes',        name: 'Fogões e Fornos',   icon: 'fa-fire',         color: '#8B2E1A', sort_order: 12 },
  { id: 'lavanderia',    name: 'Lavanderia',        icon: 'fa-soap',         color: '#1A6B5A', sort_order: 13 },
  { id: 'ventiladores',  name: 'Ventiladores',      icon: 'fa-fan',          color: '#3A4A6B', sort_order: 14 },
  // ── Outros ──────────────────────────────────────────────────
  { id: 'bicicletas',    name: 'Bicicletas',        icon: 'fa-bicycle',      color: '#2A6B3A', sort_order: 15 },
  { id: 'outros',        name: 'Outros',            icon: 'fa-ellipsis',     color: '#6B7280', sort_order: 16 },
];

// ============================================================
// PRODUTOS
// Array iniciado vazio porque os dados agora vêm do Supabase.
// Estrutura esperada por item:
// {
//   id, name, category, badge, description, images, featured, highlight, specs
// }
// ============================================================
const PRODUCTS = [];

function getWhatsAppLink(productName = null) {
  const base = `https://wa.me/${STORE.whatsapp}`;
  if (productName) {
    const msg = encodeURIComponent(
      `Olá! Tenho interesse no produto: *${productName}*. Poderia me informar a disponibilidade e o preço? 😊`
    );
    return `${base}?text=${msg}`;
  }
  const msg = encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos da loja. ');
  return `${base}?text=${msg}`;
}

function getProductById(id) {
  return PRODUCTS.find(p => String(p.id) === String(id)) || null;
}

function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

function getHighlightProducts() {
  return PRODUCTS.filter(p => p.highlight);
}

function searchProducts(term) {
  const t = term.toLowerCase().trim();
  return PRODUCTS.filter(p =>
    (p.name || '').toLowerCase().includes(t) ||
    (p.description || '').toLowerCase().includes(t) ||
    (p.category || '').toLowerCase().includes(t)
  );
}
