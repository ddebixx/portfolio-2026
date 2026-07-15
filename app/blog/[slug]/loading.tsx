import { PageContent } from "@/components/shared/PageContent";
import { PageShell } from "@/components/shared/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
	return (
		<PageShell>
			<PageContent>
				<div className="flex flex-col gap-4 sm:gap-6">
					<Skeleton className="h-3 w-28" />
					<Card className="gap-6 sm:gap-8">
						<CardContent className="flex flex-col gap-6 sm:gap-8 pt-4 sm:pt-5 pb-4 sm:pb-5">
							<div className="flex flex-col gap-3">
								<Skeleton className="h-4 w-2/3" />
								<div className="flex items-center gap-4">
									<Skeleton className="h-3 w-24" />
									<Skeleton className="h-3 w-20" />
								</div>
							</div>
							<Skeleton className="w-full h-48 sm:h-72 rounded" />
							<div className="flex flex-col gap-2">
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-3 w-full" />
								<Skeleton className="h-3 w-3/4" />
							</div>
						</CardContent>
					</Card>
				</div>
			</PageContent>
		</PageShell>
	);
}
