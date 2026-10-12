import PriceCard from "@/components/PriceCard";
import SortSelect from "@/components/SortSelect";
import { Product } from "@/components/lib/Product"; // adjust to your real path
import { notFound } from "next/navigation";

type Category = {
  slug: string;
  nameBn: string;
  icon: string;
};

const API = "https://openapi.programming-hero.com/api/bazardor";

// Generic helper: the caller says what type it expects back
async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API}/${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  const data = res.json();
  if (!data) {
    notFound();
  }
  return data;
}

const ProductCategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{ sort?: string }>;
}) => {
  const { categoryId } = await params;
  const { sort } = await searchParams;
  const slug = decodeURIComponent(categoryId);

  const [products, categories] = await Promise.all([
    getJson<Product[]>("products"),
    getJson<Category[]>("categories"),
  ]);

  const filtered = products.filter((p) => p.category === slug);
  const category = categories.find((c) => c.slug === slug);

  const sorted = [...filtered];
  if (sort === "asc") sorted.sort((a, b) => Number(a.today) - Number(b.today));
  if (sort === "desc") sorted.sort((a, b) => Number(b.today) - Number(a.today));

  return (
    <div className="bg-base-300 min-h-screen">
      <div className="mx-auto container space-y-4 p-4">
        {/* Header card */}
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5">
          <span className="text-3xl">{category?.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {category?.nameBn ?? "ক্যাটাগরি"}
            </h1>
            <p className="text-sm text-gray-500">
              {filtered.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও
              পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sort bar */}
        <div className="flex items-center justify-end gap-2 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-600">
          সাজান
          <SortSelect />
        </div>

        <p className="text-sm text-gray-600">
          মোট {filtered.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Cards */}
        {sorted.length === 0 ? (
          <p className="text-gray-500">কোনো পণ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((product: Product) => (
              <PriceCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategoryPage;
