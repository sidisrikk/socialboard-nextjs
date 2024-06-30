import { Session } from "next-auth";
import { User } from "@prisma/client";

// union type for session and user
export type CustomSession =
  | (Session & {
      customUser: User;
    })
  | null;
