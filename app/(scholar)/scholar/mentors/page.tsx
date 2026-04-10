import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Filter } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ScholarMentorsPage() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch mentors and current matches
    const [{ data: mentors }, { data: activeMatches }] = await Promise.all([
        supabase.from("mentors").select("*").order("name"),
        supabase.from("mentor_matches").select("*, mentors(name)").eq("scholar_id", user.id).eq("status", "active")
    ]);

    const activeMentor = activeMatches && activeMatches.length > 0 ? activeMatches[0] : null;

    return (
        <PageContainer
            title="Mentorship Network"
            description="Connect with industry leaders and track your active mentorship engagements."
            action={<Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter Mentors</Button>}
        >
            <div className="space-y-6">
                {activeMentor && (
                    <Card className="border-border/60 bg-[linear-gradient(135deg,rgba(90,200,120,0.10),rgba(255,255,255,0.96)_55%,rgba(238,250,242,0.9))]">
                        <CardHeader>
                            <CardTitle className="text-xl">Your Active Mentor</CardTitle>
                            <CardDescription>You are currently matched and engaged in an active mentorship cycle.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <Avatar className="h-16 w-16 border bg-background text-lg font-semibold">
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {activeMentor.mentors?.name?.split(" ").map((n: string) => n[0]).join("") || "M"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-xl font-semibold">{activeMentor.mentors?.name}</h3>
                                        <p className="text-muted-foreground">{activeMentor.theme || "General Mentorship"}</p>
                                    </div>
                                </div>
                                <Button>Schedule Check-in</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Available Mentors</h2>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {mentors?.map((mentor: any) => (
                            <Card key={mentor.id} className="border-border/60 flex flex-col items-start p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-full flex items-center justify-between">
                                    <Avatar className="h-14 w-14 border shadow-sm">
                                        <AvatarFallback className="bg-muted font-medium text-muted-foreground">
                                            {mentor.name?.split(" ").map((n: string) => n[0]).join("") || "M"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Badge variant="outline" className="bg-muted/50">{mentor.capacity} capacity</Badge>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold leading-tight">{mentor.name}</h3>
                                    <p className="text-sm font-medium text-primary line-clamp-1">{mentor.role} @ {mentor.company}</p>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {mentor.bio || "An experienced professional ready to guide incoming scholars."}
                                </p>

                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {mentor.expertise?.slice(0, 3).map((exp: string) => (
                                        <Badge key={exp} variant="secondary" className="text-[10px] uppercase font-semibold">
                                            {exp}
                                        </Badge>
                                    ))}
                                    {mentor.expertise?.length > 3 && (
                                        <Badge variant="secondary" className="text-[10px] uppercase font-semibold">+{mentor.expertise.length - 3}</Badge>
                                    )}
                                </div>
                                <div className="mt-auto pt-4 w-full">
                                    <Button variant="outline" className="w-full">Request Match</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
