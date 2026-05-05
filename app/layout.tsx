import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FSO Blog App",
  description: "Blog App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header>
          <nav className="text-foreground my-2 p-4 space-x-5 underline underline-offset-5">
            <Link href="/">Home</Link>
            <Link href="/blogs">Blogs</Link>
          </nav>
        </header>
        <main className="container p-4">{children}</main>
      </body>
    </html>
  );
}
