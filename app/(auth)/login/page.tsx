import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center gap-2 mb-6">
                    <div className="h-9 w-9 rounded bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xl">N</span>
                    </div>
                    <span className="font-bold text-lg">National Talent Initiative</span>
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">Applicant Sign In</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Access your application dashboard
                </p>
            </div>

            <Card className="border-border/60 shadow-sm">
                <CardContent className="p-6 space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="pl-9"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-9 pr-9"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                                aria-label="Toggle password visibility"
                            >
                                <Eye className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <Link href="/portal/dashboard">
                        <Button className="w-full h-10 font-semibold mt-2">
                            Sign In to Portal <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>

                    <Separator className="my-2" />

                    <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-lg text-xs text-muted-foreground">
                        <Shield className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                        <p>
                            This portal is secured with end-to-end encryption. Never share your password with anyone, including NTDI staff.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary font-semibold hover:underline">
                    Create Account
                </Link>
            </p>

            <p className="text-center text-xs text-muted-foreground mt-4">
                By signing in, you agree to the{" "}
                <Link href="/terms" className="hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
            </p>
        </div>
    );
}
