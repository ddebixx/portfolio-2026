import { getProjects } from "@/fetchers/getProjects";
import { ProjectsView } from "./ProjectsView";

export const ProjectsSection = async () => {
  const projects = await getProjects();

  return (
    <section id="projects" className="grid grid-cols-1 col-span-2 gap-4 items-start justify-center">
      <h2 className="text-base sm:text-lg font-commit-mono-bold font-mono">Projects</h2>
      <ProjectsView projects={projects?.projects || []} />
    </section>
  );
};