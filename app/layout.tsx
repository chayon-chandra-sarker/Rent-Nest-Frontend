import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { getMe } from "@/service/getMe";
import { SiteFooter } from "@/components/shared/SiteFooter";
import QueryProvider from "@/providers/QueryProvider";
import { SiteHeader } from "@/components/navbar/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RentNest | Find Your Perfect Rental Home",
    template: "%s | RentNest",
  },

  description:
    "RentNest is a modern rental marketplace where tenants can find their perfect home and landlords can manage rental properties easily.",

  keywords: [
    "RentNest",
    "rental marketplace",
    "rental property",
    "rent house",
    "property rental",
    "find rental home",
    "landlord",
    "tenant",
  ],

  authors: [
    {
      name: "RentNest",
    },
  ],

  creator: "RentNest",
  publisher: "RentNest",

  icons: {
    icon: "/favicon.svg",
  },

  openGraph: {
    title: "RentNest | Find Your Perfect Rental Home",

    description:
      "Find rental properties, send rental requests, make payments, and manage your rental journey with RentNest.",

    siteName: "RentNest",

    type: "website",

    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",

    title: "RentNest | Find Your Perfect Rental Home",

    description:
      "Find your perfect rental home and manage your rental journey with RentNest.",
  },

  robots: {
    index: true,

    follow: true,

    googleBot: {
      index: true,

      follow: true,

      "max-image-preview": "large",

      "max-snippet": -1,

      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        "font-sans",
      )}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <QueryProvider>
          <SiteHeader user={user} />

          <main className="flex-1 w-full">{children}</main>

          <Toaster position="top-right" richColors closeButton />

          <SiteFooter />
        </QueryProvider>
      </body>
    </html>
  );
}