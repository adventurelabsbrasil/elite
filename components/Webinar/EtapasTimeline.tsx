"use client";

import { cn } from "@/lib/utils";

const MILESTONES = ["Branding", "Teaser", "Pré", "Lanç.", "Pós"] as const;

type EtapasTimelineProps = {
  currentStep: number;
};

/** Steps 1–5 = Branding…Pós. */
function getActiveIndex(currentStep: number): number {
  if (currentStep >= 1 && currentStep <= 5) return currentStep - 1;
  return -1;
}

export function EtapasTimeline({ currentStep }: EtapasTimelineProps) {
  const activeIndex = getActiveIndex(currentStep);

  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-md" aria-label="Etapas da campanha">
      {MILESTONES.map((label, i) => (
        <div key={label} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1 min-w-0">
            <span
              className={cn(
                "h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 transition-colors shrink-0",
                activeIndex === i
                  ? "bg-elite-flow border-elite-flow"
                  : activeIndex > i
                    ? "bg-elite-flow/80 border-elite-flow/80"
                    : "bg-transparent border-elite-flow/30"
              )}
              aria-hidden
            />
            <span
              className={cn(
                "text-[10px] sm:text-xs font-medium mt-1 truncate w-full text-center transition-colors",
                activeIndex === i ? "text-elite-flow" : "text-elite-quartz/50"
              )}
            >
              {label}
            </span>
          </div>
          {i < MILESTONES.length - 1 && (
            <span
              className={cn(
                "flex-1 h-0.5 max-w-[20px] sm:max-w-[28px] rounded transition-colors",
                activeIndex > i ? "bg-elite-flow" : "bg-elite-flow/20"
              )}
              aria-hidden
            />
          )}
        </div>
      ))}
    </div>
  );
}
