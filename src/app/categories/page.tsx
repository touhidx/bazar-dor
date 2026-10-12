import Link from "next/link";
import { notFound } from "next/navigation";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  const data = await res.json();
  if (!data) {
    notFound();
  }

  return (
    <>
      <nav className="container mx-auto flex gap-3 overflow-x-auto whitespace-nowrap px-4 py-1.5 text-sm sm:px-6 sm:text-base md:flex-wrap md:overflow-visible lg:px-8">
        {data.map((l: Category) => (
          <Link
            key={l.id}
            href={`/categories/${l.slug}`}
            className="flex shrink-0 items-center gap-1"
          >
            <span className="text-base" aria-hidden="true">
              {l.icon}
            </span>
            <span>{l.nameBn}</span>
          </Link>
        ))}
      </nav>
      <hr className="border-gray-200" />
    </>
  );
};

export default NavLinks;
