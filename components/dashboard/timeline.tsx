import { cn } from "@/lib/utils";

export interface TimelineItem {
    id: string;
    title: string;
    description?: string;
    date: string;
    isActive?: boolean;
    isCompleted?: boolean;
}

interface TimelineProps {
    items: TimelineItem[];
    className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {items.map((item, index) => (
                <div key={item.id} className="relative pl-8 pb-4 last:pb-0">
                    {/* Connector Line */}
                    {index !== items.length - 1 && (
                        <div className="absolute left-[11px] top-7 bottom-0 w-px bg-border" />
                    )}

                    {/* Dot */}
                    <div
                        className={cn(
                            "absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border-2 flex items-center justify-center bg-background",
                            item.isCompleted ? "border-primary bg-primary" : "border-muted-foreground/30",
                            item.isActive && !item.isCompleted ? "border-primary" : ""
                        )}
                    >
                        {item.isCompleted && (
                            <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        {item.isActive && !item.isCompleted && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                    </div>

                    {/* Content */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                            <h4 className={cn("text-sm font-semibold", item.isActive ? "text-primary" : "")}>{item.title}</h4>
                            <time className="text-xs text-muted-foreground">{item.date}</time>
                        </div>
                        {item.description && (
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
