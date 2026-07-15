import type { GetPostsQuery } from "@/types/graphql";
import { BlogPostCard } from "./BlogPostCard";

interface BlogViewProps {
	posts: GetPostsQuery["posts"];
}

export const BlogView = ({ posts }: BlogViewProps) => {
	return (
		<div className="flex flex-col gap-5">
			{posts.map((post) => (
				<BlogPostCard key={post.id} post={post} />
			))}
		</div>
	);
};
