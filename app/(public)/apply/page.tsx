import Link from "next/link";
import { AlertCircle, ArrowRight, BookOpen, Briefcase, MessageSquare, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABlock } from "@/components/sections/cta-block";

const expectations = [
  "Consistency in effort",
  "Personal responsibility",
  "Regular progress communication",
  "Long-term commitment",
];

const process = [
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

export default function ApplyPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="border-b bg-foreground text-background">
        <div className="container mx-auto px-4 py-18 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5 max-w-3xl">
              <p className="nidc-eyebrow text-background/70">
                <span className="h-px w-8 bg-primary/70" />
                First Cohort
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Join the first cohort
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-background/75">
                This is the entry point into NIDC&apos;s structured talent pipeline.
              </p>
              <p className="max-w-2xl text-lg leading-8 text-background/75">
                We are beginning with a small pilot cohort to build the system properly before scaling.
              </p>
            </div>

            <div className="rounded-[calc(var(--radius)+0.5rem)] border border-background/10 bg-background/5 p-6 backdrop-blur-sm">
              <p className="text-sm leading-7 text-background/75">
                This pathway is for individuals willing to take responsibility for their growth and commit to a long-term process.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild variant="secondary" className="h-11">
                  <Link href="/signup">
                    Start Your Application
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11 border-background/20 bg-transparent text-background hover:bg-background/10">
                  <Link href="/talent-pipeline">Review the Talent Pipeline</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-border/50 py-3.5">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
          <p className="text-xs text-muted-foreground">
            The first cohort is intentionally limited. Applications are reviewed for seriousness, discipline, and long-term commitment.
          </p>
        </div>
      </div>

      <SectionWrapper
        className="border-b bg-background"
        title="What Is Expected"
        description="This is not built for casual participation."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {expectations.map((item) => (
            <div key={item} className="nidc-surface p-5">
              <p className="text-base font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-muted/30"
        title="What Happens After You Apply"
        description="The first cohort follows the same structured progression model as the wider talent pipeline."
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {process.map((item) => (
            <div key={item.title} className="nidc-surface-muted p-6">
              <div className="flex items-start justify-between gap-4">
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <h2 className="mt-6 text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <CTABlock
        title="Ready to Enter the System?"
        description="Create your account and begin your application for the first NIDC cohort."
        primaryActionLabel="Start Your Application"
        primaryActionHref="/signup"
        secondaryActionLabel="Learn How It Works"
        secondaryActionHref="/how-it-works"
      />
    </div>
  );
}
