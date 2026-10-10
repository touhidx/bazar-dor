import { getProductBySlug, getProducts } from "@/components/lib/Product";
import Link from "next/link";
import { notFound } from "next/navigation";

// Pre-build every product page at build time (optional but nice for speed)
export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((p) => ({ slug: p.slug }));
}

// Page title for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? product.nameBn : "পণ্য পাওয়া যায়নি" };
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // params is a Promise in Next.js 15+
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <main className="mx-auto container px-4 py-8">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← ফিরে যান
      </Link>

      <h1 className="mt-4 text-2xl font-bold">
        {product.categoryIcon} {product.nameBn}
      </h1>
      <p className="text-gray-500">
        {product.categoryNameBn} · প্রতি {product.unit}
      </p>

      <div className="mt-4 text-3xl font-bold">৳{product.today}</div>
      <p className="text-sm">
        গতকাল: ৳{product.yesterday} · গত সপ্তাহ: ৳{product.lastWeek} · গত মাস: ৳
        {product.lastMonth}
      </p>

      <h2 className="mt-8 mb-3 text-lg font-bold">বাজার অনুযায়ী দাম</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">বাজার</th>
              <th>বিভাগ</th>
              <th>সর্বনিম্ন</th>
              <th>সর্বোচ্চ</th>
            </tr>
          </thead>
          <tbody>
            {product.markets.map((m) => (
              <tr key={m.market} className="border-b">
                <td className="py-2">{m.market}</td>
                <td>{m.division}</td>
                <td>৳{m.min}</td>
                <td>৳{m.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
