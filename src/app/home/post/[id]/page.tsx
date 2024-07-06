import PostCard from "@/components/PostCard";
import prisma from "@/lib/prisma";
import AddCommentForm from "../../../../components/AddCommentForm";
import Comments from "../../../../components/Comments";
import { getServerCustomSession } from "@/auth";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getServerCustomSession();

  const postId = parseInt(params.id);
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
        },
      },
      _count: {
        select: { comments: true },
      },
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="space-y-4 mt-4 max-w-2xl mx-auto">
      <PostCard
        id={post.id}
        authorUsername={post.author.username}
        createdAt={post?.createdAt}
        title={post.title}
        content={post.content}
        noComments={post.comments.length}
        canEdit={false}
      />
      {user?.customUser && <AddCommentForm postId={postId} />}
      <Comments commentsData={post.comments} />
    </div>
  );
}
