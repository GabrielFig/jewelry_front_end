"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang } from "@/lib/i18n";

interface LanguageState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      lang: "es",
      setLang: (lang) => set({ lang }),
      toggle: () => set({ lang: get().lang === "en" ? "es" : "en" }),
    }),
    { name: "language-storage", skipHydration: true }
  )
);
