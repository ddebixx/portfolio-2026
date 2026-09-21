import type { PostSummary } from "@/types/schemas";

export interface BlogCategoryGroup {
	categoryName: string;
	posts: PostSummary[];
}

interface GroupPostsByCategoryInput {
	posts: PostSummary[];
	fallbackCategoryName: string;
}

function getCategoryName(post: PostSummary, fallbackCategoryName: string): string {
	const categoryName = post.category?.trim() ?? "";

	if (!categoryName) {
		return fallbackCategoryName;
	}

	return categoryName;
}

function appendPostToCategory(
	postsByCategoryName: Map<string, PostSummary[]>,
	categoryName: string,
	post: PostSummary
): void {
	const categoryPosts = postsByCategoryName.get(categoryName) ?? [];
	postsByCategoryName.set(categoryName, [...categoryPosts, post]);
}

export function groupPostsByCategory({
	posts,
	fallbackCategoryName,
}: GroupPostsByCategoryInput): BlogCategoryGroup[] {
	const postsByCategoryName = new Map<string, PostSummary[]>();

	for (const post of posts) {
		const categoryName = getCategoryName(post, fallbackCategoryName);
		appendPostToCategory(postsByCategoryName, categoryName, post);
	}

	return [...postsByCategoryName.entries()].map(([categoryName, categoryPosts]) => ({
		categoryName,
		posts: categoryPosts,
	}));
}
