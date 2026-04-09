import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Building2,
    Handshake,
    Globe,
    Zap,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

export default function PartnerWithUsPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Hero */}
            <section className="bg-muted/20 py-20 lg:py-28 border-b">
                <div className="container mx-auto px-4 max-w-4xl space-y-8">
                    <div className="space-y-4">
                        <Badge variant="outline" className="rounded-full px-4 py-1">
                            Institutional Collaboration
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                            Build the <span className="text-primary">Pipeline</span> <br />
                            Together
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                            We partner with elite academic institutions, government agencies, and Fortune 500 companies to create a seamless talent-to-impact pipeline.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href="/support?type=partner">
                            <Button size="lg" className="h-14 px-10 text-lg font-bold">
                                Continue as Partner <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/partners">
                            <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-semibold">
                                View Current Partners
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Partnership Types */}
            <SectionWrapper title="Partnership Modules" description="Tailored collaboration models designed for deep sectoral impact.">
                <div className="grid md:grid-cols-3 gap-6 mt-10">
                    {[
                        {
                            icon: Building2,
                            title: "Academic Partners",
                            desc: "Top-tier universities hosting scholars and providing specialized curriculum support."
                        },
                        {
                            icon: Handshake,
                            title: "Placement Partners",
                            desc: "Organizations providing verified internships and guaranteed full-time career pathways."
                        },
                        {
                            icon: Globe,
                            title: "Government Partners",
                            desc: "Ministries and agencies providing policy alignment and national infrastructure access."
                        },
                    ].map((p, i) => (
                        <Card key={i} className="border-border/60 hover:border-primary/30 transition-colors">
                            <CardHeader>
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                    <p.icon className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-lg">{p.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{p.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </SectionWrapper>

            {/* Benefits */}
            <SectionWrapper title="Why Partner?" className="bg-background border-t">
                <div className="grid md:grid-cols-2 gap-12 items-center mt-8">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">Strategic Value Add</h3>
                        <p className="text-muted-foreground font-medium">By joining the NTDI coalition, your institution gains measurable advantages in the national talent marketplace.</p>
                        <ul className="space-y-3">
                            {[
                                "First access to the nation's 1% brightest talent",
                                "Co-branding on national scholarship campaigns",
                                "R&D collaboration with scholarship focus areas",
                                "Participation in national policy advisory sessions",
                                "Corporate social responsibility (CSR) verification"
                            ].map((benefit) => (
                                <li key={benefit} className="flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-muted/50 rounded-2xl p-8 border border-dashed border-border flex flex-col items-center justify-center text-center space-y-4">
                        <Zap className="h-12 w-12 text-primary/40" />
                        <h4 className="font-bold text-xl">Rapid Integration</h4>
                        <p className="text-sm text-muted-foreground max-w-xs">Our partnership API and portal allow institutions to onboard and track collaborative efforts in under 48 hours.</p>
                    </div>
                </div>
            </SectionWrapper>

            {/* Final CTA */}
            <section className="bg-primary text-primary-foreground py-20">
                <div className="container mx-auto px-4 text-center max-w-3xl space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Begin Institutional Partnership</h2>
                    <p className="text-xl text-primary-foreground/80">
                        Ready to integrate with Nigeria&apos;s most rigorous talent engine?
                    </p>
                    <Link href="/support?type=partner">
                        <Button size="lg" variant="secondary" className="h-16 px-12 text-xl font-bold">
                            Create Partner Account <ArrowRight className="ml-2 h-6 w-6" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
