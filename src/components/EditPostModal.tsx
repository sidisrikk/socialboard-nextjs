import editPostAction from "@/action/editPostAction";
import postsAtom from "@/state/post";
import { TPostWithAuthorWithCommentCount } from "@/type/post";
import { Post } from "@prisma/client";
import { useAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";

const EditPostModal = ({
  isOpen,
  onClose,
  postId,
  title,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  title: string;
  content: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title,
      content: content,
    },
  });

  const [posts, setPosts] = useAtom(postsAtom);

  const onSubmit = async (formData: { title: string; content: string }) => {
    const { status, data } = await editPostAction(
      postId,
      formData.title,
      formData.content
    );
    if (status === 200) {
      const updatedPosts = posts.map((post: TPostWithAuthorWithCommentCount) =>
        post.id === postId ? { ...post, ...formData } : post
      );
      setPosts(updatedPosts);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-50 p-8">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <textarea
              {...register("content", { required: true })}
              className="textarea textarea-bordered w-full min-h-60 md:min-h-32"
            />
            {errors.content && (
              <span className="text-red-500">Content is required</span>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn border-success text-success mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn text-white bg-success hover:bg-green-300"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
