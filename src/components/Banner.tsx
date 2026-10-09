import Image from "next/image";
import React from "react";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <section className="container mx-auto px-3 sm:px-4 lg:px-0 mt-4 mb-3">
      <div className="mx-auto flex  flex-col-reverse items-center gap-6 rounded-2xl border border-base-300 bg-base-100 px-5 py-3 shadow-sm sm:px-6 sm:py-2 md:flex-row md:justify-between md:gap-8 lg:p-10">
        {/* Text side */}
        <div className="flex w-full flex-col items-center gap-4 text-center md:w-3/5 md:items-start md:text-left">
          <span className="inline-block rounded-full border border-black bg-[#05893E]/10 px-3 py-1 text-xs font-medium text-[#05893E] sm:text-sm">
            {date}
          </span>

          <h1 className="text-xl font-bold leading-snug sm:text-2xl lg:text-3xl xl:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="max-w-2xl text-xs leading-relaxed text-base-content/70 sm:text-sm">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <button className="btn font-semibold border-none bg-[#047F39] text-white hover:bg-[#036a30] btn-sm sm:btn-md">
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Image side */}
        <div className="flex w-full items-center justify-center md:w-2/5">
          <div className="flex w-full  items-center justify-center rounded-2xl sm:max-w-xs md:max-w-sm">
            <Image
              src="/bazar-hero.png"
              alt="hero-image"
              width={400}
              height={400}
              priority
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 260px, (max-width: 1024px) 40vw, 400px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
