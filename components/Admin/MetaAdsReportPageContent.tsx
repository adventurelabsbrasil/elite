"use client";

import { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Download, Lightbulb, TrendingUp, TrendingDown } from "lucide-react";
import type { MetaAdsRow, MetaAdsWeekManifestItem, MetaAdsInsights } from "@/types/meta-ads";
import { parseMetaAdsCsv } from "@/lib/meta-ads/parse-csv";

const CARD_CLASS = "bg-gray-800 rounded-xl p-6 border border-gray-700";
const TITLE_CLASS = "text-lg font-display font-semibold text-white mb-4";
const GRID_STROKE = "#374151";
const AXIS_STROKE = "#9ca3af";
const TOOLTIP_STYLE = {
  backgroundColor: "#1f2937",
  border: "1px solid #374151",
  borderRadius: "8px",
} as const;

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function aggregateByDay(rows: MetaAdsRow[], key: "Valor usado (BRL)" | "Leads") {
  const byDay: Record<string, number> = {};
  rows.forEach((r) => {
    const day = r.Dia ?? "";
    if (!day) return;
    const val = r[key] ?? 0;
    byDay[day] = (byDay[day] ?? 0) + val;
  });
  return Object.entries(byDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({
      date: format(parseISO(date), "dd/MM", { locale: ptBR }),
      full: date,
      value,
    }));
}

function aggregateByObjective(rows: MetaAdsRow[]) {
  const byObj: Record<string, number> = {};
  rows.forEach((r) => {
    const obj = r.Objetivo ?? "(sem objetivo)";
    const val = r["Valor usado (BRL)"] ?? 0;
    byObj[obj] = (byObj[obj] ?? 0) + val;
  });
  return Object.entries(byObj)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function aggregateByAdName(rows: MetaAdsRow[], field: "Valor usado (BRL)" | "Leads" | "Alcance" | "Impressões", topN: number) {
  const byName: Record<string, number> = {};
  rows.forEach((r) => {
    const name = r["Nome do anúncio"] ?? "(sem nome)";
    const val = (r[field] as number | undefined) ?? 0;
    byName[name] = (byName[name] ?? 0) + val;
  });
  return Object.entries(byName)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, topN);
}

