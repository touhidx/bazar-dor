export type PriceDirection = "up" | "down" | "same";

export interface PriceChange {
  dir: PriceDirection;
  pct: number;
}

export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: MarketPrice[];
}

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch products");

  const json = await res.json();
  // handles both [..] and { data: [..] } response shapes
  return Array.isArray(json) ? json : (json.data ?? json.products ?? []);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}
