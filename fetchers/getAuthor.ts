import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { apolloQueryOptions } from "@/lib/apolloQueryOptions";
import { GetAuthorDocument, type GetAuthorQuery } from "@/types/graphql";

export const getAuthor = cache(async () => {
	const { data } = await client.query<GetAuthorQuery>({
		query: GetAuthorDocument,
		...apolloQueryOptions,
	});
	return data;
});
