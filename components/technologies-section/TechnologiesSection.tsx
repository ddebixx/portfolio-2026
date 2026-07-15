import { SectionHeading } from "@/components/shared/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import type { GetTechnologiesQuery } from "@/types/graphql";

interface TechnologiesSectionProps {
	technologies: GetTechnologiesQuery | null;
}

export const TechnologiesSection = ({ technologies }: TechnologiesSectionProps) => {
	return (
		<section
			id="technologies"
			className="flex flex-col gap-4 sm:gap-6 w-full fade-in-up [animation-delay:160ms]"
		>
			<SectionHeading>Techstack</SectionHeading>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
				{!technologies?.techstacks
					? [1, 2, 3, 4, 5, 6].map((i) => (
							<div key={i} className="glass-panel p-3 sm:p-4 w-full">
								<Skeleton className="h-5 w-32 mb-2" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4 mt-2" />
							</div>
						))
					: technologies.techstacks.map((technology) => (
							<div
								key={technology.technologyTitle}
								className="glass-panel glass-panel-interactive cursor-pointer p-3 sm:p-4 group w-full"
							>
								<h3 className="text-sm sm:text-base font-commit-mono-regular font-mono transition-colors duration-200 group-hover:text-terminal-green">
									{technology.technologyTitle}
								</h3>
								<div
									className="technologies-description text-xs text-muted-foreground line-clamp-3 mt-2 transition-colors duration-200 group-hover:text-muted-foreground/90"
									dangerouslySetInnerHTML={{ __html: technology.technologyDescription || "" }}
								/>
							</div>
						))}
			</div>
		</section>
	);
};
