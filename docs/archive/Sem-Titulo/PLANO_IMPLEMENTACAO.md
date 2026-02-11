# Landing Page Webinar ELITE - Plano de Implementação

## Visão Geral

Landing page focada em vender o webinar de 90 minutos sobre marketing para loteadoras, com formulário de qualificação, página de agradecimento e área administrativa para monitoramento de leads.

## Estrutura do Projeto

### 1. Configuração Inicial

- **Next.js 14** com App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilização
- **Supabase** para banco de dados e autenticação
- **React Hook Form** para validação de formulários
- **Zod** para schema validation

### 2. Páginas Principais

#### 2.1 Landing Page (`/`)

**Seções:**

- **Hero Section**: Título impactante sobre o webinar, data/hora (Terça-feira às 16h), CTA principal, logo ELITE e foto do apresentador
- **Sobre o Webinar**: Descrição dos 90 minutos focados em marketing de loteadora e lançamentos
- **O que você vai aprender**: Benefícios baseados no método ELITE (usar dados de `docs/metodologia.csv`)
- **Para quem é**: Direcionado a donos de incorporadoras e diretores comerciais (usar dados de `docs/icp.csv`)
- **Formulário de Qualificação**: 
  - Nome (text)
  - Email (email)
  - WhatsApp com DDD (text com máscara)
  - Média de Faturamento (select com opções):
    - Até R$80mil por mês
    - De R$80mil a R$150mil por mês
    - De R$150mil a R$300mil por mês
    - De R$300mil a R$500mil por mês
    - De R$500mil a R$ 1 milhão por mês
    - Acima de R$ 1 milhão por mês
- **Prova Social**: Depoimentos ou estatísticas
- **FAQ**: Perguntas frequentes sobre o webinar

#### 2.2 Página de Agradecimento (`/obrigado`)

- Mensagem de confirmação
- Botão para entrar no grupo VIP (link para WhatsApp)
- Informações sobre o próximo passo (confirmação por email)

#### 2.3 Área Administrativa (`/admin`)

**Proteção**: Autenticação via Supabase Auth

**Funcionalidades:**

- **Dashboard Principal**:
  - Total de leads cadastrados
  - Leads por faixa de faturamento (gráfico)
  - Leads por dia/semana (gráfico temporal)
  - Taxa de conversão (se houver tracking de origem)
- **Relatório de Leads**:
  - Tabela com todos os leads
  - Filtros por: data, faixa de faturamento, origem
  - Busca por nome/email/whatsapp
  - Exportação para CSV
- **Dashboard de Origens**:
  - Leads por origem/canal (UTM parameters)
  - Performance por fonte de tráfego

### 3. Banco de Dados (Supabase)

#### Tabela `leads`

```sql
- id (uuid, primary key)
- nome (text)
- email (text, unique)
- whatsapp (text)
- revenue_range (text) -- faixa de faturamento
- source (text) -- origem (utm_source)
- medium (text) -- utm_medium
- campaign (text) -- utm_campaign
- created_at (timestamp)
- updated_at (timestamp)
```

#### Tabela `users` (gerenciada pelo Supabase Auth)

- Usuários admin para acessar área administrativa

### 4. Componentes Reutilizáveis

- `Form/QualificationForm.tsx`: Formulário de qualificação
- `Form/WhatsAppInput.tsx`: Input com máscara para WhatsApp
- `Admin/Dashboard.tsx`: Componente principal do dashboard
- `Admin/LeadsTable.tsx`: Tabela de leads com filtros
- `Admin/Charts.tsx`: Gráficos de visualização
- `Layout/Header.tsx`: Header da landing page
- `Layout/Footer.tsx`: Footer

### 5. Funcionalidades Técnicas

- **Validação de Formulário**: React Hook Form + Zod
- **Máscara de WhatsApp**: Biblioteca `react-input-mask` ou `cleave.js`
- **Tracking de Origem**: Captura de UTM parameters da URL
- **Responsividade**: Mobile-first design
- **SEO**: Meta tags otimizadas, Open Graph
- **Analytics**: Preparado para Google Analytics (opcional)

### 6. Estilo e Design

