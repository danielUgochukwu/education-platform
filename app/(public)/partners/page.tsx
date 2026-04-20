import Link from "next/link";
import { ArrowRight, Briefcase, Building2, GraduationCap, Handshake, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABlock } from "@/components/sections/cta-block";

const ecosystemLayers = [
  {
    title: "Universities and Training Institutions",
    description: "Supporting development pathways aligned with system priorities.",
    icon: GraduationCap,
  },
  {
    title: "Private Sector Organizations",
    description: "Providing exposure, experience, and real-world application environments.",
    icon: Briefcase,
  },
  {
    title: "Industry and Sector Bodies",
    description: "Ensuring alignment with real needs across critical sectors.",
    icon: Landmark,
  },
  {
    title: "Funding and Capital Partners",
    description: "Supporting the development and sustainability of the system.",
    icon: Handshake,
  },
];

const partnershipLayers = [
  {
    title: "Development Layer",
    description: "Supporting education, training, and skill development.",
  },
  {
    title: "Application Layer",
    description: "Providing environments where talent can apply what they learn.",
  },
  {
    title: "Alignment Layer",
    description: "Ensuring that development matches real sector needs.",
  },
  {
    title: "Support Layer",
    description: "Enabling scale through funding and strategic support.",
  },
];

const reasonsToPartner = [
  "Access to a structured and developing talent pipeline",
  "Alignment with long-term capacity building efforts",
  "Opportunity to contribute to measurable and sustained impact",
  "Participation in a system designed for growth and continuity",
];

export default function PartnersPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="border-b nidc-hero-backdrop">
        <div className="container mx-auto px-4 py-18 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5 max-w-3xl">
              <p className="nidc-eyebrow">
                <span className="h-px w-8 bg-primary/70" />
                Partner Page
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Build capacity. Not just programs.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                NIDC is designed as a structured system built to develop and deploy talent into areas that drive real-world impact.
              </p>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                This system does not operate in isolation. It grows through collaboration with institutions and organizations that understand the importance of building long-term capacity.
              </p>
            </div>

            <div className="nidc-surface p-6">
              <p className="text-sm leading-7 text-muted-foreground">
                Partnership within NIDC is about strengthening specific parts of the system, from development and application to alignment and scale.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button asChild className="h-11">
                  <Link href="/contact">
                    Partner With NIDC
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link href="/governance">View Governance</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper
        className="border-b bg-background"
        title="Collaboration & Alignment"
        description="At the current stage, NIDC operates through a combination of direct collaboration and strategic alignment."
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="nidc-surface p-6 md:p-8">
            <p className="text-base leading-8 text-muted-foreground">
              Participants are supported to pursue development pathways through universities and training institutions that align with the system&apos;s focus areas.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              They are not restricted to a fixed set of institutions, but are guided toward pathways that support their growth and contribution.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              As the system develops, formal institutional partnerships will be established to strengthen coordination and expand access.
            </p>
          </div>
          <div className="nidc-surface-muted p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Operating Principle
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The aim is not to constrain participants to a narrow set of options, but to guide them toward pathways that fit the system and strengthen their long-term contribution.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="border-b bg-muted/30"
        title="Ecosystem Partners & Alignment"
        description="We engage with organizations across different layers of the system."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {ecosystemLayers.map((item) => (
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
        className="border-b bg-background"
        title="How Partnership Works"
        description="Partnership within NIDC is structured around contribution to different parts of the system."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {partnershipLayers.map((item) => (
            <div key={item.title} className="nidc-surface-muted p-5">
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="bg-muted/30"
        title="Why Partner"
        description="This is not about running isolated programs. It is about building a system that continuously develops, supports, and deploys talent where it matters."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {reasonsToPartner.map((item) => (
            <div key={item} className="nidc-surface p-5">
              <Building2 className="h-5 w-5 text-primary mb-4" />
              <p className="text-base font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <CTABlock
        title="Partner With NIDC"
        description="If your institution is serious about helping build long-term human capacity, there is a role for you in this system."
        primaryActionLabel="Partner With NIDC"
        primaryActionHref="/contact"
        secondaryActionLabel="Learn How It Works"
        secondaryActionHref="/how-it-works"
      />
    </div>
  );
}
