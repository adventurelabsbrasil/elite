"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  leadFormSchema,
  type LeadFormSchema,
} from "@/lib/utils/validation";
import { REVENUE_RANGES, JOB_LEVELS, EMPLOYEE_RANGES } from "@/types/lead";
import { WhatsAppInput } from "./WhatsAppInput";
import { createClient } from "@/lib/supabase/client";
import { getUTMParams } from "@/lib/utils/format";
import { Loader2 } from "lucide-react";

export function QualificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LeadFormSchema>({
    resolver: zodResolver(leadFormSchema),
  });

  const whatsappValue = watch("whatsapp", "");

  const onSubmit = async (data: LeadFormSchema) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        console.log("Dados do formulário:", data);
        setTimeout(() => {
          window.location.href = "/obrigado";
        }, 1000);
        return;
      }

      const supabase = createClient();
      const utmParams = getUTMParams();

      const { error } = await supabase
        .schema("elite")
        .from("leads")
        .insert({
          form_id: "form-webinar",
          nome: data.nome,
          email: data.email,
          whatsapp: data.whatsapp.replace(/\D/g, ""),
          cargo: data.cargo ?? null,
          cargo_outro_qual: data.cargo === "outro" ? (data.cargo_outro_qual?.trim() || null) : null,
          employee_range: data.employee_range ?? null,
          revenue_range: data.revenue_range,
          source: utmParams.source,
          medium: utmParams.medium,
          campaign: utmParams.campaign,
        });

      if (error) {
        console.error("[Form] Supabase insert error:", error.code, error.message, error.details);
        if (error.code === "23505") {
          setSubmitError("Este email já está cadastrado.");
        } else {
          setSubmitError("Erro ao enviar. Tente novamente ou envie um email para contato@adventurelabs.com.br.");
        }
        setIsSubmitting(false);
        return;
      }

      window.location.href = "/obrigado";
    } catch (err) {
      console.error("[Form] Submit exception:", err);
      setSubmitError("Erro ao enviar. Tente novamente ou envie um email para contato@adventurelabs.com.br.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-elite-navy/80 rounded-2xl p-6 md:p-8 shadow-xl border border-elite-flow/20">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="nome"
          className="block text-sm font-medium text-elite-quartz mb-2"
        >
          Nome completo *
        </label>
        <input
          {...register("nome")}
          type="text"
          id="nome"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.nome
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-elite-flow/30 bg-elite-navy/50 text-elite-quartz placeholder:text-elite-quartz/50 focus:border-elite-flow focus:ring-elite-flow"
          } focus:outline-none focus:ring-2 transition-colors`}
          placeholder="Seu nome completo"
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-red-500">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-elite-quartz mb-2"
        >
          Email corporativo *
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-elite-flow/30 bg-elite-navy/50 text-elite-quartz placeholder:text-elite-quartz/50 focus:border-elite-flow focus:ring-elite-flow"
          } focus:outline-none focus:ring-2 transition-colors`}
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="whatsapp"
          className="block text-sm font-medium text-elite-quartz mb-2"
        >
          WhatsApp com DDD *
        </label>
        <WhatsAppInput
          value={whatsappValue}
          onChange={(value) => setValue("whatsapp", value)}
          error={errors.whatsapp?.message}
        />
      </div>

      <div>
        <label
          htmlFor="cargo"
          className="block text-sm font-medium text-elite-quartz mb-2"
        >
          Nível de cargo
        </label>
        <select
          {...register("cargo")}
          id="cargo"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.cargo
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-elite-flow/30 bg-elite-navy/50 text-elite-quartz placeholder:text-elite-quartz/50 focus:border-elite-flow focus:ring-elite-flow"
          } focus:outline-none focus:ring-2 transition-colors`}
        >
          <option value="">Selecione seu cargo</option>
          {JOB_LEVELS.map((job) => (
            <option key={job.value} value={job.value}>
              {job.label}
            </option>
          ))}
        </select>
      </div>

      {watch("cargo") === "outro" && (
        <div>
          <label
            htmlFor="cargo_outro_qual"
            className="block text-sm font-medium text-elite-quartz mb-2"
          >
            Qual?
          </label>
          <input
            {...register("cargo_outro_qual")}
            type="text"
            id="cargo_outro_qual"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.cargo_outro_qual
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-elite-flow/30 bg-elite-navy/50 text-elite-quartz placeholder:text-elite-quartz/50 focus:border-elite-flow focus:ring-elite-flow"
            } focus:outline-none focus:ring-2 transition-colors`}
            placeholder="Ex.: Sócio, Coordenador..."
          />
          {errors.cargo_outro_qual && (
            <p className="mt-1 text-sm text-red-500">{errors.cargo_outro_qual.message}</p>
          )}
        </div>
      )}

      <div>
        <label
          htmlFor="employee_range"
          className="block text-sm font-medium text-elite-quartz mb-2"
        >
          Número de funcionários na empresa
        </label>
        <select
          {...register("employee_range")}
          id="employee_range"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.employee_range
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-elite-flow/30 bg-elite-navy/50 text-elite-quartz placeholder:text-elite-quartz/50 focus:border-elite-flow focus:ring-elite-flow"
          } focus:outline-none focus:ring-2 transition-colors`}
        >
          <option value="">Selecione uma opção</option>
          {EMPLOYEE_RANGES.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="revenue_range"
          className="block text-sm font-medium text-elite-quartz mb-2"
        >
          Média de Faturamento do seu negócio *
        </label>
        <select
          {...register("revenue_range")}
          id="revenue_range"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.revenue_range
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-elite-flow/30 bg-elite-navy/50 text-elite-quartz placeholder:text-elite-quartz/50 focus:border-elite-flow focus:ring-elite-flow"
          } focus:outline-none focus:ring-2 transition-colors`}
        >
          <option value="">Selecione uma opção</option>
          {REVENUE_RANGES.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
        {errors.revenue_range && (
          <p className="mt-1 text-sm text-red-500">
            {errors.revenue_range.message}
          </p>
        )}
      </div>

      {submitError && (
        <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/50">
          <p className="text-sm text-red-400">{submitError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-elite-cta hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ring-2 ring-green-400/50 shadow-[0_0_20px_var(--color-elite-cta-glow)] hover:ring-green-300 hover:shadow-[0_0_24px_var(--color-elite-cta-glow)]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        ) : (
          "QUERO ACESSAR O MÉTODO ELITE"
        )}
      </button>

      <p className="text-xs text-elite-quartz/60 text-center">
        Ao preencher este formulário, você concorda em receber informações
        sobre o webinar.
      </p>
    </form>
  </div>
  );
}
