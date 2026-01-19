import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { GetTechnologiesQuery } from "@/types/graphql";
import { GetTechnologiesDocument } from "@/types/graphql";

export const getTechnologies = cache(async () => {
    const { data } = await client.query<GetTechnologiesQuery>({
        query: GetTechnologiesDocument,
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