"use client";
import Link from "next/link";
import { ShoppingBag, Heart, Gem } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { useT } from "@/hooks/useT";

const MATERIAL_STYLES: Record<string, { bg: string; gem: string }> = {
  gold:     { bg: "from-amber-100 via-yellow-50 to-cream",    gem: "text-amber-400" },
  silver:   { bg: "from-slate-100 via-gray-50 to-cream",      gem: "text-slate-400" },
  platinum: { bg: "from-gray-100 via-stone-50 to-cream",      gem: "text-gray-400" },
  rose:     { bg: "from-rose-light via-blush to-cream",       gem: "text-rose" },
  default:  { bg: "from-stone-100 via-rose-light/30 to-cream", gem: "text-gold/60" },
};

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const t = useT();
  const [wished, setWished] = useState(false);

  const material = String(product.attributes?.material ?? "").toLowerCase();
  const style =
    Object.entries(MATERIAL_STYLES).find(([k]) => material.includes(k))?.[1] ??
    MATERIAL_STYLES.default;

  return (
    <div className="group flex flex-col rounded-2xl border border-ink/8 bg-white overflow-hidden hover:shadow-[0_8px_30px_rgba(28,15,10,0.12)] transition-all duration-300 cursor-pointer">
      {/* Image area */}
      <Link href={`/products/${product.sku}`} className="block relative">
        <div
          className={`h-64 bg-gradient-to-br ${style.bg} flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02] origin-center`}
        >
          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-28 h-28 rounded-full border border-gold/10 absolute" />
            <div className="w-20 h-20 rounded-full border border-rose/10 absolute" />
          </div>
          <Gem className={`w-12 h-12 ${style.gem} relative z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300`} />
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWished((w) => !w);
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-ink/8 hover:border-rose/40 transition-all duration-200 shadow-sm cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              wished ? "fill-rose text-rose" : "text-muted hover:text-rose"
            }`}
          />
        </button>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-4 flex-1">
        <Link href={`/products/${product.sku}`}>
          <h3 className="font-serif font-semibold text-ink line-clamp-2 group-hover:text-rose-dark transition-colors duration-200 leading-snug">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted/80 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-ink/5">
          <span className="font-semibold text-ink text-sm">
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
            className="flex items-center gap-1.5 rounded-full bg-gold-light hover:bg-gold px-4 py-1.5 text-xs font-semibold text-ink hover:shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-all duration-200 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {t.productDetail.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
