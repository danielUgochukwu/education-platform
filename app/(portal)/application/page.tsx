import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container";
import { ApplicationStepper } from "@/components/forms/application-stepper";
import { ApplicationStatusBadge } from "@/components/ui/application-status-badge";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, CheckCircle2, FileText, GraduationCap, ScrollText, Upload } from "lucide-react";
import { mockApplication, applicationSteps, programChoices } from "@/mock-data/applicant";

const stepIcons = [FileText, GraduationCap, ScrollText, Upload, CheckCircle2];

export default function StartApplicationPage() {
    return (
        <PageContainer
            title="My Application"
            description={`Application ID: ${mockApplication.id}`}
        >
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Application summary header */}
                <Card className="border-border/50">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold">{mockApplication.programChoice}</h2>
                                    <ApplicationStatusBadge status={mockApplication.status} />
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    Last saved: March 15, 2026 at 2:30 PM
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">2025 Cohort</Badge>
                                <Badge variant="secondary">Deadline: April 30, 2026</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Stepper */}
                <ApplicationStepper steps={applicationSteps} currentStep={mockApplication.currentStep} />

                {/* Step Cards */}
                <div className="space-y-4">
                    {applicationSteps.map((step) => {
                        const Icon = stepIcons[step.step - 1];
                        const isCompleted = step.step < mockApplication.currentStep;
                        const isActive = step.step === mockApplication.currentStep;
                        const isPending = step.step > mockApplication.currentStep;

                        return (
                            <Card key={step.step} className={`border transition-colors ${isActive ? "border-primary/40 shadow-sm" :
                                    isCompleted ? "border-emerald-200 bg-emerald-50/30 dark:bg-emerald-900/10" :
                                        "border-border/50 opacity-70"
                                }`}>
                                <CardContent className="p-5">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${isCompleted ? "bg-emerald-100 text-emerald-600" :
                                                isActive ? "bg-primary/10 text-primary" :
                                                    "bg-muted text-muted-foreground/40"
                                            }`}>
                                            {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Step {step.step}</span>
                                                {isCompleted && <Badge className="text-[10px] h-4 bg-emerald-100 text-emerald-700 border-none">Completed</Badge>}
                                                {isActive && <Badge className="text-[10px] h-4">In Progress</Badge>}
                                            </div>
                                            <h3 className="font-bold text-base">{step.label}</h3>
                                            <p className="text-sm text-muted-foreground">{step.description}</p>
                                        </div>

                                        <div className="shrink-0">
                                            {isCompleted ? (
                                                <Link href={`/portal/apply/step-${step.step}`}>
                                                    <Button variant="outline" size="sm">Edit</Button>
                                                </Link>
                                            ) : isActive ? (
                                                <Link href={`/portal/apply/step-${step.step}`}>
                                                    <Button size="sm">
                                                        Continue <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Button size="sm" variant="outline" disabled>Locked</Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="bg-muted/30 rounded-xl border p-5 text-sm text-muted-foreground space-y-2">
                    <p className="font-semibold text-foreground">Before you submit:</p>
                    <ul className="space-y-1.5 list-disc list-inside">
                        <li>Ensure all required documents are uploaded and verified</li>
                        <li>Review all essay responses for accuracy and completeness</li>
                        <li>Double-check your academic credentials match your uploaded transcripts</li>
                        <li>Once submitted, no changes can be made to your application</li>
                    </ul>
                </div>
            </div>
        </PageContainer>
    );
}
