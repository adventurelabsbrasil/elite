import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Hero } from "@/components/Sections/Hero";
import { Problem } from "@/components/Sections/Problem";
import { Solution } from "@/components/Sections/Solution";
import { Benefits } from "@/components/Sections/Benefits";
import { TargetAudience } from "@/components/Sections/TargetAudience";
import { About } from "@/components/Sections/About";
import { QualificationForm } from "@/components/Form/QualificationForm";
import { FAQ } from "@/components/Sections/FAQ";
import { FinalCTA } from "@/components/Sections/FinalCTA";

export default function InscrevaSePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Benefits />
      <TargetAudience />
      <About />
      <Problem />
      <Solution />
      <section id="form" className="py-20 bg-elite-quartz">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <QualificationForm />
          </div>
        </div>
      </section>
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
