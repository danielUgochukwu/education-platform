import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";

export const applicationStatusConfig: Record<ApplicationStatus, { label: string; className: string; dotColor: string }> = {
    draft: {
        label: "Draft",
        className: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300",
        dotColor: "bg-slate-400",
    },
    submitted: {
        label: "Submitted",
        className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
        dotColor: "bg-blue-500",
    },
    under_review: {
        label: "Under Review",
        className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
        dotColor: "bg-amber-500",
    },
    shortlisted: {
        label: "Shortlisted",
        className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
        dotColor: "bg-purple-500",
    },
    interview_stage: {
        label: "Interview Stage",
        className: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300",
        dotColor: "bg-indigo-500",
    },
    accepted: {
        label: "Accepted",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300",
        dotColor: "bg-emerald-500",
    },
    rejected: {
        label: "Rejected",
        className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300",
        dotColor: "bg-red-500",
    },
};

interface ApplicationStatusBadgeProps {
    status: ApplicationStatus;
    className?: string;
    showDot?: boolean;
}

export function ApplicationStatusBadge({ status, className, showDot = true }: ApplicationStatusBadgeProps) {
    const config = applicationStatusConfig[status];
    if (!config) return null;
    return (
        <span className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
            config.className,
            className
        )}>
            {showDot && <span className={cn("h-1.5 w-1.5 rounded-full", config.dotColor)} />}
            {config.label}
        </span>
    );
}
