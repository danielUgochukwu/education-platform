import { Button } from "@/components/ui/button";
import { Bell, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar";

interface TopbarProps {
    role?: "applicant" | "scholar" | "donor" | "admin";
}

const searchPlaceholders = {
    applicant: "Search applications, deadlines, or announcements...",
    scholar: "Search milestones, mentors, messages, or placements...",
    donor: "Search scholars, reports, or funding updates...",
    admin: "Search applications, scholars, or funding...",
};

const navigationTitles = {
    applicant: "Applicant navigation",
    scholar: "Scholar navigation",
    donor: "Donor navigation",
    admin: "Admin navigation",
};

export function Topbar({ role = "admin" }: TopbarProps) {
    return (
        <header className="h-16 border-b bg-background flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
            <div className="flex items-center flex-1">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden mr-2">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Sidebar</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SheetHeader className="sr-only">
                            <SheetTitle>{navigationTitles[role]}</SheetTitle>
                            <SheetDescription>Browse sections available in the current dashboard.</SheetDescription>
                        </SheetHeader>
                        <SidebarContent role={role} />
                    </SheetContent>
                </Sheet>
                <div className="hidden md:flex relative w-full max-w-md">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={searchPlaceholders[role]}
                        className="w-full pl-9 bg-muted/50 border-transparent focus-visible:bg-background h-9"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
                    <span className="sr-only">Notifications</span>
                </Button>
            </div>
        </header>
    );
}
