import { Mail } from "lucide-react";

// CNPJ: preencher com o número cadastrado da Adventure (ex.: 00.000.000/0001-00)
const ADVENTURE_CNPJ = "00.000.000/0001-00";

export function Footer() {
  return (
    <footer className="bg-elite-navy text-elite-quartz py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-elite-flow/20">
          <div>
            <p className="font-semibold text-elite-quartz">
              ADVENTURE COMUNICACOES LTDA
            </p>
            <p className="text-sm text-elite-quartz/80 mt-1">
              CNPJ: {ADVENTURE_CNPJ}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-elite-flow flex-shrink-0" />
            <a
              href="mailto:contato@adventurelabs.com.br"
              className="text-elite-quartz/90 hover:text-elite-flow transition-colors"
            >
              contato@adventurelabs.com.br
            </a>
          </div>
        </div>
        <div className="pt-6 text-center space-y-2">
          <p className="text-sm text-elite-quartz/80">
            © 2026 ADVENTURE LABS. Todos os direitos reservados.
          </p>
          <p className="text-sm text-elite-quartz/70">
            Site criado por{" "}
            <span className="font-semibold text-elite-flow">Adventure Labs</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
