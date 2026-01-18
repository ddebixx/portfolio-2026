import { ExperienceSection } from "@/components/experience-section/ExperienceSection";
import { HeroSection } from "@/components/portfolio-hero/HeroSection";
import { ProjectsSection } from "@/components/projects-section/ProjectsSection";
import { TechnologiesSection } from "@/components/technologies-section/TechnologiesSection";
import { ContactSection } from "@/components/contact-section/ContactSection";

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="auto-grid-borders grid grid-cols-1 sm:grid-cols-2 w-full max-w-4xl flex-col items-center justify-between py-8 px-4 sm:py-16 md:py-32 sm:px-8 md:px-16 bg-white dark:bg-black sm:items-start">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <TechnologiesSection />
        <ContactSection />
      </main>
    </div>
  );
}
