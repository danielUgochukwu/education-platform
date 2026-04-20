import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  className,
}: MetricCardProps) {
  return (
    <div className={cn("border-t-2 border-foreground px-5 py-6", className)}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
        {title}
      </p>
      <p className="text-3xl font-semibold tracking-tight leading-none text-foreground mb-1.5">
        {value}
      </p>
      {description && (
        <p className="text-[11px] text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
