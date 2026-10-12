// Same shape as PriceCard
export function PriceCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 sm:p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 shrink-0 rounded-xl sm:h-12 sm:w-12" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-14" />
          <div className="skeleton h-6 w-24" />
        </div>
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

// Category page: header card + sort bar + grid of cards
export function CategorySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="bg-base-300">
      <div className="mx-auto container space-y-4 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5">
          <div className="skeleton h-10 w-10 rounded-xl" />
          <div className="flex flex-col gap-2">
            <div className="skeleton h-6 w-40" />
            <div className="skeleton h-4 w-56" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 rounded-2xl border border-gray-200 bg-white p-4">
          <div className="skeleton h-4 w-12" />
          <div className="skeleton h-8 w-32 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }).map((_, i) => (
            <PriceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Product details page
export function ProductSkeleton() {
  return (
    <div className="bg-base-300">
      <div className="mx-auto container space-y-4 p-4">
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
          <div className="skeleton h-16 w-16 shrink-0 rounded-xl" />
          <div className="flex flex-col gap-2">
            <div className="skeleton h-7 w-48" />
            <div className="skeleton h-4 w-28" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="skeleton h-3 w-20" />
              <div className="skeleton h-7 w-28" />
            </div>
          ))}
        </div>

        {/* chart / history area */}
        <div className="skeleton h-64 w-full rounded-2xl" />
      </div>
    </div>
  );
}

// Profile page
export function ProfileSkeleton() {
  return (
    <div className="bg-base-300">
      <div className="mx-auto container max-w-2xl space-y-4 p-4">
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="skeleton h-6 w-40" />
            <div className="skeleton h-4 w-56" />
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="skeleton h-3 w-20" />
              <div className="skeleton h-10 w-full rounded-lg" />
            </div>
          ))}
          <div className="skeleton h-10 w-32 rounded-full" />
        </div>
      </div>
    </div>
  );
}
