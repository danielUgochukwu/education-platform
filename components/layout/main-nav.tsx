import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MainNav() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-xl">N</span>
                        </div>
                        <span className="hidden font-bold sm:inline-block">
                            National Talent Initiative
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
                        <Link href="/apply" className="transition-colors hover:text-foreground/80 text-foreground/60 font-semibold text-primary">Apply</Link>
                        <Link href="/donate" className="transition-colors hover:text-foreground/80 text-foreground/60">Donate</Link>
                        <Link href="/partner-with-us" className="transition-colors hover:text-foreground/80 text-foreground/60">Partner</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-sm font-medium">Log In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="font-semibold">Get Started</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
