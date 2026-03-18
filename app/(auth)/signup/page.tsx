"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Lock, Mail, Shield, User, Phone, Heart, Handshake, GraduationCap } from "lucide-react";
import { nigerianStates } from "@/mock-data/applicant";

type Intent = "applicant" | "donor" | "partner";

const CONFIG: Record<Intent, { title: string; subtitle: string; cta: string; icon: any }> = {
    applicant: {
        title: "Create Applicant Account",
        subtitle: "Start your application for education support and national impact.",
        cta: "Continue as Applicant",
        icon: GraduationCap,
    },
    donor: {
        title: "Create Donor Account",
        subtitle: "Track donations, sponsorships, and real-time impact metrics.",
        cta: "Continue as Donor",
        icon: Heart,
    },
    partner: {
        title: "Create Partner Account",
        subtitle: "Begin institutional collaboration with the national talent engine.",
        cta: "Continue as Partner",
        icon: Handshake,
    },
};

export default function SignupPage() {
    const searchParams = useSearchParams();
    const intentParam = searchParams.get("intent") as Intent;
    const currentIntent = CONFIG[intentParam] ? intentParam : null;

    return (
        <div className="w-full max-w-lg py-8 mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center gap-2 mb-6">
                    <div className="h-9 w-9 rounded bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xl">N</span>
                    </div>
                    <span className="font-bold text-lg">National Talent Initiative</span>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">
                    {currentIntent ? CONFIG[currentIntent].title : "Create Your Account"}
                </h1>
                <p className="text-muted-foreground text-sm mt-1 max-w-xs mx-auto">
                    {currentIntent ? CONFIG[currentIntent].subtitle : "Select your account type to get started."}
                </p>
            </div>

            {!currentIntent && (
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {(Object.keys(CONFIG) as Intent[]).map((key) => {
                        const Icon = CONFIG[key].icon;
                        return (
                            <Link
                                key={key}
                                href={`/signup?intent=${key}`}
                                className="flex flex-col items-center gap-3 p-4 rounded-xl border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all group"
                            >
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground group-hover:text-primary">
                                    {key}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            )}

            <Card className={`border-border/60 shadow-sm transition-opacity duration-300 ${!currentIntent ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
                <CardContent className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input id="first-name" placeholder="Chukwuemeka" className="pl-9" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name / Surname</Label>
                            <Input id="last-name" placeholder="Okafor" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="email" type="email" placeholder="you@email.com" className="pl-9" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="phone" type="tel" placeholder="+234 803 xxx xxxx" className="pl-9" />
                        </div>
                    </div>

                    {currentIntent === "applicant" && (
                        <div className="space-y-2">
                            <Label htmlFor="state">State of Origin</Label>
                            <Select>
                                <SelectTrigger id="state">
                                    <SelectValue placeholder="Select your state of origin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {nigerianStates.map((state) => (
                                        <SelectItem key={state} value={state}>{state}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="password" type="password" placeholder="Minimum 8 characters" className="pl-9" />
                        </div>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                        <input type="checkbox" id="terms" className="mt-1 accent-primary" />
                        <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                            I confirm that all information I provide will be truthful. I understand that NTDI reserves the right to verify all submissions for security and compliance.
                        </label>
                    </div>

                    <Button className="w-full h-10 font-semibold" disabled={!currentIntent}>
                        {currentIntent ? CONFIG[currentIntent].cta : "Create Account"} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <Separator />

                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-lg text-xs text-muted-foreground">
                        <Shield className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                        <p>Your session is encrypted. By creating an account, you agree to our specialized data privacy terms for {currentIntent || "users"}.</p>
                    </div>
                </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
}
