"use client";

import { Button } from "@/components/ui/button";
import {
  LucideBarChart2,
  LucideLayoutDashboard,
  LucideCog,
  LucideHandshake,
  LucideCheck,
  LucideX,
} from "lucide-react";

const CTA_URL = "/inscreva-se"; // formulário de inscrição (Supabase leads)

export default function EliteLanding() {
  return (
    <div className="min-h-screen bg-elite-navy text-elite-quartz">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-elite-navy/80 bg-gradient-to-b from-elite-navy to-elite-navy/90 px-6 py-16 text-center md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 bg-elite-sold-red py-2.5 px-4 text-center">
            <p className="text-white text-sm font-semibold uppercase tracking-wide">
              Exclusivo para donos de loteadoras e incorporadoras
            </p>
          </div>
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl text-elite-quartz">
            A Estratégia Martech de quem lançou{" "}
            <span className="text-elite-flow">+2.500 Imóveis</span> e esgotou um
            loteamento em um{" "}
            <span className="text-elite-glow">único dia.</span>
          </h1>
          <p className="mb-8 text-lg text-elite-quartz/90 md:text-xl">
            Vou abrir os bastidores de 10 anos de experiência e{" "}
            <strong className="text-elite-flow">R$ 2 milhões em budget gerenciados</strong> para você
            implementar a máquina de vendas que traz previsibilidade total de
            VGV, eliminando o &quot;achismo&quot; e o desperdício em mídia.
          </p>
          <p className="mb-8 font-semibold text-elite-quartz/80">
            10/02 • TERÇA-FEIRA • 16:00 —{" "}
            <em>Meet exclusivo: O Método Elite</em>
          </p>
          <Button
            asChild
            size="lg"
            className="bg-elite-cta hover:bg-green-600 px-8 py-6 text-base font-semibold text-white ring-2 ring-green-400/50 shadow-[0_0_20px_var(--color-elite-cta-glow)] hover:ring-green-300 hover:shadow-[0_0_24px_var(--color-elite-cta-glow)]"
          >
            <a href={CTA_URL}>Quero acessar o Método Elite</a>
          </Button>
        </div>
      </section>

      {/* O que você vai conquistar */}
      <section className="px-6 py-16 md:py-20 bg-elite-navy/95">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl text-elite-quartz">
            O que você vai conquistar
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <BenefitCard
              icon={<LucideBarChart2 className="h-8 w-8 text-elite-flow" />}
              title="Performance e Lucratividade"
              text="Você vai dominar o retorno sobre seus investimentos, batendo metas de lançamento em tempo recorde (48h) e reduzindo drasticamente o seu CAC através de inteligência de mídia de alta precisão."
            />
            <BenefitCard
              icon={<LucideLayoutDashboard className="h-8 w-8 text-elite-flow" />}
              title="Previsibilidade e Dados"
              text="Você terá paz mental com o rastreamento total dos seus investimentos. Chega de achismos: visualize o ROI real unificado e tenha previsibilidade de receita com um funil de dados rastreável."
            />
            <BenefitCard
              icon={<LucideCog className="h-8 w-8 text-elite-flow" />}
              title="Sistemas e Automação"
              text="Você vai implementar um ecossistema Martech eficiente e processos que não dependem de talentos individuais para funcionar. Crie uma máquina escalável com réguas de relacionamento automáticas."
            />
            <BenefitCard
              icon={<LucideHandshake className="h-8 w-8 text-elite-flow" />}
              title="Alinhamento e Crescimento"
              text="Você vai eliminar o conflito entre Marketing e Vendas com um time em total sintonia, aumentando o lucro da sua empresa ao vender com equipe própria e estratégias de otimização."
            />
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="border-y border-elite-flow/20 bg-elite-navy/90 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl text-elite-quartz">
            Para quem é: Dono de Loteadora
          </h2>
          <ul className="space-y-4">
            {[
              "Você é dono de loteadora e investe alto em mídia, mas sente que está no escuro sem saber exatamente qual anúncio ou canal de venda está gerando o ROI real de cada empreendimento.",
              "Você está cansado do eterno conflito entre o Marketing, que entrega volume de leads, e o Comercial, que reclama da qualidade, enquanto o VGV permanece estagnado.",
              "Você quer escala e previsibilidade, mas sua operação ainda é refém de planilhas fragmentadas e do talento individual de alguns corretores, em vez de um processo replicável.",
              "Você tem um estande de vendas que muitas vezes fica ocioso e sofre com leads que esfriam por falta de régua de relacionamento automática e tempo de resposta (SLA) inferior a 5 minutos.",
              "Você deseja segurança para adquirir novos terrenos e lançar o próximo loteamento, sabendo que possui uma máquina de demanda represada capaz de vender 30% das unidades logo no primeiro dia.",
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <LucideCheck className="mt-0.5 h-5 w-5 shrink-0 text-elite-flow" />
                <span className="text-elite-quartz/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Para quem NÃO é */}
      <section className="px-6 py-16 md:py-20 bg-elite-navy">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-elite-quartz md:text-3xl">
            Para quem NÃO é
          </h2>
          <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-elite-sold-red bg-elite-sold-red/10 p-8 text-center">
            <LucideX className="h-10 w-10 text-elite-sold-red" />
            <p className="text-elite-quartz/90">
              Este programa não é para donos de loteadoras que buscam atalhos
              mágicos ou sorte, que não estão dispostos a integrar tecnologia
              (Martech) ao comercial e que preferem continuar tomando decisões
              milionárias baseadas apenas no feeling, ignorando o que os dados
              do funil dizem.
            </p>
          </div>
        </div>
      </section>

      {/* O Estrategista */}
      <section className="border-t border-elite-flow/20 bg-elite-navy/90 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl text-elite-quartz">
            O Estrategista por trás do Método Elite
          </h2>
          <p className="mb-8 text-lg text-elite-quartz/90">
            <strong className="text-elite-quartz">Rodrigo Ribas</strong> é o founder da Adventure Labs e o nome
            por trás de estratégias que moldaram o novo padrão de lançamentos
            imobiliários. Com um perfil raro que une a visão criativa do Design
            à precisão técnica do Martech, ele construiu uma trajetória de 10
            anos dominando dados, tecnologia e comportamento de consumo.
          </p>
          <p className="mb-10 text-elite-quartz/90">
            Sua experiência consolidada na <strong className="text-elite-quartz">Young Empreendimentos</strong>{" "}
            permitiu o desenvolvimento de uma metodologia validada no campo de
            batalha. Rodrigo não entrega apenas tráfego; ele entrega inteligência
            de vendas que transforma investimentos em VGV esgotado, garantindo
            que o dono da loteadora tenha controle absoluto sobre cada real
            gerenciado.
          </p>
          <ul className="mx-auto max-w-xl space-y-3 text-left text-elite-quartz/90">
            {[
              "+2.500 imóveis lançados ao mercado com estratégias de alta performance.",
              "Case de Sucesso Absoluto: 100% das unidades vendidas em um único dia.",
              "Mais de R$ 2 milhões gerenciados em budget de mídia com rastreamento total de ROI.",
              "10 anos de expertise em Martech unindo tecnologia, CRM e processos de vendas.",
              "Coordenação de 5 grandes lançamentos imobiliários de alto impacto.",
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <LucideCheck className="mt-0.5 h-5 w-5 shrink-0 text-elite-flow" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section
        id="cta"
        className="border-t border-elite-flow/20 bg-elite-flow px-6 py-16 text-center text-white md:py-20"
      >
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Meet Exclusivo: O Método Elite
          </h2>
          <p className="mb-8 text-white/90">
            10/02 • Terça-feira • 16:00
          </p>
          <Button
            asChild
            size="lg"
            className="bg-elite-cta hover:bg-green-600 font-semibold text-white ring-2 ring-green-400/50 shadow-[0_0_20px_var(--color-elite-cta-glow)] hover:ring-green-300 hover:shadow-[0_0_24px_var(--color-elite-cta-glow)]"
          >
            <a href={CTA_URL}>Quero acessar o Método Elite</a>
          </Button>
        </div>
      </section>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-elite-flow/20 bg-elite-navy/80 p-6 shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-elite-quartz">{title}</h3>
      <p className="text-elite-quartz/80">{text}</p>
    </div>
  );
}
