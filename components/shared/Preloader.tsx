"use client";

import { twMerge } from "tailwind-merge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

interface PreloaderProps {
  className?: string;
  onComplete?: () => void;
  imageUrls?: string[];
}

interface LoadingStep {
  id: string;
  label: string;
  endpoint: string;
}

const loadingSteps: LoadingStep[] = [
  { id: "init", label: "Initializing", endpoint: "" },
  { id: "data", label: "Loading content", endpoint: "" },
  { id: "images", label: "Preparing images", endpoint: "" },
  { id: "complete", label: "Almost ready", endpoint: "" },
];

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
}

export const Preloader = ({ className, onComplete, imageUrls = [] }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState<"loading" | "success">("loading");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function preloadImages() {
      try {
        setCurrentStep(0);
        setProgress(10);

        setCurrentStep(1);
        setProgress(30);

        setCurrentStep(2);
        setProgress(50);

        if (imageUrls.length > 0) {
          const criticalImages = imageUrls.slice(0, Math.min(10, imageUrls.length));
          
          await Promise.allSettled(
            criticalImages.map((url) => preloadImage(url))
          );

          setProgress(80);
          
          Promise.allSettled(
            imageUrls.slice(criticalImages.length).map((url) => preloadImage(url))
          ).catch(() => {});
        }

        setCurrentStep(3);
        setProgress(95);

        setProgress(100);
        setStatus("success");

        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 300);
      } catch (error) {
        console.error("Preload error:", error);
        setIsVisible(false);
        onComplete?.();
      }
    }

    preloadImages();
  }, [onComplete, imageUrls]);

  if (!isVisible) {
    return null;
  }

  const currentStepData = loadingSteps[currentStep];

  return (
    <div
      className={twMerge(
        "fixed inset-0 z-[100] flex items-center justify-center bg-zinc-50 dark:bg-black transition-opacity duration-500",
        !isVisible && "opacity-0 pointer-events-none",
        className
      )}
    >
      <div className="w-full max-w-4xl px-4 sm:px-8 md:px-16">
        <div className="border border-border bg-white dark:bg-black p-4 sm:p-6 font-mono">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="terminal-prompt text-muted-foreground">$</span>
              <span className="text-xs sm:text-sm font-commit-mono-regular text-foreground">
                GET /
              </span>
            </div>

            {status === "loading" && currentStepData && (
              <>
                <div className="pl-6">
                  <div className="text-xs sm:text-sm font-commit-mono-regular text-muted-foreground">
                    {currentStepData.label}...
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
                    <div
                      key={step.id}
                      className={twMerge(
                        "text-xs font-commit-mono-regular transition-colors duration-300",
                        index < currentStep
                          ? "text-green-600 dark:text-green-400"
                          : index === currentStep
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                      )}
                    >
                      {index < currentStep ? "✓" : index === currentStep ? "→" : "○"}{" "}
                      {step.label}
                    </div>
                  ))}
                </div>
              </>
            )}

            {status === "success" && (
              <div className="pl-6 flex flex-col gap-2">
                <div className="text-xs sm:text-sm font-commit-mono-bold text-green-600 dark:text-green-400">
                  STATUS 200 OK
                </div>
                <div className="text-xs sm:text-sm font-commit-mono-regular text-muted-foreground">
                  Ready
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  {loadingSteps.map((step) => (
                    <div
                      key={step.id}
                      className="text-xs font-commit-mono-regular text-green-600 dark:text-green-400"
                    >
                      ✓ {step.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
