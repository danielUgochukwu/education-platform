"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    GraduationCap,
    Banknote
} from "lucide-react";

interface SidebarProps {
    role?: "applicant" | "scholar" | "donor" | "admin";
}

export function Sidebar({ role = "applicant" }: SidebarProps) {
    const pathname = usePathname();

    // Temporary mock links based on role
    const getLinks = () => {
        const base = [
            { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" }
        ];

        if (role === "applicant") {
            base.push({ href: "/applications", icon: FileText, label: "My Applications" });
        } else if (role === "scholar") {
            base.push({ href: "/academic-progress", icon: GraduationCap, label: "Academic Progress" });
            base.push({ href: "/stipends", icon: Banknote, label: "Stipends & Funding" });
        } else if (role === "admin") {
            base.push({ href: "/admin/applications", icon: FileText, label: "Applications" });
            base.push({ href: "/admin/scholars", icon: Users, label: "Scholars" });
            base.push({ href: "/admin/funding", icon: Banknote, label: "Funding Distribution" });
        }

        base.push({ href: "/settings", icon: Settings, label: "Settings" });
        return base;
    };

    const links = getLinks();

    return (
        <aside className="w-64 border-r bg-background hidden md:flex flex-col min-h-screen sticky top-0">
            <div className="h-16 flex items-center px-6 border-b">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">N</span>
                    </div>
                    <span className="font-bold text-sm">Talent Initiative</span>
                </Link>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">John Doe</span>
                        <span className="text-xs text-muted-foreground mt-1 capitalize">{role}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
