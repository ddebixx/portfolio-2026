"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GetProjectsQuery } from "@/types/graphql";
import { ProjectInfoModal } from "./ProjectInfoModal";

interface ProjectCardProps {
	project: GetProjectsQuery["projects"][number];
	layout: "grid" | "list";
}

function getCardContainerClass(isGridLayout: boolean): string {
	return isGridLayout
		? "border border-border p-3 sm:p-4 flex flex-col h-full"
		: "flex flex-col sm:flex-row gap-3 sm:gap-4 border border-border p-3 sm:p-4";
}

function getCardImageDimensions(isGridLayout: boolean): { width: number; height: number } {
	return isGridLayout ? { width: 400, height: 300 } : { width: 200, height: 150 };
}

function getCardImageClassName(isGridLayout: boolean): string {
	return isGridLayout
		? "w-full rounded h-40 sm:h-48 object-cover mb-3 sm:mb-4"
		: "w-full rounded sm:w-48 h-32 sm:h-32 object-cover shrink-0";
}

function getCardDescriptionClassName(isGridLayout: boolean): string {
	return isGridLayout
		? "projects-description text-sm mb-3 line-clamp-3"
		: "projects-description text-sm mb-3 line-clamp-2";
}

function getDetailsButtonClassName(isGridLayout: boolean): string {
	return isGridLayout ? "w-full mt-auto" : "w-full sm:w-auto mt-auto";
}

export const ProjectCard = ({ project, layout }: ProjectCardProps) => {
	const isGridLayout = layout === "grid";
	const imageDimensions = getCardImageDimensions(isGridLayout);

	return (
		<div className={getCardContainerClass(isGridLayout)}>
			<Image
				src={project.projectPhoto.url}
				alt={project.projectTitle}
				width={imageDimensions.width}
				height={imageDimensions.height}
				className={getCardImageClassName(isGridLayout)}
			/>
			<div className="flex-1 flex flex-col">
				<h3 className="text-xs sm:text-sm font-commit-mono-bold font-mono mb-2">
					{project.projectTitle}
				</h3>
				<div
					className={getCardDescriptionClassName(isGridLayout)}
					dangerouslySetInnerHTML={{
						__html: project.projectDescription?.html || "",
					}}
				/>
				<div className="projects-tech-stack flex flex-wrap gap-2 mb-3">
					{project.techStack?.map((tech) => (
						<Badge key={tech} variant="default">
							{tech}
						</Badge>
					))}
				</div>
				<ProjectInfoModal
					project={project}
					trigger={
						<Button variant="outline" className={getDetailsButtonClassName(isGridLayout)}>
							View Details
						</Button>
					}
				/>
			</div>
		</div>
	);
};
