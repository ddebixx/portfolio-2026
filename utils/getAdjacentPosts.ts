import type { PostSummary } from "@/types/schemas";

interface AdjacentPosts {
	previousPost: PostSummary | undefined;
	nextPost: PostSummary | undefined;
}

export function getAdjacentPosts(posts: PostSummary[], currentSlug: string): AdjacentPosts {
	const currentPostIndex = posts.findIndex((post) => post.slug === currentSlug);

	if (currentPostIndex === -1) {
		return {
			previousPost: undefined,
			nextPost: undefined,
		};
	}

	return {
		previousPost: posts[currentPostIndex - 1],
		nextPost: posts[currentPostIndex + 1],
	};
}
