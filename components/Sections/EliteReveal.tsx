"use client";

import * as React from "react";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const ELITE = ["E", "L", "I", "T", "E"];
const EXPANSION =
  "Estratégia de Lançamento Imobiliário com Tecnologia e Escala";

export function EliteReveal() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  const [letterIndex, setLetterIndex] = React.useState(-1);
  const [phraseVisible, setPhraseVisible] = React.useState(false);

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

  // Sequence: letters one by one, then phrase
  React.useEffect(() => {
    if (!inView) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    ELITE.forEach((_, i) => {
      timeouts.push(
        setTimeout(() => setLetterIndex(i), 120 * (i + 1))
      );
    });
    timeouts.push(
      setTimeout(() => setPhraseVisible(true), 120 * (ELITE.length + 1) + 200)
    );
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
          <div className="flex flex-wrap gap-1 sm:gap-2 items-center mb-3">
            {ELITE.map((letter, i) => (
              <span
                key={letter}
                className={cn(
                  "inline-block text-3xl sm:text-4xl md:text-5xl font-display font-bold text-elite-flow transition-all duration-300",
                  letterIndex >= i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                )}
                style={{ transitionDelay: letterIndex >= i ? "0ms" : "0ms" }}
              >
                {letter}
              </span>
            ))}
          </div>
          <p
            className={cn(
              "text-lg sm:text-xl text-elite-quartz/90 transition-all duration-500",
              phraseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            {EXPANSION}
          </p>
        </div>
      </div>
    </div>
  );
}
