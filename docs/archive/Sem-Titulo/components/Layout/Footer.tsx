import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-elite-navy text-elite-quartz py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <Image
              src="/Mono_Light.png"
              alt="ELITE Logo"
              width={100}
              height={30}
              className="h-8 w-auto opacity-80"
            />
          </div>
          <div className="text-sm text-elite-quartz/70 text-center md:text-right">
            <p>ELITE: Inteligência de dados para quem constrói o futuro das cidades.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
