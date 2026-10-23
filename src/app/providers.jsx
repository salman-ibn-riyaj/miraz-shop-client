"use client";
import { ThemeProvider } from "next-themes";
import MetaPixel from "@/components/MetaPixel";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <MetaPixel />
      {children}
    </ThemeProvider>
  );
}

