#!/bin/bash

# Script para configurar Supabase via CLI

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🗄️  Configurando Supabase...${NC}"
echo ""

# Verificar se Supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI não encontrado${NC}"
    echo "Instale com: npm install -g supabase"
    exit 1
fi

# Verificar se está logado
echo -e "${BLUE}🔐 Verificando login no Supabase...${NC}"
if ! supabase projects list &> /dev/null; then
    echo -e "${YELLOW}⚠️  Você precisa fazer login no Supabase${NC}"
    echo "Execute: supabase login"
    echo "Depois rode este script novamente"
    exit 1
fi

echo -e "${GREEN}✅ Logado no Supabase${NC}"
echo ""

# Listar projetos existentes
echo -e "${BLUE}📋 Projetos existentes:${NC}"
supabase projects list
echo ""

# Perguntar se quer criar novo projeto ou usar existente
read -p "Deseja criar um novo projeto? (s/n): " create_new

if [ "$create_new" = "s" ] || [ "$create_new" = "S" ]; then
    read -p "Nome do projeto (ex: loteadora-elite): " project_name
    read -p "Região (ex: us-east-1): " region
    read -p "Senha do banco de dados: " db_password
    
    echo -e "${BLUE}🚀 Criando projeto no Supabase...${NC}"
    supabase projects create "$project_name" --org-id $(supabase orgs list --format json | jq -r '.[0].id') --region "$region" --db-password "$db_password"
    
    echo -e "${GREEN}✅ Projeto criado!${NC}"
    echo ""
    echo "Aguardando projeto ficar pronto..."
    sleep 10
fi

# Listar projetos novamente para selecionar
echo -e "${BLUE}📋 Selecione o projeto:${NC}"
supabase projects list

read -p "ID do projeto (ref): " project_ref

# Obter credenciais do projeto
echo -e "${BLUE}🔑 Obtendo credenciais do projeto...${NC}"
PROJECT_URL=$(supabase projects api-keys --project-ref "$project_ref" | grep "anon" | awk '{print $NF}')
ANON_KEY=$(supabase projects api-keys --project-ref "$project_ref" | grep "anon" -A 1 | tail -1 | awk '{print $NF}')

# Atualizar .env.local
echo -e "${BLUE}📝 Atualizando .env.local...${NC}"
cat > .env.local << EOF
# Supabase
NEXT_PUBLIC_SUPABASE_URL=$PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
EOF

echo -e "${GREEN}✅ .env.local atualizado${NC}"
echo ""

# Executar SQL schema
echo -e "${BLUE}📊 Criando tabela de leads...${NC}"
supabase db push --project-ref "$project_ref" --file supabase-schema.sql

echo -e "${GREEN}✅ Tabela criada!${NC}"
echo ""

# Criar usuário admin
echo -e "${BLUE}👤 Criando usuário admin...${NC}"
read -p "Email do admin: " admin_email
read -sp "Senha do admin: " admin_password
echo ""

supabase auth users create --project-ref "$project_ref" --email "$admin_email" --password "$admin_password"

echo -e "${GREEN}✅ Usuário admin criado!${NC}"
echo ""
echo -e "${GREEN}✅ Supabase configurado com sucesso!${NC}"
echo ""
echo "Credenciais salvas em .env.local"
echo "Projeto ID: $project_ref"
