import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";

const STEPS: RevealStep[] = [
  {
    title: "1. Estratégia e pesquisa aprofundada",
    content: (
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Pesquisa de Público-Alvo Local:</strong> Antes de produzir qualquer material,
          realizar pesquisa aprofundada para compreender mentalidade, preferências (linguagem,
          conteúdo), valores e dores do público-alvo local (gírias, cultura, personalidades da
          região).
        </li>
        <li>
          <strong>Análise Competitiva Detalhada:</strong> Análise mais detalhada da concorrência em
          posicionamento comercial e de marketing, para ajustar rapidamente a comunicação e evitar
          ajustes tardios.
        </li>
        <li>
          <strong>Ficha Técnica do Empreendimento:</strong> Incluir todas as informações cruciais
          para todas as equipes; implantação detalhada com tamanhos de lotes e versão minimalista
          com legendas claras (cores, numeração lógica como A1, B15).
        </li>
        <li>
          <strong>Definição de Atributos e Fases para Renders:</strong> Definir atributos e
          divisão de fases antes da criação dos renders; garantir alinhamento com a oferta final
          (ex.: não mostrar casas em área comercial se houver lotes comerciais).
        </li>
      </ul>
    ),
  },
  {
    title: "2. Materiais e produção",
    content: (
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Antecipação na Produção de Materiais Físicos:</strong> Não deixar para depois do
          início do pré-lançamento; imprimir pastas e camisetas bem antes; para outdoors, evitar
          fundos escuros e usar comunicação objetiva.
        </li>
        <li>
          <strong>Qualidade dos Materiais Físicos:</strong> Investir em materiais de melhor
          qualidade (ex.: windbanners) e evitar fornecedores com histórico de produtos inferiores.
        </li>
        <li>
          <strong>Clareza com Fornecedores:</strong> Esclarecer condições de pagamento e entrega
          antes de contratar; mapear fornecedores validados.
        </li>
        <li>
          <strong>Vídeos e Conteúdo Digital:</strong> Vídeos longos para alcance; Motions/Reels/Shorts
          para desempenho; vídeos institucionais com marca/cidade/local nas primeiras cenas.
        </li>
        <li>
          <strong>Testes A/B e Hotsite x Landing Pages:</strong> Realizar testes A/B em criativos e
          landing pages; avaliar se hotsite ou LPs mais simples geram mais leads no pré-lançamento.
        </li>
        <li>
          <strong>Canais de Conteúdo:</strong> Incluir na lista: Meta, YouTube, Google Pesquisa,
          TikTok, WhatsApp, Email Marketing, rádio, jornal, influenciadores, carro de som,
          outdoor, revista, panfleto, banner, cavalete.
        </li>
      </ul>
    ),
  },
  {
    title: "3. Processos internos e ferramentas",
    content: (
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Organização de Arquivos:</strong> Estrutura de pastas padronizada no Google Drive
          (Planejamento, Desenvolvimento, Implementação, Mídia, Gestão comercial); pastas para
          Youngers, Corretores, Jornais/Publicidade/Propaganda.
        </li>
        <li>
          <strong>Ferramentas de Gerenciamento:</strong> Jira ou similar para tarefas, atribuições
          e progresso; aplicativo pode ser mais prático que planilhas para revisão com tags e prazos.
        </li>
        <li>
          <strong>Infraestrutura Digital e TI:</strong> Pixel, Analytics, DataStudio, UTM e CRM/MKT
          prontos no Setup; especialista para eventos de conversão no Analytics.
        </li>
        <li>
          <strong>Automação e Integração:</strong> Automações e integrações (ex.: Wix+Sellflux+RDCRM+Sheets+LookerStudio)
          perfeitas; considerar automação para bloquear lotes vendidos ao imprimir contratos.
        </li>
        <li>
          <strong>Backup de Leads:</strong> Backup diário; definir se WhatsApp ativo contabiliza
          corretamente no RD Station.
        </li>
      </ul>
    ),
  },
  {
    title: "4. Parceiros e equipe",
    content: (
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Treinamento Imobiliárias/Corretores:</strong> Treinamentos mais aprofundados e
          contínuos; reuniões semanais, controle por leads/pontuação ou comissão diferenciada.
        </li>
        <li>
          <strong>Contratos com Influenciadores/Parceiros:</strong> Formalizar antes do início da
          campanha, com expectativas e condições claras.
        </li>
        <li>
          <strong>Cadastro para Corretores:</strong> Simplificar: dados básicos na primeira etapa,
          detalhados na segunda, ou envio de fotos das fichas via WhatsApp.
        </li>
        <li>
          <strong>Estrutura da Equipe de Vendas:</strong> Avaliar dois consultores e um assistente;
          considerar SDR para qualificação rápida de leads; consultores focados só em vendas.
        </li>
        <li>
          <strong>Gestão da Equipe em Campo:</strong> Planejar ida para a cidade (administração 30
          dias antes, consultores 1 semana antes do teaser); escala e plano de folgas/férias.
        </li>
        <li>
          <strong>Líder de Viagem/Hospedagem:</strong> Designar líder com diretrizes claras.
        </li>
      </ul>
    ),
  },
  {
    title: "5. Campanhas digitais e análise",
    content: (
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Comunicação de Preço:</strong> Ser claro com corretores (à vista e parcelado);
          avaliar preço como argumento da campanha; para fichas de intenção, mais informações de
          preços/parcelas se o objetivo for testar sucesso comercial antes de lançar.
        </li>
        <li>
          <strong>Otimização do Tráfego Pago:</strong> Evitar muitos objetivos simultâneos;
          concentrar em uma estratégia principal (hotsite ou mensagens).
        </li>
        <li>
          <strong>E-mail Marketing:</strong> No máximo semanal no auge; agendar com 7 dias de
          antecedência.
        </li>
        <li>
          <strong>Engajamento da Base:</strong> Comercial cadastrar e-mails no RD Station
          prontamente.
        </li>
        <li>
          <strong>Spotify, TikTok Ads:</strong> TikTok para branding e prova social; mais testes
          no pré-lançamento.
        </li>
        <li>
          <strong>Monitoramento de Leads:</strong> Relatório diário do funil de marketing.
        </li>
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
