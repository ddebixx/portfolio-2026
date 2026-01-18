"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Progress } from "@/components/ui/progress";

interface PreloaderProps {
  className?: string;
}

interface LoadingStep {
  id: string;
  label: string;
  endpoint: string;
}

const loadingSteps: LoadingStep[] = [
  { id: "hero", label: "Hero", endpoint: "/api/hero" },
  { id: "experience", label: "Experience", endpoint: "/api/experience" },
  { id: "projects", label: "Projects", endpoint: "/api/projects" },
  { id: "technologies", label: "Technologies", endpoint: "/api/technologies" },
  { id: "contact", label: "Contact", endpoint: "/api/contact" },
];

export const Preloader = ({ className }: PreloaderProps) => {
  const [progress, setProgress] = React.useState(0);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [status, setStatus] = React.useState<"loading" | "success">("loading");
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    function simulateLoading() {
      const totalSteps = loadingSteps.length;
      const progressPerStep = 100 / totalSteps;
      let currentProgress = 0;
      let stepIndex = 0;

      function loadStep() {
        if (stepIndex >= totalSteps) {
          setStatus("success");
          setTimeout(() => {
            setIsVisible(false);
          }, 1500);
          return;
        }

        setCurrentStep(stepIndex);
        const targetProgress = (stepIndex + 1) * progressPerStep;

        const stepInterval = setInterval(() => {
          currentProgress += 1.5;
          if (currentProgress >= targetProgress) {
            currentProgress = targetProgress;
            setProgress(currentProgress);
            clearInterval(stepInterval);
            stepIndex++;
            setTimeout(loadStep, 300);
          } else {
            setProgress(currentProgress);
          }
        }, 20);
      }

      loadStep();
    }

    simulateLoading();
  }, []);

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
                <div className="pl-6 flex flex-col gap-2">
                  <div className="text-xs sm:text-sm font-commit-mono-regular text-muted-foreground">
                    Fetching {currentStepData.label.toLowerCase()}...
                  </div>
                  <div className="text-xs font-commit-mono-regular text-muted-foreground/70">
                    {currentStepData.endpoint}
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
                  Portfolio loaded successfully
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
