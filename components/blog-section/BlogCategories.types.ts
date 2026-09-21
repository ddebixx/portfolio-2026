import type { BlogCategoryGroup } from "@/utils/groupPostsByCategory";

export interface BlogCategoriesProps {
	categories: BlogCategoryGroup[];
}

export interface BlogCategoryItemProps {
	category: BlogCategoryGroup;
}
