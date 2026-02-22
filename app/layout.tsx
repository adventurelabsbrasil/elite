import type { Metadata } from "next";
import "./globals.css";
import { MetaPixel } from "@/components/Pixel/MetaPixel";
import { GoogleAdsGtag } from "@/components/Pixel/GoogleAdsGtag";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "";

export const metadata: Metadata = {
  title: "ELITE - Rodrigo Ribas",
  description:
    "A Estratégia Martech de quem lançou +2.000 Imóveis e esgotou um loteamento em um único dia. Meet exclusivo 10/02.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "LOTEADORA ELITE | A Estratégia Martech de quem esgotou um loteamento em um dia",
    description:
      "Meet exclusivo com Rodrigo Ribas: a mesma estratégia de lançamento que levou +2.000 imóveis e um loteamento esgotado em um único dia. 10/02 — vagas limitadas.",
    ...(siteUrl && {
      url: siteUrl,
      siteName: "LOTEADORA ELITE",
      images: [
        {
          url: `${siteUrl}/LogoPrimary.jpg`,
          width: 1200,
          height: 630,
          alt: "LOTEADORA ELITE",
        },
      ],
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: "LOTEADORA ELITE | A Estratégia Martech de quem esgotou um loteamento em um dia",
    description:
      "Meet exclusivo com Rodrigo Ribas: a mesma estratégia de lançamento que levou +2.000 imóveis e um loteamento esgotado em um único dia. 10/02 — vagas limitadas.",
    ...(siteUrl && { images: [`${siteUrl}/LogoPrimary.jpg`] }),
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
        <MetaPixel />
        <GoogleAdsGtag />
        {children}
      </body>
    </html>
  );
}
