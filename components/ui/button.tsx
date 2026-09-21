import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-commit-mono-regular font-mono transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none",
	{
		variants: {
			variant: {
				default:
					"border border-primary/60 bg-black text-primary hover:border-primary",
				destructive:
					"border border-destructive/60 bg-black text-destructive hover:border-destructive",
				outline:
					"border border-white/10 bg-black text-foreground hover:border-white/30",
				secondary: "border border-white/10 bg-black text-muted-foreground hover:border-white/30",
				ghost: "border-transparent bg-transparent text-foreground hover:bg-transparent hover:text-foreground",
				link: "border-transparent bg-transparent text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8   gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10   px-6 has-[>svg]:px-4",
				icon: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

function Button({
	className,
	variant = "default",
	size = "default",
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button };
