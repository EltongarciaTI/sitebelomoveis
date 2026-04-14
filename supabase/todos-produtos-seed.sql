-- ============================================================
-- SEED COMPLETO — Todos os Produtos (23 produtos)
-- Bello Móveis Algodões
--
-- Execute no Supabase Dashboard:
-- SQL Editor → New Query → Cole tudo e clique em Run
--
-- Este arquivo usa UPSERT (ON CONFLICT DO UPDATE):
-- se o produto já existir ele é atualizado, não duplicado.
-- ============================================================

INSERT INTO products (id, name, category, badge, description, images, featured, highlight, specs, active)
VALUES

-- ════════════════════════════════════════════════════════════
-- GUARDA-ROUPAS (17 produtos)
-- ════════════════════════════════════════════════════════════

  (
    'evidencia-atalaia2pt',
    'Guarda-Roupa Atalaia 2 Portas',
    'guarda-roupas', 'Novo',
    'Guarda-roupa Atalaia com 2 portas, design moderno e espaço interno bem aproveitado. Ideal para quartos compactos.',
    ARRAY[
      'assets/images/products/evidencia-atalaia2pt/branco.png',
      'assets/images/products/evidencia-atalaia2pt/interna.png',
      'assets/images/products/evidencia-atalaia2pt/dimensoes.png'
    ],
    true, false,
    '{"Portas": "2", "Material": "MDF", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  (
    'evidencia-atalaia4pts',
    'Guarda-Roupa Atalaia 4 Portas',
    'guarda-roupas', NULL,
    'Guarda-roupa Atalaia com 4 portas e amplo espaço interno. Disponível em branco e cinamomo.',
    ARRAY[
      'assets/images/products/evidencia-atalaia4pts/branco.png',
      'assets/images/products/evidencia-atalaia4pts/cinamomo.png',
      'assets/images/products/evidencia-atalaia4pts/cinamomo2.png',
      'assets/images/products/evidencia-atalaia4pts/interna.png',
      'assets/images/products/evidencia-atalaia4pts/dimensoes.png'
    ],
    false, false,
    '{"Portas": "4", "Material": "MDF", "Acabamento": "Branco / Cinamomo", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  (
    'evidencia-capelinha-4pt',
    'Guarda-Roupa Capelinha 4 Portas',
    'guarda-roupas', NULL,
    'Guarda-roupa Capelinha com 4 portas e visual elegante. Disponível em branco.',
    ARRAY[
      'assets/images/products/evidencia-capelinha-4pt/branco.png',
      'assets/images/products/evidencia-capelinha-4pt/branco2.png',
      'assets/images/products/evidencia-capelinha-4pt/interna.png'
    ],
    false, false,
    '{"Portas": "4", "Material": "MDF", "Acabamento": "Branco", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  (
    'evidencia-isabela',
    'Guarda-Roupa Isabela',
    'guarda-roupas', 'Novo',
    'Guarda-roupa Isabela com design sofisticado e espaço interno organizado. Disponível em cinamomo off-white.',
    ARRAY[
      'assets/images/products/evidencia-isabela/cinamomo-offwhite.png',
      'assets/images/products/evidencia-isabela/2.png',
      'assets/images/products/evidencia-isabela/interno.png'
    ],
    false, false,
    '{"Material": "MDF", "Acabamento": "Cinamomo Off-White", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  (
    'evidencia-montreal',
    'Guarda-Roupa Montreal',
    'guarda-roupas', NULL,
    'Guarda-roupa Montreal com linhas modernas e acabamento em cinamomo. Interior espaçoso para toda a família.',
    ARRAY[
      'assets/images/products/evidencia-montreal/cinamomo.png',
      'assets/images/products/evidencia-montreal/interna.png',
      'assets/images/products/evidencia-montreal/dimensoes.png'
    ],
    false, false,
    '{"Material": "MDF", "Acabamento": "Cinamomo", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  (
    'evidencia-sevilha',
    'Guarda-Roupa Sevilha',
    'guarda-roupas', 'Novo',
    'O Guarda-Roupa Sevilha combina elegância e funcionalidade. Disponível em branco e cinamomo.',
    ARRAY[
      'assets/images/products/evidencia-sevilha/branco.png',
      'assets/images/products/evidencia-sevilha/branco2.png',
      'assets/images/products/evidencia-sevilha/cinamomo.png',
      'assets/images/products/evidencia-sevilha/cinamomo2.png',
      'assets/images/products/evidencia-sevilha/interna.png'
    ],
    false, false,
    '{"Material": "MDF", "Acabamento": "Branco / Cinamomo", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  (
    'evidencia-veneza',
    'Guarda-Roupa Veneza',
    'guarda-roupas', 'Novo',
    'Guarda-Roupa Veneza com visual sofisticado. Disponível em branco, cinamomo e demolição.',
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

  (
    'demolicao-artico',
    'Guarda-Roupa Ártico Demolição',
    'guarda-roupas', 'Destaque',
    'Guarda-roupa Ártico com acabamento exclusivo demolição. Visual rústico e moderno ao mesmo tempo, com amplo interior.',
    ARRAY[
      'assets/images/products/demolicao-artico/branco.png',
      'assets/images/products/demolicao-artico/branco-2.png',
      'assets/images/products/demolicao-artico/interna.png',
      'assets/images/products/demolicao-artico/dimensoes.png'
    ],
    true, true,
    '{"Material": "MDF", "Acabamento": "Demolição / Branco", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  (
    'fellicci-lisboa',
    'Guarda-Roupa Lisboa',
    'guarda-roupas', 'Destaque',
    'Guarda-Roupa Lisboa da Fellicci com design europeu. Disponível em cinamomo off-white, branco e mel.',
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

  (
    'fellicci-porto',
    'Guarda-Roupa Porto',
    'guarda-roupas', NULL,
    'Guarda-Roupa Porto Fellicci com linhas modernas. Disponível em branco e cinamomo off-white.',
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

  (
    'roup-bartira-diplomata',
    'Guarda-Roupa Diplomata',
    'guarda-roupas', NULL,
    'Guarda-Roupa Diplomata Bartira com estrutura robusta. Disponível em avelã/capuccino, branco fosco e café.',
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

  (
    'roup-bartira-fortaleza',
    'Guarda-Roupa Fortaleza',
    'guarda-roupas', NULL,
    'Guarda-Roupa Fortaleza Bartira resistente e espaçoso, com prateleiras para organizar tudo.',
    ARRAY[
      'assets/images/products/roup-bartira-fortaleza/branco.png',
      'assets/images/products/roup-bartira-fortaleza/interna.png',
      'assets/images/products/roup-bartira-fortaleza/dimensoes.png'
    ],
    false, false,
    '{"Marca": "Bartira", "Material": "MDP/MDF", "Acabamento": "Branco", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  (
    'roup-bartira-napoli',
    'Guarda-Roupa Napoli',
    'guarda-roupas', NULL,
    'Guarda-Roupa Napoli Bartira com acabamento refinado e espaço generoso. Ótimo para quartos de casal.',
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

  (
    'roup-hamburgo',
    'Guarda-Roupa Hamburgo',
    'guarda-roupas', NULL,
    'Guarda-Roupa Hamburgo com visual clean e funcional, ótima capacidade interna para o dia a dia.',
    ARRAY[
      'assets/images/products/roup-hamburgo/1g.png',
      'assets/images/products/roup-hamburgo/3g.png',
      'assets/images/products/roup-hamburgo/dimensoes.png'
    ],
    false, false,
    '{"Material": "MDF", "Prateleiras": "Sim", "Cabideiro": "Sim"}',
    true
  ),

  (
    'roup-triunfo',
    'Guarda-Roupa Triunfo',
    'guarda-roupas', 'Destaque',
    'Guarda-Roupa Triunfo com design arrojado. Disponível em off-white/peroba e peroba.',
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

  (
    'roup-zurique',
    'Guarda-Roupa Zurique',
    'guarda-roupas', NULL,
    'Guarda-Roupa Zurique com acabamento moderno e interior amplo. Disponível em off-white e peroba.',
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

  (
    'roupeiro-bartira-monte-rei',
    'Guarda-Roupa Monte Rei',
    'guarda-roupas', NULL,
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
  ),

-- ════════════════════════════════════════════════════════════
-- ARMÁRIOS DE COZINHA (5 produtos)
-- ════════════════════════════════════════════════════════════

  (
    'coz-futura',
    'Cozinha Futura',
    'armarios', NULL,
    'Cozinha completa Futura com acabamento mel e design moderno. Amplo espaço interno para organização de toda a cozinha.',
    ARRAY[
      'assets/images/products/coz-futura/melarenas.png',
      'assets/images/products/coz-futura/melripado.png',
      'assets/images/products/coz-futura/interna.png'
    ],
    false, false,
    '{"Material": "MDF", "Acabamento": "Mel / Ripado", "Armário Superior": "Sim", "Armário Inferior": "Sim"}',
    true
  ),

  (
    'coz-genova',
    'Cozinha Gênova',
    'armarios', NULL,
    'Cozinha Gênova com acabamentos requintados em pérola/montana/branco e ripado. Elegância e praticidade para sua cozinha.',
    ARRAY[
      'assets/images/products/coz-genova/perolamontanabranco.png',
      'assets/images/products/coz-genova/ripado.png'
    ],
    false, false,
    '{"Material": "MDF", "Acabamento": "Pérola/Montana/Branco / Ripado", "Armário Superior": "Sim", "Armário Inferior": "Sim"}',
    true
  ),

  (
    'coz-napoles',
    'Cozinha Nápoles',
    'armarios', NULL,
    'Cozinha Nápoles com visual moderno disponível em grafite e mel/ripado. Perfeita para cozinhas contemporâneas.',
    ARRAY[
      'assets/images/products/coz-napoles/melripado.png',
      'assets/images/products/coz-napoles/grafite.png',
      'assets/images/products/coz-napoles/interna.png'
    ],
    false, false,
    '{"Material": "MDF", "Acabamento": "Mel/Ripado / Grafite", "Armário Superior": "Sim", "Armário Inferior": "Sim"}',
    true
  ),

  (
    'coz-thalia',
    'Cozinha Thalia',
    'armarios', NULL,
    'Cozinha Thalia com acabamento mel/ripado e espaço interno bem dividido. Funcionalidade e estilo para o seu dia a dia.',
    ARRAY[
      'assets/images/products/coz-thalia/melripado.png',
      'assets/images/products/coz-thalia/riapado.png',
      'assets/images/products/coz-thalia/interna.png'
    ],
    false, false,
    '{"Material": "MDF", "Acabamento": "Mel / Ripado", "Armário Superior": "Sim", "Armário Inferior": "Sim"}',
    true
  ),

  (
    'coz-viena-plus',
    'Cozinha Viena Plus',
    'armarios', NULL,
    'Cozinha Viena Plus com acabamento mel/ripado e amplo espaço. Versão plus com mais módulos para organização completa.',
    ARRAY[
      'assets/images/products/coz-viena-plus/melripado.png',
      'assets/images/products/coz-viena-plus/interna.png'
    ],
    false, false,
    '{"Material": "MDF", "Acabamento": "Mel / Ripado", "Armário Superior": "Sim", "Armário Inferior": "Sim"}',
    true
  ),

-- ════════════════════════════════════════════════════════════
-- COLCHÕES (1 produto)
-- ════════════════════════════════════════════════════════════

  (
    'texas-flex',
    'Colchão Texas Flex',
    'colchoes', 'Destaque',
    'Colchão Texas Flex com espuma de alta densidade e suporte extra para uma noite de sono perfeita. Disponível em cinamomo.',
    ARRAY[
      'assets/images/products/texas-flex/cinamomo.png',
      'assets/images/products/texas-flex/cinamomo2.png',
      'assets/images/products/texas-flex/interna.png',
      'assets/images/products/texas-flex/dimensoes.png'
    ],
    true, true,
    '{"Material": "Espuma HR", "Densidade": "Consulte-nos", "Medidas": "Consulte disponibilidade"}',
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
