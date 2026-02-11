# 🪟 Setup no Windows (PowerShell)

Guia completo para configurar tudo via CLI no Windows PowerShell.

## 🚀 Setup Rápido

### 1. Executar Setup Inicial

```powershell
# Permitir execução de scripts (só precisa fazer uma vez)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Executar setup básico
npm run setup:windows
```

### 2. Configurar Supabase

```powershell
# Login no Supabase (primeira vez)
supabase login

# Executar setup do Supabase
npm run setup:supabase
```

### 3. Configurar GitHub

```powershell
# Login no GitHub (primeira vez)
gh auth login

# Executar setup do GitHub
npm run setup:github
```

### 4. Configurar Vercel

```powershell
# Login no Vercel (primeira vez)
vercel login

# Executar setup do Vercel
npm run setup:vercel
```

---

## 📦 Instalar Ferramentas (Se Necessário)

### Node.js e npm
```powershell
# Verificar se já está instalado
node --version
npm --version

# Se não estiver, baixe em: https://nodejs.org/
```

### Git
```powershell
# Verificar
git --version

# Se não estiver, baixe em: https://git-scm.com/
```

### Supabase CLI
```powershell
npm install -g supabase
```

### Vercel CLI
```powershell
npm install -g vercel
```

### GitHub CLI
```powershell
# Via winget (recomendado)
winget install --id GitHub.cli

# Ou baixe em: https://cli.github.com/
```

---

## 🔧 Comandos Manuais (Alternativa aos Scripts)

### Supabase

```powershell
# 1. Login
supabase login

# 2. Listar projetos
supabase projects list

# 3. Criar projeto
supabase projects create loteadora-elite --region us-east-1

# 4. Obter credenciais
supabase projects api-keys --project-ref SEU_PROJECT_REF

# 5. Atualizar .env.local manualmente com as credenciais

# 6. Criar tabela (via Dashboard ou SQL Editor)
# Execute o conteúdo de supabase-schema.sql

# 7. Criar usuário admin
supabase auth users create --project-ref SEU_PROJECT_REF --email admin@exemplo.com --password senha123
```

### GitHub

```powershell
# 1. Login
gh auth login

# 2. Inicializar Git (se não fez)
git init
git add .
git commit -m "Initial commit"

# 3. Criar repositório
gh repo create loteadora-elite-landing --public --source=. --remote=origin --push
```

### Vercel

```powershell
# 1. Login
vercel login

# 2. Linkar projeto
vercel link

# 3. Adicionar variáveis de ambiente
echo "sua-url" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "sua-key" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# 4. Deploy
vercel --prod
```

---

## ⚠️ Problemas Comuns no Windows

### Erro: "Execution Policy"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Erro: "Command not found"
- Reinicie o terminal após instalar ferramentas
- Verifique se está no PATH: `$env:PATH`

### Erro: "Scripts não executam"
- Use: `powershell -ExecutionPolicy Bypass -File script.ps1`
- Ou configure a política de execução (comando acima)

### Erro: "chmod não reconhecido"
- `chmod` é comando Unix/Linux
- No Windows, scripts .ps1 não precisam de chmod
- Use os scripts PowerShell (.ps1) ao invés dos .sh

---

## ✅ Checklist

- [ ] Node.js e npm instalados
- [ ] Git instalado e configurado
- [ ] Supabase CLI instalado (`npm install -g supabase`)
- [ ] Vercel CLI instalado (`npm install -g vercel`)
- [ ] GitHub CLI instalado (`winget install --id GitHub.cli`)
- [ ] Política de execução configurada
- [ ] Dependências do projeto instaladas (`npm install`)
- [ ] Supabase configurado (login, projeto, tabela, .env.local)
- [ ] GitHub configurado (login, repositório criado)
- [ ] Vercel configurado (login, projeto linkado, deploy)

---

## 🎯 Ordem Recomendada

1. **Setup Básico**: `npm run setup:windows`
2. **Supabase**: `npm run setup:supabase`
3. **GitHub**: `npm run setup:github`
4. **Vercel**: `npm run setup:vercel`

---

## 🆘 Ajuda

Se encontrar problemas:
1. Verifique se todas as ferramentas estão instaladas
2. Verifique se está logado em cada serviço
3. Reinicie o terminal PowerShell
4. Execute os comandos manualmente se os scripts falharem
