import type { GetProjectsQuery, MyQueryQuery } from "@/types/graphql";

function asUrlArray(url: string | null | undefined): string[] {
	return url ? [url] : [];
}

export function extractImageUrls(
	experiences: MyQueryQuery | null | undefined,
	projects: GetProjectsQuery | null | undefined
): string[] {
	const experienceUrls =
		experiences?.experiences?.flatMap((exp) => asUrlArray(exp.companyLogo?.url)) ?? [];

	const projectUrls =
		projects?.projects?.flatMap((project) => [
			...asUrlArray(project.projectPhoto?.url),
			...(project.projectsPhotos?.flatMap((photo) => asUrlArray(photo.url)) ?? []),
		]) ?? [];

	return [...experienceUrls, ...projectUrls];
}
