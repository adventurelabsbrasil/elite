#!/usr/bin/env node

/**
 * Setup Script - Loteadora ELITE
 * Verifica dependências e prepara ambiente
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkCommand(command) {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    try {
      execSync(`where ${command}`, { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }
}

function installGlobal(packageName) {
  try {
    log(`Instalando ${packageName}...`, 'blue');
    execSync(`npm install -g ${packageName}`, { stdio: 'inherit' });
    return true;
  } catch {
    return false;
  }
}

log('🚀 Setup Completo - Loteadora ELITE Landing Page', 'blue');
log('================================================', 'blue');
log('');

// 1. Verificar Node.js e npm
log('📦 Verificando dependências básicas...', 'blue');
if (!checkCommand('node')) {
  log('❌ Node.js não encontrado. Instale primeiro.', 'red');
  process.exit(1);
}
if (!checkCommand('npm')) {
  log('❌ npm não encontrado. Instale primeiro.', 'red');
  process.exit(1);
}
if (!checkCommand('git')) {
  log('❌ Git não encontrado. Instale primeiro.', 'red');
  process.exit(1);
}
log('✅ Dependências básicas OK', 'green');
log('');

// 2. Instalar dependências do projeto
log('📦 Instalando dependências do projeto...', 'blue');
try {
  execSync('npm install', { stdio: 'inherit' });
  log('✅ Dependências instaladas', 'green');
} catch {
  log('⚠️  Erro ao instalar dependências', 'yellow');
}
log('');

// 3. Verificar Supabase CLI
log('🔍 Verificando Supabase CLI...', 'blue');
if (!checkCommand('supabase')) {
  log('⚠️  Supabase CLI não encontrado', 'yellow');
  if (installGlobal('supabase')) {
    log('✅ Supabase CLI instalado', 'green');
  } else {
    log('❌ Erro ao instalar Supabase CLI', 'red');
  }
} else {
  log('✅ Supabase CLI encontrado', 'green');
}
log('');

// 4. Verificar Vercel CLI
log('🔍 Verificando Vercel CLI...', 'blue');
if (!checkCommand('vercel')) {
  log('⚠️  Vercel CLI não encontrado', 'yellow');
  if (installGlobal('vercel')) {
    log('✅ Vercel CLI instalado', 'green');
  } else {
    log('❌ Erro ao instalar Vercel CLI', 'red');
  }
} else {
  log('✅ Vercel CLI encontrado', 'green');
}
log('');

// 5. Verificar GitHub CLI
log('🔍 Verificando GitHub CLI...', 'blue');
if (!checkCommand('gh')) {
  log('⚠️  GitHub CLI não encontrado', 'yellow');
  log('   Instale manualmente:', 'yellow');
  log('   Windows: winget install --id GitHub.cli', 'yellow');
  log('   macOS: brew install gh', 'yellow');
  log('   Linux: veja CLI_SETUP.md', 'yellow');
} else {
  log('✅ GitHub CLI encontrado', 'green');
}
log('');

// 6. Inicializar Git (se não existir)
if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
  log('📝 Inicializando repositório Git...', 'blue');
  try {
    execSync('git init', { stdio: 'inherit' });
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "Initial commit: Loteadora ELITE Landing Page"', { stdio: 'inherit' });
    log('✅ Git inicializado', 'green');
  } catch {
    log('⚠️  Erro ao inicializar Git', 'yellow');
  }
  log('');
}

// 7. Criar .env.local se não existir
if (!fs.existsSync(path.join(process.cwd(), '.env.local'))) {
  log('📝 Criando .env.local...', 'blue');
  const envContent = `# Supabase (configure depois)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
`;
  fs.writeFileSync(path.join(process.cwd(), '.env.local'), envContent);
  log('✅ .env.local criado', 'green');
  log('');
}

log('✅ Setup básico concluído!', 'green');
log('');
log('Próximos passos:', 'blue');
log('1. npm run setup:supabase  - Configurar Supabase', 'blue');
log('2. npm run setup:github    - Configurar GitHub', 'blue');
log('3. npm run setup:vercel    - Configurar Vercel', 'blue');
log('');
