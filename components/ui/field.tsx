"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FieldErrorEntry = { message?: string } | undefined;

const fieldVariants = cva("group/field flex w-full gap-3 data-[invalid=true]:text-destructive", {
	variants: {
		orientation: {
			vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
			horizontal: [
				"flex-row items-center",
				"[&>[data-slot=field-label]]:flex-auto",
				"has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
			],
			responsive: [
				"flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
				"@md/field-group:[&>[data-slot=field-label]]:flex-auto",
				"@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
			],
		},
	},
	defaultVariants: {
		orientation: "vertical",
	},
});

function deduplicateErrors(errors: FieldErrorEntry[]) {
	return [...new Map(errors.map((error) => [error?.message, error])).values()];
}

function renderErrorList(errors: FieldErrorEntry[]) {
	return (
		<ul className="ml-4 flex list-disc flex-col gap-1">
			{errors.map((error, index) =>
				error?.message ? <li key={error.message ?? index}>{error.message}</li> : null
			)}
		</ul>
	);
}

function buildErrorContent(
	children: React.ReactNode,
	errors: FieldErrorEntry[] | undefined
): React.ReactNode {
	if (children) return children;
	if (!errors?.length) return null;

	const uniqueErrors = deduplicateErrors(errors);
	if (uniqueErrors.length === 1) return uniqueErrors[0]?.message;

	return renderErrorList(uniqueErrors);
}

function Field({
	className,
	orientation = "vertical",
	...props
}: React.ComponentProps<"fieldset"> & VariantProps<typeof fieldVariants>) {
	return (
		<fieldset
			data-slot="field"
			data-orientation={orientation}
			className={cn(fieldVariants({ orientation }), className)}
			{...props}
		/>
	);
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="field-content"
			className={cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", className)}
			{...props}
		/>
	);
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
	return (
		<Label
			data-slot="field-label"
			className={cn(
				"group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
				"has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:  has-[>[data-slot=field]]:border *:data-[slot=field]:p-4",
				"has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:border-primary",
				className
			)}
			{...props}
		/>
	);
}

function FieldError({
	className,
	children,
	errors,
	...props
}: React.ComponentProps<"div"> & {
	errors?: FieldErrorEntry[];
}) {
	const content = useMemo(() => buildErrorContent(children, errors), [children, errors]);

	if (!content) {
		return null;
	}

	return (
		<div
			role="alert"
			data-slot="field-error"
			className={cn("text-destructive text-sm font-normal", className)}
			{...props}
		>
			{content}
		</div>
	);
}

export { Field, FieldLabel, FieldError, FieldContent };
