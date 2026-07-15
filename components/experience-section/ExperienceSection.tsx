import Image from "next/image";
import "../../app/styles/components.css";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import type { GetExperiencesQuery } from "@/types/graphql";

interface ExperienceSectionProps {
	experiences: GetExperiencesQuery | null;
}

type ExperienceItemData = GetExperiencesQuery["experiences"][number];

const skeletonItems = [1, 2, 3] as const;

function getExperienceItemKey(experience: ExperienceItemData, index: number): string {
	return `${experience.companyLogo.url}-${experience.workdateFrom}-${experience.workdateTo ?? "present"}-${index}`;
}

function getExperiencePeriodLabel(experience: ExperienceItemData): string {
	return `${experience.workdateFrom} - ${experience.workdateTo || "Present"}`;
}

const ExperienceSkeletonItem = () => {
	return (
		<div className="relative pl-8 sm:pl-8 pb-6 sm:pb-8">
			<Skeleton className="h-4 w-32 mb-3" />
			<div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
				<Skeleton className="w-10 h-10 rounded-full shrink-0" />
				<div className="flex-1 space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</div>
		</div>
	);
};

interface ExperienceItemProps {
	experience: ExperienceItemData;
	isLastItem: boolean;
}

const ExperienceItem = ({ experience, isLastItem }: ExperienceItemProps) => {
	return (
		<article className="experience-item relative pl-8 sm:pl-8 pb-6 sm:pb-8">
			{!isLastItem ? (
				<span aria-hidden className="absolute left-2 sm:left-3 top-8 bottom-0 w-px bg-border" />
			) : null}

			<span
				aria-hidden
				className="absolute left-0 top-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-terminal-green border-2 border-background flex items-center justify-center"
			>
				<span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-background" />
			</span>

			<div className="mb-3">
				<p className="text-xs font-commit-mono-regular font-mono text-muted-foreground">
					{getExperiencePeriodLabel(experience)}
				</p>
			</div>

			<div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 glass-panel p-4 sm:p-5">
				<Image
					src={experience.companyLogo.url}
					alt="Company logo"
					width={100}
					height={100}
					className="w-10 h-10 rounded-full shrink-0"
				/>
				<div
					className="experience-description flex-1"
					dangerouslySetInnerHTML={{ __html: experience.companyInfo?.html || "" }}
				/>
			</div>
		</article>
	);
};

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
	const experienceList = experiences?.experiences ?? [];
	const isLoading = experienceList.length === 0;

	return (
		<section
			id="experience"
			className="flex flex-col gap-4 sm:gap-6 w-full fade-in-up [animation-delay:80ms]"
		>
			<SectionHeading>Experience</SectionHeading>
			<div className="experience-timeline relative">
				{isLoading
					? skeletonItems.map((item) => <ExperienceSkeletonItem key={item} />)
					: experienceList.map((experience, index) => (
							<ExperienceItem
								key={getExperienceItemKey(experience, index)}
								experience={experience}
								isLastItem={index === experienceList.length - 1}
							/>
						))}
			</div>
		</section>
	);
};
