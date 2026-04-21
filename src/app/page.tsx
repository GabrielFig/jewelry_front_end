import axios from "axios";
import { HomePageClient } from "@/components/HomePageClient";
import type { Product, Category } from "@/types";

async function getData() {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const [products, categories] = await Promise.all([
      axios.get(`${base}/products?active_only=true`).then((r) => r.data as Product[]),
      axios.get(`${base}/categories`).then((r) => r.data as Category[]),
    ]);
    return { products: products.slice(0, 4), categories };
  } catch {
    return { products: [], categories: [] };
  }
}

export default async function HomePage() {
  const { products, categories } = await getData();
  return <HomePageClient products={products} categories={categories} />;
}
