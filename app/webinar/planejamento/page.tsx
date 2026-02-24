import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";

const STEPS: RevealStep[] = [
  {
    title: "Planejamento Estratégico – Visão geral",
    content: (
      <>
        <p className="mb-4">
          Desenvolvimento de plano de comunicação, definição de cronogramas de veiculação e
          orçamentos de marketing.
        </p>
        <p className="font-medium text-elite-flow mb-2">Etapas fundamentais:</p>
        <ul>
          <li>Definição de metas e KPIs</li>
          <li>Posicionamento/identidade</li>
          <li>Estratégias de marketing</li>
          <li>Definição/treinamento da equipe</li>
          <li>Criação de materiais de apoio</li>
          <li>Ações de prospecção imobiliárias</li>
          <li>Campanha Branding Institucional</li>
          <li>Projeção de orçamento por canais</li>
        </ul>
      </>
    ),
  },
  {
    title: "Papéis e responsabilidades",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-elite-flow/30">
              <th className="text-elite-flow py-2 pr-4">Função</th>
              <th className="text-elite-flow py-2 pr-4">Responsável</th>
              <th className="text-elite-flow py-2 pr-4">Principais atividades</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-elite-flow/10">
              <td className="py-2 pr-4">Comercial</td>
              <td className="py-2 pr-4">Carol Volpato</td>
              <td className="py-2 pr-4">
                Planejamento geral / alinhamento com áreas / treinamentos / organização dos eventos /
                acompanhamento de metas.
              </td>
            </tr>
            <tr className="border-b border-elite-flow/10">
              <td className="py-2 pr-4">Marketing</td>
              <td className="py-2 pr-4">Rodrigo Ribas</td>
              <td className="py-2 pr-4">Campanhas / peças gráficas / mídias.</td>
            </tr>
            <tr className="border-b border-elite-flow/10">
              <td className="py-2 pr-4">Direção</td>
              <td className="py-2 pr-4">Eduardo Tebaldi</td>
              <td className="py-2 pr-4">Definição budget / precificação / tabelas.</td>
            </tr>
            <tr className="border-b border-elite-flow/10">
              <td className="py-2 pr-4">Vendas</td>
              <td className="py-2 pr-4">Equipe de Consultores e Corretores</td>
              <td className="py-2 pr-4">
                Prospecção / atendimento / cadastramento de clientes / conversão.
              </td>
            </tr>
            <tr className="border-b border-elite-flow/10">
              <td className="py-2 pr-4">Administrativo</td>
              <td className="py-2 pr-4">Estágio Comercial</td>
              <td className="py-2 pr-4">
                Documentação / contratos imobiliárias / cadastros.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: "Documentos e materiais essenciais",
    content: (
      <ol className="list-decimal pl-5 space-y-1">
        <li>Renders</li>
        <li>Calendário editorial</li>
        <li>Vídeo do empreendimento</li>
        <li>Landing pages / hotsite</li>
        <li>Book com implantação</li>
        <li>Windbanners</li>
        <li>Cavaletes</li>
        <li>Folders</li>
        <li>Manual do empreendimento/objeções</li>
        <li>Ficha cadastro do cliente</li>
        <li>Manual de vendas</li>
      </ol>
    ),
  },
  {
    title: "Indicadores-chave (KPIs)",
    content: (
      <ul>
        <li>Volume de leads gerados no período por etapa</li>
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
    content: (
      <ul>
        <li>Alinhar marketing e vendas desde o início</li>
        <li>Trabalhar com gatilhos de escassez e urgência reais</li>
        <li>Ter pelo menos 3 ações no período de lançamento</li>
        <li>Garantir materiais prontos e acessíveis com antecedência</li>
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
