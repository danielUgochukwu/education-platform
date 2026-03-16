import { ReactNode } from "react";
import { MainNav } from "@/components/layout/main-nav";
import { Footer } from "@/components/layout/footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <MainNav />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
            <Footer />
        </div>
    );
}
