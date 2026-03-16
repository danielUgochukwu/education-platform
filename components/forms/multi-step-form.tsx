"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface FormStep {
    id: string;
    title: string;
    description?: string;
    content: ReactNode;
}

interface MultiStepFormProps {
    steps: FormStep[];
    onSubmit: () => void;
}

export function MultiStepForm({ steps, onSubmit }: MultiStepFormProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(s => s + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(s => s - 1);
        }
    };

    const progress = ((currentStep + 1) / steps.length) * 100;
    const isLastStep = currentStep === steps.length - 1;

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-sm">
            <CardHeader className="bg-muted/30 border-b space-y-4">
                <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
                    <span>Step {currentStep + 1} of {steps.length}</span>
                    <span>{Math.round(progress)}% Completed</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="pt-4">
                    <h2 className="text-xl font-semibold text-foreground">{steps[currentStep].title}</h2>
                    {steps[currentStep].description && (
                        <p className="text-sm text-muted-foreground mt-1">{steps[currentStep].description}</p>
                    )}
                </div>
            </CardHeader>

            <CardContent className="pt-6 min-h-[300px]">
                {steps[currentStep].content}
            </CardContent>

            <CardFooter className="border-t bg-muted/10 flex justify-between pt-6">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                >
                    Back
                </Button>
                <Button
                    onClick={isLastStep ? onSubmit : nextStep}
                >
                    {isLastStep ? "Submit Application" : "Continue"}
                </Button>
            </CardFooter>
        </Card>
    );
}