- Design moderno e profissional
- **Paleta de Cores Oficial ELITE** (definida em `Assets/Loteadora_Elite_ColorTheme.jpeg`):
  - **Premium Quartz**: `#F2F4F6` (30% - fundos)
  - **Blueprint Navy**: `#0E1D37` (60% - base estrutural)
  - **Smart Flow**: `#00BCBC` (4% - cor de destaque oficial para CTAs)
  - **Urban Glow**: `#FE5009` (4% - cor de destaque oficial para CTAs)
  - **Sold Red**: `#DA0028` (2% - casos extremamente raros apenas)
- **Logos disponíveis** em `Public/` (múltiplas versões para light/dark mode)
- **Foto do apresentador**: `Public/ribas-young.jpg` (otimizada para web)
- Animações sutis para melhor UX
- Formulário destacado e fácil de preencher
- Referência visual ao exemplo: programalucroeliberdade.com.br
- Suporte a Dark Mode opcional

### 7. Arquivos a Criar

```
elite/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (landing page)
│   ├── obrigado/
│   │   └── page.tsx
│   └── admin/
│       ├── layout.tsx (proteção de rota)
│       ├── page.tsx (dashboard)
│       └── leads/
│           └── page.tsx (relatório detalhado)
├── components/
│   ├── Form/
│   │   ├── QualificationForm.tsx
│   │   └── WhatsAppInput.tsx
│   ├── Admin/
│   │   ├── Dashboard.tsx
│   │   ├── LeadsTable.tsx
│   │   └── Charts.tsx
│   └── Layout/
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils/
│       ├── validation.ts
│       └── format.ts
├── types/
│   └── lead.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

### 8. Integração com Dados Existentes

- Usar informações de `docs/icp.csv` para criar copy direcionado ao público-alvo
- Usar `docs/metodologia.csv` para destacar transformações e benefícios
- Usar `docs/escopo.csv` para contexto sobre o programa ELITE e método PRIME

### 9. Próximos Passos de Implementação

1. Setup inicial do projeto Next.js
2. Configuração do Supabase (banco + auth)
3. Criação da landing page com todas as seções
4. Implementação do formulário com validação
5. Página de agradecimento
6. Área administrativa com dashboard
7. Sistema de relatórios e exportação
8. Testes e ajustes finais

## TODOs de Implementação

- [ ] **setup-project**: Configurar projeto Next.js 14 com TypeScript, Tailwind CSS e dependências necessárias
- [ ] **setup-supabase**: Configurar Supabase: criar tabela de leads, configurar autenticação para área admin
- [ ] **create-landing**: Criar landing page com hero, sobre o webinar, benefícios, formulário e FAQ (depende de: setup-project)
- [ ] **create-form**: Implementar formulário de qualificação com validação (nome, email, whatsapp, faturamento) (depende de: setup-project, setup-supabase)
- [ ] **create-thank-you**: Criar página de agradecimento com botão para grupo VIP (depende de: create-form)
- [ ] **create-admin**: Implementar área administrativa protegida com dashboard de leads (depende de: setup-supabase)
- [ ] **create-reports**: Criar relatórios e gráficos: leads por faturamento, por data, por origem (depende de: create-admin)
- [ ] **add-export**: Implementar funcionalidade de exportação de leads para CSV (depende de: create-reports)

## Informações do Webinar

- **Duração**: 90 minutos
- **Foco**: Marketing de loteadora, principalmente em lançamentos
- **Data/Hora**: Terça-feira às 16h
- **Público-alvo**: Donos de incorporadoras e diretores comerciais
- **Objetivo**: Explorar o método ELITE para implementar sistema de gestão de marketing eficaz

## Referências

- Exemplo de estrutura: programalucroeliberdade.com.br
- Dados do ICP: `docs/icp.csv`
- Metodologia: `docs/metodologia.csv`
- Escopo do programa: `docs/escopo.csv`
- Paleta de cores: `docs/PALETA_CORES.md`
- Assets disponíveis: `docs/ASSETS_DISPONIVEIS.md`
- Análise completa: `docs/ANALISE_REFERENCIA.md`
