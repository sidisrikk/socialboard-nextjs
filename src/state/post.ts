import { TPostWithAuthorWithCommentCount } from "@/type/post";
import { atom } from "jotai";

const init: TPostWithAuthorWithCommentCount[] = [];
const postsAtom = atom(init);

export default postsAtom;
