import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogBackLinkProps {
	href: string;
	label: string;
}

export const BlogBackLink = ({ href, label }: BlogBackLinkProps) => {
	return (
		<Button
			variant="ghost"
			size="sm"
			className="h-auto w-fit px-0 py-0 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground gap-1.5"
			asChild
		>
			<Link href={href}>
				<ArrowLeft className="size-3" aria-hidden="true" />
				{label}
			</Link>
		</Button>
	);
};
