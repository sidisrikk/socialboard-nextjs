"use client";
import { LinkHome } from "./LinkHome";
import { LinkOurBlogs } from "./LinkOurBlogs";

export default function LeftNavbar() {
  return (
    <>
      <div className="mt-16 w-64 bg-green-100 p-8 space-y-2 md:block hidden">
        <LinkHome />
        <LinkOurBlogs />
      </div>
    </>
  );
}
