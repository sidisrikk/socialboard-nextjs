"use client";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";

export function LinkOurBlogs() {
  return (
    <Link
      href={"/home/blog"}
      className="flex items-center space-x-2 btn btn-ghost justify-start"
    >
      <span>
        <BsPencilSquare size={24} />
      </span>
      <span>Our Blog</span>
    </Link>
  );
}
