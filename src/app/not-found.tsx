import Link from "next/link";

export const metadata = {
  title: "পেজ পাওয়া যায়নি | বাজারদর",
};

export default function NotFound() {
  return (
    <div className="bg-base-300">
      <div className="mx-auto container space-y-4 p-4 min-h-[70vh]">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5">
          <span className="text-3xl">🔍</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              পেজটি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="text-sm text-gray-500">
              ৪০৪ - আপনি যে পেজ বা পণ্যটি খুঁজছেন সেটি হয়তো সরে গেছে অথবা
              লিংকটি ভুল
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-600">
          <span>চলুন, আজকের বাজারদর দেখি</span>
          <Link
            href="/"
            className="btn btn-neutral bg-[#05893E] btn-sm rounded-full border-none"
          >
            হোম পেজে যান
          </Link>
        </div>

        <article className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl sm:h-12 sm:w-12 sm:text-2xl">
            🛒
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
              পণ্য খুঁজছেন?
            </h3>
            <p className="text-xs text-gray-500">
              হোম পেজ থেকে ক্যাটাগরি বেছে নিন
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
