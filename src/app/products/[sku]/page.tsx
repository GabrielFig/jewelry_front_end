"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { productsApi } from "@/lib/api";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";

const GRADIENT_BY_MATERIAL: Record<string, string> = {
  gold: "from-yellow-200 to-amber-300",
  silver: "from-slate-200 to-slate-300",
  platinum: "from-gray-100 to-gray-200",
  default: "from-stone-200 to-stone-300",
};

export default function ProductDetailPage() {
  const { sku } = useParams<{ sku: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    productsApi
      .get(sku)
      .then((r) => setProduct(r.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [sku]);

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-16 text-center text-ink/50">Loading…</div>;
  if (!product) return <div className="max-w-5xl mx-auto px-4 py-16 text-center text-ink/50">Product not found.</div>;

  const material = String(product.attributes?.material ?? "").toLowerCase();
  const gradient =
    Object.entries(GRADIENT_BY_MATERIAL).find(([k]) => material.includes(k))?.[1] ??
    GRADIENT_BY_MATERIAL.default;

  const handleAdd = () => {
    addItem({ sku: product.sku, name: product.name, quantity: 1, price: product.price_amount, currency: product.price_currency });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <Link href="/products" className="inline-flex items-center gap-1 text-sm text-ink/50 hover:text-gold mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Collections
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className={`rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center aspect-square text-8xl opacity-60`}>
          💎
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs tracking-widest uppercase text-gold mb-1">SKU: {product.sku}</p>
            <h1 className="font-serif text-3xl font-bold text-ink">{product.name}</h1>
          </div>
          <p className="text-2xl font-semibold text-ink">
            {formatPrice(product.price_amount, product.price_currency)}
          </p>
          <p className="text-ink/60 leading-relaxed">{product.description}</p>

          {/* Attributes */}
          {Object.keys(product.attributes).length > 0 && (
            <div className="rounded-xl border border-ink/10 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.attributes).map(([k, v]) =>
                    v !== null ? (
                      <tr key={k} className="border-b border-ink/5 last:border-0">
                        <td className="px-4 py-2.5 font-medium capitalize text-ink/70 bg-cream/60 w-1/2">
                          {k.replace(/_/g, " ")}
                        </td>
                        <td className="px-4 py-2.5 text-ink">{String(v)}</td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          )}

          <Button size="lg" onClick={handleAdd} className="mt-2">
            <ShoppingBag className="w-5 h-5" />
            {added ? "Added to Cart!" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
