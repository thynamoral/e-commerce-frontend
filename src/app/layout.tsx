import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryClientProvider";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Momo E-Commerce",
  description:
    "Your one-stop shop for everything. Discover our products, from everyday essentials to extraordinary finds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />;
      </body>
    </html>
  );
}
