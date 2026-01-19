import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { GetProjectsDocument, GetProjectsQuery } from "@/types/graphql";

export const getProjects = cache(async () => {
    const { data } = await client.query<GetProjectsQuery>({
        query: GetProjectsDocument,
        fetchPolicy: "cache-first",
        context: {
            fetchOptions: {
                next: {
                    revalidate: 3600,
                },
            },
        },
    });
    return data;
});