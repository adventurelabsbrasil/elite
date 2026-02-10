"use client";

import { forwardRef } from "react";
import InputMask from "react-input-mask";

interface WhatsAppInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const WhatsAppInput = forwardRef<
  HTMLInputElement,
  WhatsAppInputProps
>(function WhatsAppInput({ value, onChange, error }, ref) {
  return (
    <div>
      <InputMask
        mask="(99) 99999-9999"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          <input
            {...inputProps}
            ref={ref}
            type="tel"
            placeholder="(00) 00000-0000"
            className={`w-full px-4 py-3 rounded-lg border bg-elite-navy/50 text-elite-quartz placeholder:text-elite-quartz/50 ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-elite-flow/30 focus:border-elite-flow focus:ring-elite-flow"
            } focus:outline-none focus:ring-2 transition-colors`}
          />
        )}
      </InputMask>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});
