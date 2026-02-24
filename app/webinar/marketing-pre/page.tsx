import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";
import { Target, Package, CheckSquare, Megaphone, TrendingUp } from "lucide-react";

const STEPS: RevealStep[] = [
  {
    title: "1. Estratégia",
    icon: <Target className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Análise SWOT</li>
        <li>Definir ICP e tom de voz da marca</li>
        <li>Jornada do cliente: email marketing e scripts por etapa</li>
        <li>Definir canais e orçamento</li>
        <li>Reuniões bisemanais de alinhamento</li>
      </ul>
    ),
  },
  {
    title: "Ficha técnica do empreendimento",
    icon: <Target className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Infraestrutura, atributos, unidades e faseamento</li>
        <li>Ticket médio, especificações dos lotes</li>
        <li>Implantação, localização</li>
        <li>Principais contatos de parceiros</li>
      </ul>
    ),
  },
  {
    title: "2. Desenvolvimento e produção",
    icon: <Package className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Linha editorial clara: Branding, Teaser, Pré, Pós 90d</li>
        <li>Materiais brutos físicos e digitais</li>
        <li>Orçamentos e contratação de fornecedores</li>
        <li>Fornecedores com NFe e diretrizes de pagamento</li>
        <li>Campanhas com antecedência (calendário editorial)</li>
      </ul>
    ),
  },
  {
    title: "3. Revisão e configuração (1/2)",
    icon: <CheckSquare className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Revisar materiais e organizar em pastas (interno e externo)</li>
        <li>Liberar físicos para produção</li>
        <li>Solicitar pagamentos e acompanhar produção</li>
        <li>Saldo nas plataformas digitais</li>
        <li>Visita ao local 3 meses antes</li>
      </ul>
    ),
  },
  {
    title: "3. Revisão e configuração (2/2)",
    icon: <CheckSquare className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Mapear e ativar parceiros (imobiliárias, comércios)</li>
        <li>Plantão de vendas e escala dos consultores</li>
        <li>Automações e infraestrutura digital 100% ok</li>
        <li>Domínio + CRM; pixels e tags de conversão</li>
        <li>Planejador de palavras-chave no Google Ads</li>
      </ul>
    ),
  },
  {
    title: "4. Veiculação",
    icon: <Megaphone className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Programar e veicular campanhas</li>
        <li>Páginas e perfis sociais atualizados (banners, capas)</li>
        <li>Backup diário de leads</li>
        <li>Testes A/B em criativos e landing pages</li>
      </ul>
    ),
  },
  {
    title: "5. Análise e otimização",
    icon: <TrendingUp className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Integrações e dashboards em tempo real</li>
        <li>Analisar testes A/B e novas estratégias</li>
        <li>Controle do orçamento diário</li>
      </ul>
    ),
  },
];

export default function MarketingPrePage() {
  return (
    <Suspense fallback={<div className="text-elite-quartz/70">Carregando...</div>}>
      <RevealDeck steps={STEPS} backHref="/webinar" backLabel="Índice" />
    </Suspense>
  );
}
