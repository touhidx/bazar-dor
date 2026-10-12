import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-base-100">
      <hr className="border-gray-200" />
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 py-5 text-center text-xs text-base-content sm:px-6 sm:text-sm md:flex-row md:justify-between md:gap-6 md:text-left lg:px-8">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className="md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
