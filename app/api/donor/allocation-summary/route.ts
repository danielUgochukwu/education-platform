import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getDonorDashboardData } from "@/lib/supabase/actions";

function formatPercent(value: number | null) {
    return value === null ? "N/A" : `${value}%`;
}

export async function GET() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { profile, fundingRecords, sponsoredScholars, impactMetrics } = await getDonorDashboardData(user.id);

    const totalAllocated = fundingRecords.reduce((acc: number, curr: any) => acc + (Number(curr.amount_allocated) || 0), 0);

    const summary = [
        "Donor Allocation Summary",
        `Organisation: ${profile?.donor_name || profile?.donor_email || "N/A"}`,
        `Donor ID: ${profile?.id}`,
        `Total Commitment: N${(totalAllocated / 1000000).toFixed(1)}M`,
        "",
        "Fund Distribution",
        ...fundingRecords.map((r: any) => `- ${r.applications?.university_programs?.program_name || "Support Line"}: N${(Number(r.amount_allocated) / 1000000).toFixed(1)}M`),
        "",
        "Impact Metrics",
        ...impactMetrics.map((metric: any) => `- ${metric.label}: ${metric.value} - ${metric.description}`),
        "",
        "Sponsored Scholars",
        ...sponsoredScholars.map(
            (scholar: any) =>
                `- ${scholar.first_name} ${scholar.last_name}: ${scholar.program || "Tech Track"}, progress ${scholar.progress_score || 0}%`
        ),
        "",
    ].join("\n");

    return new Response(summary, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Content-Disposition": 'attachment; filename="allocation-summary.txt"',
            "Cache-Control": "no-store",
        },
    });
}
