import { z } from 'zod'

export const leadFormSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  whatsapp: z.string().min(14, 'WhatsApp inválido').max(15, 'WhatsApp inválido'),
  revenue_range: z.enum([
    'ate-80mil',
    '80mil-150mil',
    '150mil-300mil',
    '300mil-500mil',
    '500mil-1milhao',
    'acima-1milhao',
  ]),
})

export type LeadFormSchema = z.infer<typeof leadFormSchema>
