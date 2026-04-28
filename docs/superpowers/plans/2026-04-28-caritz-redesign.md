# Caritz Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la UI de Caritz con paleta borgoña + salvia + oro antiguo + crema cálida, hero minimalista, layout editorial en el homepage, product cards con stepper de cantidad inline, y footer de 4 columnas.

**Architecture:** Cambio de sistema de tokens en `tailwind.config.ts` → propagado a todos los archivos. Componentes rediseñados uno a uno: Header (solo colores), ProductCard (estilo + stepper UX), HomePageClient (rewrite completo), Footer (rewrite completo). Las páginas fuera de scope (admin, auth, cart, checkout) se benefician automáticamente del cambio de tokens sin necesidad de modificarse.

**Tech Stack:** Next.js 15, Tailwind CSS 3, Zustand (cart store), TypeScript, Lucide React, next/image, next/font (Playfair Display + Inter).

**Spec:** `docs/superpowers/specs/2026-04-28-caritz-redesign-design.md`

---

## File Map

| Archivo | Operación | Responsabilidad |
|---|---|---|
| `tailwind.config.ts` | Modificar | Tokens de color del sistema de diseño |
| `src/app/globals.css` | Modificar | Colores de scrollbar y base body |
| `src/components/layout/Header.tsx` | Modificar | Colores de hover, badge, idioma |
| `src/components/features/ProductCard.tsx` | Rewrite | Estilo sage-light + stepper de cantidad |
| `src/components/HomePageClient.tsx` | Rewrite | Layout editorial completo |
| `src/components/layout/Footer.tsx` | Rewrite | Footer 4 columnas |
| `src/lib/i18n.ts` | Modificar | Nuevas claves para footer |

---

## Task 1: Actualizar tokens de color — tailwind.config.ts + globals.css

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Reemplazar `tailwind.config.ts` con nueva paleta**

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Nueva paleta primaria
        burgundy: {
          DEFAULT: "#6E1F3A",
          dark:    "#9B3555",
        },
        sage: {
          DEFAULT: "#7A8C72",
          light:   "#E8EDE4",
        },
        gold: {
          DEFAULT: "#B89060",
          light:   "#C4A882",
          dark:    "#9A7A48",
        },
        cream: {
          DEFAULT: "#F5F2EC",
          dark:    "#EDE5D8",
        },
        ink:   "#1A1018",
        muted: "#7A6A5A",
        // Compatibilidad con páginas fuera de scope (admin, auth, cart)
        rose: {
          DEFAULT: "#B07A84",
          light:   "#F5E0E5",
          dark:    "#8E3F4D",
        },
        blush: "#FAF0F2",
        teal:  "#5FAF9F",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%":      { transform: "translateY(10px) rotate(6deg)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.35" },
          "50%":      { opacity: "0.75" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float:        "float 7s ease-in-out infinite",
        "float-slow": "floatReverse 9s ease-in-out infinite",
        shimmer:      "shimmer 4s ease-in-out infinite",
        "fade-up":    "fadeUp 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Actualizar scrollbar en `globals.css`**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply antialiased scroll-smooth;
  }
  body {
    @apply bg-cream text-ink font-sans;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #F5F2EC;
  }
  ::-webkit-scrollbar-thumb {
    background: #B89060;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #9A7A48;
  }
}

