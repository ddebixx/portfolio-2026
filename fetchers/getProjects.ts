import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { apolloQueryOptions } from "@/lib/apolloQueryOptions";
import { GetProjectsDocument, type GetProjectsQuery } from "@/types/graphql";

export const getProjects = cache(async () => {
	const { data } = await client.query<GetProjectsQuery>({
		query: GetProjectsDocument,
		...apolloQueryOptions,
	});
	return data;
});
