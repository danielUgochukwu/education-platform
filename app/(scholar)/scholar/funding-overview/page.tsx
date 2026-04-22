import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarDashboardData } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";

type FundingRecord = {
  id: string;
  status: string;
  amount: number | string;
  category: string;
  disbursement_date?: string | null;
  created_at: string;
  reference_number?: string | null;
};


const fundingBreakdownArr = [
  {
    label: "Tuition & academic fees",
    note: "Covers core fees, lab access, and project supervision.",
    allocated: "₦2.9M",
    used: "₦2.2M",
    utilisation: 76,
  },
  {
    label: "Living stipend",
    note: "Monthly stipends are on schedule with one pending cycle.",
    allocated: "₦1.1M",
    used: "₦800k",
    utilisation: 73,
  },
  {
    label: "Research support",
    note: "Includes dataset access and field transport.",
    allocated: "₦500k",
    used: "₦280k",
    utilisation: 56,
  },
];

export default async function FundingOverviewPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { profile, fundingRecords } = await getScholarDashboardData(user.id);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n);
  const totalApproved = profile?.approved_funding || 4800000;
  const totalDisbursed = fundingRecords.reduce(
    (acc: number, r: FundingRecord) =>
      acc + (r.status === "completed" ? Number(r.amount) : 0),
    0
  );
  const nextStipend =
    fundingRecords.find((r: FundingRecord) => r.status === "pending")?.amount || 350000;

  const ledger = fundingRecords.map((r: FundingRecord) => ({
    id: r.id,
    date: new Date(r.disbursement_date || r.created_at).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    ),
    category: r.category,
    amount: fmt(r.amount),
    reference: r.reference_number || `REF-${r.id.slice(0, 8)}`,
    status: r.status,
  }));

  const metrics = [
    {
      label: "Approved Support",
      value: fmt(totalApproved),
      sub: "Full scholarship commitment",
    },
    { label: "Disbursed", value: fmt(totalDisbursed), sub: "Released to date" },
    {
      label: "Next Stipend",
      value: fmt(nextStipend),
      sub: nextStipend > 0 ? "Upcoming release" : "No pending stipends",
    },
  ];

  return (
    <PageContainer
      title="Funding Overview"
      section="Scholar Portal"
      description="See scholarship disbursements, support categories, and the current funding runway."
      action={
        <Button size="sm" className="rounded-md">
          Download Funding Statement
        </Button>
      }
    >
      <div className="space-y-5">
        {/* Metric row */}
        <div className="grid md:grid-cols-3 border border-border/50 rounded-xl overflow-hidden divide-x divide-border/50">
          {metrics.map((m, i) => (
            <div key={i} className="border-t-2 border-foreground px-5 py-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                {m.label}
              </p>
              <p className="text-2xl font-semibold tracking-tight leading-none mb-1">
                {m.value}
              </p>
              <p className="text-[11px] text-muted-foreground">{m.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {/* Funding Breakdown */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <p className="text-xs font-semibold">Funding Breakdown</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                How approved support is allocated across the scholar experience.
              </p>
            </div>
            <div className="p-5 space-y-5">
              {fundingBreakdownArr.map((line) => (
                <div key={line.label} className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium">{line.label}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {line.note}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold">{line.used}</p>
                      <p className="text-[11px] text-muted-foreground">
                        of {line.allocated}
                      </p>
                    </div>
                  </div>
                  <Progress value={line.utilisation} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Funding Health */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <p className="text-xs font-semibold">Funding Health</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Compliance and release signals for the current cycle.
              </p>
            </div>
            <div className="p-5 space-y-3">
              {[
                "Tuition obligations are current and institution invoices are reconciled.",
                "Living stipend releases are on schedule with one pending payout cycle.",
                "Research support remains available for approved fieldwork and conference needs.",
                "Impact evidence and report submission are current, keeping funding status healthy.",
              ].map((item) => (
                <div
                  key={item}
                  className="border border-border/50 rounded-lg p-3.5 bg-muted/20 text-xs text-muted-foreground leading-relaxed"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ledger */}
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
            <p className="text-xs font-semibold">Disbursement Ledger</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Chronological record of approved funding support.
            </p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ledger.map((d: { id: string, date: string, category: string, amount: string, reference: string, status: string }) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium text-sm">
                    {d.date}
                  </TableCell>
                  <TableCell className="text-sm">{d.category}</TableCell>
                  <TableCell className="text-sm">{d.amount}</TableCell>
                  <TableCell className="text-sm">{d.reference}</TableCell>
                  <TableCell>
                    <StatusBadge status={d.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {ledger.length === 0 && (
            <div className="text-xs text-muted-foreground text-center py-10 border-t border-dashed border-border/50">
              No disbursement records found.
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
