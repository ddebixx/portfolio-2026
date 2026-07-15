import type { FetchPolicy } from "@apollo/client";

const isDevelopment = process.env.NODE_ENV === "development";

export const apolloQueryOptions: {
	fetchPolicy: FetchPolicy;
	context: { fetchOptions: { next: { revalidate: number } } };
} = {
	fetchPolicy: isDevelopment ? "network-only" : "cache-first",
	context: {
		fetchOptions: {
			next: {
				revalidate: isDevelopment ? 0 : 3600,
			},
		},
	},
};
