import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageContentProps {
	children?: ReactNode;
	className?: string;
	withSectionSpacing?: boolean;
}

export const PageContent = ({
	children,
	className,
	withSectionSpacing = false,
}: PageContentProps) => {
	return (
		<main
			className={twMerge(
				"mt-24 mb-16 flex w-full max-w-4xl flex-col px-4 sm:px-8 md:px-16",
				withSectionSpacing && "gap-16 sm:gap-20 md:gap-24",
				className
			)}
		>
			{children}
		</main>
	);
};
