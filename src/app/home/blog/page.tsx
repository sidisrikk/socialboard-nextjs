import { nextAuthConfig } from "@/app/api/auth/[...nextauth]/route";
import PostCard from "@/components/PostCard";
import prisma from "@/lib/prisma";
import { CustomSession } from "@/type/session";
import { getServerSession } from "next-auth";

export default async function Page() {
  const user = (await getServerSession(nextAuthConfig)) as CustomSession;
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

  const myPostsComponents = myPosts.map((post) => {
    const {
      title,
      content,
      author: { username: authorUsername },
      _count: { comments: noComments },
    } = post;
    return (
      <div key={post.id}>
        <PostCard
          id={post.id}
          authorUsername={authorUsername}
          title={title}
          content={content}
          noComments={noComments}
        />
      </div>
    );
  });

  return (
    <div className="space-y-4 mt-4 max-w-2xl mx-auto">{myPostsComponents}</div>
  );
}
