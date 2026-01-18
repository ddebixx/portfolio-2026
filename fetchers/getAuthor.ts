import { client } from "@/lib/apolloClient";
import { GetAuthorDocument, GetAuthorQuery } from "@/types/graphql";

export const getAuthor = async () => {
  const { data } = await client.query<GetAuthorQuery>({
    query: GetAuthorDocument,
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