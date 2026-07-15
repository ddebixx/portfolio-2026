import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { GetPostDocument, type GetPostQuery } from "@/types/graphql";
import { type Post, PostSchema } from "@/types/schemas";

const isDevelopment = process.env.NODE_ENV === "development";

export const getPost = cache(async (slug: string): Promise<Post> => {
	try {
		const { data } = await client.query<GetPostQuery>({
			query: GetPostDocument,
			variables: { slug },
			fetchPolicy: isDevelopment ? "network-only" : "cache-first",
			context: {
				fetchOptions: {
					next: {
						revalidate: isDevelopment ? 0 : 3600,
					},
				},
			},
		});

		if (!data?.post) {
			throw new Error(`Post with slug ${slug} not found`);
		}

		return PostSchema.parse(data.post);
	} catch (error) {
		console.error(`[getPost Error]: ${error}`);
		throw error;
	}
});
