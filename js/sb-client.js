// ============================================================
// SUPABASE CLIENT — Casa & Conforto
// Busca produtos e categorias no Supabase e popula o front.
// ============================================================

const SUPABASE_URL = 'https://nwgqafruaokqjmxhczry.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53Z3FhZnJ1YW9rcWpteGhjenJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5Njg3NDUsImV4cCI6MjA5MDU0NDc0NX0.OEupeGgpFAp-cEAXcy0Tn91YK5E5fAakknLAxPqdCCQ';

const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadDataFromSupabase() {
  try {
    const { data: prodData, error: prodErr } = await _sb
      .from('products')
      .select('*')
      .eq('active', true)
      .order('name');

    if (prodErr) {
      console.warn('[Supabase] Erro ao buscar produtos:', prodErr.message);
    } else {
      PRODUCTS.length = 0;
      (prodData || []).forEach(row => {
        PRODUCTS.push({
          id: row.id,
          name: row.name,
          category: row.category,
          badge: row.badge || null,
          description: row.description || '',
          images: Array.isArray(row.images) ? row.images : [],
          featured: !!row.featured,
          highlight: !!row.highlight,
          specs: row.specs || {}
        });
      });
      console.log(`[Supabase] ${PRODUCTS.length} produtos carregados.`);
    }

    const { data: catData, error: catErr } = await _sb
      .from('categories')
      .select('*')
      .order('sort_order');

    if (catErr) {
      console.warn('[Supabase] Erro ao buscar categorias:', catErr.message);
    } else if (catData && catData.length > 0) {
      CATEGORIES.length = 0;
      catData.forEach(c => {
        CATEGORIES.push({
          id: c.id,
          name: c.name,
          icon: c.icon || 'fa-house',
          color: c.color || '#6B7280',
          image: c.image || ''
        });
      });
      console.log(`[Supabase] ${CATEGORIES.length} categorias carregadas.`);
    }
  } catch (err) {
    console.warn('[Supabase] Falha na conexão.', err.message);
  }

  document.dispatchEvent(new Event('data-ready'));
}

loadDataFromSupabase();
