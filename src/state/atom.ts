import { atom } from "jotai";
import { TCommentWithAuthor } from "../type/comment";

const init: TCommentWithAuthor[] = [];
const commentsAtom = atom(init);

export default commentsAtom;
