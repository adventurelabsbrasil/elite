"use client";

import { Lead } from "@/types/lead";
import { REVENUE_RANGES } from "@/types/lead";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface ChartsProps {
  leads: Lead[];
}

const COLORS = ["#00BCBC", "#FE5009", "#0E1D37", "#F2F4F6"];

export function Charts({ leads }: ChartsProps) {
  const revenueData = REVENUE_RANGES.map((range) => ({
    name: range.label,
    value: leads.filter((lead) => lead.revenue_range === range.value).length,
  }));

  const weeks = [];
  for (let i = 3; i >= 0; i--) {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    weekStart.setDate(weekStart.getDate() - i * 7);
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

    const weekLeads = leads.filter((lead) => {
      const leadDate = new Date(lead.created_at);
      return leadDate >= weekStart && leadDate <= weekEnd;
    });

    weeks.push({
      week: format(weekStart, "dd/MM", { locale: ptBR }),
      leads: weekLeads.length,
    });
  }

  const sourceData = leads.reduce(
    (acc, lead) => {
      const source = lead.source || "Direto";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const sourceChartData = Object.entries(sourceData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 border border-elite-navy/10">
        <h3 className="text-lg font-display font-semibold text-elite-navy mb-4">
          Total de Leads
        </h3>
        <div className="text-4xl font-bold text-elite-flow">{leads.length}</div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-elite-navy/10">
        <h3 className="text-lg font-display font-semibold text-elite-navy mb-4">
          Leads por Semana (Últimas 4)
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeks}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F6" />
            <XAxis dataKey="week" stroke="#0E1D37" />
            <YAxis stroke="#0E1D37" />
            <Tooltip />
            <Bar dataKey="leads" fill="#00BCBC" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-6 border border-elite-navy/10">
        <h3 className="text-lg font-display font-semibold text-elite-navy mb-4">
          Leads por Faixa de Faturamento
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#F2F4F6" />
            <XAxis type="number" stroke="#0E1D37" />
            <YAxis
              dataKey="name"
              type="category"
              width={150}
              stroke="#0E1D37"
            />
            <Tooltip />
            <Bar dataKey="value" fill="#FE5009" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-6 border border-elite-navy/10">
        <h3 className="text-lg font-display font-semibold text-elite-navy mb-4">
          Leads por Origem
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sourceChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {sourceChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
