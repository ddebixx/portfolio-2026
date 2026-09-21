import type { PostSummary } from "@/types/schemas";
import { BlogPostCard } from "./BlogPostCard";

interface BlogViewProps {
	posts: PostSummary[];
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
