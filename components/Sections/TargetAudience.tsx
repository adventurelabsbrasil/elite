import { CheckCircle2, XCircle } from "lucide-react";
import { CtaButton } from "@/components/Form/CtaButton";

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
    <section className="py-12 lg:py-16 bg-elite-navy/95 min-h-0">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          <div>
            <div className="text-center lg:text-left mb-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-elite-quartz">
                Para quem é: Dono de Loteadora
              </h2>
            </div>
            <div className="space-y-4">
              {forWho.map((item, index) => {
                const parts = item.split("Você");
                const boldPart = parts[0].trim();
                const restPart = parts.length > 1 ? `Você${parts[1]}` : "";

                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-elite-navy/80 rounded-xl p-4 border border-elite-flow/20 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-elite-flow flex-shrink-0 mt-0.5" />
                    <p className="text-elite-quartz/90 leading-relaxed text-base">
                      {boldPart && (
                        <strong className="text-elite-quartz">{boldPart} </strong>
                      )}
                      {restPart}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-center lg:text-left mb-6">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-elite-quartz">
                🚫 Para quem NÃO é
              </h2>
            </div>
            <div className="flex items-start gap-3 bg-elite-sold-red/10 rounded-xl p-4 border-2 border-elite-sold-red transition-all duration-200 hover:scale-[1.01] hover:shadow-lg">
              <XCircle className="w-6 h-6 text-elite-sold-red flex-shrink-0 mt-0.5" />
              <p className="text-elite-quartz/90 leading-relaxed text-base">
                <strong className="text-elite-sold-red">
                  Este programa não é para{" "}
                </strong>
                {notForWho.replace("Este programa não é para", "")}
              </p>
            </div>
            <div className="flex justify-center lg:justify-start mt-6">
              <CtaButton>Esse programa é para mim</CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
