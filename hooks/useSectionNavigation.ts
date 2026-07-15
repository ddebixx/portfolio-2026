"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ChangeEvent, type KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

interface Section {
	id: string;
	label: string;
	description: string;
	href?: string;
}

const HOME_PATH = "/";
const SCROLL_OFFSET_FROM_TOP = 80;

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
		id: "blog",
		label: "Blog",
		description: "Articles and write-ups",
		href: "/blog",
	},
	{
		id: "contact",
		label: "Contact",
		description: "Get in touch",
	},
];

function scrollToSection(sectionId: string, offset = SCROLL_OFFSET_FROM_TOP) {
	const element = document.getElementById(sectionId);
	if (!element) {
		return;
	}

	const elementPosition = element.getBoundingClientRect().top;
	const offsetPosition = elementPosition + window.scrollY - offset;

	window.scrollTo({
		top: offsetPosition,
		behavior: "smooth",
	});
}

export function useSectionNavigation() {
	const router = useRouter();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [selectedSection, setSelectedSection] = useState<Section | null>(null);
	const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	function navigateToSection(section: Section) {
		if (section.href) {
			router.push(section.href);
			return;
		}

		if (pathname !== HOME_PATH) {
			router.push(`${HOME_PATH}#${section.id}`, { scroll: false });
			return;
		}

		scrollToSection(section.id);
	}

	function handleSelectSection(section: Section) {
		if (blurTimeoutRef.current) {
			clearTimeout(blurTimeoutRef.current);
			blurTimeoutRef.current = null;
		}

		setSelectedSection(section);
		setSearchValue(`navigate ${section.id}`);
		setOpen(false);
		navigateToSection(section);
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

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, filteredSections: Section[]) {
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

	useEffect(() => {
		function scrollToHashTargetAfterHomeNavigation() {
			if (pathname !== HOME_PATH) {
				return;
			}

			const targetId = window.location.hash.replace("#", "");
			if (targetId) {
				scrollToSection(targetId);
			}
		}

		scrollToHashTargetAfterHomeNavigation();
	}, [pathname]);

	useEffect(() => {
		return () => {
			if (blurTimeoutRef.current) {
				clearTimeout(blurTimeoutRef.current);
			}
		};
	}, []);

	return {
		open,
		setOpen,
		searchValue,
		selectedSection,
		filteredSections,
		handleSelectSection,
		handleInputChange,
		handleKeyDown,
		handleInputFocus,
		handleInputBlur,
	};
}
