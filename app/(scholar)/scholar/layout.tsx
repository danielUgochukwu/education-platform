import { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function ScholarPortalLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardLayout role="scholar">
            {children}
        </DashboardLayout>
    );
}
