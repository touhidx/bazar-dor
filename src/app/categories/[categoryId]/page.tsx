import PriceCard from "@/components/PriceCard";

const API = "https://openapi.programming-hero.com/api/bazardor";

async function getJson(path: string) {
  const res = await fetch(`${API}/${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json();
}

const ProductCategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  const slug = decodeURIComponent(categoryId);

  const [products, categories] = await Promise.all([
    getJson("products"),
    getJson("categories"),
  ]);

  // flat product list -> filter by category slug
  const filtered = products.filter((p: any) => p.category === slug);
  const category = categories.find((c: any) => c.slug === slug);

  return (
    <div className="bg-base-300">
      <div className="mx-auto container space-y-4 p-4">
        {/* Header card */}
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-5">
          <span className="text-3xl">{category?.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {category?.nameBn ?? "ক্যাটাগরি"}
            </h1>
            <p className="text-sm text-gray-500">
              {filtered.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sort bar (UI only for now) */}
        <div className="flex items-center justify-end gap-2 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-600">
          সাজান
          <select className="rounded-lg border border-gray-300 px-3 py-1.5">
            <option>ডিফল্ট</option>
          </select>
        </div>

        <p className="text-sm text-gray-600">
          মোট {filtered.length}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Cards */}
        {filtered.length === 0 ? (
          <p className="text-gray-500">কোনো পণ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product: any) => (
              <PriceCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategoryPage;
