import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { mockNews } from "@/mock-data";
import Link from "next/link";

const categoryColorMap: Record<string, string> = {
    "Announcement": "bg-primary/10 text-primary border-primary/20",
    "Scholar Story": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400",
    "Partnerships": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400",
    "Report": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400",
    "Programs": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
    "Achievement": "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400",
};

export default function NewsPage() {
    const featured = mockNews[0];
    const rest = mockNews.slice(1);

    return (
        <div className="flex flex-col w-full">
            {/* Hero */}
            <section className="bg-primary/5 py-20 pb-12 border-b">
                <div className="container mx-auto px-4 max-w-5xl space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">News & Insights</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                        Updates, scholar stories, partnership announcements, and annual reports from the National Talent Development Initiative.
                    </p>
                    {/* Search */}
                    <div className="relative max-w-lg">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search articles..." className="pl-9 h-11 bg-background" />
                    </div>
                </div>
            </section>

            {/* Featured Article */}
            <SectionWrapper className="bg-background" title="Featured">
                <Card className="mt-8 border-border/50 overflow-hidden hover:border-primary/40 transition-colors">
                    <div className="grid md:grid-cols-2">
                        <div className="aspect-video md:aspect-auto bg-muted/80 relative flex items-center justify-center">
                            <div className="text-muted-foreground/20 text-8xl font-black">
                                {featured.category[0]}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <Badge className={`absolute top-4 left-4 ${categoryColorMap[featured.category] ?? ""}`} variant="outline">
                                {featured.category}
                            </Badge>
                        </div>
                        <div className="flex flex-col justify-between p-8 md:p-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{featured.date}</span>
                                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold leading-tight">{featured.title}</h2>
                                <p className="text-muted-foreground leading-relaxed">{featured.excerpt}</p>
                            </div>
                            <div className="mt-8">
                                <Button className="group">
                                    Read Full Article
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </SectionWrapper>

            {/* All Articles by Category */}
            <SectionWrapper title="Latest Articles" className="bg-muted/20 border-t">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mt-4 mb-8">
                    {["All", ...Array.from(new Set(mockNews.map(n => n.category)))].map((cat, i) => (
                        <Button
                            key={i}
                            variant={i === 0 ? "default" : "secondary"}
                            size="sm"
                            className="rounded-full text-xs h-7"
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((article) => (
                        <Card key={article.id} className="flex flex-col border-border/50 hover:border-primary/40 transition-colors overflow-hidden">
                            <div className="aspect-video bg-muted/60 relative flex items-center justify-center">
                                <div className="text-muted-foreground/20 text-7xl font-black">{article.category[0]}</div>
                                <Badge
                                    className={`absolute top-3 left-3 text-xs ${categoryColorMap[article.category] ?? ""}`}
                                    variant="outline"
                                >
                                    {article.category}
                                </Badge>
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{article.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                                </div>
                                <CardTitle className="text-base leading-snug line-clamp-2">{article.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{article.excerpt}</p>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button variant="ghost" className="p-0 h-auto text-primary text-sm font-medium hover:bg-transparent">
                                    Read More <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Button variant="outline" size="lg">Load More Articles</Button>
                </div>
            </SectionWrapper>

            {/* Subscribe CTA */}
            <section className="py-20 bg-primary/5 border-t">
                <div className="container mx-auto px-4 max-w-2xl text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Stay Informed</h2>
                    <p className="text-muted-foreground text-lg">
                        Receive NTDI updates, scholar spotlights, and annual reports directly to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <Input placeholder="Enter your email address" type="email" className="h-11" />
                        <Button className="h-11 shrink-0">Subscribe</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
