// src/components/HomePageClient.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Sparkles, Shield, Truck } from "lucide-react";
import { ProductCard } from "@/components/features/ProductCard";
import { useT } from "@/hooks/useT";
import type { Product, Category } from "@/types";

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

  const valueProps = [
    { Icon: Sparkles, title: t.home.ethicallySourced,  desc: t.home.ethicallySourcedDesc },
    { Icon: Shield,   title: t.home.lifetimeGuarantee, desc: t.home.lifetimeGuaranteeDesc },
    { Icon: Truck,    title: t.home.freeShipping,       desc: t.home.freeShippingDesc },
  ];

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
              &ldquo;{t.home.storyTitle}&rdquo;
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
            {valueProps.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className={`reveal reveal-delay-${i + 1} flex flex-col items-center text-center gap-4 p-6 rounded-xl border border-burgundy/6 bg-white`}
              >
                <div className="w-12 h-12 rounded-full border border-burgundy/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-ink mb-1">{title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{desc}</p>
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
