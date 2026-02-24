import { Suspense } from "react";
import { RevealDeck, type RevealStep } from "@/components/Webinar/RevealDeck";
import { CalendarCheck, AlertTriangle, History } from "lucide-react";

const STEPS: RevealStep[] = [
  {
    title: "Eventos e lançamento – Checklist (1/2)",
    icon: <CalendarCheck className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Orçamentos, fornecedores e materiais contratados com 30 dias de antecedência.</li>
        <li>Contrato de prestação de serviço assinado antes do dia do evento.</li>
        <li>Pagamentos em totalidade somente após a entrega do serviço.</li>
      </ul>
    ),
  },
  {
    title: "Eventos e lançamento – Checklist (2/2)",
    icon: <CalendarCheck className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <ul className="space-y-2">
        <li>Logística de funcionamento e montagem verificada com o responsável pela obra.</li>
        <li>Impressão dos miolos uma semana antes.</li>
        <li>Minuta final ao RI para validação antes de imprimir.</li>
      </ul>
    ),
  },
  {
    title: "Gestão de crise",
    icon: <AlertTriangle className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <p>
        Processo formal para situações de crise (enchentes, embargos): reunião com envolvidos
        (comercial, engenharia) para definir resposta e comunicação padrão clara da empresa.
      </p>
    ),
  },
  {
    title: "Histórico de lançamentos",
    icon: <History className="h-8 w-8 sm:h-9 sm:w-9" />,
    content: (
      <>
        <p className="text-sm text-elite-quartz/80 mb-4">
          Lições aprendidas: Algarve, Parque Lorena 2, Morada da Coxilha, Érico Veríssimo.
        </p>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full border-collapse min-w-[360px] text-sm">
            <thead>
              <tr className="border-b border-elite-flow/30">
                <th className="text-elite-flow py-2 pr-3 text-left">Data</th>
                <th className="text-elite-flow py-2 pr-3 text-left">Empreendimento</th>
                <th className="text-elite-flow py-2 pr-3 text-left">Leads</th>
                <th className="text-elite-flow py-2 pr-3 text-left">Fichas</th>
                <th className="text-elite-flow py-2 pr-3 text-left">Vendas</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-elite-flow/10"><td className="py-2 pr-3">10/mai./2025</td><td className="py-2 pr-3">Erico Verissimo</td><td className="py-2 pr-3">2050</td><td className="py-2 pr-3">437</td><td className="py-2 pr-3">66</td></tr>
              <tr className="border-b border-elite-flow/10"><td className="py-2 pr-3">02/fev./2025</td><td className="py-2 pr-3">Morada da Coxilha</td><td className="py-2 pr-3">2441</td><td className="py-2 pr-3">132</td><td className="py-2 pr-3">4</td></tr>
              <tr className="border-b border-elite-flow/10"><td className="py-2 pr-3">14/abr./2024</td><td className="py-2 pr-3">Aurora</td><td className="py-2 pr-3">—</td><td className="py-2 pr-3">514</td><td className="py-2 pr-3">115</td></tr>
              <tr className="border-b border-elite-flow/10"><td className="py-2 pr-3">nov./2023</td><td className="py-2 pr-3">Algarve</td><td className="py-2 pr-3">—</td><td className="py-2 pr-3">31</td><td className="py-2 pr-3">6</td></tr>
              <tr className="border-b border-elite-flow/10"><td className="py-2 pr-3">abr./2023</td><td className="py-2 pr-3">Parque Lorena 2</td><td className="py-2 pr-3">622</td><td className="py-2 pr-3">—</td><td className="py-2 pr-3">82</td></tr>
              <tr className="border-b border-elite-flow/10"><td className="py-2 pr-3">mar./2022</td><td className="py-2 pr-3">Parque Lorena 1</td><td className="py-2 pr-3">90</td><td className="py-2 pr-3">446</td><td className="py-2 pr-3">153</td></tr>
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
