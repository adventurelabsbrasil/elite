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
import { QualificationForm } from "@/components/Form/QualificationForm";
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
        <section id="form" className="py-20 bg-elite-navy/90">
          <SectionReveal delay={0}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto">
                <QualificationForm />
              </div>
            </div>
          </SectionReveal>
        </section>
        <SectionReveal delay={50}>
          <FinalCTA />
        </SectionReveal>
        <Footer />
      </main>
    </FormModalProvider>
  );
}
