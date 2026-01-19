import { ProjectsView } from "./ProjectsView";
import type { GetProjectsQuery } from "@/types/graphql";

interface ProjectsSectionProps {
  projects: GetProjectsQuery | null;
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="grid grid-cols-1 col-span-2 gap-4 items-start justify-center">
      <h2 className="text-base sm:text-lg font-commit-mono-bold font-mono">Projects</h2>
      <ProjectsView projects={projects?.projects || []} />
    </section>
  );
};