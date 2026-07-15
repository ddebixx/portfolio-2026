import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PostMeta } from "@/components/blog-section/PostMeta";
import { Card, CardTitle } from "@/components/ui/card";
import type { GetPostsQuery } from "@/types/graphql";
import { calculateReadTimeInMinutes } from "@/utils/calculateReadTimeInMinutes";
import { getPostExcerpt } from "@/utils/getPostExcerpt";

interface BlogPostCardProps {
	post: GetPostsQuery["posts"][number];
}

export const BlogPostCard = ({ post }: BlogPostCardProps) => {
	const readTimeInMinutes = calculateReadTimeInMinutes(post.content.text);
	const postExcerpt = getPostExcerpt(post.content.text);

	return (
		<Card className="group glass-panel-interactive transition-colors duration-200 hover:border-terminal-green/30">
			<Link href={`/blog/${post.slug}`} className="block p-4 sm:p-5">
				<div className="flex items-start gap-3 sm:gap-4">
					<ArrowRight
						aria-hidden="true"
						className="size-4 shrink-0 rotate-45 mt-0.5 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-terminal-green"
					/>
					<div className="flex min-w-0 flex-1 flex-col gap-3">
						<CardTitle className="text-sm sm:text-base text-foreground">{post.title}</CardTitle>
						<PostMeta datePublished={post.datePublished} readTimeInMinutes={readTimeInMinutes} />
						<p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-2">
							{postExcerpt}
						</p>
					</div>
				</div>
			</Link>
		</Card>
	);
};
