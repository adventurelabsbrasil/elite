-- Migration: novo funil (Marketing + Vendas) – etapas alinhadas ao fluxo real
-- Execute no SQL Editor do Supabase para projetos que já têm elite.leads com pipeline_stage.
-- Se você aplicou supabase-migration-pipeline-tags.sql antes, use esta migration para atualizar para o novo funil.
-- Mapeia estágios antigos para os novos e atualiza o check constraint.

-- 1) Mapear valores antigos para os novos (evitar violar check ao alterar)
update elite.leads set pipeline_stage = 'lead_lp_webinar' where pipeline_stage = 'novo_lead';
update elite.leads set pipeline_stage = 'comercial_contato' where pipeline_stage = 'contatado';
update elite.leads set pipeline_stage = 'formulario_diagnostico' where pipeline_stage = 'qualificado_mkt';
update elite.leads set pipeline_stage = 'participou_diagnostico' where pipeline_stage = 'em_proposta';
update elite.leads set pipeline_stage = 'virou_cliente' where pipeline_stage = 'fechado';

-- 2) Qualquer outro valor (null ou futuro) vira primeiro estágio
update elite.leads set pipeline_stage = 'lead_lp_webinar' where pipeline_stage is null or pipeline_stage not in (
  'lead_lp_webinar',
  'grupo_whatsapp_vip',
  'participou_webinar',
  'formulario_diagnostico',
  'comercial_contato',
  'agendou_diagnostico',
  'participou_diagnostico',
  'virou_cliente'
);

-- 3) Trocar o check constraint (drop + add; nome padrão no Postgres é leads_pipeline_stage_check)
alter table elite.leads drop constraint if exists leads_pipeline_stage_check;
alter table elite.leads add constraint leads_pipeline_stage_check check (pipeline_stage in (
  'lead_lp_webinar',
  'grupo_whatsapp_vip',
  'participou_webinar',
  'formulario_diagnostico',
  'comercial_contato',
  'agendou_diagnostico',
  'participou_diagnostico',
  'virou_cliente'
));

-- 4) Default para novos inserts
alter table elite.leads alter column pipeline_stage set default 'lead_lp_webinar';
