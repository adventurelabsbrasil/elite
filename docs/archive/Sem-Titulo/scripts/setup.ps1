# Script de Setup Completo - Loteadora ELITE (PowerShell)
# Configura Supabase, GitHub e Vercel via CLI

Write-Host "🚀 Setup Completo - Loteadora ELITE Landing Page" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar dependências
Write-Host "📦 Verificando dependências..." -ForegroundColor Blue
$deps = @("node", "npm", "git")
foreach ($dep in $deps) {
    if (-not (Get-Command $dep -ErrorAction SilentlyContinue)) {
        Write-Host "❌ $dep não encontrado. Instale primeiro." -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Dependências OK" -ForegroundColor Green
Write-Host ""

# 2. Instalar dependências do projeto
Write-Host "📦 Instalando dependências do projeto..." -ForegroundColor Blue
npm install
Write-Host "✅ Dependências instaladas" -ForegroundColor Green
Write-Host ""

# 3. Verificar Supabase CLI
Write-Host "🔍 Verificando Supabase CLI..." -ForegroundColor Blue
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Supabase CLI não encontrado" -ForegroundColor Yellow
    Write-Host "Instalando Supabase CLI..."
    npm install -g supabase
} else {
    Write-Host "✅ Supabase CLI encontrado" -ForegroundColor Green
}
Write-Host ""

# 4. Verificar Vercel CLI
Write-Host "🔍 Verificando Vercel CLI..." -ForegroundColor Blue
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Vercel CLI não encontrado" -ForegroundColor Yellow
    Write-Host "Instalando Vercel CLI..."
    npm install -g vercel
} else {
    Write-Host "✅ Vercel CLI encontrado" -ForegroundColor Green
}
Write-Host ""

# 5. Verificar GitHub CLI
Write-Host "🔍 Verificando GitHub CLI..." -ForegroundColor Blue
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  GitHub CLI não encontrado" -ForegroundColor Yellow
    Write-Host "Instale com: winget install --id GitHub.cli"
} else {
    Write-Host "✅ GitHub CLI encontrado" -ForegroundColor Green
}
Write-Host ""

# 6. Inicializar Git (se não existir)
if (-not (Test-Path ".git")) {
    Write-Host "📝 Inicializando repositório Git..." -ForegroundColor Blue
    git init
    git add .
    git commit -m "Initial commit: Loteadora ELITE Landing Page"
    Write-Host "✅ Git inicializado" -ForegroundColor Green
    Write-Host ""
}

Write-Host "✅ Setup básico concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Execute: npm run setup:supabase"
Write-Host "2. Execute: npm run setup:github"
Write-Host "3. Execute: npm run setup:vercel"
Write-Host ""
