import { Post } from "@prisma/client";
import { atom } from "jotai";

const init: Post[] = [];
const postsAtom = atom(init);

export default postsAtom;
