import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";

const STEPS: RevealStep[] = [
  {
    title: "Etapas da campanha – Visão geral",
    content: (
      <>
        <p className="mb-4">As 5 fases do GTM de um empreendimento imobiliário:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong className="text-elite-flow">BRANDING</strong> – Desenvolver conceitos fortes e
            impactantes.
          </li>
          <li>
            <strong className="text-elite-flow">TEASER</strong> – Gerar expectativa e curiosidade
            com campanhas enigmáticas.
          </li>
          <li>
            <strong className="text-elite-flow">PRÉ-LANÇAMENTO</strong> – Ações de aquecimento e
            engajamento, conversão e atendimento no PDV.
          </li>
          <li>
            <strong className="text-elite-flow">LANÇAMENTO</strong> – Evento de abertura oficial da
            venda.
          </li>
          <li>
            <strong className="text-elite-flow">PÓS-LANÇAMENTO</strong> – Acompanhamento de leads,
            carteira ativa, análise e feedback.
          </li>
        </ol>
      </>
    ),
  },
  {
    title: "BRANDING",
    content: (
      <>
        <p className="mb-4">Desenvolver conceitos fortes e impactantes (ex: &quot;Não Compre Terreno Agora, Especialista em Lançamentos&quot;).</p>
        <p className="text-elite-glow font-medium">Duração: ~3 meses</p>
      </>
    ),
  },
  {
    title: "TEASER",
    content: (
      <>
        <p className="mb-4">Gerar expectativa e curiosidade com campanhas enigmáticas.</p>
        <p className="text-elite-glow font-medium mb-4">Duração: ~10 dias antes da campanha</p>
        <p className="text-elite-flow/90 text-sm">
          <strong>Lembrete:</strong> Garantir que todos os materiais estejam revisados e organizados.
        </p>
      </>
    ),
  },
  {
    title: "PRÉ-LANÇAMENTO",
    content: (
      <>
        <p className="mb-4">
          Realizar ações de aquecimento e engajamento do público (ex: Maratona Young, Campanha
          Oficial). Ações intensivas de conversão e atendimento no ponto de venda.
        </p>
        <p className="text-elite-glow font-medium mb-4">Duração: ~45 dias</p>
        <ul className="space-y-1 text-sm text-elite-quartz/85">
          <li>
            <strong>Lembrete:</strong> Avaliar a duração do pré-lançamento para não se tornar
            cansativo.
          </li>
          <li>
            <strong>Lembrete:</strong> Contratar domínio personalizado e integrar com CRM.
          </li>
          <li>
            <strong>Lembrete:</strong> Configurar pixels, tag manager e tags de conversão de
            formulário.
          </li>
          <li>
            <strong>Lembrete:</strong> Criar planejador de palavras-chave no Google Ads.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "LANÇAMENTO",
    content: (
      <>
        <p className="mb-4">Evento de abertura oficial da venda.</p>
        <p className="text-elite-glow font-medium mb-4">Duração: evento de 1 dia</p>
        <ul className="space-y-1 text-sm text-elite-quartz/85">
          <li>
            <strong>Lembrete:</strong> Designar um líder para logística do evento e compartilhar
            cronograma detalhado.
          </li>
          <li>
            <strong>Lembrete:</strong> Garantir equipamentos essenciais (impressoras, computadores).
          </li>
          <li>
            <strong>Lembrete:</strong> Atendimento rápido de leads (até 5 minutos).
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "PÓS-LANÇAMENTO",
    content: (
      <>
        <p className="mb-4">
          Acompanhamento de leads e clientes que fizeram ficha e não fecharam. Trabalhar carteira
          ativa e perdidos, ações corretivas da campanha, análise de performance e resultados,
          retorno e feedback dos resultados da equipe.
        </p>
        <p className="text-elite-glow font-medium mb-4">Duração: ~90 dias</p>
        <ul className="space-y-1 text-sm text-elite-quartz/85">
          <li>
            <strong>Lembrete:</strong> Otimizar o tráfego pago, evitando muitos objetivos
            simultaneamente.
          </li>
          <li>
            <strong>Lembrete:</strong> Frequência de e-mail marketing (semanal no auge da campanha).
          </li>
          <li>
            <strong>Lembrete:</strong> Monitoramento de leads com relatório diário do funil de
            marketing.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Melhoria contínua / Lições aprendidas",
    content: (
      <>
        <p className="mb-4">
          <strong>Após lançamentos:</strong> Análise completa de Fichas, Vendas, Conversão, Pontos
          Negativos, Oportunidades de Melhoria e Pontos Positivos.
        </p>
        <ul className="space-y-1 text-sm">
          <li>Lembrete: Criar um processo formal para lidar com situações de crise.</li>
          <li>Lembrete: Avaliar a composição da equipe de vendas (dois consultores e um assistente).</li>
          <li>Lembrete: Comunicar claramente os preços aos corretores.</li>
        </ul>
        <p className="font-medium text-elite-flow mt-4 mb-2">Diretrizes:</p>
        <ul className="text-sm">
          <li>Identificação de problemas</li>
          <li>Proposição de melhorias</li>
          <li>Análise de canais</li>
          <li>Aprimoramento de processos</li>
          <li>Otimização de marketing</li>
          <li>Treinamento de equipes</li>
          <li>Envolvimento da equipe</li>
        </ul>
      </>
    ),
  },
];

export default function EtapasPage() {
  return (
    <Suspense fallback={<div className="text-elite-quartz/70">Carregando...</div>}>
      <RevealDeck steps={STEPS} backHref="/webinar" backLabel="Índice" />
    </Suspense>
  );
}
