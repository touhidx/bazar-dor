import Image from "next/image";

import Marquee from "./Marquee";
import Link from "next/link";

import ProfileSection from "./ProfileSection";
import NavLinks from "@/app/categories/page";

const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
const Header = () => {
  return (
    <header className="">
      <div className="container mx-auto flex items-center justify-between gap-2 px-4 pt-3 pb-2">
        {/* Logo + date */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link href="/">
            <div className="rounded-xl bg-[#05893E] p-2 sm:p-3">
              <Image
                height={30}
                width={30}
                src="/logo-icon.png"
                alt="logo"
                className="h-5 w-5 sm:h-[30px] sm:w-[30px]"
              />
            </div>
          </Link>
          <div className="min-w-0">
            <Link href="/">
              <h2 className="text-base font-bold sm:text-lg">বাজার দর</h2>
            </Link>
            <p className="truncate text-[11px] text-gray-500 sm:text-sm">
              {date}
            </p>
          </div>
        </div>

        <ProfileSection />
      </div>
      <hr className="text-gray-200" />
      <NavLinks />
      <Marquee />
    </header>
  );
};

export default Header;
