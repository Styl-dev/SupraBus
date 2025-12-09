"use client";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/") return "Dashboard";
    if (pathname.startsWith("/buses")) return "Bus Fleet Management";
    if (pathname.startsWith("/drivers")) return "Driver Management";
    if (pathname.startsWith("/routes")) return "Route Management";
    return "SupraBus";
  };

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-8">
        <h2 className="text-2xl font-semibold">{getTitle()}</h2>
      </div>
    </header>
  );
}
