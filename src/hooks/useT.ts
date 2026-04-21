"use client";
import { useLanguageStore } from "@/store/language.store";
import { translations } from "@/lib/i18n";

export function useT() {
  const lang = useLanguageStore((s) => s.lang);
  return translations[lang];
}
