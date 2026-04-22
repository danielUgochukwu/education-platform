export function adminStatusClass(status: string): string {
  const s = status?.toLowerCase();
  if (
    [
      "active",
      "completed",
      "live",
      "published",
      "disbursed",
      "verified",
      "accepted",
    ].includes(s)
  )
    return "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-800/30";
  if (
    [
      "pending",
      "in review",
      "scheduled",
      "committed",
      "ready",
      "shortlisted",
      "interview_stage",
      "under_review",
      "submitted",
    ].includes(s)
  )
    return "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30";
  if (["rejected", "flagged", "expiring", "suspended"].includes(s))
    return "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200/50 dark:border-red-800/30";
  if (["draft"].includes(s))
    return "bg-muted text-muted-foreground border border-border/50";
  return "bg-muted text-muted-foreground border border-border/50";
}

export function AdminStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider rounded px-2 py-px ${adminStatusClass(
        status
      )}`}
    >
      {status}
    </span>
  );
}
