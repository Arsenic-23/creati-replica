import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/lib/scroll/lenis";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creative Studio",
  description: "Building digital experiences that inspire and engage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
