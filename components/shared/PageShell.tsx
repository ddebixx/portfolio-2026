import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageShellProps {
	children?: ReactNode;
	className?: string;
}

export const PageShell = ({ children, className }: PageShellProps) => {
	return (
		<div
			className={twMerge(
				"flex min-h-screen flex-col items-center justify-center bg-black hero-glow font-sans",
				className
			)}
		>
			{children}
		</div>
	);
};
