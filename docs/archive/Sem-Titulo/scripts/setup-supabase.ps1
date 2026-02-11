# Script para configurar Supabase via CLI (Windows PowerShell)

$ErrorActionPreference = "Stop"

Write-Host "🗄️  Configurando Supabase..." -ForegroundColor Cyan
Write-Host ""

# Verificar se Supabase CLI está instalado
if (-not (Get-Command supabase -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Supabase CLI não encontrado" -ForegroundColor Red
    Write-Host "Instale com: npm install -g supabase" -ForegroundColor Yellow
    exit 1
}

# Verificar se está logado
Write-Host "🔐 Verificando login no Supabase..." -ForegroundColor Blue
try {
    supabase projects list | Out-Null
    Write-Host "✅ Logado no Supabase" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Você precisa fazer login no Supabase" -ForegroundColor Yellow
    Write-Host "Execute: supabase login" -ForegroundColor Yellow
    Write-Host "Depois rode este script novamente" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Listar projetos existentes
Write-Host "📋 Projetos existentes:" -ForegroundColor Blue
supabase projects list
Write-Host ""

# Perguntar se quer criar novo projeto ou usar existente
$createNew = Read-Host "Deseja criar um novo projeto? (s/n)"

if ($createNew -eq "s" -or $createNew -eq "S") {
    $projectName = Read-Host "Nome do projeto (ex: loteadora-elite)"
    $region = Read-Host "Região (ex: us-east-1)"
    $dbPassword = Read-Host "Senha do banco de dados" -AsSecureString
    $dbPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
        [Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword)
    )
    
    Write-Host "🚀 Criando projeto no Supabase..." -ForegroundColor Blue
    
    # Obter org ID
    $orgs = supabase orgs list --format json | ConvertFrom-Json
    $orgId = $orgs[0].id
    
    supabase projects create $projectName --org-id $orgId --region $region --db-password $dbPasswordPlain
    
    Write-Host "✅ Projeto criado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Aguardando projeto ficar pronto..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
}

# Listar projetos novamente para selecionar
Write-Host "📋 Selecione o projeto:" -ForegroundColor Blue
supabase projects list
Write-Host ""

$projectRef = Read-Host "ID do projeto (ref)"

# Obter credenciais do projeto
Write-Host "🔑 Obtendo credenciais do projeto..." -ForegroundColor Blue
$apiKeys = supabase projects api-keys --project-ref $projectRef

# Extrair URL e Key (formato pode variar)
$projectUrl = ""
$anonKey = ""

# Tentar diferentes formatos de saída
if ($apiKeys -match "anon.*(https://[^\s]+)") {
    $projectUrl = $matches[1]
}
if ($apiKeys -match "anon.*\s+([a-zA-Z0-9_-]+)") {
    $anonKey = $matches[1]
}

# Se não encontrou, pedir manualmente
if (-not $projectUrl) {
    $projectUrl = Read-Host "URL do projeto (ex: https://xxxxx.supabase.co)"
}
if (-not $anonKey) {
    $anonKey = Read-Host "Anon Key do projeto"
}

# Atualizar .env.local
Write-Host "📝 Atualizando .env.local..." -ForegroundColor Blue
@"
# Supabase
NEXT_PUBLIC_SUPABASE_URL=$projectUrl
NEXT_PUBLIC_SUPABASE_ANON_KEY=$anonKey
"@ | Out-File -FilePath ".env.local" -Encoding utf8

Write-Host "✅ .env.local atualizado" -ForegroundColor Green
Write-Host ""

# Executar SQL schema
Write-Host "📊 Criando tabela de leads..." -ForegroundColor Blue
if (Test-Path "supabase-schema.sql") {
    # No Windows, precisamos usar outro método
    Write-Host "⚠️  Execute o SQL manualmente no Supabase Dashboard" -ForegroundColor Yellow
    Write-Host "Arquivo: supabase-schema.sql" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  Arquivo supabase-schema.sql não encontrado" -ForegroundColor Yellow
}
Write-Host ""

# Criar usuário admin
Write-Host "👤 Criando usuário admin..." -ForegroundColor Blue
$adminEmail = Read-Host "Email do admin"
$adminPassword = Read-Host "Senha do admin" -AsSecureString
$adminPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($adminPassword)
)

try {
    supabase auth users create --project-ref $projectRef --email $adminEmail --password $adminPasswordPlain
    Write-Host "✅ Usuário admin criado!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Erro ao criar usuário. Crie manualmente no Dashboard." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Supabase configurado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Credenciais salvas em .env.local" -ForegroundColor Cyan
Write-Host "Projeto ID: $projectRef" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANTE: Execute o SQL em supabase-schema.sql no Dashboard do Supabase" -ForegroundColor Yellow
