import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";

interface ProgramCardProps {
    title: string;
    type: string;
    status: "active" | "upcoming" | "closed";
    location: string;
    duration: string;
    capacity: number;
    description: string;
}

export function ProgramCard({
    title,
    type,
    status,
    location,
    duration,
    capacity,
    description,
}: ProgramCardProps) {
    return (
        <Card className="flex flex-col h-full hover:border-primary/50 transition-colors">
            <CardHeader>
                <div className="flex justify-between items-start gap-4 mb-2">
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">{type}</span>
                    <StatusBadge status={status} />
                </div>
                <h3 className="text-xl font-semibold line-clamp-2">{title}</h3>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {description}
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{capacity} capacity</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full text-sm" variant={status === "closed" ? "secondary" : "default"} disabled={status === "closed"}>
                    {status === "closed" ? "Applications Closed" : "Apply Now"}
                </Button>
            </CardFooter>
        </Card>
    );
}
