-- ============================================================
-- SEED — Guarda-Roupas (12 produtos)
-- Execute no Supabase Dashboard:
-- SQL Editor → New Query → Cole tudo e clique em Run
--
-- Imagens já organizadas com os nomes reais dos arquivos.
-- Caminho: assets/images/products/<pasta>/<arquivo>.png
-- ============================================================

INSERT INTO products (id, name, category, badge, description, images, featured, highlight, specs, active)
VALUES

  -- ── Guarda-Roupa Atalaia 2 Portas ───────────────────────────
  (
    'evidencia-atalaia2pt',
    'Guarda-Roupa Atalaia 2 Portas',
    'guarda-roupas',
    'Novo',
    'Guarda-roupa Atalaia com 2 portas, design moderno e espaço interno bem aproveitado. Ideal para quartos compactos sem abrir mão da organização.',
    ARRAY[
      'assets/images/products/evidencia-atalaia2pt/branco.png',
      'assets/images/products/evidencia-atalaia2pt/interna.png',
      'assets/images/products/evidencia-atalaia2pt/dimensoes.png'
    ],
    true, false,
    '{"Portas": "2", "Material": "MDF", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  -- ── Guarda-Roupa Sevilha ────────────────────────────────────
  (
    'evidencia-sevilha',
    'Guarda-Roupa Sevilha',
    'guarda-roupas',
    'Novo',
    'O Guarda-Roupa Sevilha combina elegância e funcionalidade com acabamento premium e amplo espaço interno para toda a família.',
    ARRAY[
      'assets/images/products/evidencia-sevilha/branco.png',
      'assets/images/products/evidencia-sevilha/branco2.png',
      'assets/images/products/evidencia-sevilha/cinamomo.png',
      'assets/images/products/evidencia-sevilha/cinamomo2.png',
      'assets/images/products/evidencia-sevilha/interna.png'
    ],
    false, false,
    '{"Material": "MDF", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  -- ── Guarda-Roupa Veneza ─────────────────────────────────────
  (
    'evidencia-veneza',
    'Guarda-Roupa Veneza',
    'guarda-roupas',
    'Novo',
    'Guarda-Roupa Veneza com visual sofisticado e ótimo aproveitamento interno. Disponível em branco, cinamomo e demolição.',
    ARRAY[
      'assets/images/products/evidencia-veneza/branco.png',
      'assets/images/products/evidencia-veneza/branco2.png',
      'assets/images/products/evidencia-veneza/cinamomo.png',
      'assets/images/products/evidencia-veneza/demoli-o.png',
      'assets/images/products/evidencia-veneza/demolicao2.png',
      'assets/images/products/evidencia-veneza/interna.png'
    ],
    true, false,
    '{"Material": "MDF", "Acabamento": "Branco / Cinamomo / Demolição", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  -- ── Guarda-Roupa Lisboa ─────────────────────────────────────
  (
    'fellicci-lisboa',
    'Guarda-Roupa Lisboa',
    'guarda-roupas',
    'Destaque',
    'Guarda-Roupa Lisboa da Fellicci com design europeu e acabamento de qualidade. Disponível em cinamomo off-white, branco e mel.',
    ARRAY[
      'assets/images/products/fellicci-lisboa/01-cinamomo-off-white.png',
      'assets/images/products/fellicci-lisboa/02-branco.png',
      'assets/images/products/fellicci-lisboa/03-interna.png',
      'assets/images/products/fellicci-lisboa/04-mel.png',
      'assets/images/products/fellicci-lisboa/05-mel2.png'
    ],
    true, true,
    '{"Marca": "Fellicci", "Material": "MDF", "Acabamento": "Cinamomo / Branco / Mel", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  -- ── Guarda-Roupa Porto ──────────────────────────────────────
  (
    'fellicci-porto',
    'Guarda-Roupa Porto',
    'guarda-roupas',
    NULL,
    'Guarda-Roupa Porto Fellicci com linhas modernas e amplo espaço para roupas e acessórios. Disponível em branco e cinamomo off-white.',
    ARRAY[
      'assets/images/products/fellicci-porto/porto.png',
      'assets/images/products/fellicci-porto/branco.png',
      'assets/images/products/fellicci-porto/cinamomo-off-white.png',
      'assets/images/products/fellicci-porto/cinamomooff-white2.png',
      'assets/images/products/fellicci-porto/interna.png'
    ],
    false, false,
    '{"Marca": "Fellicci", "Material": "MDF", "Acabamento": "Branco / Cinamomo Off-White", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  -- ── Guarda-Roupa Diplomata ──────────────────────────────────
  (
    'roup-bartira-diplomata',
    'Guarda-Roupa Diplomata',
    'guarda-roupas',
    NULL,
    'Guarda-Roupa Diplomata Bartira com estrutura robusta e interior bem organizado. Disponível em avelã/capuccino, branco fosco e café.',
    ARRAY[
      'assets/images/products/roup-bartira-diplomata/avelacapuccino.png',
      'assets/images/products/roup-bartira-diplomata/branco-fosco.png',
      'assets/images/products/roup-bartira-diplomata/cafe.png',
      'assets/images/products/roup-bartira-diplomata/interna.png'
    ],
    false, false,
    '{"Marca": "Bartira", "Material": "MDP/MDF", "Acabamento": "Avelã / Branco Fosco / Café", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  -- ── Guarda-Roupa Fortaleza ──────────────────────────────────
  (
    'roup-bartira-fortaleza',
    'Guarda-Roupa Fortaleza',
    'guarda-roupas',
    NULL,
    'Guarda-Roupa Fortaleza Bartira resistente e espaçoso, com prateleiras para organizar tudo com facilidade.',
    ARRAY[
      'assets/images/products/roup-bartira-fortaleza/branco.png',
      'assets/images/products/roup-bartira-fortaleza/interna.png',
      'assets/images/products/roup-bartira-fortaleza/dimensoes.png'
    ],
    false, false,
    '{"Marca": "Bartira", "Material": "MDP/MDF", "Acabamento": "Branco", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  -- ── Guarda-Roupa Napoli ─────────────────────────────────────
  (
    'roup-bartira-napoli',
    'Guarda-Roupa Napoli',
    'guarda-roupas',
    NULL,
    'Guarda-Roupa Napoli Bartira com acabamento refinado e espaço generoso. Ótima opção para quartos de casal.',
    ARRAY[
      'assets/images/products/roup-bartira-napoli/cafe.png',
      'assets/images/products/roup-bartira-napoli/cafe2.png',
      'assets/images/products/roup-bartira-napoli/cafe3.png',
      'assets/images/products/roup-bartira-napoli/interna.png',
      'assets/images/products/roup-bartira-napoli/dimensoes.png'
    ],
    false, false,
    '{"Marca": "Bartira", "Material": "MDP/MDF", "Acabamento": "Café", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  -- ── Guarda-Roupa Hamburgo ───────────────────────────────────
  (
    'roup-hamburgo',
    'Guarda-Roupa Hamburgo',
    'guarda-roupas',
    NULL,
    'Guarda-Roupa Hamburgo com visual clean e funcional, ótima capacidade interna para organização do dia a dia.',
    ARRAY[
      'assets/images/products/roup-hamburgo/1g.png',
      'assets/images/products/roup-hamburgo/3g.png',
      'assets/images/products/roup-hamburgo/dimensoes.png'
    ],
    false, false,
    '{"Material": "MDF", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  -- ── Guarda-Roupa Triunfo ────────────────────────────────────
  (
    'roup-triunfo',
    'Guarda-Roupa Triunfo',
    'guarda-roupas',
    'Destaque',
    'Guarda-Roupa Triunfo com design arrojado e muito espaço interno. Disponível em off-white/peroba e peroba. Uma escolha certeira.',
    ARRAY[
      'assets/images/products/roup-triunfo/off-white-peroba1.png',
      'assets/images/products/roup-triunfo/off-white-peroba2.png',
      'assets/images/products/roup-triunfo/perboba.png',
      'assets/images/products/roup-triunfo/peroba2.png',
      'assets/images/products/roup-triunfo/dimens-es.png'
    ],
    true, true,
    '{"Material": "MDF", "Acabamento": "Off-White / Peroba", "Prateleiras": "Sim", "Gavetas": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  -- ── Guarda-Roupa Zurique ────────────────────────────────────
  (
    'roup-zurique',
    'Guarda-Roupa Zurique',
    'guarda-roupas',
    NULL,
    'Guarda-Roupa Zurique com acabamento moderno e interior amplo. Disponível em off-white e peroba. Elegância e organização para o seu quarto.',
    ARRAY[
      'assets/images/products/roup-zurique/offwhite1.png',
      'assets/images/products/roup-zurique/offwhite2.png',
      'assets/images/products/roup-zurique/perboba.png',
      'assets/images/products/roup-zurique/peroba.png',
      'assets/images/products/roup-zurique/interna.png',
      'assets/images/products/roup-zurique/peso-max.png',
      'assets/images/products/roup-zurique/dimens-es.png'
    ],
    false, false,
    '{"Material": "MDF", "Acabamento": "Off-White / Peroba", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  -- ── Guarda-Roupa Monte Rei ──────────────────────────────────
  (
    'roupeiro-bartira-monte-rei',
    'Guarda-Roupa Monte Rei',
    'guarda-roupas',
    NULL,
    'Guarda-Roupa Monte Rei Bartira, imponente e sofisticado. Disponível em branco/grafite, avelã/capuccino e café/avelã.',
    ARRAY[
      'assets/images/products/roupeiro-bartira-monte-rei/branco-grafite.png',
      'assets/images/products/roupeiro-bartira-monte-rei/branco-grafite2.png',
      'assets/images/products/roupeiro-bartira-monte-rei/avelacapuccino.png',
      'assets/images/products/roupeiro-bartira-monte-rei/cafeavela.png',
      'assets/images/products/roupeiro-bartira-monte-rei/interna.png',
      'assets/images/products/roupeiro-bartira-monte-rei/dimensoes.png'
    ],
    false, false,
    '{"Marca": "Bartira", "Material": "MDP/MDF", "Acabamento": "Branco/Grafite / Avelã/Capuccino / Café/Avelã", "Prateleiras": "Sim", "Gavetas": "Sim", "Cabideiro": "Sim"}',
    true
  )

ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  category    = EXCLUDED.category,
  badge       = EXCLUDED.badge,
  description = EXCLUDED.description,
  images      = EXCLUDED.images,
  featured    = EXCLUDED.featured,
  highlight   = EXCLUDED.highlight,
  specs       = EXCLUDED.specs,
  active      = EXCLUDED.active,
  updated_at  = NOW();
