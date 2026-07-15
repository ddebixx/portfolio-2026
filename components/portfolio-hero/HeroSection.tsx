import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { GetAuthorQuery } from "@/types/graphql";

interface HeroSectionProps {
	author: GetAuthorQuery | null;
}

const resumeFileName = "Andrii_Naida_FullStack_Resume.pdf";
const resumePath = `/documents/${resumeFileName}`;

const HeroSectionSkeleton = () => {
	return (
		<section id="hero" className="flex flex-col gap-4 sm:gap-5 w-full">
			<Skeleton className="h-6 w-48" />
			<Skeleton className="h-4 w-full max-w-md" />
			<Skeleton className="h-4 w-32" />
			<Skeleton className="h-9 w-40" />
		</section>
	);
};

export const HeroSection = ({ author }: HeroSectionProps) => {
	const authorData = author?.authors?.[0];

	if (!authorData) {
		return <HeroSectionSkeleton />;
	}

	return (
		<section id="hero" className="flex flex-col gap-4 sm:gap-5 w-full fade-in-up">
			<h1 className="text-xl sm:text-2xl font-commit-mono-bold font-mono cursor-blink">
				{authorData.name}
			</h1>
			<p className="text-xs sm:text-sm font-commit-mono-regular text-muted-foreground">
				{authorData.authorDescription}
			</p>
			<div
				className="social-links mt-2 text-sm"
				dangerouslySetInnerHTML={{ __html: authorData.socials?.html || "" }}
			/>
			<a href={resumePath} download={resumeFileName} className="mt-2">
				<Button variant="outline" className="w-full sm:w-auto cursor-pointer">
					<Download className="size-4" />
					Download Resume
				</Button>
			</a>
		</section>
	);
};
