import type { Metadata } from "next";
import "../styles/globals.css";
import SessionProviderWrapper from "../provider/SessionProviderWrapper";
import JotaiProvider from "@/provider/JotaiProvider";

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
          <JotaiProvider>{children}</JotaiProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
