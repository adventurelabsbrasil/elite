# Script de Setup Completo - Loteadora ELITE (Windows PowerShell)
# Configura Supabase, GitHub e Vercel via CLI

$ErrorActionPreference = "Stop"

Write-Host "🚀 Setup Completo - Loteadora ELITE Landing Page" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar dependências básicas
Write-Host "📦 Verificando dependências básicas..." -ForegroundColor Blue
$deps = @("node", "npm", "git")
foreach ($dep in $deps) {
    if (-not (Get-Command $dep -ErrorAction SilentlyContinue)) {
        Write-Host "❌ $dep não encontrado. Instale primeiro." -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Dependências básicas OK" -ForegroundColor Green
Write-Host ""

# 2. Instalar dependências do projeto
Write-Host "📦 Instalando dependências do projeto..." -ForegroundColor Blue
npm install
Write-Host "✅ Dependências instaladas" -ForegroundColor Green
Write-Host ""

# 3. Verificar e instalar Supabase CLI
Write-Host "🔍 Verificando Supabase CLI..." -ForegroundColor Blue
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Supabase CLI não encontrado" -ForegroundColor Yellow
    Write-Host "Instalando Supabase CLI..." -ForegroundColor Yellow
    npm install -g supabase
    Write-Host "✅ Supabase CLI instalado" -ForegroundColor Green
} else {
    Write-Host "✅ Supabase CLI encontrado" -ForegroundColor Green
}
Write-Host ""

# 4. Verificar e instalar Vercel CLI
Write-Host "🔍 Verificando Vercel CLI..." -ForegroundColor Blue
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Vercel CLI não encontrado" -ForegroundColor Yellow
    Write-Host "Instalando Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✅ Vercel CLI instalado" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI encontrado" -ForegroundColor Green
}
Write-Host ""

# 5. Verificar GitHub CLI
Write-Host "🔍 Verificando GitHub CLI..." -ForegroundColor Blue
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  GitHub CLI não encontrado" -ForegroundColor Yellow
    Write-Host "Instale com: winget install --id GitHub.cli" -ForegroundColor Yellow
    Write-Host "Ou baixe em: https://cli.github.com/" -ForegroundColor Yellow
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

# 7. Criar .env.local se não existir
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Criando .env.local..." -ForegroundColor Blue
    @"
# Supabase (configure depois)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
"@ | Out-File -FilePath ".env.local" -Encoding utf8
    Write-Host "✅ .env.local criado" -ForegroundColor Green
    Write-Host ""
}

Write-Host "✅ Setup básico concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Execute: .\scripts\setup-supabase.ps1" -ForegroundColor Yellow
Write-Host "2. Execute: .\scripts\setup-github.ps1" -ForegroundColor Yellow
Write-Host "3. Execute: .\scripts\setup-vercel.ps1" -ForegroundColor Yellow
Write-Host ""
