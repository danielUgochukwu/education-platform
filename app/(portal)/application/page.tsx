import { PageContainer } from "@/components/layout/page-container";
import { ApplicationWizard } from "@/components/forms/application-wizard";
import { Card, CardContent } from "@/components/ui/card";
import { ApplicationStatusBadge } from "@/components/ui/application-status-badge";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getApplicantDashboardData } from "@/lib/supabase/actions";
import { buildProfileFallback } from "@/lib/auth/profile-fallback";

export default async function StartApplicationPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { application, profile, documents } = await getApplicantDashboardData(user.id);
  const resolvedProfile = profile ?? buildProfileFallback(user);

  const status = application?.status || "draft";
  const programName =
    application?.program_name ||
    application?.programChoice ||
    application?.program_choice ||
    "Not Started";
  const cohortLabel = application?.cohort_year
    ? `Cohort ${application.cohort_year}`
    : "Cohort Pending";
  const appId = application?.id
    ? `NTDI-${application.id.slice(0, 8)}`
    : "New Application";

  return (
    <PageContainer
      title="My Application"
      description={`Application ID: ${appId}`}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold">{programName}</h2>
                  <ApplicationStatusBadge status={status} />
                </div>
                {application?.updated_at && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Last saved:{" "}
                    {new Date(application.updated_at).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{cohortLabel}</Badge>
                <Badge variant="secondary">Deadline: April 30, 2026</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <ApplicationWizard
          application={application}
          profile={resolvedProfile}
          documents={documents}
        />
      </div>
    </PageContainer>
  );
}
