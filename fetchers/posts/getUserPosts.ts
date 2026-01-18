import { client } from "@/lib/apolloClient";
import { GetPostsDocument, GetPostsQuery } from "@/types/graphql";

export const getUserPosts = async () => {
  const { data } = await client.query<GetPostsQuery>({
    query: GetPostsDocument,
  });
  return data;
};