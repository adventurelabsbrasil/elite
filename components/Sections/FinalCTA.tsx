import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-elite-navy to-elite-navy/90 text-elite-quartz">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-balance">
            Pronto para transformar sua loteadora?
          </h2>
          <p className="text-xl text-elite-quartz/90 max-w-2xl mx-auto">
            Garanta sua vaga no meet exclusivo e descubra como implementar o
            método ELITE na sua operação. Vagas limitadas.
          </p>
          <a
            href="#form"
            className="inline-flex items-center gap-2 bg-elite-flow hover:bg-[#009999] text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
          >
            QUERO ACESSAR O MÉTODO ELITE
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
