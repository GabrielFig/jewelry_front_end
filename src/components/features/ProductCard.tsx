"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";

const GRADIENT_BY_MATERIAL: Record<string, string> = {
  gold: "from-yellow-200 to-amber-300",
  silver: "from-slate-200 to-slate-300",
  platinum: "from-gray-100 to-gray-200",
  default: "from-stone-200 to-stone-300",
};

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const material = String(product.attributes?.material ?? "").toLowerCase();
  const gradient =
    Object.entries(GRADIENT_BY_MATERIAL).find(([k]) => material.includes(k))?.[1] ??
    GRADIENT_BY_MATERIAL.default;

  return (
    <div className="group flex flex-col rounded-xl border border-ink/10 bg-white overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/products/${product.sku}`} className="block">
        <div className={`h-52 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <span className="text-4xl opacity-40">💎</span>
        </div>
      </Link>
      <div className="flex flex-col gap-2 p-4 flex-1">
        <Link href={`/products/${product.sku}`}>
          <h3 className="font-serif font-semibold text-ink line-clamp-2 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-ink/50 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-ink/5">
          <span className="font-semibold text-ink">
            {formatPrice(product.price_amount, product.price_currency)}
          </span>
          <button
            onClick={() =>
              addItem({
                sku: product.sku,
                name: product.name,
                quantity: 1,
                price: product.price_amount,
                currency: product.price_currency,
              })
            }
            className="flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-xs font-medium text-white hover:bg-gold-dark transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
