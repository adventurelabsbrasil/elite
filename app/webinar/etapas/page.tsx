import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";
import { Zap, Clock } from "lucide-react";

const STEPS: RevealStep[] = [
  {
    title: "Etapas da campanha",
    icon: <Zap className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <p className="text-lg text-elite-quartz/90">
        As 5 fases do GTM: Branding → Teaser → Pré-lançamento → Lançamento → Pós-lançamento.
      </p>
    ),
  },
  {
    title: "BRANDING",
    icon: <Zap className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <>
        <p className="mb-4">
          Conceitos fortes e impactantes (ex: &quot;Não Compre Terreno Agora, Especialista em
          Lançamentos&quot;).
        </p>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-elite-glow/20 text-elite-glow font-medium text-sm">
          <Clock className="h-4 w-4" />
          ~3 meses
        </span>
      </>
    ),
  },
  {
    title: "TEASER",
    icon: <Zap className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <>
        <p className="mb-4">Expectativa e curiosidade com campanhas enigmáticas.</p>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-elite-glow/20 text-elite-glow font-medium text-sm">
          <Clock className="h-4 w-4" />
          ~10 dias antes da campanha
        </span>
        <p className="mt-4 text-elite-flow/90 text-sm">
          <strong>Lembrete:</strong> Materiais revisados e organizados.
        </p>
      </>
    ),
  },
  {
    title: "PRÉ-LANÇAMENTO",
    icon: <Zap className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <>
        <p className="mb-4">
          Aquecimento e engajamento (ex: Maratona Young). Conversão e atendimento no PDV.
        </p>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-elite-glow/20 text-elite-glow font-medium text-sm mb-4">
          <Clock className="h-4 w-4" />
          ~45 dias
        </span>
        <ul className="space-y-1 text-sm text-elite-quartz/85">
          <li>Contratar domínio e integrar CRM</li>
          <li>Configurar pixels e tags de conversão</li>
          <li>Planejar palavras-chave no Google Ads</li>
          <li>Avaliar duração para não cansar</li>
        </ul>
      </>
    ),
  },
  {
    title: "LANÇAMENTO",
    icon: <Zap className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <>
        <p className="mb-4">Evento de abertura oficial da venda.</p>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-elite-glow/20 text-elite-glow font-medium text-sm mb-4">
          <Clock className="h-4 w-4" />
          1 dia
        </span>
        <ul className="space-y-1 text-sm text-elite-quartz/85">
          <li>Líder para logística e cronograma</li>
          <li>Impressoras e computadores no local</li>
          <li>Atendimento rápido (até 5 min)</li>
        </ul>
      </>
    ),
  },
  {
    title: "PÓS-LANÇAMENTO",
    icon: <Zap className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <>
        <p className="mb-4">
          Acompanhamento de leads e fichas não fechadas. Carteira ativa, análise e feedback.
        </p>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-elite-glow/20 text-elite-glow font-medium text-sm mb-4">
          <Clock className="h-4 w-4" />
          ~90 dias
        </span>
        <ul className="space-y-1 text-sm text-elite-quartz/85">
          <li>Otimizar tráfego pago (evitar muitos objetivos)</li>
          <li>E-mail marketing semanal no auge</li>
          <li>Relatório diário do funil</li>
        </ul>
      </>
    ),
  },
  {
    title: "Melhoria contínua",
    icon: <Zap className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <>
        <p className="mb-4">
          <strong>Após lançamentos:</strong> Análise de Fichas, Vendas, Conversão, pontos negativos e
          oportunidades.
        </p>
        <ul className="space-y-1 text-sm">
          <li>Processo formal para situações de crise</li>
          <li>Avaliar equipe (2 consultores + 1 assistente)</li>
          <li>Comunicar preços aos corretores</li>
        </ul>
        <p className="font-medium text-elite-flow mt-4 mb-2">Diretrizes:</p>
        <ul className="text-sm space-y-0.5">
          <li>Identificação de problemas → Melhorias → Canais → Processos → Marketing → Equipes</li>
        </ul>
      </>
    ),
  },
];

export default function EtapasPage() {
  return (
    <Suspense fallback={<div className="text-elite-quartz/70">Carregando...</div>}>
      <RevealDeck steps={STEPS} backHref="/webinar" backLabel="Índice" timelineSlot="etapas" />
    </Suspense>
  );
}
