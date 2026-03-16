import { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function PortalLayout({ children }: { children: ReactNode }) {
    return (
        <DashboardLayout role="applicant">
            {children}
        </DashboardLayout>
    );
}
