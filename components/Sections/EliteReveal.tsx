"use client";

import * as React from "react";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

// Frase completa; as iniciais E, L, I, T, E formam o acrônimo ELITE
const PHRASE_WORDS = [
  "Estratégia",
  "de",
  "Lançamento",
  "Imobiliário",
  "com",
  "Tecnologia",
  "e",
  "Escala",
];
function getInitialIndex(word: string): number {
  const i = PHRASE_WORDS.indexOf(word);
  if (i === -1) return -1;
  const eliteWords = ["Estratégia", "Lançamento", "Imobiliário", "Tecnologia", "Escala"];
  const eliteIndex = eliteWords.indexOf(word);
  return eliteIndex >= 0 ? eliteIndex : -1;
}

export function EliteReveal() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  const [revealedUpTo, setRevealedUpTo] = React.useState(-1);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Revelar palavra a palavra (ou letra inicial do ELITE em sequência)
  React.useEffect(() => {
    if (!inView) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    PHRASE_WORDS.forEach((word, i) => {
      timeouts.push(setTimeout(() => setRevealedUpTo(i), 80 * (i + 1)));
    });
    return () => timeouts.forEach(clearTimeout);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="bg-elite-navy/50 backdrop-blur-sm rounded-2xl p-8 border border-elite-flow/20 transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div
          className={cn(
            "flex-shrink-0 transition-all duration-500",
            inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
          )}
        >
          <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-elite-flow" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg sm:text-xl text-elite-quartz/90 leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1 items-baseline">
            {PHRASE_WORDS.map((word, i) => {
              const eliteIdx = getInitialIndex(word);
              const isRevealed = revealedUpTo >= i;
              const isEliteLetter = eliteIdx >= 0;

              return (
                <span
                  key={`${word}-${i}`}
                  className={cn(
                    "transition-all duration-300",
                    !isRevealed && "opacity-0 translate-y-2"
                  )}
                  style={{ transitionDelay: isRevealed ? "0ms" : "0ms" }}
                >
                  {isEliteLetter ? (
                    <>
                      <span className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-elite-flow align-middle">
                        {word.charAt(0)}
                      </span>
                      <span className={cn(
                        "text-elite-quartz/90",
                        isEliteLetter && word.length > 1 && "text-lg sm:text-xl"
                      )}>
                        {word.slice(1)}
                      </span>
                    </>
                  ) : (
                    <span className="text-elite-quartz/90">{word}</span>
                  )}
                </span>
              );
            })}
          </p>
          <p className="mt-2 text-sm text-elite-quartz/70">
            As iniciais em destaque formam o acrônimo <strong className="text-elite-flow">ELITE</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
