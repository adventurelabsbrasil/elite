import { CheckCircle2, XCircle } from "lucide-react";
import { CtaButton } from "@/components/Form/CtaButton";

const forWho = [
  'Você é dono de loteadora e investe alto em mídia, mas sente que está "no escuro" sem saber exatamente qual anúncio ou canal de venda está gerando o ROI real de cada empreendimento.',
  "Você está cansado do eterno conflito entre o Marketing, que entrega volume de leads, e o Comercial, que reclama da qualidade, enquanto o VGV (Valor Geral de Vendas) permanece estagnado.",
  'Você quer escala e previsibilidade, mas sua operação ainda é refém de planilhas de Excel fragmentadas e do "talento" individual de alguns corretores, em vez de um processo replicável.',
  'Você tem um estande de vendas que muitas vezes fica ocioso e sofre com leads que "esfriam" por falta de uma régua de relacionamento automática e um tempo de resposta (SLA) inferior a 5 minutos.',
  "Você deseja segurança para adquirir novos terrenos e lançar o próximo loteamento, sabendo que possui uma máquina de demanda represada capaz de vender 30% das unidades logo no primeiro dia.",
];

const commonEnemyItems = [
  "Quem aposta em atalhos e sorte em vez de sistema e dados.",
  "Quem não quer integrar tecnologia (Martech) ao comercial e prefere decidir por “feeling”.",
  "Quem ignora o que o funil diz e continua tomando decisões milionárias no escuro.",
];

export function TargetAudience() {
  return (
    <>
      {/* Seção 1: Para quem é — uma dobra */}
      <section className="py-12 lg:py-16 bg-elite-navy/95 min-h-0">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-elite-quartz">
              Para quem é: Dono de Loteadora
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
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
                  <p className="text-elite-quartz/90 leading-relaxed text-sm">
                    {boldPart && (
                      <strong className="text-elite-quartz">{boldPart} </strong>
                    )}
                    {restPart}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-8">
            <CtaButton>Esse programa é para mim</CtaButton>
          </div>
        </div>
      </section>

      {/* Seção 2: Para quem NÃO é — uma dobra */}
      <section className="py-12 lg:py-16 bg-elite-navy/90 min-h-0">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-elite-quartz">
              Para quem não é:
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {commonEnemyItems.map((text, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-elite-sold-red/10 rounded-xl p-4 border-2 border-elite-sold-red/40 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
              >
                <XCircle className="w-5 h-5 text-elite-sold-red flex-shrink-0 mt-0.5" />
                <p className="text-elite-quartz/90 leading-relaxed text-sm">
                  {text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <CtaButton>Quero minha vaga</CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
