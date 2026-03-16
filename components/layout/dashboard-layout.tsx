import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface DashboardLayoutProps {
    children: ReactNode;
    role?: "applicant" | "scholar" | "donor" | "admin";
}

export function DashboardLayout({ children, role = "admin" }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-muted/20">
            <Sidebar role={role} />
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <Topbar role={role} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
