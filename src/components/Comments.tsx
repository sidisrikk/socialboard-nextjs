"use client";

import { DummyProfileImage } from "@/components/DummyProfileImage";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import commentsAtom from "../state/atom";
import { useEffect } from "react";
import { TCommentWithAuthor } from "../type/comment";

export default function Comments({
  commentsData,
}: {
  commentsData: TCommentWithAuthor[];
}) {
  const [comments, setComments] = useAtom(commentsAtom);

  useEffect(() => {
    setComments(commentsData);
  }, [setComments, commentsData]);

  return comments.map((comment) => (
    <div key={comment.id} className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <DummyProfileImage size={32} className="rounded-full" />
      </div>
      <div className="flex-grow">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{comment.author.username}</span>
          <span className="text-sm text-gray-100">
            {dayjs(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-700">{comment.content}</p>
      </div>
    </div>
  ));
}
