import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogBackLink } from "@/components/blog-section/BlogBackLink";
import { PostMeta } from "@/components/blog-section/PostMeta";
import { PostNavigation } from "@/components/blog-section/PostNavigation";
import { PageContent } from "@/components/shared/PageContent";
import { PageShell } from "@/components/shared/PageShell";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getPost } from "@/fetchers/getPost";
import { getPosts } from "@/fetchers/getPosts";
import { calculateReadTimeInMinutes } from "@/utils/calculateReadTimeInMinutes";
import { getAdjacentPosts } from "@/utils/getAdjacentPosts";

interface BlogPostPageProps {
	params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const [post, posts] = await Promise.all([getPost(slug), getPosts()]);

	if (!post) {
		notFound();
	}

	const readTimeInMinutes = calculateReadTimeInMinutes(post.content.text);
	const { previousPost, nextPost } = getAdjacentPosts(posts, post.slug);

	return (
		<PageShell>
			<PageContent>
				<div className="flex flex-col gap-4 sm:gap-6">
					<BlogBackLink href="/blog" label="cd ../posts" />
					<Card className="gap-6 sm:gap-8">
						<CardContent className="flex flex-col gap-6 sm:gap-8 pt-4 sm:pt-5 pb-4 sm:pb-5">
							<div className="flex flex-col gap-3">
								<CardTitle className="text-lg sm:text-xl font-bold tracking-wide text-foreground">
									{post.title}
								</CardTitle>
								<PostMeta
									datePublished={post.datePublished}
									readTimeInMinutes={readTimeInMinutes}
								/>
							</div>
							<Image
								src={post.coverPhoto.url}
								alt={post.title}
								width={800}
								height={450}
								priority
								className="w-full rounded h-48 sm:h-72 object-cover"
							/>
							<div
								className="blog-description"
								dangerouslySetInnerHTML={{ __html: post.content.html }}
							/>
							<PostNavigation previousPost={previousPost} nextPost={nextPost} />
						</CardContent>
					</Card>
				</div>
			</PageContent>
		</PageShell>
	);
}
