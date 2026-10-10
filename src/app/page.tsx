import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import Products from "@/app/Products/Products";

export default function Home() {
  return (
    <div>
      <Marquee />
      <Banner />

      <main className="mx-auto container px-4 pb-12">
        <Products />
      </main>
    </div>
  );
}
