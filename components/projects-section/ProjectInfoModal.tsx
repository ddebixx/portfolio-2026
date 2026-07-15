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

interface ProjectInfoModalProps {
	project: GetProjectsQuery["projects"][0];
	trigger: ReactNode;
}

export const ProjectInfoModal = ({ project, trigger }: ProjectInfoModalProps) => {
	const [open, setOpen] = useState(false);
	const { handleImageLoad, resetLoadedImages, isImageLoaded } = useImageLoader();

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
					{project.projectsPhotos && project.projectsPhotos.length > 0 && (
						<Carousel className="w-full">
							<CarouselContent>
								{project.projectsPhotos.map((photo, index) => {
									const isLoaded = isImageLoaded(photo.url);
									return (
										<CarouselItem key={photo.url}>
											<div className="relative w-full aspect-[9/16] sm:aspect-video md:aspect-video rounded-lg overflow-hidden">
												{!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
												<Image
													src={photo.url}
													alt={`${project.projectTitle} - Image ${index + 1}`}
													fill
													className={`object-cover transition-opacity duration-300 ${
														isLoaded ? "opacity-100" : "opacity-0"
													}`}
													onLoad={() => handleImageLoad(photo.url)}
													onLoadingComplete={() => handleImageLoad(photo.url)}
												/>
											</div>
										</CarouselItem>
									);
								})}
							</CarouselContent>
							{project.projectsPhotos.length > 1 && (
								<>
									<CarouselPrevious className="left-1 sm:left-4" />
									<CarouselNext className="right-1 sm:right-4" />
								</>
							)}
						</Carousel>
					)}

					{project.techStack && project.techStack.length > 0 && (
						<div className="flex flex-wrap gap-1.5 sm:gap-2">
							{project.techStack.map((tech) => (
								<Badge key={tech} variant="default">
									{tech}
								</Badge>
							))}
						</div>
					)}

					{!project.projectsPhotos || project.projectsPhotos.length === 0 ? (
						<div className="relative w-full aspect-[9/16] sm:aspect-video md:aspect-video rounded-lg overflow-hidden">
							{!isImageLoaded(project.projectPhoto.url) && (
								<Skeleton className="absolute inset-0 w-full h-full" />
							)}
							<Image
								src={project.projectPhoto.url}
								alt={project.projectTitle}
								fill
								className={`object-cover transition-opacity duration-300 ${
									isImageLoaded(project.projectPhoto.url) ? "opacity-100" : "opacity-0"
								}`}
								onLoad={() => handleImageLoad(project.projectPhoto.url)}
								onLoadingComplete={() => handleImageLoad(project.projectPhoto.url)}
							/>
						</div>
					) : null}

					{project.projectDescription?.html ? (
						<div className="glass-panel p-4 sm:p-5">
							<p className="mb-3 text-[11px] sm:text-xs font-mono text-terminal-green opacity-80">
								{"// overview"}
							</p>
							<div
								className="projects-description text-xs sm:text-sm"
								dangerouslySetInnerHTML={{
									__html: project.projectDescription.html,
								}}
							/>
						</div>
					) : (
						<div className="glass-panel p-4 sm:p-5 space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
						</div>
					)}

					{project.projectIdea?.html ? (
						<div className="glass-panel p-4 sm:p-5">
							<p className="mb-3 text-[11px] sm:text-xs font-mono text-terminal-green opacity-80">
								{"// idea"}
							</p>
							<div
								className="projects-description text-xs sm:text-sm"
								dangerouslySetInnerHTML={{
									__html: project.projectIdea.html,
								}}
							/>
						</div>
					) : project.projectIdea ? (
						<div className="glass-panel p-4 sm:p-5 space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-2/3" />
						</div>
					) : null}
				</div>
			</DialogContent>
		</Dialog>
	);
};
