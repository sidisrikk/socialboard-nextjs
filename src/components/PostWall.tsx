"use client";

import PostCard from "@/components/PostCard";
import SearchPost from "@/components/SearchPost";
import postsAtom from "@/state/post";
import { TPostWithAuthorWithCommentCount } from "@/type/post";
import { useAtom } from "jotai";
import { useEffect } from "react";

export function PostWall({
  posts,
  userId,
  canEdit,
}: {
  posts: TPostWithAuthorWithCommentCount[];
  userId?: number;
  canEdit?: boolean;
}) {
  const [_posts, _setPost] = useAtom(postsAtom);

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
          canEdit={canEdit}
        />
      </div>
    );
  });

  return (
    <div className="space-y-4 mt-4 max-w-2xl mx-auto">
      <SearchPost
        setFilterPosts={_setPost}
        userId={userId}
        noneFilteredPosts={posts}
      />
      {recentlyPostsComponents}
    </div>
  );
}
