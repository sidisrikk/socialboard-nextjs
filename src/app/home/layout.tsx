"use client";

import { DrawerNavbar } from "@/components/DrawerNavbar";
import { Header } from "@/components/Header";
import LeftNavbar from "@/components/LeftNavbar";

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 h-screen">
          <LeftNavbar />
          <div className="mt-16 flex-1 p-4 overflow-y-auto">{children}</div>
        </div>
      </div>
      <DrawerNavbar />
    </>
  );
}
