"use client";

import Link from "next/link";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BLOG_CATEGORIES_EMPTY_LABEL } from "./BlogCategories.constants";
import type { BlogCategoriesProps, BlogCategoryItemProps } from "./BlogCategories.types";
import { getBlogCategoryIcon } from "./BlogCategoryIcons.constants";

function getInitiallyExpandedCategoryNames(
	categories: BlogCategoriesProps["categories"]
): string[] {
	const firstCategoryName = categories[0]?.categoryName ?? "";

	if (!firstCategoryName) {
		return [];
	}

	return [firstCategoryName];
}

const BlogCategoryItem = ({ category }: BlogCategoryItemProps) => {
	const CategoryIcon = getBlogCategoryIcon(category.categoryName);

	return (
		<AccordionItem value={category.categoryName}>
			<AccordionTrigger>
				<span className="flex items-center gap-2">
					<CategoryIcon className="size-4 shrink-0 text-terminal-green" aria-hidden="true" />
					{category.categoryName}
				</span>
			</AccordionTrigger>
			<AccordionContent>
				<ul className="flex flex-col gap-1">
					{category.posts.map((post) => (
						<li key={post.id}>
							<Button
								variant="ghost"
								className="h-auto w-full justify-start px-0 py-1 text-xs text-muted-foreground hover:bg-transparent hover:text-terminal-green"
								asChild
							>
								<Link href={`/blog/${post.slug}`}>{post.title}</Link>
							</Button>
						</li>
					))}
				</ul>
			</AccordionContent>
		</AccordionItem>
	);
};

export const BlogCategories = ({ categories }: BlogCategoriesProps) => {
	if (categories.length === 0) {
		return <p className="text-xs font-mono text-muted-foreground">{BLOG_CATEGORIES_EMPTY_LABEL}</p>;
	}

	return (
		<Accordion
			type="single"
			collapsible
			defaultValue={getInitiallyExpandedCategoryNames(categories)[0]}
			className="w-full"
		>
			{categories.map((category) => (
				<BlogCategoryItem key={category.categoryName} category={category} />
			))}
		</Accordion>
	);
};
