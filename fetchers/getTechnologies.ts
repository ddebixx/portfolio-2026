import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { GetTechnologiesDocument, type GetTechnologiesQuery } from "@/types/graphql";

const isDevelopment = process.env.NODE_ENV === "development";

export const getTechnologies = cache(async () => {
	const { data } = await client.query<GetTechnologiesQuery>({
		query: GetTechnologiesDocument,
		fetchPolicy: isDevelopment ? "network-only" : "cache-first",
		context: {
			fetchOptions: {
				next: {
					revalidate: isDevelopment ? 0 : 3600,
				},
			},
		},
	});
	return data;
});
