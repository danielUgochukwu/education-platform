import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABlock } from "@/components/sections/cta-block";

const governanceStructure = [
  {
    title: "Directors",
    description: "Responsible for oversight, accountability, and strategic direction.",
    icon: Scale,
  },
  {
    title: "Core Team",
    description: "Handles operations, coordination, and deployment across the system.",
    icon: Briefcase,
  },
  {
    title: "Advisors",
    description: "Provide strategic guidance aligned with long-term development goals.",
    icon: Users,
  },
];

const fundingSources = [
  {
    title: "Individual Support",
    description: "Contributions from individuals who believe in building Nigeria&apos;s future capacity.",
    icon: Users,
  },
  {
    title: "Institutional Partnerships",
    description: "Grants and funding from organizations aligned with long-term development.",
    icon: Building2,
  },
  {
    title: "Operational Revenue",
    description: "Income generated through projects and activities within NIDC hubs, including energy, manufacturing, and digital infrastructure.",
    icon: Landmark,
  },
];

const allocationFramework = [
  {
    title: "Programs",
    range: "40-50%",
    description: "Talent development, training, and capacity-building initiatives.",
  },
  {
    title: "Infrastructure",
    range: "20-30%",
    description: "Development of hubs, equipment, and project environments.",
  },
  {
    title: "Operations",
    range: "20-30%",
    description: "Organizational management, systems, and administrative support.",
  },
  {
    title: "Reserves",
    range: "5-10%",
    description: "Stability and long-term sustainability.",
  },
];

const deploymentAreas = [
  "Talent training and development",
  "Industrial and energy pilot projects",
  "Infrastructure development through NIDC hubs",
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
                Governance & Funding
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Built for accountability, continuity, and long-term deployment
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                The NIDC Foundation operates as a structured system for receiving, allocating, and deploying capital into national development.
              </p>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Its governance and funding model are designed to support transparency, sustainability, and long-term impact.
              </p>
            </div>

            <div className="nidc-surface p-6">
              <p className="text-sm leading-7 text-muted-foreground">
                Governance matters because capital needs clear oversight, defined allocation rules, and accountable deployment into systems that can endure.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild className="h-11">
                  <Link href="/donate">
                    Support the System
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
              <item.icon className="mb-4 h-5 w-5 text-primary" />
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
        title="How the System is Funded"
        description="The NIDC Foundation operates as a structured system for receiving capital into national development."
      >
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="nidc-surface p-6 md:p-8">
            <p className="text-base leading-8 text-muted-foreground">
              Our funding model is designed to ensure transparency, sustainability, and long-term impact.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {fundingSources.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border/60 bg-background p-5">
                  <item.icon className="mb-4 h-5 w-5 text-primary" />
                  <h2 className="text-base font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="nidc-surface-muted p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Funding Principle
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              This is not a funding cycle. It is a system designed to build and sustain national capacity.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-background"
        title="Structured Allocation"
        description="All funds received are allocated through a defined internal structure to ensure balance and effectiveness."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {allocationFramework.map((item) => (
            <div key={item.title} className="nidc-surface p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                {item.range}
              </p>
              <h2 className="mt-3 text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-muted/30"
        title="Deployment"
        description="Funds are deployed into high-impact areas aligned with national development priorities."
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="nidc-surface p-6 md:p-8">
            <div className="space-y-4">
              {deploymentAreas.map((item) => (
                <div key={item} className="rounded-2xl border border-border/60 bg-background px-5 py-4">
                  <p className="text-base font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="nidc-surface-muted p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Sustainability Model
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Unlike traditional models, the NIDC system is designed for continuity. Projects within our hubs are structured to generate value and, where applicable, revenue that is reintegrated into the system.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              This enables long-term operation beyond donations alone.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="bg-background"
        title="Accountability"
        description="The Foundation is committed to responsible financial management and transparent governance."
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="nidc-surface p-6 md:p-8">
            <p className="text-base leading-8 text-muted-foreground">
              We maintain structured records of all financial activities and operate under a governance framework that ensures funds are used solely to advance our mission.
            </p>
          </div>
          <div className="nidc-surface-muted p-6 md:p-8">
            <ShieldCheck className="mb-4 h-5 w-5 text-primary" />
            <p className="text-base leading-8 text-muted-foreground">
              The Foundation is registered as a Company Limited by Guarantee, supporting institutional trust, continuity, and accountability over time.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <CTABlock
        title="Support a System Built for Accountability"
        description="Whether you want to support, partner, or help strengthen long-term capacity, the structure is designed to turn capital into sustained national development."
        primaryActionLabel="Support the System"
        primaryActionHref="/donate"
        secondaryActionLabel="Partner With NIDC"
        secondaryActionHref="/partners"
      />
    </div>
  );
}