export function MetaAdsReportPageContent() {
  const [week, setWeek] = useState("w9");
  const [rows, setRows] = useState<MetaAdsRow[]>([]);
  const [insights, setInsights] = useState<MetaAdsInsights | null>(null);
  const [weeks, setWeeks] = useState<MetaAdsWeekManifestItem[]>([{ id: "w9", label: "Semana 9 (W9)" }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`/data/meta-ads/manifest.json`).then((r) => (r.ok ? r.json() : null)),
      fetch(`/data/meta-ads/${week}.csv`).then((r) => (r.ok ? r.text() : Promise.reject(new Error("CSV não encontrado")))),
      fetch(`/data/meta-ads/${week}-insights.json`).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([manifest, csvText, insightsData]) => {
        if (cancelled) return;
        if (manifest && Array.isArray(manifest) && manifest.length > 0) {
          setWeeks(manifest);
        }
        const data = parseMetaAdsCsv(csvText);
        setRows(data);
        setInsights(insightsData && typeof insightsData.oQueFuncionou === "string" ? insightsData : null);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message ?? "Erro ao carregar dados. Coloque o CSV em public/data/meta-ads/" + week + ".csv");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [week]);

  const totals = useMemo(() => {
    const gasto = rows.reduce((s, r) => s + (r["Valor usado (BRL)"] ?? 0), 0);
    const leads = rows.reduce((s, r) => s + (r.Leads ?? 0), 0);
    const impressoes = rows.reduce((s, r) => s + (r.Impressões ?? 0), 0);
    const alcance = rows.reduce((s, r) => s + (r.Alcance ?? 0), 0);
    const cliques = rows.reduce((s, r) => s + (r["Cliques no link"] ?? 0), 0);
    const cpl = leads > 0 ? gasto / leads : undefined;
    return { gasto, leads, impressoes, alcance, cliques, cpl };
  }, [rows]);

  const gastoPorDia = useMemo(() => aggregateByDay(rows, "Valor usado (BRL)"), [rows]);
  const leadsPorDia = useMemo(() => aggregateByDay(rows, "Leads"), [rows]);
  const gastoPorObjetivo = useMemo(() => aggregateByObjective(rows), [rows]);
  const topGasto = useMemo(() => aggregateByAdName(rows, "Valor usado (BRL)", 10), [rows]);

  const topLeads = useMemo(() => {
    const byName: Record<string, number> = {};
    rows.forEach((r) => {
      const name = r["Nome do anúncio"] ?? "(sem nome)";
      const val = r.Leads ?? 0;
      byName[name] = (byName[name] ?? 0) + val;
    });
    return Object.entries(byName)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [rows]);

  const melhorCpl = useMemo(() => {
    const withLeads = rows.filter((r) => (r.Leads ?? 0) > 0 && (r["Custo por lead"] ?? 0) > 0);
    const byName: Record<string, { totalLeads: number; totalGasto: number }> = {};
    withLeads.forEach((r) => {
      const name = r["Nome do anúncio"] ?? "(sem nome)";
      if (!byName[name]) byName[name] = { totalLeads: 0, totalGasto: 0 };
      byName[name].totalLeads += r.Leads ?? 0;
      byName[name].totalGasto += r["Valor usado (BRL)"] ?? 0;
    });
    return Object.entries(byName)
      .map(([name, { totalLeads, totalGasto }]) => ({ name, cpl: totalGasto / totalLeads, leads: totalLeads }))
      .sort((a, b) => a.cpl - b.cpl)
      .slice(0, 5);
  }, [rows]);

  const topAlcance = useMemo(() => aggregateByAdName(rows, "Alcance", 5), [rows]);
  const topCtr = useMemo(() => {
    const withCtr = rows.filter((r) => (r["CTR (taxa de cliques no link)"] ?? 0) > 0 && (r["Cliques no link"] ?? 0) > 0);
    const byName: Record<string, number> = {};
    withCtr.forEach((r) => {
      const name = r["Nome do anúncio"] ?? "(sem nome)";
      const ctr = r["CTR (taxa de cliques no link)"] ?? 0;
      if (!byName[name] || ctr > byName[name]) byName[name] = ctr;
    });
    return Object.entries(byName)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [rows]);

  const exportCsv = () => {
    const headers = ["Dia", "Objetivo", "Nome do anúncio", "Valor usado (BRL)", "Leads", "Cliques no link", "CPC", "Custo por lead"];
    const escape = (cell: string | number | undefined) => {
      const s = String(cell ?? "");
      if (s.includes(",") || s.includes('"') || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };
    const csvRows = rows.map((r) =>
      [
        r.Dia,
        r.Objetivo,
        r["Nome do anúncio"],
        r["Valor usado (BRL)"],
        r.Leads,
        r["Cliques no link"],
        r["CPC (custo por clique no link)"],
        r["Custo por lead"],
      ].map(escape).join(",")
    );
    const csv = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `meta-ads-${week}-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400">
        Carregando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-gray-800 border border-gray-700 p-6 text-center">
        <p className="text-red-400">{error}</p>
        <p className="text-sm text-gray-400 mt-2">Coloque o CSV em public/data/meta-ads/{week}.csv</p>
      </div>
    );
  }

  const tableRows = rows.slice(0, 50);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-display font-bold text-white">
            Relatórios Meta Ads
          </h2>
          <select
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            className="rounded-lg bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-elite-flow"
          >
            {weeks.map((w) => (
              <option key={w.id} value={w.id}>
                {w.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-elite-flow hover:opacity-90 text-white text-sm font-medium transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className={CARD_CLASS}>
          <h3 className={TITLE_CLASS}>Gasto total (BRL)</h3>
          <div className="text-2xl font-bold text-elite-flow">{formatBRL(totals.gasto)}</div>
        </div>
        <div className={CARD_CLASS}>
          <h3 className={TITLE_CLASS}>Leads</h3>
          <div className="text-2xl font-bold text-elite-flow">{totals.leads}</div>
        </div>
        <div className={CARD_CLASS}>
          <h3 className={TITLE_CLASS}>Impressões</h3>
          <div className="text-2xl font-bold text-white">{totals.impressoes.toLocaleString("pt-BR")}</div>
        </div>
        <div className={CARD_CLASS}>
          <h3 className={TITLE_CLASS}>Alcance</h3>
          <div className="text-2xl font-bold text-white">{totals.alcance.toLocaleString("pt-BR")}</div>
        </div>
        <div className={CARD_CLASS}>
          <h3 className={TITLE_CLASS}>Cliques no link</h3>
          <div className="text-2xl font-bold text-white">{totals.cliques}</div>
        </div>
        <div className={CARD_CLASS}>
          <h3 className={TITLE_CLASS}>Custo por lead</h3>
          <div className="text-2xl font-bold text-elite-glow">
            {totals.cpl != null ? formatBRL(totals.cpl) : "—"}
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className={CARD_CLASS}>
          <h3 className={TITLE_CLASS}>Gasto por dia</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={gastoPorDia}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis dataKey="date" stroke={AXIS_STROKE} />
              <YAxis stroke={AXIS_STROKE} tickFormatter={(v) => `R$ ${v}`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value: number | undefined) => [value != null ? formatBRL(value) : "—", "Gasto"]} />
              <Bar dataKey="value" fill="#00BCBC" name="Gasto" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={CARD_CLASS}>
          <h3 className={TITLE_CLASS}>Leads por dia</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={leadsPorDia}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis dataKey="date" stroke={AXIS_STROKE} />
              <YAxis stroke={AXIS_STROKE} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="value" fill="#FE5009" name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={CARD_CLASS}>
          <h3 className={TITLE_CLASS}>Gasto por objetivo</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={gastoPorObjetivo} layout="vertical" margin={{ left: 120 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis type="number" stroke={AXIS_STROKE} tickFormatter={(v) => `R$ ${v}`} />
              <YAxis dataKey="name" type="category" width={115} stroke={AXIS_STROKE} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value: number | undefined) => [value != null ? formatBRL(value) : "—", "Gasto"]} />
              <Bar dataKey="value" fill="#00BCBC" name="Gasto" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={CARD_CLASS}>
          <h3 className={TITLE_CLASS}>Top 10 anúncios por gasto</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topGasto} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} />
              <XAxis type="number" stroke={AXIS_STROKE} tickFormatter={(v) => `R$ ${v}`} />
              <YAxis dataKey="name" type="category" width={180} stroke={AXIS_STROKE} tick={{ fontSize: 10, fill: "#9ca3af" }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value: number | undefined) => [value != null ? formatBRL(value) : "—", "Gasto"]} />
              <Bar dataKey="value" fill="#009999" name="Gasto" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights e análise */}
      <div className={CARD_CLASS}>
        <h3 className={TITLE_CLASS + " flex items-center gap-2"}>
          <Lightbulb className="w-5 h-5 text-elite-flow" />
          Insights e análise
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Top anúncios por leads</h4>
            {topLeads.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhum lead no período.</p>
            ) : (
              <ul className="space-y-1 text-sm text-gray-300">
                {topLeads.map((a, i) => (
                  <li key={i} className="truncate" title={a.name}>
                    <span className="text-elite-flow font-medium">{a.value}</span> — {a.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Melhor custo por lead (com leads)</h4>
            {melhorCpl.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhum anúncio com leads no período.</p>
            ) : (
              <ul className="space-y-1 text-sm text-gray-300">
                {melhorCpl.map((a, i) => (
                  <li key={i} className="truncate" title={a.name}>
                    <span className="text-elite-flow font-medium">{formatBRL(a.cpl)}</span> ({a.leads} leads) — {a.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Maior alcance</h4>
            {topAlcance.length === 0 ? (
              <p className="text-gray-500 text-sm">Sem dados.</p>
            ) : (
              <ul className="space-y-1 text-sm text-gray-300">
                {topAlcance.map((a, i) => (
                  <li key={i} className="truncate" title={a.name}>
                    <span className="text-elite-flow font-medium">{a.value.toLocaleString("pt-BR")}</span> — {a.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Melhor CTR</h4>
            {topCtr.length === 0 ? (
              <p className="text-gray-500 text-sm">Sem cliques no período.</p>
            ) : (
              <ul className="space-y-1 text-sm text-gray-300">
                {topCtr.map((a, i) => (
                  <li key={i} className="truncate" title={a.name}>
                    <span className="text-elite-flow font-medium">{a.value.toFixed(2)}%</span> — {a.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {insights ? (
          <div className="grid md:grid-cols-2 gap-6 border-t border-gray-700 pt-6">
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                O que funcionou bem
              </h4>
              <p className="text-gray-300 text-sm whitespace-pre-wrap">{insights.oQueFuncionou}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-1">
                <TrendingDown className="w-4 h-4 text-amber-500" />
                O que pode melhorar
              </h4>
              <p className="text-gray-300 text-sm whitespace-pre-wrap">{insights.oQueMelhorar}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-sm border-t border-gray-700 pt-4">
            Adicione <code className="bg-gray-700 px-1 rounded">{week}-insights.json</code> em <code className="bg-gray-700 px-1 rounded">public/data/meta-ads/</code> com campos <code className="bg-gray-700 px-1 rounded">oQueFuncionou</code> e <code className="bg-gray-700 px-1 rounded">oQueMelhorar</code> para exibir as observações do período.
          </p>
        )}
      </div>

      {/* Tabela resumida */}
      <div className={CARD_CLASS}>
        <h3 className={TITLE_CLASS}>Tabela resumida (até 50 linhas)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 pr-4">Dia</th>
                <th className="py-2 pr-4">Objetivo</th>
                <th className="py-2 pr-4 max-w-[200px]">Nome do anúncio</th>
                <th className="py-2 pr-4">Valor (BRL)</th>
                <th className="py-2 pr-4">Leads</th>
                <th className="py-2 pr-4">Cliques</th>
                <th className="py-2 pr-4">CPC</th>
                <th className="py-2">CPL</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((r, i) => (
                <tr key={i} className="border-b border-gray-700/50">
                  <td className="py-2 pr-4">{r.Dia ?? "—"}</td>
                  <td className="py-2 pr-4">{r.Objetivo ?? "—"}</td>
                  <td className="py-2 pr-4 max-w-[200px] truncate" title={r["Nome do anúncio"]}>{r["Nome do anúncio"] ?? "—"}</td>
                  <td className="py-2 pr-4">{(r["Valor usado (BRL)"] ?? 0) > 0 ? formatBRL(r["Valor usado (BRL)"]!) : "—"}</td>
                  <td className="py-2 pr-4">{r.Leads ?? "—"}</td>
                  <td className="py-2 pr-4">{r["Cliques no link"] ?? "—"}</td>
                  <td className="py-2 pr-4">{r["CPC (custo por clique no link)"] != null ? formatBRL(r["CPC (custo por clique no link)"]!) : "—"}</td>
                  <td className="py-2">{r["Custo por lead"] != null ? formatBRL(r["Custo por lead"]!) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length > 50 && (
          <p className="text-gray-500 text-sm mt-2">Exibindo 50 de {rows.length} linhas. Use Exportar CSV para ver todos.</p>
        )}
      </div>
    </div>
  );
}
