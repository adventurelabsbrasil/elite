import { FormModalProvider } from "@/components/Form/FormModal";
import { SectionReveal } from "@/components/SectionReveal";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Hero } from "@/components/Sections/Hero";
import { Problem } from "@/components/Sections/Problem";
import { Solution } from "@/components/Sections/Solution";
import { Benefits } from "@/components/Sections/Benefits";
import { TargetAudience } from "@/components/Sections/TargetAudience";
import { About } from "@/components/Sections/About";
import { FinalCTA } from "@/components/Sections/FinalCTA";

export default function HomePage() {
  return (
    <FormModalProvider>
      <main className="min-h-screen bg-elite-navy">
        <Header />
        <Hero />
        <SectionReveal delay={0}>
          <Benefits />
        </SectionReveal>
        <SectionReveal delay={50}>
          <TargetAudience />
        </SectionReveal>
        <SectionReveal delay={100}>
          <About />
        </SectionReveal>
        <SectionReveal delay={50}>
          <Problem />
        </SectionReveal>
        <SectionReveal delay={100}>
          <Solution />
        </SectionReveal>
        <SectionReveal delay={50}>
          <FinalCTA />
        </SectionReveal>
        <Footer />
      </main>
    </FormModalProvider>
  );
}
