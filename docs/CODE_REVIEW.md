# Revisão do código – ELITE (Landing + Admin)

Revisão da estrutura de rotas, páginas e componentes para uso em produção.

---

## Rotas (App Router)

| Rota | Uso | Observação |
|------|-----|------------|
| `/` | Landing principal | Formulário só em popup (FormModal). Ordem: Hero → Benefits → TargetAudience → Problem → Solution → FinalCTA → About → Footer. |
| `/inscreva-se` | Redirect 301 → `/` | `next.config.ts` + `app/inscreva-se/page.tsx` (redirect no server). |
| `/obrigado` | Página pós-inscrição | Exibida após envio do form (redirect no client). Link do grupo WhatsApp em `lib/constants.ts`. |
| `/admin` | Dashboard de leads | Protegido por layout; exige login Supabase. |
| `/admin/login` | Login Supabase | Para acessar o dashboard. |
| `/api/auth/[...nextauth]` | NextAuth (se usado) | Pode ser desativado se o admin usar só Supabase Auth. |

**Conclusão:** Rotas coerentes. `/inscreva-se` e `/` evitam duplicar conteúdo. Admin isolado em `/admin/*`.

---

## Estrutura de pastas

- **`app/`** – Páginas e layouts (page.tsx, layout.tsx). Sem lógica pesada; componentes em `components/`.
- **`components/`** – Layout (Header, Footer, BackToTop), Form (QualificationForm, FormModal, CtaButton), Sections (Hero, Benefits, etc.), Admin, ui (shadcn).
- **`lib/`** – Supabase (client, server), utils (format, validation), constants (WhatsApp, etc.), auth.
- **`public/`** – Assets estáticos (imagens, favicon). Background Hero: `loteamento-obras.jpg`.
- **`docs/`** – SUPABASE_FORM_FIX.md, CODE_REVIEW.md.

**Conclusão:** Organização clara. Constantes públicas em `lib/constants.ts`; links reutilizáveis (ex.: WhatsApp) centralizados.

---

## Pontos de atenção para produção

1. **Variáveis de ambiente**  
   - `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` no Vercel (ou outro host).  
   - Admin: usuário criado no Supabase Auth e, se quiser, policy RLS restrita (ver `supabase-schema.sql`).

2. **Formulário e Supabase**  
   - Schema `elite` exposto em **Settings → API → Exposed schemas**.  
   - Grants executados (USAGE no schema, INSERT em `elite.leads`). Ver `docs/SUPABASE_FORM_FIX.md` em caso de 42501/401.

3. **Componentes não usados**  
   - `components/Sections/EliteReveal.tsx` – não importado (acrônimo dinâmico removido). Pode ser apagado se não for reutilizado.  
   - `components/Sections/FAQ.tsx` – não está na página principal; manter se for usar em outra rota.  
   - `components/dashboard.tsx` e `components/elite-landing.tsx` – verificar se são legado; remover se não forem referenciados.

4. **Redirect pós-submit**  
   - Após sucesso, o form redireciona para `/obrigado`. Garantir que `router.push("/obrigado")` (ou equivalente) está sendo chamado no `QualificationForm` após o insert.

5. **Acessibilidade**  
   - Dialog do form com `DialogDescription` e `aria-describedby` (já ajustado).

6. **Mobile**  
   - Layout pensado primeiro para desktop; revisar breakpoints e toques em telas pequenas quando for prioridade.

---

## Resumo

- Rotas e estrutura estão **organizadas e prontas para uso**.  
- Constantes e link do WhatsApp centralizados; background do Hero com imagem leve em `public/`.  
- Para produção: conferir env vars, Supabase (exposed schema + grants) e remover ou documentar componentes não usados (EliteReveal, FAQ, dashboard/elite-landing) conforme a necessidade do projeto.
