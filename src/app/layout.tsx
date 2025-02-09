import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aldarian NFT",
  description: "Aldarian NFT Collection",
  openGraph: {
    title: "Aldarian NFT",
    description: "Aldarian NFT Collection",
    images: [
      {
        url: "/images/aldarianlogo.png",
        width: 1200,
        height: 630,
        alt: "Aldarian NFT Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aldarian NFT",
    description: "Aldarian NFT Collection",
    images: ["/images/aldarianlogo.png"],
  },
};

// export const metadata: Metadata = {
//   title: "Aldarian NFT",
//   description: "Aldarian NFT Collection",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
