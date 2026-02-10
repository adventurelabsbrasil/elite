import { TrendingUp, BarChart3, Cog, Handshake } from "lucide-react";
import { CtaButton } from "@/components/Form/CtaButton";

const benefits = [
  {
    icon: TrendingUp,
    title: "Performance e Lucratividade",
    description:
      "Você vai dominar o retorno sobre seus investimentos, batendo metas de lançamento em tempo recorde (48h) e reduzindo drasticamente o seu CAC através de inteligência de mídia de alta precisão.",
  },
  {
    icon: BarChart3,
    title: "Previsibilidade e Dados",
    description:
      'Você terá paz mental com o rastreamento total dos seus investimentos. Chega de "achismos": visualize o ROI real unificado e tenha previsibilidade de receita com um funil de dados rastreável.',
  },
  {
    icon: Cog,
    title: "Sistemas e Automação",
    description:
      'Você vai implementar um ecossistema Martech eficiente e processos que não dependem de "talentos individuais" para funcionar. Crie uma máquina escalável com réguas de relacionamento automáticas.',
  },
  {
    icon: Handshake,
    title: "Alinhamento e Crescimento",
    description:
      "Você vai eliminar o conflito entre Marketing e Vendas com um time de total sintonia, aumentando o lucro da sua empresa ao vender com equipe própria de estratégias de otimização.",
  },
];

export function Benefits() {
  return (
    <section className="py-20 bg-elite-navy/95">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-elite-quartz mb-4">
            🏆 O que você vai conquistar
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-elite-navy/80 rounded-xl p-8 border border-elite-flow/20 shadow-sm hover:border-elite-flow/30 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-elite-flow/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-elite-flow" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-semibold text-elite-quartz mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-elite-quartz/80 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-10">
          <CtaButton>Quero garantir minha vaga</CtaButton>
        </div>
      </div>
    </section>
  );
}
