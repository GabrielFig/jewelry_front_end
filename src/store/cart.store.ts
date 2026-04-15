"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.sku === item.sku);
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.sku === item.sku ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          }));
        } else {
          set((s) => ({ items: [...s.items, item] }));
        }
      },
      removeItem: (sku) => set((s) => ({ items: s.items.filter((i) => i.sku !== sku) })),
      updateQuantity: (sku, quantity) => {
        if (quantity <= 0) {
          set((s) => ({ items: s.items.filter((i) => i.sku !== sku) }));
        } else {
          set((s) => ({
            items: s.items.map((i) => (i.sku === sku ? { ...i, quantity } : i)),
          }));
        }
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalAmount: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);
