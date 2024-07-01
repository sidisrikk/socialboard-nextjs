import { nextAuthConfig } from "@/auth";
import { PostWall } from "@/components/PostWall";
import prisma from "@/lib/prisma";
import { CustomSession } from "@/type/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = (await getServerSession(nextAuthConfig)) as CustomSession;
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
