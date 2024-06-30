import { signOut } from "next-auth/react";

export function SignInBtn() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/sign-in",
        })
      }
      className="btn btn-success text-white px-4 py-2 rounded"
    >
      Sign In
    </button>
  );
}
