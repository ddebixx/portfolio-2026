"use client";

import { twMerge } from "tailwind-merge";
import { Progress } from "@/components/ui/progress";
import { loadingSteps, usePreloader } from "@/hooks/usePreloader";

interface PreloaderProps {
	className?: string;
	onComplete?: () => void;
	imageUrls?: string[];
}

interface PreloaderStepItemProps {
	label: string;
	index: number;
	currentStep: number;
}

interface PreloaderLoadingStatusProps {
	progress: number;
	currentStep: number;
	stepLabel: string;
}

const PreloaderStepItem = ({ label, index, currentStep }: PreloaderStepItemProps) => {
	const isPast = index < currentStep;
	const isCurrent = index === currentStep;

	const indicator = isPast ? "✓" : isCurrent ? "→" : "○";
	const colorClassName = isPast
		? "text-green-400"
		: isCurrent
			? "text-foreground"
			: "text-muted-foreground/50";

	return (
		<div
			className={twMerge(
				"text-xs font-commit-mono-regular transition-colors duration-300",
				colorClassName
			)}
		>
			{indicator} {label}
		</div>
	);
};

const PreloaderLoadingStatus = ({
	progress,
	currentStep,
	stepLabel,
}: PreloaderLoadingStatusProps) => (
	<>
		<div className="pl-6">
			<div className="text-xs sm:text-sm font-commit-mono-regular text-muted-foreground">
				{stepLabel}...
			</div>
		</div>
		<div className="pl-6">
			<Progress
				value={progress}
				className="h-1 bg-border/30 border border-border/50 transition-all duration-300"
			/>
		</div>
		<div className="pl-6 flex flex-col gap-1">
			{loadingSteps.map((step, index) => (
				<PreloaderStepItem
					key={step.id}
					label={step.label}
					index={index}
					currentStep={currentStep}
				/>
			))}
		</div>
	</>
);

const PreloaderSuccessStatus = () => (
	<div className="pl-6 flex flex-col gap-2">
		<div className="text-xs sm:text-sm font-commit-mono-bold text-green-400">STATUS 200 OK</div>
		<div className="text-xs sm:text-sm font-commit-mono-regular text-muted-foreground">Ready</div>
		<div className="mt-2 flex flex-col gap-1">
			{loadingSteps.map((step) => (
				<div key={step.id} className="text-xs font-commit-mono-regular text-green-400">
					✓ {step.label}
				</div>
			))}
		</div>
	</div>
);

export const Preloader = ({ className, onComplete, imageUrls = [] }: PreloaderProps) => {
	const { progress, currentStep, status, isVisible, currentStepData } = usePreloader({
		onComplete,
		imageUrls,
	});

	if (!isVisible) {
		return null;
	}

	return (
		<div
			className={twMerge(
				"fixed inset-0 z-100 flex items-center justify-center bg-black",
				className
			)}
		>
			<div className="w-full max-w-4xl px-4 sm:px-8 md:px-16">
				<div className="glass-panel p-4 sm:p-6 font-mono">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-2">
							<span className="terminal-prompt text-muted-foreground">$</span>
							<span className="text-xs sm:text-sm font-commit-mono-regular text-foreground">
								GET /
							</span>
						</div>

						{status === "loading" && currentStepData && (
							<PreloaderLoadingStatus
								progress={progress}
								currentStep={currentStep}
								stepLabel={currentStepData.label}
							/>
						)}

						{status === "success" && <PreloaderSuccessStatus />}
					</div>
				</div>
			</div>
		</div>
	);
};
