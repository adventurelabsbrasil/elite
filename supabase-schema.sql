-- =============================================================================
-- ELITE: schema isolado no projeto Supabase adventurelabs.com.br
-- URL do app: elite.adventurelabs.com.br
-- Nada aqui mistura com as tabelas do site principal (public schema).
--
-- DEPOIS DE RODAR ESTE SCRIPT:
-- 1. No Dashboard Supabase: Settings → API → "Exposed schemas" → adicione "elite".
-- 2. Assim o client consegue acessar as tabelas do schema elite.
-- =============================================================================

-- Schema dedicado ao ELITE
create schema if not exists elite;

-- Tabela de leads (Método Elite)
create table if not exists elite.leads (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  email text not null,
  whatsapp text not null,
  cargo text check (cargo in (
    'proprietario',
    'ceo',
    'cmo',
    'diretor_comercial',
    'gerente_marketing',
    'gerente_comercial'
  )),
  revenue_range text not null check (revenue_range in (
    'ate-80mil',
    '80mil-150mil',
    '150mil-300mil',
    '300mil-500mil',
    '500mil-1milhao',
    'acima-1milhao'
  )),
  source text,
  medium text,
  campaign text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Índice único por email dentro do ELITE (evita duplicata no escopo Elite)
create unique index if not exists elite_leads_email_key on elite.leads(email);

create index if not exists elite_leads_created_at_idx on elite.leads(created_at desc);
create index if not exists elite_leads_revenue_range_idx on elite.leads(revenue_range);
create index if not exists elite_leads_source_idx on elite.leads(source);
create index if not exists elite_leads_cargo_idx on elite.leads(cargo);

-- Função para updated_at (escopo elite)
create or replace function elite.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_elite_leads_updated_at on elite.leads;
create trigger update_elite_leads_updated_at
  before update on elite.leads
  for each row
  execute function elite.update_updated_at_column();

-- Permissões: anon precisa USAGE no schema e INSERT na tabela (evita 42501)
grant usage on schema elite to anon, authenticated;
grant insert on elite.leads to anon, authenticated;
grant select on elite.leads to authenticated;

-- RLS: inserção pública (formulário), leitura só autenticados
alter table elite.leads enable row level security;

drop policy if exists "elite_leads_insert_anon" on elite.leads;
create policy "elite_leads_insert_anon"
  on elite.leads for insert to anon, authenticated
  with check (true);

drop policy if exists "elite_leads_select_authenticated" on elite.leads;
create policy "elite_leads_select_authenticated"
  on elite.leads for select to authenticated
  using (true);

-- Comentário para documentação
comment on schema elite is 'Dados do produto ELITE (elite.adventurelabs.com.br). Isolado do restante do projeto adventurelabs.';

-- =============================================================================
-- Admin (opcional): restringir leitura de leads a um único usuário admin
-- Execute no SQL Editor se quiser que apenas o usuário abaixo acesse o dashboard.
-- Garanta que o usuário existe em Authentication → Users (id = cd204005-9eaa-4457-88ac-c9aa093d30cd).
-- =============================================================================
-- drop policy if exists "elite_leads_select_authenticated" on elite.leads;
-- create policy "elite_leads_select_admin" on elite.leads for select to authenticated using (auth.uid() = 'cd204005-9eaa-4457-88ac-c9aa093d30cd'::uuid);
