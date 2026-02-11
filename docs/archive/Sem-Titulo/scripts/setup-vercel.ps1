# Script para configurar Vercel via CLI (Windows PowerShell)

$ErrorActionPreference = "Stop"

Write-Host "▲ Configurando Vercel..." -ForegroundColor Cyan
Write-Host ""

# Verificar se Vercel CLI está instalado
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI não encontrado" -ForegroundColor Red
    Write-Host "Instale com: npm install -g vercel" -ForegroundColor Yellow
    exit 1
}

# Verificar login
Write-Host "🔐 Verificando login no Vercel..." -ForegroundColor Blue
try {
    vercel whoami | Out-Null
    Write-Host "✅ Logado no Vercel" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Você precisa fazer login no Vercel" -ForegroundColor Yellow
    Write-Host "Execute: vercel login" -ForegroundColor Yellow
    Write-Host "Depois rode este script novamente" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Verificar se .env.local existe e tem variáveis
$supabaseUrl = ""
$supabaseKey = ""

if (Test-Path ".env.local") {
    Write-Host "📝 Variáveis de ambiente encontradas" -ForegroundColor Blue
    
    $envContent = Get-Content ".env.local"
    foreach ($line in $envContent) {
        if ($line -match "NEXT_PUBLIC_SUPABASE_URL=(.+)") {
            $supabaseUrl = $matches[1].Trim()
        }
        if ($line -match "NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)") {
            $supabaseKey = $matches[1].Trim()
        }
    }
    
    if ($supabaseUrl -and $supabaseKey) {
        Write-Host "✅ Variáveis do Supabase encontradas" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Variáveis do Supabase não encontradas" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  .env.local não encontrado" -ForegroundColor Yellow
}
Write-Host ""

# Fazer deploy
$deployNow = Read-Host "Deseja fazer deploy agora? (s/n)"

if ($deployNow -eq "s" -or $deployNow -eq "S") {
    Write-Host "🚀 Fazendo deploy..." -ForegroundColor Blue
    
    # Link do projeto (se já existir)
    if (Test-Path ".vercel/project.json") {
        Write-Host "Projeto Vercel já linkado" -ForegroundColor Yellow
        vercel --prod
    } else {
        Write-Host "Linkando projeto..." -ForegroundColor Blue
        vercel link
        
        # Adicionar variáveis de ambiente
        if ($supabaseUrl -and $supabaseKey) {
            Write-Host "🔑 Adicionando variáveis de ambiente..." -ForegroundColor Blue
            echo $supabaseUrl | vercel env add NEXT_PUBLIC_SUPABASE_URL production
            echo $supabaseKey | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
            echo $supabaseUrl | vercel env add NEXT_PUBLIC_SUPABASE_URL preview
            echo $supabaseKey | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
            echo $supabaseUrl | vercel env add NEXT_PUBLIC_SUPABASE_URL development
            echo $supabaseKey | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development
            Write-Host "✅ Variáveis adicionadas" -ForegroundColor Green
        }
        
        # Deploy
        vercel --prod
    }
    
    Write-Host "✅ Deploy concluído!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Sua aplicação está no ar!" -ForegroundColor Cyan
    vercel ls
} else {
    Write-Host "📝 Para fazer deploy depois, execute:" -ForegroundColor Blue
    Write-Host "  vercel" -ForegroundColor Yellow
    Write-Host "  vercel --prod" -ForegroundColor Yellow
}
