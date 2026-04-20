import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, Building2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABlock } from "@/components/sections/cta-block";

const steps = [
  {
    label: "Step 1",
    title: "Selection",
    description:
      "We identify a limited number of individuals who demonstrate seriousness, discipline, and willingness to grow.",
    icon: Target,
  },
  {
    label: "Step 2",
    title: "Development",
    description:
      "Participants go through a structured process focused on building real skills, direction, and accountability.",
    icon: BookOpen,
  },
  {
    label: "Step 3",
    title: "Growth & Opportunities",
    description:
      "As individuals develop, they gain access to aligned opportunities, including learning pathways, exposure, and support.",
    icon: Briefcase,
  },
  {
    label: "Step 4",
    title: "Contribution",
    description:
      "Participants apply their capabilities within real systems, contributing to projects, supporting others, and becoming part of a growing network.",
    icon: Building2,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="border-b nidc-hero-backdrop">
        <div className="container mx-auto px-4 py-18 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5 max-w-3xl">
              <p className="nidc-eyebrow">
                <span className="h-px w-8 bg-primary/70" />
                How the System Works
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                A structured pathway from growth to contribution
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                This is not a loose collection of opportunities. It is a system designed to connect individual growth to real-world impact.
              </p>
            </div>

            <div className="nidc-surface p-6">
              <p className="text-sm leading-7 text-muted-foreground">
                The process is intentionally sequential: selection, development, progression, and contribution all build on one another.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild className="h-11">
                  <Link href="/apply">
                    Join the First Cohort
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link href="/talent-pipeline">View the Talent Pipeline</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper
        className="border-b bg-background"
        title="System Steps"
        description="Each stage is designed to deepen capability and move participants closer to meaningful contribution."
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.title} className="nidc-surface p-6">
              <div className="flex items-start justify-between gap-4">
                <step.icon className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  {step.label}
                </span>
              </div>
              <h2 className="mt-6 text-lg font-semibold">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-muted/30"
        title="What Holds the System Together"
        description="A real system needs more than activity. It needs continuity, accountability, and applied outcomes."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Serious selection",
              body: "The first step is identifying people who are willing to commit to disciplined long-term growth.",
            },
            {
              title: "Structured development",
              body: "Learning is connected to direction, standards, and regular accountability.",
            },
            {
              title: "Applied contribution",
              body: "Capability is expected to move into environments where it can support real systems and real work.",
            },
          ].map((item) => (
            <div key={item.title} className="nidc-surface-muted p-5">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="bg-background"
        title="Closing"
        description="This is a system designed to connect individual growth to real-world impact."
      >
        <div className="nidc-surface p-6 md:p-8">
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">
            The goal is not to move people through a temporary program, but to build a path that turns seriousness into capability and capability into contribution.
          </p>
        </div>
      </SectionWrapper>

      <CTABlock
        title="Take the Next Step"
        description="If the structure makes sense to you, the next move is simple: review the talent pipeline and join the first cohort."
        primaryActionLabel="Join the First Cohort"
        primaryActionHref="/apply"
        secondaryActionLabel="View the Talent Pipeline"
        secondaryActionHref="/talent-pipeline"
      />
    </div>
  );
}
