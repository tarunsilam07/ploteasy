// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';

import ClientRootLayoutContent from '@/app/ClientRootLayoutContent';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ploteasy",
  description: "Find your next home or investment property with Ploteasy. Browse properties for sale and rent, connect with agents, and post your listings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVnK43L9fS4x+b/zP+m8Xw2l/GfA/n7y7o9y0dM8oPz1o1J/1X5X5x8x8j+q8oO+0fO+q9ZtA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`}
      >
        <ClientRootLayoutContent>
          {children}
        </ClientRootLayoutContent>
      </body>
    </html>
  );
}