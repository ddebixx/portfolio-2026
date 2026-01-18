import { client } from "@/lib/apolloClient";
import { GetProjectsDocument, GetProjectsQuery } from "@/types/graphql";

export const getProjects = async () => {
    const { data } = await client.query<GetProjectsQuery>({
        query: GetProjectsDocument,
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