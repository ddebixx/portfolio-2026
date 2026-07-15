import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";

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
	children: ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body className={`${commitMonoRegular.variable} ${commitMonoBold.variable} antialiased`}>
				<ThemeProvider>
					<Navbar />
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
