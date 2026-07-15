import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs font-commit-mono-regular font-mono w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors",
	{
		variants: {
			variant: {
				default: "border-white/10 bg-white/5 text-muted-foreground backdrop-blur-sm",
				secondary: "border-white/10 bg-white/5 text-muted-foreground backdrop-blur-sm",
				destructive: "border-destructive/60 bg-destructive/5 text-destructive",
				outline: "border-white/10 bg-white/5 text-foreground backdrop-blur-sm",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge };
