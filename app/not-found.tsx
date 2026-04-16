import Link from "next/link";

const navigationCommands = [
	{ href: "/", label: "navigate home" },
	{ href: "/#hero", label: "navigate hero" },
	{ href: "/#projects", label: "navigate projects" },
	{ href: "/#contact", label: "navigate contact" },
] as const;

interface NavigationCommandLinkProps {
	href: string;
	label: string;
}

const NavigationCommandLink = ({ href, label }: NavigationCommandLinkProps) => {
	return (
		<li className="flex items-center gap-2">
			<span className="terminal-prompt">→</span>
			<Link href={href} className="text-primary hover:underline transition-colors">
				{label}
			</Link>
		</li>
	);
};

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center font-sans">
			<main className="auto-grid-borders grid grid-cols-1 sm:grid-cols-2 w-full max-w-4xl flex-col items-center justify-between py-8 px-4 sm:py-16 md:py-32 sm:px-8 md:px-16 sm:items-start">
				<section className="grid grid-cols-1 col-span-2 gap-4 items-start justify-center">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<span className="terminal-prompt text-muted-foreground">$</span>
							<h1 className="text-base sm:text-lg font-commit-mono-bold font-mono">Error 404</h1>
						</div>
						<p className="text-xs sm:text-sm font-commit-mono-regular text-muted-foreground pl-6">
							Page not found. The requested resource does not exist.
						</p>
						<div className="flex flex-col gap-2 pl-6 mt-2">
							<p className="text-xs sm:text-sm font-commit-mono-regular text-muted-foreground">
								Available commands:
							</p>
							<ul className="list-none space-y-1 text-xs sm:text-sm font-commit-mono-regular text-muted-foreground">
								{navigationCommands.map((command) => (
									<NavigationCommandLink
										key={command.href}
										href={command.href}
										label={command.label}
									/>
								))}
							</ul>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
