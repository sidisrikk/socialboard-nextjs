import prisma from "@/lib/prisma";
import { CustomSession } from "@/type/session";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
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
        return user;
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
    error: "/",
    signIn: "/",
  },
});
export { handler as GET, handler as POST };
