"use client";

import { useState } from "react";
import { Lead, REVENUE_RANGES, JOB_LEVELS } from "@/types/lead";
import { formatDate } from "@/lib/utils/format";
import { Search, Filter } from "lucide-react";

interface LeadsTableProps {
  leads: Lead[];
  onRefresh: () => void;
}

export function LeadsTable({ leads, onRefresh }: LeadsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRevenue, setFilterRevenue] = useState<string>("all");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm);

    const matchesRevenue =
      filterRevenue === "all" || lead.revenue_range === filterRevenue;

    return matchesSearch && matchesRevenue;
  });

  const getRevenueLabel = (value: string) => {
    return REVENUE_RANGES.find((r) => r.value === value)?.label || value;
  };

  const getCargoLabel = (value: string | null | undefined) => {
    if (!value) return "-";
    return JOB_LEVELS.find((j) => j.value === value)?.label || value;
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
              <th className="px-6 py-3 text-left text-xs font-medium text-elite-navy uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-elite-navy uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-elite-navy uppercase tracking-wider">
                WhatsApp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-elite-navy uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-elite-navy uppercase tracking-wider">
                Faturamento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-elite-navy uppercase tracking-wider">
                Origem
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-elite-navy uppercase tracking-wider">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-elite-navy/10">
            {filteredLeads.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-elite-navy/50"
                >
                  Nenhum lead encontrado
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-elite-quartz/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-elite-navy">
                    {lead.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-elite-navy/70">
                    {lead.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-elite-navy/70">
                    {lead.whatsapp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-elite-navy/70">
                    {getCargoLabel(lead.cargo)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-elite-navy/70">
                    {getRevenueLabel(lead.revenue_range)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-elite-navy/70">
                    {lead.source || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-elite-navy/70">
                    {formatDate(lead.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
