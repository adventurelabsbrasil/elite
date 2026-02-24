import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";
import { Users, BarChart3, PenTool, CreditCard, Share2, FolderOpen, MessageCircle } from "lucide-react";

const STEPS: RevealStep[] = [
  {
    title: "Objetivo da equipe de Marketing",
    icon: <Users className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <p className="text-lg text-elite-quartz/90">
        Suporte operacional e criativo: conteúdo, campanhas, sistemas e fornecedores — plano de
        comunicação e presença da marca nos canais digitais e físicos.
      </p>
    ),
  },
  {
    title: "Relatórios e monitoramento",
    icon: <BarChart3 className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Relatórios diários (atividades, bloqueios, entregas)</li>
        <li>Indicadores de desempenho das campanhas</li>
        <li>Análise de resultados (Meta Ads, Google Ads) e insights</li>
      </ul>
    ),
  },
  {
    title: "Criação e publicação",
    icon: <PenTool className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Peças gráficas e audiovisuais (digitais e físicos)</li>
        <li>Apresentações, fichas, folders, placas</li>
        <li>Conteúdo para LPs, e-mail e redes sociais</li>
        <li>Publicação paga e orgânica; agendamento editorial</li>
      </ul>
    ),
  },
  {
    title: "Integrações e financeiro",
    icon: <CreditCard className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Automações e integrações (RD Station, Make, SellFlux)</li>
        <li>Formulários de captação e gestão de leads no CRM</li>
        <li>Pagamentos, NF e boletos; cotações e produção</li>
        <li>Negociação com fornecedores</li>
      </ul>
    ),
  },
  {
    title: "Comunicação e relacionamento",
    icon: <Share2 className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Encaminhar leads para comercial e parceiros</li>
        <li>Atendimento via WhatsApp quando necessário</li>
        <li>Compartilhar pastas e documentos</li>
        <li>Acompanhar pendências e cobrar entregas</li>
      </ul>
    ),
  },
  {
    title: "Organização e mídia",
    icon: <FolderOpen className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Cronogramas editoriais e publicitários</li>
        <li>Planejamento de campanhas e eventos</li>
        <li>Documentos e processos do setor</li>
        <li>Sessões de fotos/vídeos; curadoria e renders</li>
      </ul>
    ),
  },
  {
    title: "Reuniões e desenvolvimento",
    icon: <MessageCircle className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-1.5">
        <li>Reuniões internas e com parceiros (agências, imobiliárias)</li>
        <li>Treinamentos e dinâmicas de equipe</li>
      </ul>
    ),
  },
];

export default function MarketingEquipePage() {
  return (
    <Suspense fallback={<div className="text-elite-quartz/70">Carregando...</div>}>
      <RevealDeck steps={STEPS} backHref="/webinar" backLabel="Índice" />
    </Suspense>
  );
}
