"use client";

import { useState, useTransition } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateReportStatus } from "@/lib/supabase/actions";

interface ReportActionsDropdownProps {
    reportId: string;
    currentStatus: string;
}

export function ReportActionsDropdown({ reportId, currentStatus }: ReportActionsDropdownProps) {
    const [isPending, startTransition] = useTransition();

    function handleUpdateStatus(newStatus: string) {
        startTransition(async () => {
            const { error } = await updateReportStatus(reportId, newStatus);
            if (error) {
                alert(`Failed to update report status: ${error}`);
            }
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Report Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {currentStatus !== "Draft" && (
                    <DropdownMenuItem onClick={() => handleUpdateStatus("draft")}>
                        Revert to Draft
                    </DropdownMenuItem>
                )}

                {currentStatus !== "In review" && (
                    <DropdownMenuItem onClick={() => handleUpdateStatus("in review")}>
                        Submit for Review
                    </DropdownMenuItem>
                )}

                {currentStatus !== "Ready" && (
                    <DropdownMenuItem onClick={() => handleUpdateStatus("ready")}>
                        Mark as Ready
                    </DropdownMenuItem>
                )}

                {currentStatus !== "Published" && (
                    <DropdownMenuItem onClick={() => handleUpdateStatus("published")}>
                        Publish Report
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
