import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { GetAuthorDocument, GetAuthorQuery } from "@/types/graphql";

const isDevelopment = process.env.NODE_ENV === "development";

export const getAuthor = cache(async () => {
  const { data } = await client.query<GetAuthorQuery>({
    query: GetAuthorDocument,
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