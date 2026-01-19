import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { MyQueryDocument } from "@/types/graphql";
import { MyQueryQuery } from "@/types/graphql";
    
export const getExperiences = cache(async () => {
    const { data } = await client.query<MyQueryQuery>({
    query: MyQueryDocument,
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