import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { apolloQueryOptions } from "@/lib/apolloQueryOptions";
import { GetPostDocument, type GetPostQuery } from "@/types/graphql";
import { type Post, PostSchema } from "@/types/schemas";

export const getPost = cache(async (slug: string): Promise<Post> => {
	try {
		const { data } = await client.query<GetPostQuery>({
			query: GetPostDocument,
			variables: { slug },
			...apolloQueryOptions,
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
