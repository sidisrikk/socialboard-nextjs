"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import addCommentSVA from "../app/home/post/[id]/action";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import commentsAtom from "../state/atom";

type Inputs = {
  commentContent: string;
};

const schema = z.object({
  commentContent: z.string().min(1).max(255),
});

export default function AddCommentForm({ postId }: { postId: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, submitCount },
    reset,
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const { status, data, error } = await addCommentSVA(
      postId,
      formData.commentContent
    );
    if (status == 200 && data) {
      reset();
      setComments([data, ...comments]);
    } else {
      setError("root.serverError", {
        message: error,
      });
    }
  };

  const [comments, setComments] = useAtom(commentsAtom);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap mt-8 md:space-y-0 space-y-2 md:space-x-4 space-x-0">
        <input
          className="h-12 p-4 flex-grow border border-gray-300 rounded-lg w-full md:w-auto"
          type="text"
          placeholder="What's on your mind..."
          {...register("commentContent")}
        />
        <button
          className={`btn md:flex-grow-0 flex-grow md:basis-1${
            isSubmitting ? "text-gray-300" : "text-success"
          } rounded-lg`}
          type="submit"
          disabled={isSubmitting}
        >
          Add
        </button>
        {errors.root?.serverError && (
          <span className="text-red-500">
            {errors.root.serverError.message}
          </span>
        )}
      </div>
    </form>
  );
}
