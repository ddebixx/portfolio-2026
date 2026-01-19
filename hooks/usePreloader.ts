import { useState, useEffect } from "react";
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
    async function preloadImages() {
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

        if (imageUrls.length > 0) {
          Promise.allSettled(
            imageUrls.map((url) => preloadImage(url))
          ).catch(() => {});
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        setIsVisible(false);
        onComplete?.();
      } catch (error) {
        console.error("Preload error:", error);
        setIsVisible(false);
        onComplete?.();
      }
    }

    const timer = setTimeout(() => {
      preloadImages();
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
