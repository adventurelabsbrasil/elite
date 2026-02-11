import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Método Elite | Estratégia Martech para Loteadoras",
  description:
    "A Estratégia Martech de quem lançou +2.500 Imóveis e esgotou um loteamento em um único dia. Meet exclusivo 10/02.",
  icons: {
    icon: [{ url: "/Isotipo.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased" style={{ fontFamily: "var(--font-sans)" }}>
        {children}
      </body>
    </html>
  );
}
