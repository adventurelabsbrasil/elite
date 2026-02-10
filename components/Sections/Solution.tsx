import Image from "next/image";
import { Target, Zap } from "lucide-react";
import { CtaButton } from "@/components/Form/CtaButton";

export function Solution() {
  return (
    <section className="py-20 bg-gradient-to-br from-elite-navy to-elite-navy/90 text-elite-quartz">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6 md:gap-10">
            <div className="relative w-full max-w-[200px] md:max-w-[240px] aspect-[3/4] rounded-xl overflow-hidden shadow-xl mx-auto md:mx-0 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Ribas-Young.png"
                alt="Rodrigo Ribas - Founder da Adventure Labs"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-center text-center md:text-left md:items-start gap-4">
              <Image
                src="/Mono_Light.png"
                alt="Método ELITE"
                width={320}
                height={104}
                className="h-24 md:h-28 w-auto opacity-95"
              />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-balance">
                A Solução: Método <span className="text-elite-flow">ELITE</span>
              </h2>
            </div>
          </div>

          <div className="pt-8 space-y-6 text-left">
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
