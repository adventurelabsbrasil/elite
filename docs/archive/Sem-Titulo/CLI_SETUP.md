# 🚀 Setup Completo via CLI

Guia completo para configurar Supabase, GitHub e Vercel via linha de comando.

## 📋 Pré-requisitos

### Instalar Ferramentas Necessárias

#### 1. Node.js e npm
```bash
# Verificar se já está instalado
node --version
npm --version

# Se não estiver, baixe em: https://nodejs.org/
```

#### 2. Git
```bash
# Verificar
git --version

# Se não estiver, baixe em: https://git-scm.com/
```

#### 3. Supabase CLI
```bash
npm install -g supabase
```

#### 4. Vercel CLI
```bash
npm install -g vercel
```

#### 5. GitHub CLI
```bash
# Windows
winget install --id GitHub.cli

# macOS
brew install gh

# Linux
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

---

## 🎯 Setup Rápido (Tudo de Uma Vez)

### Linux/macOS
```bash
# Dar permissão de execução
chmod +x scripts/*.sh

# Executar setup completo
npm run setup:all
```

### Windows (PowerShell)
```powershell
# Executar script PowerShell
.\scripts\setup.ps1

# Depois executar cada passo individualmente
npm run setup:supabase
npm run setup:github
npm run setup:vercel
```

---

## 📝 Setup Passo a Passo

### 1️⃣ Setup Básico do Projeto

```bash
# Instalar dependências
npm install

# Verificar se tudo está OK
npm run dev
```

### 2️⃣ Configurar Supabase

```bash
# Login no Supabase
supabase login

# Executar script de setup
npm run setup:supabase

# OU manualmente:
# 1. Criar projeto
supabase projects create loteadora-elite --region us-east-1

# 2. Obter credenciais
supabase projects api-keys --project-ref SEU_PROJECT_REF

# 3. Atualizar .env.local
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# 4. Criar tabela
supabase db push --project-ref SEU_PROJECT_REF --file supabase-schema.sql

# 5. Criar usuário admin
supabase auth users create --project-ref SEU_PROJECT_REF --email admin@exemplo.com --password senha123
```

### 3️⃣ Configurar GitHub

```bash
# Login no GitHub
gh auth login

# Executar script de setup
npm run setup:github

# OU manualmente:
# 1. Inicializar Git (se não fez)
git init
git add .
git commit -m "Initial commit"

# 2. Criar repositório
gh repo create loteadora-elite-landing --public --source=. --remote=origin --push
```

### 4️⃣ Configurar Vercel

```bash
# Login no Vercel
vercel login

# Executar script de setup
npm run setup:vercel

# OU manualmente:
# 1. Linkar projeto
vercel link

# 2. Adicionar variáveis de ambiente
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# 3. Deploy
vercel --prod
```

---

## 🔧 Comandos Úteis

### Supabase
```bash
# Listar projetos
supabase projects list

# Ver status do projeto
supabase status --project-ref SEU_PROJECT_REF

# Executar SQL
supabase db push --project-ref SEU_PROJECT_REF --file arquivo.sql

# Ver logs
supabase logs --project-ref SEU_PROJECT_REF
```

### GitHub
```bash
# Ver status
gh auth status

# Listar repositórios
gh repo list

# Ver repositório
gh repo view

# Criar issue
gh issue create --title "Título" --body "Descrição"
```

### Vercel
```bash
# Ver projetos
vercel ls

# Ver variáveis de ambiente
vercel env ls

# Deploy preview
vercel

# Deploy produção
vercel --prod

# Ver logs
vercel logs
```

---

## 🐛 Troubleshooting

### Erro: "Command not found"
- Verifique se instalou a ferramenta globalmente
- No Windows, pode precisar reiniciar o terminal

### Erro: "Not logged in"
- Execute o comando de login da ferramenta
- Verifique com `whoami` ou `auth status`

### Erro: "Permission denied" (Linux/macOS)
- Dê permissão: `chmod +x scripts/*.sh`

### Erro: "Script execution disabled" (Windows)
- Execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

---

## ✅ Checklist Final

- [ ] Node.js e npm instalados
- [ ] Git instalado e configurado
- [ ] Supabase CLI instalado e logado
- [ ] GitHub CLI instalado e logado
- [ ] Vercel CLI instalado e logado
- [ ] Dependências do projeto instaladas (`npm install`)
- [ ] Supabase configurado (projeto criado, tabela criada, .env.local atualizado)
- [ ] GitHub configurado (repositório criado, código enviado)
- [ ] Vercel configurado (projeto linkado, variáveis adicionadas, deploy feito)
- [ ] Landing page funcionando em produção

---

## 🎉 Pronto!

Sua landing page está configurada e no ar! 🚀
