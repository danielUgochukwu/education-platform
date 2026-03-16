import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Lock, Mail, Shield, User, Phone } from "lucide-react";
import { nigerianStates } from "@/mock-data/applicant";

export default function SignupPage() {
    return (
        <div className="w-full max-w-lg py-8">
            {/* Header */}
            <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center gap-2 mb-6">
                    <div className="h-9 w-9 rounded bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xl">N</span>
                    </div>
                    <span className="font-bold text-lg">National Talent Initiative</span>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">Create Applicant Account</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Applications are open for the 2025 cohort. Deadline: April 30, 2026.
                </p>
            </div>

            <Card className="border-border/60 shadow-sm">
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

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="password" type="password" placeholder="Minimum 8 characters" className="pl-9" />
                        </div>
                        <p className="text-xs text-muted-foreground">Must contain at least 8 characters, including a number and a capital letter.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input id="confirm-password" type="password" placeholder="Re-enter password" className="pl-9" />
                        </div>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                        <input type="checkbox" id="terms" className="mt-1 accent-primary" />
                        <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                            I confirm that all information I provide will be truthful and accurate. I understand that any misrepresentation will result in immediate disqualification and potential legal consequences.
                        </label>
                    </div>

                    <Link href="/portal/dashboard">
                        <Button className="w-full h-10 font-semibold">
                            Create Account & Start Application <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>

                    <Separator />

                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-lg text-xs text-muted-foreground">
                        <Shield className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                        <p>Your data is protected under Nigerian data protection regulations. We will never share your personal information with third parties without your explicit consent.</p>
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
