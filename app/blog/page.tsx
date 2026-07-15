import { BlogBackLink } from "@/components/blog-section/BlogBackLink";
import { BlogPageHeader } from "@/components/blog-section/BlogPageHeader";
import { BlogView } from "@/components/blog-section/BlogView";
import { PageContent } from "@/components/shared/PageContent";
import { PageShell } from "@/components/shared/PageShell";
import { getPosts } from "@/fetchers/getPosts";

export default async function BlogIndexPage() {
	const postsData = await getPosts();
	const posts = postsData?.posts ?? [];

	return (
		<PageShell>
			<PageContent>
				<section className="flex flex-col gap-4 sm:gap-6">
					<BlogBackLink href="/" label="cd ~" />
					<div className="flex flex-col gap-8">
						<BlogPageHeader postCount={posts.length} />
						<BlogView posts={posts} />
					</div>
				</section>
			</PageContent>
		</PageShell>
	);
}
