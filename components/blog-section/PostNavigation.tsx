import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { PostSummary } from "@/types/schemas";

interface PostNavigationProps {
	previousPost: PostSummary | undefined;
	nextPost: PostSummary | undefined;
}

interface PostNavigationLinkProps {
	post: PostSummary;
	direction: "previous" | "next";
	widthClassName: string;
}

const PostNavigationLink = ({ post, direction, widthClassName }: PostNavigationLinkProps) => {
	const isPrevious = direction === "previous";

	return (
		<Button variant="outline" className={twMerge("justify-center", widthClassName)} asChild>
			<Link href={`/blog/${post.slug}`}>
				{isPrevious && <ArrowLeft className="size-4" aria-hidden="true" />}
				<span className="truncate">{post.title}</span>
				{!isPrevious && <ArrowRight className="size-4" aria-hidden="true" />}
			</Link>
		</Button>
	);
};

export const PostNavigation = ({ previousPost, nextPost }: PostNavigationProps) => {
	if (!previousPost && !nextPost) {
		return null;
	}

	const hasBothPosts = Boolean(previousPost) && Boolean(nextPost);
	const widthClassName = hasBothPosts ? "flex-1" : "w-full";

	return (
		<div className="flex flex-col gap-4">
			<Separator />
			<nav className="flex flex-col sm:flex-row gap-3" aria-label="Post navigation">
				{previousPost && (
					<PostNavigationLink
						post={previousPost}
						direction="previous"
						widthClassName={widthClassName}
					/>
				)}
				{nextPost && (
					<PostNavigationLink post={nextPost} direction="next" widthClassName={widthClassName} />
				)}
			</nav>
		</div>
	);
};
