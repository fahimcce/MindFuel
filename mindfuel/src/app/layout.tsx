import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/shared/header";
import Providers from "@/providers/providers";
import { Footer } from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MINDFUEL - LMS",
  description:
    "Complete Learning Management System for course creation and consumption",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
