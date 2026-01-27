import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

