"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CustomSession } from "@/type/session";

const UserContext = createContext({} as CustomSession);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const userdata = useSession()?.data as CustomSession;
  const [user, setUser] = useState<CustomSession>(null);

  useEffect(() => {
    if (userdata) {
      setUser(userdata);
    } else {
      setUser(null);
    }
  }, [userdata]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
