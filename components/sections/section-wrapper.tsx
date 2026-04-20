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
  children, className, title, description, action, containerClassName,
}: SectionWrapperProps) {
  return (
    <section className={cn("py-14 md:py-20", className)}>
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {(title || description || action) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-1.5 max-w-2xl">
              {title && (
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-2">
                  <span className="inline-block w-4 h-px bg-muted-foreground" />
                  {title}
                </p>
              )}
              {description && (
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">{description}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}