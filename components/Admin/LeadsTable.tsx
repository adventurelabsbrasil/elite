"use client";

import { useState, useMemo } from "react";
import { Lead, REVENUE_RANGES, JOB_LEVELS, EMPLOYEE_RANGES } from "@/types/lead";
import type { PipelineStageRecord } from "@/types/lead";
import { formatDate } from "@/lib/utils/format";
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown, Loader2 } from "lucide-react";

interface LeadsTableProps {
  leads: Lead[];
  stages: PipelineStageRecord[];
  onRefresh: () => void;
  onStageChange?: (leadId: string, stageId: string) => Promise<void>;
  updatingLeadId?: string | null;
}

type SortKey =
  | "id"
  | "form_id"
  | "nome"
  | "email"
  | "whatsapp"
  | "cargo"
  | "employee_range"
  | "revenue_range"
  | "pipeline_stage_id"
  | "source"
  | "medium"
  | "campaign"
  | "created_at";
type SortDir = "asc" | "desc";

function shortId(id: string) {
  return id.replace(/-/g, "").slice(0, 8);
}

const sortKeyStage = "pipeline_stage_id" as const;

export function LeadsTable({ leads, stages, onRefresh, onStageChange, updatingLeadId }: LeadsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRevenue, setFilterRevenue] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const stageOrder = useMemo(() => {
    const sorted = [...stages].sort((a, b) => a.sort_order - b.sort_order);
    return sorted.map((s) => s.id);
  }, [stages]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.whatsapp.includes(searchTerm) ||
        (lead.id && lead.id.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesRevenue =
        filterRevenue === "all" || lead.revenue_range === filterRevenue;

      return matchesSearch && matchesRevenue;
    });
  }, [leads, searchTerm, filterRevenue]);

  const sortedLeads = useMemo(() => {
    const arr = [...filteredLeads];
    arr.sort((a, b) => {
      let aVal: string | number | undefined = (a as unknown as Record<string, unknown>)[sortKey] as string | number | undefined;
      let bVal: string | number | undefined = (b as unknown as Record<string, unknown>)[sortKey] as string | number | undefined;
      if (sortKey === "created_at") {
        aVal = new Date(a.created_at).getTime();
        bVal = new Date(b.created_at).getTime();
      }
      if (sortKey === sortKeyStage) {
        const aId = a.pipeline_stage_id ?? "";
        const bId = b.pipeline_stage_id ?? "";
        aVal = stageOrder.indexOf(aId);
        bVal = stageOrder.indexOf(bId);
        if (aVal < 0) aVal = stageOrder.length;
        if (bVal < 0) bVal = stageOrder.length;
      }
      if (aVal == null) aVal = "";
      if (bVal == null) bVal = "";
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [filteredLeads, sortKey, sortDir, stageOrder]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ArrowUpDown className="w-3.5 h-3.5 inline ml-1 opacity-50" />;
    return sortDir === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5 inline ml-1" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 inline ml-1" />
    );
  };

  const Th = ({
    column,
    label,
    className = "",
  }: {
    column: SortKey;
    label: string;
    className?: string;
  }) => (
    <th className={className}>
      <button
        type="button"
        onClick={() => handleSort(column)}
        className="text-left text-xs font-medium text-elite-navy uppercase tracking-wider hover:text-elite-flow transition-colors flex items-center"
      >
        {label}
        <SortIcon column={column} />
      </button>
    </th>
  );

  const getRevenueLabel = (value: string) => {
    return REVENUE_RANGES.find((r) => r.value === value)?.label || value;
  };

  const getCargoLabel = (lead: Lead) => {
    if (!lead.cargo) return "-";
    const label = JOB_LEVELS.find((j) => j.value === lead.cargo)?.label || lead.cargo;
    if (lead.cargo === "outro" && lead.cargo_outro_qual?.trim()) {
      return `${label}: ${lead.cargo_outro_qual.trim()}`;
    }
    return label;
  };

  const getEmployeeLabel = (value: string | null | undefined) => {
    if (!value) return "-";
    return EMPLOYEE_RANGES.find((r) => r.value === value)?.label || value;
  };

  return (
    <div className="bg-white rounded-xl border border-elite-navy/10 overflow-hidden">
      <div className="p-6 border-b border-elite-navy/10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h2 className="text-2xl font-display font-semibold text-elite-navy">
            Relatório de Leads ({filteredLeads.length})
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-elite-navy/40" />
              <input
                type="text"
                placeholder="Buscar por nome, email ou WhatsApp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-elite-navy/20 focus:border-elite-flow focus:ring-elite-flow focus:outline-none focus:ring-2"
              />
            </div>
            <div className="relative flex-1 sm:flex-initial">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-elite-navy/40" />
              <select
                value={filterRevenue}
                onChange={(e) => setFilterRevenue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-elite-navy/20 focus:border-elite-flow focus:ring-elite-flow focus:outline-none focus:ring-2 bg-white"
              >
                <option value="all">Todas as faixas</option>
                {REVENUE_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-elite-quartz">
            <tr>
              <Th column="id" label="ID" className="px-4 py-3" />
              <Th column="form_id" label="Form" className="px-4 py-3" />
              <Th column="nome" label="Nome" className="px-4 py-3" />
              <Th column="email" label="Email" className="px-4 py-3" />
              <Th column="whatsapp" label="WhatsApp" className="px-4 py-3" />
              <Th column="cargo" label="Cargo" className="px-4 py-3" />
              <Th column="employee_range" label="Funcionários" className="px-4 py-3" />
              <Th column="revenue_range" label="Faturamento" className="px-4 py-3" />
              <Th column="pipeline_stage_id" label="Estágio" className="px-4 py-3" />
              <th className="px-4 py-3 text-left text-xs font-medium text-elite-navy uppercase tracking-wider">Tags</th>
              <Th column="source" label="Source (UTM)" className="px-4 py-3" />
              <Th column="medium" label="Medium (UTM)" className="px-4 py-3" />
              <Th column="campaign" label="Campaign (UTM)" className="px-4 py-3" />
              <Th column="created_at" label="Data" className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-elite-navy/10">
            {sortedLeads.length === 0 ? (
              <tr>
                <td
                  colSpan={14}
                  className="px-6 py-8 text-center text-elite-navy/50"
                >
                  Nenhum lead encontrado
                </td>
              </tr>
            ) : (
              sortedLeads.map((lead) => {
                const currentStageId = lead.pipeline_stage_id ?? "";
                const stageLabel = stages.find((s) => s.id === currentStageId)?.label ?? "-";
                const isUpdating = updatingLeadId === lead.id;
                return (
                  <tr
                    key={lead.id}
                    className="hover:bg-elite-quartz/50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70 font-mono">
                      {shortId(lead.id)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70">
                      {lead.form_id || "form-webinar"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy">
                      {lead.nome}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70">
                      {lead.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70">
                      {lead.whatsapp}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70">
                      {getCargoLabel(lead)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70">
                      {getEmployeeLabel(lead.employee_range)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70">
                      {getRevenueLabel(lead.revenue_range)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70">
                      {onStageChange && stages.length > 0 ? (
                        <select
                          value={currentStageId}
                          disabled={isUpdating}
                          onChange={(e) => onStageChange(lead.id, e.target.value)}
                          className="text-sm border border-elite-navy/20 rounded px-2 py-1 bg-white focus:border-elite-flow focus:ring-1 focus:ring-elite-flow outline-none disabled:opacity-60"
                        >
                          {[...stages].sort((a, b) => a.sort_order - b.sort_order).map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        stageLabel
                      )}
                      {isUpdating && (
                        <Loader2 className="w-4 h-4 inline-block ml-1 animate-spin text-elite-flow align-middle" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-elite-navy/70">
                      {(lead.tags ?? []).length > 0 ? (
                        <span className="flex flex-wrap gap-1">
                          {(lead.tags ?? []).slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-1.5 py-0.5 rounded bg-elite-quartz text-elite-navy/80"
                            >
                              {tag}
                            </span>
                          ))}
                          {(lead.tags ?? []).length > 3 && (
                            <span className="text-xs text-elite-navy/50">+{(lead.tags ?? []).length - 3}</span>
                          )}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70">
                      {lead.source || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70">
                      {lead.medium || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70">
                      {lead.campaign || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-elite-navy/70">
                      {formatDate(lead.created_at)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
