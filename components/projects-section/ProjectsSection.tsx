import { ProjectsView } from "./ProjectsView";
import type { GetProjectsQuery } from "@/types/graphql";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectsSectionProps {
  projects: GetProjectsQuery | null;
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="grid grid-cols-1 col-span-2 gap-4 items-start justify-center">
      <h2 className="text-base sm:text-lg font-commit-mono-bold font-mono">Projects</h2>
      {!projects?.projects ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-border p-3 sm:p-4 flex flex-col gap-3">
              <Skeleton className="w-full h-40 sm:h-48 rounded" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-9 w-full mt-auto" />
            </div>
          ))}
        </div>
      ) : (
        <ProjectsView projects={projects.projects} />
      )}
    </section>
  );
};