"use server";

import { nextAuthConfig } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { CustomSession } from "@/type/session";
import { getServerSession } from "next-auth";
import { TCommentWithAuthor } from "../type/comment";

export default async function addCommentAction(
  postId: number,
  commentContent: string
) {
  const user = (await getServerSession(nextAuthConfig)) as CustomSession;
  if (!user?.customUser) {
    return {
      status: 500,
      error: "Session not found. Please log in.",
    };
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
