import prisma from "@/lib/prisma";
import { PostWall } from "../../components/PostWall";

export default async function Page() {
  const myPosts = await prisma.post.findMany({
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

  return <PostWall posts={myPosts} />;
}
