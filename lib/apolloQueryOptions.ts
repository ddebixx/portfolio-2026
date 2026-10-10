import type { FetchPolicy } from "@apollo/client";
import { HYGRAPH_CACHE_TAG, HYGRAPH_REVALIDATE_SECONDS } from "@/lib/hygraphCache";

const isDevelopment = process.env.NODE_ENV === "development";

type ApolloFetchOptions =
	| { cache: "no-store" }
	| {
			cache: "force-cache";
			next: {
				revalidate: number;
				tags: string[];
			};
	  };

type ApolloQueryOptions = {
	fetchPolicy: FetchPolicy;
	context: {
		fetchOptions: ApolloFetchOptions;
	};
};

function createProductionFetchOptions(): ApolloFetchOptions {
	return {
		cache: "force-cache",
		next: {
			revalidate: HYGRAPH_REVALIDATE_SECONDS,
			tags: [HYGRAPH_CACHE_TAG],
		},
	};
}

function createApolloQueryOptions(): ApolloQueryOptions {
	return {
		fetchPolicy: "no-cache",
		context: {
			fetchOptions: isDevelopment ? { cache: "no-store" } : createProductionFetchOptions(),
		},
	};
}

export const apolloQueryOptions = createApolloQueryOptions();
