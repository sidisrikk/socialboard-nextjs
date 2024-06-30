import { Post, User } from "@prisma/client";

export type TPostWithAuthorWithCommentCount = Post & {
  author: User;
  _count: { comments: number };
};
