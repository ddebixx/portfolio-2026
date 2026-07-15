import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { apolloQueryOptions } from "@/lib/apolloQueryOptions";
import { GetPostsDocument, type GetPostsQuery } from "@/types/graphql";
import { type PostSummary, PostSummarySchema } from "@/types/schemas";

export const getPosts = cache(async (): Promise<PostSummary[]> => {
	try {
		const { data } = await client.query<GetPostsQuery>({
			query: GetPostsDocument,
			...apolloQueryOptions,
		});

		if (!data?.posts) {
			throw new Error("No posts found in response");
		}

		return data.posts.map((post) => {
			const result = PostSummarySchema.safeParse(post);

			if (!result.success) {
				throw new Error(`Invalid post data: ${result.error.message}`);
			}

			return result.data;
		});
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
});
