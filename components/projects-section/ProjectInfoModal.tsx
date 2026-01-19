"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GetProjectsQuery } from "@/types/graphql";

interface ProjectInfoModalProps {
  project: GetProjectsQuery["projects"][0];
  trigger: React.ReactNode;
}

export const ProjectInfoModal = ({ project, trigger }: ProjectInfoModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle>{project.projectTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {project.projectsPhotos && project.projectsPhotos.length > 0 && (
            <Carousel className="w-full">
              <CarouselContent>
                {project.projectsPhotos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full aspect-[9/16] sm:aspect-video md:aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={photo.url}
                        alt={`${project.projectTitle} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
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
              <Image
                src={project.projectPhoto.url}
                alt={project.projectTitle}
                fill
                className="object-cover"
              />
            </div>
          ) : null}

          <div
            className="projects-description text-xs sm:text-sm"
            dangerouslySetInnerHTML={{
              __html: project.projectDescription?.html || "",
            }}
          />

          {project.projectIdea?.html && (
            <div
              className="projects-description text-xs sm:text-sm"
              dangerouslySetInnerHTML={{
                __html: project.projectIdea.html,
              }}
            />
          )}

          
        </div>
      </DialogContent>
    </Dialog>
  );
};
