"use client";
import Link from "next/link";
import { BsHouse } from "react-icons/bs";

export function LinkHome() {
  return (
    <Link
      href={"/home"}
      className="flex items-center space-x-2 btn btn-ghost justify-start"
    >
      <span>
        <BsHouse size={24} />
      </span>
      <span>Home</span>
    </Link>
  );
}
