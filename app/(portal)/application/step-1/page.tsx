"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ApplicationStepper } from "@/components/forms/application-stepper";
import { PageContainer } from "@/components/layout/page-container";
import { Info, Save, ArrowRight } from "lucide-react";
import { applicationSteps, nigerianStates, mockApplication } from "@/mock-data/applicant";
import Link from "next/link";

export default function Step1PersonalInfo() {
    const pi = mockApplication.personalInfo;
    return (
        <PageContainer title="Step 1: Personal Information" description="Provide your accurate personal, contact, and identification details.">
            <div className="max-w-3xl mx-auto space-y-6">
                <ApplicationStepper steps={applicationSteps} currentStep={1} />

                <Card className="border-border/50">
                    <CardHeader className="border-b bg-muted/20">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Info className="h-4 w-4 text-primary" />
                            All fields marked with * are required. Ensure all information matches your official government-issued identification.
                        </p>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                        {/* Name */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Full Name</h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name *</Label>
                                    <Input id="firstName" defaultValue={pi?.firstName} placeholder="Chukwuemeka" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="middleName">Middle Name</Label>
                                    <Input id="middleName" placeholder="Optional" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name / Surname *</Label>
                                    <Input id="lastName" defaultValue={pi?.lastName} placeholder="Okafor" />
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Contact Details</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input id="email" type="email" defaultValue={pi?.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input id="phone" type="tel" defaultValue={pi?.phone} placeholder="+234 803 xxx xxxx" />
                                </div>
                            </div>
                        </div>

                        {/* Personal */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Personal Details</h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth *</Label>
                                    <Input id="dob" type="date" defaultValue={pi?.dateOfBirth} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender *</Label>
                                    <Select defaultValue={pi?.gender?.toLowerCase()}>
                                        <SelectTrigger id="gender"><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="national-id">NIN / National ID *</Label>
                                    <Input id="national-id" defaultValue={pi?.nationalId} placeholder="11-digit NIN" maxLength={11} />
                                </div>
                            </div>
                        </div>

                        {/* Origin */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">State of Origin</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="state">State of Origin *</Label>
                                    <Select defaultValue={pi?.stateOfOrigin}>
                                        <SelectTrigger id="state"><SelectValue placeholder="Select state" /></SelectTrigger>
                                        <SelectContent>
                                            {nigerianStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lga">LGA of Origin *</Label>
                                    <Input id="lga" defaultValue={pi?.lgaOfOrigin} placeholder="Enter your LGA" />
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Residential Address</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address">Street Address *</Label>
                                    <Input id="address" defaultValue={pi?.address} placeholder="House number, street name" />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City *</Label>
                                        <Input id="city" defaultValue={pi?.city} placeholder="City" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="res-state">State of Residence *</Label>
                                        <Select>
                                            <SelectTrigger id="res-state"><SelectValue placeholder="Select state" /></SelectTrigger>
                                            <SelectContent>
                                                {nigerianStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="border-t bg-muted/10 flex justify-between p-5">
                        <Button variant="outline" className="gap-2">
                            <Save className="h-4 w-4" /> Save Progress
                        </Button>
                        <Link href="/portal/apply/step-2">
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
