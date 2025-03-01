import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { CustomSession } from "./type/session";

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
        return {
          id: String(user.id),
          username: user.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.customUser = {
          id: parseInt(user.id),
          username: user.username,
        };
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

export async function getServerCustomSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return (await getServerSession(...args, nextAuthConfig)) as CustomSession;
}
