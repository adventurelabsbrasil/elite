"use client";

import { Calendar } from "lucide-react";
import { useFormModal } from "@/components/Form/FormModal";

export function Hero() {
  const { openForm } = useFormModal();
  return (
    <section className="relative min-h-screen flex items-center justify-center text-elite-quartz pt-20 overflow-hidden">
      {/* Background: loteamento em obras (quase transparente). public/loteamento-obras.jpg (~116 KB). */}
      <div
        className="absolute inset-0 bg-elite-navy"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/loteamento-obras.jpg')",
          opacity: 0.4,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-elite-navy/65" aria-hidden />
      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Tarja em linha própria; abaixo, headline e foto alinhados pelo topo */}
        <div className="flex justify-center w-full mb-6 lg:mb-8">
          <div className="bg-elite-sold-red py-2.5 px-5 text-center w-full max-w-max mx-auto">
            <span className="text-white font-semibold text-sm uppercase tracking-wide">
              Exclusivo para{" "}
              <span className="text-elite-flow font-bold">Dono de Loteadora</span>
              {" "}e incorporadoras
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-start">
          <div className="space-y-4 md:space-y-5">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-balance leading-tight">
                Eu vou revelar a{" "}
                <span className="text-elite-flow">Estratégia de Marketing</span> que usei para lançar{" "}
                <span className="text-elite-glow">+2500 imóveis</span>, com clareza de ROI e vendendo{" "}
                <span className="text-elite-flow">5x mais rápido</span> que a concorrência.
              </h1>

              <p className="text-lg md:text-xl text-elite-quartz/90 leading-relaxed">
                Vou abrir os bastidores de 10 anos de experiência e{" "}
                <strong className="text-elite-flow">
                  R$ 2 milhões em budget gerenciados
                </strong>{" "}
                para você implementar a máquina de vendas que traz previsibilidade
                total de VGV, eliminando o &quot;achismo&quot; e o desperdício em
                mídia.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-elite-navy/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-elite-flow/20">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-elite-flow flex-shrink-0" />
              <div>
                <p className="font-bold text-base md:text-lg">
                  Aula gratuita — Terça às 16h (vagas limitadas)
                </p>
                <p className="text-sm text-elite-quartz/80 italic">
                  MEET EXCLUSIVO: O MÉTODO ELITE
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openForm}
              className="inline-block w-full sm:w-auto bg-elite-cta hover:bg-green-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-colors text-center text-base md:text-lg ring-2 ring-green-400/50 shadow-[0_0_20px_var(--color-elite-cta-glow)] hover:ring-green-300 hover:shadow-[0_0_24px_var(--color-elite-cta-glow)]"
            >
              Garanta sua vaga gratuita
            </button>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] md:max-w-[380px] min-h-[280px] lg:min-h-[360px] rounded-2xl overflow-hidden shadow-2xl bg-elite-navy/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/partnership.png"
                alt="Parcerias e colaboração profissional - Método ELITE"
                className="w-full h-full object-contain"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
