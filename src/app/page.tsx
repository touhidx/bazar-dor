import Banner from "@/components/Banner";

import Products from "@/app/products/Products";

export default function Home() {
  return (
    <div>
      <Banner />

      <main className="mx-auto container px-4 pb-12">
        <Products />
      </main>
    </div>
  );
}
