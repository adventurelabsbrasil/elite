import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-elite-navy/95 backdrop-blur-sm border-b border-elite-flow/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/Mono_Light.png"
              alt="ELITE Logo"
              width={180}
              height={60}
              className="h-10 md:h-14 w-auto"
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
