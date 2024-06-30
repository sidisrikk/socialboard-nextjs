"use server";

import prisma from "@/lib/prisma";
import { TPostWithAuthorWithCommentCount } from "@/type/post";

export default async function filterPostAction(
  searchText: string = "",
  userId?: number | null
) {
  try {
    const filteredPosts = await prisma.post.findMany({
      where: {
        title: {
          ...(searchText.length > 1 && {
            contains: searchText,
            mode: "insensitive",
          }),
        },
        ...(userId && {
          authorId: userId,
        }),
      },
      include: {
        author: true,
        _count: {
          select: { comments: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return {
      status: 200,
      data: filteredPosts as TPostWithAuthorWithCommentCount[],
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      error: "Failed to search post",
    };
  }
}
