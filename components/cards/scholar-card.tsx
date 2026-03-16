import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, MapPin } from "lucide-react";

interface ScholarCardProps {
    name: string;
    institution: string;
    course: string;
    state: string;
    status: "active" | "graduated" | "suspended";
    cohort: string;
    avatarUrl?: string;
}

export function ScholarCard({
    name,
    institution,
    course,
    state,
    status,
    cohort,
    avatarUrl,
}: ScholarCardProps) {
    return (
        <Card className="hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-12 w-12 border">
                    <AvatarImage src={avatarUrl} alt={name} />
                    <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold truncate">{name}</h4>
                    <p className="text-sm text-muted-foreground truncate">{cohort} Scholar</p>
                </div>
                <StatusBadge status={status} />
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                        <GraduationCap className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                        <div className="flex flex-col">
                            <span className="font-medium">{course}</span>
                            <span className="text-muted-foreground">{institution}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="text-muted-foreground">{state} State</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
