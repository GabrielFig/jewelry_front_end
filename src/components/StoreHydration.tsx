"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { useLanguageStore } from "@/store/language.store";

export function StoreHydration() {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
    useCartStore.persist.rehydrate();
    useLanguageStore.persist.rehydrate();
  }, []);
  return null;
}
