#!/bin/bash

# Script para configurar GitHub via CLI

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🐙 Configurando GitHub...${NC}"
echo ""

# Verificar se Git está instalado
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git não encontrado${NC}"
    exit 1
fi

# Verificar se gh CLI está instalado
if ! command -v gh &> /dev/null; then
    echo -e "${YELLOW}⚠️  GitHub CLI não encontrado${NC}"
    echo "Instalando GitHub CLI..."
    
    # Detectar OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
        sudo apt update
        sudo apt install gh
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install gh
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        # Windows
        winget install --id GitHub.cli
    fi
fi

# Verificar login
echo -e "${BLUE}🔐 Verificando login no GitHub...${NC}"
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}⚠️  Você precisa fazer login no GitHub${NC}"
    echo "Execute: gh auth login"
    echo "Depois rode este script novamente"
    exit 1
fi

echo -e "${GREEN}✅ Logado no GitHub${NC}"
echo ""

# Verificar se já é um repositório Git
if [ ! -d ".git" ]; then
    echo -e "${BLUE}📝 Inicializando repositório Git...${NC}"
    git init
    git add .
    git commit -m "Initial commit: Loteadora ELITE Landing Page"
    echo -e "${GREEN}✅ Repositório inicializado${NC}"
    echo ""
fi

# Verificar se já tem remote
if git remote | grep -q "origin"; then
    echo -e "${YELLOW}⚠️  Remote 'origin' já existe${NC}"
    read -p "Deseja substituir? (s/n): " replace_remote
    if [ "$replace_remote" = "s" ] || [ "$replace_remote" = "S" ]; then
        git remote remove origin
    else
        echo "Mantendo remote existente"
        exit 0
    fi
fi

# Criar repositório no GitHub
read -p "Nome do repositório (ex: loteadora-elite-landing): " repo_name
read -p "Descrição: " repo_description
read -p "Repositório privado? (s/n): " is_private

if [ "$is_private" = "s" ] || [ "$is_private" = "S" ]; then
    PRIVATE_FLAG="--private"
else
    PRIVATE_FLAG="--public"
fi

echo -e "${BLUE}🚀 Criando repositório no GitHub...${NC}"
gh repo create "$repo_name" $PRIVATE_FLAG --description "$repo_description" --source=. --remote=origin --push

echo -e "${GREEN}✅ Repositório criado e código enviado!${NC}"
echo ""
echo "URL do repositório:"
gh repo view "$repo_name" --web
