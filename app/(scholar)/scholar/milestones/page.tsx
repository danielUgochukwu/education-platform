import { PageContainer } from "@/components/layout/page-container";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Calendar, Flag, Target } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarDashboardData } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";

const categoryCompletion = [
  { label: "Course completion", value: 100 },
  { label: "Internships", value: 65 },
  { label: "Research", value: 72 },
  { label: "National service contributions", value: 92 },
  { label: "Industry placements", value: 40 },
];

export default async function MilestonesPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { milestones } = await getScholarDashboardData(user.id);
  const milestonesList = milestones.map((m: any) => ({
    id: m.id,
    title: m.title,
    category: m.category,
    status: m.status,
    dueDate: new Date(m.due_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    owner: m.owner || "Program Office",
    impact: m.impact_description || "Public-sector and research impact",
    evidence: m.evidence_link || "Pending upload",
  }));

  const stats = [
    {
      label: "Completed",
      value: milestonesList.filter((m: any) => m.status === "completed").length,
      detail: "Milestones already delivered",
    },
    {
      label: "In progress",
      value: milestonesList.filter((m: any) => m.status === "active").length,
      detail: "Current milestones under execution",
    },
    {
      label: "Upcoming",
      value: milestonesList.filter((m: any) => m.status === "upcoming").length,
      detail: "Milestones queued for the next cycle",
    },
  ];

  return (
    <PageContainer
      title="Milestones"
      section="Scholar Portal"
      description="Track course completion, internships, research, national service contributions, and industry placements."
    >
      <div className="space-y-5">
        {/* Summary row */}
        <div className="grid md:grid-cols-3 border border-border/50 rounded-xl overflow-hidden divide-x divide-border/50">
          {stats.map((s, i) => (
            <div key={i} className="border-t-2 border-foreground px-5 py-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                {s.label}
              </p>
              <p className="text-3xl font-semibold tracking-tight leading-none mb-1">
                {s.value}
              </p>
              <p className="text-[11px] text-muted-foreground">{s.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          {/* Category Completion */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <Target className="h-3.5 w-3.5 text-primary" />
              <div>
                <p className="text-xs font-semibold">Category Completion</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Required milestone areas across the scholar journey.
                </p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {categoryCompletion.map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-medium">{item.label}</p>
                    <span className="text-xs font-semibold">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Board */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <Flag className="h-3.5 w-3.5 text-primary" />
              <div>
                <p className="text-xs font-semibold">Milestone Board</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Delivery detail, evidence, and impact for each core milestone.
                </p>
              </div>
            </div>
            <div className="divide-y divide-border/50">
              {milestonesList.map((m: any) => (
                <div key={m.id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-semibold">{m.title}</p>
                        <span className="text-[10px] font-bold uppercase tracking-widest border border-border/50 rounded px-1.5 py-px text-muted-foreground capitalize">
                          {m.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {m.impact}
                      </p>
                    </div>
                    <StatusBadge status={m.status} />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {[
                      { label: "Due date", value: m.dueDate, icon: Calendar },
                      { label: "Owner", value: m.owner },
                      { label: "Evidence", value: m.evidence },
                    ].map((cell) => (
                      <div
                        key={cell.label}
                        className="border border-border/50 rounded-lg bg-muted/20 p-3"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                          {cell.label}
                        </p>
                        <p className="text-[11px] font-medium">{cell.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {milestonesList.length === 0 && (
                <p className="px-5 py-8 text-xs text-muted-foreground text-center border border-dashed border-border/50 m-4 rounded-xl">
                  No milestones found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
