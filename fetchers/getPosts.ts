import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { GetPostsDocument, type GetPostsQuery } from "@/types/graphql";
import { type PostSummary, PostSummarySchema } from "@/types/schemas";

const isDevelopment = process.env.NODE_ENV === "development";

export const getPosts = cache(async (): Promise<PostSummary[]> => {
	try {
		const { data } = await client.query<GetPostsQuery>({
			query: GetPostsDocument,
			fetchPolicy: isDevelopment ? "network-only" : "cache-first",
			context: {
				fetchOptions: {
					next: {
						revalidate: isDevelopment ? 0 : 3600,
					},
				},
			},
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
