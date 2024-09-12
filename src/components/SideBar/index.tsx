import { HouseLine } from "@phosphor-icons/react";
import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div>
      <div className="max-w-56 w-full border-r-2 border-r-black-light fixed top-0 bottom-0 hidden md:block">
        <div className="flex flex-col items-center ">
          <a href="/">
            <img src="/logo.svg" alt="logo" className="mt-12" />
          </a>

          <hr className="border-2 border-black-light w-28 mt-10" />

          <ul>
            <li>
              <a
                className="flex items-center justify-center mt-10 text-white gap-3 px-5 py-1 bg-[#242424] border border-black-light rounded-xl"
                href="/"
              >
                <HouseLine size={24} />
                <span>Home</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="pl-10 md:pl-60">{children}</div>
    </div>
  );
}
