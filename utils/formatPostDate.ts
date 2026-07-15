export function formatPostDate(datePublished: string): string {
	return new Date(datePublished).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
