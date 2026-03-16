import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CheckCircle2, Search, GraduationCap, Building2 } from "lucide-react";

export default function HowItWorksPage() {
    return (
        <div className="flex flex-col w-full">
            <section className="bg-primary/5 py-20 pb-12 border-b">
                <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">How the Initiative Works</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        A rigorous, transparent, and scalable pipeline designed to identify brilliance and transform it into national assets.
                    </p>
                </div>
            </section>

            <SectionWrapper className="bg-background">
                <div className="max-w-4xl mx-auto">
                    <div className="relative border-l-2 border-primary/20 pl-8 md:pl-12 space-y-16 py-8">
                        {[
                            {
                                step: "Phase 1: Identification",
                                title: "Nationwide Talent Search",
                                icon: Search,
                                desc: "Rigorous competency and aptitude assessments conducted simultaneously across all 36 states and the FCT. The assessment is purely meritocratic and specifically designed to mitigate socio-economic biases."
                            },
                            {
                                step: "Phase 2: Selection",
                                title: "Verification & Onboarding",
                                icon: CheckCircle2,
                                desc: "Top performers undergo comprehensive ethical background and academic verification before formal induction into the scholar cohort. Baseline metrics are recorded for future impact assessment."
                            },
                            {
                                step: "Phase 3: Incubation",
                                title: "Education & Leadership",
                                icon: GraduationCap,
                                desc: "Scholars receive unrestricted funding for tuition and stipends while placed in tier-1 institutions. They strictly adhere to continuous academic requirements and participate in mandatory leadership/public policy bootcamps."
                            },
                            {
                                step: "Phase 4: Deployment",
                                title: "National Integration",
                                icon: Building2,
                                desc: "Upon graduation with honors, scholars are structurally funneled into critical national sectors (Tech, Healthcare, Governance) to drive immediate, measurable high-level impact."
                            }
                        ].map((item, i) => (
                            <div key={i} className="relative">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[41px] md:-left-[57px] top-1">
                                    <div className="h-5 w-5 rounded-full bg-primary ring-4 ring-background flex items-center justify-center">
                                        <div className="h-2 w-2 rounded-full bg-background"></div>
                                    </div>
                                </div>

                                <span className="text-sm font-bold tracking-wider text-primary uppercase">{item.step}</span>
                                <h3 className="text-3xl font-bold mt-2 mb-4 flex items-center">
                                    <item.icon className="h-7 w-7 mr-3 text-muted-foreground" />
                                    {item.title}
                                </h3>
                                <p className="text-xl text-muted-foreground leading-relaxed bg-muted/20 p-6 rounded-xl border">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper title="Funding Mechanism" className="bg-muted/10 border-t" description="Sustained via institutional endowments and transparent public-private partnerships.">
                <div className="grid md:grid-cols-2 gap-12 mt-8 items-center">
                    <div>
                        <ul className="space-y-6">
                            {[
                                "100% of donor funding goes directly to scholar tuition and stipends.",
                                "Administrative overhead is independently covered by founding endowments.",
                                "A live dashboard tracks the utilization of every Naira deployed.",
                                "Annual audits conducted by tier-1 global accounting firms."
                            ].map((text, i) => (
                                <li key={i} className="flex">
                                    <CheckCircle2 className="h-6 w-6 text-primary mr-4 flex-shrink-0" />
                                    <span className="text-lg text-foreground">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-card border shadow-sm rounded-2xl p-8 space-y-6 text-center">
                        <div className="text-4xl font-extrabold text-foreground tracking-tight">Radical Transparency</div>
                        <p className="text-muted-foreground text-lg">
                            We believe that trust is earned through verifiable data. All our operations and funding mechanisms are built open-by-default for institutional partners and the public.
                        </p>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    );
}
