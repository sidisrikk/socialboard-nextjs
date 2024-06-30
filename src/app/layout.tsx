import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SessionProviderWrapper from "../components/SessionProviderWrapper";
import { UserProvider } from "@/context/UserContext";
import { DrawerNavbar } from "@/components/DrawerNavbar";

export const metadata: Metadata = {
  title: "a Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <UserProvider>
            {children}
            <DrawerNavbar />
          </UserProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
