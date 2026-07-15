import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { PostSummary } from "@/utils/getAdjacentPosts";

interface PostNavigationProps {
	previousPost: PostSummary | null;
	nextPost: PostSummary | null;
}

export const PostNavigation = ({ previousPost, nextPost }: PostNavigationProps) => {
	const hasBothAdjacentPosts = Boolean(previousPost) && Boolean(nextPost);
	const buttonWidthClassName = hasBothAdjacentPosts ? "flex-1" : "w-full";

	if (!previousPost && !nextPost) {
		return null;
	}

	return (
		<div className="flex flex-col gap-4">
			<Separator />
			<nav className="flex flex-col sm:flex-row gap-3" aria-label="Post navigation">
				{previousPost && (
					<Button
						variant="outline"
						className={twMerge("justify-center", buttonWidthClassName)}
						asChild
					>
						<Link href={`/blog/${previousPost.slug}`}>
							<ArrowLeft className="size-4" aria-hidden="true" />
							<span className="truncate">{previousPost.title}</span>
						</Link>
					</Button>
				)}
				{nextPost && (
					<Button
						variant="outline"
						className={twMerge("justify-center", buttonWidthClassName)}
						asChild
					>
						<Link href={`/blog/${nextPost.slug}`}>
							<span className="truncate">{nextPost.title}</span>
							<ArrowRight className="size-4" aria-hidden="true" />
						</Link>
					</Button>
				)}
			</nav>
		</div>
	);
};
