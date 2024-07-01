import prisma from "@/lib/prisma";
import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const nextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        username: { placeholder: "Username", type: "text" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });
        if (!user) {
          throw new Error("User not found.");
        }
        // WARNING: User from prisma != User from next-auth
        return {
          id: user.id,
          username: user.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.customUser = user;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.customUser = token.customUser;
      return session;
    },
  },
  pages: {
    error: "/sign-in",
    signIn: "/sign-in",
  },
} satisfies NextAuthOptions;

const handler = NextAuth(nextAuthConfig);
export { handler as GET, handler as POST };
