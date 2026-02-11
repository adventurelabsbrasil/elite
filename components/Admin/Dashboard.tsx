"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lead, REVENUE_RANGES, JOB_LEVELS, EMPLOYEE_RANGES } from "@/types/lead";
import type { PipelineStageRecord } from "@/types/lead";
import { fetchPipelineStages } from "@/lib/leads/stages";
import { updateLeadStage } from "@/lib/leads/updateLead";
import { trackPipelineConversion } from "@/components/Pixel/MetaPixel";
import { LeadsTable } from "./LeadsTable";
import { LeadsPipeline } from "./LeadsPipeline";
import { PipelineStagesEditor } from "./PipelineStagesEditor";
import { Charts } from "./Charts";
import { LogOut, Download, LayoutGrid, Table, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

type ViewMode = "pipeline" | "table" | "stages";

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stages, setStages] = useState<PipelineStageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("pipeline");
  const [updatingLeadId, setUpdatingLeadId] = useState<string | null>(null);
  const router = useRouter();

  const loadStages = async () => {
    const { data } = await fetchPipelineStages();
    setStages(data ?? []);
  };

  useEffect(() => {
    loadLeads();
    loadStages();
  }, []);

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
    } catch (error) {
      console.error("Erro ao carregar leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

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
    const rows = leads.map((lead) => [
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

  return (
    <div className="min-h-screen bg-elite-quartz">
      <header className="bg-white border-b border-elite-navy/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold text-elite-navy">
              Dashboard - Leads ELITE
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex rounded-lg border border-elite-navy/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode("pipeline")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${viewMode === "pipeline" ? "bg-elite-flow text-white" : "bg-white text-elite-navy hover:bg-elite-quartz"}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Pipeline
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${viewMode === "table" ? "bg-elite-flow text-white" : "bg-white text-elite-navy hover:bg-elite-quartz"}`}
                >
                  <Table className="w-4 h-4" />
                  Tabela
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("stages")}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${viewMode === "stages" ? "bg-elite-flow text-white" : "bg-white text-elite-navy hover:bg-elite-quartz"}`}
                >
                  <Settings className="w-4 h-4" />
                  Etapas
                </button>
              </div>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-elite-flow hover:bg-[#009999] text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-elite-navy hover:bg-elite-quartz rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-elite-navy/70">Carregando...</p>
          </div>
        ) : (
          <>
            <Charts leads={leads} />
            <div className="mt-8">
              {viewMode === "stages" ? (
                <PipelineStagesEditor
                  stages={stages}
                  onStagesChange={loadStages}
                />
              ) : viewMode === "pipeline" ? (
                <LeadsPipeline
                  leads={leads}
                  stages={stages}
                  onRefresh={loadLeads}
                  onStageChange={handleStageChange}
                  updatingLeadId={updatingLeadId}
                />
              ) : (
                <LeadsTable
                  leads={leads}
                  stages={stages}
                  onRefresh={loadLeads}
                  onStageChange={handleStageChange}
                  updatingLeadId={updatingLeadId}
                />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
