import { notFound } from "next/navigation";

const API = "https://openapi.programming-hero.com/api/bazardor";

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  dozen: "ডজন",
  piece: "পিস",
  litre: "লিটার",
  liter: "লিটার",
  hali: "হালি",
};

const CHANGE = {
  up: { word: "বেড়েছে", text: "text-red-600", arrow: "▲" },
  down: { word: "কমেছে", text: "text-green-600", arrow: "▼" },
  flat: { word: "অপরিবর্তিত", text: "text-gray-600", arrow: "–" },
} as const;

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductDetail {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: Market[];
}
// src/lib/format.ts
export const toBn = (n: number, decimals = 0) =>
  new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);

async function getProduct(param: string): Promise<ProductDetail | null> {
  // numeric -> /products/1, otherwise treat it as a slug
  if (/^\d+$/.test(param)) {
    const res = await fetch(`${API}/products/${param}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  }

  const res = await fetch(`${API}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  const all: ProductDetail[] = await res.json();
  return all.find((p) => p.slug === param) ?? null;
}

// whole numbers show as ৬২, halves as ৬৩.৫০
const fmt = (n: number) => toBn(n, Number.isInteger(n) ? 0 : 2);

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const product = await getProduct(decodeURIComponent(productId));
  if (!product) notFound();

  const { nameBn, categoryNameBn, unit, image, today, yesterday, change } =
    product;
  const unitBn = UNIT_BN[unit] ?? unit;
  const ch = CHANGE[change?.dir] ?? CHANGE.flat;
  const diff = Math.abs(today - yesterday);

  // per-market average, cheapest first
  const rows = product.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const lowest = Math.min(...product.markets.map((m) => m.min));
  const highest = Math.max(...product.markets.map((m) => m.max));

  const lowestMarket = product.markets.find((m) => m.min === lowest)?.market;
  const highestMarket = product.markets.find((m) => m.max === highest)?.market;

  return (
    <div className="bg-base-300 min-h-screen">
      <div className="container mx-auto max-w-5xl space-y-4 p-4">
        {/* ---------- Header card ---------- */}
        <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
              {image}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{nameBn}</h1>
              <p className="text-sm text-gray-500">
                {/* প্রতি {unitBn} · {categoryNameBn} */}
              </p>
              <p className="mt-1 text-sm text-gray-700">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-bold">{ch.word}</span>
                {change?.dir !== "flat" && <> · {toBn(diff)} টাকা</>}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-100 px-6 py-4 text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-4xl font-extrabold text-gray-900">
              {toBn(today)}
            </p>
            <p className="text-xs text-gray-500">টাকা / {unitBn}</p>
            <p className={`mt-1 text-sm font-semibold ${ch.text}`}>
              {ch.arrow} {toBn(change?.pct ?? 0, 1)}%
            </p>
          </div>
        </section>

        {/* ---------- Summary + table ---------- */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard
              label="সর্বনিম্ন দাম"
              value={toBn(lowest)}
              color="text-green-600"
              note={`সবচেয়ে কম দামের বাজার${lowestMarket ? `: ${lowestMarket}` : ""}`}
            />
            <SummaryCard
              label="সর্বাধিক দাম"
              value={toBn(highest)}
              color="text-red-600"
              note={`সবচেয়ে বেশি দামের বাজার${highestMarket ? `: ${highestMarket}` : ""}`}
            />
            <SummaryCard
              label="গড় দাম"
              value={toBn(today)}
              color="text-green-700"
              note={`প্রতি ${unitBn}-এর হিসাবে`}
            />
          </div>

          <h2 className="mb-3 mt-8 text-lg font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="px-4 py-3 text-left font-medium">বাজার</th>
                  <th className="px-4 py-3 text-left font-medium">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={`${r.market}-${r.division}`}
                    className={`border-t border-gray-200 text-gray-800 ${
                      i % 2 === 1 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{r.market}</td>
                    <td className="px-4 py-3">{r.division}</td>
                    <td className="px-4 py-3 text-right">{toBn(r.min)} টাকা</td>
                    <td className="px-4 py-3 text-right">{toBn(r.max)} টাকা</td>
                    <td className="px-4 py-3 text-right font-bold">
                      {fmt(r.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

function SummaryCard({
  label,
  value,
  color,
  note,
}: {
  label: string;
  value: string;
  color: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>
        {value} <span className="text-sm font-medium">টাকা</span>
      </p>
      <p className="text-xs text-gray-500">{note}</p>
    </div>
  );
}

export default ProductDetailsPage;
