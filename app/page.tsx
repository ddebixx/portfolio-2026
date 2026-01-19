import { ExperienceSection } from "@/components/experience-section/ExperienceSection";
import { HeroSection } from "@/components/portfolio-hero/HeroSection";
import { ProjectsSection } from "@/components/projects-section/ProjectsSection";
import { TechnologiesSection } from "@/components/technologies-section/TechnologiesSection";
import { ContactSection } from "@/components/contact-section/ContactSection";
import { Navbar } from "@/components/shared/Navbar";
import { Preloader } from "@/components/shared/Preloader";
import { getAuthor } from "@/fetchers/getAuthor";
import { getExperiences } from "@/fetchers/getExperiences";
import { getProjects } from "@/fetchers/getProjects";
import { getTechnologies } from "@/fetchers/getTechnologies";
import { extractImageUrls } from "@/utils/extractImageUrls";

export default async function Home() {
  const [author, experiences, projects, technologies] = await Promise.all([
    getAuthor(),
    getExperiences(),
    getProjects(),
    getTechnologies(),
  ]);

  const imageUrls = extractImageUrls(experiences, projects);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <Navbar />
      <main className="auto-grid-borders grid grid-cols-1 sm:grid-cols-2 w-full max-sm:mt-8 max-w-4xl flex-col items-center justify-between py-8 px-4 sm:py-16 md:py-32 sm:px-8 md:px-16 bg-black sm:items-start">
        <Preloader imageUrls={imageUrls} />
        <HeroSection author={author || null} />
        <ExperienceSection experiences={experiences || null} />
        <ProjectsSection projects={projects || null} />
        <TechnologiesSection technologies={technologies || null} />
        <ContactSection />
      </main>
    </div>
  );
}
