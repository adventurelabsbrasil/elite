import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";
import { Search, Package, Settings, Users, TrendingUp } from "lucide-react";

const STEPS: RevealStep[] = [
  {
    title: "1. Estratégia e pesquisa (1/2)",
    icon: <Search className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>
          <strong className="text-elite-flow">Pesquisa de público-alvo local:</strong> Mentalidade,
          preferências, valores e dores (gírias, cultura da região) antes de produzir material.
        </li>
        <li>
          <strong className="text-elite-flow">Análise competitiva:</strong> Concorrência em
          posicionamento comercial e marketing para ajustar a comunicação a tempo.
        </li>
      </ul>
    ),
  },
  {
    title: "1. Estratégia e pesquisa (2/2)",
    icon: <Search className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>
          <strong className="text-elite-flow">Ficha técnica:</strong> Informações cruciais para
          todas as equipes; implantação com tamanhos de lotes; legendas claras (A1, B15).
        </li>
        <li>
          <strong className="text-elite-flow">Atributos e fases para renders:</strong> Definir
          antes da criação; alinhar com a oferta final (ex.: não mostrar casas em área comercial).
        </li>
      </ul>
    ),
  },
  {
    title: "2. Materiais e produção (1/2)",
    icon: <Package className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Antecipar produção de físicos (pastas, camisetas); outdoors com comunicação objetiva.</li>
        <li>Qualidade dos materiais (ex.: windbanners); evitar fornecedores com histórico ruim.</li>
        <li>Clareza com fornecedores: pagamento, entrega; mapear fornecedores validados.</li>
      </ul>
    ),
  },
  {
    title: "2. Materiais e produção (2/2)",
    icon: <Package className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Vídeos longos = alcance; Motions/Reels/Shorts = desempenho; marca/cidade nas primeiras cenas.</li>
        <li>Testes A/B em criativos e LPs; avaliar hotsite vs LPs simples no pré-lançamento.</li>
        <li>Canais: Meta, YouTube, Google, TikTok, WhatsApp, e-mail, rádio, outdoor, influenciadores, etc.</li>
      </ul>
    ),
  },
  {
    title: "3. Processos e ferramentas (1/2)",
    icon: <Settings className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Estrutura de pastas no Drive (Planejamento, Desenvolvimento, Mídia, Gestão); pastas Youngers, Corretores.</li>
        <li>Jira ou similar para tarefas e prazos; aplicativo pode ser mais prático que planilhas.</li>
      </ul>
    ),
  },
  {
    title: "3. Processos e ferramentas (2/2)",
    icon: <Settings className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Pixel, Analytics, UTM e CRM prontos no Setup; especialista para eventos de conversão.</li>
        <li>Automações e integrações perfeitas; automação para bloquear lotes vendidos ao imprimir.</li>
        <li>Backup diário de leads; WhatsApp ativo contabilizando corretamente no RD Station.</li>
      </ul>
    ),
  },
  {
    title: "4. Parceiros e equipe (1/2)",
    icon: <Users className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Treinamento contínuo para imobiliárias e corretores; reuniões semanais ou comissão diferenciada.</li>
        <li>Contratos com influenciadores/parceiros formalizados antes da campanha.</li>
        <li>Cadastro de corretores simplificado (dados básicos primeiro; ou foto da ficha via WhatsApp).</li>
      </ul>
    ),
  },
  {
    title: "4. Parceiros e equipe (2/2)",
    icon: <Users className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Equipe de vendas: avaliar 2 consultores + 1 assistente; considerar SDR para qualificação.</li>
        <li>Ida para a cidade: administração 30 dias antes, consultores 1 semana antes do teaser.</li>
        <li>Líder de viagem/hospedagem com diretrizes claras.</li>
      </ul>
    ),
  },
  {
    title: "5. Campanhas digitais e análise",
    icon: <TrendingUp className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Comunicação de preço clara aos corretores; avaliar preço como argumento da campanha.</li>
        <li>Tráfego pago: uma estratégia principal (hotsite ou mensagens).</li>
        <li>E-mail no máximo semanal no auge; agendar com 7 dias de antecedência.</li>
        <li>Comercial cadastrar e-mails no RD Station; relatório diário do funil.</li>
        <li>TikTok para branding e prova social; mais testes no pré-lançamento.</li>
      </ul>
    ),
  },
];

export default function ConsideracoesPage() {
  return (
    <Suspense fallback={<div className="text-elite-quartz/70">Carregando...</div>}>
      <RevealDeck steps={STEPS} backHref="/webinar" backLabel="Índice" />
    </Suspense>
  );
}
