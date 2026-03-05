"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { subDays, startOfDay, endOfDay, format } from "date-fns";

const PATH_OPTIONS = [
  { value: "/", label: "Landing (/)", pathname: "/" },
  { value: "/obrigado", label: "Obrigado (/obrigado)", pathname: "/obrigado" },
] as const;

const GRID_COLS = 60;
const GRID_ROWS = 40;
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 800;

type HeatmapEvent = {
  id: string;
  pathname: string;
  x_pct: number;
  y_pct: number;
  viewport_width: number;
  viewport_height: number;
  created_at: string;
};

function aggregateToGrid(events: HeatmapEvent[]): number[][] {
  const grid: number[][] = Array(GRID_ROWS)
    .fill(0)
    .map(() => Array(GRID_COLS).fill(0));

  for (const e of events) {
    const col = Math.min(GRID_COLS - 1, Math.floor((e.x_pct / 100) * GRID_COLS));
    const row = Math.min(GRID_ROWS - 1, Math.floor((e.y_pct / 100) * GRID_ROWS));
    grid[row][col]++;
  }

  return grid;
}

function drawHeatmap(
  ctx: CanvasRenderingContext2D,
  grid: number[][],
  width: number,
  height: number
) {
  const cellW = width / GRID_COLS;
  const cellH = height / GRID_ROWS;
  let maxVal = 0;
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      if (grid[r][c] > maxVal) maxVal = grid[r][c];
    }
  }
  if (maxVal === 0) return;

  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const v = grid[r][c];
      if (v === 0) continue;
      const intensity = Math.min(1, v / maxVal);
      const hue = 240 - intensity * 240;
      const alpha = 0.15 + intensity * 0.5;
      ctx.fillStyle = `hsla(${hue}, 80%, 50%, ${alpha})`;
      ctx.fillRect(c * cellW, r * cellH, cellW + 1, cellH + 1);
    }
  }
}

export function HeatmapPageContent() {
  const [pathname, setPathname] = useState<string>("/");
  const [dateFrom, setDateFrom] = useState<string>(() =>
    format(subDays(new Date(), 7), "yyyy-MM-dd")
  );
  const [dateTo, setDateTo] = useState<string>(() =>
    format(new Date(), "yyyy-MM-dd")
  );
  const [events, setEvents] = useState<HeatmapEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const from = startOfDay(new Date(dateFrom));
      const to = endOfDay(new Date(dateTo));
      const { data, error } = await supabase
        .from("heatmap_events")
        .select("id, pathname, x_pct, y_pct, viewport_width, viewport_height, created_at")
        .eq("pathname", pathname)
        .gte("created_at", from.toISOString())
        .lte("created_at", to.toISOString())
        .order("created_at", { ascending: true });
      if (error) throw error;
      setEvents((data as HeatmapEvent[]) ?? []);
    } catch (e) {
      console.error("Erro ao carregar eventos do heatmap:", e);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [pathname, dateFrom, dateTo]);

  useEffect(() => {
    if (!canvasRef.current || events.length === 0) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const grid = aggregateToGrid(events);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawHeatmap(ctx, grid, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, [events]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">
          Mapa de calor
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Cliques dos visitantes por página e período. Mais quente = mais cliques.
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-4 rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-400">
            Página
          </label>
          <select
            value={pathname}
            onChange={(e) => setPathname(e.target.value)}
            className="rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:border-elite-flow focus:outline-none focus:ring-1 focus:ring-elite-flow"
          >
            {PATH_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.pathname}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-400">
            De
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:border-elite-flow focus:outline-none focus:ring-1 focus:ring-elite-flow"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-400">
            Até
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="rounded-lg border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:border-elite-flow focus:outline-none focus:ring-1 focus:ring-elite-flow"
          />
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-gray-300">
          <span className="rounded bg-gray-700 px-2 py-1 font-medium">
            {events.length} cliques
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4">
        {isLoading ? (
          <div className="flex h-[400px] items-center justify-center text-gray-400">
            Carregando…
          </div>
        ) : events.length === 0 ? (
          <div className="flex h-[400px] items-center justify-center text-gray-400">
            Nenhum clique no período. Ajuste a página ou as datas.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-block rounded-lg border border-gray-600 bg-gray-900/80 p-2">
              <canvas
                ref={canvasRef}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
                className="block max-w-full rounded"
                style={{ width: "100%", maxWidth: 900, height: "auto" }}
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Legenda: azul = menos cliques, vermelho = mais cliques.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
