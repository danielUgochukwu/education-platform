"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Banknote,
  Building2,
  Factory,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTABlock } from "@/components/sections/cta-block";
import { cn } from "@/lib/utils";

type SupportFrequency = "once" | "monthly";

const amountPresets: Record<SupportFrequency, number[]> = {
  once: [25000, 50000, 100000, 250000],
  monthly: [5000, 10000, 25000, 50000],
};

const allocationModel = [
  {
    id: "programs",
    title: "Programs",
    range: "40-50%",
    description: "Talent development, training, and capacity-building initiatives.",
    visualWidth: "w-[50%]",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    range: "20-30%",
    description: "Development of hubs, equipment, and project environments.",
    visualWidth: "w-[30%]",
  },
  {
    id: "operations",
    title: "Operations",
    range: "20-30%",
    description: "Organizational systems and administrative support.",
    visualWidth: "w-[30%]",
  },
  {
    id: "reserves",
    title: "Reserves",
    range: "5-10%",
    description: "Stability and long-term continuity.",
    visualWidth: "w-[10%]",
  },
];

const supportOutcomes = [
  {
    title: "Development of energy and manufacturing hubs",
    icon: Factory,
  },
  {
    title: "Training and reintegration of skilled talent",
    icon: Building2,
  },
  {
    title: "Execution of industrial and innovation projects",
    icon: Landmark,
  },
  {
    title: "Expansion of national capacity infrastructure",
    icon: ShieldCheck,
  },
];

const contributionChannels = [
  {
    title: "Bank Transfer",
    description: "You can support directly via bank transfer:",
    detail: "Account details will be provided upon full incorporation.",
    icon: Banknote,
  },
  {
    title: "Online Contribution",
    description: "Secure online payments will be available via our payment platform.",
    detail: "Coming soon.",
    icon: ShieldCheck,
  },
  {
    title: "Institutional Support",
    description: "For partnerships, grants, and structured funding:",
    detail: "partnerships@nidcfoundation.org",
    href: "mailto:partnerships@nidcfoundation.org",
    icon: Building2,
  },
];

const amountFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function formatAmount(amount: number) {
  return amountFormatter.format(amount);
}

