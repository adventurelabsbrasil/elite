#!/bin/bash

# Script de Setup Completo - Loteadora ELITE
# Configura Supabase, GitHub e Vercel via CLI

set -e

echo "🚀 Setup Completo - Loteadora ELITE Landing Page"
echo "================================================"
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar dependências
echo -e "${BLUE}📦 Verificando dependências...${NC}"
command -v node >/dev/null 2>&1 || { echo "❌ Node.js não encontrado. Instale primeiro."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm não encontrado. Instale primeiro."; exit 1; }
command -v git >/dev/null 2>&1 || { echo "❌ Git não encontrado. Instale primeiro."; exit 1; }
echo -e "${GREEN}✅ Dependências OK${NC}"
echo ""

# 2. Instalar dependências do projeto
echo -e "${BLUE}📦 Instalando dependências do projeto...${NC}"
npm install
echo -e "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# 3. Verificar Supabase CLI
echo -e "${BLUE}🔍 Verificando Supabase CLI...${NC}"
if ! command -v supabase &> /dev/null; then
    echo -e "${YELLOW}⚠️  Supabase CLI não encontrado${NC}"
    echo "Instalando Supabase CLI..."
    npm install -g supabase
else
    echo -e "${GREEN}✅ Supabase CLI encontrado${NC}"
fi
echo ""

# 4. Verificar Vercel CLI
echo -e "${BLUE}🔍 Verificando Vercel CLI...${NC}"
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI não encontrado${NC}"
    echo "Instalando Vercel CLI..."
    npm install -g vercel
else
    echo -e "${GREEN}✅ Vercel CLI encontrado${NC}"
fi
echo ""

# 5. Inicializar Git (se não existir)
if [ ! -d ".git" ]; then
    echo -e "${BLUE}📝 Inicializando repositório Git...${NC}"
    git init
    git add .
    git commit -m "Initial commit: Loteadora ELITE Landing Page"
    echo -e "${GREEN}✅ Git inicializado${NC}"
    echo ""
fi

echo -e "${GREEN}✅ Setup básico concluído!${NC}"
echo ""
echo "Próximos passos:"
echo "1. Execute: npm run setup:supabase"
echo "2. Execute: npm run setup:github"
echo "3. Execute: npm run setup:vercel"
echo ""
