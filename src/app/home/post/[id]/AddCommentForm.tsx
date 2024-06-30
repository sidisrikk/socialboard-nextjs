"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import addCommentSVA from "./action";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import commentsAtom from "./atom";

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
      <div className="flex flex-wrap mt-8 space-x-4">
        <input
          className="h-12 p-4 flex-grow border border-gray-300 rounded-lg md:basis-1 basis-3/4"
          type="text"
          placeholder="What's on your mind..."
          {...register("commentContent")}
        />
        <button
          className={`mr-4  md:basis-1 basis-1/4 ${
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
