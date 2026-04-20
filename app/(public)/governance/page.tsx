import Link from "next/link";
import { ArrowRight, Briefcase, Scale, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABlock } from "@/components/sections/cta-block";

const governanceStructure = [
  {
    title: "Directors",
    description: "Responsible for oversight and direction.",
    icon: Scale,
  },
  {
    title: "Core Team",
    description: "Handles operations and coordination.",
    icon: Briefcase,
  },
  {
    title: "Advisors",
    description: "Provide strategic guidance.",
    icon: Users,
  },
];

export default function GovernancePage() {
  return (
    <div className="flex flex-col w-full">
      <section className="border-b nidc-hero-backdrop">
        <div className="container mx-auto px-4 py-18 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5 max-w-3xl">
              <p className="nidc-eyebrow">
                <span className="h-px w-8 bg-primary/70" />
                Governance & Transparency
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Built for long-term sustainability, not short-term activity
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                NIDC is being structured to operate with accountability, continuity, and institutional integrity over time.
              </p>
            </div>

            <div className="nidc-surface p-6">
              <p className="text-sm leading-7 text-muted-foreground">
                Governance matters because a long-term system needs clear oversight, defined responsibilities, and transparent use of resources.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild className="h-11">
                  <Link href="/donate">
                    Support the Initiative
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link href="/partners">Partner With NIDC</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper
        className="border-b bg-background"
        title="Structure"
        description="Governance is organized to support oversight, execution, and strategic alignment."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {governanceStructure.map((item) => (
            <div key={item.title} className="nidc-surface p-6">
              <item.icon className="h-5 w-5 text-primary mb-4" />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-muted/30"
        title="Use of Funds"
        description="Resources are allocated toward program development, participant support, and operations."
      >
        <div className="nidc-surface p-6 md:p-8">
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">
            Funding is intended to strengthen the system itself, from the development experience participants move through to the operational capacity required to sustain the work responsibly.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="bg-background"
        title="Legal Structure"
        description="Structured as a non-profit entity to ensure accountability and continuity."
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="nidc-surface p-6 md:p-8">
            <p className="text-base leading-8 text-muted-foreground">
              NIDC is being established as a Company Limited by Guarantee, a structure intended to support accountability, sustainability, and long-term public trust.
            </p>
          </div>
          <div className="nidc-surface-muted p-6 md:p-8">
            <ShieldCheck className="h-5 w-5 text-primary mb-4" />
            <p className="text-base leading-8 text-muted-foreground">
              The objective is to build a system that can endure, remain measurable, and preserve institutional integrity over time.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <CTABlock
        title="Support a System Built for Accountability"
        description="Whether you want to partner, support, or join the first cohort, the structure is designed to make long-term work possible."
        primaryActionLabel="Support the Initiative"
        primaryActionHref="/donate"
        secondaryActionLabel="Partner With NIDC"
        secondaryActionHref="/partners"
      />
    </div>
  );
}
