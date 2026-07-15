"use client";

import { useEffect, useState } from "react";
import { preloadImage } from "@/utils/preloadImage";

interface LoadingStep {
	id: string;
	label: string;
}

export const loadingSteps: LoadingStep[] = [
	{ id: "init", label: "Initializing" },
	{ id: "data", label: "Loading content" },
	{ id: "complete", label: "Ready" },
];

interface UsePreloaderOptions {
	onComplete?: () => void;
	imageUrls?: string[];
}

const PRELOADER_SESSION_STORAGE_KEY = "portfolio:has-shown-preloader";

function hasPreloaderAlreadyRunInSession(): boolean {
	try {
		return window.sessionStorage.getItem(PRELOADER_SESSION_STORAGE_KEY) === "true";
	} catch {
		return false;
	}
}

function markPreloaderAsShownInSession() {
	try {
		window.sessionStorage.setItem(PRELOADER_SESSION_STORAGE_KEY, "true");
	} catch {}
}

export function usePreloader({ onComplete, imageUrls = [] }: UsePreloaderOptions) {
	const [progress, setProgress] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);
	const [status, setStatus] = useState<"loading" | "success">("loading");
	const [shouldRunPreloader, setShouldRunPreloader] = useState<boolean | null>(null);
	const [isSequenceVisible, setIsSequenceVisible] = useState(true);

	useEffect(() => {
		function decideWhetherPreloaderShouldRunOnMount() {
			setShouldRunPreloader(!hasPreloaderAlreadyRunInSession());
		}

		decideWhetherPreloaderShouldRunOnMount();
	}, []);

	useEffect(() => {
		async function hidePreloaderAndNotifyCompletion() {
			markPreloaderAsShownInSession();
			setIsSequenceVisible(false);
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

		if (shouldRunPreloader !== true) {
			return;
		}

		const timer = setTimeout(() => {
			void runPreloaderSequence();
		}, 100);

		return () => clearTimeout(timer);
	}, [onComplete, imageUrls, shouldRunPreloader]);

	return {
		progress,
		currentStep,
		status,
		isVisible: shouldRunPreloader === true && isSequenceVisible,
		currentStepData: loadingSteps[currentStep],
	};
}
