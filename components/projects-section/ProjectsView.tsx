"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectInfoModal } from "./ProjectInfoModal";
import Image from "next/image";
import type { GetProjectsQuery } from "@/types/graphql";

interface ProjectsViewProps {
  projects: GetProjectsQuery["projects"];
}

export const ProjectsView = ({ projects }: ProjectsViewProps) => {
  return (
    <Tabs defaultValue="grid" className="w-full">
      <TabsList>
        <TabsTrigger value="grid">Grid</TabsTrigger>
        <TabsTrigger value="list">List</TabsTrigger>
      </TabsList>

      <TabsContent value="grid" className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects?.map((project) => (
            <div key={project.projectTitle} className="border border-border p-3 sm:p-4  -lg">
              <Image
                src={project.projectPhoto.url}
                alt={project.projectTitle}
                width={400}
                height={300}
                className="w-full h-40 sm:h-48 object-cover   mb-3 sm:mb-4"
              />
              <h3 className="text-xs sm:text-sm font-commit-mono-bold font-mono mb-2">
                {project.projectTitle}
              </h3>
              <div
                className="projects-description text-sm mb-3 line-clamp-3"
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
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                }
              />
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="list" className="mt-4">
        <div className="grid grid-cols-1 gap-4">
          {projects?.map((project) => (
            <div
              key={project.projectTitle}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 border border-border p-3 sm:p-4  -lg"
            >
              <Image
                src={project.projectPhoto.url}
                alt={project.projectTitle}
                width={200}
                height={150}
                className="w-full sm:w-48 h-32 sm:h-32 object-cover   flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xs sm:text-sm font-commit-mono-bold font-mono mb-2">
                  {project.projectTitle}
                </h3>
                <div
                  className="projects-description text-sm mb-3 line-clamp-2"
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
                    <Button variant="outline" className="w-full sm:w-auto">
                      View Details
                    </Button>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
