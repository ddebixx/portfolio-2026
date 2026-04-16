import { useEffect, useState } from "react";
import { preloadImage } from "@/utils/preloadImage";

interface LoadingStep {
	id: string;
	label: string;
	endpoint: string;
}

export const loadingSteps: LoadingStep[] = [
	{ id: "init", label: "Initializing", endpoint: "" },
	{ id: "data", label: "Loading content", endpoint: "" },
	{ id: "complete", label: "Ready", endpoint: "" },
];

interface UsePreloaderOptions {
	onComplete?: () => void;
	imageUrls?: string[];
}

export function usePreloader({ onComplete, imageUrls = [] }: UsePreloaderOptions) {
	const [progress, setProgress] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);
	const [status, setStatus] = useState<"loading" | "success">("loading");
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		async function hidePreloaderAndNotifyCompletion() {
			setIsVisible(false);
			onComplete?.();
		}

		async function preloadImagesForFasterRendering() {
			if (imageUrls.length > 0) {
				await Promise.allSettled(imageUrls.map((url) => preloadImage(url)));
			}
		}

		async function runPreloaderSequence() {
			try {
				setCurrentStep(0);
				setProgress(20);

				await new Promise((resolve) => setTimeout(resolve, 400));

				setCurrentStep(1);
				setProgress(60);

				await new Promise((resolve) => setTimeout(resolve, 400));

				setCurrentStep(2);
				setProgress(100);
				setStatus("success");

				void preloadImagesForFasterRendering();

				await new Promise((resolve) => setTimeout(resolve, 500));
			} catch (error) {
				console.error("Preload error:", error);
			} finally {
				await hidePreloaderAndNotifyCompletion();
			}
		}

		const timer = setTimeout(() => {
			void runPreloaderSequence();
		}, 100);

		return () => clearTimeout(timer);
	}, [onComplete, imageUrls]);

	return {
		progress,
		currentStep,
		status,
		isVisible,
		currentStepData: loadingSteps[currentStep],
	};
}
