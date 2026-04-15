"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/features/ProductCard";
import { productsApi, categoriesApi } from "@/lib/api";
import type { Product, Category } from "@/types";

function ProductsContent() {
  const params = useSearchParams();
  const categoryId = params.get("category_id") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { categoriesApi.list().then((r) => setCategories(r.data)); }, []);

  useEffect(() => {
    setLoading(true);
    productsApi
      .list({ category_id: categoryId || undefined, active_only: true })
      .then((r) => setProducts(r.data))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <div className="flex gap-8">
      <aside className="w-48 shrink-0 hidden md:block">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-3">Category</h3>
        <ul className="space-y-1">
          <li>
            <a href="/products" className={`block text-sm py-1 px-2 rounded transition-colors ${!categoryId ? "text-gold font-medium bg-gold/5" : "text-ink/70 hover:text-ink"}`}>
              All
            </a>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <a href={`/products?category_id=${c.id}`} className={`block text-sm py-1 px-2 rounded transition-colors ${categoryId === c.id ? "text-gold font-medium bg-gold/5" : "text-ink/70 hover:text-ink"}`}>
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-1">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-72 rounded-xl bg-ink/5 animate-pulse" />)}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-ink/50 py-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => <ProductCard key={p.sku} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
      <h1 className="font-serif text-4xl font-bold text-ink mb-8">Collections</h1>
      <Suspense fallback={<div className="h-96 animate-pulse bg-ink/5 rounded-xl" />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