export default function DonatePage() {
  const [frequency, setFrequency] = useState<SupportFrequency>("once");
  const [selectedAmount, setSelectedAmount] = useState<number>(amountPresets.once[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedFocusId, setSelectedFocusId] = useState<string>(allocationModel[0].id);

  const parsedCustomAmount = Number(customAmount);
  const activeAmount = customAmount.trim()
    ? Number.isFinite(parsedCustomAmount) && parsedCustomAmount > 0
      ? parsedCustomAmount
      : 0
    : selectedAmount;

  const selectedFocus = allocationModel.find((item) => item.id === selectedFocusId) ?? allocationModel[0];

  const handleFrequencyChange = (next: SupportFrequency) => {
    setFrequency(next);
    setSelectedAmount(amountPresets[next][1]);
    setCustomAmount("");
  };

  return (
    <div className="flex w-full flex-col">
      <section className="relative overflow-hidden border-b nidc-hero-backdrop">
        <div className="absolute inset-0 nidc-grid opacity-35" />
        <div className="container relative mx-auto px-4 py-18 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div className="max-w-3xl space-y-6">
              <p className="nidc-eyebrow">
                <span className="h-px w-8 bg-primary/70" />
                Support / Donate
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Support the System
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Your support enables the development of talent, infrastructure, and systems required for Nigeria&apos;s long-term industrial growth.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-11 rounded-xl px-6">
                  <Link href="#support-flow">
                    Support Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-xl px-6">
                  <Link href="/partners">Partner With Us</Link>
                </Button>
              </div>
            </div>

            <div id="support-flow" className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[calc(var(--radius)+0.75rem)] border border-border/70 bg-background shadow-xl">
                <div className="border-b border-border/70 px-6 py-5">
                  <div className="inline-flex rounded-full bg-muted p-1">
                    {(["once", "monthly"] as SupportFrequency[]).map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleFrequencyChange(item)}
                        className={cn(
                          "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                          frequency === item
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item === "once" ? "Once" : "Monthly"}
                      </button>
                    ))}
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                    Support NIDC
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Select an amount and area of focus, then continue to your preferred support method.
                  </p>
                </div>

                <div className="space-y-6 p-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                      Select an amount
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {amountPresets[frequency].map((amount) => (
                        <button
                          key={`${frequency}-${amount}`}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount("");
                          }}
                          className={cn(
                            "rounded-2xl border px-4 py-3 text-left transition-colors",
                            !customAmount && selectedAmount === amount
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border/70 bg-background hover:border-primary/40"
                          )}
                        >
                          <span className="block text-base font-semibold">{formatAmount(amount)}</span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {itemLabel(frequency)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="custom-amount" className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                      Other amount
                    </label>
                    <div className="relative mt-3">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        NGN
                      </span>
                      <Input
                        id="custom-amount"
                        type="number"
                        min={1000}
                        inputMode="numeric"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(event) => setCustomAmount(event.target.value)}
                        className="h-12 rounded-2xl border-border/70 bg-muted/30 pl-16 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                      Support focus
                    </p>
                    <div className="mt-3 space-y-2">
                      {allocationModel.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedFocusId(item.id)}
                          className={cn(
                            "flex w-full items-start justify-between gap-4 rounded-2xl border px-4 py-4 text-left transition-colors",
                            selectedFocusId === item.id
                              ? "border-primary bg-primary/10"
                              : "border-border/70 bg-background hover:border-primary/40"
                          )}
                        >
                          <div>
                            <p className="text-sm font-semibold">{item.title}</p>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                          </div>
                          <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/80">
                            {item.range}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[calc(var(--radius)+0.25rem)] bg-foreground p-5 text-background">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary/85">
                      {frequency === "monthly" ? "Monthly support" : "One-time support"}
                    </p>
                    <p className="mt-3 text-3xl font-semibold tracking-tight">
                      {activeAmount > 0 ? formatAmount(activeAmount) : "Enter an amount"}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-background/70">
                      {selectedFocus.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button asChild className="h-12 rounded-xl">
                      <Link href="#ways-to-contribute">
                        Support Now
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="h-12 rounded-xl">
                      <Link href="/partners">Partner With Us</Link>
                    </Button>
                  </div>

                  <p className="text-xs leading-6 text-muted-foreground">
                    Bank transfer is available now. Secure online payments are coming soon. For partnerships, grants, and structured funding, email{" "}
                    <Link href="mailto:partnerships@nidcfoundation.org" className="font-medium text-primary hover:text-primary/80">
                      partnerships@nidcfoundation.org
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="border-b bg-background" title="Why Support NIDC">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="nidc-surface p-6 md:p-8">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              This Is Not Charity. It Is Capacity Building.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              The NIDC Foundation is not designed as a short-term intervention.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              It is a structured system focused on developing and deploying high-impact talent into critical sectors such as energy, manufacturing, and digital infrastructure.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Your support contributes directly to building the human and physical systems required for national development.
            </p>
          </div>
          <div className="nidc-surface-muted p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Capacity Focus
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Support flows into a system built to strengthen talent, infrastructure, and long-term national development capacity.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="border-b bg-muted/30" title="How Your Support Is Used">
        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-4">
            <div className="nidc-surface p-6 md:p-8">
              <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
                A Structured Allocation Model
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                All contributions are allocated through a defined internal framework to ensure impact, efficiency, and sustainability.
              </p>
            </div>

            {allocationModel.map((item) => (
              <div key={item.id} className="nidc-surface p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {item.range}
                  </span>
                </div>
                <div className="mt-4 h-3 rounded-full bg-muted">
                  <div className={cn("h-full rounded-full bg-primary", item.visualWidth)} />
                </div>
              </div>
            ))}
          </div>

          <div className="nidc-surface-muted p-6 md:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              Breakdown
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Programs receive 40-50%, infrastructure 20-30%, operations 20-30%, and reserves 5-10%.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              The model is designed to balance immediate impact with organizational continuity and long-term sustainability.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="border-b bg-background" title="What Your Support Enables">
        <div className="space-y-6">
          <div className="nidc-surface p-6 md:p-8">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Where It Goes
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Your support is deployed into real systems and projects, including:
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {supportOutcomes.map((item) => (
              <div key={item.title} className="nidc-surface p-5">
                <item.icon className="mb-4 h-5 w-5 text-primary" />
                <p className="text-base font-semibold leading-7">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <section id="ways-to-contribute" className="border-b bg-muted/30 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <p className="nidc-eyebrow">
              <span className="h-px w-8 bg-primary/70" />
              How to Support
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Ways to Contribute
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {contributionChannels.map((item) => (
              <div key={item.title} className="nidc-surface p-6">
                <item.icon className="mb-4 h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
                {item.href ? (
                  <Link href={item.href} className="mt-4 inline-flex text-sm font-medium text-primary transition-colors hover:text-primary/80">
                    {item.detail}
                  </Link>
                ) : (
                  <p className="mt-4 text-sm font-medium text-foreground/80">{item.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-background" title="Transparency & Accountability">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="nidc-surface p-6 md:p-8">
            <h2 className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Built for Trust
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              The NIDC Foundation operates under a structured governance framework and is registered as a Company Limited by Guarantee.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              All funds are used solely to advance the objectives of the Foundation.
            </p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Financial activities are recorded and managed in alignment with institutional standards.
            </p>
          </div>
          <div className="nidc-surface-muted p-6 md:p-8">
            <ShieldCheck className="mb-4 h-5 w-5 text-primary" />
            <p className="text-base leading-8 text-muted-foreground">
              Responsible financial management and structured governance are central to how the Foundation operates and builds trust over time.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <CTABlock
        title="Be Part of the System"
        description="This is an opportunity to contribute to something larger than individual success. It is about building the systems that enable national progress."
        primaryActionLabel="Support NIDC"
        primaryActionHref="#support-flow"
        secondaryActionLabel="Become a Partner"
        secondaryActionHref="/partners"
      />
    </div>
  );
}

function itemLabel(frequency: SupportFrequency) {
  return frequency === "monthly" ? "Monthly support" : "One-time support";
}
