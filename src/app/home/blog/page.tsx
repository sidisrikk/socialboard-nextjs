import { getServerCustomSession } from "@/auth";
import { PostWall } from "@/components/PostWall";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getServerCustomSession();

  if (!user) {
    redirect("/home");
  }
  const myPosts = await prisma.post.findMany({
    where: {
      authorId: user?.customUser.id,
    },
    include: {
      author: true,
      _count: {
        select: { comments: true },
      },
    },
  });

  return (
    <PostWall posts={myPosts} userId={user?.customUser.id} canEdit={true} />
  );
}
