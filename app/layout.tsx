import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navigation from "./components/layout/navigation";
import { ThemeProvider } from "./lib/providers/theme-provider";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TimerToolkit",
  description: "A versatile collection of timers for your workout needs",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <ThemeProvider>
          {children}
          <Navigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
