import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";


import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: "NIDC | Build Nigeria's Future",
    template: "%s | NIDC",
  },
  description:
    "A structured system for identifying, developing, and deploying individuals committed to building real systems across engineering, technology, and infrastructure.",
  openGraph: {
    title: "NIDC | Build Nigeria's Future",
    description: "A structured system for identifying, developing, and deploying individuals committed to building real systems across engineering, technology, and infrastructure.",
    url: "https://nidc.example.com",
    siteName: "NIDC",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIDC | Build Nigeria's Future",
    description: "Building real systems across engineering, technology, and infrastructure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <body className="font-sans antialiased">
           <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        
      </body>
    </html>
  );
}
