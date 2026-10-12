import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const notoSerifBangali = Noto_Serif_Bengali({
  variable: "--font-geist-sans",
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "Bazar-dor",
  description: "MADE BY TOUHIDX",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${notoSerifBangali.className}  h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-base-300">
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
