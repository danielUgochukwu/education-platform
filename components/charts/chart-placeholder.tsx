import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface ChartPlaceholderProps {
    title: string;
    description?: string;
    height?: string;
}

export function ChartPlaceholder({
    title,
    description,
    height = "h-[300px]"
}: ChartPlaceholderProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-medium">{title}</CardTitle>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </CardHeader>
            <CardContent>
                <div className={`w-full ${height} bg-muted/30 border border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground`}>
                    <BarChart3 className="h-10 w-10 mb-4 opacity-50" />
                    <p className="text-sm font-medium">Chart visualization placeholder</p>
                    <p className="text-xs opacity-75 mt-1">Implement with Recharts or Chart.js</p>
                </div>
            </CardContent>
        </Card>
    );
}
