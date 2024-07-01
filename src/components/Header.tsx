import ABoardName from "@/components/ABoardName";
import { LogOutBtn } from "./LogOutBtn";
import { SignInBtn } from "./SignInBtn";
import { BsList } from "react-icons/bs";
import { DummyProfileImage } from "./DummyProfileImage";
import useCustomSession from "@/hook/useCustomSession";

export function Header() {
  const { session, status } = useCustomSession();

  return (
    <>
      <div className="fixed top-0 left-0 navbar bg-green-500 h-16">
        <div className="flex-1 pl-4">
          <ABoardName />
        </div>
        {status == "authenticated" ? (
          <>
            <span className="pr-8 text-white md:block hidden">
              {session?.customUser.username}
            </span>
            <div className="flex-none gap-2 md:block hidden">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost avatar"
                >
                  <DummyProfileImage size={32} className="rounded-full" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <LogOutBtn />
                  </li>
                </ul>
              </div>
            </div>
            <div className="drawer-content flex flex-col items-center justify-center">
              <label
                htmlFor="navbar-drawer"
                className="drawer-button md:hidden text-white"
              >
                <BsList size={40} />
              </label>
            </div>
          </>
        ) : (
          <SignInBtn />
        )}
      </div>
    </>
  );
}
