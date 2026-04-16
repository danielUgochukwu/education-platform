"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { ApplicationStepper } from "@/components/forms/application-stepper";
import { AcademicBackgroundForm } from "@/components/forms/academic-background-form";
import { EssayForm } from "@/components/forms/essay-form";
import { DocumentUploadForm } from "@/components/forms/document-upload-form";
import { ApplicationReview } from "@/components/forms/application-review";

import { applicationSteps } from "@/constants/application";
import { PersonalInfoForm } from "@/components/forms/personal-info-form";

export function ApplicationWizard({ application, profile, documents }: any) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const containerRef = useRef<HTMLDivElement>(null);

  // Animate on step change
  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;

    const fromX = direction === "forward" ? 40 : -40;
    const toX = direction === "forward" ? -40 : 40;

    const tl = gsap.timeline();

    tl.fromTo(
      el,
      { opacity: 0, x: fromX },
      { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
    );

    return () => {
      gsap.to(el, {
        opacity: 0,
        x: toX,
        duration: 0.25,
        ease: "power2.in",
      });
    };
  }, [currentStep, direction]);

  const next = () => {
    setDirection("forward");
    setCurrentStep((s) => Math.min(s + 1, 5));
  };

  const prev = () => {
    setDirection("back");
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? "forward" : "back");
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            application={application}
            profile={profile}
            onNext={next}
          />
        );
      case 2:
        return (
          <AcademicBackgroundForm
            application={application}
            onNext={next}
            onBack={prev}
          />
        );
      case 3:
        return (
          <EssayForm application={application} onNext={next} onBack={prev} />
        );
      case 4:
        return (
          <DocumentUploadForm
            documents={documents}
            onNext={next}
            onBack={prev}
          />
        );
      case 5:
        return (
          <ApplicationReview
            application={application}
            profile={profile}
            documents={documents}
            onBack={prev}
            onEdit={goToStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <ApplicationStepper steps={applicationSteps} currentStep={currentStep} />

      {/* Animated container */}
      <div ref={containerRef}>{renderStep()}</div>
    </div>
  );
}
