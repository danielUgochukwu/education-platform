import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
    children: ReactNode;
    title?: string;
    description?: string;
    className?: string;
    action?: ReactNode;
}

export function PageContainer({
    children,
    title,
    description,
    className,
    action,
}: PageContainerProps) {
    return (
        <div className={cn("space-y-6 max-w-7xl mx-auto", className)}>
            {(title || description || action) && (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
                    <div className="space-y-1">
                        {title && <h1 className="text-2xl font-bold tracking-tight">{title}</h1>}
                        {description && <p className="text-muted-foreground">{description}</p>}
                    </div>
                    {action && <div className="shrink-0">{action}</div>}
                </div>
            )}
            <div className="min-h-[calc(100vh-16rem)]">
                {children}
            </div>
        </div>
    );
}
