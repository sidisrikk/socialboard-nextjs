"use server";

import { getServerCustomSession } from "@/auth";
import prisma from "@/lib/prisma";

export default async function editPostAction(
  postId: number,
  title: string,
  content: string
) {
  // auth
  const user = await getServerCustomSession();
  if (!user?.customUser) {
    return {
      status: 500,
      error: "Session not found. Please log in.",
    };
  }
  // check ownership
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      authorId: user.customUser.id,
    },
  });
  if (!post) {
    return {
      status: 403,
      error: "You are not the owner of this post.",
    };
  }

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
      },
    });
    return {
      status: 200,
      data: updatedPost,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      error: "Failed to search post",
    };
  }
}
