import PostCard from "@/components/PostCard";
import prisma from "@/lib/prisma";
import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";

export default async function Page({ params }: { params: { id: string } }) {
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
        authorUsername={post.author.username}
        createdAt={post?.createdAt}
        title={post.title}
        content={post.content}
        noComments={post.comments.length}
      />
      <AddCommentForm postId={postId} />
      <Comments commentsData={post.comments} />
    </div>
  );
}
