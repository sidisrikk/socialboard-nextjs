import prisma from "@/lib/prisma";
import PostCard from "../../components/PostCard";

export default async function Page() {
  const recentlyPosts = await prisma.post.findMany({
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

  const recentlyPostsComponents = recentlyPosts.map((post) => {
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
    <div className="space-y-4 mt-4 max-w-2xl mx-auto">
      {recentlyPostsComponents}
    </div>
  );
}
