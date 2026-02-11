import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { WHATSAPP_GROUP_INVITE } from "@/lib/constants";

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-elite-navy flex items-center justify-center py-20 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-elite-flow/10 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-elite-flow" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-elite-quartz">
            Inscrição Confirmada!
          </h1>
          <p className="text-xl text-elite-quartz/90">
            Sua vaga no webinar está garantida. Você receberá todas as
            informações por email.
          </p>
        </div>

        <div className="bg-elite-navy/80 rounded-2xl p-8 border border-elite-flow/20 shadow-lg space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-display font-semibold text-elite-quartz">
              Próximos Passos
            </h2>
            <ul className="text-left space-y-3 text-elite-quartz/90">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-elite-flow flex-shrink-0 mt-0.5" />
                <span>
                  Verifique seu email (incluindo spam) para receber o link de
                  acesso
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-elite-flow flex-shrink-0 mt-0.5" />
                <span>O webinar acontece na terça às 16h (90 minutos). Você receberá o link de acesso por email.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-elite-flow flex-shrink-0 mt-0.5" />
                <span>
                  Entre no grupo VIP no WhatsApp para networking e atualizações
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-elite-navy/10">
            <a
              href={WHATSAPP_GROUP_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-elite-cta hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors ring-2 ring-green-400/50 shadow-[0_0_20px_var(--color-elite-cta-glow)] hover:ring-green-300 hover:shadow-[0_0_24px_var(--color-elite-cta-glow)]"
            >
              <MessageCircle className="w-5 h-5" />
              Entrar no Grupo VIP no WhatsApp
            </a>
          </div>
        </div>

        <div className="pt-8">
          <Link
            href="/"
            className="text-elite-flow hover:text-elite-glow font-medium transition-colors"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
