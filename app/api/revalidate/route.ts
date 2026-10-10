import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { HYGRAPH_CACHE_TAG } from "@/lib/hygraphCache";

const WEBHOOK_SECRET_HEADER = "x-hygraph-webhook-secret";

function readWebhookSecret(request: Request): string {
	return request.headers.get(WEBHOOK_SECRET_HEADER) ?? "";
}

function secretsMatch(providedSecret: string, configuredSecret: string): boolean {
	const providedBuffer = Buffer.from(providedSecret);
	const configuredBuffer = Buffer.from(configuredSecret);

	if (providedBuffer.length !== configuredBuffer.length) {
		return false;
	}

	return timingSafeEqual(providedBuffer, configuredBuffer);
}

function isAuthorizedWebhook(request: Request): boolean {
	const configuredSecret = process.env.HYGRAPH_WEBHOOK_SECRET;

	if (!configuredSecret) {
		return false;
	}

	return secretsMatch(readWebhookSecret(request), configuredSecret);
}

function revalidatePublishedContent(): void {
	revalidateTag(HYGRAPH_CACHE_TAG, { expire: 0 });
	revalidatePath("/", "layout");
}

export async function POST(request: Request) {
	try {
		if (!isAuthorizedWebhook(request)) {
			return NextResponse.json({ revalidated: false }, { status: 401 });
		}

		revalidatePublishedContent();

		return NextResponse.json({ revalidated: true });
	} catch (error) {
		console.error("Hygraph revalidation failed:", error);
		return NextResponse.json({ revalidated: false }, { status: 500 });
	}
}
