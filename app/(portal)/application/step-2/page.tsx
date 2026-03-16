"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ApplicationStepper } from "@/components/forms/application-stepper";
import { PageContainer } from "@/components/layout/page-container";
import { ArrowLeft, ArrowRight, Save, Info } from "lucide-react";
import { applicationSteps, mockApplication, programChoices } from "@/mock-data/applicant";
import Link from "next/link";

export default function Step2AcademicBackground() {
    const ab = mockApplication.academicBackground;
    return (
        <PageContainer title="Step 2: Academic Background" description="Provide your secondary school results, JAMB scores, and current academic enrolment.">
            <div className="max-w-3xl mx-auto space-y-6">
                <ApplicationStepper steps={applicationSteps} currentStep={2} />

                <Card className="border-border/50">
                    <CardHeader className="border-b bg-muted/20">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Info className="h-4 w-4 text-primary" />
                            All academic credentials will be independently verified against the issuing institution's records. Any discrepancy will result in disqualification.
                        </p>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                        {/* Programme Choice */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Programme Selection</h3>
                            <div className="space-y-2">
                                <Label htmlFor="program">Preferred NTDI Programme *</Label>
                                <Select defaultValue={mockApplication.programChoice}>
                                    <SelectTrigger id="program"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {programChoices.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">Programme placement is subject to assessment results and national strategic needs. Indicate your primary preference.</p>
                            </div>
                        </div>

                        {/* Secondary School */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Secondary School</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="school">Name of Secondary School *</Label>
                                    <Input id="school" defaultValue={ab?.secondarySchool} placeholder="Full official name of school" />
                                </div>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="waec-year">WAEC/NECO Year *</Label>
                                        <Input id="waec-year" defaultValue={ab?.waecYear} placeholder="e.g. 2021" maxLength={4} />
                                    </div>
                                    <div className="space-y-2 sm:col-span-2">
                                        <Label htmlFor="waec-grade">WAEC/NECO Results Summary *</Label>
                                        <Input id="waec-grade" defaultValue={ab?.waecGrade} placeholder="e.g. 8 A1s, including Mathematics and English" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* JAMB */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">JAMB / UTME</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="jamb-score">JAMB Score *</Label>
                                    <Input id="jamb-score" defaultValue={ab?.jambScore} placeholder="e.g. 334" />
                                    <p className="text-xs text-muted-foreground">Minimum 280 required</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="jamb-year">JAMB Year *</Label>
                                    <Input id="jamb-year" defaultValue={ab?.jambYear} placeholder="e.g. 2022" maxLength={4} />
                                </div>
                            </div>
                        </div>

                        {/* Current Institution */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Current Tertiary Institution (if enrolled)</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="institution">Institution Name</Label>
                                    <Input id="institution" defaultValue={ab?.institution} placeholder="University / Polytechnic name" />
                                </div>
                                <div className="grid sm:grid-cols-3 gap-4">
                                    <div className="space-y-2 sm:col-span-2">
                                        <Label htmlFor="course">Course / Department *</Label>
                                        <Input id="course" defaultValue={ab?.course} placeholder="e.g. Computer Science" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="year">Current Year</Label>
                                        <Select defaultValue={ab?.currentYear}>
                                            <SelectTrigger id="year"><SelectValue placeholder="Select year" /></SelectTrigger>
                                            <SelectContent>
                                                {["Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Postgraduate"].map(y => (
                                                    <SelectItem key={y} value={y}>{y}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="program-type">Programme Type *</Label>
                                    <Select defaultValue={ab?.programType}>
                                        <SelectTrigger id="program-type"><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                                            <SelectItem value="postgraduate">Postgraduate</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="border-t bg-muted/10 flex justify-between p-5">
                        <div className="flex gap-2">
                            <Link href="/portal/apply/step-1">
                                <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button>
                            </Link>
                            <Button variant="ghost" className="gap-2"><Save className="h-4 w-4" /> Save</Button>
                        </div>
                        <Link href="/portal/apply/step-3">
                            <Button className="gap-2 font-semibold">
                                Save & Continue <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </PageContainer>
    );
}
