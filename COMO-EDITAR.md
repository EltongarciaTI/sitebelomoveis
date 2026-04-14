# Como editar o site

## 1) Dados da loja
Edite `js/products.js` e troque os dados do objeto `STORE`:
- nome da loja
- WhatsApp
- Instagram/Facebook
- endereço
- telefone
- e-mail
- horário
- mapa

## 2) Produtos
Este projeto agora está configurado para usar **somente Supabase**.
Os produtos **não ficam mais** no `js/products.js`.

Cadastre os produtos na tabela `products` do Supabase com campos como:
- `id`
- `name`
- `category`
- `badge`
- `description`
- `images`
- `featured`
- `highlight`
- `specs`
- `active`

## 3) Categorias
Por padrão, as categorias ficam em `js/products.js`.
Se você tiver uma tabela `categories` no Supabase, o site vai usar ela automaticamente.

## 4) Banco
O arquivo `supabase/schema.sql` pode servir de base para montar as tabelas.

## 5) Imagens
As fotos podem ser adicionadas depois.
Você pode usar URLs diretas salvas no campo `images` do Supabase.

## Estrutura principal
- `index.html` → página inicial
- `catalogo.html` → catálogo
- `produto.html` → detalhes do produto
- `contato.html` → contato
- `sobre.html` → sobre a loja
- `ofertas.html` → destaques/ofertas
- `js/products.js` → dados gerais da loja + categorias padrão
- `js/sb-client.js` → conexão e leitura do Supabase
- `js/script.js` → comportamento do site
- `supabase/schema.sql` → base do banco
