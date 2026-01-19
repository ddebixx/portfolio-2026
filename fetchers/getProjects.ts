import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { GetProjectsDocument, GetProjectsQuery } from "@/types/graphql";

const isDevelopment = process.env.NODE_ENV === "development";

export const getProjects = cache(async () => {
    const { data } = await client.query<GetProjectsQuery>({
        query: GetProjectsDocument,
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