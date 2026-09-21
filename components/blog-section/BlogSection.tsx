import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { PostSummary } from "@/types/schemas";
import { getPostExcerpt } from "@/utils/getPostExcerpt";
import {
	BLOG_SECTION_DESCRIPTION,
	BLOG_SECTION_ENTRIES_LABEL,
	BLOG_SECTION_ENTRY_LABEL,
	BLOG_SECTION_HEADING,
	BLOG_SECTION_VIEW_POSTS_LABEL,
} from "./BlogSection.constants";

const BLOG_SECTION_EXCERPT_LENGTH = 140;

interface BlogSectionProps {
	posts: PostSummary[] | null;
}

interface BlogSectionPreviewProps {
	post: PostSummary;
}

function getBlogEntryLabel(postCount: number): string {
	if (postCount === 1) {
		return BLOG_SECTION_ENTRY_LABEL;
	}

	return BLOG_SECTION_ENTRIES_LABEL;
}

function getLatestPost(posts: PostSummary[]): PostSummary | undefined {
	return posts[0];
}

const BlogSectionSkeleton = () => {
	return (
		<section id="blog" className="flex flex-col gap-4 sm:gap-6 w-full">
			<Skeleton className="h-5 w-24" />
			<Skeleton className="h-4 w-full max-w-xl" />
			<Skeleton className="h-4 w-2/3 max-w-md" />
			<Skeleton className="h-3 w-28" />
			<div className="rounded-xl border border-white/10 p-4 sm:p-5 flex flex-col gap-2">
				<Skeleton className="h-4 w-40" />
				<Skeleton className="h-3 w-full" />
				<Skeleton className="h-3 w-full" />
				<Skeleton className="h-3 w-2/3" />
			</div>
			<Skeleton className="h-9 w-full sm:w-32" />
		</section>
	);
};

const BlogSectionPreview = ({ post }: BlogSectionPreviewProps) => {
	const postExcerpt = getPostExcerpt(post.content.text, BLOG_SECTION_EXCERPT_LENGTH);

	return (
		<Card className="glass-panel-interactive transition-colors duration-200 hover:border-terminal-green/30">
			<Link href={`/blog/${post.slug}`} className="block p-4 sm:p-5">
				<CardTitle className="text-sm text-foreground">{post.title}</CardTitle>
				<p className="mt-2 text-xs leading-relaxed tracking-wide text-muted-foreground/55 line-clamp-3">
					{postExcerpt}
				</p>
			</Link>
		</Card>
	);
};

export const BlogSection = ({ posts }: BlogSectionProps) => {
	if (!posts) {
		return <BlogSectionSkeleton />;
	}

	const postCount = posts.length;
	const latestPost = getLatestPost(posts);

	return (
		<section
			id="blog"
			className="flex flex-col gap-4 sm:gap-6 w-full fade-in-up [animation-delay:40ms]"
		>
			<SectionHeading>{BLOG_SECTION_HEADING}</SectionHeading>
			<p className="text-xs sm:text-sm font-commit-mono-regular text-muted-foreground max-w-xl">
				{BLOG_SECTION_DESCRIPTION}
			</p>
			<p className="text-xs font-mono text-muted-foreground">
				<span className="text-terminal-green font-commit-mono-bold">{postCount}</span>{" "}
				{getBlogEntryLabel(postCount)}
			</p>
			{latestPost ? <BlogSectionPreview post={latestPost} /> : null}
			<Button variant="outline" className="w-full sm:w-auto" asChild>
				<Link href="/blog">
					{BLOG_SECTION_VIEW_POSTS_LABEL}
					<ArrowRight className="size-4" aria-hidden="true" />
				</Link>
			</Button>
		</section>
	);
};
