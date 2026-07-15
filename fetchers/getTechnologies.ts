import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { apolloQueryOptions } from "@/lib/apolloQueryOptions";
import { GetTechnologiesDocument, type GetTechnologiesQuery } from "@/types/graphql";

export const getTechnologies = cache(async () => {
	const { data } = await client.query<GetTechnologiesQuery>({
		query: GetTechnologiesDocument,
		...apolloQueryOptions,
	});
	return data;
});
