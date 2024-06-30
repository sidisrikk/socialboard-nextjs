import { DummyProfileImage } from "@/components/DummyProfileImage";
import PostCard from "@/components/PostCard";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default async function Page({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: true,
      comments: {
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
      {/* add comment button */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add a comment"
          className="flex-grow p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mt-6 space-y-4">
        {post.comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <DummyProfileImage size={32} className="rounded-full" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center space-x-2">
                <span className="font-medium ">{comment.author.username}</span>
                <span className="text-sm text-gray-100">
                  {dayjs(comment.createdAt).fromNow()}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
