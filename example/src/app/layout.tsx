import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";
import { NavigationGuardsProvider } from "@yaredfall/next-navigation-guards";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <NavigationGuardsProvider>
                    <div className="flex gap-4">
                        {["page1", "page2", "page3", "demo"].map((l) => (
                            <Link key={l} href={"/" + l}>
                                to {l}
                            </Link>
                        ))}
                    </div>
                    {children}
                </NavigationGuardsProvider>
            </body>
        </html>
    );
}
