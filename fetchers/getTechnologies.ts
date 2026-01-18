import { client } from "@/lib/apolloClient";
import { GetTechnologiesQuery } from "@/types/graphql";
import { GetTechnologiesDocument } from "@/types/graphql";

export const getTechnologies = async () => {
    const { data } = await client.query<GetTechnologiesQuery>({
        query: GetTechnologiesDocument,
        fetchPolicy: "network-only",
        context: {
            fetchOptions: {
                next: {
                    revalidate: 60,
                },
            },
        },
    });
    return data;
};