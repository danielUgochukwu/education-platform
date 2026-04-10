import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Briefcase, Building2, MapPin, DollarSign, Filter, Search } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";

export default async function ScholarJobsPage() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch the jobs from job_opportunities
    const { data: jobs } = await supabase
        .from("job_opportunities")
        .select("*")
        .eq("status", "active")
        .order("posted_date", { ascending: false });

    return (
        <PageContainer
            title="Opportunities Board"
            description="Discover internships, graduate roles, and placements curated for OKIA scholars."
            action={
                <Button>
                    <Briefcase className="mr-2 h-4 w-4" />
                    My Applications
                </Button>
            }
        >
            <div className="space-y-6">
                <Card className="border-border/60 bg-[linear-gradient(135deg,rgba(90,200,120,0.10),rgba(255,255,255,0.96)_55%,rgba(238,250,242,0.9))]">
                    <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="w-full md:max-w-md relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search job titles or companies..." className="pl-9 h-11" />
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <Button variant="outline" className="w-full md:w-auto">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter Roles
                                </Button>
                                <Button className="w-full md:w-auto">
                                    Update Job Alert Preferences
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4 flex-wrap">
                            <Badge variant="secondary" className="bg-background">Remote</Badge>
                            <Badge variant="secondary" className="bg-background">Software Engineering</Badge>
                            <Badge variant="secondary" className="bg-background">Internship</Badge>
                            <Badge variant="secondary" className="bg-background">Lagos</Badge>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6">
                    {jobs?.map((job: any) => (
                        <Card key={job.id} className="border-border/60 hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="shrink-0">
                                        <Avatar className="h-16 w-16 border rounded-xl shadow-sm bg-background">
                                            <AvatarFallback className="bg-muted text-lg font-bold rounded-xl text-primary">
                                                {job.company?.slice(0, 2).toUpperCase() || "O"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-xl font-semibold tracking-tight">{job.title}</h3>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                                                        <Building2 className="h-4 w-4" />
                                                        {job.company}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="h-4 w-4" />
                                                        {job.location}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Badge variant="outline" className="px-1.5 py-0 shadow-sm">{job.type}</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start sm:items-end gap-2">
                                                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">
                                                    Hiring Fast
                                                </Badge>
                                                <div className="text-sm font-semibold">{job.salary_range || "Competitive"}</div>
                                                <div className="text-xs text-muted-foreground pt-1">
                                                    Posted {new Date(job.posted_date || job.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                                            {job.description || "Join an exciting team working on transformative projects. We are currently recruiting talented software engineering interns to support our core platform teams."}
                                        </p>

                                        <div className="flex items-center justify-between gap-4 pt-2">
                                            <div className="flex flex-wrap gap-2">
                                                {job.requirements?.slice(0, 3).map((req: string) => (
                                                    <Badge key={req} variant="secondary" className="bg-muted/50 font-normal">
                                                        {req}
                                                    </Badge>
                                                ))}
                                                {job.requirements?.length > 3 && (
                                                    <span className="text-xs text-muted-foreground pt-1">+{job.requirements.length - 3} more</span>
                                                )}
                                            </div>
                                            <div>
                                                <Button size="sm">Quick Apply</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {jobs?.length === 0 && (
                        <div className="p-8 text-center border-2 border-dashed rounded-xl">
                            <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-30" />
                            <h3 className="text-lg font-semibold">No Roles Found</h3>
                            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                                There are currently no active job opportunities posted that match your profile. Update your preferences to be notified of new roles.
                            </p>
                            <Button variant="outline" className="mt-4">Update Profile</Button>
                        </div>
                    )}
                </div>
            </div>
        </PageContainer>
    );
}
