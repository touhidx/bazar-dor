export default function Loading() {
  return (
    <div className="bg-base-300">
      <div className="mx-auto container flex min-h-[70vh] items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white px-10 py-8">
          <span className="loading loading-spinner loading-lg text-[#05893E]" />
          <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
        </div>
      </div>
    </div>
  );
}
