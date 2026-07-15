"use client";

import { Check, CircleX, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface ContactFormData {
	email: string;
	subject: string;
	message: string;
}

type SubmitVisualState = "idle" | "success" | "error";

const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const emailValidationRules = {
	required: "Email is required",
	pattern: {
		value: emailPattern,
		message: "Invalid email address",
	},
} as const;

const subjectValidationRules = {
	required: "Subject is required",
	minLength: {
		value: 3,
		message: "Subject must be at least 3 characters",
	},
} as const;

const messageValidationRules = {
	required: "Message is required",
	minLength: {
		value: 10,
		message: "Message must be at least 10 characters",
	},
} as const;

const SUBMIT_FEEDBACK_RESET_DELAY_MS = 2000;

function getContactFormErrorMessage(error: unknown): string {
	return error instanceof Error ? error.message : "Failed to send message";
}

function getSubmitButtonLabel(isSubmitting: boolean, submitVisualState: SubmitVisualState): string {
	if (isSubmitting) {
		return "Sending...";
	}
	if (submitVisualState === "success") {
		return "Sent!";
	}
	if (submitVisualState === "error") {
		return "Failed";
	}
	return "Send Message";
}

function getSubmitButtonIcon(isSubmitting: boolean, submitVisualState: SubmitVisualState) {
	if (isSubmitting) {
		return <Loader2 className="size-4 animate-spin" aria-hidden="true" />;
	}
	if (submitVisualState === "success") {
		return <Check className="size-4" aria-hidden="true" />;
	}
	if (submitVisualState === "error") {
		return <CircleX className="size-4" aria-hidden="true" />;
	}
	return <Send className="size-4" aria-hidden="true" />;
}

function getSubmitButtonClassName(submitVisualState: SubmitVisualState): string {
	return cn(
		"w-full sm:w-auto transition-colors duration-300",
		submitVisualState === "success" && "border-green-400 text-green-400 hover:bg-green-400/10",
		submitVisualState === "error" && "border-destructive text-destructive hover:bg-destructive/10"
	);
}

export const ContactForm = () => {
	const [submitVisualState, setSubmitVisualState] = useState<SubmitVisualState>("idle");
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<ContactFormData>();

	function scheduleSubmitVisualStateReset() {
		window.setTimeout(() => {
			setSubmitVisualState("idle");
		}, SUBMIT_FEEDBACK_RESET_DELAY_MS);
	}

	async function onSubmit(data: ContactFormData) {
		setSubmitVisualState("idle");

		try {
			await submitContactForm(data);
			setSubmitVisualState("success");
			toast.success("Message sent successfully!");
			reset();
			scheduleSubmitVisualStateReset();
		} catch (error) {
			setSubmitVisualState("error");
			toast.error(getContactFormErrorMessage(error));
			scheduleSubmitVisualStateReset();
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="glass-panel p-5 sm:p-6 space-y-4 sm:space-y-6 w-full"
		>
			<Field>
				<FieldLabel htmlFor="email">Email</FieldLabel>
				<FieldContent>
					<Input
						id="email"
						type="email"
						placeholder="your.email@example.com"
						{...register("email", emailValidationRules)}
					/>
					<FieldError errors={[errors.email]} />
				</FieldContent>
			</Field>

			<Field>
				<FieldLabel htmlFor="subject">Subject</FieldLabel>
				<FieldContent>
					<Input
						id="subject"
						type="text"
						placeholder="What's this about?"
						{...register("subject", subjectValidationRules)}
					/>
					<FieldError errors={[errors.subject]} />
				</FieldContent>
			</Field>

			<Field>
				<FieldLabel htmlFor="message">Message</FieldLabel>
				<FieldContent>
					<Textarea
						id="message"
						placeholder="Tell me about your project or just say hello..."
						rows={6}
						{...register("message", messageValidationRules)}
					/>
					<FieldError errors={[errors.message]} />
				</FieldContent>
			</Field>

			<Button
				type="submit"
				variant="outline"
				disabled={isSubmitting}
				className={getSubmitButtonClassName(submitVisualState)}
			>
				{getSubmitButtonIcon(isSubmitting, submitVisualState)}
				{getSubmitButtonLabel(isSubmitting, submitVisualState)}
			</Button>
		</form>
	);
};
