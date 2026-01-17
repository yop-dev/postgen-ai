import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import "./globals.css";

export const metadata: Metadata = {
    title: "InFrame — Preview Your LinkedIn Post Before Publishing",
    description: "Create stunning, high-converting LinkedIn posts in seconds with AI-powered captions and visuals.",
    keywords: ["LinkedIn", "Social Media", "AI", "Content Creation", "Marketing"],
    openGraph: {
        title: "InFrame",
        description: "See your LinkedIn post before you publish it",
    },
    icons: {
        icon: "/post-gen-logov2.jpg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className="antialiased font-sans">
                    {children}
                    <Toaster position="bottom-right" />
                </body>
            </html>
        </ClerkProvider>
    );
}
