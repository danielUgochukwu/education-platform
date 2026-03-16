import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";

const contactDetails = [
    { icon: MapPin, label: "Head Office", value: "5 National Development Avenue, Central Business District, Abuja, FCT, Nigeria" },
    { icon: Mail, label: "General Enquiries", value: "info@ntdi.gov.ng" },
    { icon: Mail, label: "Applications Support", value: "apply@ntdi.gov.ng" },
    { icon: Mail, label: "Partnerships", value: "partners@ntdi.gov.ng" },
    { icon: Phone, label: "Phone (Abuja)", value: "+234 (0) 9 xxx xxxx" },
    { icon: Clock, label: "Office Hours", value: "Monday – Friday: 8:00 AM – 5:00 PM WAT" },
];

export default function ContactPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Hero */}
            <section className="bg-primary/5 py-20 pb-12 border-b">
                <div className="container mx-auto px-4 max-w-4xl space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact Us</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                        For general enquiries, partnership proposals, press requests, or programme-specific questions — our team responds within two working days.
                    </p>
                </div>
            </section>

            {/* Contact Info + Form */}
            <SectionWrapper className="bg-background">
                <div className="grid md:grid-cols-5 gap-12 mt-8">
                    {/* Left: Contact Details */}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight">Get In Touch</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Our Communications & Partnerships team handles all external enquiries. Please direct your message to the appropriate department for a faster response.
                        </p>
                        <div className="space-y-5 mt-6">
                            {contactDetails.map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <item.icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">{item.label}</p>
                                        <p className="text-sm font-medium">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="md:col-span-3">
                        <Card className="border-border/50 shadow-sm">
                            <CardContent className="pt-8 pb-8 px-6 md:px-8 space-y-5">
                                <h3 className="text-xl font-bold mb-2">Send a Message</h3>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First Name</Label>
                                        <Input id="first-name" placeholder="Chukwuemeka" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <Input id="last-name" placeholder="Okoro" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" placeholder="you@example.com" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="organisation">Organisation (if applicable)</Label>
                                    <Input id="organisation" placeholder="University, company, or government agency" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="enquiry-type">Enquiry Type</Label>
                                    <Select>
                                        <SelectTrigger id="enquiry-type">
                                            <SelectValue placeholder="Select an enquiry type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">General Enquiry</SelectItem>
                                            <SelectItem value="application">Application Support</SelectItem>
                                            <SelectItem value="partnership">Partnership Proposal</SelectItem>
                                            <SelectItem value="media">Media & Press</SelectItem>
                                            <SelectItem value="donor">Donor Enquiry</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Please describe your enquiry in detail..."
                                        className="min-h-[140px] resize-none"
                                    />
                                </div>

                                <Button className="w-full h-11 font-semibold" size="lg">
                                    Submit Message <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>

                                <p className="text-xs text-muted-foreground text-center">
                                    We respect your privacy. Your data will only be used to respond to your enquiry.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </SectionWrapper>

            {/* Office Locations */}
            <SectionWrapper title="Regional Offices" description="We maintain liaison offices across all six geo-political zones to support access and outreach." className="bg-muted/20 border-t">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                    {[
                        { zone: "South West", city: "Lagos", address: "Alausa, Ikeja, Lagos State" },
                        { zone: "North West", city: "Kano", address: "Government House Road, Kano" },
                        { zone: "South East", city: "Enugu", address: "Independence Layout, Enugu State" },
                        { zone: "North East", city: "Gombe", address: "Tudun Wada, Gombe State" },
                        { zone: "South South", city: "Port Harcourt", address: "GRA Phase 2, Rivers State" },
                        { zone: "North Central", city: "Abuja (HQ)", address: "5 National Development Avenue, FCT" },
                    ].map((office, i) => (
                        <Card key={i} className="border-border/50 hover:border-primary/40 transition-colors">
                            <CardContent className="pt-6">
                                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">{office.zone}</p>
                                <h4 className="font-bold text-lg mb-1">{office.city}</h4>
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                                    <span>{office.address}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
}
