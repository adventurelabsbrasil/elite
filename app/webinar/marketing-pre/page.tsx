import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";

const STEPS: RevealStep[] = [
  {
    title: "1. Estratégia",
    content: (
      <>
        <ul className="space-y-2">
          <li>Análise SWOT</li>
          <li>Definir o ICP e o tom de voz da marca (produto)</li>
          <li>
            Estabelecer a jornada do cliente com disparos de email marketing e scripts comerciais
            para cada etapa da jornada
          </li>
          <li>Definir canais e orçamento da campanha</li>
          <li>Realizar reuniões bisemanais de alinhamento de equipe</li>
          <li>
            Criar uma ficha técnica do empreendimento com: Infraestrutura, Atributos, Quantidade de
            unidades e faseamento, Ticket médio, Especificações dos lotes, Implantação, Localização,
            Principais contatos de parceiros
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "2. Desenvolvimento e produção bruta",
    content: (
      <>
        <ul className="space-y-2">
          <li>
            Definir linha editorial clara e objetiva, antes das veiculações com todas as etapas:
            Branding, Teaser, Pré-lançamento, Pós-lançamento 90d
          </li>
          <li>Produzir materiais brutos físicos e digitais</li>
          <li>Realizar orçamentos de materiais e contratar fornecedores</li>
          <li>Mapear fornecedores e garantir que todos emitem NFe saibam nossas diretrizes de pagamento</li>
          <li>Criar campanhas com antecedência de acordo com o calendário editorial</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Revisão e configuração",
    content: (
      <>
        <ul className="space-y-2">
          <li>Revisar todos os materiais (organizar em pastas para uso interno e externo)</li>
          <li>Liberar físicos para produção</li>
          <li>Solicitar pagamentos</li>
          <li>Acompanhar produção de físicos</li>
          <li>Incluir saldo nas plataformas digitais</li>
          <li>Realizar visita ao local pelo menos 3 meses antes do início da campanha</li>
          <li>Mapear e ativar parceiros (relações públicas, imobiliárias, comércios)</li>
          <li>Plantão de vendas em funcionamento</li>
          <li>Programar escala de trabalho dos consultores</li>
          <li>
            Garantir que as automações e infraestrutura digital estejam TODAS funcionando
            corretamente: contratar domínio personalizado e integrar com CRM; configurar pixels,
            tag manager e tags de conversão de formulário; garantir o @ das redes sociais em caso de
            perfil exclusivo do empreendimento
          </li>
          <li>Criar planejador de palavras-chave no Google Ads</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Veiculação",
    content: (
      <ul className="space-y-2">
        <li>Programar e veicular campanhas</li>
        <li>
          Garantir que todas as páginas e perfis sociais estejam atualizados, com banners, capas e
          destaques
        </li>
        <li>Realizar backup diário de leads</li>
        <li>Realizar testes A/B de criativos estáticos e de landing pages</li>
      </ul>
    ),
  },
  {
    title: "5. Análise e otimização",
    content: (
      <ul className="space-y-2">
        <li>Garantir funcionalidade das integrações e dashboards em tempo real</li>
        <li>Analisar testes A/B e sugerir novas estratégias de otimização</li>
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
