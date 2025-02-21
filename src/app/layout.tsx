import type { Metadata } from "next";
import { Urbanist, Silkscreen, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { FirebaseProvider } from "@/firebase/FirebaseContext";

const urbanist = Urbanist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: "400",
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Friday",
  description: "Team Friday HackOn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelifySans.variable} ${urbanist.variable} ${silkscreen.variable} antialiased font-urbanist`}
      >
        <FirebaseProvider>
        {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}