import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "SupraBus - Fleet Management System",
  description: "Bus fleet management web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="h-screen flex">
          <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
            <Sidebar />
          </div>
          <main className="md:pl-72 flex-1 overflow-y-auto">
            <Header />
            <div className="p-8">{children}</div>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
