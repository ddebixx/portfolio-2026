"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useImageLoader } from "@/hooks/useImageLoader";
import type { GetProjectsQuery } from "@/types/graphql";

type Project = GetProjectsQuery["projects"][0];
type ProjectPhoto = NonNullable<Project["projectsPhotos"]>[0];

interface ProjectInfoModalProps {
	project: Project;
	trigger: ReactNode;
}

interface ProjectCarouselProps {
	photos: ProjectPhoto[];
	title: string;
	isImageLoaded: (url: string) => boolean;
	onImageLoad: (url: string) => void;
}

interface ProjectCarouselSlideProps {
	photo: ProjectPhoto;
	title: string;
	index: number;
	isLoaded: boolean;
	onLoad: (url: string) => void;
}

interface ProjectSingleImageProps {
	url: string;
	title: string;
	isLoaded: boolean;
	onLoad: (url: string) => void;
}

interface ProjectHtmlPanelProps {
	label: string;
	html: string;
}

const projectImageContainerClassName =
	"relative w-full aspect-[9/16] sm:aspect-video md:aspect-video rounded-lg overflow-hidden";

const projectImageClassName = (isLoaded: boolean) =>
	`object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`;

const ProjectCarouselSlide = ({
	photo,
	title,
	index,
	isLoaded,
	onLoad,
}: ProjectCarouselSlideProps) => (
	<CarouselItem>
		<div className={projectImageContainerClassName}>
			{!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
			<Image
				src={photo.url}
				alt={`${title} - Image ${index + 1}`}
				fill
				className={projectImageClassName(isLoaded)}
				onLoad={() => onLoad(photo.url)}
				onLoadingComplete={() => onLoad(photo.url)}
			/>
		</div>
	</CarouselItem>
);

const ProjectCarousel = ({ photos, title, isImageLoaded, onImageLoad }: ProjectCarouselProps) => (
	<Carousel className="w-full">
		<CarouselContent>
			{photos.map((photo, index) => (
				<ProjectCarouselSlide
					key={photo.url}
					photo={photo}
					title={title}
					index={index}
					isLoaded={isImageLoaded(photo.url)}
					onLoad={onImageLoad}
				/>
			))}
		</CarouselContent>
		{photos.length > 1 && (
			<>
				<CarouselPrevious className="left-1 sm:left-4" />
				<CarouselNext className="right-1 sm:right-4" />
			</>
		)}
	</Carousel>
);

const ProjectSingleImage = ({ url, title, isLoaded, onLoad }: ProjectSingleImageProps) => (
	<div className={projectImageContainerClassName}>
		{!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
		<Image
			src={url}
			alt={title}
			fill
			className={projectImageClassName(isLoaded)}
			onLoad={() => onLoad(url)}
			onLoadingComplete={() => onLoad(url)}
		/>
	</div>
);

const ProjectTechBadges = ({ techStack }: { techStack: string[] }) => (
	<div className="flex flex-wrap gap-1.5 sm:gap-2">
		{techStack.map((tech) => (
			<Badge key={tech} variant="default">
				{tech}
			</Badge>
		))}
	</div>
);

const ProjectHtmlPanel = ({ label, html }: ProjectHtmlPanelProps) => (
	<div className="glass-panel p-4 sm:p-5">
		<p className="mb-3 text-[11px] sm:text-xs font-mono text-terminal-green opacity-80">{label}</p>
		<div
			className="projects-description text-xs sm:text-sm"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	</div>
);

const ProjectHtmlPanelSkeleton = () => (
	<div className="glass-panel p-4 sm:p-5 space-y-2">
		<Skeleton className="h-4 w-full" />
		<Skeleton className="h-4 w-full" />
		<Skeleton className="h-4 w-3/4" />
	</div>
);

export const ProjectInfoModal = ({ project, trigger }: ProjectInfoModalProps) => {
	const [open, setOpen] = useState(false);
	const { handleImageLoad, resetLoadedImages, isImageLoaded } = useImageLoader();

	const hasPhotosArray = Boolean(project.projectsPhotos?.length);

	function handleOpenChange(newOpen: boolean) {
		setOpen(newOpen);
		if (newOpen) {
			resetLoadedImages();
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 gap-5 sm:gap-6">
				<DialogHeader>
					<DialogTitle className="text-sm sm:text-base">{project.projectTitle}</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-4 sm:gap-5">
					{hasPhotosArray ? (
						<ProjectCarousel
							photos={project.projectsPhotos!}
							title={project.projectTitle}
							isImageLoaded={isImageLoaded}
							onImageLoad={handleImageLoad}
						/>
					) : (
						<ProjectSingleImage
							url={project.projectPhoto.url}
							title={project.projectTitle}
							isLoaded={isImageLoaded(project.projectPhoto.url)}
							onLoad={handleImageLoad}
						/>
					)}

					{project.techStack && project.techStack.length > 0 && (
						<ProjectTechBadges techStack={project.techStack} />
					)}

					{project.projectDescription?.html ? (
						<ProjectHtmlPanel label="// overview" html={project.projectDescription.html} />
					) : (
						<ProjectHtmlPanelSkeleton />
					)}

					{project.projectIdea?.html && (
						<ProjectHtmlPanel label="// idea" html={project.projectIdea.html} />
					)}

					{project.projectIdea && !project.projectIdea.html && <ProjectHtmlPanelSkeleton />}
				</div>
			</DialogContent>
		</Dialog>
	);
};
