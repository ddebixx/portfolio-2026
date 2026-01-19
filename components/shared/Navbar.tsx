"use client";

import { useState, useRef, useEffect, useMemo, ChangeEvent, KeyboardEvent } from "react";
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

interface Section {
  id: string;
  label: string;
  description: string;
}

const sections: Section[] = [
  {
    id: "hero",
    label: "Hero",
    description: "Introduction and personal information",
  },
  {
    id: "experience",
    label: "Experience",
    description: "Work experience and career history",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Portfolio projects and work samples",
  },
  {
    id: "technologies",
    label: "Technologies",
    description: "Tech stack and skills",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Get in touch",
  },
];

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSection, setSelectedSection] = useState<Section | null>(
    null
  );
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleSelectSection(section: Section) {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }

    setSelectedSection(section);
    setSearchValue(`navigate ${section.id}`);
    setOpen(false);

    function scrollToSection() {
      const element = document.getElementById(section.id);
      if (element) {
        const offset = 80; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }

    scrollToSection();
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    
    if (selectedSection && value !== `navigate ${selectedSection.id}`) {
      setSelectedSection(null);
    }
    
    setSearchValue(value);
    if (value.trim() && !open) {
      setOpen(true);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && filteredSections.length > 0) {
      event.preventDefault();
      handleSelectSection(filteredSections[0]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  function handleInputFocus() {
    setOpen(true);
  }

  function handleInputBlur() {
    blurTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  }

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  const filteredSections = useMemo(() => {
    if (!searchValue.trim()) {
      return sections;
    }

    const searchTerm = searchValue
      .toLowerCase()
      .replace(/^navigate\s+/, "")
      .trim();

    if (!searchTerm) {
      return sections;
    }

    return sections.filter(
      (section) =>
        section.id.toLowerCase().includes(searchTerm) ||
        section.label.toLowerCase().includes(searchTerm) ||
        section.description.toLowerCase().includes(searchTerm)
    );
  }, [searchValue]);

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
                onKeyDown={handleKeyDown}
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
