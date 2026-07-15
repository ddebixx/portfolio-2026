import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const BlogPostCardSkeleton = () => {
	return (
		<Card className="p-4 sm:p-5">
			<div className="flex items-start gap-3 sm:gap-4">
				<Skeleton className="size-4 shrink-0 mt-0.5" />
				<div className="flex min-w-0 flex-1 flex-col gap-3">
					<Skeleton className="h-4 w-2/3" />
					<div className="flex items-center gap-4">
						<Skeleton className="h-3 w-24" />
						<Skeleton className="h-3 w-20" />
					</div>
					<Skeleton className="h-3 w-full" />
					<Skeleton className="h-3 w-4/5" />
				</div>
			</div>
		</Card>
	);
};
