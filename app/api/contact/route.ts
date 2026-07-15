import { NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactFields {
	email: string;
	subject: string;
	message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidContactBody(body: unknown): body is ContactFields {
	if (typeof body !== "object" || body === null) return false;
	const candidate = body as Record<string, unknown>;
	return Boolean(candidate.email && candidate.subject && candidate.message);
}

function buildContactEmailHtml(fields: ContactFields) {
	return `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${fields.email}</p>
    <p><strong>Subject:</strong> ${fields.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${fields.message.replace(/\n/g, "<br>")}</p>
  `;
}

async function sendContactEmail(fields: ContactFields) {
	return resend.emails.send({
		from: "Portfolio Contact <onboarding@resend.dev>",
		to: [process.env.CONTACT_EMAIL ?? "your-email@example.com"],
		replyTo: fields.email,
		subject: `Portfolio Contact: ${fields.subject}`,
		html: buildContactEmailHtml(fields),
	});
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		if (!isValidContactBody(body)) {
			return NextResponse.json({ error: "All fields are required" }, { status: 400 });
		}

		const { error } = await sendContactEmail(body);

		if (error) {
			return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
		}

		return NextResponse.json({ success: true });
	} catch (_error) {
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
