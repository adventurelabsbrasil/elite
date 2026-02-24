import Link from "next/link";
import { ModuleLink } from "@/components/Webinar/ModuleLink";

const MODULES = [
  {
    href: "/webinar/planejamento",
    title: "1. Planejamento Estratégico",
    description:
      "Etapas fundamentais, papéis e responsabilidades, documentos essenciais, KPIs e boas práticas.",
  },
  {
    href: "/webinar/etapas",
    title: "2. Etapas da campanha",
    description:
      "Branding → Teaser → Pré-lançamento → Lançamento → Pós-lançamento (durações e lembretes).",
  },
  {
    href: "/webinar/marketing-pre",
    title: "3. Planejamento MKT pré-lançamento",
    description:
      "Estratégia, Desenvolvimento e produção, Revisão e configuração, Veiculação, Análise e otimização.",
  },
  {
    href: "/webinar/marketing-equipe",
    title: "4. Atividades e funções do Marketing",
    description: "Objetivo da equipe, responsabilidades e atividades detalhadas.",
  },
  {
    href: "/webinar/consideracoes",
    title: "5. Considerações nos próximos lançamentos",
    description:
      "Estratégia e pesquisa, materiais, processos, parceiros, campanhas, eventos e gestão de crise.",
  },
  {
    href: "/webinar/operacao-e-resultados",
    title: "6. Operação e resultados",
    description: "Eventos e lançamento, gestão de crise e histórico de lançamentos.",
  },
];

export default function WebinarLandingPage() {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <p className="text-sm font-medium uppercase tracking-wider text-elite-flow">
          Webinar ELITE
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-elite-quartz leading-tight">
          A estratégia de lançamento imobiliário com tecnologia para escala
        </h1>
        <p className="text-lg text-elite-quartz/85 max-w-2xl mx-auto">
          Apresentação em formato de slides, ~45 min. Use as setas do teclado ou toque em Próximo
          para avançar.
        </p>
        <Link
          href="/webinar/planejamento"
          className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-xl font-medium text-elite-navy bg-elite-flow hover:bg-elite-flow/90 transition-colors focus:outline-none focus:ring-2 focus:ring-elite-flow/50 focus:ring-offset-2 focus:ring-offset-elite-navy"
        >
          Iniciar apresentação
        </Link>
      </div>

      <nav
        className="grid gap-4 sm:gap-5"
        aria-label="Módulos do webinar"
      >
        {MODULES.map((mod) => (
          <ModuleLink
            key={mod.href}
            href={mod.href}
            title={mod.title}
            description={mod.description}
          />
        ))}
      </nav>

      <div className="pt-4 text-center">
        <Link
          href="/"
          className="text-sm text-elite-flow hover:text-elite-flow/80 transition-colors underline underline-offset-2"
        >
          Voltar ao site ELITE
        </Link>
      </div>
    </div>
  );
}
