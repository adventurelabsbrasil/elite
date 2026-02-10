import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "+2.500 imóveis lançados ao mercado com estratégias de alta performance.",
  "Case de Sucesso Absoluto: 100% das unidades vendidas em um único dia.",
  "Mais de R$ 2 milhões gerenciados em budget de mídia com rastreamento total de ROI.",
  "10 anos de expertise em Martech unindo tecnologia, CRM e processos de vendas.",
  "Coordenação de 5 grandes lançamentos imobiliários de alto impacto.",
];

export function About() {
  return (
    <section className="py-20 bg-elite-navy/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-elite-quartz mb-4">
              O Estrategista por trás do Método ELITE
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/ribas-young.jpg"
                  alt="Rodrigo Ribas - Founder da Adventure Labs"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold text-elite-quartz">
                  Rodrigo Ribas
                </h3>
                <p className="text-lg text-elite-quartz/90 leading-relaxed">
                  é o founder da{" "}
                  <strong className="text-elite-quartz">Adventure Labs</strong> e o
                  nome por trás de estratégias que moldaram o novo padrão de
                  lançamentos imobiliários. Com um perfil raro que une a visão
                  criativa do Design à precisão técnica do Martech, ele construiu
                  uma trajetória de 10 anos dominando dados, tecnologia e
                  comportamento de consumo.
                </p>
                <p className="text-lg text-elite-quartz/90 leading-relaxed">
                  Sua experiência consolidada na{" "}
                  <strong className="text-elite-quartz">
                    Young Empreendimentos
                  </strong>{" "}
                  permitiu o desenvolvimento de uma metodologia validada no
                  &quot;campo de batalha&quot;. Rodrigo não entrega apenas
                  tráfego; ele entrega inteligência de vendas que transforma
                  investimentos em VGV esgotado, garantindo que o dono da
                  loteadora tenha controle absoluto sobre cada real gerenciado.
                </p>
              </div>

              <div className="pt-6 border-t border-elite-flow/20">
                <h4 className="text-xl font-display font-semibold text-elite-quartz mb-4">
                  Destaques de Autoridade
                </h4>
                <ul className="space-y-3">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-elite-flow flex-shrink-0 mt-0.5" />
                      <span className="text-elite-quartz/90">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
