-- Migration: etapas do funil dinâmicas (tabela pipeline_stages + leads.pipeline_stage_id)
-- Execute no SQL Editor para projetos que já têm elite.leads com coluna pipeline_stage (texto).
-- Depois disso, as etapas são criadas/editadas no admin; cada etapa pode ter "Conversão Meta".

-- 1) Criar tabela de etapas (se não existir)
create table if not exists elite.pipeline_stages (
  id uuid default gen_random_uuid() primary key,
  label text not null,
  sort_order int not null default 0,
  pipe text not null check (pipe in ('mkt', 'sales')) default 'mkt',
  meta_conversion boolean not null default false,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

create index if not exists elite_pipeline_stages_sort_order_idx on elite.pipeline_stages(sort_order);

grant select, insert, update, delete on elite.pipeline_stages to authenticated;
alter table elite.pipeline_stages enable row level security;
drop policy if exists "elite_pipeline_stages_all_authenticated" on elite.pipeline_stages;
create policy "elite_pipeline_stages_all_authenticated"
  on elite.pipeline_stages for all to authenticated using (true) with check (true);

-- 2) Seed etapa padrão (id fixo para referência)
insert into elite.pipeline_stages (id, label, sort_order, pipe, meta_conversion)
values ('00000000-0000-4000-8000-000000000001'::uuid, 'Novo lead', 0, 'mkt', false)
on conflict (id) do nothing;

-- 3) Adicionar coluna pipeline_stage_id em leads (se existir pipeline_stage, migrar depois)
alter table elite.leads add column if not exists pipeline_stage_id uuid references elite.pipeline_stages(id) on delete set null default '00000000-0000-4000-8000-000000000001'::uuid;

-- 4) Atualizar leads que têm pipeline_stage_id null para a etapa padrão
update elite.leads set pipeline_stage_id = '00000000-0000-4000-8000-000000000001'::uuid where pipeline_stage_id is null;

-- 5) Remover coluna antiga pipeline_stage (texto) se existir
alter table elite.leads drop column if exists pipeline_stage;

create index if not exists elite_leads_pipeline_stage_id_idx on elite.leads(pipeline_stage_id);
