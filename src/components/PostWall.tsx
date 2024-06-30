"use client";

import PostCard from "@/components/PostCard";
import SearchPost from "@/components/SearchPost";
import { TPostWithAuthorWithCommentCount } from "@/type/post";
import { useEffect, useState } from "react";

export function PostWall({
  posts,
  userId,
}: {
  posts: TPostWithAuthorWithCommentCount[];
  userId?: number;
}) {
  const init: TPostWithAuthorWithCommentCount[] = [];
  const [_posts, _setPost] = useState(init);

  useEffect(() => {
    _setPost(posts);
  }, [_setPost, posts]);

  const recentlyPostsComponents = _posts.map((post) => {
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
      <SearchPost setFilterPosts={_setPost} userId={userId} />
      {recentlyPostsComponents}
    </div>
  );
}
