import PriceCard from "@/components/PriceCard";
import { getProducts, Product } from "./lib/Product";

// 1 → 2 → 3 columns
const GRID = "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3";

function Section({ title, items }: { title: string; items: Product[] }) {
  if (!items.length) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-bold">{title}</h2>
      <div className={GRID}>
        {items.map((p) => (
          <PriceCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default async function Products() {
  const products = await getProducts();

  const up = products.filter((p) => p.change?.dir === "up").slice(0, 6);
  const down = products.filter((p) => p.change?.dir === "down").slice(0, 6);

  return (
    <>
      <Section title="আজ দাম বেড়েছে" items={up} />
      <Section title="আজ দাম কমেছে" items={down} />
      <Section title="সব পণ্য" items={products} />
    </>
  );
}
