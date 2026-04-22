import Link from "next/link";
import { HorizontalBarChart } from "@/components/donor/transparency-charts";
import { PageContainer } from "@/components/layout/page-container";
import { ApplicationStatusBadge } from "@/components/ui/application-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminApplications } from "@/lib/supabase/actions";
import { resolveUserRoleForSession } from "@/lib/auth/roles";
import { redirect } from "next/navigation";

type AdminApplication = Awaited<
  ReturnType<typeof getAdminApplications>
>[number];

function isPendingReviewStatus(status: string) {
  return status === "submitted" || status === "under_review";
}
function isInterviewStageStatus(status: string) {
  return status === "interview_stage";
}
function isDecisionReadyStatus(status: string) {
  return status === "shortlisted";
}
function getScoreLabel(score: unknown) {
  return typeof score === "number" && Number.isFinite(score)
    ? `${score}/100`
    : "Awaiting";
}
function getCohortLabel(cohortYear: unknown) {
  return typeof cohortYear === "number" || typeof cohortYear === "string"
    ? `Cohort ${cohortYear}`
    : "Unassigned";
}

export default async function ApplicationsManagementPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const role = await resolveUserRoleForSession(supabase, user);
  if (role !== "admin" && role !== "reviewer") redirect("/admin");

  const applications = await getAdminApplications();
  const vis = applications.filter(
    (a: AdminApplication) => a.status !== "draft"
  );

  const totalApplicants = vis.length;
  const pendingReview = vis.filter((a: AdminApplication) =>
    isPendingReviewStatus(a.status)
  ).length;
  const interviewStage = vis.filter((a: AdminApplication) =>
    isInterviewStageStatus(a.status)
  ).length;
  const decisionReady = vis.filter((a: AdminApplication) =>
    isDecisionReadyStatus(a.status)
  ).length;

  const metrics = [
    {
      title: "Total Applicants",
      value: totalApplicants.toLocaleString(),
      description: "Across open application windows",
    },
    {
      title: "Pending Review",
      value: pendingReview.toString(),
      description: "Need reviewer assignment",
    },
    {
      title: "Interviews Active",
      value: interviewStage.toString(),
      description: "Currently in interview cycle",
    },
    {
      title: "Decision Ready",
      value: decisionReady.toString(),
      description: "Awaiting final approval",
    },
  ];

  const pipelineData = [
    { label: "Intake", value: totalApplicants > 0 ? 100 : 0, color: "#475569" },
    {
      label: "Screening",
      value: Math.round(
        (vis.filter((a: AdminApplication) => !["submitted"].includes(a.status))
          .length /
          (totalApplicants || 1)) *
          100
      ),
      color: "#0284c7",
    },
    {
      label: "Interview",
      value: Math.round(
        (vis.filter((a: AdminApplication) =>
          ["interview_stage", "shortlisted", "accepted"].includes(a.status)
        ).length /
          (totalApplicants || 1)) *
          100
      ),
      color: "#d97706",
    },
    {
      label: "Offer",
      value: Math.round(
        (vis.filter((a: AdminApplication) => a.status === "accepted").length /
          (totalApplicants || 1)) *
          100
      ),
      color: "#0f766e",
    },
  ];

  return (
    <PageContainer
      title="Applications Management"
      section="Admin"
      description="Monitor intake volume, reviewer queues, scoring progress, interviews, and final decisions."
      action={
        <Button asChild size="sm" className="rounded-md">
          <Link href="/admin/applications/review">Open Review</Link>
        </Button>
      }
    >
      <div className="space-y-5">
        {/* Metrics */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 border border-border/50 rounded-xl overflow-hidden divide-x divide-border/50">
          {metrics.map((m, i) => (
            <div key={i} className="border-t-2 border-foreground px-5 py-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                {m.title}
              </p>
              <p className="text-3xl font-semibold tracking-tight leading-none mb-1">
                {m.value}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {m.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          {/* Pipeline */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <p className="text-xs font-semibold">Application Pipeline</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Conversion from intake through final decision issuance.
              </p>
            </div>
            <div className="p-5">
              <HorizontalBarChart items={pipelineData} valueSuffix="%" />
            </div>
          </div>

          {/* Reviewer Load */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <p className="text-xs font-semibold">Reviewer Load</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Current reviewer queues, specialisations, and turnaround.
              </p>
            </div>
            <div className="p-5">
              <div className="border border-border/50 rounded-lg bg-muted/20 p-4">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="text-xs font-semibold">System Auto-Review</p>
                  <span className="text-xs font-semibold">
                    {pendingReview} in queue
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-3">
                  Initial screening and scoring
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  SLA: 24 Hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Queue */}
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50 bg-muted/20">
            <div>
              <p className="text-xs font-semibold">Applications Queue</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Live queue for reviewer assignment, scoring, and interview
                coordination.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-md text-xs"
            >
              <Link href="/admin/applications/review">Review featured</Link>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cohort</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vis.map((a: AdminApplication) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <p className="font-medium text-sm">
                      {a.profiles?.first_name} {a.profiles?.last_name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {a.id.slice(0, 8)}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm">
                    {a.profiles?.email || "—"}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{getCohortLabel(a.cohort_year)}</p>
                    <p className="text-[11px] text-muted-foreground">
                      Step {a.current_step ?? "N/A"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <ApplicationStatusBadge status={a.status} />
                  </TableCell>
                  <TableCell className="text-sm">
                    {getScoreLabel(a.score)}
                  </TableCell>
                </TableRow>
              ))}
              {vis.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-xs text-muted-foreground"
                  >
                    No applications submitted yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </PageContainer>
  );
}
