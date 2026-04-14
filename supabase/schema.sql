-- ============================================================
-- CASA & CONFORTO — Schema Supabase
-- Execute este SQL no painel do Supabase:
-- Dashboard → SQL Editor → New Query → Cole e clique em Run
-- ============================================================

-- ── Tabela de categorias ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  icon        TEXT DEFAULT 'fa-house',
  color       TEXT DEFAULT '#6B7280',
  image       TEXT DEFAULT '',
  sort_order  INTEGER DEFAULT 0
);

-- ── Tabela de produtos ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  category    TEXT REFERENCES categories(id) ON DELETE SET NULL,
  badge       TEXT CHECK (badge IN ('Novo', 'Destaque', 'Oferta') OR badge IS NULL),
  description TEXT DEFAULT '',
  images      TEXT[] DEFAULT '{}',
  featured    BOOLEAN DEFAULT false,
  highlight   BOOLEAN DEFAULT false,
  specs       JSONB DEFAULT '{}',
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Índices ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_products_category  ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured  ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_highlight ON products(highlight) WHERE highlight = true;
CREATE INDEX IF NOT EXISTS idx_products_active    ON products(active) WHERE active = true;

-- ── Row Level Security (leitura pública, escrita só autenticada) ──
ALTER TABLE products   ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode LER produtos ativos
CREATE POLICY "leitura publica produtos"
  ON products FOR SELECT
  USING (active = true);

-- Qualquer pessoa pode LER categorias
CREATE POLICY "leitura publica categorias"
  ON categories FOR SELECT
  TO anon USING (true);

-- Apenas autenticados (service_role / admin) podem escrever
CREATE POLICY "escrita apenas admin produtos"
  ON products FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "escrita apenas admin categorias"
  ON categories FOR ALL
  USING (auth.role() = 'service_role');

-- ── Trigger: atualiza updated_at automaticamente ──────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
