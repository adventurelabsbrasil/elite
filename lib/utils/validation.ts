import { z } from "zod";

export const leadFormSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string().email("Email inválido"),
  whatsapp: z
    .string()
    .min(14, "WhatsApp inválido")
    .max(15, "WhatsApp inválido"),
  cargo: z.enum([
    "proprietario",
    "ceo",
    "cmo",
    "diretor_comercial",
    "gerente_marketing",
    "gerente_comercial",
    "outro",
  ]).optional(),
  cargo_outro_qual: z.string().max(100).optional(),
  employee_range: z.enum([
    "ate-10",
    "11-50",
    "51-200",
    "201-500",
    "acima-500",
  ]).optional(),
  revenue_range: z.enum([
    "ate-80mil",
    "80mil-150mil",
    "150mil-300mil",
    "300mil-500mil",
    "500mil-1milhao",
    "acima-1milhao",
  ]),
}).refine(
  (data) => data.cargo !== "outro" || (data.cargo_outro_qual?.trim()?.length ?? 0) > 0,
  { message: "Informe qual é o cargo.", path: ["cargo_outro_qual"] }
);

export type LeadFormSchema = z.infer<typeof leadFormSchema>;
