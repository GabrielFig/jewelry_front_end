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
    <footer className="bg-ink text-cream/50">
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
          <p className="text-xs text-cream/40 leading-relaxed max-w-xs mb-1">
            {t.footer.tagline}
          </p>
          <p className="text-[10px] text-cream/30 tracking-widest mb-5">{t.footer.madeInMexico} 🇲🇽</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-cream/40 hover:text-gold hover:border-gold/40 transition-all duration-200 cursor-pointer">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-cream/40 hover:text-gold hover:border-gold/40 transition-all duration-200 cursor-pointer">
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Pinterest" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-cream/40 hover:text-gold hover:border-gold/40 transition-all duration-200 cursor-pointer">
              <PinterestIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2 — Colecciones */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-cream/35 mb-4">
            {t.footer.shop}
          </h4>
          <ul className="space-y-2.5">
            {[
              { href: "/products", label: t.footer.allCollections },
              { href: "/products?category_id=", label: t.nav.newArrivals },
              { href: "/cart", label: t.footer.shoppingCart },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-cream/45 hover:text-gold-light transition-colors cursor-pointer">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Información */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-cream/35 mb-4">
            {t.footer.information}
          </h4>
          <ul className="space-y-2.5">
            {[
              { href: "/",  label: t.footer.storyLink },
              { href: "#",  label: t.footer.sizingGuide },
              { href: "#",  label: t.footer.jewelryCare },
            ].map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="text-sm text-cream/45 hover:text-gold-light transition-colors cursor-pointer">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Ayuda */}
        <div>
          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-cream/35 mb-4">
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
                <Link href={href} className="text-sm text-cream/45 hover:text-gold-light transition-colors cursor-pointer">
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
          <p className="text-xs text-cream/30">
            © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            {[
              { href: "#", label: t.footer.privacyPolicy },
              { href: "#", label: t.footer.terms },
            ].map(({ href, label }) => (
              <Link key={label} href={href} className="text-xs text-cream/30 hover:text-cream/60 transition-colors cursor-pointer">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
