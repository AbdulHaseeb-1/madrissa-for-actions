import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import React from "react";

// export const metadata: Metadata = {
//   metadataBase: new URL("https://jiallama.edu.pk"),
//   openGraph: {
//     siteName: "Jamia Islamia Chaman",
//   },
// };

// Font files can be colocated inside of `pages`
const urdu = localFont({
  src: "../fonts/urdu.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-urdu", // Optional: Generate a CSS variable
});

const arabic = localFont({
  src: "../fonts/arabic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-arabic", // Optional: Generate a CSS variable
});

// const pashto = localFont({
//   src: "../fonts/pashto.woff2",
//   weight: "400",
//   style: "normal",
//   variable: "--font-pashto", // Optional: Generate a CSS variable
// });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${urdu.className}  antialiased`}
      >
        <NextTopLoader color="#0f766e" showSpinner={false} />
        <Toaster richColors position="top-right" theme="light" dir="rtl" />
        {children}
      </body>
    </html>
  );
}
