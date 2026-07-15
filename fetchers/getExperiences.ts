import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { apolloQueryOptions } from "@/lib/apolloQueryOptions";
import { GetExperiencesDocument, type GetExperiencesQuery } from "@/types/graphql";

export const getExperiences = cache(async () => {
	const { data } = await client.query<GetExperiencesQuery>({
		query: GetExperiencesDocument,
		...apolloQueryOptions,
	});
	return data;
});
