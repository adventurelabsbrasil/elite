# ELITE – Método Elite (elite.adventurelabs.com.br)

Next.js app: landing page, formulário de leads e dashboard admin. Supabase (schema `elite`) para leads e auth.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Build: `npm run build`.

## Formulário e testes

- **URL do formulário (landing com form):**  
  **`https://elite.adventurelabs.com.br/`**  
  (em preview: `https://<seu-dominio-vercel>/`). A rota `/inscreva-se` redireciona permanentemente para `/`.

- **Rota no app:** `app/page.tsx` – página com Header, Hero, Benefits, TargetAudience, Problem, Solution, FinalCTA, About e Footer. O formulário aparece **apenas em popup** (todos os CTAs verdes abrem o modal).

- **Componente do form:** `components/Form/QualificationForm.tsx` (dentro de `FormModal`) – envia para a tabela `elite.leads` (Supabase, schema `elite`). Link do grupo WhatsApp em `lib/constants.ts` (`WHATSAPP_GROUP_INVITE`).

**Como testar:**

1. Abrir `/` (ou `/inscreva-se`, que redireciona para `/`), clicar em qualquer CTA verde, preencher e enviar.
2. Conferir em **Supabase → Table Editor → schema `elite` → tabela `leads`**.
3. Fazer login em `/admin/login` com o usuário admin e abrir `/admin` para ver os leads no dashboard.

## UTM: obter na URL e gravar na tabela de leads

O formulário lê os parâmetros UTM da URL no momento do envio e grava na tabela `elite.leads` nos campos `source`, `medium` e `campaign`.

**Parâmetros na URL:**

| Parâmetro     | Campo na tabela | Exemplo |
|--------------|-----------------|---------|
| `utm_source` | `source`        | `google`, `facebook`, `newsletter` |
| `utm_medium` | `medium`        | `cpc`, `email`, `organic` |
| `utm_campaign` | `campaign`    | `lancamento_2025`, `black_friday` |

**Exemplo de link para campanhas:**

```
https://elite.adventurelabs.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=lancamento_metodo_elite
```

Ao preencher e enviar o form nessa URL, o lead ficará com `source=google`, `medium=cpc`, `campaign=lancamento_metodo_elite` na tabela. Se algum parâmetro não for passado, o campo correspondente fica `null`. Implementação em `lib/utils/format.ts` (`getUTMParams`) e uso em `components/Form/QualificationForm.tsx`.

## Admin e RLS

Dashboard de leads: `/admin` (protegido por login Supabase). Para restringir acesso a um único admin, ver instruções no final de `supabase-schema.sql` (seção "Admin (opcional)").

## Imagem de fundo (Hero)

A imagem **`public/loteamento-obras.jpg`** (~116 KB) é exibida ao fundo da seção Hero com opacidade baixa (apoio visual). Origem: [Unsplash](https://unsplash.com/s/photos/construction) (licença livre). Para trocar, substitua o arquivo mantendo o nome.

## Deploy (Vercel)

Variáveis de ambiente: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Schema em `supabase-schema.sql`; correção de erro 42501/401 em `docs/SUPABASE_FORM_FIX.md`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Deploy on Vercel](https://vercel.com/docs)
