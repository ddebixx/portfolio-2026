import { Suspense } from "react";
import { BlogSection } from "@/components/blog-section/BlogSection";
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

function HomePageFallback() {
	return (
		<>
			<div className="flex flex-col gap-8 sm:gap-10">
				<HeroSection author={null} />
				<BlogSection posts={null} />
			</div>
			<ExperienceSection experiences={null} />
			<ProjectsSection projects={null} />
			<TechnologiesSection technologies={null} />
		</>
	);
}

async function HomePageContent() {
	const [author, experiences, projects, technologies, posts] = await Promise.all([
		getAuthor(),
		getExperiences(),
		getProjects(),
		getTechnologies(),
		getPosts(),
	]);

	return (
		<>
			<Preloader imageUrls={extractImageUrls(experiences, projects, posts)} />
			<div className="flex flex-col gap-8 sm:gap-10">
				<HeroSection author={author || null} />
				<BlogSection posts={posts} />
			</div>
			<ExperienceSection experiences={experiences || null} />
			<ProjectsSection projects={projects || null} />
			<TechnologiesSection technologies={technologies || null} />
		</>
	);
}

export default function Home() {
	return (
		<PageShell>
			<PageContent withSectionSpacing>
				<Suspense fallback={<HomePageFallback />}>
					<HomePageContent />
				</Suspense>
				<ContactSection />
			</PageContent>
		</PageShell>
	);
}
