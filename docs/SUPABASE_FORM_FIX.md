# Correção do erro ao enviar o formulário (42501 / 401)

Se o formulário exibe **"Erro ao enviar. Tente novamente ou envie um email para contato@adventurelabs.com.br."** e no console aparece:

- **42501 permission denied for schema elite**  
- **401 (Unauthorized)** na chamada a `supabase.co/rest/v1/leads`

siga os passos abaixo no **Supabase Dashboard**.

---

## 1. Exposed schemas

1. Vá em **Settings** → **API**.
2. Em **Exposed schemas**, inclua **`elite`** (além de `public` se existir).
3. Salve.

Assim a API REST consegue acessar o schema `elite`.

---

## 2. Permissões no schema e na tabela (corrige 42501)

O erro **42501 permission denied for schema elite** ocorre quando a role `anon` (usada pelo site) não tem permissão para usar o schema nem para inserir na tabela.

No **SQL Editor** do Supabase, execute:

```sql
-- Permissões para o schema elite (anon = visitantes do site)
GRANT USAGE ON SCHEMA elite TO anon, authenticated;
GRANT INSERT ON elite.leads TO anon, authenticated;
GRANT SELECT ON elite.leads TO authenticated;
```

- **anon**: usado pelo formulário (visitante não logado). Precisa de `USAGE` no schema e `INSERT` em `elite.leads`.
- **authenticated**: usado pelo admin/dashboard. Precisa de `SELECT` em `elite.leads`.

Se você já rodou o `supabase-schema.sql` completo (com as linhas de `GRANT` que foram adicionadas), essas permissões já devem estar aplicadas. Se o schema foi criado antes, rode apenas os `GRANT` acima.

---

## 3. 401 Unauthorized

- **URL e chave**: confira que o site usa a **URL** e a **anon (public) key** do projeto correto em **Settings** → **API** (e no `.env.local` ou nas variáveis de ambiente do Vercel).
- **RLS**: a policy `elite_leads_insert_anon` deve estar ativa em **Authentication** → **Policies** para a tabela `elite.leads`, permitindo `INSERT` para `anon` e `authenticated`.

---

## 4. 404

Se aparecer **404** em alguma requisição, verifique se a URL está correta (por exemplo `.../rest/v1/leads` com o schema `elite` configurado no client). O client deste projeto usa `.schema('elite').from('leads')`, então a chamada deve ir para o schema `elite`; com **Exposed schemas** incluindo `elite` e os `GRANT` acima, o 404 costuma ser resolvido.

---

## Resumo

| Problema | Solução |
|----------|---------|
| 42501 permission denied for schema elite | `GRANT USAGE ON SCHEMA elite TO anon, authenticated;` e `GRANT INSERT ON elite.leads TO anon, authenticated;` |
| 401 Unauthorized | Conferir anon key, URL do projeto e RLS (policy de INSERT para anon) |
| Exposed schemas | Incluir `elite` em Settings → API → Exposed schemas |

Depois das alterações, teste de novo o envio pelo formulário (popup).
