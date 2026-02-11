# Script para configurar GitHub via CLI (Windows PowerShell)

$ErrorActionPreference = "Stop"

Write-Host "🐙 Configurando GitHub..." -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git não encontrado" -ForegroundColor Red
    exit 1
}

# Verificar se gh CLI está instalado
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  GitHub CLI não encontrado" -ForegroundColor Yellow
    Write-Host "Instale com: winget install --id GitHub.cli" -ForegroundColor Yellow
    Write-Host "Ou baixe em: https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# Verificar login
Write-Host "🔐 Verificando login no GitHub..." -ForegroundColor Blue
try {
    gh auth status | Out-Null
    Write-Host "✅ Logado no GitHub" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Você precisa fazer login no GitHub" -ForegroundColor Yellow
    Write-Host "Execute: gh auth login" -ForegroundColor Yellow
    Write-Host "Depois rode este script novamente" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Verificar se já é um repositório Git
if (-not (Test-Path ".git")) {
    Write-Host "📝 Inicializando repositório Git..." -ForegroundColor Blue
    git init
    git add .
    git commit -m "Initial commit: Loteadora ELITE Landing Page"
    Write-Host "✅ Repositório inicializado" -ForegroundColor Green
    Write-Host ""
}

# Verificar se já tem remote
$hasOrigin = git remote | Select-String -Pattern "origin" -Quiet

if ($hasOrigin) {
    Write-Host "⚠️  Remote 'origin' já existe" -ForegroundColor Yellow
    $replaceRemote = Read-Host "Deseja substituir? (s/n)"
    if ($replaceRemote -eq "s" -or $replaceRemote -eq "S") {
        git remote remove origin
    } else {
        Write-Host "Mantendo remote existente" -ForegroundColor Yellow
        exit 0
    }
}

# Criar repositório no GitHub
$repoName = Read-Host "Nome do repositório (ex: loteadora-elite-landing)"
$repoDescription = Read-Host "Descrição"
$isPrivate = Read-Host "Repositório privado? (s/n)"

if ($isPrivate -eq "s" -or $isPrivate -eq "S") {
    $privateFlag = "--private"
} else {
    $privateFlag = "--public"
}

Write-Host "🚀 Criando repositório no GitHub..." -ForegroundColor Blue
gh repo create $repoName $privateFlag --description $repoDescription --source=. --remote=origin --push

Write-Host "✅ Repositório criado e código enviado!" -ForegroundColor Green
Write-Host ""
Write-Host "URL do repositório:" -ForegroundColor Cyan
gh repo view $repoName --web
