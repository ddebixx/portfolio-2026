const DEFAULT_EXCERPT_LENGTH = 160;

function normalizePostPreviewText(plainText: string): string {
	return plainText.replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
}

export function getPostExcerpt(plainText: string, maxLength = DEFAULT_EXCERPT_LENGTH): string {
	const normalizedText = normalizePostPreviewText(plainText);

	if (normalizedText.length <= maxLength) {
		return normalizedText;
	}

	return `${normalizedText.slice(0, maxLength).trimEnd()}...`;
}
