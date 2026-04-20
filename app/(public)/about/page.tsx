import { ArrowRight, BookOpen, CheckCircle2, Compass, Route, Target } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABlock } from "@/components/sections/cta-block";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const missingPieces = ["Direction", "Access", "Consistent support"];

const outcomes = [
  "Learn effectively",
  "Apply what they learn",
  "Contribute to real systems",
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="border-b nidc-hero-backdrop">
        <div className="container mx-auto px-4 py-18 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-5 max-w-3xl">
              <p className="nidc-eyebrow">
                <span className="h-px w-8 bg-primary/70" />
                About NIDC
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Why This Exists
              </h1>
              <p className="text-xl leading-relaxed text-foreground/85">
                Nigeria is not short of capable people.
              </p>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                What is missing is structure, a system that helps individuals grow, become capable, and contribute to real-world systems.
              </p>
            </div>

            <div className="nidc-surface p-6">
              <p className="text-sm leading-7 text-muted-foreground">
                NIDC exists to move people from potential to real capability through continuous development, application, and contribution.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild className="h-11">
                  <Link href="/talent-pipeline">
                    Explore the Talent Pipeline
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
        title="The Problem"
        description="Many individuals have potential but lack the structure required for meaningful long-term growth."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {missingPieces.map((item) => (
            <div key={item} className="nidc-surface p-6">
              <Compass className="h-5 w-5 text-primary mb-4" />
              <h2 className="text-lg font-semibold">{item}</h2>
            </div>
          ))}
        </div>
        <div className="mt-6 nidc-surface-muted p-6">
          <p className="text-base leading-8 text-muted-foreground">
            As a result, growth is unstructured, and capability is never fully developed.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-muted/30"
        title="What This Is"
        description="NIDC is a structured system designed to move individuals from potential to real capability."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="nidc-surface p-6 md:p-8">
            <p className="text-base leading-8 text-muted-foreground">
              Not just through learning, but through continuous development, application, and contribution.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Route,
                title: "Structured pathway",
                body: "Growth is connected to clear expectations, progression, and contribution.",
              },
              {
                icon: Target,
                title: "Capability over activity",
                body: "The emphasis is on becoming effective, not merely participating.",
              },
            ].map((item) => (
              <div key={item.title} className="nidc-surface-muted p-5">
                <item.icon className="h-5 w-5 text-primary mb-3" />
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-background"
        title="How It Thinks"
        description="The focus is not just education. The focus is outcome."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {outcomes.map((item) => (
            <div key={item} className="nidc-surface p-5">
              <CheckCircle2 className="h-5 w-5 text-primary mb-4" />
              <p className="text-lg font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-muted/30"
        title="What Makes It Different"
        description="This is not built for mass participation."
      >
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="nidc-surface p-6 md:p-8">
            <p className="text-base leading-8 text-muted-foreground">
              It is designed for individuals who are willing to take responsibility for their growth and commit to a structured process.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: BookOpen,
                title: "Serious participants",
                body: "The system is meant for people ready to build with discipline over time.",
              },
              {
                icon: Target,
                title: "Long-term commitment",
                body: "Growth is measured through consistency, accountability, and contribution.",
              },
            ].map((item) => (
              <div key={item.title} className="nidc-surface-muted p-5">
                <item.icon className="h-5 w-5 text-primary mb-3" />
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="bg-background"
        title="Long-Term Vision"
        description="To build a system where individuals are continuously developed, connected, and positioned to contribute over time."
      >
        <div className="nidc-surface p-6 md:p-8">
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">
            The ambition is to create lasting structure, one that does not end with a single cohort or isolated program, but keeps building human capacity that can strengthen real systems over time.
          </p>
        </div>
      </SectionWrapper>

      <CTABlock
        title="See How the System Is Structured"
        description="Explore the pathway, expectations, and progression model behind the first NIDC cohort."
        primaryActionLabel="View the Talent Pipeline"
        primaryActionHref="/talent-pipeline"
        secondaryActionLabel="Join the First Cohort"
        secondaryActionHref="/apply"
      />
    </div>
  );
}
