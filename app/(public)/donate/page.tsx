import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ShieldCheck,
    TrendingUp,
    Users,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

export default function DonatePage() {
    return (
        <div className="flex flex-col w-full">
            {/* Hero */}
            <section className="bg-[#fdfcfb] py-20 lg:py-28 border-b">
                <div className="container mx-auto px-4 max-w-4xl space-y-8">
                    <div className="space-y-4">
                        <Badge variant="outline" className="rounded-full px-4 py-1 text-primary border-primary/20 bg-primary/5">
                            For Philanthropists & Sponsors
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                            Invest in Nigeria&apos;s <br />
                            <span className="text-primary">Human Capital</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                            Join our elite circle of donors. We provide 100% transparency, data-driven impact tracking, and direct connection to scholars transforming the nation.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href="/support?type=donor">
                            <Button size="lg" className="h-14 px-10 text-lg font-bold shadow-lg shadow-primary/20">
                                Continue as Donor <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/impact">
                            <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-semibold">
                                View Impact Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Donate */}
            <SectionWrapper title="Why Sponsor via NTDI?" description="We ensure every Naira is accounted for and every scholar is supported globally.">
                <div className="grid md:grid-cols-3 gap-8 mt-10">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Full Transparency",
                            desc: "Donors receive personal dashboards where you can see exactly where your funds are allocated in real-time."
                        },
                        {
                            icon: TrendingUp,
                            title: "Direct Impact",
                            desc: "Sponsor specific disciplines or merit-tiers. Watch as your investment translates into national sectoral growth."
                        },
                        {
                            icon: Users,
                            title: "Verified Talent",
                            desc: "Scholars undergo the most rigorous selection process in Nigeria. You are betting on the absolute brightest minds."
                        },
                    ].map((feature, i) => (
                        <div key={i} className="space-y-4 p-6 rounded-2xl border bg-muted/5">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="font-bold text-xl">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* Donation Tiers */}
            <SectionWrapper title="Scholarship Tiers" className="bg-muted/30 border-t">
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <Card className="border-border/60">
                        <CardHeader>
                            <CardTitle>Direct Individual Sponsorship</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">Fund a specific scholar through their entire 4-5 year academic journey. Includes mentor rights and annual progress meetings.</p>
                            <ul className="space-y-2">
                                {["Tuition & Fees", "Living Stipend", "Laptop & Materials", "Research Grant"].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span>Full Coverage for {item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card className="border-border/60">
                        <CardHeader>
                            <CardTitle>Sector Endowment Fund</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">Contribute to a pooled fund supporting specific focus areas like Bio-Medical Engineering or Data Science.</p>
                            <ul className="space-y-2">
                                {["Scaling Cohort Size", "Infrastructure Support", "National Research Lab", "Global Competitions"].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                        <span>Contribution to {item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </SectionWrapper>

            {/* Final CTA */}
            <section className="bg-primary text-primary-foreground py-20">
                <div className="container mx-auto px-4 text-center max-w-3xl space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to change a life?</h2>
                    <p className="text-xl text-primary-foreground/80">
                        Join 200+ individual and corporate donors building the future of Nigerian excellence.
                    </p>
                    <Link href="/support?type=donor">
                        <Button size="lg" variant="secondary" className="h-16 px-12 text-xl font-bold">
                            Create Donor Account <ArrowRight className="ml-2 h-6 w-6" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
