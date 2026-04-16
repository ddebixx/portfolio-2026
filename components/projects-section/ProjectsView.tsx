"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GetProjectsQuery } from "@/types/graphql";
import { ProjectCard } from "./ProjectCard";

interface ProjectsViewProps {
	projects: GetProjectsQuery["projects"];
}

export const ProjectsView = ({ projects }: ProjectsViewProps) => {
	return (
		<Tabs defaultValue="grid" className="w-full">
			<TabsList className="max-sm:hidden">
				<TabsTrigger value="grid">Grid</TabsTrigger>
				<TabsTrigger value="list">List</TabsTrigger>
			</TabsList>

			<TabsContent value="grid" className="mt-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{projects?.map((project) => (
						<ProjectCard key={project.projectTitle} project={project} layout="grid" />
					))}
				</div>
			</TabsContent>

			<TabsContent value="list" className="mt-4">
				<div className="grid grid-cols-1 gap-4">
					{projects?.map((project) => (
						<ProjectCard key={project.projectTitle} project={project} layout="list" />
					))}
				</div>
			</TabsContent>
		</Tabs>
	);
};
