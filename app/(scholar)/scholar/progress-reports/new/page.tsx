import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitProgressReport } from "@/lib/supabase/actions";
import Link from "next/link";

export default function NewProgressReportPage() {
    return (
        <PageContainer
            title="Create Progress Report"
            description="Submit an update for your current active semester or cycle."
            action={
                <Button variant="outline" asChild>
                    <Link href="/scholar/progress-reports">Cancel</Link>
                </Button>
            }
        >
            <div className="max-w-2xl">
                <Card className="border-border/60">
                    <CardHeader>
                        <CardTitle>Report Details</CardTitle>
                        <CardDescription>
                            Please provide honest and comprehensive details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={submitProgressReport} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="period">Period Focus (e.g. Q3 2026 Focus)</Label>
                                <Input id="period" name="period" required placeholder="Q1 2026 cycle" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="summary">Overall Academic & Extracurricular Summary</Label>
                                <Textarea
                                    id="summary"
                                    name="summary"
                                    required
                                    placeholder="Describe your progress, achievements, or blockers here..."
                                    className="min-h-[120px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priorities">Key Priorities (Comma separated)</Label>
                                <Input id="priorities" name="priorities" placeholder="Finalize thesis core, Complete internship prep, ..." />
                            </div>

                            <Button type="submit" className="w-full sm:w-auto">Submit Report</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    );
}
