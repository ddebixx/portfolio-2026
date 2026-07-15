const AVERAGE_WORDS_READ_PER_MINUTE = 200;

export function calculateReadTimeInMinutes(plainText: string): number {
	const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(wordCount / AVERAGE_WORDS_READ_PER_MINUTE));
}
