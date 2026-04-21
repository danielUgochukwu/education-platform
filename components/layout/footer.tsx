import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow-sm shadow-primary/20">
                <span className="text-primary-foreground font-bold text-lg">N</span>
              </div>
              <div className="leading-none">
                <span className="block font-bold tracking-tight">NIDC</span>
                <span className="block text-[10px] uppercase tracking-[0.24em] text-muted-foreground mt-1">
                  System Builders
                </span>
              </div>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              A long-term system for identifying, developing, and deploying people committed to building real systems across engineering, technology, and infrastructure.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              <li><Link href="/about" className="hover:text-foreground">Why This Exists</Link></li>
              <li><Link href="/how-it-works" className="hover:text-foreground">How It Works</Link></li>
              <li><Link href="/talent-pipeline" className="hover:text-foreground">Talent Pipeline</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Engage</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/apply" className="hover:text-foreground">Join the First Cohort</Link></li>
              <li><Link href="/partners" className="hover:text-foreground">Partner With NIDC</Link></li>
              <li><Link href="/donate" className="hover:text-foreground">Support the System</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Structure</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/governance" className="hover:text-foreground">Governance</Link></li>
              <li><Link href="/login" className="hover:text-foreground">Portal Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-sm text-muted-foreground flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} NIDC. All rights reserved.</p>
          <p>Built for transparency, accountability, and long-term impact.</p>
        </div>
      </div>
    </footer>
  );
}
