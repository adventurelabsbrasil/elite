"use client";

import { useMemo } from "react";
import type { Lead } from "@/types/lead";
import type { PipelineStageRecord } from "@/types/lead";
import { REVENUE_RANGES } from "@/types/lead";
import type { AdminFiltersState } from "@/lib/admin/filters";
import { Filter } from "lucide-react";

interface AdminFiltersProps {
  filters: AdminFiltersState;
  onFiltersChange: (f: AdminFiltersState) => void;
  stages: PipelineStageRecord[];
  leads: Lead[];
  compact?: boolean;
}

export function AdminFilters({
  filters,
  onFiltersChange,
  stages,
  leads,
  compact,
}: AdminFiltersProps) {
  const sourceOptions = useMemo(
    () => [...new Set(leads.map((l) => l.source).filter(Boolean))] as string[],
    [leads]
  );
  const mediumOptions = useMemo(
    () => [...new Set(leads.map((l) => l.medium).filter(Boolean))] as string[],
    [leads]
  );
  const campaignOptions = useMemo(
    () => [...new Set(leads.map((l) => l.campaign).filter(Boolean))] as string[],
    [leads]
  );

  const update = (key: keyof AdminFiltersState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const gridClass = compact
    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2"
    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3";

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4 mb-6">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
        <Filter className="w-4 h-4" />
        Filtros avançados
      </div>
      <div className={gridClass}>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Data de</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => update("dateFrom", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 text-sm focus:ring-2 focus:ring-elite-flow focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Data até</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => update("dateTo", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 text-sm focus:ring-2 focus:ring-elite-flow focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Faturamento</label>
          <select
            value={filters.revenue}
            onChange={(e) => update("revenue", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 text-sm focus:ring-2 focus:ring-elite-flow"
          >
            <option value="all">Todos</option>
            {REVENUE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Estágio</label>
          <select
            value={filters.stageId}
            onChange={(e) => update("stageId", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 text-sm focus:ring-2 focus:ring-elite-flow"
          >
            <option value="all">Todos</option>
            {[...stages].sort((a, b) => a.sort_order - b.sort_order).map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Source (UTM)</label>
          <select
            value={filters.source}
            onChange={(e) => update("source", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 text-sm focus:ring-2 focus:ring-elite-flow"
          >
            <option value="all">Todos</option>
            {sourceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Medium (UTM)</label>
          <select
            value={filters.medium}
            onChange={(e) => update("medium", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 text-sm focus:ring-2 focus:ring-elite-flow"
          >
            <option value="all">Todos</option>
            {mediumOptions.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-2">
          <label className="block text-xs text-gray-400 mb-1">Campaign (UTM)</label>
          <select
            value={filters.campaign}
            onChange={(e) => update("campaign", e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 text-sm focus:ring-2 focus:ring-elite-flow"
          >
            <option value="all">Todas</option>
            {campaignOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
