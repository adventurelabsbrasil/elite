import { CheckCircle2 } from "lucide-react";
import { CtaButton } from "@/components/Form/CtaButton";

const highlights = [
  "+2.500 imóveis lançados ao mercado com estratégias de alta performance.",
  "Case de Sucesso Absoluto: 100% das unidades vendidas em um único dia.",
  "Mais de R$ 2 milhões gerenciados em budget de mídia com rastreamento total de ROI.",
  "10 anos de expertise em Martech unindo tecnologia, CRM e processos de vendas.",
  "Coordenação de 5 grandes lançamentos imobiliários de alto impacto.",
];

export function About() {
  return (
    <section className="py-12 lg:py-16 bg-elite-navy/90">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12 lg:space-y-16">
          {/* Bloco 1: texto sobre Rodrigo + foto Rodrigo (ribas-young.jpg) */}
          <div className="grid md:grid-cols-[1fr_auto] gap-8 lg:gap-10 items-start text-center md:text-left">
            <div className="space-y-4 min-w-0 order-2 md:order-1">
              <h3 className="text-xl lg:text-2xl font-display font-bold text-elite-quartz">
                Rodrigo Ribas
              </h3>
              <p className="text-base text-elite-quartz/90 leading-relaxed">
                é o founder da{" "}
                <strong className="text-elite-quartz">Adventure Labs</strong> e o
                nome por trás de estratégias que moldaram o novo padrão de{" "}
                <strong className="text-elite-flow">lançamentos imobiliários</strong>. Com um perfil raro que une a visão
                criativa do Design à precisão técnica do{" "}
                <strong className="text-elite-flow">Martech</strong>, ele construiu
                uma trajetória de 10 anos dominando dados, tecnologia e
                comportamento de consumo.
              </p>
              <p className="text-base text-elite-quartz/90 leading-relaxed">
                Sua experiência consolidada na{" "}
                <strong className="text-elite-quartz">
                  Young Empreendimentos
                </strong>{" "}
                permitiu o desenvolvimento de uma metodologia validada no
                &quot;campo de batalha&quot;. Rodrigo não entrega apenas
                tráfego; ele entrega <strong className="text-elite-flow">inteligência de vendas</strong> que transforma
                investimentos em VGV real, garantindo que o dono da
                loteadora tenha muito mais controle sobre cada real gerenciado.
              </p>
            </div>
            <div className="relative flex-shrink-0 w-full max-w-[280px] lg:max-w-[320px] mx-auto md:mx-0 order-1 md:order-2">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ribas-young.jpg"
                  alt="Rodrigo Ribas no campo - Método ELITE"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bloco 2: destaques do estrategista + partnership.png */}
          <div className="grid md:grid-cols-[auto_1fr] gap-8 lg:gap-10 items-start text-center md:text-left">
            <div className="relative flex-shrink-0 w-full max-w-[280px] lg:max-w-[320px] mx-auto md:mx-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/partnership.png"
                  alt="Parcerias e colaboração profissional - Método ELITE"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-4 min-w-0 [&_ul]:text-left">
              <div className="pt-0 border-t border-elite-flow/20">
                <h4 className="text-lg font-display font-semibold text-elite-quartz mb-3">
                  Destaques do Estrategista
                </h4>
                <ul className="space-y-2">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-elite-flow flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-elite-quartz/90">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center pt-4">
                <CtaButton>Quero minha vaga</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
