"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Lead } from "@/types/lead";
import type { PipelineStageRecord } from "@/types/lead";
import { fetchPipelineStages } from "@/lib/leads/stages";
import { updateLeadStage } from "@/lib/leads/updateLead";
import { trackPipelineConversion } from "@/components/Pixel/MetaPixel";
import { defaultAdminFilters, applyAdminFilters, type AdminFiltersState } from "@/lib/admin/filters";
import { AdminFilters } from "./AdminFilters";
import { LeadsPipeline } from "./LeadsPipeline";

export function CrmPageContent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stages, setStages] = useState<PipelineStageRecord[]>([]);
  const [filters, setFilters] = useState<AdminFiltersState>(defaultAdminFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);

  const loadStages = async () => {
    const { data } = await fetchPipelineStages();
    setStages(data ?? []);
  };

  const loadLeads = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .schema("elite")
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setLeads(data || []);
    } catch (e) {
      console.error("Erro ao carregar leads:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
    loadStages();
  }, []);

  const filteredLeads = applyAdminFilters(leads, filters);

  const handleStageChange = async (leadId: string, stageId: string) => {
    setUpdatingLeadId(leadId);
    try {
      const { error } = await updateLeadStage(leadId, stageId);
      if (error) throw error;
      await loadLeads();
      const stage = stages.find((s) => s.id === stageId);
      if (stage?.meta_conversion) {
        trackPipelineConversion(leadId, stage.label);
      }
    } catch (err) {
      console.error("Erro ao atualizar estágio:", err);
    } finally {
      setUpdatingLeadId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-400">
        Carregando...
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-display font-bold text-white mb-6">
        CRM Pipeline
      </h2>
      <AdminFilters
        filters={filters}
        onFiltersChange={setFilters}
        stages={stages}
        leads={leads}
      />
      <LeadsPipeline
        leads={filteredLeads}
        stages={stages}
        onRefresh={loadLeads}
        onStageChange={handleStageChange}
        updatingLeadId={updatingLeadId}
      />
    </>
  );
}
