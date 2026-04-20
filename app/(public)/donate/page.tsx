import Link from "next/link";
import { ArrowRight, Building2, Briefcase, Route, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABlock } from "@/components/sections/cta-block";

const supportAreas = [
  {
    title: "Talent development",
    description: "Resourcing the structured growth of individuals within the system.",
    icon: Building2,
  },
  {
    title: "Applied environments",
    description: "Supporting the environments where people can move beyond theory into real contribution.",
    icon: Route,
  },
  {
    title: "System operations",
    description: "Strengthening the coordination and operational backbone needed for continuity.",
    icon: ShieldCheck,
  },
  {
    title: "Deployment pathways",
    description: "Helping connect developed capability to opportunities and application environments.",
    icon: Briefcase,
  },
];

export default function DonatePage() {
  return (
    <div className="flex flex-col w-full">
      <section className="border-b bg-foreground text-background">
        <div className="container mx-auto px-4 py-18 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5 max-w-3xl">
              <p className="nidc-eyebrow text-background/70">
                <span className="h-px w-8 bg-primary/70" />
                Donor / Funding Page
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Support the system. Enable impact.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-background/75">
                This is not traditional philanthropy.
              </p>
              <p className="max-w-2xl text-lg leading-8 text-background/75">
                It is a structured approach to developing and deploying talent into areas that drive long-term impact.
              </p>
            </div>

            <div className="rounded-[calc(var(--radius)+0.5rem)] border border-background/10 bg-background/5 p-6 backdrop-blur-sm">
              <p className="text-sm leading-7 text-background/75">
                Support is directed toward clearly defined parts of the system, with accountability and measurable outcomes built into the design.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild variant="secondary" className="h-11">
                  <Link href="/contact">
                    Support the Initiative
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11 border-background/20 bg-transparent text-background hover:bg-background/10">
                  <Link href="/governance">View Governance</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper
        className="border-b bg-background"
        title="How Support Is Used"
        description="Resources are directed toward the components that strengthen development, application, and continuity."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {supportAreas.map((item) => (
            <div key={item.title} className="nidc-surface p-5">
              <item.icon className="h-5 w-5 text-primary mb-4" />
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="bg-muted/30"
        title="Transparency"
        description="All resources are directed toward clearly defined components of the system, with a focus on accountability and measurable outcomes."
      >
        <div className="nidc-surface p-6 md:p-8">
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">
            The structure is built to make funding legible, intentional, and aligned with long-term institutional integrity rather than short-term activity.
          </p>
        </div>
      </SectionWrapper>

      <CTABlock
        title="Support the Initiative"
        description="If you want to help build long-term capability and real-world impact, this is where support becomes part of a larger system."
        primaryActionLabel="Support the Initiative"
        primaryActionHref="/contact"
        secondaryActionLabel="View Governance"
        secondaryActionHref="/governance"
      />
    </div>
  );
}
