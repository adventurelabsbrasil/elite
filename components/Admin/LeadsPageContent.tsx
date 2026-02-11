"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lead, REVENUE_RANGES, JOB_LEVELS, EMPLOYEE_RANGES } from "@/types/lead";
import type { PipelineStageRecord } from "@/types/lead";
import { fetchPipelineStages } from "@/lib/leads/stages";
import { updateLeadStage } from "@/lib/leads/updateLead";
import { defaultAdminFilters, applyAdminFilters, type AdminFiltersState } from "@/lib/admin/filters";
import { AdminFilters } from "./AdminFilters";
import { LeadsTable } from "./LeadsTable";
import { Download } from "lucide-react";

export function LeadsPageContent() {
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
  const getStageLabel = (lead: Lead) =>
    stages.find((s) => s.id === lead.pipeline_stage_id)?.label ?? "-";

  const exportToCSV = () => {
    const getRevenueLabel = (v: string) => REVENUE_RANGES.find((r) => r.value === v)?.label || v;
    const getCargoLabel = (l: Lead) => {
      if (!l.cargo) return "-";
      const label = JOB_LEVELS.find((j) => j.value === l.cargo)?.label || l.cargo;
      if (l.cargo === "outro" && l.cargo_outro_qual?.trim()) return `${label}: ${l.cargo_outro_qual.trim()}`;
      return label;
    };
    const getEmployeeLabel = (v: string | null | undefined) => EMPLOYEE_RANGES.find((r) => r.value === v)?.label || (v ?? "-");
    const headers = ["ID", "Form ID", "Nome", "Email", "WhatsApp", "Cargo", "Funcionários", "Faturamento", "Estágio", "Tags", "Source", "Medium", "Campaign", "Data"];
    const rows = filteredLeads.map((lead) => [
      lead.id,
      lead.form_id ?? "form-webinar",
      lead.nome,
      lead.email,
      lead.whatsapp,
      getCargoLabel(lead),
      getEmployeeLabel(lead.employee_range),
      getRevenueLabel(lead.revenue_range),
      getStageLabel(lead),
      (lead.tags ?? []).join("; "),
      lead.source ?? "",
      lead.medium ?? "",
      lead.campaign ?? "",
      new Date(lead.created_at).toLocaleDateString("pt-BR"),
    ]);
    const escape = (cell: string | number) => {
      const s = String(cell);
      if (s.includes(",") || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };
    const csv = [headers, ...rows].map((row) => row.map(escape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const handleStageChange = async (leadId: string, stageId: string) => {
    setUpdatingLeadId(leadId);
    try {
      const { error } = await updateLeadStage(leadId, stageId);
      if (error) throw error;
      await loadLeads();
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
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-display font-bold text-white">
          Tabela de leads
        </h2>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-elite-flow hover:opacity-90 text-white text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>
      <AdminFilters
        filters={filters}
        onFiltersChange={setFilters}
        stages={stages}
        leads={leads}
      />
      <LeadsTable
        leads={filteredLeads}
        stages={stages}
        onRefresh={loadLeads}
        onStageChange={handleStageChange}
        updatingLeadId={updatingLeadId}
      />
    </>
  );
}
