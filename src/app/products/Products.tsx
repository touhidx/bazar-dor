import PriceCard from "@/components/PriceCard";
import { getProducts } from "../../components/lib/Product";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

// 1 → 2 → 3 columns
const GRID = "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3";

export default async function Products() {
  const products = await getProducts();

  const up = products.filter((p) => p.change?.dir === "up").slice(0, 6);
  const down = products.filter((p) => p.change?.dir === "down").slice(0, 6);

  return (
    <>
      <section className="mt-8">
        <h2 className="mb-3 flex gap-1 items-center text-lg font-bold">
          <span className="  text-[#D03739] font-semibold gap-0.5">
            <FaCaretUp className="text-base" />
          </span>
          <span>আজ দাম বেড়েছে</span>
        </h2>
        <div className={GRID}>
          {up.map((p) => (
            <PriceCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-3 flex gap-1 items-center text-lg font-bold">
          <span className="  text-[#1A9951] font-semibold gap-0.5">
            <FaCaretDown className="text-base" />
          </span>
          <span>আজ দাম কমেছে</span>
        </h2>
        <div className={GRID}>
          {down.map((p) => (
            <PriceCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="mb-3  gap-1 text-lg font-bold">সব পণ্য</h2>
        <p className="mb-2 text-base-content text-sm">
          মোট {products.length.toLocaleString("bn-BD")} পণ্য দেখানো হচ্ছে
        </p>
        <div className={GRID}>
          {products.map((p) => (
            <PriceCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
