import { client } from "@/lib/apolloClient";
import { MyQueryDocument } from "@/types/graphql";
import { MyQueryQuery } from "@/types/graphql";
    
export const getExperiences = async () => {
    const { data } = await client.query<MyQueryQuery>({
    query: MyQueryDocument,
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