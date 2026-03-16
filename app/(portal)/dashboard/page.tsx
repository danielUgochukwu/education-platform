import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ApplicationStatusBadge } from "@/components/ui/application-status-badge";
import { PageContainer } from "@/components/layout/page-container";
import {
    ArrowRight,
    Bell,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    MessageSquare,
    Pin,
    AlertTriangle,
} from "lucide-react";
import {
    mockApplicant,
    mockApplication,
    mockNotifications,
    mockDeadlines,
    mockAnnouncements,
    applicationSteps,
} from "@/mock-data/applicant";

// Profile completion calculation
const profileCompleted = [
    !!mockApplication.personalInfo?.firstName,
    !!mockApplication.academicBackground?.secondarySchool,
    !!mockApplication.essays?.whyApply,
    (mockApplication.documents?.length ?? 0) > 0,
];
const completionPct = Math.round((profileCompleted.filter(Boolean).length / 5) * 100);
const unreadNotifs = mockNotifications.filter((n) => !n.isRead).length;

export default function ApplicantDashboard() {
    return (
        <PageContainer
            title={`Welcome back, ${mockApplicant.firstName}`}
            description={`Application ID: ${mockApplication.id} · Programme: ${mockApplication.programChoice}`}
            action={
                <Link href="/portal/apply">
                    <Button className="font-semibold">
                        Continue Application <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            }
        >
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column: Application Summary + Steps */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Application Progress Card */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-2 flex flex-row items-start justify-between gap-4">
                            <div>
                                <CardTitle className="text-base font-semibold">Application Progress</CardTitle>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    Step {mockApplication.currentStep} of {applicationSteps.length} — {applicationSteps[mockApplication.currentStep - 1]?.label}
                                </p>
                            </div>
                            <ApplicationStatusBadge status={mockApplication.status} />
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <Progress value={(mockApplication.currentStep / applicationSteps.length) * 100} className="h-2" />

                            <div className="space-y-2">
                                {applicationSteps.map((s) => {
                                    const isCompleted = s.step < mockApplication.currentStep;
                                    const isActive = s.step === mockApplication.currentStep;
                                    const isPending = s.step > mockApplication.currentStep;
                                    return (
                                        <div
                                            key={s.step}
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/30"
                                                }`}
                                        >
                                            <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isCompleted ? "bg-primary text-primary-foreground" :
                                                    isActive ? "border-2 border-primary text-primary bg-background" :
                                                        "border border-muted-foreground/30 text-muted-foreground/50 bg-muted/30"
                                                }`}>
                                                {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : s.step}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium ${isPending ? "text-muted-foreground" : ""}`}>{s.label}</p>
                                                {isActive && <p className="text-xs text-primary mt-0.5">In progress</p>}
                                                {isCompleted && <p className="text-xs text-muted-foreground mt-0.5">Completed</p>}
                                                {isPending && <p className="text-xs text-muted-foreground/60 mt-0.5">Not started</p>}
                                            </div>
                                            {isActive && (
                                                <Link href={`/portal/apply/step-${s.step}`}>
                                                    <Button size="sm" variant="outline" className="text-xs h-7 shrink-0">Continue</Button>
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="pt-2">
                                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    Last saved: {new Date(mockApplication.lastSavedAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Announcements */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Announcements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockAnnouncements.map((ann, i) => (
                                <div key={ann.id}>
                                    <div className="flex items-start gap-3">
                                        {ann.isPinned && <Pin className="h-3.5 w-3.5 text-primary mt-1 shrink-0" />}
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-semibold leading-snug">{ann.title}</p>
                                                {ann.isPinned && <Badge variant="secondary" className="text-[10px] shrink-0">Pinned</Badge>}
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{ann.body}</p>
                                            <p className="text-[10px] text-muted-foreground/70">{ann.author} · {ann.createdAt}</p>
                                        </div>
                                    </div>
                                    {i < mockAnnouncements.length - 1 && <Separator className="mt-4" />}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Sidebar widgets */}
                <div className="space-y-6">
                    {/* Profile Completion */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold">Profile Completion</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-extrabold">{completionPct}%</span>
                                <span className="text-xs text-muted-foreground mb-1">of application</span>
                            </div>
                            <Progress value={completionPct} className="h-2" />
                            <ul className="space-y-2 mt-2">
                                {[
                                    { label: "Personal Information", done: true },
                                    { label: "Academic Background", done: true },
                                    { label: "Essays", done: false },
                                    { label: "Documents", done: false },
                                    { label: "Review & Submit", done: false },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs">
                                        <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${item.done ? "text-primary" : "text-muted-foreground/30"}`} />
                                        <span className={item.done ? "line-through text-muted-foreground" : ""}>{item.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Important Deadlines */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Important Deadlines
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockDeadlines.map((deadline) => (
                                <div key={deadline.id} className="flex items-start gap-3">
                                    {deadline.isUrgent ? (
                                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                                    ) : (
                                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold leading-tight">{deadline.label}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{deadline.date}</p>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={`text-[10px] shrink-0 ${deadline.isUrgent ? "border-amber-300 text-amber-700 bg-amber-50" : ""}`}
                                    >
                                        {deadline.daysLeft}d left
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recent Notifications */}
                    <Card className="border-border/50">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Bell className="h-4 w-4" />
                                    Notifications
                                </CardTitle>
                                {unreadNotifs > 0 && (
                                    <Badge className="text-[10px] h-5">{unreadNotifs} new</Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {mockNotifications.slice(0, 3).map((notif, i) => (
                                <div key={notif.id}>
                                    <div className={`flex items-start gap-2 ${!notif.isRead ? "opacity-100" : "opacity-70"}`}>
                                        <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${notif.type === "success" ? "bg-emerald-500" :
                                                notif.type === "warning" ? "bg-amber-500" :
                                                    notif.type === "error" ? "bg-red-500" :
                                                        "bg-blue-500"
                                            }`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium leading-snug">{notif.title}</p>
                                            <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{notif.body}</p>
                                        </div>
                                    </div>
                                    {i < mockNotifications.length - 2 && <Separator className="mt-3" />}
                                </div>
                            ))}
                            <Link href="/portal/notifications">
                                <Button variant="ghost" className="w-full text-xs h-8 mt-1 text-primary">
                                    View All Notifications
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-border/50 bg-muted/20">
                        <CardContent className="pt-4 space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Quick Actions</p>
                            {[
                                { label: "Download Application Guide", icon: FileText, href: "#" },
                                { label: "Contact Support", icon: MessageSquare, href: "/contact" },
                            ].map((action, i) => (
                                <Link key={i} href={action.href}>
                                    <Button variant="ghost" className="w-full justify-start h-9 text-sm font-normal">
                                        <action.icon className="mr-2 h-3.5 w-3.5 text-primary" />
                                        {action.label}
                                    </Button>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageContainer>
    );
}
