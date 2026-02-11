# ELITE – Método Elite (elite.adventurelabs.com.br)

Landing page do Método ELITE: captação de leads (formulário em popup), página de agradecimento e área administrativa para visualização e exportação de leads. Backend: Supabase (schema `elite`) para dados e autenticação.

**Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Supabase, React Hook Form + Zod, Shadcn/UI.

---

## Estrutura do projeto

| Pasta | Conteúdo |
|-------|----------|
| `app/` | Rotas: `page.tsx` (landing), `obrigado/` (pós-inscrição), `admin/` (layout), `admin/login/` (login), `admin/(protected)/` (dashboard). Redirect em `inscreva-se/`. |
| `components/` | **Layout:** Header, Footer, BackToTop. **Form:** QualificationForm, FormModal, CtaButton, WhatsAppInput. **Sections:** Hero, Benefits, TargetAudience, Problem, Solution, About, FinalCTA. **Admin:** Dashboard, LeadsTable, Charts. **ui/** (shadcn). |
| `lib/` | Supabase (client, server), utils (format, validation), constants (ex.: WHATSAPP_GROUP_INVITE), auth. |
| `public/` | Assets: Hero (`bairro-planejado-obras.png`, `ribas-young-hero.png`), About (`partnership.png`, `ribas-young.jpg`), Benefits (`young-team.avif`), favicon, ícones. |
| `types/` | `lead.ts` – Lead, JOB_LEVELS, REVENUE_RANGES, EMPLOYEE_RANGES. |
| `docs/` | Supabase: `SUPABASE_ELITE.md`, `SUPABASE_FORM_FIX.md`. Migrations: `supabase-migration-cargo.sql`, `supabase-migration-cargo-outro-funcionarios.sql`. `docs/archive/` – documentos e código obsoletos (ex.: cópia antiga "Sem Título"). |

---

## Rotas e como acessar

| Rota | Descrição | Como acessar |
|------|-----------|--------------|
| `/` | Landing principal | Abrir a URL do site. Formulário só em popup (todos os CTAs verdes abrem o modal). Ordem das seções: Hero → Benefits → TargetAudience → Problem → Solution → FinalCTA → About → Footer. |
| `/inscreva-se` | Redirect 301 → `/` | Qualquer link para `/inscreva-se` leva à landing. |
| `/obrigado` | Página pós-inscrição | Exibida após envio do formulário (redirect no client). Link do grupo WhatsApp em `lib/constants.ts`. |
| `/admin/login` | Login admin (Supabase) | Acessar diretamente ou via `/login` (redirect em `next.config.ts`). Credenciais: usuário criado no Supabase Auth. |
| `/admin` | Dashboard de leads | Protegido; exige login. Após autenticar em `/admin/login`, redireciona para o dashboard (leads, gráficos, export CSV). |

---

## Dev (Getting Started)

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000). Build: `npm run build`.

### Variáveis de ambiente

- `NEXT_PUBLIC_SUPABASE_URL` – URL do projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Chave anon do Supabase

Crie `.env.local` na raiz com essas variáveis. Schema e tabelas: executar `supabase-schema.sql` no SQL Editor do Supabase. Migrations adicionais (cargo, cargo outro, funcionários) em `docs/` – ver `docs/SUPABASE_ELITE.md` e `docs/SUPABASE_FORM_FIX.md`.

### Testar formulário

1. Abrir `/` (ou `/inscreva-se`), clicar em qualquer CTA verde, preencher e enviar.
2. Conferir em **Supabase → Table Editor → schema `elite` → tabela `leads`**.
3. Fazer login em `/admin/login` e acessar `/admin` para ver os leads.

---

## Admin

- **URL de login:** `/admin/login` (ou `/login`, que redireciona).
- **Login:** email/senha (usuário criado em **Supabase → Authentication → Users**) ou **Entrar com Google** (OAuth).
- **Após login:** acesso a `/admin` (dashboard com tabela de leads, filtros, export CSV e gráficos).
- **Restringir a um único admin:** ver instruções no final de `supabase-schema.sql` (seção "Admin (opcional)" com RLS por `auth.uid()`).

### Login com Google

1. No **Supabase Dashboard:** Authentication → **Providers** → ative **Google** e preencha Client ID e Client Secret (Google Cloud Console: credenciais OAuth 2.0, tipo "Aplicativo da Web", URL de redirecionamento autorizado: `https://<seu-projeto>.supabase.co/auth/v1/callback`).
2. Em **Authentication → URL Configuration**, adicione em **Redirect URLs** as URLs do seu app que recebem o callback, por exemplo:
   - `http://localhost:3000/auth/callback` (dev)
   - `https://elite.adventurelabs.com.br/auth/callback` (produção)
3. Na tela de login do admin, use o botão **Entrar com Google**.

---

## Deploy (Vercel)

Configurar no projeto Vercel as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Schema e permissões: `supabase-schema.sql`; em caso de erro 42501/401 no formulário, seguir `docs/SUPABASE_FORM_FIX.md`.

---

## UTM: obter na URL e gravar na tabela de leads

O formulário lê os parâmetros UTM da URL no momento do envio e grava em `elite.leads` nos campos `source`, `medium` e `campaign`.

| Parâmetro | Campo na tabela | Exemplo |
|-----------|-----------------|---------|
| `utm_source` | `source` | `google`, `facebook`, `newsletter` |
| `utm_medium` | `medium` | `cpc`, `email`, `organic` |
| `utm_campaign` | `campaign` | `lancamento_2025`, `black_friday` |

**Exemplo de link para campanhas:**

```
https://elite.adventurelabs.com.br/?utm_source=google&utm_medium=cpc&utm_campaign=lancamento_metodo_elite
```

Implementação: `lib/utils/format.ts` (`getUTMParams`) e uso em `components/Form/QualificationForm.tsx`.

---

## Imagens e assets

- **Hero:** fundo `public/bairro-planejado-obras.png` (opacidade ~0,4); imagem principal `public/ribas-young-hero.png`.
- **About:** `public/ribas-young.jpg` (texto sobre Rodrigo), `public/partnership.png` (destaques do estrategista).
- **Benefits (“O que você vai conquistar”):** fundo semitransparente `public/young-team.avif`.

Para trocar, substituir os arquivos em `public/` mantendo os nomes ou atualizar as referências nos componentes.

---

## Documentos arquivados

Documentos e código obsoletos ou de outro projeto estão em **`docs/archive/`**, incluindo a cópia antiga da landing (**Sem Título**) e o `CODE_REVIEW.md` (conteúdo incorporado a este README). Documentação ativa de Supabase e migrations permanece em `docs/`.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Deploy on Vercel](https://vercel.com/docs)
