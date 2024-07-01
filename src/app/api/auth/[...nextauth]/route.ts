import { nextAuthConfig } from "@/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(nextAuthConfig);
export { handler as GET, handler as POST };
