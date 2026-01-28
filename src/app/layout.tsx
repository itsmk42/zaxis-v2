import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { SchemaMarkup } from "@/components/seo/schema-markup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Z Axis Studio | Premium 3D Printing Service in India",
    template: "%s | Z Axis Studio - Premium 3D Printing Service",
  },
  description: "Professional 3D Printing Service in India. Based in Mangaluru & Bangalore. We ship custom PLA, PETG, and Resin prints nationwide. Order Online.",
  keywords: [
    "3D Printing India",
    "3D Printing Service Bangalore",
    "Custom 3D Printing Mangalore",
    "Online 3D Print Service",
    "PLA Printing India",
    "Lithophane Gift India",
    "3D Printing Mangaluru",
    "3D Printing Karnataka",
    "Custom 3D Prints India",
    "PETG Printing Service",
    "Resin 3D Printing India",
    "Personalized 3D Gifts",
    "3D Printed Lamps India",
    "Custom Keychains 3D Print",
    "3D Printing Service Near Me",
  ],
  authors: [{ name: "Z Axis Studio" }],
  creator: "Z Axis Studio",
  publisher: "Z Axis Studio",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://zaxisstudio.in",
    siteName: "Z Axis Studio",
    title: "Z Axis Studio | Premium 3D Printing Service in India",
    description: "Professional 3D Printing Service in India. Based in Mangaluru & Bangalore. We ship custom PLA, PETG, and Resin prints nationwide. Order Online.",
    images: [
      {
        url: "https://zaxisstudio.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Z Axis Studio - Premium 3D Printing Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Z Axis Studio | Premium 3D Printing Service in India",
    description: "Professional 3D Printing Service in India. Based in Mangaluru & Bangalore. We ship custom PLA, PETG, and Resin prints nationwide.",
    images: ["https://zaxisstudio.in/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
          <SchemaMarkup />
          <NextTopLoader
            color="#E11D48"
            height={4}
            showSpinner={false}
            speed={200}
            zIndex={1600}
            shadow="0 0 10px #E11D48,0 0 5px #E11D48"
          />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
