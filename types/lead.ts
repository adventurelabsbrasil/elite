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
  | "gerente_comercial"
  | "outro";

export type EmployeeRange =
  | "ate-10"
  | "11-50"
  | "51-200"
  | "201-500"
  | "acima-500";

export type PipelinePipe = "mkt" | "sales";

/** Etapa do funil (vinda do banco; criada/editada no admin). */
export interface PipelineStageRecord {
  id: string;
  label: string;
  sort_order: number;
  pipe: PipelinePipe;
  meta_conversion: boolean;
  created_at: string;
}

export interface Lead {
  id: string;
  form_id?: string;
  nome: string;
  email: string;
  whatsapp: string;
  cargo?: JobLevel;
  cargo_outro_qual?: string;
  revenue_range: RevenueRange;
  employee_range?: EmployeeRange;
  source?: string;
  medium?: string;
  campaign?: string;
  pipeline_stage_id?: string | null;
  /** Preenchido quando o lead é carregado com join em pipeline_stages */
  pipeline_stage?: PipelineStageRecord | null;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface LeadFormData {
  nome: string;
  email: string;
  whatsapp: string;
  cargo?: JobLevel;
  cargo_outro_qual?: string;
  revenue_range: RevenueRange;
  employee_range?: EmployeeRange;
}

export const JOB_LEVELS: { value: JobLevel; label: string }[] = [
  { value: "proprietario", label: "Proprietário" },
  { value: "ceo", label: "CEO" },
  { value: "cmo", label: "CMO" },
  { value: "diretor_comercial", label: "Diretor Comercial" },
  { value: "gerente_marketing", label: "Gerente de Marketing" },
  { value: "gerente_comercial", label: "Gerente Comercial" },
  { value: "outro", label: "Outro" },
];

export const EMPLOYEE_RANGES: { value: EmployeeRange; label: string }[] = [
  { value: "ate-10", label: "Até 10 funcionários" },
  { value: "11-50", label: "11 a 50 funcionários" },
  { value: "51-200", label: "51 a 200 funcionários" },
  { value: "201-500", label: "201 a 500 funcionários" },
  { value: "acima-500", label: "Acima de 500 funcionários" },
];

export const REVENUE_RANGES: { value: RevenueRange; label: string }[] = [
  { value: "ate-80mil", label: "Até R$80mil por mês" },
  { value: "80mil-150mil", label: "De R$80mil a R$150mil por mês" },
  { value: "150mil-300mil", label: "De R$150mil a R$300mil por mês" },
  { value: "300mil-500mil", label: "De R$300mil a R$500mil por mês" },
  { value: "500mil-1milhao", label: "De R$500mil a R$ 1 milhão por mês" },
  { value: "acima-1milhao", label: "Acima de R$ 1 milhão por mês" },
];

