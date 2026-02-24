import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";

const STEPS: RevealStep[] = [
  {
    title: "Objetivo da equipe de Marketing",
    content: (
      <p>
        Dar suporte operacional e criativo às ações de marketing da empresa, atuando de forma
        colaborativa na produção de conteúdo, organização de campanhas, gestão de sistemas e
        relacionamento com fornecedores, garantindo a execução eficiente do plano de comunicação e
        a presença da marca nos canais digitais e físicos.
      </p>
    ),
  },
  {
    title: "Responsabilidades – Relatórios, Criação e Publicação",
    content: (
      <div className="space-y-4">
        <div>
          <p className="font-medium text-elite-flow mb-1">Relatórios e Monitoramento</p>
          <ul className="text-sm space-y-1">
            <li>Elaborar relatórios diários com registro de atividades, bloqueios e entregas.</li>
            <li>Atualizar e acompanhar indicadores de desempenho das campanhas e ações.</li>
            <li>Analisar resultados de campanhas (Meta Ads, Google Ads, etc.) e gerar insights.</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-elite-flow mb-1">Criação e Edição de Conteúdo</p>
          <ul className="text-sm space-y-1">
            <li>Apoiar na produção e edição de peças gráficas e audiovisuais para campanhas digitais e materiais físicos.</li>
            <li>Realizar ajustes em apresentações, fichas técnicas, folders, brindes, placas e sinalizações.</li>
            <li>Criar conteúdo para páginas de destino (LPs), e-mails marketing e redes sociais.</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-elite-flow mb-1">Publicação e Programação de Mídia</p>
          <ul className="text-sm space-y-1">
            <li>Publicar conteúdos pagos e orgânicos nas plataformas Meta Ads, Google Ads e redes sociais.</li>
            <li>Programar e agendar conteúdos de acordo com o cronograma editorial.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Responsabilidades – Integrações, Financeiro e Comunicação",
    content: (
      <div className="space-y-4">
        <div>
          <p className="font-medium text-elite-flow mb-1">Integrações e Ferramentas de Marketing</p>
          <ul className="text-sm space-y-1">
            <li>Auxiliar na criação e revisão de automações e integrações (RD Station, Make, SellFlux).</li>
            <li>Criar e editar formulários de captação de leads.</li>
            <li>Gerenciar dados de leads (importação, limpeza, exportação) no CRM.</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-elite-flow mb-1">Financeiro e Compras</p>
          <ul className="text-sm space-y-1">
            <li>Solicitar pagamentos e controlar envio de notas fiscais e boletos.</li>
            <li>Solicitar cotações e acompanhar pedidos de produção de materiais.</li>
            <li>Negociar condições com fornecedores de marketing.</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-elite-flow mb-1">Comunicação e Relacionamento</p>
          <ul className="text-sm space-y-1">
            <li>Encaminhar leads para equipe comercial e parceiros.</li>
            <li>Atender leads e contatos via WhatsApp, quando necessário.</li>
            <li>Compartilhar pastas e documentos com a equipe e terceiros.</li>
            <li>Acompanhar pendências e cobrar entregas de fornecedores ou colegas.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Responsabilidades – Organização, Mídia e Reuniões",
    content: (
      <div className="space-y-4">
        <div>
          <p className="font-medium text-elite-flow mb-1">Organização e Planejamento</p>
          <ul className="text-sm space-y-1">
            <li>Atualizar cronogramas editoriais e publicitários.</li>
            <li>Participar do planejamento de campanhas e eventos.</li>
            <li>Organizar documentos, pastas e processos do setor de marketing.</li>
            <li>Contribuir com ideias e sugestões criativas para ações de conteúdo e divulgação.</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-elite-flow mb-1">Captação e Gestão de Mídia</p>
          <ul className="text-sm space-y-1">
            <li>Acompanhar sessões de fotos e vídeos.</li>
            <li>Organizar mídias captadas, realizar uploads/downloads e curadoria de imagens.</li>
            <li>Acompanhar o desenvolvimento de renders e vídeos externos.</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-elite-flow mb-1">Reuniões e Desenvolvimento</p>
          <ul className="text-sm space-y-1">
            <li>Participar de reuniões internas e com parceiros externos (agências, imobiliárias, consultores).</li>
            <li>Participar de treinamentos e dinâmicas para capacitação e integração da equipe.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Atividades detalhadas (resumo por categoria)",
    content: (
      <div className="space-y-3 text-sm">
        <p className="text-elite-quartz/80">
          As atividades detalhadas cobrem: 1) Relatórios e Análises (relatório diário, custo/vendas/VGV, campanhas, pagamento, indicadores); 2) Criação e Edição (campanhas digitais, materiais estáticos e motion, físicos, institucionais, web, email, identidade visual); 3) Publicação e Programação; 4) Integrações e Sistemas (implantação, RD/Make/SellFlux, formulários, leads, suporte, renovação, contas, atribuições); 5) Gestão Financeira e Compras; 6) Comunicação e Atendimento; 7) Reuniões e Treinamentos; 8) Captação e Gestão de Mídias; 9) Planejamento e Organização (cronogramas, campanhas, documentos, ideação).
        </p>
        <p className="text-elite-flow/90">
          Consulte o manual completo para a tabela completa de Categoria × Título × Descrição de cada atividade.
        </p>
      </div>
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
