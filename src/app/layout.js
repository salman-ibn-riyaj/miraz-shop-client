import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Miraz Shop - Premium Lifestyle & Fashion Collection",
  description: "Premium lifestyle and fashion collection for the modern individual",
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} light h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}





