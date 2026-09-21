import { BlogPostCardSkeleton } from "@/components/blog-section/BlogPostCardSkeleton";
import { PageContent } from "@/components/shared/PageContent";
import { PageShell } from "@/components/shared/PageShell";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogIndexLoading() {
	return (
		<PageShell>
			<PageContent>
				<section className="flex flex-col gap-4 sm:gap-6">
					<Skeleton className="h-3 w-20" />
					<div className="flex flex-col gap-8">
						<header className="flex flex-col items-center gap-6 text-center">
							<div className="flex flex-col items-center gap-2">
								<Skeleton className="h-3 w-24" />
								<Skeleton className="h-5 w-32" />
							</div>
							<Skeleton className="h-3 w-full max-w-md" />
							<Skeleton className="h-3 w-20" />
						</header>
						<div className="flex flex-col gap-5">
							{[1, 2, 3, 4, 5, 6].map((placeholderId) => (
								<BlogPostCardSkeleton key={placeholderId} />
							))}
						</div>
					</div>
				</section>
			</PageContent>
		</PageShell>
	);
}
