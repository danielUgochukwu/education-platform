import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Handshake, Target, Shield, BookOpen } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex flex-col w-full">
            <section className="bg-primary/5 py-20 pb-12 border-b">
                <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">About the Initiative</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        A sovereign commitment to building the talent infrastructure required for sustainable national development.
                    </p>
                </div>
            </section>

            <SectionWrapper title="Our Vision & Mission" className="bg-background">
                <div className="grid md:grid-cols-2 gap-12 mt-8">
                    <Card className="bg-muted/30 border-none shadow-none">
                        <CardContent className="p-8 space-y-4">
                            <Target className="h-10 w-10 text-primary mb-4" />
                            <h3 className="text-2xl font-bold">The Vision</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                To establish Nigeria as the premier hub for exceptional talent in Africa by 2035, driven by a new generation of highly skilled, ethically grounded leaders.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-muted/30 border-none shadow-none">
                        <CardContent className="p-8 space-y-4">
                            <Shield className="h-10 w-10 text-primary mb-4" />
                            <h3 className="text-2xl font-bold">The Mission</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                To systematically identify and nurture brilliance across all socio-economic strata, providing full institutional backing, world-class education, and strategic career deployment.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </SectionWrapper>

            <SectionWrapper title="Core Values" className="bg-muted/10 border-t" description="The principles governing every aspect of the initiative.">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {[
                        { title: "Meritocracy", desc: "Selection and advancement are determined solely by demonstrated excellence and potential, completely insulated from bias.", icon: Target },
                        { title: "Transparency", desc: "Absolute clarity in how funds are allocated, how scholars are selected, and how impact is measured.", icon: Shield },
                        { title: "National Service", desc: "Instilling a profound sense of duty to apply acquired skills toward solving critical national challenges.", icon: Handshake },
                        { title: "Excellence", desc: "Maintaining global standards in academic performance, leadership development, and operational execution.", icon: TrendingUp },
                        { title: "Inclusivity", desc: "Actively ensuring opportunities reach talent in all 36 states and the FCT, bridging regional divides.", icon: Users },
                        { title: "Continuous Growth", desc: "Fostering an environment of lifelong learning, adaptability, and intellectual curiosity.", icon: BookOpen }
                    ].map((value, i) => (
                        <div key={i} className="p-6 border bg-background rounded-xl">
                            <value.icon className="h-8 w-8 text-primary/80 mb-4" />
                            <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                            <p className="text-muted-foreground">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper title="Leadership & Governance" className="bg-background border-t">
                <p className="text-lg text-muted-foreground max-w-3xl mb-12">
                    The initiative is governed by an independent board of distinguished academics, industry leaders, and unblemished public servants.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="overflow-hidden border-border/50">
                            <div className="aspect-square bg-muted/60 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Users className="h-12 w-12 text-muted-foreground/30" />
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <h4 className="font-bold text-lg">Board Member {i}</h4>
                                <p className="text-sm font-medium text-primary mb-3">Distinguished Role</p>
                                <p className="text-sm text-muted-foreground">Expert in institutional governance, talent development, and strategic national policy.</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}
