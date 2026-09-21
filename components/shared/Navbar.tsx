"use client";

import { twMerge } from "tailwind-merge";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";

interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const {
		open,
		setOpen,
		searchValue,
		filteredSections,
		handleSelectSection,
		handleInputChange,
		handleKeyDown,
		handleInputFocus,
		handleInputBlur,
	} = useSectionNavigation();

	return (
		<nav
			className={twMerge(
				"fixed top-4 inset-x-0 z-[100] mx-auto w-full max-w-4xl px-4 sm:px-8 md:px-16",
				className
			)}
		>
			<div className="relative w-full overflow-hidden rounded-xl border border-white/12 bg-black transition-colors duration-200 focus-within:border-terminal-green/30">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverAnchor asChild>
						<div className="relative z-10 flex w-full items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-sm">
							<span className="terminal-prompt" aria-hidden="true">
								$
							</span>
							<input
								type="text"
								value={searchValue}
								onChange={handleInputChange}
								onKeyDown={(e) => handleKeyDown(e, filteredSections)}
								onFocus={handleInputFocus}
								onBlur={handleInputBlur}
								placeholder="Type section name or ID..."
								className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-xs sm:text-sm"
							/>
						</div>
					</PopoverAnchor>
					<PopoverContent
						className="z-[110] w-(--radix-popover-anchor-width) p-0"
						align="start"
						onOpenAutoFocus={(e) => e.preventDefault()}
					>
						<Command shouldFilter={false}>
							<CommandList>
								<CommandEmpty>No sections found.</CommandEmpty>
								<CommandGroup heading="Sections">
									{filteredSections.map((section) => (
										<CommandItem
											key={section.id}
											value={section.id}
											onSelect={() => handleSelectSection(section)}
											onMouseDown={(e) => {
												e.preventDefault();
											}}
											className="cursor-pointer"
										>
											<div className="flex flex-col gap-1">
												<div className="flex items-center gap-2">
													<span className="font-commit-mono-bold font-mono">{section.label}</span>
													<span className="text-muted-foreground text-xs font-mono">
														({section.id})
													</span>
												</div>
												<span className="text-muted-foreground text-xs">{section.description}</span>
											</div>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
		</nav>
	);
};
