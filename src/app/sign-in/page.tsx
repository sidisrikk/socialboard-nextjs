"use client";
import ABoardName from "@/components/ABoardName";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  const handleSumbit = (formData: FormData) => {
    const username = formData.get("username") as string;
    signIn("credentials", {
      username,
      callbackUrl: "/home",
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row-reverse bg-green-500">
      <div className="p-4 md:w-1/2 md:flex md:items-center md:justify-center bg-green-300">
        <div className="max-w-sm mx-auto md:max-w-md">
          <div className="rounded-lg p-6 mb-4 md:mb-0">
            <Image
              priority={true}
              src="/logo-removebg.png"
              alt="a Board"
              width={300}
              height={300}
              className="mx-auto mb-2 h-auto"
            />
            <ABoardName />
          </div>
        </div>
      </div>

      <div className="p-4 md:w-1/2 md:flex md:items-center md:justify-center">
        <div className="max-w-sm mx-auto md:max-w-md w-full">
          <h2 className="text-white text-2xl mb-4 md:mb-6">Sign in</h2>
          <form action={handleSumbit}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="w-full p-2 mb-4 rounded"
            />
            <button
              type="submit"
              className="btn btn-success w-full text-white p-2 rounded"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
