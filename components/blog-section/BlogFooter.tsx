import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlogPageHeader } from "@/components/blog-section/BlogPageHeader";
import { Button } from "@/components/ui/button";
import type { GetPostsQuery } from "@/types/graphql";

interface BlogFooterProps {
	posts: GetPostsQuery | null;
}

function getPostCount(posts: GetPostsQuery | null): number {
	return posts?.posts?.length ?? 0;
}

export const BlogFooter = ({ posts }: BlogFooterProps) => {
	const postCount = getPostCount(posts);

	return (
		<footer
			id="blog"
			className="w-full max-w-4xl px-4 sm:px-8 md:px-16 pt-8 sm:pt-12 pb-8 sm:pb-10 flex flex-col items-center gap-8"
		>
			<BlogPageHeader postCount={postCount} headingLevel="h2" />
			<Button variant="outline" className="w-full sm:w-auto" asChild>
				<Link href="/blog">
					View posts
					<ArrowRight className="size-4" aria-hidden="true" />
				</Link>
			</Button>
		</footer>
	);
};
