import { Calendar, Clock } from "lucide-react";
import { formatPostDate } from "@/utils/formatPostDate";

interface PostMetaProps {
	datePublished: string;
	readTimeInMinutes: number;
}

export const PostMeta = ({ datePublished, readTimeInMinutes }: PostMetaProps) => {
	return (
		<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-muted-foreground font-mono">
			<span className="flex items-center gap-1.5">
				<Calendar className="size-3 shrink-0 text-muted-foreground/70" aria-hidden="true" />
				{formatPostDate(datePublished)}
			</span>
			<span className="flex items-center gap-1.5">
				<Clock className="size-3 shrink-0 text-muted-foreground/70" aria-hidden="true" />
				{readTimeInMinutes} min read
			</span>
		</div>
	);
};
