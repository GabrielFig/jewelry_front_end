// src/components/features/ProductCard.tsx
"use client";
import Link from "next/link";
import { ShoppingBag, Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart.store";
import { useT } from "@/hooks/useT";

const MATERIAL_BG: Record<string, string> = {
  gold:     "from-cream-dark via-cream to-sage-light/50",
  silver:   "from-sage-light/80 via-cream to-cream",
  platinum: "from-sage-light via-cream to-cream",
  rose:     "from-cream-dark/80 via-cream to-cream",
  default:  "from-sage-light via-cream to-cream",
};

export function ProductCard({ product }: { product: Product }) {
  const items          = useCartStore((s) => s.items);
  const addItem        = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const t              = useT();
  const [wished, setWished] = useState(false);

  const material = String(product.attributes?.material ?? "").toLowerCase();
  const imageBg  = Object.entries(MATERIAL_BG).find(([k]) => material.includes(k))?.[1] ?? MATERIAL_BG.default;
  const cartItem = items.find((i) => i.sku === product.sku);
  const qty      = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem({
      sku:      product.sku,
      name:     product.name,
      quantity: 1,
      price:    product.price_amount,
      currency: product.price_currency,
    });
  };

  const handleQtyChange = (delta: number) => {
    updateQuantity(product.sku, qty + delta);
  };

  return (
    <div className="group flex flex-col rounded-xl border border-sage/25 bg-sage-light overflow-hidden hover:shadow-[0_8px_28px_rgba(110,31,58,0.10)] transition-all duration-300">
      {/* Imagen */}
      <Link href={`/products/${product.sku}`} className="block relative">
        <div
          className={`h-56 bg-gradient-to-br ${imageBg} flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02] origin-center`}
        >
          <span className="text-5xl opacity-30 select-none">💎</span>
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setWished((w) => !w); }}
          aria-label={wished ? "Quitar de favoritos" : "Agregar a favoritos"}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-cream/85 border border-gold/50 flex items-center justify-center hover:border-gold transition-all duration-200 cursor-pointer"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors duration-200 ${
              wished ? "fill-burgundy text-burgundy" : "text-muted hover:text-burgundy"
            }`}
          />
        </button>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-1 p-4 flex-1">
        <Link href={`/products/${product.sku}`}>
          <h3 className="font-serif text-sm text-ink leading-snug line-clamp-2 hover:text-burgundy transition-colors duration-200 cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-[10px] text-muted/70 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="mt-auto pt-3 border-t border-sage/20 space-y-2.5">
          {/* Precio */}
          <div className="flex items-center justify-between">
            <span className="inline-block bg-burgundy text-cream text-[10px] font-bold px-3 py-1 rounded-full">
              {formatPrice(product.price_amount, product.price_currency)}
            </span>
            <span className="text-[8px] text-gold">
              ✦ {String(product.attributes?.material ?? "artesanal")}
            </span>
          </div>

          {/* CTA */}
          {qty === 0 ? (
            <button
              onClick={handleAdd}
              className="w-full flex items-center justify-center gap-1.5 bg-burgundy hover:bg-burgundy-dark text-cream text-xs font-semibold py-2 rounded-full transition-all duration-200 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {t.productDetail.addToCart}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center flex-1 border-[1.5px] border-burgundy rounded-full bg-white overflow-hidden">
                <button
                  onClick={() => handleQtyChange(-1)}
                  aria-label="Reducir cantidad"
                  className="w-8 h-8 flex items-center justify-center text-burgundy hover:bg-burgundy/5 transition-colors cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="flex-1 text-center text-sm font-bold text-ink select-none">
                  {qty}
                </span>
                <button
                  onClick={() => handleQtyChange(1)}
                  aria-label="Aumentar cantidad"
                  className="w-8 h-8 flex items-center justify-center text-burgundy hover:bg-burgundy/5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <Link
                href="/cart"
                aria-label="Ver carrito"
                className="w-8 h-8 rounded-full bg-burgundy hover:bg-burgundy-dark flex items-center justify-center text-cream transition-colors cursor-pointer flex-shrink-0"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
