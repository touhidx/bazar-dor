import Link from "next/link";
interface l {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const data = await res.json();
  return (
    <>
      <nav className="flex gap-3 container mx-auto p-1.5">
        {data.map((l: l) => (
          <Link
            key={l.id}
            href={`/${l.slug}`}
            className="flex items-center gap-1 hover:underline"
          >
            <span className="text-base" aria-hidden="true">
              {l.icon}
            </span>
            <span>{l.nameBn}</span>
          </Link>
        ))}
      </nav>
      <hr className="text-gray-200" />
    </>
  );
};

export default NavLinks;
