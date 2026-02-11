"use client";

import { useState, useMemo } from "react";
import { Lead, REVENUE_RANGES, JOB_LEVELS, EMPLOYEE_RANGES } from "@/types/lead";
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
  Legend,
} from "recharts";
import { format, startOfWeek, endOfWeek, startOfDay, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface ChartsProps {
  leads: Lead[];
}

const COLORS = ["#00BCBC", "#FE5009", "#0E1D37", "#F2F4F6", "#009999", "#B8860B"];
const REVENUE_COLORS: Record<string, string> = {};
REVENUE_RANGES.forEach((r, i) => (REVENUE_COLORS[r.value] = COLORS[i % COLORS.length]));

function aggregateByDay(leads: Lead[]) {
  const byDay: Record<string, Record<string, number>> = {};
  leads.forEach((lead) => {
    const day = format(parseISO(lead.created_at), "yyyy-MM-dd");
    if (!byDay[day]) {
      byDay[day] = {};
      REVENUE_RANGES.forEach((r) => (byDay[day][r.value] = 0));
    }
    byDay[day][lead.revenue_range] = (byDay[day][lead.revenue_range] ?? 0) + 1;
  });
  const sortedDays = Object.keys(byDay).sort();
  return sortedDays.map((day) => ({
    date: format(parseISO(day), "dd/MM", { locale: ptBR }),
    full: day,
    ...byDay[day],
  }));
}

export function Charts({ leads }: ChartsProps) {
  const [hiddenRevenueRanges, setHiddenRevenueRanges] = useState<Set<string>>(new Set());

  const revenueData = useMemo(
    () =>
      REVENUE_RANGES.map((range) => ({
        name: range.label,
        value: leads.filter((lead) => lead.revenue_range === range.value).length,
      })),
    [leads]
  );

  const weeks = useMemo(() => {
    const result = [];
    for (let i = 3; i >= 0; i--) {
      const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
      weekStart.setDate(weekStart.getDate() - i * 7);
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      const weekLeads = leads.filter((lead) => {
        const leadDate = new Date(lead.created_at);
        return leadDate >= weekStart && leadDate <= weekEnd;
      });
      result.push({
        week: format(weekStart, "dd/MM", { locale: ptBR }),
        leads: weekLeads.length,
      });
    }
    return result;
  }, [leads]);

  const sourceData = useMemo(() => {
    const acc: Record<string, number> = {};
    leads.forEach((lead) => {
      const source = lead.source || "Direto";
      acc[source] = (acc[source] || 0) + 1;
    });
    return Object.entries(acc).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const campaignData = useMemo(() => {
    const acc: Record<string, number> = {};
    leads.forEach((lead) => {
      const campaign = lead.campaign || "(sem campaign)";
      acc[campaign] = (acc[campaign] || 0) + 1;
    });
    return Object.entries(acc)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 12);
  }, [leads]);

  const mediumData = useMemo(() => {
    const acc: Record<string, number> = {};
    leads.forEach((lead) => {
      const medium = lead.medium || "(sem medium)";
      acc[medium] = (acc[medium] || 0) + 1;
    });
    return Object.entries(acc)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [leads]);

  const cargoData = useMemo(() => {
    return JOB_LEVELS.map((j) => ({
      name: j.label,
      value: leads.filter((l) => l.cargo === j.value).length,
    })).filter((d) => d.value > 0);
  }, [leads]);

  const employeeData = useMemo(() => {
    return EMPLOYEE_RANGES.map((e) => ({
      name: e.label,
      value: leads.filter((l) => l.employee_range === e.value).length,
    })).filter((d) => d.value > 0);
  }, [leads]);

  const dailyStackedData = useMemo(() => aggregateByDay(leads), [leads]);

  const toggleRevenueInLegend = (key: string) => {
    setHiddenRevenueRanges((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const renderDailyStackedLegend = () => (
    <ul className="flex flex-wrap justify-center gap-3 mt-2 list-none">
      {REVENUE_RANGES.map((r) => {
        const hidden = hiddenRevenueRanges.has(r.value);
        return (
          <li
            key={r.value}
            className="flex items-center gap-1.5 cursor-pointer"
            onClick={() => toggleRevenueInLegend(r.value)}
          >
            <span
              className="inline-block w-3 h-3 rounded"
              style={{ backgroundColor: hidden ? "#ccc" : REVENUE_COLORS[r.value] }}
            />
            <span className={hidden ? "text-gray-500 line-through" : "text-gray-300"}>{r.label}</span>
          </li>
        );
      })}
    </ul>
  );

  const cardClass = "bg-gray-800 rounded-xl p-6 border border-gray-700";
  const titleClass = "text-lg font-display font-semibold text-white mb-4";
  const gridStroke = "#374151";
  const axisStroke = "#9ca3af";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className={cardClass}>
          <h3 className={titleClass}>Total de Leads</h3>
          <div className="text-4xl font-bold text-elite-flow">{leads.length}</div>
        </div>

        <div className={cardClass}>
          <h3 className={titleClass}>Leads por Semana (Últimas 4)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeks}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="week" stroke={axisStroke} />
              <YAxis stroke={axisStroke} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
              <Bar dataKey="leads" fill="#00BCBC" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className={titleClass}>Leads diários por faixa de faturamento</h3>
        <p className="text-sm text-gray-400 mb-2">Clique na legenda para mostrar ou ocultar uma faixa.</p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={dailyStackedData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="date" stroke={axisStroke} />
            <YAxis stroke={axisStroke} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
              formatter={(value, name) => [
                Number(value ?? 0),
                REVENUE_RANGES.find((r) => r.value === name)?.label ?? String(name ?? ""),
              ]}
              labelFormatter={(label) => `Data: ${label}`}
            />
            <Legend content={renderDailyStackedLegend} />
            {REVENUE_RANGES.filter((r) => !hiddenRevenueRanges.has(r.value)).map((r) => (
              <Bar
                key={r.value}
                dataKey={r.value}
                stackId="revenue"
                fill={REVENUE_COLORS[r.value]}
                name={r.value}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={cardClass}>
          <h3 className={titleClass}>Leads por Campanha (UTM)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={campaignData} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis type="number" stroke={axisStroke} />
              <YAxis dataKey="name" type="category" width={80} stroke={axisStroke} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
              <Bar dataKey="value" fill="#00BCBC" name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={cardClass}>
          <h3 className={titleClass}>Leads por Medium (UTM)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mediumData} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis type="number" stroke={axisStroke} />
              <YAxis dataKey="name" type="category" width={80} stroke={axisStroke} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
              <Bar dataKey="value" fill="#FE5009" name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={cardClass}>
          <h3 className={titleClass}>Leads por Cargo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cargoData} layout="vertical" margin={{ left: 120 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis type="number" stroke={axisStroke} />
              <YAxis dataKey="name" type="category" width={115} stroke={axisStroke} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
              <Bar dataKey="value" fill="#00BCBC" name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={cardClass}>
          <h3 className={titleClass}>Leads por Tamanho da Empresa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={employeeData} layout="vertical" margin={{ left: 120 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis type="number" stroke={axisStroke} />
              <YAxis dataKey="name" type="category" width={115} stroke={axisStroke} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
              <Bar dataKey="value" fill="#009999" name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={cardClass}>
          <h3 className={titleClass}>Leads por Faixa de Faturamento</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis type="number" stroke={axisStroke} />
              <YAxis dataKey="name" type="category" width={150} stroke={axisStroke} tick={{ fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
              <Bar dataKey="value" fill="#FE5009" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={cardClass}>
          <h3 className={titleClass}>Leads por Origem (Source)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
