import type { MetaAdsRow } from "@/types/meta-ads";

const NUMERIC_KEYS = new Set([
  "Alcance",
  "Impressões",
  "Valor usado (BRL)",
  "Cliques no link",
  "Cliques (todos)",
  "CTR (taxa de cliques no link)",
  "Taxa de visualizações da página de destino por cliques no link",
  "Visualizações da página de destino",
  "Leads",
  "Taxa de conversão de lead por página de destino visualizada",
  "CPM (custo por 1.000 impressões)",
  "CPC (custo por clique no link)",
  "Custo por lead",
  "Conversas por mensagem iniciadas",
]);

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (inQuotes) {
      if (c === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        current += c;
      }
    } else if (c === ",") {
      result.push(current.trim());
      current = "";
    } else {
      current += c;
    }
  }
  result.push(current.trim());
  return result;
}

function toNumber(value: string): number | undefined {
  if (value === "" || value == null) return undefined;
  const normalized = String(value).replace(",", ".").trim();
  const num = parseFloat(normalized);
  return Number.isFinite(num) ? num : undefined;
}

/**
 * Parse CSV string (Meta Ads export PT) into array of typed rows.
 * Handles quoted fields, comma/point decimals, empty cells.
 */
export function parseMetaAdsCsv(csvText: string): MetaAdsRow[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  const rows: MetaAdsRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const row: Record<string, string | number | undefined> = {};
    headers.forEach((h, j) => {
      const raw = values[j] ?? "";
      if (NUMERIC_KEYS.has(h)) {
        row[h] = toNumber(raw);
      } else {
        row[h] = raw === "" ? undefined : raw;
      }
    });
    rows.push(row as MetaAdsRow);
  }

  return rows;
}
