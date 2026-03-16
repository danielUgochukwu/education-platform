import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ApplicationStatusBadge } from "@/components/ui/application-status-badge";
import { applicationStatusConfig } from "@/components/ui/application-status-badge";
import {
    CheckCircle2, Clock, Calendar, FileText, Mail, Phone, Info, Link as LinkIcon
} from "lucide-react";
import { mockApplication, mockApplicant, mockDeadlines } from "@/mock-data/applicant";
import type { ApplicationStatus } from "@/types";
import Link from "next/link";

const statusTimeline: { status: ApplicationStatus; label: string; date?: string; isCompleted: boolean; description: string }[] = [
    { status: "draft", label: "Application Started", date: "March 8, 2026", isCompleted: true, description: "You created your applicant account and began your application." },
    { status: "submitted", label: "Application Submitted", date: undefined, isCompleted: false, description: "Your application has been formally submitted to the NTDI Selection Board." },
    { status: "under_review", label: "Under Review", date: undefined, isCompleted: false, description: "Your application is being assessed by the Selection Board." },
    { status: "shortlisted", label: "Shortlisted", date: undefined, isCompleted: false, description: "Congratulations — you have been shortlisted for the group assessment phase." },
    { status: "interview_stage", label: "Panel Interview", date: undefined, isCompleted: false, description: "You have been invited to the final panel interview stage." },
    { status: "accepted", label: "Offer of Scholarship", date: undefined, isCompleted: false, description: "You have been offered an NTDI scholarship. Congratulations!" },
];

export default function ApplicationStatusPage() {
    return (
        <PageContainer
            title="Application Status"
            description={`Application ID: ${mockApplication.id} · ${mockApplication.programChoice}`}
        >
            <div className="max-w-4xl mx-auto grid gap-6 lg:grid-cols-3">
                {/* Status timeline — main content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-border/50">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <CardTitle className="text-base font-semibold">Application Progress</CardTitle>
                            <ApplicationStatusBadge status={mockApplication.status} />
                        </CardHeader>
                        <CardContent className="pt-2">
                            <div className="relative pl-8 border-l-2 border-primary/10 space-y-8">
                                {statusTimeline.map((item, i) => {
                                    const isCurrent = item.status === mockApplication.status;
                                    return (
                                        <div key={i} className="relative">
                                            {/* Node */}
                                            <div className={`absolute -left-[41px] top-1 h-6 w-6 rounded-full border-2 flex items-center justify-center ${item.isCompleted ? "bg-primary border-primary text-primary-foreground" :
                                                    isCurrent ? "border-primary bg-background ring-4 ring-primary/20" :
                                                        "border-muted-foreground/20 bg-muted"
                                                }`}>
                                                {item.isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> :
                                                    isCurrent ? <div className="h-2 w-2 rounded-full bg-primary" /> : null}
                                            </div>

                                            <div className={`space-y-1 ${!item.isCompleted && !isCurrent ? "opacity-40" : ""}`}>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold">{item.label}</span>
                                                    {isCurrent && (
                                                        <Badge className="text-[10px] h-4 animate-pulse">Current Stage</Badge>
                                                    )}
                                                </div>
                                                {item.date && (
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                                        <Calendar className="h-3 w-3" /> {item.date}
                                                    </p>
                                                )}
                                                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Next Steps Banner */}
                    <Card className="border-primary/20 bg-primary/5">
                        <CardContent className="p-5 flex items-start gap-4">
                            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <h3 className="font-semibold text-sm">Next Step: Complete Your Application</h3>
                                <p className="text-sm text-muted-foreground">
                                    Your application is currently a draft. Complete all 5 steps and submit before April 30, 2026 to enter
                                    the selection pipeline.
                                </p>
                                <Link href="/portal/apply">
                                    <Button size="sm" className="mt-3 gap-2">
                                        Continue Application <LinkIcon className="h-3.5 w-3.5" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* All Status States Reference */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="text-sm font-semibold">Application Status Reference</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {(Object.keys(applicationStatusConfig) as ApplicationStatus[]).map((status) => (
                                    <div key={status} className="flex items-center gap-2">
                                        <ApplicationStatusBadge status={status} showDot={true} />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Your Details */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold">Applicant Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground">Full Name</p>
                                <p className="text-sm font-medium">{mockApplicant.firstName} {mockApplicant.lastName}</p>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="h-3.5 w-3.5 shrink-0" />
                                <span>{mockApplicant.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Phone className="h-3.5 w-3.5 shrink-0" />
                                <span>{mockApplicant.phone}</span>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-xs text-muted-foreground">Programme</p>
                                <p className="text-xs font-medium">{mockApplication.programChoice}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Application ID</p>
                                <p className="text-xs font-mono font-bold text-primary">{mockApplication.id}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Deadlines */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Key Dates
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {mockDeadlines.map((d) => (
                                <div key={d.id} className="flex items-start gap-2">
                                    <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium leading-snug">{d.label}</p>
                                        <p className="text-xs text-muted-foreground">{d.date}</p>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] shrink-0">{d.daysLeft}d</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Support */}
                    <Card className="border-border/50 bg-muted/10">
                        <CardContent className="p-4 space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Need Help?</p>
                            <p className="text-xs text-muted-foreground">Contact our Applications Support team for assistance.</p>
                            <p className="text-xs font-medium text-primary">apply@ntdi.gov.ng</p>
                            <p className="text-xs text-muted-foreground">Mon–Fri, 8am–5pm WAT</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageContainer>
    );
}
