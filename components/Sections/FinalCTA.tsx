"use client";

import { ArrowRight } from "lucide-react";
import { useFormModal } from "@/components/Form/FormModal";

export function FinalCTA() {
  const { openForm } = useFormModal();

  return (
    <section className="py-20 bg-gradient-to-br from-elite-navy to-elite-navy/90 text-elite-quartz">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-balance">
            Pronto para transformar sua loteadora?
          </h2>
          <p className="text-xl text-elite-quartz/90 max-w-2xl mx-auto">
            Garanta sua vaga no meet exclusivo e descubra como implementar o
            método ELITE na sua operação. Vagas limitadas.
          </p>
          <button
            type="button"
            onClick={openForm}
            className="inline-flex items-center gap-2 bg-elite-cta hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg ring-2 ring-green-400/50 shadow-[0_0_20px_var(--color-elite-cta-glow)] hover:ring-green-300 hover:shadow-[0_0_24px_var(--color-elite-cta-glow)]"
          >
            QUERO ACESSAR O MÉTODO ELITE
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
