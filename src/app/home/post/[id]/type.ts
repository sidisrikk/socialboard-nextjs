import { Comment, User } from "@prisma/client";

export type TCommentWithAuthor = Comment & { author: User };
