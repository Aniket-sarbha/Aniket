import type { Metadata } from "next";
import { Anton, Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/smooth-scroll";
import { Preloader } from "@/components/chrome/preloader";
import { profile, siteUrl } from "@/lib/data";

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const editorial = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aniket Sarbha — Full Stack Developer",
  description:
    "Full stack developer building e-commerce, SaaS and QR platforms with Next.js, Supabase and TypeScript.",
  openGraph: {
    title: "Aniket Sarbha — Full Stack Developer",
    description: "File Drive, Learning Exchange, Margaux Pets, Yokcash — shipped systems.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#F4F0E8",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  address: profile.location,
  email: profile.email,
  url: siteUrl,
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${editorial.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F0E8] text-[#111014]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#FF5C5C] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#F4F0E8]"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <Preloader />
      </body>
    </html>
  );
}
