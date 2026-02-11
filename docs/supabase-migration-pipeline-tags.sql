-- Migration: pipeline_stage e tags para CRM
-- Execute no SQL Editor do Supabase para projetos que já têm elite.leads

alter table elite.leads
add column if not exists pipeline_stage text default 'novo_lead' check (pipeline_stage in (
  'novo_lead',
  'contatado',
  'qualificado_mkt',
  'em_proposta',
  'fechado'
));

alter table elite.leads
add column if not exists tags text[] default '{}';

update elite.leads set pipeline_stage = 'novo_lead' where pipeline_stage is null;

create index if not exists elite_leads_pipeline_stage_idx on elite.leads(pipeline_stage);

-- Política UPDATE (authenticated)
drop policy if exists "elite_leads_update_authenticated" on elite.leads;
create policy "elite_leads_update_authenticated"
  on elite.leads for update to authenticated
  using (true)
  with check (true);

grant update on elite.leads to authenticated;
