import { WebinarLayout } from "@/components/Webinar/WebinarLayout";

export const metadata = {
  title: "Webinar ELITE | Estratégia de Lançamento Imobiliário",
  description:
    "A estratégia de lançamento imobiliário com tecnologia para escala. Processo ELITE em módulos interativos.",
};

export default function WebinarRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <WebinarLayout>{children}</WebinarLayout>;
}
