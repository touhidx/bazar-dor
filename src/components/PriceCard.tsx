import Link from "next/link";
import { Product } from "./lib/Product";

const UNIT_BN = {
  kg: "প্রতি কেজি",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  hali: "প্রতি হালি",
};

// 1290 -> "১,২৯০", 2.1 -> "২.১"
const toBn = (n, decimals = 0) =>
  new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);

const BADGE = {
  up: { style: "text-red-600 bg-red-50", arrow: "▲" }, // price rose = bad
  down: { style: "text-green-600 bg-green-50", arrow: "▼" }, // price fell = good
  same: { style: "text-gray-600 bg-gray-100", arrow: "–" },
};

export default function PriceCard({ product }: { product: Product }) {
  const { nameBn, unit, image, today, change } = product;
  const badge = BADGE[change?.dir] ?? BADGE.same;

  return (
    <Link href={`/products/${product.slug}`}>
      <article className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 transition hover:shadow-md sm:p-4">
        {/* Top: icon + name */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl sm:h-12 sm:w-12 sm:text-2xl">
            {image}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
              {nameBn}
            </h3>
            <p className="text-xs text-gray-500">{UNIT_BN[unit] ?? unit}</p>
          </div>
        </div>

        {/* Bottom: price + change badge */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-lg font-bold text-gray-900 sm:text-xl">
              {toBn(today)} <span className="text-sm font-medium">টাকা</span>
            </p>
          </div>

          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${badge.style}`}
          >
            {badge.arrow} {toBn(change?.pct ?? 0, 1)}%
          </span>
        </div>
      </article>
    </Link>
  );
}
