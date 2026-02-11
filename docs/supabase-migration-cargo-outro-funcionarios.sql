-- Migration: cargo "outro" + cargo_outro_qual + employee_range
-- Execute no SQL Editor do Supabase após a migration de cargo (supabase-migration-cargo.sql)

-- Permitir "outro" em cargo (remover constraint antiga e recriar)
-- Nome da constraint no PostgreSQL costuma ser leads_cargo_check
alter table elite.leads drop constraint if exists leads_cargo_check;
alter table elite.leads add constraint leads_cargo_check check (cargo in (
  'proprietario',
  'ceo',
  'cmo',
  'diretor_comercial',
  'gerente_marketing',
  'gerente_comercial',
  'outro'
));

alter table elite.leads
add column if not exists cargo_outro_qual text;

alter table elite.leads
add column if not exists employee_range text check (employee_range in (
  'ate-10',
  '11-50',
  '51-200',
  '201-500',
  'acima-500'
));

create index if not exists elite_leads_employee_range_idx on elite.leads(employee_range);
