import { BlogBackLink } from "@/components/blog-section/BlogBackLink";
import { BlogCategories } from "@/components/blog-section/BlogCategories";
import {
	BLOG_CATEGORIES_HEADING,
	DEFAULT_BLOG_CATEGORY_NAME,
} from "@/components/blog-section/BlogCategories.constants";
import {
	BLOG_HOME_LINK_LABEL,
	BLOG_SECTION_HEADING,
} from "@/components/blog-section/BlogSection.constants";
import { BlogView } from "@/components/blog-section/BlogView";
import { PageContent } from "@/components/shared/PageContent";
import { PageShell } from "@/components/shared/PageShell";
import { getPosts } from "@/fetchers/getPosts";
import { groupPostsByCategory } from "@/utils/groupPostsByCategory";

export default async function BlogIndexPage() {
	const posts = await getPosts();
	const categories = groupPostsByCategory({
		posts,
		fallbackCategoryName: DEFAULT_BLOG_CATEGORY_NAME,
	});

	return (
		<PageShell>
			<PageContent>
				<div className="flex flex-col gap-4 sm:gap-6">
					<h1 className="sr-only">{BLOG_SECTION_HEADING}</h1>
					<BlogBackLink href="/" label={BLOG_HOME_LINK_LABEL} />
					<div className="flex flex-col items-start gap-8 lg:flex-row">
						<aside className="w-full lg:w-64 lg:shrink-0" aria-label={BLOG_CATEGORIES_HEADING}>
							<BlogCategories categories={categories} />
						</aside>
						<div className="min-w-0 w-full flex-1">
							<BlogView posts={posts} />
						</div>
					</div>
				</div>
			</PageContent>
		</PageShell>
	);
}
