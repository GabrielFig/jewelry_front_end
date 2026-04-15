import Link from "next/link";
import axios from "axios";
import { ProductCard } from "@/components/features/ProductCard";
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

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 to-stone-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-32 flex flex-col items-center text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gold-light mb-4">Fine Jewelry</p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
            Crafted for Your<br />
            <span className="text-gold-light">Brightest Moments</span>
          </h1>
          <p className="max-w-lg text-stone-300 mb-10">
            Each piece is hand-selected and crafted with precision — a timeless expression of elegance.
          </p>
          <Link
            href="/products"
            className="inline-block bg-gold hover:bg-gold-dark text-white font-medium px-10 py-3.5 rounded transition-colors tracking-wider"
          >
            Explore Collections
          </Link>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="font-serif text-3xl font-bold text-ink mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category_id=${cat.id}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-ink/10 bg-white p-6 hover:border-gold hover:shadow-sm transition-all"
              >
                <span className="text-3xl">💍</span>
                <span className="font-serif font-semibold text-ink group-hover:text-gold transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl font-bold text-ink">Featured Pieces</h2>
          <Link href="/products" className="text-sm text-gold hover:underline">
            View all →
          </Link>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-ink/50 py-12">
            No products yet.{" "}
            <Link href="/admin/products/new" className="text-gold hover:underline">
              Add your first product
            </Link>
          </p>
        )}
      </section>

      {/* Value props */}
      <section className="bg-stone-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: "✦", title: "Ethically Sourced", desc: "Every gemstone traced to its origin" },
            { icon: "◈", title: "Lifetime Guarantee", desc: "We stand behind every piece we sell" },
            { icon: "⬡", title: "Free Shipping", desc: "On all orders over $150" },
          ].map((v) => (
            <div key={v.title}>
              <span className="text-gold-light text-3xl">{v.icon}</span>
              <h3 className="font-serif text-xl font-semibold mt-3 mb-1">{v.title}</h3>
              <p className="text-stone-400 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
