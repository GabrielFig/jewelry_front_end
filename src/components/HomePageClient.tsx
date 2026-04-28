"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Gem, Sparkles, Shield, Truck, Instagram, Facebook } from "lucide-react";
import { ProductCard } from "@/components/features/ProductCard";
import { useT } from "@/hooks/useT";
import type { Product, Category } from "@/types";

const CATEGORY_GRADIENTS = [
  "from-rose/30 via-rose-light to-cream",
  "from-gold/20 via-amber-50 to-cream",
  "from-stone-200 via-stone-100 to-cream",
  "from-rose-light via-blush to-cream",
  "from-amber-100 via-yellow-50 to-cream",
  "from-stone-100 via-rose-light/50 to-cream",
];

const VALUE_ICONS = [Sparkles, Shield, Truck];

export function HomePageClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const t = useT();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const valueProps = [
    { Icon: VALUE_ICONS[0], title: t.home.ethicallySourced, desc: t.home.ethicallySourcedDesc },
    { Icon: VALUE_ICONS[1], title: t.home.lifetimeGuarantee, desc: t.home.lifetimeGuaranteeDesc },
    { Icon: VALUE_ICONS[2], title: t.home.freeShipping, desc: t.home.freeShippingDesc },
  ];

  // Scroll-reveal observer
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
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-[#180A0D]">
        {/* Warm radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_40%,rgba(142,63,77,0.22),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_70%,rgba(191,160,106,0.15),transparent)]" />

        {/* Floating decorative rings */}
        <div className="pointer-events-none select-none">
          <div className="absolute top-[12%] right-[6%] w-72 h-72 rounded-full border border-gold-light/15 animate-float" />
          <div className="absolute top-[18%] right-[9%] w-52 h-52 rounded-full border border-rose/20 animate-float-slow" />
          <div className="absolute bottom-[15%] left-[4%] w-96 h-96 rounded-full border border-gold-light/10 animate-float-slow" />
          <div className="absolute bottom-[20%] left-[7%] w-64 h-64 rounded-full border border-rose/10 animate-float" />
          {/* Gem SVG accents */}
          <svg
            className="absolute top-[28%] right-[18%] w-5 h-5 text-gold-light/50 animate-shimmer"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="12,2 20,9 20,15 12,22 4,15 4,9" />
          </svg>
          <svg
            className="absolute top-[55%] left-[22%] w-3 h-3 text-rose/40 animate-shimmer"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="12,2 22,8 18,20 6,20 2,8" />
          </svg>
          <div className="absolute top-[40%] left-[12%] w-1.5 h-1.5 rounded-full bg-gold-light/40 animate-shimmer" />
          <div className="absolute top-[22%] left-[35%] w-1 h-1 rounded-full bg-rose/30 animate-shimmer" />
          <div className="absolute bottom-[35%] right-[28%] w-1.5 h-1.5 rounded-full bg-gold-light/30 animate-shimmer" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-24 flex flex-col items-center text-center">
          {/* Brand logo — large hero variant */}
          <div className="mb-8">
            <Image
              src="/images/logo-2x.png"
              alt="Caritz - Joyería de Diseño"
              width={320}
              height={240}
              priority
              className="object-contain w-48 md:w-64 lg:w-80 h-auto mx-auto"
            />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-white mb-6 max-w-3xl">
            {t.home.heroTitle1}
            <br />
            <span className="text-gold-light italic">{t.home.heroTitle2}</span>
          </h1>

          <p className="max-w-md text-stone-300/80 text-base md:text-lg mb-10 leading-relaxed">
            {t.home.heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="inline-block bg-gold-light hover:bg-gold text-ink font-semibold px-10 py-3.5 rounded-full transition-all duration-300 tracking-wider text-sm hover:shadow-[0_0_24px_rgba(191,160,106,0.45)] cursor-pointer"
            >
              {t.home.exploreCta}
            </Link>
            <Link
              href="#story"
              className="inline-block border border-white/25 hover:border-gold-light/60 text-white/80 hover:text-gold-light font-medium px-10 py-3.5 rounded-full transition-all duration-300 tracking-wider text-sm cursor-pointer"
            >
              {t.home.storyCta}
            </Link>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
            <span className="text-[10px] tracking-widest text-white uppercase">scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Categories ──────────────────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
          <div className="reveal text-center mb-12">
            <p className="text-[11px] tracking-[0.4em] uppercase text-rose font-medium mb-2">
              {t.home.shopByCategory}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
              {t.home.shopByCategory}
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/products?category_id=${cat.id}`}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} group relative flex flex-col items-center justify-end gap-3 rounded-2xl overflow-hidden bg-gradient-to-br ${CATEGORY_GRADIENTS[i % CATEGORY_GRADIENTS.length]} p-6 pt-12 border border-ink/5 hover:border-gold/30 hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[160px]`}
              >
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center border border-gold/20 group-hover:border-gold/50 transition-colors duration-300 shadow-sm">
                  <Gem className="w-4 h-4 text-gold group-hover:text-gold-dark transition-colors duration-300" />
                </div>
                <span className="font-serif font-semibold text-ink group-hover:text-rose-dark transition-colors text-center leading-tight">
                  {cat.name}
                </span>
                <span className="text-[10px] tracking-widest text-muted/70 uppercase group-hover:text-rose transition-colors duration-200">
                  {t.home.exploreCta.split(" ")[0]} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Featured Products ────────────────────────────────────────────── */}
      <section className="bg-blush/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="reveal flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] tracking-[0.4em] uppercase text-rose font-medium mb-2">
                {t.home.badge}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink">
                {t.home.featuredPieces}
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-medium text-gold hover:text-gold-dark transition-colors flex items-center gap-1 cursor-pointer"
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
              <Gem className="mx-auto w-10 h-10 text-gold/30" />
              <p className="text-muted">
                {t.home.noProducts}{" "}
                <Link href="/admin/products/new" className="text-gold hover:underline">
                  {t.home.addFirstProduct}
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
      <section id="story" className="mx-auto max-w-7xl px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div className="reveal order-2 lg:order-1">
            <p className="text-[11px] tracking-[0.45em] uppercase text-rose font-medium mb-4">
              {t.home.storyBadge}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-ink mb-6 leading-tight">
              {t.home.storyTitle}
            </h2>
            <div className="h-px w-12 bg-gold-light mb-6" />
            <p className="text-muted leading-relaxed text-base md:text-lg mb-8 max-w-lg">
              {t.home.storyBody}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark transition-colors cursor-pointer"
            >
              {t.home.storyCta}
              <span className="text-base">→</span>
            </Link>
          </div>

          {/* Decorative visual */}
          <div className="reveal reveal-delay-2 order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-float-slow" />
              {/* Middle ring */}
              <div className="absolute inset-8 rounded-full border border-rose/30 animate-float" />
              {/* Inner circle */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-rose-light via-blush to-cream flex items-center justify-center shadow-inner">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/10 to-rose/10" />
                <Gem className="w-14 h-14 text-gold-dark/60 relative z-10" />
              </div>
              {/* Orbiting dots */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold-light/60 animate-shimmer" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose/50 animate-shimmer" />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/40 animate-shimmer" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-rose/40 animate-shimmer" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Value Props ──────────────────────────────────────────────────── */}
      <section className="bg-[#180A0D] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {valueProps.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className={`reveal reveal-delay-${i + 1} flex flex-col items-center text-center gap-4`}
              >
                <div className="w-14 h-14 rounded-full border border-gold-light/25 flex items-center justify-center bg-white/5">
                  <Icon className="w-6 h-6 text-gold-light" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-white mb-1">{title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-rose-light via-blush to-rose-light/60 py-16">
        <div className="reveal mx-auto max-w-xl px-4 sm:px-6 text-center">
          <div className="h-px w-10 bg-gold-light/60 mx-auto mb-6" />
          <h3 className="font-serif text-3xl font-bold text-ink mb-3">
            {t.home.newsletterTitle}
          </h3>
          <p className="text-muted text-sm mb-8 leading-relaxed">{t.home.newsletterDesc}</p>

          {subscribed ? (
            <p className="inline-flex items-center gap-2 text-rose-dark font-semibold">
              <Sparkles className="w-4 h-4" />
              {t.home.newsletterSuccess}
            </p>
          ) : (
            <form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.home.newsletterPlaceholder}
                className="flex-1 rounded-full border border-ink/15 bg-white/80 px-5 py-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition"
              />
              <button
                type="submit"
                className="rounded-full bg-gold-light hover:bg-gold text-ink font-semibold px-7 py-3 text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(191,160,106,0.4)] cursor-pointer whitespace-nowrap"
              >
                {t.home.newsletterCta}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
