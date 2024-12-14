import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "../components/providers/ConvexClientProvider";
import Header from "@/components/shared/header";

export const metadata: Metadata = {
  title: "File Drive",
  description:
    "File Drive is a simple file storage and management system built with modern web technologies.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          <div className="flex flex-col min-h-screen w-full bg-slate-100">
            <Header />
            {children}
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
