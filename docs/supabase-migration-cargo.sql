-- Migration: adicionar coluna cargo à tabela elite.leads
-- Execute no SQL Editor do Supabase para projetos que já têm a tabela elite.leads

alter table elite.leads
add column if not exists cargo text check (cargo in (
  'proprietario',
  'ceo',
  'cmo',
  'diretor_comercial',
  'gerente_marketing',
  'gerente_comercial'
));

create index if not exists elite_leads_cargo_idx on elite.leads(cargo);
