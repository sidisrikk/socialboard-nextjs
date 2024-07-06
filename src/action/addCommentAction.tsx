"use server";

import { getServerCustomSession } from "@/auth";
import prisma from "@/lib/prisma";
import { TCommentWithAuthor } from "../type/comment";

export default async function addCommentAction(
  postId: number,
  commentContent: string
) {
  const user = await getServerCustomSession();
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
