"use client";

import filterPostAction from "@/action/filterPostAction";
import searchTextAtom from "@/state/searchText";
import { useSetAtom } from "jotai";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

export default function SearchPost({
  setFilterPosts,
  userId,
  noneFilteredPosts,
}: {
  setFilterPosts: (value: any) => void;
  userId?: number;
  noneFilteredPosts: any;
}) {
  const setSearchText = useSetAtom(searchTextAtom);
  return (
    <div className="space-y-4 mt-4 max-w-2xl mx-auto">
      <label className="input input-bordered flex items-center gap-2">
        <HiMiniMagnifyingGlass className="hover:cursor-pointer" />
        <input
          type="text"
          className="grow"
          placeholder="Search"
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length > 1) {
              const result = await filterPostAction(e.target.value, userId);
              result.data && setFilterPosts(result.data);
              setSearchText(e.target.value);
            } else {
              setFilterPosts(noneFilteredPosts);
              setSearchText("");
            }
          }}
        />
      </label>
    </div>
  );
}
