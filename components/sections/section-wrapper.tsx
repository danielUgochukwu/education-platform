import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    title?: string;
    description?: string;
    action?: ReactNode;
    containerClassName?: string;
}

export function SectionWrapper({
    children,
    className,
    title,
    description,
    action,
    containerClassName,
}: SectionWrapperProps) {
    return (
        <section className={cn("py-12 md:py-24", className)}>
            <div className={cn("container mx-auto px-4", containerClassName)}>
                {(title || description || action) && (
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
                        <div className="space-y-2 max-w-3xl">
                            {title && <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>}
                            {description && <p className="text-lg text-muted-foreground">{description}</p>}
                        </div>
                        {action && <div className="shrink-0">{action}</div>}
                    </div>
                )}
                {children}
            </div>
        </section>
    );
}
