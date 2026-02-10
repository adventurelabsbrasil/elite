"use client";

import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface WhatsAppInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const WhatsAppInput = forwardRef<
  HTMLInputElement,
  WhatsAppInputProps
>(function WhatsAppInput({ value, onChange, error }, ref) {
  const inputClassName = `w-full px-4 py-3 rounded-lg border bg-elite-navy/50 text-elite-quartz placeholder:text-elite-quartz/50 ${
    error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-elite-flow/30 focus:border-elite-flow focus:ring-elite-flow"
  } focus:outline-none focus:ring-2 transition-colors`;

  return (
    <div>
      <IMaskInput
        mask="(00) 00000-0000"
        value={value}
        onAccept={(unmasked) => onChange(unmasked ?? "")}
        inputRef={ref}
        type="tel"
        placeholder="(00) 00000-0000"
        className={inputClassName}
        unmask={false}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});
