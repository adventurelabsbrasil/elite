-- Tabela de leads
create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  email text not null unique,
  whatsapp text not null,
  revenue_range text not null check (revenue_range in (
    'ate-80mil',
    '80mil-150mil',
    '150mil-300mil',
    '300mil-500mil',
    '500mil-1milhao',
    'acima-1milhao'
  )),
  source text,
  medium text,
  campaign text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Índices para performance
create index if not exists leads_created_at_idx on leads(created_at desc);
create index if not exists leads_revenue_range_idx on leads(revenue_range);
create index if not exists leads_source_idx on leads(source);
create index if not exists leads_email_idx on leads(email);

-- Função para atualizar updated_at automaticamente
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger para atualizar updated_at
create trigger update_leads_updated_at
  before update on leads
  for each row
  execute function update_updated_at_column();

-- RLS (Row Level Security) - Permitir inserção pública, leitura apenas para autenticados
alter table leads enable row level security;

-- Política: Qualquer um pode inserir (para o formulário público)
create policy "Permitir inserção pública de leads"
  on leads
  for insert
  to anon, authenticated
  with check (true);

-- Política: Apenas autenticados podem ler
create policy "Permitir leitura para autenticados"
  on leads
  for select
  to authenticated
  using (true);
