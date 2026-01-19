import type { GetProjectsQuery } from "@/types/graphql";
import type { MyQueryQuery } from "@/types/graphql";

export function extractImageUrls(
  experiences: MyQueryQuery | null | undefined,
  projects: GetProjectsQuery | null | undefined
): string[] {
  const imageUrls: string[] = [];

  if (experiences?.experiences) {
    experiences.experiences.forEach((exp) => {
      if (exp.companyLogo?.url) {
        imageUrls.push(exp.companyLogo.url);
      }
    });
  }

  if (projects?.projects) {
    projects.projects.forEach((project) => {
      if (project.projectPhoto?.url) {
        imageUrls.push(project.projectPhoto.url);
      }
      if (project.projectsPhotos) {
        project.projectsPhotos.forEach((photo) => {
          if (photo.url) {
            imageUrls.push(photo.url);
          }
        });
      }
    });
  }

  return imageUrls;
}
