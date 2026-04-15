"use client";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalAmount } = useCartStore();
  const currency = items[0]?.currency ?? "USD";

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-6xl mb-6">🛍️</p>
        <h1 className="font-serif text-3xl font-bold text-ink mb-3">Your cart is empty</h1>
        <p className="text-ink/50 mb-8">Discover our collections and add something beautiful.</p>
        <Link href="/products" className="inline-flex items-center justify-center rounded bg-gold px-7 py-3 text-base font-medium text-white hover:bg-gold-dark transition-colors">Browse Collections</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <h1 className="font-serif text-4xl font-bold text-ink mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.sku} className="flex items-center gap-4 rounded-xl border border-ink/10 bg-white p-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center text-2xl shrink-0">
                💎
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ink truncate">{item.name}</p>
                <p className="text-sm text-ink/50">{item.sku}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.sku, item.quantity - 1)} className="w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink/5">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.sku, item.quantity + 1)} className="w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink/5">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <p className="font-semibold text-ink w-24 text-right">
                {formatPrice(item.price * item.quantity, item.currency)}
              </p>
              <button onClick={() => removeItem(item.sku)} className="text-red-400 hover:text-red-600 ml-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-xl border border-ink/10 bg-white p-6 h-fit space-y-4">
          <h2 className="font-serif text-xl font-semibold text-ink">Order Summary</h2>
          <div className="flex justify-between text-sm text-ink/60">
            <span>Subtotal</span>
            <span>{formatPrice(totalAmount(), currency)}</span>
          </div>
          <div className="flex justify-between text-sm text-ink/60">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="border-t border-ink/10 pt-4 flex justify-between font-semibold text-ink">
            <span>Total</span>
            <span>{formatPrice(totalAmount(), currency)}</span>
          </div>
          <Link href="/checkout" className="block w-full text-center rounded bg-gold px-7 py-3 text-base font-medium text-white hover:bg-gold-dark transition-colors">
            Proceed to Checkout
          </Link>
          <Link href="/products" className="block text-center text-sm text-ink/50 hover:text-gold">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
