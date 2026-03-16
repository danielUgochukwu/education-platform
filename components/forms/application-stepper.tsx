// Application Step Progress Indicator Component
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
    step: number;
    label: string;
    description?: string;
}

interface ApplicationStepperProps {
    steps: Step[];
    currentStep: number;
    className?: string;
}

export function ApplicationStepper({ steps, currentStep, className }: ApplicationStepperProps) {
    return (
        <div className={cn("w-full", className)}>
            {/* Desktop: horizontal stepper */}
            <div className="hidden md:flex items-start justify-between relative">
                {/* connecting line */}
                <div className="absolute top-5 left-0 right-0 h-px bg-border z-0" />
                {steps.map((s) => {
                    const isCompleted = s.step < currentStep;
                    const isActive = s.step === currentStep;
                    return (
                        <div key={s.step} className="flex flex-col items-center gap-2 relative z-10 flex-1">
                            <div className={cn(
                                "h-10 w-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all",
                                isCompleted ? "bg-primary border-primary text-primary-foreground" :
                                    isActive ? "border-primary bg-background text-primary ring-4 ring-primary/20" :
                                        "border-muted-foreground/30 bg-background text-muted-foreground/50"
                            )}>
                                {isCompleted ? <Check className="h-4 w-4" /> : s.step}
                            </div>
                            <div className="text-center px-1">
                                <p className={cn("text-xs font-semibold", isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground")}>
                                    {s.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mobile: compact stepper */}
            <div className="flex md:hidden items-center gap-2">
                {steps.map((s) => {
                    const isCompleted = s.step < currentStep;
                    const isActive = s.step === currentStep;
                    return (
                        <div key={s.step} className={cn(
                            "flex-1 h-1.5 rounded-full transition-colors",
                            isCompleted ? "bg-primary" :
                                isActive ? "bg-primary/50" :
                                    "bg-muted"
                        )} />
                    );
                })}
            </div>
            <div className="flex md:hidden mt-2 justify-between">
                <span className="text-xs text-muted-foreground">Step {currentStep} of {steps.length}</span>
                <span className="text-xs font-medium text-primary">{steps.find(s => s.step === currentStep)?.label}</span>
            </div>
        </div>
    );
}
