import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Webinar ELITE - Transforme sua Loteadora em Máquina de Vendas',
  description: 'Aula de 90 minutos sobre marketing para loteadoras, focada em lançamentos. Explore o método ELITE para implementar um sistema de gestão de marketing eficaz.',
  keywords: 'loteadora, marketing imobiliário, lançamentos, método ELITE, webinar',
  openGraph: {
    title: 'Webinar ELITE - Transforme sua Loteadora em Máquina de Vendas',
    description: 'Aula de 90 minutos sobre marketing para loteadoras, focada em lançamentos.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
