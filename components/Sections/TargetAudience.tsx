import { CheckCircle2, XCircle } from "lucide-react";

const forWho = [
  'Você é dono de loteadora e investe alto em mídia, mas sente que está "no escuro" sem saber exatamente qual anúncio ou canal de venda está gerando o ROI real de cada empreendimento.',
  "Você está cansado do eterno conflito entre o Marketing, que entrega volume de leads, e o Comercial, que reclama da qualidade, enquanto o VGV (Valor Geral de Vendas) permanece estagnado.",
  'Você quer escala e previsibilidade, mas sua operação ainda é refém de planilhas de Excel fragmentadas e do "talento" individual de alguns corretores, em vez de um processo replicável.',
  'Você tem um estande de vendas que muitas vezes fica ocioso e sofre com leads que "esfriam" por falta de uma régua de relacionamento automática e um tempo de resposta (SLA) inferior a 5 minutos.',
  "Você deseja segurança para adquirir novos terrenos e lançar o próximo loteamento, sabendo que possui uma máquina de demanda represada capaz de vender 30% das unidades logo no primeiro dia.",
];

const notForWho =
  'Este programa não é para donos de loteadoras que buscam "atalhos mágicos" ou sorte, que não estão dispostos a integrar tecnologia (Martech) ao comercial e que preferem continuar tomando decisões milionárias baseadas apenas no "feeling", ignorando o que os dados do funil dizem.';

export function TargetAudience() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-elite-navy mb-4">
              Para quem é: Dono de Loteadora
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {forWho.map((item, index) => {
              const parts = item.split("Você");
              const boldPart = parts[0].trim();
              const restPart = parts.length > 1 ? `Você${parts[1]}` : "";

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-elite-quartz/50 rounded-xl p-6 border border-elite-navy/10"
                >
                  <CheckCircle2 className="w-6 h-6 text-elite-flow flex-shrink-0 mt-0.5" />
                  <p className="text-elite-navy/80 leading-relaxed text-lg">
                    {boldPart && (
                      <strong className="text-elite-navy">{boldPart} </strong>
                    )}
                    {restPart}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-elite-navy mb-4">
              🚫 Para quem NÃO é
            </h2>
          </div>
          <div className="flex items-start gap-4 bg-red-50 rounded-xl p-6 border border-red-200">
            <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-elite-navy/80 leading-relaxed text-lg">
              <strong className="text-elite-navy">
                Este programa não é para{" "}
              </strong>
              {notForWho.replace("Este programa não é para", "")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
