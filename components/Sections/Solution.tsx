import Image from "next/image";
import { Target, Zap } from "lucide-react";
import { CtaButton } from "@/components/Form/CtaButton";

export function Solution() {
  return (
    <section className="relative py-20 overflow-hidden text-elite-quartz">
      {/* Background: young-team.avif um pouco mais visível */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/young-team.avif')",
          opacity: 0.48,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-elite-navy/80" aria-hidden />
      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
          <div className="flex flex-col items-center text-center gap-4 w-full">
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

          <div className="pt-4 md:pt-8 space-y-4 md:space-y-6 text-left">
            <p className="text-elite-quartz/80 leading-relaxed">
              O ELITE atua como o <strong>cérebro digital</strong> da
              loteadora. Ele integra todas as ferramentas de Martech para
              rastrear a jornada do comprador e implementa a cultura de
              Smarketing, garantindo que nenhum lead seja ignorado e que cada
              real investido em anúncios tenha um ROI comprovado.
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-elite-navy/50 backdrop-blur-sm rounded-xl p-6 border border-elite-flow/20 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg text-left">
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

              <div className="bg-elite-navy/50 backdrop-blur-sm rounded-xl p-6 border border-elite-flow/20 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg text-left">
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
            <div className="flex justify-center pt-4 md:pt-6">
              <CtaButton>Acessar o Método ELITE</CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
