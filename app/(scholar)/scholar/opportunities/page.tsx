import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { ArrowRight, Briefcase, Compass, Target } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarDashboardData } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";
import { scholarOpportunities as opportunities } from "@/lib/constants";

type OpportunityMilestone = {
  category: string;
  title: string;
  status: string;
  impact_description?: string | null;
  evidence_link?: string | null;
};


export default async function OpportunitiesPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { profile, milestones } = await getScholarDashboardData(user.id);
  const placementStages = milestones
    .filter(
      (m: OpportunityMilestone) =>
        m.category === "internships" || m.category === "industry placements"
    )
    .map((m: OpportunityMilestone) => ({
      label: m.title,
      status: m.status,
      detail:
        m.impact_description ||
        m.evidence_link ||
        "Placement milestone details",
    }));

  return (
    <PageContainer
      title="Opportunities & Placements"
      section="Scholar Portal"
      description="Track internships, placement matches, and deployment opportunities aligned to your scholar pathway."
      action={
        <Button size="sm" className="gap-2 rounded-md">
          Update Preferences <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      }
    >
      <div className="space-y-5">
        {/* Placement snapshot */}
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <div className="p-5">
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                {
                  label: "Placement track",
                  value: profile?.program || "Public-sector analytics track",
                  sub: "",
                },
                {
                  label: "Readiness score",
                  value: `${profile?.placement_score || 0}%`,
                  sub: "Interview prep underway",
                },
                {
                  label: "Active matches",
                  value: "3",
                  sub: "Across public analytics and health-tech",
                },
              ].map((item, i) => (
                <div key={i} className="border border-border/50 rounded-lg p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                    {item.label}
                  </p>
                  <p
                    className={`font-semibold ${
                      i > 0 ? "text-2xl tracking-tight" : "text-sm"
                    }`}
                  >
                    {item.value}
                  </p>
                  {item.sub && (
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {item.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          {/* Placement Pipeline */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <Target className="h-3.5 w-3.5 text-primary" />
              <div>
                <p className="text-xs font-semibold">Placement Pipeline</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Current step-by-step path toward industry placement.
                </p>
              </div>
            </div>
            <div className="p-5">
              <div className="relative border-l border-border/50 pl-6 space-y-6">
                {placementStages.map((stage) => (
                  <div key={stage.label} className="relative">
                    <div
                      className={`absolute -left-[13px] top-1 h-3 w-3 rounded-full ${
                        stage.status === "completed"
                          ? "bg-foreground"
                          : stage.status === "active"
                          ? "bg-amber-500"
                          : "bg-border"
                      }`}
                    />
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs font-medium">{stage.label}</p>
                      <StatusBadge status={stage.status} />
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {stage.detail}
                    </p>
                  </div>
                ))}
                {placementStages.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    No placement milestones found.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Live Opportunities */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              <div>
                <p className="text-xs font-semibold">Live Opportunities</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Open roles and programmes currently matched to your profile.
                </p>
              </div>
            </div>
            <div className="divide-y divide-border/50">
              {opportunities.map((opp) => (
                <div key={opp.id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-semibold">{opp.title}</p>
                        <span className="text-[10px] font-bold uppercase tracking-widest border border-border/50 rounded px-1.5 py-px text-muted-foreground">
                          {opp.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {opp.organisation} · {opp.location}
                      </p>
                    </div>
                    <StatusBadge status={opp.status} />
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                    {opp.summary}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {[
                      { label: "Deadline", value: opp.deadline },
                      { label: "Fit", value: opp.fit },
                    ].map((cell) => (
                      <div
                        key={cell.label}
                        className="border border-border/50 rounded-lg bg-muted/20 p-3"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                          {cell.label}
                        </p>
                        <p className="text-[11px] font-medium">{cell.value}</p>
                      </div>
                    ))}
                    <div className="border border-border/50 rounded-lg bg-muted/20 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                        Readiness
                      </p>
                      <Progress
                        value={opp.status === "active" ? 78 : 56}
                        className="h-1.5"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Direction */}
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/50 bg-muted/20">
            <Compass className="h-3.5 w-3.5 text-primary" />
            <div>
              <p className="text-xs font-semibold">Career Direction</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                What the current opportunity mix is building toward.
              </p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3 p-5">
            {[
              "Public-sector analytics roles where modelling directly informs delivery teams.",
              "Health-tech teams that need data translation between product, research, and policy.",
              "Leadership tracks that prepare scholars for visible deployment after graduation.",
            ].map((item) => (
              <div
                key={item}
                className="border border-border/50 rounded-lg bg-muted/20 p-4 text-xs text-muted-foreground leading-relaxed"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
