"use server";

import { nextAuthConfig } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { CustomSession } from "@/type/session";
import { getServerSession } from "next-auth";
import { TCommentWithAuthor } from "./type";

export default async function addCommentSVA(
  postId: number,
  commentContent: string
) {
  const user = (await getServerSession(nextAuthConfig)) as CustomSession;
  if (!user?.customUser) {
    throw new Error("User not found");
  }

  try {
    const result = await prisma.comment.create({
      data: {
        content: commentContent,
        author: {
          connect: {
            id: user?.customUser.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });

    const comment = await prisma.comment.findUnique({
      where: {
        id: result.id,
      },
      include: {
        author: true,
      },
    });

    return {
      status: 200,
      data: comment as TCommentWithAuthor,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      error: "Failed to add comment",
    };
  }
}
