"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Save, User, Mail, Phone, MapPin, Shield, Bell, Eye, EyeOff, Lock } from "lucide-react";
import { mockApplicant } from "@/mock-data/applicant";
import { nigerianStates } from "@/mock-data/applicant";

export default function ProfileSettingsPage() {
    return (
        <PageContainer
            title="Profile & Settings"
            description="Manage your personal information, notification preferences, and account security."
        >
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Profile Card */}
                <Card className="border-border/50">
                    <CardHeader className="border-b bg-muted/10 pb-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                                {mockApplicant.firstName[0]}{mockApplicant.lastName[0]}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">{mockApplicant.firstName} {mockApplicant.lastName}</h2>
                                <p className="text-sm text-muted-foreground">{mockApplicant.email}</p>
                                <Badge variant="secondary" className="mt-1 text-xs">Applicant Account</Badge>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                        {/* Personal Details */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <User className="h-4 w-4" /> Personal Information
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first">First Name</Label>
                                    <Input id="first" defaultValue={mockApplicant.firstName} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last">Last Name</Label>
                                    <Input id="last" defaultValue={mockApplicant.lastName} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input id="dob" type="date" defaultValue={mockApplicant.dateOfBirth} />
                            </div>
                            <div className="space-y-2">
                                <Label>Gender</Label>
                                <Select defaultValue={mockApplicant.gender.toLowerCase()}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Separator />

                        {/* Contact */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Contact Details
                            </h3>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue={mockApplicant.email} />
                                <p className="text-xs text-muted-foreground">Changing your email will require re-verification.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="phone" type="tel" defaultValue={mockApplicant.phone} className="pl-9" />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* State */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> State of Origin
                            </h3>
                            <Select defaultValue={mockApplicant.stateOfOrigin}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {nigerianStates.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">This must match your official documents. Contact support if a correction is needed.</p>
                        </div>

                        <div className="flex justify-end">
                            <Button className="gap-2"><Save className="h-4 w-4" /> Save Profile Changes</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Notification Preferences */}
                <Card className="border-border/50">
                    <CardHeader className="border-b pb-3 bg-muted/10">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <Bell className="h-4 w-4" /> Notification Preferences
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        {[
                            { label: "Application Status Updates", desc: "Notify me when my application status changes.", enabled: true },
                            { label: "Document Verification", desc: "Notify me when a document is verified or flagged.", enabled: true },
                            { label: "New Announcements", desc: "Receive announcements from the programme office.", enabled: true },
                            { label: "Deadline Reminders", desc: "Remind me 7 days and 1 day before important deadlines.", enabled: false },
                            { label: "Marketing & Programme News", desc: "Receive updates on new tracks, events, and outcomes.", enabled: false },
                        ].map((pref, i) => (
                            <div key={i} className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium">{pref.label}</p>
                                    <p className="text-xs text-muted-foreground">{pref.desc}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    defaultChecked={pref.enabled}
                                    className="mt-1 h-4 w-4 accent-primary shrink-0 cursor-pointer"
                                />
                            </div>
                        ))}
                        <div className="flex justify-end pt-2">
                            <Button variant="outline" className="gap-2"><Save className="h-4 w-4" /> Save Preferences</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card className="border-border/50">
                    <CardHeader className="border-b pb-3 bg-muted/10">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <Shield className="h-4 w-4" /> Account Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cur-pw">Current Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input id="cur-pw" type="password" className="pl-9" placeholder="••••••••" />
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-pw">New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input id="new-pw" type="password" className="pl-9 pr-9" placeholder="Minimum 8 characters" />
                                    <button type="button" className="absolute right-3 top-2.5 text-muted-foreground">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-pw">Confirm Password</Label>
                                <Input id="confirm-pw" type="password" placeholder="Re-enter password" />
                            </div>
                        </div>
                        <div className="flex justify-end pt-1">
                            <Button variant="outline" className="gap-2"><Lock className="h-4 w-4" /> Update Password</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200 bg-red-50/30 dark:bg-red-900/10">
                    <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="font-semibold text-sm text-red-700">Withdraw Application</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                This will permanently withdraw your application from the current cycle. This action cannot be undone.
                            </p>
                        </div>
                        <Button variant="destructive" size="sm" className="shrink-0">Withdraw Application</Button>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    );
}
