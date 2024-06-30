import type { Metadata } from "next";
import "../styles/globals.css";
import SessionProviderWrapper from "../provider/SessionProviderWrapper";
import { UserProvider } from "@/provider/UserContext";

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
          <UserProvider>{children}</UserProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
