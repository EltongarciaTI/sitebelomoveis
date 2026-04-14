-- ============================================================
-- CASA & CONFORTO — Seed de Categorias (nova estrutura)
-- Execute este SQL no Supabase:
-- Dashboard → SQL Editor → New Query → Cole e clique em Run
--
-- Este arquivo UPSERT todas as 16 categorias organizadas.
-- Caso já existam categorias com o mesmo ID, elas serão atualizadas.
-- ============================================================

INSERT INTO categories (id, name, icon, color, sort_order)
VALUES
  -- ── Quarto ──────────────────────────────────────────────────
  ('camas',         'Camas',             'fa-bed',          '#6B4226', 1),
  ('colchoes',      'Colchões',          'fa-moon',         '#8B6914', 2),
  ('guarda-roupas', 'Guarda-Roupas',     'fa-door-closed',  '#4A6741', 3),
  ('box',           'Box',               'fa-square-full',  '#6B4A3A', 4),

  -- ── Sala e Estar ────────────────────────────────────────────
  ('sofas',         'Sofás',             'fa-couch',        '#5A3A6B', 5),
  ('mesas',         'Mesas',             'fa-table',        '#7A5A2A', 6),
  ('cadeiras',      'Cadeiras',          'fa-chair',        '#4A6B5A', 7),
  ('estantes',      'Estantes e Racks',  'fa-layer-group',  '#3A5A6B', 8),
  ('paineis',       'Painéis',           'fa-display',      '#2A4A6B', 9),
  ('armarios',      'Armários',          'fa-box-archive',  '#5A3A1A', 10),

  -- ── Eletrodomésticos ────────────────────────────────────────
  ('tv',            'Televisores',       'fa-tv',           '#1A3A6B', 11),
  ('fogoes',        'Fogões e Fornos',   'fa-fire',         '#8B2E1A', 12),
  ('lavanderia',    'Lavanderia',        'fa-soap',         '#1A6B5A', 13),
  ('ventiladores',  'Ventiladores',      'fa-fan',          '#3A4A6B', 14),

  -- ── Outros ──────────────────────────────────────────────────
  ('bicicletas',    'Bicicletas',        'fa-bicycle',      '#2A6B3A', 15),
  ('outros',        'Outros',            'fa-ellipsis',     '#6B7280', 16)

ON CONFLICT (id) DO UPDATE SET
  name       = EXCLUDED.name,
  icon       = EXCLUDED.icon,
  color      = EXCLUDED.color,
  sort_order = EXCLUDED.sort_order;

-- ============================================================
-- MIGRAÇÃO OPCIONAL: produtos das categorias antigas
-- Descomente e ajuste conforme necessário antes de executar.
-- ============================================================

-- Produtos que estavam em "sala" → mover para "sofas"
-- (ou para outra categoria mais adequada — verifique antes de executar)
-- UPDATE products SET category = 'sofas' WHERE category = 'sala';

-- Produtos que estavam em "utilidades" → mover para "outros"
-- UPDATE products SET category = 'outros' WHERE category = 'utilidades';

-- Remover categorias antigas que foram substituídas
-- (só execute DEPOIS de migrar os produtos acima!)
-- DELETE FROM categories WHERE id IN ('sala', 'utilidades');
