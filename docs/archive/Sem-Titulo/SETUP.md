# Guia de Setup - Landing Page Loteadora ELITE

## ✅ O que foi implementado

### 1. Estrutura do Projeto
- ✅ Next.js 14 com App Router
- ✅ TypeScript configurado
- ✅ Tailwind CSS com paleta de cores ELITE
- ✅ Estrutura de pastas organizada

### 2. Landing Page Completa
- ✅ Hero Section com informações do webinar (Terça-feira às 16h)
- ✅ Seção de Problemas (baseada no ICP)
- ✅ Seção de Solução (Método ELITE)
- ✅ Seção de Benefícios (baseada na metodologia)
- ✅ Seção de Público-Alvo
- ✅ Formulário de Qualificação com validação
- ✅ FAQ
- ✅ CTA Final
- ✅ Header e Footer

### 3. Formulário
- ✅ Validação com React Hook Form + Zod
- ✅ Máscara para WhatsApp
- ✅ Captura automática de UTM parameters
- ✅ Integração com Supabase

### 4. Página de Agradecimento
- ✅ Confirmação de inscrição
- ✅ Botão para grupo VIP no WhatsApp
- ✅ Próximos passos

### 5. Área Administrativa
- ✅ Dashboard com métricas
- ✅ Gráficos (leads por faturamento, data, origem)
- ✅ Tabela de leads com busca e filtros
- ✅ Exportação para CSV
- ✅ Autenticação protegida

## 🚀 Próximos Passos para Colocar no Ar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Supabase

#### 2.1 Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Anote a URL e a Anon Key

#### 2.2 Criar Tabela de Leads
Execute o SQL em `supabase-schema.sql` no SQL Editor do Supabase:

```sql
-- O arquivo supabase-schema.sql contém todo o SQL necessário
```

#### 2.3 Configurar Autenticação
1. No Supabase Dashboard, vá em Authentication > Users
2. Crie um usuário admin:
   - Email: seu-email@exemplo.com
   - Senha: (defina uma senha segura)
3. Use essas credenciais para fazer login em `/admin/login`

### 3. Configurar Variáveis de Ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

### 4. Atualizar Link do WhatsApp

Edite o arquivo `app/obrigado/page.tsx` na linha 47:

```tsx
// Substitua 5511999999999 pelo número real do grupo VIP
href="https://wa.me/5511999999999?text=..."
```

### 5. Testar Localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### 6. Deploy

#### Opção 1: Vercel (Recomendado)
1. Conecte seu repositório GitHub à Vercel
2. Configure as variáveis de ambiente na Vercel
3. Deploy automático

#### Opção 2: Outros Provedores
- Netlify
- Railway
- AWS Amplify

## 📋 Checklist de Deploy

- [ ] Instalar dependências (`npm install`)
- [ ] Criar projeto no Supabase
- [ ] Executar SQL schema (`supabase-schema.sql`)
- [ ] Criar usuário admin no Supabase
- [ ] Configurar `.env.local` com credenciais do Supabase
- [ ] Atualizar link do WhatsApp no código
- [ ] Testar formulário localmente
- [ ] Testar área admin localmente
- [ ] Fazer deploy
- [ ] Configurar variáveis de ambiente no provedor
- [ ] Testar em produção

## 🎨 Paleta de Cores Aplicada

A landing page utiliza a hierarquia de cores oficial:

- **60%** Blueprint Navy (`#0E1D37`) - Base estrutural
- **30%** Premium Quartz (`#F2F4F6`) - Fundos
- **8%** Smart Flow (`#00BCBC`) + Urban Glow (`#FE5009`) - Destaques oficiais
- **2%** Sold Red (`#DA0028`) - Casos extremamente raros

## 📁 Assets

Os assets estão na pasta `public/`:
- Logos (Primary, Isotipo, Mono - versões light/dark)
- Foto do apresentador (ribas-young.jpg)

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start

# Linter
npm run lint
```

## 📚 Documentação Adicional

- [README.md](README.md) - Documentação completa
- [docs/PALETA_CORES.md](docs/PALETA_CORES.md) - Guia de cores
- [docs/ASSETS_DISPONIVEIS.md](docs/ASSETS_DISPONIVEIS.md) - Assets disponíveis
- [docs/ANALISE_REFERENCIA.md](docs/ANALISE_REFERENCIA.md) - Análise de referência

## ⚠️ Importante

1. **Não commitar `.env.local`** - Já está no `.gitignore`
2. **Atualizar link do WhatsApp** antes de fazer deploy
3. **Configurar RLS no Supabase** - O schema já inclui políticas de segurança
4. **Testar formulário** antes de colocar no ar

## 🆘 Suporte

Se encontrar problemas:
1. Verifique se todas as variáveis de ambiente estão configuradas
2. Confirme que a tabela `leads` foi criada no Supabase
3. Verifique os logs do console do navegador
4. Confira os logs do Supabase Dashboard
