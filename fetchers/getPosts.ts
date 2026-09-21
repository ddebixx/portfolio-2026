import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { apolloQueryOptions } from "@/lib/apolloQueryOptions";
import { GetPostsDocument, type GetPostsQuery } from "@/types/graphql";
import { type PostSummary, PostSummarySchema } from "@/types/schemas";

function getValidPostSummaries(posts: GetPostsQuery["posts"]): PostSummary[] {
	return posts.flatMap((post) => {
		const parsedPost = PostSummarySchema.safeParse(post);

		if (!parsedPost.success) {
			console.error("Invalid post data:", parsedPost.error.message);
			return [];
		}

		return [parsedPost.data];
	});
}

export const getPosts = cache(async (): Promise<PostSummary[]> => {
	try {
		const { data } = await client.query<GetPostsQuery>({
			query: GetPostsDocument,
			...apolloQueryOptions,
		});

		if (!data?.posts) {
			return [];
		}

		return getValidPostSummaries(data.posts);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return [];
	}
});
