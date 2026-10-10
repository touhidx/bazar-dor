import Image from "next/image";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <header className="">
      <div className="container mx-auto flex items-center justify-between pt-3 pb-2">
        <div className="flex items-center gap-3">
          <div className=" bg-[#05893E] p-3 rounded-xl">
            <Image height={30} width={30} src="/logo-icon.png" alt="logo" />
          </div>
          <div>
            <h2 className="text-lg font-bold">বাজার দর</h2>
            <p>{date}</p>
          </div>
        </div>

        <div>
          <button className="btn border-none bg-white">সাইন আপ</button>
          <button className=" btn bg-[#05893E] text-white">সাইন ইন</button>
        </div>
      </div>
      <hr className="text-gray-200" />
      <NavLinks />
      <Marquee />
    </header>
  );
};

export default Header;
