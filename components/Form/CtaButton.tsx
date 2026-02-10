"use client";

import { useFormModal } from "@/components/Form/FormModal";

const ctaClassName =
  "inline-block w-full sm:w-auto bg-elite-cta hover:bg-green-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-colors text-center text-base md:text-lg ring-2 ring-green-400/50 shadow-[0_0_20px_var(--color-elite-cta-glow)] hover:ring-green-300 hover:shadow-[0_0_24px_var(--color-elite-cta-glow)]";

export function CtaButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { openForm } = useFormModal();
  return (
    <button
      type="button"
      onClick={openForm}
      className={className ? `${ctaClassName} ${className}` : ctaClassName}
    >
      {children}
    </button>
  );
}
