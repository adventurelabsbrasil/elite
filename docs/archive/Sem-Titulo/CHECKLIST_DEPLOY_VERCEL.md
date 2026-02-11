# ✅ Checklist: Deploy no Vercel

Este documento lista **exatamente o que falta** para implantar a landing page no Vercel.

---

## 📋 Status Atual

### ✅ O que JÁ está pronto:
- ✅ Código da landing page completo
- ✅ Estrutura do projeto Next.js 14 configurada
- ✅ Componentes e páginas implementadas
- ✅ Formulário de qualificação funcional
- ✅ Área administrativa implementada
- ✅ Scripts de setup disponíveis
- ✅ Documentação completa

### ❌ O que FALTA fazer:

---

## 🚀 Passos para Deploy no Vercel

### 1️⃣ **Configurar Supabase** (OBRIGATÓRIO)

#### 1.1 Criar Projeto no Supabase
- [ ] Acessar [supabase.com](https://supabase.com) e fazer login
- [ ] Criar um novo projeto
- [ ] Anotar a **URL do projeto** (ex: `https://xxxxx.supabase.co`)
- [ ] Anotar a **Anon Key** (em Settings > API)

#### 1.2 Criar Tabela de Leads
- [ ] Abrir o SQL Editor no Supabase Dashboard
- [ ] Executar o conteúdo do arquivo `supabase-schema.sql`
- [ ] Verificar se a tabela `leads` foi criada

#### 1.3 Criar Usuário Admin
- [ ] Ir em Authentication > Users no Supabase
- [ ] Criar um novo usuário manualmente
- [ ] Definir email e senha para acesso à área admin
- [ ] Anotar as credenciais (serão usadas em `/admin/login`)

---

### 2️⃣ **Configurar Variáveis de Ambiente Localmente**

- [ ] Criar arquivo `.env.local` na raiz do projeto com:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
  ```

**Nota:** O arquivo `.env.local` não será commitado (está no `.gitignore`)

---

### 3️⃣ **Testar Localmente** (RECOMENDADO)

- [ ] Instalar dependências: `npm install`
- [ ] Testar build: `npm run build`
- [ ] Testar servidor local: `npm run dev`
- [ ] Verificar se a landing page carrega em `http://localhost:3000`
- [ ] Testar o formulário de qualificação
- [ ] Testar login na área admin (`/admin/login`)

---

### 4️⃣ **Preparar para Deploy**

#### 4.1 Verificar Build
- [ ] Executar `npm run build` e verificar se não há erros
- [ ] Corrigir quaisquer erros de TypeScript ou build

#### 4.2 Atualizar Link do WhatsApp (se necessário)
- [ ] Verificar o link do grupo VIP em `app/obrigado/page.tsx`
- [ ] Atualizar o número do WhatsApp se necessário

---

### 5️⃣ **Deploy no Vercel**

#### Opção A: Via CLI (Recomendado)

**Pré-requisitos:**
- [ ] Instalar Vercel CLI: `npm install -g vercel`
- [ ] Fazer login: `vercel login`

**Passos:**
- [ ] Na raiz do projeto, executar: `vercel link`
- [ ] Seguir as instruções para linkar o projeto
- [ ] Adicionar variáveis de ambiente:
  ```bash
  vercel env add NEXT_PUBLIC_SUPABASE_URL production
  vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
  vercel env add NEXT_PUBLIC_SUPABASE_URL preview
  vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
  vercel env add NEXT_PUBLIC_SUPABASE_URL development
  vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development
  ```
- [ ] Fazer deploy: `vercel --prod`

**OU usar o script automatizado:**
- [ ] Executar: `npm run setup:vercel` (Windows PowerShell)
- [ ] O script vai guiar você pelo processo

#### Opção B: Via Dashboard Vercel

**Pré-requisitos:**
- [ ] Ter o código no GitHub (repositório criado e código enviado)

**Passos:**
- [ ] Acessar [vercel.com](https://vercel.com) e fazer login
- [ ] Clicar em "Add New Project"
- [ ] Conectar o repositório GitHub
- [ ] Selecionar o repositório `elite` (ou o nome que você deu)
- [ ] Configurar o projeto:
  - Framework Preset: **Next.js** (detectado automaticamente)
  - Root Directory: `.` (raiz)
- [ ] Adicionar variáveis de ambiente:
  - `NEXT_PUBLIC_SUPABASE_URL` = sua URL do Supabase
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua Anon Key do Supabase
- [ ] Clicar em "Deploy"
- [ ] Aguardar o deploy concluir

---

### 6️⃣ **Pós-Deploy**

- [ ] Acessar a URL fornecida pelo Vercel
- [ ] Testar a landing page em produção
- [ ] Testar o formulário de qualificação
- [ ] Verificar se os leads estão sendo salvos no Supabase
- [ ] Testar login na área admin (`/admin/login`)
- [ ] Verificar se o dashboard admin está funcionando

---

## 🔧 Comandos Rápidos

```bash
# 1. Instalar dependências
npm install

# 2. Testar build
npm run build

# 3. Testar localmente
npm run dev

# 4. Setup completo via CLI (Windows)
npm run setup:vercel

# 5. Deploy manual
vercel --prod
```

---

## ⚠️ Problemas Comuns

### Erro: "Environment variables not found"
- **Solução:** Certifique-se de adicionar as variáveis no Vercel Dashboard ou via CLI

### Erro: "Failed to connect to Supabase"
- **Solução:** Verifique se a URL e a Anon Key estão corretas

### Erro: "Table 'leads' does not exist"
- **Solução:** Execute o SQL em `supabase-schema.sql` no Supabase Dashboard

### Build falha no Vercel
- **Solução:** Verifique os logs do build no Vercel Dashboard para identificar o erro específico

---

## 📝 Resumo: O que é OBRIGATÓRIO

1. ✅ **Supabase configurado** (projeto criado, tabela criada, usuário admin criado)
2. ✅ **Variáveis de ambiente configuradas** (no Vercel)
3. ✅ **Build funcionando** (`npm run build` sem erros)
4. ✅ **Código no GitHub** (se usar Dashboard) ou **Vercel CLI instalado** (se usar CLI)

---

## 🎯 Próximos Passos Imediatos

1. **Se ainda não tem Supabase:**
   - Criar projeto no Supabase
   - Executar `supabase-schema.sql`
   - Criar usuário admin

2. **Se já tem Supabase:**
   - Verificar se as variáveis estão corretas
   - Fazer deploy no Vercel
   - Testar em produção

---

## 📚 Documentação de Referência

- [CLI_SETUP.md](CLI_SETUP.md) - Guia completo de setup via CLI
- [SETUP.md](SETUP.md) - Guia de setup geral
- [README.md](README.md) - Documentação do projeto

---

**Última atualização:** Baseado na análise do projeto em `elite/`
