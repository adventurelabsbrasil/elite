#!/bin/bash

# Script para configurar Vercel via CLI

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}▲ Configurando Vercel...${NC}"
echo ""

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI não encontrado${NC}"
    echo "Instalando Vercel CLI..."
    npm install -g vercel
fi

# Verificar login
echo -e "${BLUE}🔐 Verificando login no Vercel...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Você precisa fazer login no Vercel${NC}"
    echo "Execute: vercel login"
    echo "Depois rode este script novamente"
    exit 1
fi

echo -e "${GREEN}✅ Logado no Vercel${NC}"
echo ""

# Verificar se .env.local existe e tem variáveis
if [ -f ".env.local" ]; then
    echo -e "${BLUE}📝 Variáveis de ambiente encontradas${NC}"
    
    # Ler variáveis do .env.local
    SUPABASE_URL=$(grep NEXT_PUBLIC_SUPABASE_URL .env.local | cut -d '=' -f2)
    SUPABASE_KEY=$(grep NEXT_PUBLIC_SUPABASE_ANON_KEY .env.local | cut -d '=' -f2)
    
    if [ -n "$SUPABASE_URL" ] && [ -n "$SUPABASE_KEY" ]; then
        echo -e "${GREEN}✅ Variáveis do Supabase encontradas${NC}"
    else
        echo -e "${YELLOW}⚠️  Variáveis do Supabase não encontradas${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  .env.local não encontrado${NC}"
fi

echo ""

# Fazer deploy
read -p "Deseja fazer deploy agora? (s/n): " deploy_now

if [ "$deploy_now" = "s" ] || [ "$deploy_now" = "S" ]; then
    echo -e "${BLUE}🚀 Fazendo deploy...${NC}"
    
    # Link do projeto (se já existir)
    if [ -f ".vercel/project.json" ]; then
        echo "Projeto Vercel já linkado"
        vercel --prod
    else
        echo "Linkando projeto..."
        vercel link
        
        # Adicionar variáveis de ambiente
        if [ -n "$SUPABASE_URL" ] && [ -n "$SUPABASE_KEY" ]; then
            echo -e "${BLUE}🔑 Adicionando variáveis de ambiente...${NC}"
            vercel env add NEXT_PUBLIC_SUPABASE_URL production <<< "$SUPABASE_URL"
            vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production <<< "$SUPABASE_KEY"
            vercel env add NEXT_PUBLIC_SUPABASE_URL preview <<< "$SUPABASE_URL"
            vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview <<< "$SUPABASE_KEY"
            vercel env add NEXT_PUBLIC_SUPABASE_URL development <<< "$SUPABASE_URL"
            vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development <<< "$SUPABASE_KEY"
            echo -e "${GREEN}✅ Variáveis adicionadas${NC}"
        fi
        
        # Deploy
        vercel --prod
    fi
    
    echo -e "${GREEN}✅ Deploy concluído!${NC}"
    echo ""
    echo "Sua aplicação está no ar!"
    vercel ls
else
    echo -e "${BLUE}📝 Para fazer deploy depois, execute:${NC}"
    echo "  vercel"
    echo "  vercel --prod"
fi
