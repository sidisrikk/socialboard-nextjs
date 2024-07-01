import { CustomSession } from "@/type/session";
import { useSession } from "next-auth/react";

export default function useCustomSession() {
  const { data, status } = useSession();
  const session = data as CustomSession;

  return { status, session };
}
