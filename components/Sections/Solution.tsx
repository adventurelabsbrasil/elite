import { Target, Zap } from "lucide-react";
import { CtaButton } from "@/components/Form/CtaButton";
import { EliteReveal } from "./EliteReveal";

export function Solution() {
  return (
    <section className="py-20 bg-gradient-to-br from-elite-navy to-elite-navy/90 text-elite-quartz">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-balance">
              A Solução: Método <span className="text-elite-flow">ELITE</span>
            </h2>
          </div>

          <div className="pt-8 space-y-6 text-left">
            <EliteReveal />
            <p className="text-elite-quartz/80 leading-relaxed">
              O ELITE atua como o <strong>cérebro digital</strong> da
              loteadora. Ele integra todas as ferramentas de Martech para
              rastrear a jornada do comprador e implementa a cultura de
              Smarketing, garantindo que nenhum lead seja ignorado e que cada
              real investido em anúncios tenha um ROI comprovado.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-elite-navy/50 backdrop-blur-sm rounded-xl p-6 border border-elite-flow/20 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg">
                <div className="flex items-center gap-4 mb-3">
                  <Target className="w-8 h-8 text-elite-glow flex-shrink-0" />
                  <h4 className="text-xl font-display font-semibold text-elite-quartz">
                    Transformação Completa
                  </h4>
                </div>
                <p className="text-elite-quartz/80">
                  Transformamos sua loteadora em uma máquina de vendas
                  previsível, onde cada real investido é rastreado e cada lead é
                  aproveitado.
                </p>
              </div>

              <div className="bg-elite-navy/50 backdrop-blur-sm rounded-xl p-6 border border-elite-flow/20 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg">
                <div className="flex items-center gap-4 mb-3">
                  <Zap className="w-8 h-8 text-elite-glow flex-shrink-0" />
                  <h4 className="text-xl font-display font-semibold text-elite-quartz">
                    Alinhamento Total
                  </h4>
                </div>
                <p className="text-elite-quartz/80">
                  Marketing e Vendas jogam no mesmo time para bater as metas de
                  VGV e esgotar o lançamento no prazo.
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-6">
              <CtaButton>Acessar o Método ELITE</CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
