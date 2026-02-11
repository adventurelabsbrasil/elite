# Acesso à área admin e login com Google

Se você não consegue entrar na área admin ou o login com Google redireciona para localhost, siga este checklist.

---

## 1. Variável em produção (Vercel)

No projeto na **Vercel** → Settings → Environment Variables, adicione:

| Nome | Valor | Observação |
|------|--------|------------|
| `NEXT_PUBLIC_APP_URL` | `https://elite.adventurelabs.com.br` | Use a URL real do seu site. Sem isso, o OAuth pode usar localhost como destino. |

Depois, faça um novo deploy para a variável ser aplicada.

---

## 2. Supabase: URL Configuration

No **Supabase Dashboard** → **Authentication** → **URL Configuration**:

- **Site URL:** coloque a URL de **produção** do seu site (ex.: `https://elite.adventurelabs.com.br`).  
  Se estiver `http://localhost:3000`, o Supabase pode redirecionar para localhost após o login com Google.

- **Redirect URLs:** adicione (uma por linha):
  - `https://elite.adventurelabs.com.br/auth/callback`
  - `http://localhost:3000/auth/callback`

Salve as alterações.

---

## 3. Supabase: provedor Google

Em **Authentication** → **Providers** → **Google**:

- Ative o provedor.
- Preencha **Client ID** e **Client Secret** (credenciais OAuth 2.0 do Google Cloud Console, tipo “Aplicativo da Web”).
- No Google Cloud Console, em “URIs de redirecionamento autorizados”, inclua:  
  `https://<ID-DO-SEU-PROJETO>.supabase.co/auth/v1/callback`  
  (o ID do projeto está em Supabase → Settings → General.)

---

## 4. Como acessar o admin

- **URL:** `https://elite.adventurelabs.com.br/admin/login` (ou `/login`, que redireciona para essa página).
- **Login:** use **Entrar com Google** ou email/senha (usuário criado em Supabase → Authentication → Users).
- Após o login, você é redirecionado para `/admin` (dashboard de leads).

---

## Resumo rápido

1. Vercel: definir `NEXT_PUBLIC_APP_URL` e fazer redeploy.
2. Supabase: **Site URL** = URL de produção; **Redirect URLs** com `/auth/callback` de produção e de localhost.
3. Supabase: Google ativo e credenciais corretas; no Google, redirect URI do Supabase configurado.