@layer utilities {
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition:
      opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  @media (prefers-reduced-motion: reduce) {
    .reveal {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
    .animate-float,
    .animate-float-slow,
    .animate-shimmer {
      animation: none !important;
    }
  }
}
```

- [ ] **Step 3: Verificar que compila sin errores**

```bash
cd /home/gabriel/Documentos/jewelry_shop_frontend && npm run build
```

Esperado: `✓ Compiled successfully` (pueden aparecer advertencias pero sin errores de tipo).

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat(design): replace color palette — burgundy + sage + antique gold + warm cream"
```

---

## Task 2: Actualizar colores en Header.tsx

**Files:**
- Modify: `src/components/layout/Header.tsx`

Solo cambios de color — sin modificar lógica ni estructura del componente.

- [ ] **Step 1: Reemplazar clases de color en Header**

Cambios exactos a realizar (usar find & replace en el archivo):

Reemplazos globales a aplicar con find & replace (todos los archivos se refieren a `src/components/layout/Header.tsx`):

| Buscar (exacto) | Reemplazar con |
|---|---|
| `hover:text-rose"` | `hover:text-burgundy"` |
| `"bg-rose text-white` | `"bg-burgundy text-white` |
| `hover:text-gold hover:border-gold/40` | `hover:text-sage hover:border-sage/40` |
| `hover:bg-blush` | `hover:bg-cream-dark/60` |
| `text-rose"` | `text-sage"` |

El quinto reemplazo (`text-rose"`) actualiza los íconos User y ShoppingBag dentro del dropdown de usuario (líneas ~160 y ~168), que actualmente tienen color rose y deben cambiar a sage.

Reemplazar el bloque completo de estilos del badge del carrito (línea 131):
```tsx
{totalItems > 0 && (
  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-burgundy text-white text-[10px] flex items-center justify-center font-bold">
    {totalItems}
  </span>
)}
```

Reemplazar hover del nav scrolled (línea 91-93):
```tsx
className={cn(
  "text-sm transition-colors duration-200 relative group cursor-pointer",
  transparent
    ? "text-white/80 hover:text-white"
    : "text-ink/70 hover:text-burgundy"
)}
```

Reemplazar underline hover scrolled (línea 95-98):
```tsx
<span
  className={cn(
    "absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300",
    transparent ? "bg-gold-light" : "bg-burgundy"
  )}
/>
```

Reemplazar botón de idioma (líneas 108-117):
```tsx
<button
  onClick={toggle}
  className={cn(
    "text-[10px] font-bold tracking-widest border rounded px-2 py-1 transition-all duration-200 cursor-pointer",
    transparent
      ? "border-white/25 text-white/60 hover:text-white hover:border-white/50"
      : "border-ink/15 text-ink/50 hover:text-sage hover:border-sage/40"
  )}
  aria-label="Switch language"
>
  {lang === "en" ? "ES" : "EN"}
</button>
```

Reemplazar hover en dropdown items del user menu (3 ocurrencias de `hover:bg-blush`):
```tsx
className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-cream-dark/60 transition-colors cursor-pointer"
```

- [ ] **Step 2: Verificar build**

```bash
npm run build
```

Esperado: sin errores de TypeScript.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat(design): update Header hover colors to burgundy/sage palette"
```

---

## Task 3: ProductCard — nuevo estilo + stepper de cantidad

**Files:**
- Modify: `src/components/features/ProductCard.tsx`

La lógica del stepper: leer `qty` directo del `cartStore.items`. Si `qty === 0`, mostrar botón "Agregar". Si `qty > 0`, mostrar stepper `− qty +` con ícono de carrito. Cada `+/-` llama a `updateQuantity` inmediatamente.

- [ ] **Step 1: Reemplazar ProductCard.tsx completo**

```tsx
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
```

- [ ] **Step 2: Verificar build**

```bash
npm run build
```

Esperado: sin errores. El componente usa `Minus`, `Plus` de lucide-react (disponibles en la versión instalada). Si aparece error de módulo no encontrado, verificar con:

```bash
node -e "require('./node_modules/lucide-react')" 2>&1 | head -5
```

Si `Minus`/`Plus` no existen en la versión instalada, reemplazar con SVG inline:

```tsx
// Reemplazar <Minus className="w-3 h-3" /> con:
<svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="5" y1="12" x2="19" y2="12"/></svg>

// Reemplazar <Plus className="w-3 h-3" /> con:
<svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/features/ProductCard.tsx
git commit -m "feat(design): redesign ProductCard — sage palette + inline quantity stepper"
```

---

## Task 4: HomePageClient — rewrite completo

**Files:**
- Modify: `src/components/HomePageClient.tsx`

Elimina: hero oscuro, sección de categorías (`CATEGORY_GRADIENTS`), anillos flotantes animados, gradientes radiales.
Agrega: hero minimalista crema, quote section, grid asimétrico, historia en borgoña, valores en cards, newsletter 2 columnas.

- [ ] **Step 1: Reemplazar HomePageClient.tsx completo**

```tsx
// src/components/HomePageClient.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Sparkles, Shield, Truck } from "lucide-react";
import { ProductCard } from "@/components/features/ProductCard";
import { useT } from "@/hooks/useT";
import type { Product, Category } from "@/types";

const VALUE_PROPS = [
  { Icon: Sparkles, titleKey: "ethicallySourced" as const,   descKey: "ethicallySourcedDesc" as const },
  { Icon: Shield,   titleKey: "lifetimeGuarantee" as const,  descKey: "lifetimeGuaranteeDesc" as const },
  { Icon: Truck,    titleKey: "freeShipping" as const,       descKey: "freeShippingDesc" as const },
];

export function HomePageClient({
  products,
  categories: _categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const t = useT();
  const [email, setEmail]         = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll<Element>(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-cream py-20 md:py-28 text-center border-b border-burgundy/6 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-burgundy to-sage" />

        <div className="reveal flex items-center justify-center gap-4 mb-8 opacity-40">
          <div className="h-px w-20 bg-burgundy" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="w-1 h-1 rounded-full bg-sage" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="h-px w-20 bg-burgundy" />
        </div>

        <div className="reveal reveal-delay-1 inline-block border border-burgundy/10 rounded-2xl px-10 py-6 mb-5 bg-gradient-to-br from-cream via-cream to-cream-dark/50">
          <Image
            src="/images/logo-2x.png"
            alt="Caritz - Joyería de Diseño"
            width={320}
            height={240}
            priority
            className="object-contain w-40 md:w-56 lg:w-72 h-auto mx-auto"
          />
        </div>

        <p className="reveal reveal-delay-2 text-[10px] tracking-[0.45em] uppercase text-muted mb-5">
          By Beatriz Figueroa
        </p>

        <p className="reveal reveal-delay-2 max-w-md mx-auto text-muted text-base md:text-lg leading-relaxed mb-8 px-4">
          {t.home.heroDesc}
        </p>

        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-block border-[1.5px] border-burgundy text-burgundy font-medium px-10 py-3 rounded-full text-sm tracking-wider hover:bg-burgundy hover:text-cream transition-all duration-300 cursor-pointer"
          >
            {t.home.exploreCta}
          </Link>
          <Link
            href="#story"
            className="inline-block border border-muted/30 text-muted font-medium px-10 py-3 rounded-full text-sm tracking-wider hover:border-muted/60 hover:text-ink transition-all duration-300 cursor-pointer"
          >
            {t.home.storyCta}
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sage to-burgundy" />
      </section>

      {/* ── Quote section ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 md:py-20">
        <div className="reveal flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-1 self-stretch rounded-full bg-gradient-to-b from-burgundy to-sage flex-shrink-0 min-h-[72px]" />
          <div className="flex-1">
            <p className="text-[9px] tracking-[0.3em] uppercase text-sage mb-3">
              ✦ {t.home.storyBadge}
            </p>
            <blockquote className="font-serif text-2xl md:text-3xl italic text-burgundy leading-relaxed mb-3">
              "{t.home.storyTitle}"
            </blockquote>
            <p className="text-sm text-muted tracking-wide">— Beatriz Figueroa, Fundadora de Caritz</p>
          </div>
          <div className="hidden md:flex flex-col items-center gap-3 p-5 border border-burgundy/10 rounded-xl bg-white flex-shrink-0">
            <span className="text-3xl opacity-40 select-none">🌹</span>
            <div className="h-px w-6 bg-gold" />
            <p className="text-[9px] tracking-[0.15em] text-muted uppercase text-center leading-relaxed">
              Hecha en México<br />100% Artesanal
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured Products ────────────────────────────────────────────── */}
      <section className="bg-cream-dark/30 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="reveal flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[9px] tracking-[0.4em] uppercase text-sage mb-1">{t.home.badge}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">{t.home.featuredPieces}</h2>
              <div className="mt-3 h-px w-8 bg-gold" />
            </div>
            <Link
              href="/products"
              className="text-sm text-burgundy hover:text-burgundy-dark transition-colors font-medium cursor-pointer"
            >
              {t.home.viewAll}
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p, i) => (
                <div key={p.sku} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="reveal text-center py-16 space-y-3">
              <p className="text-burgundy/30 text-3xl font-serif">✦</p>
              <p className="text-muted">
                {t.home.noProducts}{" "}
                <Link href="/admin/products/new" className="text-burgundy hover:underline">
                  {t.home.addFirstProduct}
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
      <section id="story" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-20">
        <div className="reveal bg-burgundy rounded-2xl p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-[9px] tracking-[0.4em] uppercase text-sage mb-4">✦ {t.home.storyBadge}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-cream leading-tight mb-4">
              {t.home.storyTitle}
            </h2>
            <div className="h-px w-8 bg-gold mb-6" />
            <p className="text-cream/70 leading-relaxed text-base mb-8 max-w-lg">
              {t.home.storyBody}
            </p>
            <Link
              href="/products"
              className="inline-block border border-sage/40 text-sage text-sm font-medium px-8 py-3 rounded-full tracking-wider hover:border-sage/70 transition-all duration-300 cursor-pointer"
            >
              {t.home.storyCta} →
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-56 h-56 md:w-64 md:h-64">
              <div className="absolute inset-0 rounded-full border border-white/10 animate-float-slow" />
              <div className="absolute inset-8 rounded-full border border-sage/20 animate-float" />
              <div className="absolute inset-16 rounded-full bg-white/5 flex items-center justify-center text-5xl opacity-25 select-none">
                🌹
              </div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold/50 animate-shimmer" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sage/40 animate-shimmer" />
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-gold/30 animate-shimmer" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sage/30 animate-shimmer" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-burgundy/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_PROPS.map(({ Icon, titleKey, descKey }, i) => (
              <div
                key={titleKey}
                className={`reveal reveal-delay-${i + 1} flex flex-col items-center text-center gap-4 p-6 rounded-xl border border-burgundy/6 bg-white`}
              >
                <div className="w-12 h-12 rounded-full border border-burgundy/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-ink mb-1">{t.home[titleKey]}</h3>
                  <p className="text-muted text-sm leading-relaxed">{t.home[descKey]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-burgundy to-burgundy-dark py-16 md:py-20">
        <div className="reveal mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4 opacity-40">
                <div className="h-px w-8 bg-sage" />
                <span className="text-sage text-xs">✦</span>
                <div className="h-px w-8 bg-sage" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-cream mb-3">{t.home.newsletterTitle}</h3>
              <p className="text-cream/60 text-sm leading-relaxed max-w-sm">{t.home.newsletterDesc}</p>
            </div>

            <div className="w-full md:w-80 lg:w-96">
              {subscribed ? (
                <p className="text-sage font-semibold text-center flex items-center gap-2 justify-center">
                  <Sparkles className="w-4 h-4" />
                  {t.home.newsletterSuccess}
                </p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.home.newsletterPlaceholder}
                    className="rounded-full bg-white/10 border border-white/20 px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage/40 transition"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-cream text-burgundy font-semibold px-7 py-3 text-sm tracking-wider hover:bg-cream-dark transition-all duration-300 cursor-pointer"
                  >
                    {t.home.newsletterCta}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verificar build**

```bash
npm run build
```

Esperado: sin errores. Si aparece error de TypeScript en `t.home[titleKey]` o `t.home[descKey]`, es porque el tipo de `titleKey`/`descKey` no está siendo inferido correctamente. Solución: reemplazar el array `VALUE_PROPS` por un array de objetos con los valores ya resueltos:

```tsx
// Reemplazar VALUE_PROPS y su uso por:
const valueProps = [
  { Icon: Sparkles, title: t.home.ethicallySourced,  desc: t.home.ethicallySourcedDesc },
  { Icon: Shield,   title: t.home.lifetimeGuarantee, desc: t.home.lifetimeGuaranteeDesc },
  { Icon: Truck,    title: t.home.freeShipping,       desc: t.home.freeShippingDesc },
];
// Y en el JSX usar: {valueProps.map(({ Icon, title, desc }, i) => ( ... {title} ... {desc} ... ))}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HomePageClient.tsx
git commit -m "feat(design): rewrite HomePageClient — minimalist hero, editorial layout, sage palette"
```

---

## Task 5: Footer — rewrite completo + nuevas claves i18n

**Files:**
- Modify: `src/lib/i18n.ts`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Agregar nuevas claves de footer en i18n.ts**

En el objeto `en.footer` (después de `followUs`), agregar:
```ts
information: "Information",
storyLink:   "Our Story",
sizingGuide: "Sizing Guide",
jewelryCare: "Jewelry Care",
help:        "Help",
shipping:    "Shipping & Delivery",
returns:     "Returns",
warranty:    "Warranty",
contact:     "Contact",
faq:         "FAQ",
madeInMexico: "Made in Mexico",
privacyPolicy: "Privacy",
terms:       "Terms",
```

En el objeto `es.footer` (después de `followUs`), agregar:
```ts
information:   "Información",
storyLink:     "Nuestra historia",
sizingGuide:   "Guía de tallas",
jewelryCare:   "Cuidado de joyas",
help:          "Ayuda",
shipping:      "Envíos y entregas",
returns:       "Devoluciones",
warranty:      "Garantía",
contact:       "Contacto",
faq:           "Preguntas frecuentes",
madeInMexico:  "Hecho en México",
privacyPolicy: "Privacidad",
terms:         "Términos",
```

- [ ] **Step 2: Reemplazar Footer.tsx completo**

```tsx
// src/components/layout/Footer.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useT } from "@/hooks/useT";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

export function Footer() {
  const t = useT();

  return (
    <footer className="bg-ink text-stone-400">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Col 1 — Marca */}
        <div className="sm:col-span-2 md:col-span-1">
          <div className="mb-4">
            <Image
              src="/images/logo-2x.png"
              alt="Caritz - Joyería de Diseño"
              width={160}
              height={120}
              className="object-contain h-16 w-auto"
            />
          </div>
          <p className="text-xs text-stone-500 leading-relaxed max-w-xs mb-1">
            {t.footer.tagline}
          </p>
          <p className="text-[10px] text-stone-600 tracking-widest mb-5">{t.footer.madeInMexico} 🇲🇽</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-stone-500 hover:text-gold hover:border-gold/40 transition-all duration-200 cursor-pointer">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-stone-500 hover:text-gold hover:border-gold/40 transition-all duration-200 cursor-pointer">
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Pinterest" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-stone-500 hover:text-gold hover:border-gold/40 transition-all duration-200 cursor-pointer">
              <PinterestIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2 — Colecciones */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 mb-4">
            {t.footer.shop}
          </h4>
          <ul className="space-y-2.5">
            {[
              { href: "/products", label: t.footer.allCollections },
              { href: "/products?category_id=", label: t.nav.newArrivals },
              { href: "/cart", label: t.footer.shoppingCart },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-stone-500 hover:text-gold-light transition-colors cursor-pointer">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Información */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 mb-4">
            {t.footer.information}
          </h4>
          <ul className="space-y-2.5">
            {[
              { href: "/",  label: t.footer.storyLink },
              { href: "#",  label: t.footer.sizingGuide },
              { href: "#",  label: t.footer.jewelryCare },
            ].map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="text-sm text-stone-500 hover:text-gold-light transition-colors cursor-pointer">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Ayuda */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 mb-4">
            {t.footer.help}
          </h4>
          <ul className="space-y-2.5">
            {[
              { href: "#", label: t.footer.shipping },
              { href: "#", label: t.footer.returns },
              { href: "#", label: t.footer.warranty },
              { href: "#", label: t.footer.contact },
              { href: "#", label: t.footer.faq },
            ].map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="text-sm text-stone-500 hover:text-gold-light transition-colors cursor-pointer">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6 py-5 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            {[
              { href: "#", label: t.footer.privacyPolicy },
              { href: "#", label: t.footer.terms },
            ].map(({ href, label }) => (
              <Link key={label} href={href} className="text-xs text-stone-600 hover:text-stone-400 transition-colors cursor-pointer">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Si aparece error de TypeScript sobre las claves nuevas de `t.footer` (ej. `t.footer.madeInMexico` no existe en el tipo), verificar que el Step 1 se aplicó correctamente en ambas locales (`en` y `es`) del archivo `i18n.ts`.

- [ ] **Step 4: Commit final**

```bash
git add src/lib/i18n.ts src/components/layout/Footer.tsx
git commit -m "feat(design): redesign Footer — 4 columns, new i18n keys, artisanal brand identity"
```

---

## Verificación final

- [ ] **Correr build limpio**

```bash
npm run build
```

Esperado: `✓ Compiled successfully` sin errores de TypeScript.

- [ ] **Arrancar servidor de desarrollo y revisar visualmente**

```bash
npm run dev
```

Abrir `http://localhost:3000` y verificar:
1. Hero: fondo crema, logo centrado en caja con borde suave, ornamentos de líneas, barras de color arriba/abajo
2. Quote section: línea vertical bicolor + cita en serif borgoña + badge "Hecha en México"
3. Products grid: cards en sage-light, price pill borgoña, stepper al hacer clic en "Agregar"
4. Story: sección borgoña redondeada con texto crema, ornamento rosa
5. Values: 3 cards blancas con íconos dorados
6. Newsletter: degradado borgoña, 2 columnas en desktop
7. Footer: 4 columnas oscuras, logo, redes sociales
8. Header: badge de carrito borgoña, hover de nav borgoña

- [ ] **Verificar stepper de cantidad**
1. Ir a `http://localhost:3000`
2. En cualquier ProductCard, hacer clic en "Agregar al Carrito"
3. El botón debe transformarse en `− 1 +` con ícono de carrito
4. Hacer clic en `+`: el número sube a 2
5. Hacer clic en `−` hasta llegar a 0: el stepper vuelve a ser el botón "Agregar al Carrito"
6. El badge del carrito en el Header debe reflejar el total en tiempo real

- [ ] **Commit de cierre**

```bash
git add -A
git commit -m "feat(design): complete Caritz redesign — botanical palette, editorial homepage, quantity stepper"
```
