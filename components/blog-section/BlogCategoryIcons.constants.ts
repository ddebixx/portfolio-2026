import { CodeXml, type LucideIcon, SquareTerminal } from "lucide-react";

export interface BlogCategoryIconEntry {
	categoryName: string;
	icon: LucideIcon;
}

export const FALLBACK_BLOG_CATEGORY_ICON = SquareTerminal;

export const BLOG_CATEGORY_ICONS: BlogCategoryIconEntry[] = [
	{
		categoryName: "SWE Practices",
		icon: CodeXml,
	},
];

export function getBlogCategoryIcon(categoryName: string): LucideIcon {
	const categoryIcon = BLOG_CATEGORY_ICONS.find((entry) => entry.categoryName === categoryName);

	return categoryIcon?.icon ?? FALLBACK_BLOG_CATEGORY_ICON;
}
