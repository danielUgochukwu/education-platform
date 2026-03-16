import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-xl">N</span>
                            </div>
                            <span className="font-bold">National Talent<br />Initiative</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Empowering the next generation of Nigerian leaders through accessible education.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
                            <li><Link href="/programs" className="hover:text-foreground">Programs</Link></li>
                            <li><Link href="/transparency" className="hover:text-foreground">Transparency</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Portals</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/apply" className="hover:text-foreground">Applicant Portal</Link></li>
                            <li><Link href="/login" className="hover:text-foreground">Scholar Portal</Link></li>
                            <li><Link href="/login" className="hover:text-foreground">Donor Dashboard</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} National Talent Development Initiative. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
