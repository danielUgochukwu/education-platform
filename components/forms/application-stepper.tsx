"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  step: number;
  label: string;
  href?: string;
  description?: string;
}

interface ApplicationStepperProps {
  steps: readonly Step[];
  currentStep: number; // 1-indexed
}

export function ApplicationStepper({
  steps,
  currentStep,
}: ApplicationStepperProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <div
        className="grid divide-x divide-border/50"
        style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
      >
        {steps.map((step) => {
          const isActive = step.step === currentStep;
          const isCompleted = step.step < currentStep;
          const content = (
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 transition-colors",
                isActive ? "border-t-2 border-foreground" : "",
                isCompleted ? "bg-muted/30" : ""
              )}
            >
              <span
                className={cn(
                  "h-[18px] w-[18px] rounded-full flex items-center justify-center text-[9px] font-bold shrink-0",
                  isActive ? "bg-foreground text-background" : "",
                  isCompleted
                    ? "bg-foreground text-background"
                    : "border border-border/60 text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                ) : (
                  String(step.step).padStart(2, "0")
                )}
              </span>
              <span
                className={cn(
                  "text-[11px] font-medium truncate",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );

          return step.href && isCompleted ? (
            <Link
              key={step.step}
              href={step.href}
              className="hover:bg-muted/40 transition-colors"
            >
              {content}
            </Link>
          ) : (
            <div key={step.step}>{content}</div>
          );
        })}
      </div>
      {/* Progress bar */}
      <div className="h-px bg-border/40">
        <div
          className="h-full bg-foreground transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
