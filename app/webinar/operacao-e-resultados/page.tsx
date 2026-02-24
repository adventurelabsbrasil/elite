import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";

const STEPS: RevealStep[] = [
  {
    title: "Eventos e lançamento – Checklist",
    content: (
      <ul className="space-y-2">
        <li>Todos os orçamentos, fornecedores e materiais contratados com antecedência de 30 dias da data do evento.</li>
        <li>Todos os fornecedores com contrato de prestação de serviço assinado antes do dia do evento.</li>
        <li>Pagamentos realizados em totalidade somente após a entrega do serviço.</li>
        <li>Logística necessária para funcionamento e montagem verificada junto ao responsável pela obra.</li>
        <li>Impressão dos miolos uma semana antes.</li>
        <li>Envio da minuta final ao RI para validação e correções antes de imprimir.</li>
      </ul>
    ),
  },
  {
    title: "Gestão de crise e melhoria contínua",
    content: (
      <>
        <p className="font-medium text-elite-flow mb-2">Processo de Crise</p>
        <p className="mb-4">
          Criar um processo formal para lidar com situações de crise (ex.: enchentes, embargos de
          obra), incluindo uma reunião com todos os envolvidos na cidade (comercial, engenharia) para
          definir uma resposta e comunicação padrão clara da empresa.
        </p>
      </>
    ),
  },
  {
    title: "Histórico de lançamentos",
    content: (
      <>
        <p className="text-sm text-elite-quartz/80 mb-4">
          Referências de lições aprendidas: Algarve, Parque Lorena 2, Morada da Coxilha, Érico
          Veríssimo (documentos no manual).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[400px]">
            <thead>
              <tr className="border-b border-elite-flow/30">
                <th className="text-elite-flow py-2 pr-4 text-left">Data do evento</th>
                <th className="text-elite-flow py-2 pr-4 text-left">Empreendimento</th>
                <th className="text-elite-flow py-2 pr-4 text-left">Leads</th>
                <th className="text-elite-flow py-2 pr-4 text-left">Fichas/Reservas</th>
                <th className="text-elite-flow py-2 pr-4 text-left">Vendas</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-elite-flow/10">
                <td className="py-2 pr-4">10/mai./2025</td>
                <td className="py-2 pr-4">Erico Verissimo</td>
                <td className="py-2 pr-4">2050</td>
                <td className="py-2 pr-4">437</td>
                <td className="py-2 pr-4">66</td>
              </tr>
              <tr className="border-b border-elite-flow/10">
                <td className="py-2 pr-4">02/fev./2025</td>
                <td className="py-2 pr-4">Morada da Coxilha</td>
                <td className="py-2 pr-4">2441</td>
                <td className="py-2 pr-4">132</td>
                <td className="py-2 pr-4">4</td>
              </tr>
              <tr className="border-b border-elite-flow/10">
                <td className="py-2 pr-4">14/abr./2024</td>
                <td className="py-2 pr-4">Aurora</td>
                <td className="py-2 pr-4">—</td>
                <td className="py-2 pr-4">514</td>
                <td className="py-2 pr-4">115</td>
              </tr>
              <tr className="border-b border-elite-flow/10">
                <td className="py-2 pr-4">nov./2023</td>
                <td className="py-2 pr-4">Algarve</td>
                <td className="py-2 pr-4">—</td>
                <td className="py-2 pr-4">31</td>
                <td className="py-2 pr-4">6</td>
              </tr>
              <tr className="border-b border-elite-flow/10">
                <td className="py-2 pr-4">abr./2023</td>
                <td className="py-2 pr-4">Parque Lorena 2</td>
                <td className="py-2 pr-4">622</td>
                <td className="py-2 pr-4">—</td>
                <td className="py-2 pr-4">82</td>
              </tr>
              <tr className="border-b border-elite-flow/10">
                <td className="py-2 pr-4">mar./2022</td>
                <td className="py-2 pr-4">Parque Lorena 1</td>
                <td className="py-2 pr-4">90</td>
                <td className="py-2 pr-4">446</td>
                <td className="py-2 pr-4">153</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
];

export default function OperacaoEResultadosPage() {
  return (
    <Suspense fallback={<div className="text-elite-quartz/70">Carregando...</div>}>
      <RevealDeck steps={STEPS} backHref="/webinar" backLabel="Índice" />
    </Suspense>
  );
}
