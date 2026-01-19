import { cache } from "react";
import { client } from "@/lib/apolloClient";
import { GetAuthorDocument, GetAuthorQuery } from "@/types/graphql";

export const getAuthor = cache(async () => {
  const { data } = await client.query<GetAuthorQuery>({
    query: GetAuthorDocument,
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