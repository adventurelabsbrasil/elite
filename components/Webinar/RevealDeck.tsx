"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export type RevealStep = {
  title: string;
  content: React.ReactNode;
};

type RevealDeckProps = {
  steps: RevealStep[];
  backHref?: string;
  backLabel?: string;
  className?: string;
};

export function RevealDeck({
  steps,
  backHref = "/webinar",
  backLabel = "Índice",
  className,
}: RevealDeckProps) {
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const initialStep = stepParam ? Math.min(Math.max(0, parseInt(stepParam, 10)), steps.length - 1) : 0;

  const [currentStep, setCurrentStep] = React.useState(initialStep);
  const [direction, setDirection] = React.useState<"next" | "prev">("next");

  const totalSteps = steps.length;
  const canGoPrev = currentStep > 0;
  const canGoNext = currentStep < totalSteps - 1;

  const goPrev = React.useCallback(() => {
    if (!canGoPrev) return;
    setDirection("prev");
    setCurrentStep((s) => s - 1);
  }, [canGoPrev]);

  const goNext = React.useCallback(() => {
    if (!canGoNext) return;
    setDirection("next");
    setCurrentStep((s) => s + 1);
  }, [canGoNext]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const step = steps[currentStep];

  return (
    <div className={cn("flex flex-col min-h-[60vh]", className)}>
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-elite-flow hover:text-elite-flow/80 transition-colors"
        >
          <LayoutDashboard className="h-4 w-4" />
          {backLabel}
        </Link>
        <span className="text-sm text-elite-quartz/60" aria-live="polite">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>

      <div
        key={currentStep}
        className="flex-1 rounded-xl border border-elite-flow/20 bg-elite-navy/50 p-6 sm:p-8 transition-all duration-300 ease-out"
        role="region"
        aria-live="polite"
        aria-label={`Passo ${currentStep + 1}: ${step.title}`}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-elite-flow mb-4">{step.title}</h2>
        <div className="text-elite-quartz/90 [&_table]:w-full [&_th]:text-left [&_th]:py-2 [&_td]:py-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 space-y-3">
          {step.content}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-elite-flow/20">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-elite-flow/50 focus:ring-offset-2 focus:ring-offset-elite-navy",
            canGoPrev
              ? "text-elite-quartz bg-elite-flow/10 hover:bg-elite-flow/20 text-elite-flow"
              : "text-elite-quartz/40 cursor-not-allowed"
          )}
          aria-label="Passo anterior"
        >
          <ChevronLeft className="h-5 w-5" />
          Anterior
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-elite-flow/50 focus:ring-offset-2 focus:ring-offset-elite-navy",
            canGoNext
              ? "text-elite-navy bg-elite-flow hover:bg-elite-flow/90"
              : "text-elite-quartz/40 cursor-not-allowed bg-elite-flow/20"
          )}
          aria-label="Próximo passo"
        >
          Próximo
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
