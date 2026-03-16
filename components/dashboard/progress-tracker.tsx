import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgressTrackerProps {
    title: string;
    description?: string;
    progress: number;
    label?: string;
}

export function ProgressTracker({
    title,
    description,
    progress,
    label,
}: ProgressTrackerProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">{title}</CardTitle>
                    {label && <span className="text-sm font-medium">{label}</span>}
                </div>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </CardHeader>
            <CardContent>
                <Progress value={progress} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2 text-right">{progress}% completed</p>
            </CardContent>
        </Card>
    );
}
