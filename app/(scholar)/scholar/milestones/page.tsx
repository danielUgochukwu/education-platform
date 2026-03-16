import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Calendar, Flag, Target } from "lucide-react";
import { scholarMilestones } from "@/mock-data/scholar";

const categoryCompletion = [
    { label: "Course completion", value: 100 },
    { label: "Internships", value: 65 },
    { label: "Research", value: 72 },
    { label: "National service contributions", value: 92 },
    { label: "Industry placements", value: 40 },
];

export default function MilestonesPage() {
    const completed = scholarMilestones.filter((milestone) => milestone.status === "completed").length;
    const active = scholarMilestones.filter((milestone) => milestone.status === "active").length;
    const upcoming = scholarMilestones.filter((milestone) => milestone.status === "upcoming").length;

    return (
        <PageContainer
            title="Milestones"
            description="Track course completion, internships, research, national service contributions, and industry placements."
        >
            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        { label: "Completed", value: completed, detail: "Milestones already delivered" },
                        { label: "In progress", value: active, detail: "Current milestones under execution" },
                        { label: "Upcoming", value: upcoming, detail: "Milestones queued for the next cycle" },
                    ].map((item) => (
                        <Card key={item.label} className="border-border/60">
                            <CardContent className="p-5">
                                <p className="text-sm text-muted-foreground">{item.label}</p>
                                <p className="mt-2 text-3xl font-bold">{item.value}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
                    <Card className="border-border/60">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-primary" />
                                Category Completion
                            </CardTitle>
                            <CardDescription>Required milestone areas across the scholar journey.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {categoryCompletion.map((item) => (
                                <div key={item.label} className="space-y-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="font-medium">{item.label}</p>
                                        <span className="text-sm font-semibold">{item.value}%</span>
                                    </div>
                                    <Progress value={item.value} className="h-2" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-border/60">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Flag className="h-4 w-4 text-primary" />
                                Milestone Board
                            </CardTitle>
                            <CardDescription>Delivery detail, evidence, and impact for each core milestone.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {scholarMilestones.map((milestone) => (
                                <div key={milestone.id} className="rounded-xl border bg-background p-4">
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="font-semibold">{milestone.title}</p>
                                                <Badge variant="outline" className="capitalize">
                                                    {milestone.category}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{milestone.impact}</p>
                                        </div>
                                        <StatusBadge status={milestone.status} />
                                    </div>
                                    <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                                        <div className="rounded-lg bg-muted/20 p-3">
                                            <p className="text-xs uppercase tracking-[0.2em]">Due date</p>
                                            <p className="mt-2 flex items-center gap-2 text-foreground">
                                                <Calendar className="h-4 w-4 text-primary" />
                                                {milestone.dueDate}
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-muted/20 p-3">
                                            <p className="text-xs uppercase tracking-[0.2em]">Owner</p>
                                            <p className="mt-2 text-foreground">{milestone.owner}</p>
                                        </div>
                                        <div className="rounded-lg bg-muted/20 p-3">
                                            <p className="text-xs uppercase tracking-[0.2em]">Evidence</p>
                                            <p className="mt-2 text-foreground">{milestone.evidence}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageContainer>
    );
}
