import Image from "next/image";
import Link from "next/link";

export function WebinarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-elite-navy text-elite-quartz flex flex-col">
      <header className="sticky top-0 z-50 bg-elite-navy/95 backdrop-blur-sm border-b border-elite-flow/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center" aria-label="Voltar ao início">
              <Image
                src="/Mono_Light.png"
                alt="ELITE Logo"
                width={180}
                height={60}
                className="h-10 md:h-14 w-auto"
                priority
              />
            </Link>
            <Link
              href="/webinar"
              className="text-sm font-medium text-elite-flow hover:text-elite-flow/80 transition-colors"
            >
              Webinar
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 max-w-5xl">
        {children}
      </main>

      <footer className="border-t border-elite-flow/20 py-6 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <p className="text-center text-sm text-elite-quartz/70">
            Manual elaborado em conjunto com{" "}
            <span className="text-elite-flow">Young Empreendimentos</span>. Rodrigo Ribas (Head de
            Marketing), Caroline Bortoluzzi (Diretora Comercial). Validação: Eduardo Tebaldi
            (Diretor Administrativo).
          </p>
        </div>
      </footer>
    </div>
  );
}
