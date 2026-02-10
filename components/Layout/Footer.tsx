import Image from "next/image";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { BackToTop } from "./BackToTop";

const CNPJ = "64.196.278/0001-69";
const ADDRESS = "AV DO PARQUE, 501, sala 09, JAU, 95500-000 — SANTO ANTONIO DA PATRULHA/RS";
const PHONES = "51 3662 5145 | 51 998730488";
const WEBSITE = "https://www.adventurelabs.com.br";

export function Footer() {
  return (
    <>
      <footer className="bg-elite-navy text-elite-quartz py-12">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 pb-8 border-b border-elite-flow/20">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/Isotipo.png"
                  alt="Adventure Labs"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="text-lg font-semibold text-elite-quartz">
                  adventure <span className="text-elite-flow">LABS</span>
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 text-sm text-elite-quartz/90">
                <div>
                  <p className="font-semibold text-elite-quartz">
                    ADVENTURE COMUNICACOES LTDA
                  </p>
                  <p className="mt-1">CNPJ: {CNPJ}</p>
                  <div className="mt-2 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-elite-flow flex-shrink-0 mt-0.5" />
                    <span>{ADDRESS}</span>
                  </div>
                </div>
                <div>
                  <a
                    href="mailto:contato@adventurelabs.com.br"
                    className="flex items-center gap-2 hover:text-elite-flow transition-colors"
                  >
                    <Mail className="w-4 h-4 text-elite-flow flex-shrink-0" />
                    contato@adventurelabs.com.br
                  </a>
                  <p className="mt-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-elite-flow flex-shrink-0" />
                    {PHONES}
                  </p>
                  <a
                    href={WEBSITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-elite-flow hover:underline"
                  >
                    www.adventurelabs.com.br
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 text-center">
            <p className="text-sm text-elite-quartz/80">
              © 2026 Adventure Labs. Todos os direitos reservados.
            </p>
            <p className="mt-1 text-sm text-elite-quartz/70">
              Site criado por{" "}
              <span className="font-semibold text-elite-flow">Adventure Labs</span>
            </p>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
