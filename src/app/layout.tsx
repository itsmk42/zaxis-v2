import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Z Axis Studio | Premium 3D Printed Creations",
  description: "Handcrafted 3D printed lamps, lithophanes, and custom creations from Mangaluru, India. Transform your memories into illuminated masterpieces.",
  keywords: ["3D printing", "lithophane", "custom lamps", "Mangaluru", "India", "personalized gifts"],
  authors: [{ name: "Z Axis Studio" }],
  openGraph: {
    title: "Z Axis Studio | Premium 3D Printed Creations",
    description: "Engineering Art into Reality. Premium 3D printed lamps and custom creations.",
    url: "https://zaxisstudio.in",
    siteName: "Z Axis Studio",
    locale: "en_IN",
    type: "website",
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
          <NextTopLoader
            color="#E11D48"
            height={3}
            showSpinner={false}
            speed={200}
            shadow="0 0 10px #E11D48,0 0 5px #E11D48"
          />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
