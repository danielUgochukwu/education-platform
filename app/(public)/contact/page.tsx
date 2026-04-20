import { ArrowRight, Building2, Mail, MessageSquare, Phone, Users } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const contactDetails = [
  { icon: Mail, label: "General Enquiries", value: "hello@nidc.org" },
  { icon: Mail, label: "First Cohort", value: "cohort@nidc.org" },
  { icon: Mail, label: "Partnerships", value: "partners@nidc.org" },
  { icon: Mail, label: "Support", value: "support@nidc.org" },
  { icon: Phone, label: "Phone", value: "+234 (0) 000 000 0000" },
];

const contactReasons = [
  {
    title: "First cohort questions",
    description: "Reach out if you need clarity about the current pilot cohort or the application process.",
    icon: Users,
  },
  {
    title: "Partnership conversations",
    description: "For institutions and organizations interested in supporting development, alignment, or deployment.",
    icon: Building2,
  },
  {
    title: "General enquiries",
    description: "For media, introductions, and broader questions about how the system is being built.",
    icon: MessageSquare,
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="border-b nidc-hero-backdrop">
        <div className="container mx-auto px-4 py-18 md:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5 max-w-3xl">
              <p className="nidc-eyebrow">
                <span className="h-px w-8 bg-primary/70" />
                Contact
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Start a conversation with NIDC
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                For general enquiries, partnership proposals, support conversations, or first cohort questions, reach out and we&apos;ll route you to the right place.
              </p>
            </div>

            <div className="nidc-surface p-6">
              <p className="text-sm leading-7 text-muted-foreground">
                We respond to serious enquiries and partnership conversations as quickly as possible, with a focus on clarity and follow-through.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper className="border-b bg-background">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="space-y-6 md:col-span-2">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Get in touch</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                If you are reaching out about the first cohort, a partnership, or support for the initiative, this is the best starting point.
              </p>
            </div>

            <div className="space-y-4 divide-y divide-border/50">
              {contactDetails.map((item, index) => (
                <div key={item.label} className={`flex gap-3 ${index > 0 ? "pt-4" : ""}`}>
                  <item.icon className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="nidc-surface overflow-hidden">
              <div className="border-b border-border/50 bg-muted/20 px-6 py-4">
                <h3 className="text-sm font-semibold">Send a message</h3>
              </div>
              <div className="space-y-4 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="first-name" className="text-xs">First Name</Label>
                    <Input id="first-name" placeholder="Ada" className="h-10 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="last-name" className="text-xs">Last Name</Label>
                    <Input id="last-name" placeholder="Okafor" className="h-10 text-sm" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="h-10 text-sm" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="organisation" className="text-xs">Organisation (if applicable)</Label>
                  <Input id="organisation" placeholder="Institution or company" className="h-10 text-sm" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="enquiry-type" className="text-xs">Enquiry Type</Label>
                  <Select>
                    <SelectTrigger id="enquiry-type" className="h-10 text-sm">
                      <SelectValue placeholder="Select an enquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Enquiry</SelectItem>
                      <SelectItem value="cohort">First Cohort</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="support">Support the Initiative</SelectItem>
                      <SelectItem value="media">Media or Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Share enough context for us to route your message well."
                    className="min-h-[140px] resize-none text-sm"
                  />
                </div>

                <Button className="w-full h-10 gap-2">
                  Submit Message
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        className="bg-muted/30"
        title="What You Can Reach Out About"
        description="The system grows through serious conversations around development, collaboration, and long-term support."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {contactReasons.map((item) => (
            <div key={item.title} className="nidc-surface-muted p-5">
              <item.icon className="h-5 w-5 text-primary mb-4" />
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
