import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTABlockProps {
    title: string;
    description: string;
    primaryActionLabel: string;
    secondaryActionLabel?: string;
}

export function CTABlock({
    title,
    description,
    primaryActionLabel,
    secondaryActionLabel,
}: CTABlockProps) {
    return (
        <section className="bg-primary text-primary-foreground py-16 md:py-24 rounded-2xl md:rounded-[2.5rem] my-12 mx-4 md:mx-auto max-w-7xl overflow-hidden relative">
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10 pointer-events-none">
                <svg width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
                    <defs>
                        <pattern id="cta-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#cta-pattern)" />
                </svg>
            </div>
            <div className="container px-6 relative z-10 flex flex-col items-center text-center space-y-8">
                <div className="space-y-4 max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
                    <p className="text-lg md:text-xl text-primary-foreground/80 md:leading-relaxed">
                        {description}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto font-semibold">
                        {primaryActionLabel}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    {secondaryActionLabel && (
                        <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                            {secondaryActionLabel}
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}
