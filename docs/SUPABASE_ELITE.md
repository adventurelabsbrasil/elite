# Supabase: ELITE isolado no projeto adventurelabs

O ELITE (elite.adventurelabs.com.br) usa o **mesmo projeto Supabase** do site adventurelabs.com.br, mas com **dados isolados** para não misturar com o restante do produto.

## Como funciona

- **Projeto Supabase:** `ftctmseyrqhckutpfdeq` (adventurelabs).
- **Schema PostgreSQL:** `elite`. Todas as tabelas do ELITE ficam em `elite.*` (ex.: `elite.leads`).
- O site principal e o app usam o schema `public`; o ELITE usa apenas o schema `elite`.

## Configuração no Supabase

1. **Rodar o schema**
   - No SQL Editor do projeto, execute o conteúdo de `supabase-schema.sql` na raiz do repositório.
   - Isso cria o schema `elite`, a tabela `elite.leads`, índices, trigger e RLS.

2. **Expor o schema na API**
   - **Settings** → **API** → em **Exposed schemas** (ou "Schema"), inclua `elite` além de `public`.
   - Salve. Sem isso, o client não consegue acessar as tabelas do schema `elite`.

3. **Variáveis no app (Vercel / .env.local)**
   - `NEXT_PUBLIC_SUPABASE_URL=https://ftctmseyrqhckutpfdeq.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key do dashboard>`

## Domínio

- **ELITE:** elite.adventurelabs.com.br (configurar no Vercel como domínio do projeto **elite**).

## Resumo

| Item              | Valor                          |
|-------------------|---------------------------------|
| Projeto Supabase  | ftctmseyrqhckutpfdeq           |
| Schema ELITE      | `elite` (isolado do `public`)   |
| Tabela de leads   | `elite.leads`                  |
| URL do app        | elite.adventurelabs.com.br     |
