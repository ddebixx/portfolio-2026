"use client";

import { twMerge } from "tailwind-merge";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
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
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 sm:px-8 md:px-16",
        className
      )}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div className="relative w-full">
            <div className="flex items-center gap-2 border border-border bg-black px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <span className="terminal-prompt text-muted-foreground">$</span>
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
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="w-[var(--radix-popover-anchor-width)] p-0"
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
                        <span className="font-commit-mono-bold font-mono">
                          {section.label}
                        </span>
                        <span className="text-muted-foreground text-xs font-mono">
                          ({section.id})
                        </span>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {section.description}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </nav>
  );
};
