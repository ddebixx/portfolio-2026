import { BlogFooter } from "@/components/blog-section/BlogFooter";
import { ContactSection } from "@/components/contact-section/ContactSection";
import { ExperienceSection } from "@/components/experience-section/ExperienceSection";
import { HeroSection } from "@/components/portfolio-hero/HeroSection";
import { ProjectsSection } from "@/components/projects-section/ProjectsSection";
import { PageContent } from "@/components/shared/PageContent";
import { PageShell } from "@/components/shared/PageShell";
import { Preloader } from "@/components/shared/Preloader";
import { TechnologiesSection } from "@/components/technologies-section/TechnologiesSection";
import { getAuthor } from "@/fetchers/getAuthor";
import { getExperiences } from "@/fetchers/getExperiences";
import { getPosts } from "@/fetchers/getPosts";
import { getProjects } from "@/fetchers/getProjects";
import { getTechnologies } from "@/fetchers/getTechnologies";
import { extractImageUrls } from "@/utils/extractImageUrls";

export default async function Home() {
	const [author, experiences, projects, technologies, posts] = await Promise.all([
		getAuthor(),
		getExperiences(),
		getProjects(),
		getTechnologies(),
		getPosts(),
	]);

	const imageUrls = extractImageUrls(experiences, projects, posts);

	return (
		<PageShell>
			<PageContent withSectionSpacing>
				<Preloader imageUrls={imageUrls} />
				<HeroSection author={author || null} />
				<ExperienceSection experiences={experiences || null} />
				<ProjectsSection projects={projects || null} />
				<TechnologiesSection technologies={technologies || null} />
				<ContactSection />
			</PageContent>
			<BlogFooter posts={posts || null} />
		</PageShell>
	);
}
