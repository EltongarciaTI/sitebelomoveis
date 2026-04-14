-- ============================================================
-- ATUALIZAÇÃO DE POLÍTICAS RLS — Habilitar Painel Admin
-- VERSÃO 2 — mais robusta, usa auth.uid() IS NOT NULL
--
-- Execute no Supabase Dashboard:
-- SQL Editor → New Query → Cole tudo e clique em Run
-- ============================================================

-- ── Limpar TODAS as políticas existentes nas duas tabelas ────
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies WHERE tablename = 'products'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON products', pol.policyname);
  END LOOP;

  FOR pol IN
    SELECT policyname FROM pg_policies WHERE tablename = 'categories'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON categories', pol.policyname);
  END LOOP;
END $$;

-- ── Políticas para PRODUCTS ───────────────────────────────────

-- Visitantes: veem apenas produtos ativos
-- Admin logado: vê todos (inclusive inativos)
CREATE POLICY "select produtos"
  ON products FOR SELECT
  USING (
    active = true
    OR auth.uid() IS NOT NULL
  );

-- Admin logado: pode inserir, atualizar e deletar
CREATE POLICY "insert produtos"
  ON products FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "update produtos"
  ON products FOR UPDATE
  USING     (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "delete produtos"
  ON products FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- ── Políticas para CATEGORIES ─────────────────────────────────

-- Todos podem ler categorias
CREATE POLICY "select categorias"
  ON categories FOR SELECT
  USING (true);

-- Admin logado: pode inserir, atualizar e deletar
CREATE POLICY "insert categorias"
  ON categories FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "update categorias"
  ON categories FOR UPDATE
  USING     (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "delete categorias"
  ON categories FOR DELETE
  USING (auth.uid() IS NOT NULL);
