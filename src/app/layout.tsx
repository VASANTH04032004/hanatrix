import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/ui/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: '--font-fredoka',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Hanatrix | Eternal Play Power",
  description: "A magical 3D toy universe designed for emotional growth, creativity, and endless fun. Connect your soul to the future through magical companions.",
  keywords: ["toys", "3D world", "emotional growth", "creative play", "Hanatrix", "Zuzu", "Rudy"],
  authors: [{ name: "Hanatrix Team" }],
  openGraph: {
    title: "Hanatrix | 3D Magic Toy Universe",
    description: "Discover our magical collection of toys that inspires creativity and learning.",
    url: "https://hanatrix.com",
    siteName: "Hanatrix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hanatrix Magic Toy Universe",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanatrix | 3D Magic Toy Universe",
    description: "Connect your soul to the future through magical toy experiences.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fredoka.variable}`}>
      <body className="bg-magic-gradient min-h-screen text-dark-text antialiased font-sans">
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
