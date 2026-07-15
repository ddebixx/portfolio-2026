import type { GetExperiencesQuery, GetPostsQuery, GetProjectsQuery } from "@/types/graphql";

function asUrlArray(url: string | null | undefined): string[] {
	return url ? [url] : [];
}

export function extractImageUrls(
	experiences: GetExperiencesQuery | null | undefined,
	projects: GetProjectsQuery | null | undefined,
	posts?: GetPostsQuery | null
): string[] {
	const experienceUrls =
		experiences?.experiences?.flatMap((exp) => asUrlArray(exp.companyLogo?.url)) ?? [];

	const projectUrls =
		projects?.projects?.flatMap((project) => [
			...asUrlArray(project.projectPhoto?.url),
			...(project.projectsPhotos?.flatMap((photo) => asUrlArray(photo.url)) ?? []),
		]) ?? [];

	const postUrls = posts?.posts?.flatMap((post) => asUrlArray(post.coverPhoto?.url)) ?? [];

	return [...new Set([...experienceUrls, ...projectUrls, ...postUrls])];
}
