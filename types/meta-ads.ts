/**
 * Linha do CSV de exportação Meta Ads (colunas em português).
 * Campos opcionais onde o CSV pode vir vazio (anúncios pausados, etc.).
 */
export interface MetaAdsRow {
  Dia?: string;
  Objetivo?: string;
  "Nome do anúncio"?: string;
  Alcance?: number;
  Impressões?: number;
  "Valor usado (BRL)"?: number;
  "Cliques no link"?: number;
  "Cliques (todos)"?: number;
  "CTR (taxa de cliques no link)"?: number;
  "Taxa de visualizações da página de destino por cliques no link"?: number;
  "Visualizações da página de destino"?: number;
  Leads?: number;
  "Taxa de conversão de lead por página de destino visualizada"?: number;
  "CPM (custo por 1.000 impressões)"?: number;
  "CPC (custo por clique no link)"?: number;
  "Custo por lead"?: number;
  "Conversas por mensagem iniciadas"?: number;
  "Início dos relatórios"?: string;
  "Término dos relatórios"?: string;
}

export interface MetaAdsWeekManifestItem {
  id: string;
  label: string;
}

export interface MetaAdsInsights {
  oQueFuncionou: string;
  oQueMelhorar: string;
}
