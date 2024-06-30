"use client";
import { BsArrowRight } from "react-icons/bs";
import { LinkOurBlogs } from "./LinkOurBlogs";
import { LinkHome } from "./LinkHome";

export function DrawerNavbar() {
  return (
    <div className="drawer drawer-end">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="navbar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-8">
          <label htmlFor="navbar-drawer" className="w-1/3 mb-8">
            <BsArrowRight size={40} />
          </label>
          <li>
            <LinkHome />
          </li>
          <li>
            <LinkOurBlogs />
          </li>
        </ul>
      </div>
    </div>
  );
}
