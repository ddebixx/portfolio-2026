const BLOG_DESCRIPTION =
	"Project write-ups, tech experiments, and notes from building things — internships, side projects, and lessons picked up along the way.";

interface BlogPageHeaderProps {
	postCount: number;
	headingLevel?: "h1" | "h2";
}

export const BlogPageHeader = ({ postCount, headingLevel = "h1" }: BlogPageHeaderProps) => {
	const HeadingTag = headingLevel;

	return (
		<header className="flex flex-col items-center gap-6 text-center w-full">
			<div className="flex flex-col items-center gap-2">
				<p className="text-[10px] sm:text-xs text-muted-foreground/60 font-mono tracking-wider">
					$ ls ./posts/
				</p>
				<HeadingTag className="text-base sm:text-lg font-commit-mono-bold font-mono text-foreground">
					read logs
				</HeadingTag>
			</div>
			<p className="text-xs sm:text-sm text-muted-foreground/90 font-mono leading-relaxed max-w-sm sm:max-w-md">
				{BLOG_DESCRIPTION}
			</p>
			<p className="text-[10px] sm:text-xs font-mono text-muted-foreground">
				<span className="text-green-400 font-commit-mono-bold">{postCount}</span>{" "}
				{postCount === 1 ? "entry" : "entries"} found
			</p>
		</header>
	);
};
