# Landing Page Loteadora ELITE

Landing page focada em vender o webinar de 90 minutos sobre marketing para loteadoras, com formulário de qualificação, página de agradecimento e área administrativa para monitoramento de leads.

## 🚀 Tecnologias

- **Next.js 14** com App Router
- **TypeScript** para type safety
- **Tailwind CSS** para estilização
- **Supabase** para banco de dados e autenticação
- **React Hook Form** + **Zod** para validação de formulários
- **Recharts** para gráficos e visualizações

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

Edite o `.env.local` com suas credenciais do Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🗄️ Configuração do Supabase

### Tabela `leads`

Crie a tabela no Supabase SQL Editor:

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  email text not null unique,
  whatsapp text not null,
  revenue_range text not null,
  source text,
  medium text,
  campaign text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Índices para performance
create index leads_created_at_idx on leads(created_at desc);
create index leads_revenue_range_idx on leads(revenue_range);
create index leads_source_idx on leads(source);
```

### Autenticação para Área Admin

1. No Supabase Dashboard, vá em Authentication > Users
2. Crie um usuário admin manualmente ou configure email/password
3. Use essas credenciais para fazer login em `/admin/login`

## 🎨 Paleta de Cores

A landing page utiliza a paleta oficial ELITE:

- **Blueprint Navy** (`#0E1D37`) - 60% - Base estrutural
- **Premium Quartz** (`#F2F4F6`) - 30% - Fundos
- **Smart Flow** (`#00BCBC`) - 4% - Cor de destaque oficial
- **Urban Glow** (`#FE5009`) - 4% - Cor de destaque oficial
- **Sold Red** (`#DA0028`) - 2% - Casos extremamente raros

## 📁 Estrutura do Projeto

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
│       └── login/
│           └── page.tsx
├── components/
│   ├── Form/
│   │   ├── QualificationForm.tsx
│   │   └── WhatsAppInput.tsx
│   ├── Admin/
│   │   ├── Dashboard.tsx
│   │   ├── LeadsTable.tsx
│   │   └── Charts.tsx
│   ├── Layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── Sections/
│       ├── Hero.tsx
│       ├── Problem.tsx
│       ├── Solution.tsx
│       ├── Benefits.tsx
│       ├── TargetAudience.tsx
│       ├── FAQ.tsx
│       └── FinalCTA.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils/
│       ├── validation.ts
│       └── format.ts
└── types/
    └── lead.ts
```

## 🎯 Funcionalidades

### Landing Page
- Hero section com informações do webinar
- Seção de problemas (baseada no ICP)
- Apresentação do método ELITE
- Benefícios baseados na metodologia
- Público-alvo
- Formulário de qualificação com validação
- FAQ
- CTA final

### Formulário
- Validação com React Hook Form + Zod
- Máscara para WhatsApp
- Captura de UTM parameters
- Integração com Supabase

### Área Administrativa
- Dashboard com métricas
- Gráficos de leads por faturamento, data e origem
- Tabela de leads com busca e filtros
- Exportação para CSV
- Autenticação protegida

## 📝 Próximos Passos

1. Configurar Supabase (tabela e autenticação)
2. Atualizar link do WhatsApp no grupo VIP (`app/obrigado/page.tsx`)
3. Adicionar Google Analytics (opcional)
4. Configurar domínio e deploy

## 📚 Documentação

- [Análise de Referência](docs/ANALISE_REFERENCIA.md)
- [Paleta de Cores](docs/PALETA_CORES.md)
- [Assets Disponíveis](docs/ASSETS_DISPONIVEIS.md)
- [Plano de Implementação](PLANO_IMPLEMENTACAO.md)
