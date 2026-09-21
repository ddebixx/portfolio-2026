import { z } from "zod";

export const PostSchema = z.object({
	id: z.string(),
	title: z.string(),
	slug: z.string(),
	datePublished: z.string(),
	coverPhoto: z.object({
		url: z.string().url(),
	}),
	content: z.object({
		html: z.string(),
		text: z.string(),
	}),
});

export const PostSummarySchema = z.object({
	id: z.string(),
	title: z.string(),
	slug: z.string(),
	datePublished: z.string(),
	category: z.string().trim().min(1).nullish(),
	coverPhoto: z.object({
		url: z.string().url(),
	}),
	content: z.object({
		text: z.string(),
	}),
});

export type Post = z.infer<typeof PostSchema>;
export type PostSummary = z.infer<typeof PostSummarySchema>;
