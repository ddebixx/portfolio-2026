import type { ReactNode } from "react";

interface SectionHeadingProps {
	children: ReactNode;
}

export const SectionHeading = ({ children }: SectionHeadingProps) => {
	return (
		<h2 className="text-base sm:text-lg font-commit-mono-bold font-mono flex items-baseline gap-1.5">
			<span
				aria-hidden="true"
				className="text-terminal-green text-xs font-commit-mono-regular opacity-80"
			>
				{"//"}
			</span>
			{children}
		</h2>
	);
};
