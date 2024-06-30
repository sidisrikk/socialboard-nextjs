import ABoardName from "@/components/ABoardName";
import { useUser } from "@/context/UserContext";
import { CustomSession } from "@/type/session";
import { signOut } from "next-auth/react";
import Image from "next/image";

export function Header() {
  const user: CustomSession = useUser();

  return (
    <div className="navbar bg-green-500 p-4">
      <div className="flex-1 pl-4">
        <ABoardName />
      </div>

      {user ? (
        <div className="flex-none gap-2">
          <span className="pr-8 text-white">{user?.customUser.username}</span>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="profile image"
                  src={"/dummy-profile.jpg"}
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  onClick={() =>
                    signOut({
                      callbackUrl: "/sign-in",
                    })
                  }
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <SignInBtn />
      )}
    </div>
  );
}

function SignInBtn() {
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
