"use client";
import Link from "next/link";
import { BsHouse, BsPencilSquare } from "react-icons/bs";

export default function Navbar() {
  return (
    <div className="w-64 bg-green-100 h-screen p-8 space-y-2">
      <Link
        href={"/home"}
        className="flex items-center space-x-2 btn btn-ghost justify-start"
      >
        <span>
          <BsHouse size={24} />
        </span>
        <span>Home</span>
      </Link>
      <Link
        href={"/post"}
        className="flex items-center space-x-2 btn btn-ghost justify-start"
      >
        <span>
          <BsPencilSquare size={24} />
        </span>
        <span>Our Blog</span>
      </Link>
    </div>
  );
}
