-- Migration: coluna form_id (form-webinar / form-diagnostico)
-- Execute no SQL Editor do Supabase para projetos que já têm elite.leads

alter table elite.leads
add column if not exists form_id text default 'form-webinar';

create index if not exists elite_leads_form_id_idx on elite.leads(form_id);

-- Opcional: atualizar leads existentes sem form_id
update elite.leads set form_id = 'form-webinar' where form_id is null;
