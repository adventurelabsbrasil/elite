import Image from 'next/image'
import { Calendar } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-elite-navy via-elite-navy to-elite-navy/90 text-elite-quartz pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Badge Superior */}
            <div className="inline-block">
              <span className="px-4 py-2 bg-elite-flow/20 text-elite-flow rounded-full text-sm font-semibold border border-elite-flow/30">
                EXCLUSIVO PARA DONOS DE LOTEADORAS E INCORPORADORAS
              </span>
            </div>

            {/* Headline de Autoridade */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-balance leading-tight">
                A Estratégia Martech de quem lançou <span className="text-elite-flow">+2.500 Imóveis</span> e Esgotou um Loteamento em um <span className="text-elite-glow">Único Dia.</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-elite-quartz/90 leading-relaxed">
                Vou abrir os bastidores de 10 anos de experiência e <strong className="text-elite-flow">R$ 2 milhões em budget gerenciados</strong> para você implementar a máquina de vendas que traz previsibilidade total de VGV, eliminando o "achismo" e o desperdício em mídia.
              </p>
            </div>

            {/* Data e Hora */}
            <div className="flex items-center gap-3 bg-elite-navy/50 backdrop-blur-sm rounded-xl p-4 border border-elite-flow/20">
              <Calendar className="w-6 h-6 text-elite-flow flex-shrink-0" />
              <div>
                <p className="font-bold text-lg">10/02 - TERÇA-FEIRA - 16:00</p>
                <p className="text-sm text-elite-quartz/80 italic">MEET EXCLUSIVO: O MÉTODO ELITE</p>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="#form"
              className="inline-block w-full sm:w-auto bg-elite-flow hover:bg-[#009999] text-white font-bold py-4 px-8 rounded-lg transition-colors text-center text-lg"
            >
              QUERO ACESSAR O MÉTODO ELITE
            </a>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/ribas-young.jpg"
                alt="Rodrigo Ribas - Founder da Adventure Labs"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
