"use client";

import { DummyProfileImage } from "@/components/DummyProfileImage";
import dayjs from "dayjs";
import { FaRegComment } from "react-icons/fa";
import { useRouter } from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
import Highlighter from "react-highlight-words";
import { useAtomValue } from "jotai";
import searchTextAtom from "@/state/searchText";
import { FiEdit3 } from "react-icons/fi";
import { useState } from "react";
import EditPostModal from "./EditPostModal";

dayjs.extend(relativeTime);

export default function PostCard({
  id,
  authorUsername,
  createdAt,
  title,
  content,
  noComments,
}: {
  id: number;
  authorUsername: string;
  createdAt?: Date;
  title: string;
  content: string;
  noComments: number;
}) {
  const router = useRouter();
  const searchText = useAtomValue(searchTextAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`bg-white ${id && "shadow-md"} rounded-lg`}>
      <div className="p-4 relative">
        <button
          onClick={handleEditClick}
          className="absolute top-4 right-4 text-green-300 p-2 hover:bg-green-100 rounded-full transition duration-200 ease-in-out transform hover:scale-110 shadow-lg"
        >
          <FiEdit3 />
        </button>
        <EditPostModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={title}
          content={content}
          postId={id}
        />
        <div className="flex items-center space-x-4 ml-1 mb-4">
          <DummyProfileImage size={48} className="rounded-full" />
          <h3 className="font-semibold text-lg ">{authorUsername}</h3>
          {createdAt && (
            <span className="text-gray-100">{dayjs(createdAt).fromNow()}</span>
          )}
        </div>
        <div
          onClick={() => id && router.push(`/home/post/${id}`)}
          className={`${id && "hover:cursor-pointer"}`}
        >
          <h2 className={`text-2xl font-bold mb-2 `}>
            <Highlighter
              highlightClassName="bg-golden"
              searchWords={[searchText]}
              autoEscape={true}
              textToHighlight={title}
            />
          </h2>
          <p className="text-gray-700 mb-4">{content}</p>
          <div className="flex items-center text-gray-500 text-sm space-x-4 text-gray-100">
            <FaRegComment />
            <span>{noComments} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
