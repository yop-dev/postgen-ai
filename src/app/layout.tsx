import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import "./globals.css";

export const metadata: Metadata = {
    title: "PostGen AI — Preview Your LinkedIn Post Before Publishing",
    description: "Generate professional LinkedIn posts with AI. Create captions, images, and preview exactly how your post will look.",
    openGraph: {
        title: "PostGen AI",
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
