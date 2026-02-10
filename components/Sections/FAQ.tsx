"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Quanto tempo dura o webinar?",
    answer:
      "O webinar tem duração de 90 minutos, com conteúdo focado em marketing para loteadoras, principalmente em lançamentos.",
  },
  {
    question: "Quando será realizado?",
    answer:
      "O webinar acontece toda terça-feira às 16h. Você receberá o link de acesso por email após se inscrever.",
  },
  {
    question: "Preciso ter conhecimento prévio?",
    answer:
      "Não é necessário conhecimento prévio. O conteúdo é direcionado a donos de incorporadoras e diretores comerciais que querem implementar o método ELITE na sua operação.",
  },
  {
    question: "O que vou aprender?",
    answer:
      "Você vai aprender sobre Martech (tecnologia), Smarketing (alinhamento Marketing + Vendas), processos e gestão, e como alcançar resultados como esgotamento do VGV, redução de CAC e previsibilidade de receita.",
  },
  {
    question: "Há algum custo?",
    answer:
      "Não, o webinar é totalmente gratuito. É uma oportunidade para você conhecer o método ELITE e como ele pode transformar sua loteadora.",
  },
  {
    question: "O que acontece após me inscrever?",
    answer:
      "Após se inscrever, você receberá um email de confirmação com todas as informações. Você também terá acesso ao grupo VIP no WhatsApp para networking e atualizações.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-elite-navy/90">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-elite-quartz mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-elite-quartz/80 max-w-3xl mx-auto">
            Tire suas dúvidas sobre o webinar
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-elite-navy/80 rounded-xl border border-elite-flow/20 overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-elite-navy/60 transition-colors"
              >
                <span className="font-semibold text-elite-quartz pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-elite-quartz flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-elite-quartz/80 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
