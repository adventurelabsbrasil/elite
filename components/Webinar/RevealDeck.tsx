"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { EtapasTimeline } from "@/components/Webinar/EtapasTimeline";

export type RevealStep = {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

type RevealDeckProps = {
  steps: RevealStep[];
  backHref?: string;
  backLabel?: string;
  className?: string;
  /** Optional: "etapas" renders EtapasTimeline above the step counter. */
  timelineSlot?: "etapas";
};

export function RevealDeck({
  steps,
  backHref = "/webinar",
  backLabel = "Índice",
  className,
  timelineSlot,
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
  const progressPct = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className={cn("flex flex-col min-h-[75vh] pb-20", className)}>
      {/* Progress bar at top */}
      <div className="w-full h-1.5 bg-elite-flow/20 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-elite-flow rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPct}%` }}
          aria-hidden
        />
      </div>
      <div className="flex items-center justify-end gap-2 mb-2">
        {timelineSlot === "etapas" && <EtapasTimeline currentStep={currentStep} />}
        <span className="text-sm text-elite-quartz/60 tabular-nums" aria-live="polite">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>

      {/* Slide area: min-h 70-80vh, centered, minimal border */}
      <div
        key={currentStep}
        className={cn(
          "flex-1 flex flex-col justify-center min-h-[70vh] rounded-lg border border-elite-flow/10 bg-elite-navy/30 px-6 py-8 sm:px-10 sm:py-10 transition-all duration-300 ease-out"
        )}
        role="region"
        aria-live="polite"
        aria-label={`Slide ${currentStep + 1}: ${step.title}`}
      >
        <div className="flex items-center gap-3 mb-5">
          {step.icon && <span className="text-elite-flow shrink-0">{step.icon}</span>}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-elite-flow leading-tight">
            {step.title}
          </h2>
        </div>
        <div className="text-base sm:text-lg text-elite-quartz/90 [&_table]:w-full [&_th]:text-left [&_th]:py-2 [&_td]:py-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1.5 space-y-3">
          {step.content}
        </div>
      </div>

      {/* Fixed nav at bottom: large touch targets */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-4 px-4 py-3 bg-elite-navy/98 border-t border-elite-flow/20 backdrop-blur-sm pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        aria-label="Navegação da apresentação"
      >
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-elite-flow hover:text-elite-flow/80 transition-colors min-h-[44px] items-center"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            className={cn(
              "inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-elite-flow/50 focus:ring-offset-2 focus:ring-offset-elite-navy",
              canGoPrev
                ? "text-elite-quartz bg-elite-flow/15 hover:bg-elite-flow/25 text-elite-flow"
                : "text-elite-quartz/40 cursor-not-allowed"
            )}
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
          <span className="text-sm text-elite-quartz/60 tabular-nums w-12 text-center">
            {currentStep + 1}/{totalSteps}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            className={cn(
              "inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-elite-flow/50 focus:ring-offset-2 focus:ring-offset-elite-navy",
              canGoNext
                ? "text-elite-navy bg-elite-flow hover:bg-elite-flow/90"
                : "text-elite-quartz/40 cursor-not-allowed bg-elite-flow/20"
            )}
            aria-label="Próximo slide"
          >
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        <div className="w-20 sm:w-24" aria-hidden />
      </nav>
    </div>
  );
}
