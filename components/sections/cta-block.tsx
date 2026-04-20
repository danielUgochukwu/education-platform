import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTABlockProps {
  title: string;
  description: string;
  primaryActionLabel: string;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  deadline?: string;
}

export function CTABlock({
  title, description,
  primaryActionLabel, primaryActionHref = "#",
  secondaryActionLabel, secondaryActionHref = "#",
  deadline,
}: CTABlockProps) {
  return (
    <section className="bg-foreground text-background py-20">
      <div className="container mx-auto px-4 text-center max-w-3xl space-y-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-2">
          <span className="inline-block w-4 h-px bg-primary" />
          Get Started
          <span className="inline-block w-4 h-px bg-primary" />
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug">
          {title}
        </h2>
        <p className="text-base text-background/50 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={primaryActionHref}>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-semibold gap-2 h-11 px-8">
              {primaryActionLabel} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          {secondaryActionLabel && (
            <Link href={secondaryActionHref}>
              <Button size="lg" variant="outline"
                className="rounded-md font-medium h-11 px-8 border-background/20 bg-transparent text-background hover:bg-background/10">
                {secondaryActionLabel}
              </Button>
            </Link>
          )}
        </div>
        {deadline && (
          <p className="text-xs text-background/35">{deadline}</p>
        )}
      </div>
    </section>
  );
}