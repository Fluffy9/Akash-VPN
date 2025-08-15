import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Akash VPN - Decentralized Privacy",
  description: "Secure, fast, and private VPN powered by decentralized infrastructure. No logs, no tracking, just pure privacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          defaultTheme="light"
          storageKey="akash-vpn-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
