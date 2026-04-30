import { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { resolveUserRoleForSession } from "@/lib/auth/roles";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const ADMIN_ROUTE_ROLES = new Set(["admin", "reviewer", "partner"]);

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const role = await resolveUserRoleForSession(supabase, user);
    if (!ADMIN_ROUTE_ROLES.has(role)) {
        redirect("/dashboard");
    }

    return (
        <DashboardLayout role="admin">
            {children}
        </DashboardLayout>
    );
}
