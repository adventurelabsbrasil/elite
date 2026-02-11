export type RevenueRange =
  | "ate-80mil"
  | "80mil-150mil"
  | "150mil-300mil"
  | "300mil-500mil"
  | "500mil-1milhao"
  | "acima-1milhao";

export type JobLevel =
  | "proprietario"
  | "ceo"
  | "cmo"
  | "diretor_comercial"
  | "gerente_marketing"
  | "gerente_comercial";

export interface Lead {
  id: string;
  nome: string;
  email: string;
  whatsapp: string;
  cargo?: JobLevel;
  revenue_range: RevenueRange;
  source?: string;
  medium?: string;
  campaign?: string;
  created_at: string;
  updated_at: string;
}

export interface LeadFormData {
  nome: string;
  email: string;
  whatsapp: string;
  cargo?: JobLevel;
  revenue_range: RevenueRange;
}

export const JOB_LEVELS: { value: JobLevel; label: string }[] = [
  { value: "proprietario", label: "Proprietário" },
  { value: "ceo", label: "CEO" },
  { value: "cmo", label: "CMO" },
  { value: "diretor_comercial", label: "Diretor Comercial" },
  { value: "gerente_marketing", label: "Gerente de Marketing" },
  { value: "gerente_comercial", label: "Gerente Comercial" },
];

export const REVENUE_RANGES: { value: RevenueRange; label: string }[] = [
  { value: "ate-80mil", label: "Até R$80mil por mês" },
  { value: "80mil-150mil", label: "De R$80mil a R$150mil por mês" },
  { value: "150mil-300mil", label: "De R$150mil a R$300mil por mês" },
  { value: "300mil-500mil", label: "De R$300mil a R$500mil por mês" },
  { value: "500mil-1milhao", label: "De R$500mil a R$ 1 milhão por mês" },
  { value: "acima-1milhao", label: "Acima de R$ 1 milhão por mês" },
];
