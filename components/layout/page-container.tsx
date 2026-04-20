import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  action?: ReactNode;
  section?: string;
}

export function PageContainer({
  children,
  title,
  description,
  className,
  action,
  section,
}: PageContainerProps) {
  return (
    <div className={cn("space-y-6 max-w-7xl mx-auto", className)}>
      {(title || description || action) && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-5">
          <div className="space-y-0.5">
            {section && (
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-1.5">
                <span className="inline-block w-3.5 h-px bg-muted-foreground" />
                {section}
              </p>
            )}
            {title && (
              <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            )}
            {description && (
              <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="min-h-[calc(100vh-16rem)]">{children}</div>
    </div>
  );
}
