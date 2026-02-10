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
  **`https://elite.adventurelabs.com.br/inscreva-se`**  
  (em preview: `https://<seu-dominio-vercel>/inscreva-se`).

- **Rota no app:** `app/inscreva-se/page.tsx` – página com Header, Hero, Benefits, TargetAudience, About, Problem, Solution, **QualificationForm**, FAQ, FinalCTA e Footer.

- **Componente do form:** `components/Form/QualificationForm.tsx` – envia para a tabela `elite.leads` (Supabase, schema `elite`).

**Como testar:**

1. Abrir `/inscreva-se`, preencher e enviar.
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
https://elite.adventurelabs.com.br/inscreva-se?utm_source=google&utm_medium=cpc&utm_campaign=lancamento_metodo_elite
```

Ao preencher e enviar o form nessa URL, o lead ficará com `source=google`, `medium=cpc`, `campaign=lancamento_metodo_elite` na tabela. Se algum parâmetro não for passado, o campo correspondente fica `null`. Implementação em `lib/utils/format.ts` (`getUTMParams`) e uso em `components/Form/QualificationForm.tsx`.

## Admin e RLS

Dashboard de leads: `/admin` (protegido por login Supabase). Para restringir acesso a um único admin, ver instruções no final de `supabase-schema.sql` (seção "Admin (opcional)").

## Imagem de fundo (Hero)

Para exibir a imagem de loteamento em obras ao fundo da seção Hero (quase transparente), coloque o arquivo em **`public/loteamento-obras.jpg`** (ou `.webp`). Se o arquivo não existir, o Hero usa apenas o fundo navy.

## Deploy (Vercel)

Variáveis de ambiente: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Ver `docs/SUPABASE_ELITE.md` para schema e domínio.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Deploy on Vercel](https://vercel.com/docs)
