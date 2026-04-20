import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Target,
  TrendingUp,
} from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarAcademicJourney } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";

const capabilityGrowth = [
  {
    label: "Technical depth",
    value: 91,
    detail: "Applied modelling and research methods are strong.",
  },
  {
    label: "Policy communication",
    value: 82,
    detail: "Improving translation of evidence into decision-ready narratives.",
  },
  {
    label: "Placement readiness",
    value: 78,
    detail: "Portfolio is strong; interview storytelling is next.",
  },
];

export default async function AcademicJourneyPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { profile, courses, terms } = await getScholarAcademicJourney(user.id);
  const fullName = profile
    ? `${profile.first_name} ${profile.last_name}`
    : "Scholar Name";

  const metrics = [
    {
      label: "Current CGPA",
      value: profile?.cgpa || "N/A",
      sub: "Updated this term",
    },
    {
      label: "Credits Completed",
      value: profile?.credits_completed || 0,
      sub: "Cumulative",
    },
    {
      label: "Courses Done",
      value: courses.length.toString(),
      sub: "This academic year",
    },
    {
      label: "Terms Active",
      value: terms.length.toString(),
      sub: "In-programme",
    },
  ];

  return (
    <PageContainer
      title="Academic Journey"
      section="Scholar Portal"
      description="A live view of academic growth, coursework, and readiness for deployment."
    >
      <div className="space-y-5">
        {/* Metric row */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 border border-border/50 rounded-xl overflow-hidden divide-x divide-border/50">
          {metrics.map((m, i) => (
            <div key={i} className="border-t-2 border-foreground px-5 py-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                {m.label}
              </p>
              <p className="text-3xl font-semibold tracking-tight leading-none mb-1">
                {m.value}
              </p>
              <p className="text-[11px] text-muted-foreground">{m.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          {/* Term Timeline */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <p className="text-xs font-semibold">Term Timeline</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Performance and learning focus across the active academic
                cycles.
              </p>
            </div>
            <div className="p-5 space-y-5">
              {terms.map((term: any, index: number) => (
                <div key={term.id} className="flex gap-4">
                  <div className="mt-1 flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-foreground" />
                    {index < terms.length - 1 && (
                      <div className="mt-2 h-16 w-px bg-border/50" />
                    )}
                  </div>
                  <div className="pb-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{term.term}</p>
                      <span className="text-[10px] font-bold uppercase tracking-widest border border-border/50 rounded px-1.5 py-px text-muted-foreground">
                        GPA {term.gpa}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {term.highlight}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground/60">
                      {term.focus}
                    </p>
                  </div>
                </div>
              ))}
              {terms.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No academic terms recorded yet.
                </p>
              )}
            </div>
          </div>

          {/* Current Coursework */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <p className="text-xs font-semibold">Current Coursework</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Modules shaping current academic growth and research readiness.
              </p>
            </div>
            <div className="divide-y divide-border/50">
              {courses.map((course: any) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between gap-3 px-5 py-3.5"
                >
                  <div>
                    <p className="text-xs font-medium">{course.title}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {course.credits} credits · {course.note}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest border border-border/50 rounded px-1.5 py-px text-muted-foreground capitalize">
                      {course.status}
                    </span>
                    <span className="text-xs font-semibold">
                      {course.score || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
              {courses.length === 0 && (
                <p className="px-5 py-4 text-xs text-muted-foreground">
                  No courses logged yet.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Capability Growth */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <p className="text-xs font-semibold">Capability Growth</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                How academic development is translating into real deployment
                readiness.
              </p>
            </div>
            <div className="p-5 space-y-5">
              {capabilityGrowth.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                    <span className="text-xs font-semibold">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Applied Learning Focus */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
              <div>
                <p className="text-xs font-semibold">Applied Learning Focus</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  What the current academic year is preparing you to do next.
                </p>
              </div>
            </div>
            <div className="p-5 space-y-3">
              {[
                {
                  label: "Research direction",
                  value:
                    profile?.research_direction ||
                    "Applied research tied to national development and sector-specific performance outcomes.",
                },
                {
                  label: "Placement objective",
                  value:
                    profile?.placement_objective ||
                    "Move into a high-impact role where technical depth and leadership can drive systemic change.",
                },
                {
                  label: "Scholarship expectation",
                  value:
                    profile?.scholarship_expectation ||
                    "Maintain excellent academic standing while documenting visible national service outputs each cycle.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-border/50 rounded-lg p-4 bg-muted/20"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.value}
                  </p>
                </div>
              ))}
              <p className="text-[11px] text-muted-foreground">
                Current scholar: {fullName} · {profile?.level || "Scholar"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
