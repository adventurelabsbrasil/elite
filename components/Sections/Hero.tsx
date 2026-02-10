import { Calendar } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-elite-quartz pt-20 overflow-hidden">
      {/* Background: loteamento em obras (quase transparente). Coloque public/loteamento-obras.jpg para ativar. */}
      <div
        className="absolute inset-0 bg-elite-navy"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/loteamento-obras.jpg')",
          opacity: 0.2,
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-elite-navy/85" aria-hidden />
      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="w-full">
              <div className="bg-elite-sold-red py-2.5 px-4 text-center">
                <span className="text-white font-semibold text-sm uppercase tracking-wide">
                  Exclusivo para donos de loteadoras e incorporadoras
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-balance leading-tight">
                A Estratégia Martech de quem lançou{" "}
                <span className="text-elite-flow">+2.500 Imóveis</span> e Esgotou
                um Loteamento em um{" "}
                <span className="text-elite-glow">Único Dia.</span>
              </h1>

              <p className="text-xl md:text-2xl text-elite-quartz/90 leading-relaxed">
                Vou abrir os bastidores de 10 anos de experiência e{" "}
                <strong className="text-elite-flow">
                  R$ 2 milhões em budget gerenciados
                </strong>{" "}
                para você implementar a máquina de vendas que traz previsibilidade
                total de VGV, eliminando o &quot;achismo&quot; e o desperdício em
                mídia.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-elite-navy/50 backdrop-blur-sm rounded-xl p-4 border border-elite-flow/20">
              <Calendar className="w-6 h-6 text-elite-flow flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">
                  10/02 - TERÇA-FEIRA - 16:00
                </p>
                <p className="text-sm text-elite-quartz/80 italic">
                  MEET EXCLUSIVO: O MÉTODO ELITE
                </p>
              </div>
            </div>

            <a
              href="#form"
              className="inline-block w-full sm:w-auto bg-elite-cta hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-center text-lg ring-2 ring-green-400/50 shadow-[0_0_20px_var(--color-elite-cta-glow)] hover:ring-green-300 hover:shadow-[0_0_24px_var(--color-elite-cta-glow)]"
            >
              QUERO ACESSAR O MÉTODO ELITE
            </a>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Ribas-Young.png"
                alt="Rodrigo Ribas - Founder da Adventure Labs"
                className="absolute inset-0 w-full h-full object-cover"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
