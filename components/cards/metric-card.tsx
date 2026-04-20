import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardTrend {
  value: number;
  isPositive: boolean;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: MetricCardTrend;
  icon?: LucideIcon;
  className?: string;
}

export function MetricCard({
  title,
  value,
  description,
  trend,
  icon: Icon,
  className,
}: MetricCardProps) {
  const trendLabel = trend
    ? `${trend.isPositive ? "+" : "-"}${Math.abs(trend.value)}%`
    : null;

  return (
    <div className={cn("border-t-2 border-foreground px-5 py-6", className)}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
        {Icon ? <Icon className="h-4 w-4 shrink-0 text-muted-foreground" /> : null}
      </div>
      <p className="mb-1.5 text-3xl font-semibold leading-none tracking-tight text-foreground">
        {value}
      </p>
      {trendLabel ? (
        <p
          className={cn(
            "mb-1.5 text-xs font-medium tabular-nums",
            trend?.isPositive ? "text-emerald-600" : "text-amber-600"
          )}
        >
          {trendLabel}
        </p>
      ) : null}
      {description && (
        <p className="text-[11px] text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
