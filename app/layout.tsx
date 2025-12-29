import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { PointsProvider } from "@/lib/points-context";
import { RewardsProvider } from "@/lib/rewards-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Placemakers",
  description: "Small steps, big rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-white to-[#EAEAEA]`}
      >
        <PointsProvider>
          <RewardsProvider>
            {children}
            <Navbar />
          </RewardsProvider>
        </PointsProvider>
      </body>
    </html>
  );
}
