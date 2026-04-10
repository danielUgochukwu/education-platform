import React from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ApplicationForm from "@/components/forms/application-form";
import { getUniversitiesAndPrograms, getApplicantDashboardData } from "@/lib/supabase/actions";

export default async function StartApplicationPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { application } = await getApplicantDashboardData(user.id);
  // If the user already submitted, maybe redirect them to the status page 
  // but for now let's just let them see the form or status.
  if (application && application.status && application.status !== 'draft') {
    redirect("/dashboard");
  }

  const universities = await getUniversitiesAndPrograms();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf7] to-[#f5f0ea] w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .font-serif {
          font-family: 'Crimson Pro', serif;
        }
      `}</style>
      <ApplicationForm initialUniversities={universities} />
    </div>
  );
}
