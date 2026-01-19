import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { MyQueryDocument } from "@/types/graphql";
import { MyQueryQuery } from "@/types/graphql";

const isDevelopment = process.env.NODE_ENV === "development";
    
export const getExperiences = cache(async () => {
    const { data } = await client.query<MyQueryQuery>({
    query: MyQueryDocument,
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