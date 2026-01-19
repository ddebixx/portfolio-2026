import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import { ReactElement } from "react";

const commitMonoRegular = localFont({
  src: "../public/fonts/CommitMono-400-Regular.otf",
  variable: "--font-commit-mono",
  weight: "400",
});

const commitMonoBold = localFont({
  src: "../public/fonts/CommitMono-700-Regular.otf",
  variable: "--font-commit-mono-bold",
  weight: "700",
});

export const metadata: Metadata = {
  title: "andrewnaida.dev",
  description: "andrewnaida - fullstack developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactElement;
}>) {
  return (
    <html lang="en">
      <body
        className={`${commitMonoRegular.variable} ${commitMonoBold.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
