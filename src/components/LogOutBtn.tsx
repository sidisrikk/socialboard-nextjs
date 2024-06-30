import { signOut } from "next-auth/react";

export function LogOutBtn() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/sign-in",
        })
      }
    >
      Logout
    </button>
  );
}
