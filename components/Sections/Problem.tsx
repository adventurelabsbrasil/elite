import { AlertCircle, TrendingDown, Users, XCircle } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Estande vazio mesmo com anúncios",
    description:
      "O investimento em tráfego sobe, mas o número de visitas não acompanha.",
  },
  {
    icon: TrendingDown,
    title: "Leads baratos que não convertem",
    description:
      "Corretores reclamando que os leads são ruins. Lead barato é o maior prejuízo.",
  },
  {
    icon: Users,
    title: "Falta de previsibilidade de receita",
    description:
      "Não sabe qual anúncio trouxe o cliente que comprou. Sem visibilidade do funil.",
  },
  {
    icon: XCircle,
    title: "Desalinhamento entre Marketing e Vendas",
    description:
      "Marketing foca em lead barato, Vendas reclama da baixa qualidade. Times desalinhados.",
  },
];

export function Problem() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-elite-navy mb-4">
            Você já passou por isso?
          </h2>
          <p className="text-xl text-elite-navy/70 max-w-3xl mx-auto">
            Problemas comuns que impedem loteadoras de alcançar o esgotamento do
            VGV
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-elite-navy/10 bg-elite-quartz/50 hover:border-elite-flow/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-elite-navy/5 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-elite-navy" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-semibold text-elite-navy mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-elite-navy/70">{problem.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
