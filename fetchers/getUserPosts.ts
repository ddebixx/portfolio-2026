import { client } from "@/lib/apolloClient";
import { GetPostsDocument, type GetPostsQuery } from "@/types/graphql";

export const getUserPosts = async () => {
	const { data } = await client.query<GetPostsQuery>({
		query: GetPostsDocument,
		fetchPolicy: "network-only",
		context: {
			fetchOptions: {
				next: {
					revalidate: 60,
				},
			},
		},
	});
	return data;
};
