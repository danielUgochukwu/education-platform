import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, CheckCircle2, MessageSquare, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABlock } from "@/components/sections/cta-block";

const whatYouReceive = [
  "Structured guidance and direction",
  "A clear development path",
  "Access to learning opportunities",
  "A system that tracks progress",
];

const expectations = [
  "Consistency in effort",
  "Personal responsibility",
  "Regular progress communication",
  "Long-term commitment",
];

const phases = [
  {
    label: "Phase 1",
    title: "Selection",
    description: "Screening and identification of serious candidates.",
    icon: Target,
  },
  {
    label: "Phase 2",
    title: "Development",
    description: "Structured growth through learning and practice.",
    icon: BookOpen,
  },
  {
    label: "Phase 3",
    title: "Progression",
    description: "Access to opportunities and increased responsibility.",
    icon: Briefcase,
  },
  {
    label: "Phase 4",
    title: "Contribution",
    description: "Ongoing participation and system contribution.",
    icon: MessageSquare,
  },
];

export default function TalentPipelinePage() {
  return (
    <div className="flex flex-col w-full">
      <section className="border-b nidc-hero-backdrop">
        <div className="container mx-auto px-4 py-18 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5 max-w-3xl">
              <p className="nidc-eyebrow">
                <span className="h-px w-8 bg-primary/70" />
                The Talent Pipeline
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                A structured pathway for real-world impact
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                This is not a typical program. It is a structured pathway designed to develop individuals and position them for real-world impact.
              </p>
            </div>

            <div className="nidc-surface p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                Current Stage
              </p>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                We are currently in a pilot phase, starting with a small cohort to build the system properly before scaling.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild className="h-11">
                  <Link href="/apply">
                    Join the First Cohort
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link href="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper
        className="border-b bg-background"
        title="What You Receive"
        description="The system is built to provide structure, visibility, and progression, not just access."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {whatYouReceive.map((item) => (
            <div key={item} className="nidc-surface p-5">
              <CheckCircle2 className="h-5 w-5 text-primary mb-4" />
              <p className="text-base font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-muted/30"
        title="What Is Expected"
        description="The pipeline is designed for people willing to take ownership of their growth."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {expectations.map((item) => (
            <div key={item} className="nidc-surface-muted p-5">
              <p className="text-base font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-background"
        title="Program Structure"
        description="The progression model is designed to move participants from seriousness to capability and from capability to contribution."
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {phases.map((phase) => (
            <div key={phase.title} className="nidc-surface p-6">
              <div className="flex items-start justify-between gap-4">
                <phase.icon className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  {phase.label}
                </span>
              </div>
              <h2 className="mt-6 text-lg font-semibold">{phase.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <CTABlock
        title="Ready to Enter the Pipeline?"
        description="The first cohort is intentionally small. If you are serious about development and contribution, this is the moment to step in."
        primaryActionLabel="Join the First Cohort"
        primaryActionHref="/apply"
        secondaryActionLabel="Learn How It Works"
        secondaryActionHref="/how-it-works"
      />
    </div>
  );
}
