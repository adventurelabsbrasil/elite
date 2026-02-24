import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";
import { Target, List, Users, FileText, TrendingUp, CheckCircle } from "lucide-react";

const STEPS: RevealStep[] = [
  {
    title: "Planejamento Estratégico",
    icon: <Target className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <p className="text-lg sm:text-xl text-elite-quartz/90">
        Desenvolvimento de plano de comunicação, cronogramas de veiculação e orçamentos de
        marketing.
      </p>
    ),
  },
  {
    title: "Etapas fundamentais",
    icon: <List className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Definição de metas e KPIs</li>
        <li>Posicionamento e identidade</li>
        <li>Estratégias de marketing</li>
        <li>Definição e treinamento da equipe</li>
        <li>Criação de materiais de apoio</li>
        <li>Ações de prospecção imobiliárias</li>
        <li>Campanha Branding Institucional</li>
        <li>Projeção de orçamento por canais</li>
      </ul>
    ),
  },
  {
    title: "Comercial",
    icon: <Users className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <p>
        <strong className="text-elite-flow">Carol Volpato</strong> — Planejamento geral, alinhamento
        com áreas, treinamentos, organização dos eventos e acompanhamento de metas.
      </p>
    ),
  },
  {
    title: "Marketing",
    icon: <Users className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <p>
        <strong className="text-elite-flow">Rodrigo Ribas</strong> — Campanhas, peças gráficas e
        mídias.
      </p>
    ),
  },
  {
    title: "Direção",
    icon: <Users className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <p>
        <strong className="text-elite-flow">Eduardo Tebaldi</strong> — Definição de budget,
        precificação e tabelas.
      </p>
    ),
  },
  {
    title: "Vendas",
    icon: <Users className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <p>
        <strong className="text-elite-flow">Equipe de Consultores e Corretores</strong> —
        Prospecção, atendimento, cadastramento de clientes e conversão.
      </p>
    ),
  },
  {
    title: "Administrativo",
    icon: <Users className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <p>
        <strong className="text-elite-flow">Estágio Comercial</strong> — Documentação, contratos
        imobiliárias e cadastros.
      </p>
    ),
  },
  {
    title: "Documentos essenciais (1/2)",
    icon: <FileText className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Renders</li>
        <li>Calendário editorial</li>
        <li>Vídeo do empreendimento</li>
        <li>Landing pages / hotsite</li>
        <li>Book com implantação</li>
        <li>Windbanners</li>
      </ul>
    ),
  },
  {
    title: "Documentos essenciais (2/2)",
    icon: <FileText className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Cavaletes</li>
        <li>Folders</li>
        <li>Manual do empreendimento/objeções</li>
        <li>Ficha cadastro do cliente</li>
        <li>Manual de vendas</li>
      </ul>
    ),
  },
  {
    title: "Indicadores-chave (KPIs)",
    icon: <TrendingUp className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Volume de leads por etapa</li>
        <li>Taxa de conversão</li>
        <li>Ticket médio</li>
        <li>Meta fichas</li>
        <li>Engajamento da equipe (ações off-line)</li>
        <li>CPL / ROAS</li>
      </ul>
    ),
  },
  {
    title: "Boas práticas",
    icon: <CheckCircle className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Alinhar marketing e vendas desde o início</li>
        <li>Gatilhos de escassez e urgência reais</li>
        <li>Pelo menos 3 ações no período de lançamento</li>
        <li>Materiais prontos com antecedência</li>
        <li>Treinar antes e durante o lançamento</li>
        <li>Acompanhar resultados em tempo real</li>
      </ul>
    ),
  },
];

export default function PlanejamentoPage() {
  return (
    <Suspense fallback={<div className="text-elite-quartz/70">Carregando...</div>}>
      <RevealDeck steps={STEPS} backHref="/webinar" backLabel="Índice" />
    </Suspense>
  );
}
